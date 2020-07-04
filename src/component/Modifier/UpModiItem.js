import React, { Component } from "react";
import { Button, Row, Container, Col, Form, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import firebase from "../../firebase";
import { storage } from "../../firebase";

class UpModiItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      modifierItemName: "",
      modifierItemDescription: "",
      modifierPrice: "",
      fireBaseUrl: "",
      createdAt: "",
      image: null,
    };
  }

  componentDidMount() {
    const ref = firebase
      .firestore()
      .collection("Modifier")
      .doc(this.props.match.params.modifierid)
      .collection("Modifier Item")
      .doc(this.props.match.params.id);
    ref.get().then((doc) => {
      if (doc.exists) {
        const board = doc.data();
        this.setState({
          id: doc.id,
          modifierItemName: board.modifierItemName,
          modifierItemDescription: board.modifierItemDescription,
          modifierPrice: board.modifierPrice,
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
      modifierItemName,
      modifierItemDescription,
      modifierPrice,
      image,

      fireBaseUrl,
    } = this.state;

    const updateRef = firebase
      .firestore()
      .collection("Modifier")
      .doc(this.props.match.params.modifierid)
      .collection("Modifier Item")
      .doc(this.props.match.params.id);

    if (image) {
      const uploadTask = storage.ref(`/ModifierItem/${image.name}`).put(image);
      uploadTask.on(
        "state_changed",
        (snapShot) => {},
        (err) => {
          console.log(err);
        },
        () => {
          storage
            .ref("ModifierItem")
            .child(image.name)
            .getDownloadURL()
            .then((fireBaseUrl) => {
              this.setState({ fireBaseUrl });

              console.log(fireBaseUrl);
              updateRef
                .set(
                  {
                    modifierItemName,
                    modifierItemDescription,
                    modifierPrice,
                    fireBaseUrl,
                    createdAt: new Date(),
                  },
                  { merge: true }
                )
                .then((docRef) => {
                  this.setState({
                    id: "",
                    modifierItemName: "",
                    modifierItemDescription: "",
                    modifierPrice: "",
                    fireBaseUrl: "",
                  });
                  this.props.history.push("/modifierList");
                });
              alert("ModifierItem data Updated successfully!!");
            });
        }
      );
    } else {
      updateRef
        .set(
          {
            modifierItemName,
            modifierItemDescription,
            modifierPrice,
            fireBaseUrl,
            createdAt: new Date(),
          },
          { merge: true }
        )
        .then((docRef) => {
          this.setState({
            id: "",
            modifierItemName: "",
            modifierItemDescription: "",
            modifierPrice: "",
            fireBaseUrl: "",
          });
          this.props.history.push("/modifierList");
        });
      alert("ModifierItem data Updated successfully!!");
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
                  <Modal.Title>Update Modifier Item</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form onSubmit={this.onSubmit}>
                    <Form.Group>
                      <label>Name</label>
                      <Form.Control
                        type="text"
                        value={this.state.modifierItemName}
                        onChange={this.onChange}
                        name="modifierItemName"
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
                          value={this.state.modifierItemDescription}
                          onChange={this.onChange}
                          rows="5"
                          name="modifierItemDescription"
                        />
                      </div>
                    </Form.Group>
                    <Form.Group>
                      <label>Price</label>
                      <Form.Control
                        type="text"
                        value={this.state.modifierPrice}
                        onChange={this.onChange}
                        name="modifierPrice"
                      />
                      <br />
                      <br />
                      <input
                        type="file"
                        onChange={this.handleChange}
                        className="dropify"
                        placeholder={this.state.fireBaseUrl}
                      />
                      <center>
                        <img
                          src={this.state.fireBaseUrl}
                          alt="image tag"
                          height="250px"
                          width="250px"
                        />
                      </center>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                      Save Changes
                    </Button>
                    &nbsp;&nbsp;
                    <Link to="/modifierList" className="btn btn-secondary">
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

export default UpModiItem;
