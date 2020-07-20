import React from "react";
import { AuthConsumer } from "../component/AuthContext";
import { Button, Navbar, Nav } from "react-bootstrap";

import { Link } from "react-router-dom";

const SideNav = () => {
  return (
    <AuthConsumer>
      {({ user }) => (
        <React.Fragment>
          <Navbar bg="warning" variant="dark">
            <Navbar.Collapse
              className="justify-content-end"
              id="basic-navbar-nav"
            >
              <Navbar.Text>
                <Nav className="mr-auto">
                  {/* <Link className="btn btn-light text-dark" to="/AddPrintData">
                    AddPrintData
                  </Link>{" "}
                  &nbsp; &nbsp; */}
                  <Link className="btn btn-light text-dark" to="/gridTable">
                    GridTable
                  </Link>
                  {/* &nbsp; &nbsp;
                  <Link className="btn btn-light text-dark" to="/sampleForm">
                    SampleForm
                  </Link> */}
                  &nbsp; &nbsp;
                  <Link to="/categoryList" className="btn btn-light text-dark">
                    Category
                  </Link>
                  &nbsp; &nbsp;
                  <Link className="btn btn-light text-dark" to="/modifierList">
                    Modifier
                  </Link>
                  &nbsp; &nbsp;
                  <Link className="btn btn-light text-dark" to="/employeeList">
                    Employees
                  </Link>{" "}
                  &nbsp; &nbsp;
                  <Link
                    to="/modifierTemplateList"
                    className="btn btn-light text-dark"
                  >
                    Modifier Template
                  </Link>
                  &nbsp; &nbsp;
                </Nav>
              </Navbar.Text>
            </Navbar.Collapse>

            <div className="user-area"></div>
          </Navbar>
          {/* {user.id} */}
        </React.Fragment>
      )}
    </AuthConsumer>
  );
};

export default SideNav;
