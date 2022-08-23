package hell.fire.worker.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import hell.fire.worker.dto.JobsDTO;
import hell.fire.worker.model.Jobs;
import hell.fire.worker.model.Tasks;
import hell.fire.worker.model.eumus.JobsStatus;
import hell.fire.worker.repository.JobsRepository;
import hell.fire.worker.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class JobService {

    @Autowired
    private JobsRepository jobsRepo;

    @Autowired
    private TaskRepository taskRepo;

    @Autowired
    private EmailService emailService;

    public List<Jobs> createJob(List<JobsDTO> jobsDTOS) {
        List<Jobs> jobs = new ArrayList<>();
        List<Tasks> taskList = new ArrayList<>();
        jobsDTOS.forEach(jobsDTO -> {
            Jobs job = new Jobs();
            job.setName(jobsDTO.getName());
            job.setValue(jobsDTO.getValue());
            job.setStartDatetime(jobsDTO.getStartDatetime());
            job.setFinishDatetime(jobsDTO.getFinishDatetime());
            job.setRequiredCapacity(jobsDTO.getRequiredCapacity());
            job.setExecTimeInMin(jobsDTO.getExecTimeInMin());
            job.setFrequencyInHr(jobsDTO.getFrequencyInHr());
            job.setStatus(JobsStatus.CREATED);
            jobs.add(job);
        });
        List<Jobs> savedJobs = jobsRepo.saveAll(jobs);
        emailService.triggerMailList(savedJobs);
        savedJobs.forEach(job -> {
            String JOB_NAME = job.getName();
            String JOB_VALUE = job.getValue();
            long JOB_ID = job.getId();
            long START_TIME = job.getStartDatetime();
            long END_TIME = job.getFinishDatetime();
            long FREQUENCY_IN_HR = job.getFrequencyInHr();
            int REQUIRED_CAPACITY = job.getRequiredCapacity();
            int EXEC_TIME_IN_MIN = job.getExecTimeInMin();
            long timeDifference = END_TIME - START_TIME;
            long toHrs = timeDifference / (60 * 60 * 1000);
            int count = Math.round(toHrs / FREQUENCY_IN_HR);
            long countTime = START_TIME;
            for (int i = 1; i <= count; i++) {
                countTime = countTime + (60 * 60 * 1000 * FREQUENCY_IN_HR);
                Tasks task = new Tasks();
                task.setName(JOB_NAME + " task " + i);
                task.setValue(JOB_VALUE);
                task.setStatus(JobsStatus.CREATED);
                task.setExecTimeInMin(EXEC_TIME_IN_MIN);
                task.setRequiredCapacity(REQUIRED_CAPACITY);
                task.setStartDatetime(countTime);
                task.setJob(job);
                taskList.add(task);
            }
            job.setStatus(JobsStatus.STARTED);
            jobsRepo.save(job);
        });
        taskRepo.saveAll(taskList);
        return savedJobs;
    }


    public List<Jobs> getAllJobs() {
        return jobsRepo.findAll();
    }


    public Optional<Jobs> getTaskByJobId(long id) {
        return jobsRepo.findById(id);
    }

    private void triggerMail(Jobs job) {
        String subject = "Job with " + job.getId() + " has been " + job.getStatus();
        ObjectMapper objectMapper = new ObjectMapper();
        String htmlText;
        try {
            htmlText = objectMapper.writeValueAsString(job);
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
        try {
            emailService.sendMineMessage(subject, htmlText);
        } catch (MessagingException e) {
            System.out.println("error sending mail");
        }
    }



    public List<Tasks> getTasksAll() {
        return taskRepo.findAll();
    }

    public List<Tasks> getAllTaskInRange(long startDate, long endDate) {
        return taskRepo.getAllByRangeTime(startDate, endDate);
    }

    public String updateJob(Jobs job) {
        if (jobsRepo.existsById(job.getId())) {
            List<Tasks> tasks = taskRepo.findAllByJobId(job.getId());
            taskRepo.deleteAll(tasks);
            List<Tasks> taskList = new ArrayList<>();

            String JOB_NAME = job.getName();
            String JOB_VALUE = job.getValue();
            long JOB_ID = job.getId();
            long START_TIME = job.getStartDatetime();
            long END_TIME = job.getFinishDatetime();
            long FREQUENCY_IN_HR = job.getFrequencyInHr();
            int REQUIRED_CAPACITY = job.getRequiredCapacity();
            int EXEC_TIME_IN_MIN = job.getExecTimeInMin();
            long timeDifference = END_TIME - START_TIME;
            long toHrs = timeDifference / (60 * 60 * 1000);
            int count = Math.round(toHrs / FREQUENCY_IN_HR);
            long countTime = START_TIME;
            for (int i = 0; i <= count; i++) {
                countTime = countTime + (60 * 60 * 1000 * FREQUENCY_IN_HR);
                Tasks task = new Tasks();
                task.setName(JOB_NAME + " task " + i + 1);
                task.setValue(JOB_VALUE);
                task.setExecTimeInMin(EXEC_TIME_IN_MIN);
                task.setStatus(JobsStatus.CREATED);
                task.setRequiredCapacity(REQUIRED_CAPACITY);
                task.setStartDatetime(countTime);
                task.setJob(job);
                taskList.add(task);
            }
            taskRepo.saveAll(taskList);
            job.setStatus(JobsStatus.STARTED);
            jobsRepo.save(job);
            return "Job has been update successfully !";
        } else {
            return "Invalid input !";
        }

    }

    public String deleteJob(long jobId) {
        if (jobsRepo.existsById(jobId)) {
            List<Tasks> tasks = taskRepo.findAllByJobId(jobId);
            taskRepo.deleteAll(tasks);
            jobsRepo.deleteById(jobId);
            return "Job has been deleted successfully !";
        } else {
            return "Invalid input !";
        }
    }
}
