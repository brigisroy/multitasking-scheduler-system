package hell.fire.worker.repository;

import hell.fire.worker.model.Tasks;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface TaskRepository extends JpaRepository<Tasks, Long> {

    @Query(value = "select * from  task where job_id=?1", nativeQuery = true)
    List<Tasks> findAllByJobId(long id);

    @Query(value = "select * from task where start_datetime between ?1 and ?2", nativeQuery = true)
    List<Tasks> getAllByRangeTime(String startTime, String endTime);
}
