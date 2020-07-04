import React from "react";
import { AuthConsumer } from "../AuthContext";
import { Button, Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import SideNav from "../SideNavBar";

const Header = () => (
  <header>
    <AuthConsumer>
      {({ user, logOut }) => (
        <React.Fragment>
          <Navbar bg="info" variant="info">
            <Navbar.Brand>
              <Nav.Link
                style={{ textDecoration: null, color: "white" }}
                href={user && user.id ? `/${user.id}/restaurant` : `/`}
              >
                <h1>Restaurant</h1>
              </Nav.Link>
            </Navbar.Brand>
            <Navbar.Collapse className="justify-content-end">
              <Navbar.Text>
                {user && user.id ? (
                  <React.Fragment>
                    <h5>Signed in as: {user.email}</h5>
                    <div className="text-right">
                      <Button onClick={(e) => logOut(e)}>Log Out</Button>
                    </div>
                  </React.Fragment>
                ) : (
                  <h6>Please Sign In</h6>
                )}
              </Navbar.Text>
            </Navbar.Collapse>

            <div className="user-area"></div>
          </Navbar>
          {user && user.id ? <SideNav /> : ""}
        </React.Fragment>
      )}
    </AuthConsumer>
  </header>
);

export default Header;
