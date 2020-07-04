import React, { Component } from "react";
import { Button, Row, Container, Col, Form, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AuthConsumer } from "../AuthContext";
import firebase from "../../firebase";
import { storage } from "../../firebase";

class UpdateEmployee extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: "",
      name: "",
      phone: "",
      email: "",
      address: "",
      city: "",
      state: "",
      country: "",
      fireBaseUrl: "",
      createdAt: "",
      listCountry: {},
      listState: [],
      listCity: [],
      image: null,
    };
  }

  countries = require("./countries.json");
  cities = require("./cities.json");
  states = require("./states.json");

  componentDidMount() {
    this.setState({
      listCountry: this.countries,
      listState: this.states,
      listCity: this.states,
    });

    const ref = firebase
      .firestore()
      .collection("Employees")
      .doc(this.props.match.params.id);
    ref.get().then((doc) => {
      if (doc.exists) {
        const board = doc.data();
        this.setState({
          id: doc.id,
          name: board.name,
          phone: board.phone,
          email: board.email,
          address: board.address,
          city: board.city,
          state: board.state,
          country: board.country,
          fireBaseUrl: board.fireBaseUrl,
          createdAt: board.createdAt,
        });
        console.log(board);
      } else {
        console.log("No such document!");
      }
    });
  }

  onChange = (e) => {
    const state = this.state;
    state[e.target.name] = e.target.value;
    this.setState({ board: state });
  };

  handleChange = (e) => {
    if (e.target.files[0]) {
      const image = e.target.files[0];
      this.setState(() => ({ image }));
    }
  };

  onSubmit = (e, userId) => {
    e.preventDefault();

    const {
      name,
      phone,
      email,
      address,
      city,
      state,
      country,
      fireBaseUrl,
      image,
    } = this.state;

    if (image) {
      const uploadTask = storage.ref(`/Employees/${image.name}`).put(image);
      uploadTask.on(
        "state_changed",
        (snapShot) => {},
        (err) => {
          console.log(err);
        },
        () => {
          storage
            .ref("Employees")
            .child(image.name)
            .getDownloadURL()
            .then((fireBaseUrl) => {
              this.setState({ fireBaseUrl });

              console.log(fireBaseUrl);

              firebase
                .firestore()
                .collection("Employees")
                .doc(this.state.id)
                .set(
                  {
                    name,
                    phone,
                    email,
                    address,
                    city,
                    state,
                    country,
                    fireBaseUrl,
                    createdAt: new Date(),
                  },
                  { merge: true }
                )
                .then((docRef) => {
                  this.setState({
                    id: "",
                    name: "",
                    phone: "",
                    email: "",
                    address: "",
                    city: "",
                    state: "",
                    country: "",
                    fireBaseUrl: "",
                    image: "",
                  });
                  this.props.history.push(`/employeeList`);
                });
              alert("Employee data Updated successfully!!");
            });
        }
      );
    } else {
      firebase
        .firestore()
        .collection("Employees")
        .doc(this.state.id)
        .set(
          {
            name,
            phone,
            email,
            address,
            city,
            state,
            country,
            fireBaseUrl,
            createdAt: new Date(),
          },
          { merge: true }
        )
        .then((docRef) => {
          this.setState({
            id: "",
            name: "",
            phone: "",
            email: "",
            address: "",
            city: "",
            state: "",
            country: "",
            fireBaseUrl: "",
            image: "",
          });
          this.props.history.push(`/employeeList`);
        });
      alert("Employee data Updated successfully!!");
    }
  };

  handleCountry = (e) => {
    let a;
    let b = [];
    this.setState({ country: e.target.value });

    a = this.state.listCountry.countries.find(
      (cntry) => cntry.name === e.target.value
    );
    console.log(a.id);
    b = this.states.states.filter((b) => b.country_id === a.id);
    this.setState({
      listState: b,
    });
  };

  handleState = (e) => {
    let a;
    let b = [];
    this.setState({ state: e.target.value });
    a = this.state.listState.find((cntry) => cntry.name === e.target.value);
    console.log(a.id);
    b = this.cities.cities.filter((cntry) => cntry.state_id === a.id);
    this.setState({
      listCity: b,
    });
    console.log(b.id);
  };

  render() {
    const { listCountry, listState, listCity } = this.state;
    return (
      <AuthConsumer>
        {({ user }) => (
          <div>
            <Modal.Dialog>
              <Container>
                <Row>
                  <Col>
                    <Modal.Header>
                      <Modal.Title>Update Employee's Data</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <Form onSubmit={this.onSubmit}>
                        <Form.Group>
                          <label>Name</label>
                          <Form.Control
                            type="text"
                            value={this.state.name}
                            onChange={this.onChange}
                            name="name"
                          />
                        </Form.Group>
                        <Form.Group>
                          <label>Phone</label>
                          <Form.Control
                            type="number"
                            value={this.state.phone}
                            onChange={this.onChange}
                            name="phone"
                          />
                        </Form.Group>
                        <Form.Group>
                          <label>Email</label>
                          <Form.Control
                            type="email"
                            value={this.state.email}
                            onChange={this.onChange}
                            name="email"
                          />
                        </Form.Group>
                        <Form.Group>
                          <div className="form-group">
                            <label htmlFor="exampleFormControlTextarea1">
                              Address
                            </label>
                            <textarea
                              className="form-control"
                              id="exampleFormControlTextarea1"
                              value={this.state.address}
                              onChange={this.onChange}
                              rows="5"
                              name="address"
                            />
                          </div>
                        </Form.Group>
                        <Form.Group>
                          <label>Country</label>
                          &nbsp;&nbsp;
                          <select
                            value={this.state.country}
                            onChange={this.handleCountry}
                            name="country"
                            style={{ height: "30px", fontFamily: "cursive" }}
                          >
                            <option>{this.state.country}</option>

                            {listCountry.countries &&
                              listCountry.countries.map((a) => (
                                <option key={a.name}>{a.name}</option>
                              ))}
                          </select>
                        </Form.Group>
                        <Form.Group>
                          <label>State</label>
                          &nbsp;&nbsp;
                          <select
                            value={this.state.state}
                            onChange={this.handleState}
                            name="state"
                            style={{ height: "30px", fontFamily: "cursive" }}
                          >
                            <option>{this.state.state}</option>
                            {console.log(listState)}
                            {Object.keys(listState).map((a) => (
                              <option>{listState[a].name}</option>
                            ))}
                          </select>
                        </Form.Group>
                        <Form.Group>
                          <label>City</label>
                          &nbsp;&nbsp;
                          <select
                            value={this.state.city}
                            onChange={(e) =>
                              this.setState({ city: e.target.value })
                            }
                            style={{ height: "30px", fontFamily: "cursive" }}
                            name="city"
                          >
                            {" "}
                            <option>{this.state.city}</option>
                            {console.log(listCity)}
                            {Object.keys(listCity).map((a) => (
                              <option>{listCity[a].name}</option>
                            ))}
                          </select>
                        </Form.Group>
                        <Form.Group>
                          <label
                            style={{
                              display: "inline-block",
                            }}
                          >
                            Driving Licence
                          </label>
                          <br />
                          <input
                            type="file"
                            onChange={this.handleChange}
                            className="dropify"
                            placeholder={this.state.fireBaseUrl}
                          />
                          <center>
                            {" "}
                            <img
                              src={this.state.fireBaseUrl}
                              alt="image tag"
                              height="250px"
                              width="250px"
                            />
                          </center>
                        </Form.Group>{" "}
                        <Button variant="primary" type="submit">
                          Save Changes
                        </Button>
                        &nbsp;&nbsp;
                        <Link
                          to={`/employeeList`}
                          className="btn btn-secondary"
                        >
                          Cancel
                        </Link>
                      </Form>
                    </Modal.Body>

                    <Modal.Footer></Modal.Footer>
                  </Col>
                </Row>
              </Container>
            </Modal.Dialog>
          </div>
        )}
      </AuthConsumer>
    );
  }
}

export default UpdateEmployee;
