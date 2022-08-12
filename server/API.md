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

\
API: /api/alert_config \
METHOD: GET

\
API: /api/alert_config
METHOD: POST
BODY: {
    "to_mail" : ["admin@hellfire.com", "dev@hellfire.com"] 
}