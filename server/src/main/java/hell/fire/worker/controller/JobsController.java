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
@CrossOrigin
@RequestMapping("api")
public class JobsController {

    @Autowired
    private JobService jobService;

    @GetMapping("/jobs")
    public ResponseEntity<Object> getAllJobs() {
        return new ResponseEntity<>(jobService.getAllJobs(), HttpStatus.OK);
    }

    @PostMapping("/jobs")
    public ResponseEntity<List<Jobs>> createJob(@RequestBody List<JobsDTO> jobs) {
        return new ResponseEntity<>(jobService.createJob(jobs), HttpStatus.OK);
    }

    @PutMapping("/jobs")
    public ResponseEntity<String> updateJob(@RequestBody Jobs job){
        return new ResponseEntity<>(jobService.updateJob(job),HttpStatus.OK);
    }

    @DeleteMapping("/jobs/{id}")
    public ResponseEntity<String> updateJob(@PathVariable long job){
        return new ResponseEntity<>(jobService.deleteJob(job),HttpStatus.OK);
    }
    @GetMapping("/jobs/{id}")
    public ResponseEntity<Object> getTaskByJobId(@PathVariable long id) {
        return new ResponseEntity<>(jobService.getTaskByJobId(id), HttpStatus.OK);
    }

    @GetMapping("/jobs/range")
    public ResponseEntity<Object> getTasksInRange(@RequestParam("start_date") long start_date, @RequestParam("end_date") long end_date) {
        return new ResponseEntity<>(jobService.getAllTaskInRange(start_date, end_date), HttpStatus.OK);
    }
}
