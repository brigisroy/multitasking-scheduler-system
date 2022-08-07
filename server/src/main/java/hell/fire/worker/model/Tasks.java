package hell.fire.worker.model;

import hell.fire.worker.model.eumus.JobsStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.util.Date;
@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "task")
public class Tasks {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private Date startDatetime;
    private String value;
    private int execTimeInMin = 0;
    @Column(columnDefinition = "enum('CREATED', 'STARTED', 'RUNNING', 'CANCELLED', 'STOPPED', 'COMPLETED')")
    @Enumerated(EnumType.STRING)
    private JobsStatus status;
    @CreationTimestamp
    private Date createAt;

    @ManyToOne
    private Jobs jobId;
}