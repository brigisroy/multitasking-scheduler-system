import React from "react";

import Datetime from "react-datetime";

// reactstrap components
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    FormGroup,
    Form,
    Input,
    Container,
    Row,
    Col,
    CardFooter,
    InputGroup,
    InputGroupAddon,
    InputGroupText
} from "reactstrap";

import CommonHeader from "components/Headers/CommonHeader.js";
import Axios from "axios";
import { withSnackbar } from "notistack";
import CONSTANTS from "./../../variables/general.js";
import { Redirect } from "react-router-dom";

class JobEdit extends React.Component {
    state = {
        jobs: [
            {
                id: "",
                name: "",
                start_datetime: "",
                finish_datetime: "",
                value: "",  // 1 - 100
                required_capacity: "", // 1 - 80
                frequency_in_hr: "", // In hours
                exec_time_in_min: ""
            }
        ],
        isJobEditSuccess: false,
        isSubmitBtnDisabled: false
    };

    // ======= Handler functions start =======

    componentDidMount() {
        let job_id = 9 //Get job id
        Axios.get(`${CONSTANTS.SERVER_URL}/api/jobs/${job_id}`)
            .then(res => {
                console.log(res);
                let jobs = []
                jobs.push(
                    res.data
                    //TODO: Put response here
                )
                this.setState({ jobs: jobs })
            })
    }

    handleSubmit = e => {
        console.log(this.state.jobs)
        let payload = {};
        payload.jobs = this.state.jobs;

        if (payload.jobs.length === 0) {
            this.props.enqueueSnackbar("Atleast 1 Job needed", {
                variant: "error"
            });
            return;
        }

        let stopFlag = false;
        payload.jobs.map((job, index) => {
            if (!job.name) {
                this.props.enqueueSnackbar(
                    `Job's Name field is empty`,
                    {
                        variant: "error"
                    }
                );
                stopFlag = true;
                return null;
            }

            if (!job.start_datetime) {
                this.props.enqueueSnackbar(
                    `Job's Start date time field is empty`,
                    {
                        variant: "error"
                    }
                );
                stopFlag = true;
                return null;
            }


            if (!job.finish_datetime) {
                this.props.enqueueSnackbar(
                    `Job's Finish date time field is empty`,
                    {
                        variant: "error"
                    }
                );
                stopFlag = true;
                return null;
            }

            if (job.required_capacity < 1 || job.required_capacity > 80) {
                this.props.enqueueSnackbar(
                    `Job's Required capacity should be within 1 to 80`,
                    {
                        variant: "error"
                    }
                );
                stopFlag = true;
                return null;
            }

            if (job.value < 1 || job.value > 100) {
                this.props.enqueueSnackbar(
                    `Job's value should be within 1 to 100`,
                    {
                        variant: "error"
                    }
                );
                stopFlag = true;
                return null;
            }

            if (job.frequency_in_hr === "") {
                this.props.enqueueSnackbar(
                    `Job's Frequency field is empty`,
                    {
                        variant: "error"
                    }
                );
                stopFlag = true;
                return null;
            }

            return null;
        });

        if (stopFlag) {
            return;
        }

        this.setState({ isSubmitBtnDisabled: true })
        // Axios.put(`${CONSTANTS.SERVER_URL}/api/jobs`,
        // {
        //     id: 11,
        //     name: "import dd uu", 
        //     start_datetime: 1661193000000,
        //     exec_time_in_min: "12",
        //     finish_datetime: 1661279400000,
        //     frequency_in_hr: "1",
        //     required_capacity: "33",
        // })
        Axios.put(`${CONSTANTS.SERVER_URL}/api/jobs/`, payload.jobs[0])
            .then(res => {
                console.log(res);
                this.props.enqueueSnackbar(
                    "Job Edited Successfully",
                    {
                        variant: "success"
                    }
                );
                this.setState({ isJobEditSuccess: true })
            })
            .catch(err => {
                console.log(err)
                this.setState({ isSubmitBtnDisabled: false })
                this.props.enqueueSnackbar(
                    "Something went wrong!",
                    {
                        variant: "warning"
                    }
                );
            })
            .finally(() => {

            });
    };

