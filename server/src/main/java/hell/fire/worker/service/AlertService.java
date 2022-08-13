package hell.fire.worker.service;

import hell.fire.worker.model.Alert;
import hell.fire.worker.repository.AlertRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AlertService {

    @Autowired
    AlertRepository alertRepo;

    public String addMailId(String mailId) {
        if (alertRepo.existsAlertByEmailId(mailId)) {
            return "Mail id Already exist";
        } else {
            Alert alert = new Alert();
            alert.setEmailId(mailId);
            alertRepo.save(alert);
            return "Mail id has been added";
        }
    }

    public String deleteMailId(int id) {

        if (alertRepo.existsById(Long.valueOf(id))) {
            alertRepo.deleteById(Long.valueOf(id));
            return "Mail id removed from mailing list";
        } else {
            return "invalid id";
        }


    }

    public List<Alert> getAllMailIdInAlertingList() {
        return alertRepo.findAll();
    }
}
