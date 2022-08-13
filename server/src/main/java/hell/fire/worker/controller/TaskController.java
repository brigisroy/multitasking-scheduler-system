package hell.fire.worker.controller;

import hell.fire.worker.model.Tasks;
import hell.fire.worker.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("api")
public class TaskController {

    @Autowired
    TaskService taskService;

    @GetMapping("task")
    public ResponseEntity<List<Tasks>> getAllTask() {
        return new ResponseEntity<>(taskService.getAllTasks(), HttpStatus.OK);
    }

    @DeleteMapping("task/{id}")
    public ResponseEntity<String> deleteTask(@PathVariable("id") long taskId) {
        return new ResponseEntity<>(taskService.deleteTaskById(taskId), HttpStatus.OK);
    }
}
