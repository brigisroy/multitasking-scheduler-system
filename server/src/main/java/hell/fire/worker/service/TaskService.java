package hell.fire.worker.service;

import hell.fire.worker.model.Tasks;
import hell.fire.worker.model.eumus.JobsStatus;
import hell.fire.worker.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class TaskService {

    @Autowired
    private TaskRepository taskRepo;

    @Autowired
    private EmailService emailService;

    public List<Tasks> getAllTasks() {
        return taskRepo.findAll();
    }

    public String deleteTaskById(long taskId) {
        if (taskRepo.existsById(taskId)) {
            Tasks tasks = taskRepo.getById(taskId);
            taskRepo.delete(tasks);
            return "Task Deleted with " + taskId;
        } else {
            return "Invalid Id ";
        }
    }

    @Scheduled(fixedRateString = "PT1M")
    public void runTaskSetRunning() {
        long now = new Date().getTime();
        List<Tasks> tasksList = taskRepo.findAllTaskCreatedLessThanOneMin(now);
        tasksList.forEach(tasks -> {
            tasks.setStatus(JobsStatus.RUNNING);
        });
        emailService.triggerMailTaskList(taskRepo.saveAll(tasksList));
    }


    @Scheduled(fixedRateString = "PT5M")
    public void runTaskSetDone() {
        long now = new Date().getTime();
        List<Tasks> tasksList = taskRepo.findAllTaskRunningLessThanOneMin(now);
        tasksList.forEach(tasks -> {
            tasks.setStatus(JobsStatus.COMPLETED);
        });
         emailService.triggerMailTaskList(taskRepo.saveAll(tasksList));
    }
}
