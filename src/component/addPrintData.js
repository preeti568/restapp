import React, { useState } from "react";
import firebase from "../firebase";
import { Button, Row, Container, Col, Form } from "react-bootstrap";

const AddPrintData = (props) => {
  const [item, setItem] = useState("");
  const [price, setPrice] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    try {
      if (item && price) {
        firebase
          .firestore()
          .collection("users")
          .add({
            item,
            price,
            timestamp: new Date(),
          })
          .then(() => setItem(""), setPrice(""));
        alert("Item Added Successfully");
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
        <Form onSubmit={onSubmit}>
          <Row>
            <div className="col-2"></div>
            <div className="col-3">
              <Form.Group>
                <label>Item_Name</label>
                <Form.Control
                  placeholder="Enter Item_Name"
                  type="text"
                  value={item}
                  onChange={(e) => setItem(e.currentTarget.value)}
                  name="item"
                />
              </Form.Group>
            </div>
            <div className="col-3">
              <Form.Group>
                <label>Price</label>
                <Form.Control
                  type="Number"
                  value={price}
                  placeholder="Price should be number only"
                  onChange={(e) => setPrice(e.currentTarget.value)}
                  name="price"
                />
              </Form.Group>
            </div>
            <div className="col-1"></div>
            <div className="col-3 mt-4">
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </div>
          </Row>
        </Form>
      </Container>
    </div>
  );
};

export default AddPrintData;
