package hell.fire.worker.repository;

import hell.fire.worker.model.Alert;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AlertRepository extends JpaRepository<Alert, Long> {

    boolean existsAlertByEmailId(String mailId);

    Alert findAlertByEmailId(String mailId);

    void deleteAlertByEmailId(String mailId);

    @Query(value = "Select email_id from alert", nativeQuery = true)
    List<String> onlyMailIds();
}
