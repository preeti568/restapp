import React, { Component } from "react";
import { Button, Row, Container, Col, Form, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import firebase from "../firebase";

class UpdateSample extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      firstName: "",
      lastName: "",
      gender: "",
      createdAt: "",
    };
  }

  componentDidMount() {
    const ref = firebase
      .firestore()
      .collection("Project")
      .doc(this.props.match.params.id);
    ref.get().then((doc) => {
      if (doc.exists) {
        const board = doc.data();
        this.setState({
          id: doc.id,
          firstName: board.firstName,
          lastName: board.lastName,
          gender: board.gender,
          createdAt: board.createdAt,
        });
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

  onSubmit = (e) => {
    e.preventDefault();

    const { firstName, lastName, gender } = this.state;

    const updateRef = firebase
      .firestore()
      .collection("Project")
      .doc(this.props.match.params.id);

    updateRef
      .set(
        {
          firstName,
          lastName,
          gender,

          createdAt: new Date(),
        },
        { merge: true }
      )
      .then((docRef) => {
        this.setState({
          id: "",
          firstName: "",
          lastName: "",
          itemPrice: "",
          fireBaseUrl: "",
        });
        this.props.history.push("/sampleForm");
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
  };

  render() {
    return (
      <div>
        <Modal.Dialog>
          <Container>
            <Row>
              <Col>
                <Modal.Header>
                  <Modal.Title>Update Form</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form onSubmit={this.onSubmit}>
                    <Form.Group>
                      <label>firstName</label>
                      <Form.Control
                        type="text"
                        value={this.state.firstName}
                        onChange={this.onChange}
                        name="firstName"
                      />
                    </Form.Group>
                    <Form.Group>
                      <div className="form-group">
                        <label>Description</label>
                        <Form.Control
                          type="text"
                          value={this.state.lastName}
                          onChange={this.onChange}
                          name="lastName"
                        />
                      </div>
                    </Form.Group>
                    <Form.Group>
                      <label>Gender</label>
                      <select
                        className="form-control"
                        value={this.state.gender}
                        onChange={this.onChange}
                        name="gender"
                      >
                        <option defaultValue>Select Gender</option>
                        <option value="male">Male</option>

                        <option value="female">Female</option>
                      </select>
                    </Form.Group>
                    <Button variant="secondary" type="submit">
                      Save Changes
                    </Button>
                    &nbsp;&nbsp;
                    <Link to="/sampleForm" className="btn btn-primary">
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
    );
  }
}

export default UpdateSample;
