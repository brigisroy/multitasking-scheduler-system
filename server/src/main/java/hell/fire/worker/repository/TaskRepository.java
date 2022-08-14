package hell.fire.worker.repository;

import hell.fire.worker.model.Tasks;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TaskRepository extends JpaRepository<Tasks, Long> {

    @Query(value = "select * from  task where job_id=?1", nativeQuery = true)
    List<Tasks> findAllByJobId(long id);

    @Query(value = "select * from task where start_datetime between ?1 and ?2", nativeQuery = true)
    List<Tasks> getAllByRangeTime(long startTime, long endTime);

    @Query(value = "select * from task where start_datetime < ?1 and status='CREATED'", nativeQuery = true)
    List<Tasks> findAllTaskCreatedLessThanOneMin(long now);

    @Query(value = "select * from task where start_datetime < ?1 and status='STARTED'", nativeQuery = true)
    List<Tasks> findAllTaskStartedLessThanOneMin(long now);

    @Query(value = "select * from task where start_datetime < ?1 and status='RUNNING'", nativeQuery = true)
    List<Tasks> findAllTaskRunningLessThanOneMin(long now);


    @Query(value = "select * from task where start_datetime < ?1 and status='COMPLETED'", nativeQuery = true)
    List<Tasks> findAllTaskCompletedLessThanOneMin(long now);
}
