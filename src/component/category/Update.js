import React, { Component } from "react";
import { Button, Row, Container, Col, Form, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AuthConsumer } from "../AuthContext";
import firebase from "../../firebase";
import { storage } from "../../firebase";

class UpdateCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      name: "",
      description: "",
      fireBaseUrl: "",
      createdAt: "",
      image: null,
    };
  }

  componentDidMount() {
    const ref = firebase
      .firestore()
      .collection("Category")
      .doc(this.props.match.params.id);
    ref.get().then((doc) => {
      if (doc.exists) {
        const board = doc.data();
        this.setState({
          id: doc.id,
          name: board.name,
          description: board.description,
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

    const { name, description, fireBaseUrl, image } = this.state;
    if (image) {
      const uploadTask = storage.ref(`/Category/${image.name}`).put(image);
      uploadTask.on(
        "state_changed",
        (snapShot) => {},
        (err) => {
          console.log(err);
        },
        () => {
          storage
            .ref("Category")
            .child(image.name)
            .getDownloadURL()
            .then((fireBaseUrl) => {
              this.setState({ fireBaseUrl });

              console.log(fireBaseUrl);

              firebase
                .firestore()
                .collection("Category")
                .doc(this.state.id)
                .set(
                  {
                    name,
                    description,
                    fireBaseUrl,
                    createdAt: new Date(),
                  },
                  { merge: true }
                )
                .then((docRef) => {
                  this.setState({
                    id: "",
                    name: "",
                    description: "",
                    fireBaseUrl: "",
                    image: "",
                  });
                  this.props.history.push(`/categoryList`);
                });
              alert("Category data Updated successfully!!");
            });
        }
      );
    } else {
      firebase
        .firestore()
        .collection("Category")
        .doc(this.state.id)
        .set(
          {
            name,
            description,
            fireBaseUrl,
            createdAt: new Date(),
          },
          { merge: true }
        )
        .then((docRef) => {
          this.setState({
            id: "",
            name: "",
            description: "",
            fireBaseUrl: "",
            image: "",
          });
          this.props.history.push(`/categoryList`);
        });
      alert("Category data Updated successfully!!");
    }
  };
  // .catch((error) => {
  //   console.error("Error adding document: ", error);
  // });

  render() {
    return (
      <AuthConsumer>
        {({ user }) => (
          <div>
            <Modal.Dialog>
              <Container>
                {/* {match.params.id} */}
                <Row>
                  <Col>
                    <Modal.Header>
                      <Modal.Title>Update Category</Modal.Title>
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
                          <div className="form-group">
                            <label htmlFor="exampleFormControlTextarea1">
                              Description
                            </label>
                            <textarea
                              className="form-control"
                              id="exampleFormControlTextarea1"
                              value={this.state.description}
                              onChange={this.onChange}
                              rows="5"
                              name="description"
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
                        <Button variant="primary" type="submit">
                          Save Changes
                        </Button>
                        &nbsp;&nbsp;
                        <Link
                          to={`/categoryList`}
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

export default UpdateCategory;
