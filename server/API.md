API: /api/job/ \
METHOD: POST \
BODY: \
{"
    tasks": [
        {
            "name":"Import users sample",
            "start_datetime":"1659848651000",
            "finish_datetime":"1659852251000",
            "value":"50",
            "required_capacity":"10",
            "frequency_in_hr":"2",
            "exec_time_in_min":"80"},
            {"name":"Import devices sample",
            "start_datetime":"1659834251000",
            "finish_datetime":"1659909851000",
            "value":"40",
            "required_capacity":"40",
            "frequency_in_hr":"1",
            "exec_time_in_min":"30"
        }
    ]
}

API: /api/job/ \
METHOD: PUT \
BODY: \
{"
    tasks":
    [
        {
            "id" : "1234567890",
            "name":"Import users sample",
            "start_datetime":"1659848651000",
            "finish_datetime":"1659852251000",
            "value":"50",
            "required_capacity":"10",
            "frequency_in_hr":"2",
            "exec_time_in_min":"80"},
            {"name":"Import devices sample",
            "start_datetime":"1659834251000",
            "finish_datetime":"1659909851000",
            "value":"40",
            "required_capacity":"40",
            "frequency_in_hr":"1",
            "exec_time_in_min":"30"
        }
    ]
}

\
API: /api/job/ \
METHOD: GET \
PARAM: start_date=${epoch}&end_date=${epoch}

# Mailer list
\

### Get Mailling list
API: /api/alert \
METHOD: GET

\

### To Add Mail id to mailing list
API: /api/alert?mailId=<mail_id>
METHOD: POST


### To delete mail id from mailing list
API: /api/alert/{id}
METHOD: DELETE


# task enopoints 

### Get All tasks 

API : /api/task \
METHOD: GET

### Delete task

API : /api/task/{task_id} \
METHOD: DELETE

> no update queries in task
