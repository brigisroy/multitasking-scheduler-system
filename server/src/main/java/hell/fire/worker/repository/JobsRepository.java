package hell.fire.worker.repository;

import hell.fire.worker.model.Jobs;
import hell.fire.worker.model.Tasks;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface JobsRepository extends JpaRepository<Jobs,Long> {

    @Query(value = "select * from jobs where start_datetime < ?1 and status='CREATED'",nativeQuery = true)
    List<Jobs> getAllLessThanOneMin(long now);

    @Query(value = "select * from jobs where start_datetime > ?1 and start_datetime < ?2", nativeQuery = true)
    List<Tasks> getAllJobsByRangeTime(long startTime, long endTime);
}
