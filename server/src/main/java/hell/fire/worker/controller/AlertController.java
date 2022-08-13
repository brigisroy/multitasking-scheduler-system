package hell.fire.worker.controller;


import hell.fire.worker.model.Alert;
import hell.fire.worker.service.AlertService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api")
public class AlertController {


    @Autowired
    private AlertService alertService;

    @GetMapping("alert")
    public ResponseEntity<List<Alert>> getAllMailingId() {
        return new ResponseEntity<>(alertService.getAllMailIdInAlertingList(), HttpStatus.OK);
    }

    @PostMapping("alert")
    public ResponseEntity<String> addToMailingList(@RequestParam String mailId){
        return new ResponseEntity<>(alertService.addMailId(mailId),HttpStatus.OK);
    }


    @DeleteMapping("alert/{id}")
    public ResponseEntity<String> removeMailIdFromMailingList(@PathVariable("id") int id){
        return new ResponseEntity<>(alertService.deleteMailId(id),HttpStatus.OK);
    }
}

