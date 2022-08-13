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

class AlertConfig extends React.Component {

    state = {
        to_mail: []
    }

    componentDidMount() {
        Axios.get(`${CONSTANTS.SERVER_URL}/api/alert/`)
            .then(res => {
                console.log(res);
                this.setState(res.data)
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
        let to_mail = []
        let unparsedMail = e.target.value
        to_mail = unparsedMail.split(",")
        this.setState({to_mail})
    };

    handleSubmit = e => {
        console.log(this.state)
        Axios.post(`${CONSTANTS.SERVER_URL}/api/alert/`, this.state)
            .then(res => {
                console.log(res);
                this.props.enqueueSnackbar(
                    "Alert configured successfully",
                    {
                        variant: "success"
                    }
                );
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
                                            <h3 className="mb-0">Mail alerting</h3>
                                        </Col>
                                    </Row>
                                </CardHeader>
                                <CardBody>
                                    <Row className="align-items-center">
                                        <Col lg="6">
                                            <FormGroup>
                                                <label className="form-control-label">
                                                    Recipient mails
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