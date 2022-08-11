package hell.fire.worker.controller;

import hell.fire.worker.dto.JobsDTO;
import hell.fire.worker.model.Jobs;
import hell.fire.worker.service.JobService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("apis")
public class JobsController {

    @Autowired
    private JobService jobService;

    @GetMapping("/jobs")
    public ResponseEntity<Object> getAllJobs(){
        return new ResponseEntity<>(jobService.getAllJobs(), HttpStatus.OK);
    }

    @PostMapping("/jobs")
    public ResponseEntity<List<Jobs>> createJob(@RequestBody List<JobsDTO> jobsDTO){
     return new ResponseEntity<>(jobService.createJob(jobsDTO),HttpStatus.OK);
    }

    @GetMapping("/jobs/{id}")
    public ResponseEntity<Object> getTaskByJobId(@PathVariable long id ){
        return new ResponseEntity<>(jobService.getTaskByJobId(id), HttpStatus.OK);
    }

}
