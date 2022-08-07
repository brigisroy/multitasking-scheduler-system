package hell.fire.worker.service;

import hell.fire.worker.dto.JobsDTO;
import hell.fire.worker.model.Jobs;
import hell.fire.worker.repository.JobsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class JobService {

    @Autowired
    private JobsRepository jobsRepo;

    public Jobs createJob(JobsDTO jobsDTO) {
        Jobs job = new Jobs();
        job.setName(jobsDTO.getName());
        job.setValue(job.getValue());
        job.setStartDatetime(jobsDTO.getStartDatetime());
        job.setFinishDatetime(jobsDTO.getFinishDatetime());
        job.setRequiredCapacity(jobsDTO.getRequiredCapacity());
        job.setFrequencyIHr(jobsDTO.getFrequencyIHr());
        return jobsRepo.save(job);
    }

    public List<Jobs> getAllJobs(){
        return jobsRepo.findAll();
    }

    @Scheduled(fixedRateString = "PT1M")
    public void createTasks(){
        List<Jobs> jobs = jobsRepo.getAllLessThanOneMin();
    }
}
