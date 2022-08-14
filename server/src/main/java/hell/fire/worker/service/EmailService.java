package hell.fire.worker.service;

import hell.fire.worker.config.EmailConfiguration;
import hell.fire.worker.model.Jobs;
import hell.fire.worker.model.Tasks;
import hell.fire.worker.repository.AlertRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.util.Date;
import java.util.List;

@Service
public class EmailService {

    @Autowired
    private EmailConfiguration emailConfig;

    @Autowired
    private AlertRepository alertRepo;

    private JavaMailSender getJavaMailSender() {
        JavaMailSenderImpl mailSender = new JavaMailSenderImpl();
        mailSender.setHost(emailConfig.getHost());
        mailSender.setPort(emailConfig.getPort());
        mailSender.setUsername(emailConfig.getUsername());
        mailSender.setPassword(emailConfig.getPassword());
        return mailSender;
    }

    public void sendMineMessage(String to, String from, String subject, String htmlText) throws MessagingException {
        JavaMailSender javaMailSender = getJavaMailSender();
        MimeMessage mimeMessage = javaMailSender.createMimeMessage();
        MimeMessageHelper messageHelper = new MimeMessageHelper(mimeMessage, "utf-8");
        messageHelper.setFrom(from);
        messageHelper.setTo(to);
        messageHelper.setSubject(subject);
        messageHelper.setText(htmlText, true);
        javaMailSender.send(mimeMessage);
    }

    public void sendMineMessage(String subject, String htmlText) throws MessagingException {
        JavaMailSender javaMailSender = getJavaMailSender();
        MimeMessage mimeMessage = javaMailSender.createMimeMessage();
        MimeMessageHelper messageHelper = new MimeMessageHelper(mimeMessage, "utf-8");
        List<String> mailingList = alertRepo.onlyMailIds();
        String[] toList = mailingList.toArray(new String[mailingList.size()]);
        if (toList.length == 0) {
            return;
        }
        messageHelper.setFrom("dev@hellfire.com");
        messageHelper.setTo(toList);
        messageHelper.setSubject(subject);
        messageHelper.setText(htmlText, true);
        javaMailSender.send(mimeMessage);
    }

    public void triggerMailList(List<Jobs> jobs) {
        String subject = "Jobs scheduled Alert";

        StringBuilder table = new StringBuilder();

        Date date = new Date();
        jobs.forEach(job -> {
            table.append("<tr>" +
                    "<td>" + job.getName() + "</td>" +
                    "<td>" + job.getValue() + "</td>" +
                    "<td>" + job.getStatus() + "</td>" +
                    "<td>" + new Date(job.getStartDatetime()) + "</td>" +
                    "<td>" + new Date(job.getFinishDatetime()) + "</td>" +
                    "<td>" + job.getRequiredCapacity() + "</td>" +
                    "<td>" + job.getFrequencyInHr() + "</td>" +
                    " </tr>\n");
        });


        String htmlText = "<style>\n" +
                "  table, th, td {\n" +
                "    border: 1px solid black;\n" +
                "    border-collapse: collapse;\n" +
                "    text-align:center;}" +
                "\n</style>" +
                "  \n<table>\n" +
                "  <tr>\n" +
                "    <th>Job Name</th>\n" +
                "    <th>Value</th>\n" +
                "    <th>Status</th>\n" +
                "    <th>Start time</th>\n" +
                "    <th>Finish Time</th>\n" +
                "    <th>Required Capacity</th>\n" +
                "    <th>Frequency in Hours</th>\n" +
                "  </tr>\n" +
                table.toString() +
                "</table>";
        try {
            sendMineMessage(subject, htmlText);
        } catch (MessagingException e) {
            System.out.println("error sending mail");
        }
    }

    public void triggerMailTaskList(List<Tasks> tasks) {
        String subject = "Task Status Update Alert";

        StringBuilder table = new StringBuilder();

        Date date = new Date();
        tasks.forEach(task -> {
            table.append("<tr>" +
                    "<td>" + task.getName() + "</td>" +
                    "<td>" + task.getValue() + "</td>" +
                    "<td>" + task.getStatus() + "</td>" +
                    "<td>" + new Date(task.getStartDatetime()) + "</td>" +
                    "<td>" + task.getRequiredCapacity() + "</td>" +
                    " </tr>\n");
        });


        String htmlText = "<style>\n" +
                "  table, th, td {\n" +
                "    border: 1px solid black;\n" +
                "    border-collapse: collapse;\n" +
                "    text-align:center;}" +
                "\n</style>" +
                "  \n<table>\n" +
                "  <tr>\n" +
                "    <th>Task Name</th>\n" +
                "    <th>Value</th>\n" +
                "    <th>Status</th>\n" +
                "    <th>Start time</th>\n" +
                "    <th>Required Capacity</th>\n" +
                "  </tr>\n" +
                table.toString() +
                "</table>";
        try {
            if (tasks.size() != 0) {
                sendMineMessage(subject, htmlText);
            }
        } catch (MessagingException e) {
            System.out.println("error sending mail");
        }
    }
}