    handleDateChange = (val, target) => {
        this.handleChange({
            target: target
        });
    }

    // handleAddJob = () => {
    //     let jobs = this.state.jobs
    //     jobs.push({
    //         name: "",
    //         start_datetime: "", // new Date().valueOf()
    //         finish_datetime: "",
    //         value: "",  // 1 - 100
    //         required_capacity: "", // 1 - 80
    //         frequency_in_hr: "", // In hours
    //         exec_time_in_min: ""
    //     })
    //     this.setState({ jobs: jobs })
    // };

    handleChange = e => {
        const index = e.target.id;
        const job_name = e.target.name;
        let jobs = this.state.jobs
        jobs[index][job_name] = e.target.value
        this.setState({ jobs: jobs }
        )
    };

    // =======  Handler functions end  =======

    constructQuantityCards = () => {
        return this.state.jobs.map((job, index) => {
            return (
                <div key={index} >
                    <Row>
                        <Col className="order-xl-1" xl="12">
                            <Card className="bg-secondary shadow">
                                <CardHeader className="bg-white border-0">
                                    <Row className="align-items-center">
                                        <Col xs="8">
                                            <h3 className="mb-0">Job</h3>
                                        </Col>
                                        {/* <Col className="text-right">
                                            <Button
                                                name={index}
                                                index={index}
                                                color="danger"
                                                onClick={this.handleRemoveJob}
                                                size="sm"
                                            >
                                                - remove
                                            </Button>
                                        </Col> */}
                                    </Row>
                                </CardHeader>
                                <CardBody>
                                    <Form>
                                        <div className="pl-lg-4">
                                            <Row>
                                                <Col lg="12">
                                                    <FormGroup>
                                                        <label className="form-control-label">
                                                            Job name
                                                        </label>
                                                        <br />
                                                        <Input
                                                            id={index}
                                                            name="name"
                                                            placeholder="Job name"
                                                            className="form-control-alternative"
                                                            type="string"
                                                            value={this.state.jobs[index].name}
                                                            autoComplete="off"
                                                            onChange={this.handleChange}
                                                        />
                                                    </FormGroup>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col lg="6">
                                                    {/* <FormGroup> */}
                                                    <label className="form-control-label">
                                                        Job Start Datetime
                                                    </label>
                                                    <br />
                                                    <FormGroup>
                                                        <InputGroup className="input-group-alternative">
                                                            <InputGroupAddon addonType="prepend">
                                                                <InputGroupText>
                                                                    <i className="ni ni-calendar-grid-58" />
                                                                </InputGroupText>
                                                            </InputGroupAddon>
                                                            <Datetime
                                                                inputProps={{
                                                                    placeholder: "Job Start Date Time"
                                                                }}
                                                                type="datetime"
                                                                value={this.state.jobs[index].start_datetime}
                                                                onChange={(e) => this.handleDateChange(e, {
                                                                    name: "start_datetime",
                                                                    value: e.valueOf(),
                                                                    id: index
                                                                })}
                                                            />
                                                        </InputGroup>
                                                    </FormGroup>
                                                </Col>
                                                <Col lg="6">
                                                    <FormGroup>
                                                        <label className="form-control-label">
                                                            Job End Datetime
                                                        </label>
                                                        <br />
                                                        <InputGroup className="input-group-alternative">
                                                            <InputGroupAddon addonType="prepend">
                                                                <InputGroupText>
                                                                    <i className="ni ni-calendar-grid-58" />
                                                                </InputGroupText>
                                                            </InputGroupAddon>
                                                            <Datetime
                                                                inputProps={{
                                                                    placeholder: "Job End Time",
                                                                    // disabled: true
                                                                }}
                                                                type="datetime"
                                                                onChange={(e) => this.handleDateChange(e, {
                                                                    name: "finish_datetime",
                                                                    value: e.valueOf(),
                                                                    id: index
                                                                })}
                                                                value={this.state.jobs[index].finish_datetime}
                                                            />
                                                        </InputGroup>
                                                    </FormGroup>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col lg="6">
                                                    <FormGroup>
                                                        <label className="form-control-label">
                                                            Required Capacity
                                                        </label>
                                                        <br />
                                                        <Input
                                                            id={index}
                                                            name="required_capacity"
                                                            placeholder="Required Capacity (1 to 80)"
                                                            className="form-control-alternative"
                                                            type="number"
                                                            value={this.state.jobs[index].required_capacity}
                                                            autoComplete="off"
                                                            onChange={this.handleChange}
                                                        />
                                                    </FormGroup>
                                                </Col>
                                                <Col lg="6">
                                                    <FormGroup>
                                                        <label className="form-control-label">
                                                            Value
                                                        </label>
                                                        <br />
                                                        <Input
                                                            id={index}
                                                            name="value"
                                                            placeholder="Value (1 to 100)"
                                                            className="form-control-alternative"
                                                            type="string"
                                                            value={this.state.jobs[index].value}
                                                            autoComplete="off"
                                                            onChange={this.handleChange}
                                                        />
                                                    </FormGroup>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col lg="6">
                                                    <FormGroup>
                                                        <label className="form-control-label">
                                                            Frequency in hours
                                                        </label>
                                                        <br />
                                                        <Input
                                                            id={index}
                                                            name="frequency_in_hr"
                                                            placeholder="Frequency in hours"
                                                            className="form-control-alternative"
                                                            type="number"
                                                            min="1"
                                                            max="80"
                                                            value={this.state.jobs[index].frequency_in_hr}
                                                            autoComplete="off"
                                                            onChange={this.handleChange}
                                                        />
                                                    </FormGroup>
                                                </Col>
                                                <Col lg="6">
                                                    <FormGroup>
                                                        <label className="form-control-label">
                                                            Execution time in mins (Simulated)
                                                        </label>
                                                        <br />
                                                        <Input
                                                            id={index}
                                                            name="exec_time_in_min"
                                                            placeholder="Execution time in mins"
                                                            className="form-control-alternative"
                                                            type="number"
                                                            min="1"
                                                            max="80"
                                                            value={this.state.jobs[index].exec_time_in_min}
                                                            autoComplete="off"
                                                            onChange={this.handleChange}
                                                        />
                                                    </FormGroup>
                                                </Col>
                                            </Row>
                                        </div>
                                    </Form>
                                </CardBody>
                                <CardFooter></CardFooter>
                            </Card>
                        </Col>
                    </Row>
                    <br />
                </div>
            );
        });
    };

