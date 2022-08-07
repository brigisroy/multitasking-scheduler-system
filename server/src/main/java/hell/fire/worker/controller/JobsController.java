package hell.fire.worker.controller;

import hell.fire.worker.dto.JobsDTO;
import hell.fire.worker.service.JobService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("jobs")
public class JobsController {

    @Autowired
    private JobService jobService;

    @GetMapping("/")
    public ResponseEntity<Object> hello(){
        return new ResponseEntity<>(jobService.getAllJobs(), HttpStatus.OK);
    }

    @PostMapping("/")
    public ResponseEntity<Object> createJob(@RequestBody JobsDTO jobsDTO){
     return new ResponseEntity<>(jobService.createJob(jobsDTO),HttpStatus.OK);
    }
}