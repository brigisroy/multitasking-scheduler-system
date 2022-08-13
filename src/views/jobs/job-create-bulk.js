import React from "react";

import Papa from "papaparse";

// reactstrap components
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    FormGroup,
    Input,
    Container,
    Row,
    Col,
    CardFooter,
} from "reactstrap";

import CommonHeader from "components/Headers/CommonHeader.js";
import Axios from "axios";
import { withSnackbar } from "notistack";
import CONSTANTS from "./../../variables/general.js";
import { Link, Redirect } from "react-router-dom";


class JobCreateBulk extends React.Component {

    state = {
        jobs: [
            // {
            //     name: "",
            //     start_datetime: "", // new Date().valueOf(),
            //     finish_datetime: "",
            //     value: "",  // 1 - 100
            //     required_capacity: "", // 1 - 80
            //     frequency_in_hr: "", // In hours
            //     exec_time_in_min: ""
            // }
        ],
        isJobCreationSuccess: false,
        isSubmitBtnDisabled: false
    };

    // ======= Handler functions start =======

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
                    `Job ${index + 1}'s Name field is empty`,
                    {
                        variant: "error"
                    }
                );
                stopFlag = true;
                return null;
            }

            if (!job.start_datetime) {
                this.props.enqueueSnackbar(
                    `Job ${index + 1}'s Start date time field is empty`,
                    {
                        variant: "error"
                    }
                );
                stopFlag = true;
                return null;
            }


            if (!job.finish_datetime) {
                this.props.enqueueSnackbar(
                    `Job ${index + 1}'s Finish date time field is empty`,
                    {
                        variant: "error"
                    }
                );
                stopFlag = true;
                return null;
            }

            if (job.required_capacity < 1 || job.required_capacity > 80) {
                this.props.enqueueSnackbar(
                    `Job ${index + 1}'s Required capacity should be within 1 to 80`,
                    {
                        variant: "error"
                    }
                );
                stopFlag = true;
                return null;
            }


            if (job.value < 1 || job.value > 100) {
                this.props.enqueueSnackbar(
                    `Job ${index + 1}'s value should be within 1 to 100`,
                    {
                        variant: "error"
                    }
                );
                stopFlag = true;
                return null;
            }

            if (job.frequency_in_hr === "") {
                this.props.enqueueSnackbar(
                    `Job ${index + 1}'s Frequency field is empty`,
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
        Axios.post(`${CONSTANTS.SERVER_URL}/api/jobs`, payload.jobs)
            .then(res => {
                console.log(res);
                if (res.data === "success") {
                    this.props.enqueueSnackbar(
                        "Jobs successfully scheduled",
                        {
                            variant: "success"
                        }
                    );
                    this.setState({ isJobCreationSuccess: true })
                }
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

    handleFileUpload = (event) => {
        console.log("Parsing file...")
        console.log(event)
        Papa.parse(event.target.files[0], {
            header: true,
            skipEmptyLines: true,
            complete: function (results) {
                this.setState({ jobs: results.data })
            }.bind(this),
        });
    }

    // =======  Handler functions end  =======

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
                                            <h3 className="mb-0">Bulk Job Schedule Import</h3>
                                        </Col>
                                    </Row>
                                </CardHeader>
                                <CardBody>
                                    <Row className="align-items-center">
                                        <Col lg="4" />
                                        <Col lg="4">
                                            <FormGroup
                                                style={{ display: "block", margin: "100px auto" }}
                                            >
                                                <label className="form-control-label">
                                                    Import
                                                </label>
                                                <br />
                                                <Input
                                                    placeholder="Import"
                                                    className="form-control-alternative"
                                                    type="file"
                                                    accept=".csv"
                                                    autoComplete="off"
                                                    style={{ display: "block", padding: "10px" }}
                                                    onChange={this.handleFileUpload}
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col lg="4" />
                                    </Row>
                                    <Row>
                                        <Col lg="4" />
                                        <Col lg="4">
                                            <Link to={require("../../assets/multi_task_scheduler_template.csv").default} target="_blank" download>Download Sample Template</Link>
                                        </Col>
                                        <Col lg="4" />
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

// export default JobCreateBulk;
export default withSnackbar(JobCreateBulk);