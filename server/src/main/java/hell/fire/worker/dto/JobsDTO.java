package hell.fire.worker.dto;

import lombok.Data;

import java.util.Date;

@Data
public class JobsDTO {
    private String name;
    private Date startDatetime;
    private Date finishDatetime;
    private String value;
    private int requiredCapacity;
    private int frequencyIHr;
    private int execTimeInMin;
}
