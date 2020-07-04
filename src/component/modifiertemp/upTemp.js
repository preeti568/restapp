import React, { Component } from "react";
import { Button, Row, Container, Col, Form, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import firebase from "../../firebase";

class UpTemplate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      templateName: "",
      templatedescription: "",
    };
  }

  componentDidMount() {
    const ref = firebase
      .firestore()
      .collection("ModifierTemplate")
      .doc(this.props.match.params.id);
    ref.get().then((doc) => {
      if (doc.exists) {
        const board = doc.data();
        this.setState({
          id: doc.id,
          templateName: board.templateName,
          templatedescription: board.templatedescription,
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

    const { templateName, templatedescription } = this.state;

    const updateRef = firebase
      .firestore()
      .collection("ModifierTemplate")
      .doc(this.state.id);
    updateRef
      .set(
        {
          templateName,
          templatedescription,
        },
        { merge: true }
      )
      .then((docRef) => {
        this.setState({
          id: "",
          templateName: "",
          templatedescription: "",
        });
        this.props.history.push("/modifierTemplateList");
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
                  <Modal.Title>Update Modifier Template</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form onSubmit={this.onSubmit}>
                    <Form.Group>
                      <label>Name</label>
                      <Form.Control
                        type="text"
                        value={this.state.templateName}
                        onChange={this.onChange}
                        name="templateName"
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
                          value={this.state.templatedescription}
                          onChange={this.onChange}
                          rows="5"
                          name="templatedescription"
                        />
                      </div>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                      Save Changes
                    </Button>
                    &nbsp;&nbsp;
                    <Link
                      to="/modifierTemplateList"
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
    );
  }
}

export default UpTemplate;
