import React, { Component } from "react";
import { Button, Row, Container, Col, Form, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import firebase from "../../firebase";
import { storage } from "../../firebase";

class UpItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      itemName: "",
      itemDescription: "",
      itemPrice: "",
      fireBaseUrl: "",
      createdAt: "",
      image: null,
    };
  }

  componentDidMount() {
    const ref = firebase
      .firestore()
      .collection("Category")
      .doc(this.props.match.params.categoryid)
      .collection("Items")
      .doc(this.props.match.params.id);
    ref.get().then((doc) => {
      if (doc.exists) {
        const board = doc.data();
        this.setState({
          id: doc.id,
          itemName: board.itemName,
          itemDescription: board.itemDescription,
          itemPrice: board.itemPrice,
          createdAt: board.createdAt,
          fireBaseUrl: board.fireBaseUrl,
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
  s;
  handleChange = (e) => {
    if (e.target.files[0]) {
      const image = e.target.files[0];
      this.setState(() => ({ image }));
    }
  };

  onSubmit = (e) => {
    e.preventDefault();

    const {
      itemName,
      itemDescription,
      fireBaseUrl,
      itemPrice,
      image,
    } = this.state;

    const updateRef = firebase
      .firestore()
      .collection("Category")
      .doc(this.props.match.params.categoryid)
      .collection("Items")
      .doc(this.props.match.params.id);
    if (image) {
      const uploadTask = storage.ref(`/CategoryItem/${image.name}`).put(image);
      uploadTask.on(
        "state_changed",
        (snapShot) => {},
        (err) => {
          console.log(err);
        },
        () => {
          storage
            .ref("CategoryItem")
            .child(image.name)
            .getDownloadURL()
            .then((fireBaseUrl) => {
              this.setState({ fireBaseUrl });

              console.log(fireBaseUrl);

              updateRef
                .set(
                  {
                    itemName,
                    itemDescription,
                    itemPrice,
                    fireBaseUrl,
                    createdAt: new Date(),
                  },
                  { merge: true }
                )
                .then((docRef) => {
                  this.setState({
                    id: "",
                    itemName: "",
                    itemDescription: "",
                    itemPrice: "",
                    fireBaseUrl: "",
                  });
                  this.props.history.push("/categoryList");
                });
              alert("Item data Updated successfully!!");
            });
        }
      );
    } else {
      updateRef
        .set(
          {
            itemName,
            itemDescription,
            itemPrice,
            fireBaseUrl,
            createdAt: new Date(),
          },
          { merge: true }
        )
        .then((docRef) => {
          this.setState({
            id: "",
            itemName: "",
            itemDescription: "",
            itemPrice: "",
            fireBaseUrl: "",
          });
          this.props.history.push("/categoryList");
        });
      alert("Item data Updated successfully!!");
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
                  <Modal.Title>Update Category Item</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form onSubmit={this.onSubmit}>
                    <Form.Group>
                      <label>Name</label>
                      <Form.Control
                        type="text"
                        value={this.state.itemName}
                        onChange={this.onChange}
                        name="itemName"
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
                          value={this.state.itemDescription}
                          onChange={this.onChange}
                          rows="5"
                          name="itemDescription"
                        />
                      </div>
                    </Form.Group>
                    <Form.Group>
                      <label>Price</label>
                      <Form.Control
                        type="text"
                        value={this.state.itemPrice}
                        onChange={this.onChange}
                        name="itemPrice"
                      />
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
                    </Form.Group>
                    <Button variant="secondary" type="submit">
                      Save Changes
                    </Button>
                    &nbsp;&nbsp;
                    <Link to="/categoryList" className="btn btn-primary">
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

export default UpItem;