    render() {
        return (
            <>
                <CommonHeader />
                <Container>
                    <Row>
                        <Col className=" mt--7 order-xl-1" xl="12">
                            <Card className="bg-secondary shadow">
                                <CardHeader className="bg-white border-0">
                                    <Row className="align-items-center">
                                        <Col xs="8">
                                            <h3 className="mb-0">Job Scheduling</h3>
                                        </Col>
                                    </Row>
                                </CardHeader>
                                <CardBody>

                                    {this.constructQuantityCards()}

                                    {/* <Row className="align-items-center">
                                        <Col className="text-right">
                                            <Button
                                                color="primary"
                                                onClick={this.handleAddJob}
                                                size="sm"
                                            >
                                                + new Job
                                            </Button>
                                        </Col>
                                    </Row> */}
                                </CardBody>
                                <CardFooter>
                                    <Button disabled={this.state.isSubmitBtnDisabled} color="info" onClick={this.handleSubmit}>
                                        Schedule
                                    </Button>
                                </CardFooter>
                            </Card>
                        </Col>
                    </Row>
                </Container>

                {/* Redirect on submit */}
                {this.state.isJobEditSuccess ? <Redirect to="/admin/list-jobs/" /> : null}

            </>
        );
    }
}

// export default JobEdit;
export default withSnackbar(JobEdit);