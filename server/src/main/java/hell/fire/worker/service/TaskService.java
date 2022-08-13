package hell.fire.worker.service;

import hell.fire.worker.model.Tasks;
import hell.fire.worker.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskService {

    @Autowired
    private TaskRepository taskRepo;


    public List<Tasks> getAllTasks() {
        return taskRepo.findAll();
    }

    public String deleteTaskById(long taskId) {

        if (taskRepo.existsById(taskId)) {
            taskRepo.deleteById(taskId);
            return "Task Deleted with " + taskId;
        } else {
            return "Invalid Id ";
        }
    }
}
