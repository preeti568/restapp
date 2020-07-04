import React, { useState, useEffect } from "react";
import { Button, Row, Container, Col, Form, Table } from "react-bootstrap";
import firebase from "../firebase";
import { Link } from "react-router-dom";

function Address(props) {
  const [houseNo, setHouseNo] = useState("");
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();

    try {
      if (houseNo && city && state && street && country) {
        firebase
          .firestore()
          .collection("Project")
          .doc(props.match.params.id)
          .collection("Address")
          .add({
            houseNo,
            city,
            createdAt: new Date(),
            state,
            country,
            street,
          })
          .then(
            () => setHouseNo(""),
            setCity(""),
            setStreet(""),
            setState(""),
            setCountry("")
          );
        props.history.push({
          pathname: `/SampleForm`,
        });
      }
    } catch (error) {
      console.log("Error");
    }
  };

  return (
    <div>
      <Container>
        <br />
        <br />
        <br />
        <Form onSubmit={onSubmit}>
          <div className="col-9">
            <Form.Group>
              <div className="form-group">
                <h5 htmlFor="exampleFormControlTextarea1">Address</h5>
                <div className="row">
                  <div className="col-1"></div>

                  <div class="col-2">
                    <h6>H.No</h6>
                  </div>
                  <div class="col-5">
                    <Form.Control
                      type="text"
                      value={houseNo}
                      onChange={(e) => setHouseNo(e.currentTarget.value)}
                      name="houseNo"
                    />
                  </div>
                </div>
                <br />
                <div className="row">
                  <div className="col-1"></div>

                  <div class="col-2">
                    <h6>Street</h6>
                  </div>
                  <div class="col-5">
                    <Form.Control
                      type="text"
                      value={street}
                      onChange={(e) => setStreet(e.currentTarget.value)}
                      name="street"
                    />
                  </div>
                </div>
                <br />
                <div className="row">
                  <div className="col-1"></div>
                  <div class="col-2">
                    <h6>City</h6>
                  </div>
                  <div class="col-5">
                    <Form.Control
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.currentTarget.value)}
                      name="city"
                    />
                  </div>
                </div>{" "}
                <br />
                <div className="row">
                  <div className="col-1"></div>
                  <div class="col-2">
                    <h6>State</h6>
                  </div>
                  <div class="col-5">
                    <Form.Control
                      type="text"
                      value={state}
                      onChange={(e) => setState(e.currentTarget.value)}
                      name="state"
                    />
                  </div>
                </div>
                <br />
                <div className="row">
                  <div className="col-1"></div>
                  <div class="col-2">
                    <h6>Country</h6>
                  </div>
                  <div class="col-5">
                    <Form.Control
                      type="text"
                      value={country}
                      onChange={(e) => setCountry(e.currentTarget.value)}
                      name="country"
                    />
                  </div>
                </div>
                <button className="btn btn-info" type="submit">
                  SAVE
                </button>
              </div>
            </Form.Group>
          </div>
        </Form>
      </Container>
    </div>
  );
}

export default Address;
