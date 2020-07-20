import React, { useEffect, useState } from "react";
import firebase from "../../firebase";
import { Row, Container, Col, Table, Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";

let LoadData = (props) => {
  let [dataTemplate, setData] = useState([]);

  try {
    useEffect(() => {
      firebase
        .firestore()
        .collection("ModifierTemplate")
        .doc(props.match.params.templateid)
        .collection("TemplateItem")
        .get()
        .then((querySnapshot) => {
          const a = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setData(a);
        });
    }, [props]);
  } catch (e) {
    console.log(e);
  }
  return dataTemplate;
};

let useItems = (props) => {
  let tempdata = LoadData(props);
  let [items, setItems] = useState([]);
  try {
    useEffect(() => {
      firebase
        .firestore()
        .collection("Modifier")
        .doc(props.modifier)
        .collection("Modifier Item")
        .get()
        .then((querySnapshot) => {
          const listItems = querySnapshot.docs.map((doc) => ({
            checked: false,
            alreadyadded: false,
            id: doc.id,
            ...doc.data(),
          }));
          setItems(listItems);
        });
    }, [props]);
  } catch (e) {
    console.log(e);
  }
  tempdata.forEach((li) => {
    items.forEach((element) => {
      if (element.id === li.id) {
        element.checked = true;
        element.alreadyadded = true;
      }
    });
  });

  return items;
};

function TempItem(props) {
  let [data, setTableData] = useState([]);
  data = useItems(props);
  // let tempdata = LoadData(props);
  let [modifierItemName, setModifierItemName] = useState("");
  let [modifierPrice, setModifierPrice] = useState("");
  let [select, setSelect] = useState(false);

  let mid = props.modifier;

  const onSubmit = (e) => {
    e.preventDefault();
    data.forEach((element) => {
      if (element.checked === true) {
        firebase
          .firestore()
          .collection("ModifierTemplate")
          .doc(props.match.params.templateid)
          .collection("TemplateItem")
          .doc(element.modifierItemName)
          .set({
            modifierItemName: element.modifierItemName,
            modifierPrice: element.modifierPrice,
            SelectedAt: new Date(),
          });
        element.alreadyadded = true;
      }
      setTableData([data]);
    });
    setTableData([data]);
    alert("Saved");
  };

  const onCheck = (e, item) => {
    item.checked = e.currentTarget.checked;
    setSelect(item.checked);
    setModifierItemName(e.target.value);
  };

  //for updating price

  const upDatePrice = (e, item) => {
    let tempId = item.id;
    let newprice = e.currentTarget.value;
    if (tempId && newprice) {
      upPrice(tempId, newprice);
    }
  };

  const upPrice = async (tempId, newprice) => {
    try {
      await firebase
        .firestore()
        .collection("Modifier")
        .doc(mid)
        .collection("Modifier Item")
        .doc(tempId)
        .set({ modifierPrice: newprice }, { merge: true });
    } catch (error) {
      console.error("Error updating board:", error);
    }
  };

  const deleteItem = (item) => {
    try {
      if (item.checked === true) {
        item.checked = false;
        item.alreadyadded = false;
        setSelect(item.checked);
        firebase
          .firestore()
          .collection("ModifierTemplate")
          .doc(props.match.params.templateid)
          .collection("TemplateItem")
          .doc(item.id)
          .delete()
          .then(function () {
            setTableData([data]);

            console.log("Document successfully deleted!");
          });
      }
      console.log("Data:", data);
    } catch (error) {
      console.error("Error removing document: ", error);
    }
  };

  //main

  return (
    <div>
      <Container>
        <br />
        <br />
        <Row>
          <Col>
            <Form onSubmit={onSubmit}>
              <Table striped bordered hover>
                <thead>
                  <tr className="text-center">
                    <th>Select Item</th>
                    <th>Modifier Item </th>
                    <th>Price</th>
                    <th></th>
                  </tr>
                </thead>
                {data.map((item) => (
                  <tbody key={item.id}>
                    <tr>
                      <td>
                        <center>
                          {" "}
                          <input
                            type="checkbox"
                            checked={item.checked}
                            name="check"
                            disabled={item.alreadyadded ? true : false}
                            value={item.modifierItemName}
                            onChange={(e) => onCheck(e, item)}
                            style={{ width: "20px", height: "20px" }}
                          />
                        </center>
                      </td>
                      <td>
                        <Form.Group>
                          <label
                            className="form-check-label"
                            value={item.modifierItemName}
                            name="modifierItemName"
                          >
                            {item.modifierItemName}
                          </label>
                        </Form.Group>
                      </td>
                      <td>
                        <Form.Group>
                          <Form.Control
                            type="text"
                            name="modifierPrice"
                            defaultValue={item.modifierPrice}
                            onChange={(e) => upDatePrice(e, item)}
                          />
                        </Form.Group>
                      </td>
                      <td className="text-center">
                        {item.alreadyadded ? (
                          <a
                            className="btn text-danger"
                            onClick={() => deleteItem(item)}
                          >
                            <i className="fas fa-trash-alt"></i>
                          </a>
                        ) : (
                          ""
                        )}
                      </td>
                    </tr>
                  </tbody>
                ))}
              </Table>
              <Button variant="primary" type="submit">
                Save
              </Button>{" "}
              <Link
                variant="primary"
                to="/modifierTemplateList"
                className="btn btn-info"
              >
                Cancel
              </Link>{" "}
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default TempItem;
