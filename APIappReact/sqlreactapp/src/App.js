import React, { Component } from "react";
import "./App.css";
import { Row, Container, Col, Form, Button, Navbar } from "react-bootstrap";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import axios from "axios";

const sql = require("mssql");

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      GasMeterData: [],
      pipelineNameData: [],
      pipelineIdData: [],
      meterIdData: [],
      latestCycleData: [],
      pipelinename: "",
      pipelineid: "",
      meterid: "",
      latestCycle: "",
      dateTime: "",
      selectedData: [],
      defaultDisabled: "",
    };
  }

  componentDidMount() {
    this.gasMeterFetch();
    this.pipelineNameFetch();
    this.pipelineIdFetch();
    this.meterIdFetch();
    this.latestCycleFetch();
  }

  // gasMeterDATA

  gasMeterFetch() {
    fetch("http://localhost:5000/GasMeter")
      .then((response) => response.json())
      .then((response) =>
        this.setState({
          GasMeterData: response.data.recordsets[0],
        })
      )
      .catch((err) => console.error(err));
  }
  //pipelineNameFetch

  pipelineNameFetch() {
    fetch("http://localhost:5000/GasMeter/PipelineName")
      .then((response) => response.json())
      .then((response) =>
        this.setState({
          pipelineNameData: response.data.recordsets[0],
        })
      )
      .catch((err) => console.error(err));
  }

  //pipelineIdFetch

  pipelineIdFetch() {
    fetch("http://localhost:5000/GasMeter/PipelineiD")
      .then((response) => response.json())
      .then((response) =>
        this.setState({
          pipelineIdData: response.data.recordsets[0],
        })
      )
      .catch((err) => console.error(err));
  }

  //meterIdFetch

  meterIdFetch() {
    fetch("http://localhost:5000/GasMeter/Meterid")
      .then((response) => response.json())
      .then((response) =>
        this.setState({
          meterIdData: response.data.recordsets[0],
        })
      )
      .catch((err) => console.error(err));
  }

  //latestCycleFetch

  latestCycleFetch() {
    fetch("http://localhost:5000/GasMeter/LatestCycle")
      .then((response) => response.json())
      .then((response) =>
        this.setState({
          latestCycleData: response.data.recordsets[0],
        })
      )
      .catch((err) => console.error(err));
  }

  onSubmit = (e) => {
    const data = {
      Pipeline: this.state.pipelinename,
      PipelineID: this.state.pipelineid,
      MeterID: this.state.meterid,
      LatestCycle: this.state.latestCycle,
    };
    e.preventDefault();
    axios
      .post("http://localhost:5000/GasMeter/search", {
        data: JSON.stringify({ data }),
      })
      .then((response) => {
        console.log(response.data);
        this.setState({
          selectedData: JSON.stringify(response.data),
        });
      }).
  };

  render() {
    //DateTimePicker

    const useStyles = makeStyles((theme) => ({
      container: {
        display: "flex",
        flexWrap: "wrap",
      },
      textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 100,
      },
    }));

    return (
      <div>
        <Navbar bg="info" variant="info">
          <Navbar.Brand>
            {" "}
            <h1 style={{ textDecoration: null, color: "white" }}>Gas_Meter</h1>
          </Navbar.Brand>
        </Navbar>
        <br />
        <Row className="ml-5">
          <div className="col-">
            <form className={useStyles.container} noValidate>
              <TextField
                id="datetime-local"
                label="GasDate"
                type="datetime-local"
                defaultValue="2020-06-24T10:30"
                className={useStyles.textField}
                onChange={(e) => this.setState({ dateTime: e.target.value })}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </form>
          </div>
        </Row>
        <br />
        <Container>
          <Row>
            <div className="col-3">
              <h6>PipelineName</h6>
              <select
                className="form-control"
                value={this.state.pipelinename}
                name="pipelinename"
                onChange={(e) =>
                  this.setState({ pipelinename: e.target.value })
                }
              >
                <option defaultValue disabled selected>
                  Select Option{" "}
                </option>

                {this.state.pipelineNameData.map((item, key) => (
                  <option key={key} value={item.Pipeline}>
                    {item.Pipeline}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-3">
              <h6>PipelineID</h6>
              <select
                className="form-control"
                value={this.state.pipelineid}
                name="pipelineid"
                onChange={(e) => this.setState({ pipelineid: e.target.value })}
              >
                <option>Select Option </option>

                {this.state.pipelineIdData.map((item, key) => (
                  <option key={key} value={item.pipelineid}>
                    {item.pipelineid}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-3">
              <h6>MeterID</h6>
              <select
                className="form-control"
                value={this.state.meterid}
                name="meterid"
                onChange={(e) => this.setState({ meterid: e.target.value })}
              >
                <option>Select Option </option>

                {this.state.meterIdData.map((item, key) => (
                  <option key={key} value={item.meterid}>
                    {item.meterid}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-3">
              <h6>LatestCycle</h6>
              <select
                className="form-control"
                value={this.state.latestCycle}
                name="latestCycle"
                onChange={(e) => this.setState({ latestCycle: e.target.value })}
              >
                <option>Select Option </option>
                {this.state.latestCycleData.map((item, key) => (
                  <option key={key} value={item.LatestCycle}>
                    {item.LatestCycle}
                  </option>
                ))}
              </select>
            </div>
          </Row>
          <Row>
            <div className="col-5"></div>
            <div className="col-2 mt-4">
              <center>
                <Button
                  variant="primary"
                  type="submit"
                  onClick={this.onSubmit}
                  className="btn btn-success btn-lg"
                >
                  GetData
                </Button>
              </center>
            </div>
            <div className="col-5"></div>
          </Row>
        </Container>

        <br />
        <br />
        <Container>
          <Row>
            <div className="col-1"></div>
            <div className="col-3">
              <div className="form-group">
                <label htmlFor="exampleFormControlTextarea1">Data</label>
                <textarea
                  style={{ width: 800 }}
                  className="form-control"
                  id="exampleFormControlTextarea1"
                  rows="10"
                  name="data"
                  value={this.state.selectedData}
                />
              </div>
            </div>
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;
