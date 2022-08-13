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
        tasks: [
            {
                name: "",
                start_datetime: "", // new Date().valueOf(),
                finish_datetime: "",
                value: "",  // 1 - 100
                required_capacity: "", // 1 - 80
                frequency_in_hr: "", // In hours
                exec_time_in_min: ""
            }
        ],
        isJobCreationSuccess: false,
        isSubmitBtnDisabled: false
    };

    // ======= Handler functions start =======

    handleSubmit = e => {
        console.log(this.state.tasks)
        let payload = {};
        payload.tasks = this.state.tasks;

        if (payload.tasks.length === 0) {
            this.props.enqueueSnackbar("Atleast 1 Task needed", {
                variant: "error"
            });
            return;
        }

        let stopFlag = false;
        payload.tasks.map((task, index) => {
            if (!task.name) {
                this.props.enqueueSnackbar(
                    `Task ${index + 1}'s Name field is empty`,
                    {
                        variant: "error"
                    }
                );
                stopFlag = true;
                return null;
            }

            if (!task.start_datetime) {
                this.props.enqueueSnackbar(
                    `Task ${index + 1}'s Start date time field is empty`,
                    {
                        variant: "error"
                    }
                );
                stopFlag = true;
                return null;
            }

            if (!task.finish_datetime) {
                this.props.enqueueSnackbar(
                    `Task ${index + 1}'s Finish date time field is empty`,
                    {
                        variant: "error"
                    }
                );
                stopFlag = true;
                return null;
            }

            if (task.required_capacity < 1 || task.required_capacity > 80) {
                this.props.enqueueSnackbar(
                    `Task ${index + 1}'s Required capacity should be within 1 to 80`,
                    {
                        variant: "error"
                    }
                );
                stopFlag = true;
                return null;
            }

            if (task.value < 1 || task.value > 100) {
                this.props.enqueueSnackbar(
                    `Task ${index + 1}'s value should be within 1 to 100`,
                    {
                        variant: "error"
                    }
                );
                stopFlag = true;
                return null;
            }

            if (task.frequency_in_hr === "") {
                this.props.enqueueSnackbar(
                    `Task ${index + 1}'s Frequency field is empty`,
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
        Axios.post(`${CONSTANTS.SERVER_URL}/api/jobs/create`, payload)
            .then(res => {
                console.log(res);
                this.props.enqueueSnackbar(
                    "Tasks successfully scheduled",
                    {
                        variant: "success"
                    }
                )
                this.setState({ isJobCreationSuccess: true })
            })
            .catch(err => {
                this.setState({ isSubmitBtnDisabled: false })
                console.log(err)
                this.props.enqueueSnackbar(
                    "Something went wrong!",
                    {
                        variant: "warning"
                    }
                );
            });
    };

    handleDateChange = (val, target) => {
        this.handleChange({
            target: target
        });
    }

    handleAddTask = () => {
        let tasks = this.state.tasks
        tasks.push({
            name: "",
            start_datetime: "", // new Date().valueOf()
            finish_datetime: "",
            value: "",  // 1 - 100
            required_capacity: "", // 1 - 80
            frequency_in_hr: "", // In hours
            exec_time_in_min: ""
        })
        this.setState({ tasks: tasks })
    };

    handleChange = e => {
        const index = e.target.id;
        const task_name = e.target.name;
        let tasks = this.state.tasks
        tasks[index][task_name] = e.target.value
        this.setState({ tasks: tasks }
            // , () => {
            // if (this.state.tasks[index].start_datetime && this.state.tasks[index].exec_time_in_min) {
            //     let tasks = this.state.tasks;
            //     let start_time = new Date(tasks[index].start_datetime);
            //     tasks[index].finish_datetime = start_time.setMinutes(start_time.getMinutes() + tasks[index].exec_time_in_min).valueOf()
            //     this.setState({ tasks: tasks })
            // }
            // }
        )
    };

    handleRemoveTask = e => {
        const index = e.target.name;
        let tasks = this.state.tasks;
        tasks.splice(index, 1);
        this.setState({ tasks: tasks })
    };

    // =======  Handler functions end  =======

    constructQuantityCards = () => {
        return this.state.tasks.map((task, index) => {
            return (
                <div key={index} >
                    <Row>
                        <Col className="order-xl-1" xl="12">
                            <Card className="bg-secondary shadow">
                                <CardHeader className="bg-white border-0">
                                    <Row className="align-items-center">
                                        <Col xs="8">
                                            <h3 className="mb-0">Task {index + 1} </h3>
                                        </Col>
                                        <Col className="text-right">
                                            <Button
                                                name={index}
                                                index={index}
                                                color="danger"
                                                onClick={this.handleRemoveTask}
                                                size="sm"
                                            >
                                                - remove
                                            </Button>
                                        </Col>
                                    </Row>
                                </CardHeader>
                                <CardBody>
                                    <Form>
                                        <div className="pl-lg-4">
                                            <Row>
                                                <Col lg="12">
                                                    <FormGroup>
                                                        <label className="form-control-label">
                                                            Task name
                                                        </label>
                                                        <br />
                                                        <Input
                                                            id={index}
                                                            name="name"
                                                            placeholder="Task name"
                                                            className="form-control-alternative"
                                                            type="string"
                                                            value={this.state.tasks[index].name}
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
                                                        Task Start Datetime
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
                                                                    placeholder: "Task Start Date Time"
                                                                }}
                                                                type="datetime"
                                                                value={this.state.tasks[index].start_datetime}
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
                                                    {/*<FormGroup>*/}
                                                    {/*    <label className="form-control-label">*/}
                                                    {/*        Task End Datetime (Predicted)*/}
                                                    {/*    </label>*/}
                                                    {/*    <br />*/}
                                                    {/*    <InputGroup className="input-group-alternative">*/}
                                                    {/*        <InputGroupAddon addonType="prepend">*/}
                                                    {/*            <InputGroupText>*/}
                                                    {/*                <i className="ni ni-calendar-grid-58" />*/}
                                                    {/*            </InputGroupText>*/}
                                                    {/*        </InputGroupAddon>*/}
                                                    {/*        <Datetime*/}
                                                    {/*            inputProps={{*/}
                                                    {/*                placeholder: "Task End Time",*/}
                                                    {/*                disabled: true*/}
                                                    {/*            }}*/}
                                                    {/*            type="datetime"*/}
                                                    {/*            onChange={(e) => this.handleDateChange(e, {*/}
                                                    {/*                name: "finish_datetime",*/}
                                                    {/*                value: e.valueOf(),*/}
                                                    {/*                id: index*/}
                                                    {/*            })}*/}
                                                    {/*            // value={this.state.tasks[index].finish_datetime ? new Date(this.state.tasks[index].finish_datetime) : "Enter Start and Execution time to see Task End Time"}*/}
                                                    {/*        />*/}
                                                    {/*    </InputGroup>*/}
                                                    {/*</FormGroup>*/}
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
                                                            value={this.state.tasks[index].required_capacity}
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
                                                            value={this.state.tasks[index].value}
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
                                                            value={this.state.tasks[index].frequency_in_hr}
                                                            autoComplete="off"
                                                            onChange={this.handleChange}
                                                        />
                                                    </FormGroup>
                                                </Col>
                                                <Col lg="6">
                                                    <FormGroup>
                                                        <label className="form-control-label">
                                                            Execution time in mins
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
                                                            value={this.state.tasks[index].exec_time_in_min}
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
                                            <h3 className="mb-0">Edit Scheduled Task</h3>
                                        </Col>
                                    </Row>
                                </CardHeader>
                                <CardBody>

                                    {this.constructQuantityCards()}

                                    <Row className="align-items-center">
                                        <Col className="text-right">
                                            <Button
                                                color="primary"
                                                onClick={this.handleAddTask}
                                                size="sm"
                                            >
                                                + new Task
                                            </Button>
                                        </Col>
                                    </Row>
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
                {this.state.isJobCreationSuccess ? <Redirect to="/admin/job/" /> : null}

            </>
        );
    }
}

// export default JobEdit;
export default withSnackbar(JobEdit);