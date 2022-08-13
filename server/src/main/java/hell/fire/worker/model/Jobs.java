package hell.fire.worker.model;


import com.fasterxml.jackson.annotation.JsonProperty;
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
@Table(name = "jobs")
public class Jobs {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    @JsonProperty("start_datetime")
    private Long startDatetime;
    @JsonProperty("finish_datetime")
    private Long finishDatetime;
    private String value;
    @JsonProperty("required_capacity")
    private int requiredCapacity;
    @JsonProperty("frequency_in_hr")
    private int frequencyInHr;
    @JsonProperty("exec_time_in_min")
    private int execTimeInMin = 0;
    @Column(columnDefinition = "enum('CREATED', 'STARTED', 'RUNNING', 'CANCELLED', 'STOPPED', 'COMPLETED')")
    @Enumerated(EnumType.STRING)
    private JobsStatus status;
    @CreationTimestamp
    private Date createAt;
}
