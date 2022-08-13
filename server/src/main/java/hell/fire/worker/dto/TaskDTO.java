package hell.fire.worker.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class TaskDTO {
    private Long id;
    private String name;
    @JsonProperty("start_datetime")
    private Long startDatetime;
    private String value;
    @JsonProperty("exec_time_in_min")
    private int execTimeInMin = 0;
    private String status;
    @JsonProperty("required_capacity")
    private int requiredCapacity;
    @CreationTimestamp
    private Date createAt;
}
