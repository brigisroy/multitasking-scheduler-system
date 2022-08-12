package hell.fire.worker.service;

import hell.fire.worker.dto.JobsDTO;
import hell.fire.worker.model.Jobs;
import hell.fire.worker.model.Tasks;
import hell.fire.worker.model.eumus.JobsStatus;
import hell.fire.worker.repository.JobsRepository;
import hell.fire.worker.repository.TaskRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
@Slf4j
public class JobService {

    @Autowired
    private JobsRepository jobsRepo;

    @Autowired
    private TaskRepository taskRepo;

    @Autowired
    private EmailService emailService;

    public List<Jobs> createJob(List<JobsDTO> jobsDTOS) {
        List<Jobs> jobs = new ArrayList<>();
        jobsDTOS.forEach(jobsDTO -> {
            Jobs job = new Jobs();
            job.setName(jobsDTO.getName());
            job.setValue(jobsDTO.getValue());
            job.setStartDatetime(jobsDTO.getStartDatetime());
            job.setFinishDatetime(jobsDTO.getFinishDatetime());
            job.setRequiredCapacity(jobsDTO.getRequiredCapacity());
            job.setFrequencyInHr(jobsDTO.getFrequencyInHr());
            job.setStatus(JobsStatus.CREATED);
            jobs.add(job);
        });
        return jobsRepo.saveAll(jobs);
    }

    public List<Jobs> getAllJobs() {
        return jobsRepo.findAll();
    }

    @Scheduled(fixedRateString = "PT1M")
    public void createTasks() {
        List<Jobs> jobs = jobsRepo.getAllLessThanOneMin();
        List<Tasks> taskList = new ArrayList<>();
        jobs.forEach(job -> {
            String JOB_NAME = job.getName();
            String JOB_VALUE = job.getValue();
            long JOB_ID = job.getId();
            long START_TIME = job.getStartDatetime().getTime();
            long END_TIME = job.getFinishDatetime().getTime();
            log.info("Start time -> {} , End time -> {}", START_TIME, END_TIME);
            long FREQUENCY_IN_HR = job.getFrequencyInHr();
            long timeDifference = END_TIME - START_TIME;
            long toHrs = timeDifference / (60 * 60 * 1000);
            log.info("TO hrs -> {}", toHrs);
            int count = Math.round(toHrs / FREQUENCY_IN_HR);
            log.info("count -> {}", count);
            long countTime = START_TIME;
            for (int i = 0; i <= count; i++) {
                countTime = countTime + (60 * 60 * 1000 * FREQUENCY_IN_HR);
                Tasks task = new Tasks();
                task.setName(JOB_NAME);
                task.setValue(JOB_VALUE);
                task.setStatus(JobsStatus.CREATED);
                task.setStartDatetime(new Date(countTime));
                log.info("Setting start time E ->{} , data ff -> {}", countTime, new Date(countTime));
                task.setJob(job);
                taskList.add(task);
            }
            job.setStatus(JobsStatus.STARTED);
            jobsRepo.save(job);
            triggerMail(job);
        });
        taskRepo.saveAll(taskList);
    }


    public List<Tasks> getTaskByJobId(long id) {
        log.info("job id  -> {} ", id);
        return taskRepo.findAllByJobId(id);
    }

    private void triggerMail(Jobs job) {
        String from = "admin@mail.com";
        String to = "dev@mail.com";
        String subject = "Job with " + job.getId() + " has been " + job.getStatus();
        String htmlText = job.toString();
        try {
            emailService.sendMineMessage(to, from, subject, htmlText);
        } catch (MessagingException e) {
            System.out.println("error sending mail");
        }
    }

    public List<Tasks> getTasksAll() {
        return taskRepo.findAll();
    }
}
