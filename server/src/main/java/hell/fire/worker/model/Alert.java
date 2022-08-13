package hell.fire.worker.model;

import lombok.Data;

import javax.persistence.*;

@Entity
@Table
@Data
public class Alert {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String emailId;
}
