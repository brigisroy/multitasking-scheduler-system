import React from "react"
import MUIDataTable from "mui-datatables";
import {
    Button,
    Col,
    Row,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Progress
} from "reactstrap";
import GridItem from "../../components/Grid/GridItem.js";
import GridContainer from "../../components/Grid/GridContainer.js";
import Axios from "axios";
import { withSnackbar } from "notistack";
import CONSTANTS from "../../variables/general.js"
import CommonHeader from "../../components/Headers/CommonHeader.js";
import { createTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class JobList extends React.Component {

    state = {
        tasks: []
    }

    componentDidMount() {
        this.getJobs()
    }

    getJobs() {
        let tasks = [
            { "name": "Import users sample", "start_datetime": "1659848651000", "finish_datetime": "1659970800000", "value": "50", "required_capacity": "10", "frequency_in_hr": "2", "exec_time_in_min": "80" },
            { "name": "Import devices sample", "start_datetime": "1659834251000", "finish_datetime": "1659909851000", "value": "40", "required_capacity": "40", "frequency_in_hr": "1", "exec_time_in_min": "30" },
            {
                exec_time_in_min: "120",
                finish_datetime: "1659884400000",
                frequency_in_hr: "2",
                name: "Delete cache",
                required_capacity: "12",
                start_datetime: "1659873600000",
                value: "11"
            },
        ]
        this.setState({ tasks })    //TODO REMOVE
        // Axios.get(`${CONSTANTS.SERVER_URL}/api/jobs/`, {})
        //     .then(res => {
        //         let tasks = [];
        //         res.data.forEach(trans => {
        //             tasks.push(trans)
        //         })
        //         this.setState({ tasks })
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

    handleDelete = (id) => {
        Axios.delete(`${CONSTANTS.SERVER_URL}/api/jobs/` + id)
            .then(res => {
                console.log(res);
                if (res.data === "success") {
                    this.props.enqueueSnackbar(
                        "Job Deleted Successfully",
                        {
                            variant: "success"
                        }
                    );
                }
                this.getJobs()
            })
            .catch(err => {
                console.log(err)
                this.props.enqueueSnackbar(
                    "Something went wrong",
                    {
                        variant: "warning"
                    }
                );
            });
    }

    getProgressBar = (start_datetime, finish_datetime) => {
        let current_dateTime = new Date().valueOf();
        let progress = 0.0;
        let color = ""
        // Completed
        if (current_dateTime >= finish_datetime) {
            progress = 100
            // Haven't started yet
        } else if (current_dateTime <= start_datetime) {
            progress = 0
            // In Progress
        } else {
            let exec_time_in_min = (finish_datetime -  start_datetime) / 60000
            // let ms_per_percent = exec_time_in_min / 100
            let passed_time_in_min = (current_dateTime - start_datetime)/60000
            // progress = passed_time_in_min * ms_per_percent / exec_time_in_min / 100
            progress = passed_time_in_min/exec_time_in_min*100
        }

        if (progress < 30) {
            color = "danger"
        } else if (progress < 70) {
            color = "warning"
        } else {
            color = "success"
        }

        return (<>
            <Progress
                max="100"
                value={progress}
                color={color}
            />
            {Math.round(progress * 100) / 100} %
        </>)
    }

    generateTableData = (rawData) => {
        const dataTable = []
        rawData.forEach((row) => {
            let newRow = [
                row.name,
                new Date(parseInt(row.start_datetime)).toLocaleString(),
                new Date(parseInt(row.finish_datetime)).toLocaleString(),
                row.required_capacity,
                row.value,
                row.exec_time_in_min,
                this.getProgressBar(parseInt(row.start_datetime), parseInt(row.finish_datetime)),
                <>
                    <Button className="btn-icon btn-2" size="sm" type="button" onClick={() => { window.location.href = "/admin/job/edit?id=" + row._id }}>
                        <i className="fa-solid fa-pen-to-square text-orange"></i>
                    </Button >
                    <Button className="btn-icon btn-2 " size="sm" type="button" onClick={() => { this.handleDelete(row._id) }}>
                        <i className="fa-regular fa-trash-can text-red"></i>
                    </Button>
                </>
            ]
            newRow.push()

            dataTable.push(newRow)
        })

        // //To Show the most recent tranaction on Top
        // dataTable.reverse();

        return dataTable
    }

    render() {
        const columns = [
            {
                name: "name", label: "Name",
            },
            {
                name: "start_datetime", label: "Start Date Time"
            },
            {
                name: "finish_datetime", label: "Finish Date Time"
            },
            {
                name: "required_capacity", label: "Capacity"
            },
            {
                name: "value", label: "Value"
            },
            {
                name: "exec_time_in_min", label: "Execution Time (mins)"
            },
            {
                name: "progress", label: "Progress"
            },
            {
                name: "action", label: "Action",
                options: {
                    filter: false, sort: false, print: false
                }
            }
        ];

        const options = {
            selectableRows: false,
        };

        return (
            <>
                <CommonHeader buttonText="Add Job" redirectURL={`/admin/create-job`} />
                <Col className=" mt--7 order-xl-1" xl="12">
                    <Card className="bg-secondary shadow">
                        <CardHeader className="bg-white border-0">
                            <Row className="align-items-center">
                                <Col xs="8">
                                    <h3 className="mb-0">Jobs</h3>
                                </Col>
                            </Row>
                        </CardHeader>
                        <CardBody>
                            <GridContainer>
                                <GridItem xs={12} sm={12} md={12}>
                                    <MUIDataTable title={""} data={this.generateTableData(this.state.tasks)} columns={columns} options={options} />
                                </GridItem>
                            </GridContainer>
                        </CardBody>
                        <CardFooter />
                    </Card>
                </Col>
            </>
        );

    }
}


export default withSnackbar(JobList);