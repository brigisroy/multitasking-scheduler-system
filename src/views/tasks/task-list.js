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

class TaskList extends React.Component {

    state = {
        tasks: []
    }

    componentDidMount() {
        this.getTasks()
    }

    getTasks() {
        Axios.get(`${CONSTANTS.SERVER_URL}/api/task/`)
            .then(res => {
                let tasks = [];
                res.data.forEach(task => {
                    tasks.push(task)
                })
                this.setState({ tasks })
            })
            .catch(err => {
                console.log(err)
                this.props.enqueueSnackbar(
                    "Something went wrong",
                    {
                        variant: "warning"
                    }
                );
            })
    }

    handleDelete = (id) => {
        Axios.delete(`${CONSTANTS.SERVER_URL}/api/task/` + id)
            .then(res => {
                console.log(res);
                if (res.data === "success") {
                    this.props.enqueueSnackbar(
                        "Task Deleted Successfully",
                        {
                            variant: "success"
                        }
                    );
                }
                this.getTasks()
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
            let exec_time_in_min = (finish_datetime - start_datetime) / 60000
            // let ms_per_percent = exec_time_in_min / 100
            let passed_time_in_min = (current_dateTime - start_datetime) / 60000
            // progress = passed_time_in_min * ms_per_percent / exec_time_in_min / 100
            progress = passed_time_in_min / exec_time_in_min * 100
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
                animated={progress != 100}
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
                Math.round((row.finish_datetime - row.start_datetime) / 60000),
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
                <CommonHeader/>
                <Col className=" mt--7 order-xl-1" xl="12">
                    <Card className="bg-secondary shadow">
                        <CardHeader className="bg-white border-0">
                            <Row className="align-items-center">
                                <Col xs="8">
                                    <h3 className="mb-0">Tasks</h3>
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


export default withSnackbar(TaskList);