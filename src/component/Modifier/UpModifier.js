import React, { Component } from "react";
import { Button, Row, Container, Col, Form, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import firebase from "../../firebase";
import { storage } from "../../firebase";

class UpModifier extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      modifierName: "",
      modifierDescription: "",
      fireBaseUrl: "",
      createdAt: "",
      image: null,
    };
  }

  componentDidMount() {
    const ref = firebase
      .firestore()
      .collection("Modifier")
      .doc(this.props.match.params.id);
    ref.get().then((doc) => {
      if (doc.exists) {
        const board = doc.data();
        this.setState({
          id: doc.id,
          modifierName: board.modifierName,
          modifierDescription: board.modifierDescription,
          fireBaseUrl: board.fireBaseUrl,

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

  handleChange = (e) => {
    if (e.target.files[0]) {
      const image = e.target.files[0];
      this.setState(() => ({ image }));
    }
  };
  onSubmit = (e) => {
    e.preventDefault();

    const {
      modifierName,
      image,
      modifierDescription,
      fireBaseUrl,
    } = this.state;

    const updateRef = firebase
      .firestore()
      .collection("Modifier")
      .doc(this.state.id);

    if (image) {
      const uploadTask = storage.ref(`/Modifier/${image.name}`).put(image);
      uploadTask.on(
        "state_changed",
        (snapShot) => {},
        (err) => {
          console.log(err);
        },
        () => {
          storage
            .ref("Modifier")
            .child(image.name)
            .getDownloadURL()
            .then((fireBaseUrl) => {
              this.setState({ fireBaseUrl });

              console.log(fireBaseUrl);

              updateRef
                .set(
                  {
                    modifierName,
                    modifierDescription,
                    fireBaseUrl,

                    createdAt: new Date(),
                  },
                  { merge: true }
                )
                .then((docRef) => {
                  this.setState({
                    id: "",
                    modifierName: "",
                    modifierDescription: "",
                  });
                  this.props.history.push("/modifierList");
                });
              alert("Modifier data Updated successfully!!");
            });
        }
      );
    } else {
      updateRef
        .set(
          {
            modifierName,
            modifierDescription,
            fireBaseUrl,

            createdAt: new Date(),
          },
          { merge: true }
        )
        .then((docRef) => {
          this.setState({
            id: "",
            modifierName: "",
            modifierDescription: "",
          });
          this.props.history.push("/modifierList");
        });
      alert("Modifier data Updated successfully!!");
    }
    // .catch((error) => {
    //   console.error("Error adding document: ", error);
    // });
  };

  render() {
    return (
      <div>
        <Modal.Dialog>
          <Container>
            <Row>
              <Col>
                <Modal.Header>
                  <Modal.Title>Update Modifier </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form onSubmit={this.onSubmit}>
                    <Form.Group>
                      <label>Name</label>
                      <Form.Control
                        type="text"
                        value={this.state.modifierName}
                        onChange={this.onChange}
                        name="modifierName"
                      />
                    </Form.Group>
                    <Form.Group>
                      <div className="form-group">
                        <label htmlFor="exampleFormControlTextarea1">
                          Description
                        </label>
                        <textarea
                          className="form-control"
                          id="exampleFormControlTextarea1"
                          value={this.state.modifierDescription}
                          onChange={this.onChange}
                          rows="5"
                          name="modifierDescription"
                        />
                      </div>
                    </Form.Group>
                    <Form.Group>
                      <br />
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
                    <Button variant="secondary" type="submit">
                      Save Changes
                    </Button>
                    &nbsp;&nbsp;
                    <Link to="/modifierList" className="btn btn-primary">
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

export default UpModifier;
