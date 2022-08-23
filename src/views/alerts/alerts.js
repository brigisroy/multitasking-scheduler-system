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
import MUIDataTable from "mui-datatables";
import GridItem from "../../components/Grid/GridItem.js";
import GridContainer from "../../components/Grid/GridContainer.js";
import { Divider } from "@material-ui/core";

class AlertConfig extends React.Component {

    state = {
        to_mail: "",
        mail: []
    }

    componentDidMount() {
        this.getAlerts()
    }

    getAlerts() {
        Axios.get(`${CONSTANTS.SERVER_URL}/api/alert/`)
            .then(res => {
                console.log(res);
                let mail = [];
                res.data.forEach((m) => {
                    mail.push(m);
                })
                this.setState({ mail });
            })
            .catch(err => {
                console.log(err)
                this.props.enqueueSnackbar(
                    "Something went wrong!",
                    {
                        variant: "warning"
                    }
                );
            })
    }

    handleChange = e => {
        console.log(e.target)
        let to_mail;
        to_mail = e.target.value
        this.setState({ to_mail })
    };

    handleSubmit = e => {
        console.log(this.state)
        Axios.post(`${CONSTANTS.SERVER_URL}/api/alert?mailId=` + this.state.to_mail)
            .then(res => {
                console.log(res);
                this.props.enqueueSnackbar(
                    "Alert configured successfully",
                    {
                        variant: "success"
                    }
                );
                this.setState({ to_mail: [] });
                this.getAlerts()
            })
            .catch(err => {
                console.log(err)
                this.props.enqueueSnackbar(
                    "Something went wrong!",
                    {
                        variant: "warning"
                    }
                );
            })
    }

    handleDelete = (id) => {
        Axios.delete(`${CONSTANTS.SERVER_URL}/api/alert/` + id)
            .then(res => {
                console.log(res);
                this.props.enqueueSnackbar(
                    "Deleted successfully",
                    {
                        variant: "success"
                    }
                );
                this.getAlerts();
            })
            .catch(err => {
                console.log(err)
                this.props.enqueueSnackbar(
                    "Something went wrong!",
                    {
                        variant: "warning"
                    }
                );
            })
    }


    generateTableData = (rawData) => {
        const dataTable = []
        rawData.forEach((row) => {
            console.log(row)
            let newRow = [
                row.emailId,
                <>
                    <Button className="btn-icon btn-2 " size="sm" type="button" onClick={() => { this.handleDelete(row.id) }}>
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
                name: "mailId", label: "Email ID"
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
                <CommonHeader />
                <Container>
                    <Row>
                        <Col className=" mt--7 order-xl-1" xl="12">
                            <Card className="bg-secondary shadow">
                                <CardHeader className="bg-white border-0">
                                    <Row className="align-items-center">
                                        <Col xs="8">
                                            <h3 className="mb-0">Mail alerting</h3>
                                        </Col>
                                    </Row>
                                </CardHeader>
                                <CardBody>
                                    <Row className="align-items-center">
                                        <Col lg="6">
                                            <FormGroup>
                                                <label className="form-control-label">
                                                    Add Recipient mails
                                                </label>
                                                <br />
                                                <Input
                                                    name="to_mail"
                                                    placeholder="Enter mails comma separated"
                                                    className="form-control-alternative"
                                                    type="string"
                                                    value={this.state.to_mail}
                                                    autoComplete="off"
                                                    onChange={this.handleChange}
                                                />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                </CardBody>
                                <CardFooter>
                                    <Button disabled={this.state.isSubmitBtnDisabled} color="info" onClick={this.handleSubmit}>
                                        Save
                                    </Button>
                                </CardFooter>

                            </Card>
                            <Card>
                                <CardHeader className="bg-white border-0">
                                    <Row className="align-items-center">
                                        <Col xs="8">
                                            <h3 className="mb-0">Mailing List</h3>
                                        </Col>
                                    </Row>
                                </CardHeader>
                                <CardBody>
                                    <GridContainer>
                                        <GridItem xs={12} sm={12} md={12}>
                                            <MUIDataTable title={""} data={this.generateTableData(this.state.mail)} columns={columns} options={options} />
                                        </GridItem>
                                    </GridContainer>
                                </CardBody>
                                <CardFooter />
                            </Card>
                        </Col>
                    </Row>

                </Container>

                {/* Redirect on submit */}
                {this.state.isJobCreationSuccess ? <Redirect to="/admin/list-jobs/" /> : null}

            </>
        )
    }
}

export default withSnackbar(AlertConfig);