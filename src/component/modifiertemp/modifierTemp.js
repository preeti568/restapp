import React from "react";
import { Row, Container, Col, Form } from "react-bootstrap";
import { useState, useEffect } from "react";
import firebase from "../../firebase";
import TempItem from "./TempItem";
import Modifier from "./../Modifier/Modifier";
import Temp from "./temp";

const useItems = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection("Modifier")
      .onSnapshot((snapshot) => {
        const listItems = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setItems(listItems);
      });
    return () => unsubscribe();
  }, []);
  return items;
};

const ModifierTemplate = (props) => {
  let [modifier, setModifier] = useState("Choose an option...");
  let [itemName, setItemName] = useState("");
  const [isSelected, setIsSelected] = useState(false);
  const listItem = useItems();

  let modifiertemplateId = props.match.params.templateid;

  const selected = (e) => {
    e.preventDefault();

    setModifier(e.target.value);
  };

  return (
    <div>
      <Container>
        <Row>
          <Col>
            ModifierTemplateId = {modifiertemplateId}
            <br />
            <br />
            <center>
              <div
                style={{ textAlign: "center" }}
                className="sub-heading select-heading bg-success"
              >
                <h2>Modifier Template </h2>
              </div>
            </center>
          </Col>
        </Row>
        <br />

        <Row>
          <Col>
            <Form.Group>
              <div className="row">
                <div className="col-md-3"></div>
                <div className="col-md-6">
                  <h5> Select Modifier</h5>
                  <select
                    className="form-control"
                    value={modifier}
                    onChange={selected}
                    name="modifier"
                  >
                    <option>Choose an option...</option>
                    {listItem.map((item) => (
                      <option key={item.id} value={item.modifierName}>
                        {item.modifierName}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-md-3"> </div>
              </div>
            </Form.Group>
          </Col>
        </Row>

        {modifier !== "Choose an option..." ? (
          <TempItem
            {...props}
            modifier={modifier}
            modifiertemplateId={modifiertemplateId}
          />
        ) : (
          ""
        )}
      </Container>
    </div>
  );
};

export default ModifierTemplate;
