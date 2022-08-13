import React from "react";
import ReactDatetime from "react-datetime";
import MUIDataTable from "mui-datatables";
// reactstrap components
import {
    Input,
    Button,
    Card,
    CardHeader,
    CardBody,
    FormGroup,
    InputGroupAddon,
    InputGroupText,
    InputGroup,
    Form,
    Row,
    Col,
    CardFooter
} from "reactstrap";
// import Select from "react-select";
import Axios from "axios";
import { withSnackbar } from "notistack";
import TaskList from "views/tasks/task-list.js";

class DateSearch extends React.Component {

    state = {
        from_date: "",
        to_date: "",
        filtered_tasks: [],
        isValidFromDate: false,
        isValidToDate: false,
    }

    getdata = e => {
        // Module Specific Check
        var link = this.props.submitLink;
        const from_date = this.state.from_date;
        const to_date = this.state.to_date;
        if (!from_date || !to_date) {
            this.props.enqueueSnackbar(
                "Select From Date and To Date",
                {
                    variant: "error"
                }
            );
            return;
        }
        if (to_date <= from_date) {
            this.props.enqueueSnackbar(
                "From date should should be less than To Date",
                {
                    variant: "error"
                }
            );
            return;
        }
        let from_date_min = new Date(from_date).setHours(0, 0, 0, 0)
        let to_date_max = new Date(to_date).setHours(23, 59, 59, 99)
        this.setState({from_date:from_date_min})
        this.setState({to_date:to_date_max})
        // Axios.get(link + `?start_datetime=${from_date_min}&finish_datetime=${to_date_max}`)
        //     .then(res => {
        //         let filtered_tasks = [];
        //         res.data.forEach(trans => {
        //             filtered_tasks.push(trans)
        //         })
        //         this.setState({ filtered_tasks })
        //     })
        //     .catch(err => {
        //         console.log(err)
        //         this.props.enqueueSnackbar(
        //             "Something went wrong",
        //             {
        //                 variant: "warning"
        //             }
        //         );
        //     })

    }

    handleFromDateChange = e => {
        if (e.isValid) {
            const DATE = e.valueOf();
            this.setState({ from_date: DATE }, console.log(this.state));
            this.setState({ isValidFromDate: true });
        } else {
            this.setState({ isValidFromDate: false });
        }
    };

    handleToDateChange = e => {
        if (e.isValid) {
            const DATE = e.valueOf();
            this.setState({ to_date: DATE }, console.log(this.state));
            this.setState({ isValidToDate: true });
        } else {
            this.setState({ isValidToDate: false });
        }
    };

    render() {
        return (
            <>
                <div style={{ padding: "20px" }}>
                    <Row>
                        <Col className=" mt--7 order-xl-1" xl="12">
                            <Card className="bg-secondary shadow">
                                <CardHeader className="bg-white border-0">
                                    <Row className="align-items-center">
                                        <Col xs="8">
                                            <h3 className="mb-0">List Tasks</h3>
                                        </Col>
                                    </Row>
                                </CardHeader>
                                <CardBody>
                                    <Form>
                                        <h6 className="heading-small text-muted mb-4">
                                            Filter Tasks
                                        </h6>
                                        <div className="pl-lg-4">
                                            <Row>
                                                <Col lg="6">
                                                    <FormGroup>
                                                        <label className="form-control-label">From</label>
                                                        <FormGroup>
                                                            <InputGroup className="input-group-alternative">
                                                                <InputGroupAddon addonType="prepend">
                                                                    <InputGroupText>
                                                                        <i className="ni ni-calendar-grid-58" />
                                                                    </InputGroupText>
                                                                </InputGroupAddon>
                                                                <ReactDatetime
                                                                    inputProps={{
                                                                        placeholder: "From date"
                                                                    }}
                                                                    utc={true}
                                                                    defaultValue={new Date()}
                                                                    dateFormat="DD-MM-YYYY"
                                                                    timeFormat={false}
                                                                    onChange={this.handleFromDateChange}
                                                                />
                                                            </InputGroup>
                                                        </FormGroup>
                                                    </FormGroup>
                                                </Col>
                                                <Col lg="6">
                                                    <FormGroup>
                                                        <label className="form-control-label">To</label>
                                                        <FormGroup>
                                                            <InputGroup className="input-group-alternative">
                                                                <InputGroupAddon addonType="prepend">
                                                                    <InputGroupText>
                                                                        <i className="ni ni-calendar-grid-58" />
                                                                    </InputGroupText>
                                                                </InputGroupAddon>
                                                                <ReactDatetime
                                                                    inputProps={{
                                                                        placeholder: "To date"
                                                                    }}
                                                                    utc={true}
                                                                    defaultValue={new Date()}
                                                                    dateFormat="DD-MM-YYYY"
                                                                    timeFormat={false}
                                                                    onChange={this.handleToDateChange}
                                                                />
                                                            </InputGroup>
                                                        </FormGroup>
                                                    </FormGroup>
                                                </Col>
                                            </Row>
                                        </div>
                                    </Form>
                                </CardBody>
                                <CardFooter>
                                    <Button
                                        color="info"
                                        onClick={this.getdata}
                                    >
                                        Get Tasks List
                                    </Button>
                                </CardFooter>
                            </Card>
                        </Col>
                    </Row>
                </div>
                {
                    this.state.filtered_tasks != 0 ?
                        <>
                            <div style={{ padding: "50px" }}></div>
                            <TaskList isSubSection={true} />
                        </> : <></>
                }
            </>
        )
    }
}

export default withSnackbar(DateSearch);