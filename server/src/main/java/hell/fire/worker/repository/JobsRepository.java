package hell.fire.worker.repository;

import hell.fire.worker.model.Jobs;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface JobsRepository extends JpaRepository<Jobs,Long> {

    @Query(value = "select * from jobs where start_datetime < (NOW() - INTERVAL 1 MINUTE ) and status='CREATED'",nativeQuery = true)
    List<Jobs> getAllLessThanOneMin();
}
