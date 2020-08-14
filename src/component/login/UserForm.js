import React from "react";
import { AuthConsumer } from "../AuthContext";
import { Button, Row, Container, Col, Form } from "react-bootstrap";

class UserForm extends React.Component {
  emailInput = React.createRef();
  passwordInput = React.createRef();

  redirect = (userId) => {
    this.props.history.push(`/${userId}/restaurant`);
  };
  render() {
    return (
      <AuthConsumer>
        {({ signUp, logIn, user, authMessage }) => (
          <React.Fragment>
            <Container>
              <Row>
                <Col>
                  {!user || !user.id ? (
                    <div className="sign-up-wrapper">
                      <center>
                        <h2>Sign-In or Create Account </h2>
                      </center>
                      <div>
                        {authMessage ? (
                          <center>
                            <span className="text-danger">{authMessage}</span>
                          </center>
                        ) : (
                          ""
                        )}
                        <Form className="sign-up-form">
                          <div className="row">
                            <div className="col-lg-4"></div>
                            <div className="col-lg-4">
                              <Form.Group>
                                <Form.Control
                                  ref={this.emailInput}
                                  type="email"
                                  placeholder="Email"
                                />
                              </Form.Group>
                              <Form.Group>
                                <Form.Control
                                  ref={this.passwordInput}
                                  type="password"
                                  placeholder="password"
                                />
                              </Form.Group>

                              <div>
                                <Form.Group>
                                  <Button
                                    className="btn btn-success"
                                    onClick={(e) =>
                                      logIn(
                                        this.emailInput.current.value,
                                        this.passwordInput.current.value,
                                        e
                                      )
                                    }
                                  >
                                    Login
                                  </Button>
                                  &nbsp;&nbsp;
                                  <Button
                                    className="btn btn-info"
                                    onClick={(e) =>
                                      signUp(
                                        this.emailInput.current.value,
                                        this.passwordInput.current.value,
                                        e
                                      )
                                    }
                                  >
                                    Sign Up
                                  </Button>
                                </Form.Group>
                              </div>
                            </div>
                          </div>
                          <div className="col-lg-4"></div>
                        </Form>
                      </div>
                    </div>
                  ) : (
                    this.props.history.push(`/${user.id}/restaurant`)
                    // <React.Fragment>
                    //   <br />
                    //   <br />
                    //   <br />
                    //   <center>
                    //     <Button onClick={() => this.redirect(user.id)}>
                    //       Go to my Last Page
                    //     </Button>
                    //   </center>
                    // </React.Fragment>
                  )}
                </Col>
              </Row>
            </Container>
          </React.Fragment>
        )}
      </AuthConsumer>
    );
  }
}

export default UserForm;
