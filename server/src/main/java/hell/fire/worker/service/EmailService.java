package hell.fire.worker.service;

import hell.fire.worker.config.EmailConfiguration;
import hell.fire.worker.repository.AlertRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
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
        if (toList.length != 0) {
            messageHelper.setFrom("dev@hellfire.com");
            messageHelper.setTo(toList);
            messageHelper.setSubject(subject);
            messageHelper.setText(htmlText, true);
        }
        javaMailSender.send(mimeMessage);
    }
}
