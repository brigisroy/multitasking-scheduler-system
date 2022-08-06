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
import GridItem from "../../components/Grid/GridItem.js";
import GridContainer from "../../components/Grid/GridContainer.js";
import { createMuiTheme, MuiThemeProvider, withStyles } from '@material-ui/core/styles';
import Axios from "axios";
import { withSnackbar } from "notistack";
import ReactToPrint from 'react-to-print';
// import PrintStatement from "components/Print/PrintStatement.js";

const customStyles = {
    CustomStyles: {
        '& td': { backgroundColor: "#FAA", boxShadow: "0 8px 4px 0 rgba(0, 0, 0, 0.2)" }
    },
    NameCell: {
        fontWeight: 900
    },
};

class DateSearch extends React.Component {
    // constructor(props) {
    //     super(props);
    // }

    state = {
        data: [],
        from_date: new Date().toISOString(),
        to_date: new Date().toISOString(),
        filter: {
            user_id: ""
        },
        isValidFromDate: false,
        isValidToDate: false,
        isDataReceived: false,
        closing_balance: "",
        opening_balance: "",
        isStatement: false
    }

    getdata = e => {
        // Module Specific Check
        var link = this.props.submitLink;
        this.setState({ isDataReceived: false })
        const from_date = new Date(this.state.from_date);
        const to_date = new Date(this.state.to_date);
        if (!(to_date - from_date >= 0)) {
            this.props.enqueueSnackbar(
                "From date should should be less than To Date",
                {
                    variant: "error"
                }
            );
            return;
        }
        from_date.setHours(0, 0, 0, 0)
        to_date.setHours(23, 59, 59, 99)
        this.props.disableSubmitButton(true);
        Axios.get(link + `${from_date.toISOString()}/${to_date.toISOString()}/${this.state.filter.user_id}`)
            .then(res => {
                this.props.disableSubmitButton(false);

                let data = [];
                if (this.props.module === "statement") {
                    this.setState({ isStatement: true })
                    this.setState({ opening_balance: res.data[0].opening_balance })
                    this.setState({ closing_balance: res.data[0].closing_balance })

                }
                res.data.forEach(trans => {
                    data.push(trans)
                })

                this.setState({ data })

                this.setState({ isDataReceived: true })
            })
            .catch(err => {
                this.props.enqueueSnackbar(
                    //TODO : Perform proper error handling
                    err.response !== undefined ? (err.response.data.message !== undefined ? err.response.data.message : "No Result Found") : "No Result Found",
                    {
                        variant: "warning"
                    }
                );
            })

    }

    handleFromDateChange = e => {
        if (e.isValid) {
            const DATE = e.format();
            this.setState({ from_date: DATE }, console.log(this.state));
            this.setState({ isValidFromDate: true });
        } else {
            this.setState({ isValidFromDate: false });
        }
    };

    handleToDateChange = e => {
        if (e.isValid) {
            const DATE = e.format();
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
                                            <h3 className="mb-0">Statement</h3>
                                        </Col>
                                    </Row>
                                </CardHeader>
                                <CardBody>
                                    <Form>
                                        <h6 className="heading-small text-muted mb-4">
                                            Statement
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
                                        disabled={this.props.isSubmitBtnDisabled}
                                        color="info"
                                        onClick={this.getdata}
                                    >
                                        Get Jobs List
                                    </Button>
                                </CardFooter>
                            </Card>
                        </Col>
                    </Row>
                    {this.state.isDataReceived ? <ListView user_id={this.state.filter.user_id} data={this.state.data} columns={this.props.columns} generateTableData={this.props.generateTableData} module={this.props.module} from={this.state.from_date} to={this.state.to_date} options={this.props.options} opening_balance={this.state.opening_balance} closing_balance={this.state.closing_balance} isStatement={this.state.isStatement} /> : ""}
                </div>
            </>
        )
    }
}

class ListView extends React.Component {

    getMuiTheme = () => createMuiTheme({
        overrides: {
            MUIDataTable: {
                root: {
                    // boxShadow: "grey"
                },
                paper: {
                    // width: '100%'
                }
            },
            MUIDataTableBodyCell: {
                root: {
                    // backgroundColor: "#FFF"
                }
            }
        }
    });

    generateTableData = this.props.generateTableData;

    render() {

        const columns = this.props.columns;

        const options = this.props.options;
        return (
            <>

                <br />
                <CardBody>
                    <Form>
                        <h6 className="heading-small text-muted mb-4">
                            Statement List
                                    </h6>
                        <div className="pl-lg-4">
                            {this.props.statement}
                        </div>
                    </Form>
                </CardBody>
                <Col className=" mt--7 order-xl-1" xl="12">
                    <Card className="bg-secondary shadow">
                        <CardHeader className="bg-white border-0">
                            <Row className="align-items-center">
                                <Col xs="8">
                                    <h3 className="mb-0">Statements</h3>
                                </Col>
                            </Row>
                        </CardHeader>
                        <CardBody>
                            {/* MUI DATATABLE */}
                            <GridContainer>
                                <GridItem xs={12} sm={12} md={12}>
                                    <MuiThemeProvider theme={this.getMuiTheme()}>
                                        <MUIDataTable title={""} data={this.generateTableData(this.props.data)} columns={columns} options={options} />
                                    </MuiThemeProvider>
                                </GridItem>
                            </GridContainer>
                        </CardBody>
                    </Card>
                </Col>
            </>
        )
    }
}

export default withSnackbar(DateSearch);