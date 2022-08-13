package hell.fire.worker.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.util.Date;

@Data
public class JobsDTO {
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
    private int execTimeInMin;
}
