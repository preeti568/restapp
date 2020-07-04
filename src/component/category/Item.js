import React, { useState, useEffect } from "react";
import firebase from "../../firebase";
import { Button, Row, Container, Col, Form } from "react-bootstrap";
import { Link } from "react-router-dom";

import { storage } from "../../firebase";
import { AuthConsumer } from "../AuthContext";
import { useForm } from "react-hook-form";

const useItems = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection("Category")
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

const useModifier = () => {
  const [modi, setModi] = useState([]);

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection("Modifier")
      .onSnapshot((snapshot) => {
        const listModifiers = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setModi(listModifiers);
        console.log(listModifiers);
      });
    return () => unsubscribe();
  }, []);
  return modi;
};

const Item = (props) => {
  const [selectedCategory, setSelectedCategory] = useState(
    props.match.params.categoryid
  );
  const listItem = useItems();
  const listModifiers = useModifier();
  const [itemName, setItemName] = useState("");
  const [itemDescription, setItemDescription] = useState("");
  const [itemPrice, setItemprice] = useState("");
  const [modifier, setItempTempId] = useState("");
  const { register, handleSubmit, errors } = useForm();

  //img
  const allInputs = { imgUrl: "" };
  const [imageAsFile, setImageAsFile] = useState(null);
  const [imageAsUrl, setImageAsUrl] = useState(allInputs);
  //img

  const handleImageAsFile = (e) => {
    const image = e.target.files[0];
    setImageAsFile((imageFile) => image);
  };

  const onSubmit = (form, e) => {
    e.preventDefault();

    try {
      if (itemName && itemDescription && itemPrice && modifier && imageAsFile) {
        console.log("start of upload");

        if (imageAsFile === "") {
          console.error(
            `not an image, the image file is a ${typeof imageAsFile}`
          );
        }
        const uploadTask = storage
          .ref(`/CategoryItem/${imageAsFile.name}`)
          .put(imageAsFile);

        uploadTask.on(
          "state_changed",
          (snapShot) => {
            // console.log(snapShot);
          },
          (err) => {
            console.log(err);
          },

          () => {
            storage
              .ref("CategoryItem")
              .child(imageAsFile.name)
              .getDownloadURL()
              .then((fireBaseUrl) => {
                setImageAsUrl((prevObject) => ({
                  ...prevObject,
                  imgUrl: fireBaseUrl,
                }));
                console.log(fireBaseUrl);
                firebase
                  .firestore()
                  .collection("Category")
                  .doc(selectedCategory)
                  .collection("Items")
                  .doc(itemName)
                  .set({
                    itemName,
                    itemDescription,
                    itemPrice,
                    modifier,
                    createdAt: new Date(),
                    fireBaseUrl,
                  })
                  .then(
                    () => setItemName(""),
                    setItemDescription(""),
                    setItemprice(""),
                    setItempTempId("")
                  );
                alert("Items Saved successfully!!");
              });
            props.history.push({
              pathname: "/categoryList",
            });
          }
        );
      } else {
        alert("Please Fill All Details !!!");
      }
    } catch (err) {
      console.log("Error in Submission", err);
    }
  };

  return (
    <div>
      <Container>
        <center>
          <h2>Items</h2>
        </center>
        <br />
        <Row>
          <div className="col-md-8"></div>
          <div className="col-md-4">
            <select
              className="form-control"
              value={selectedCategory}
              disabled
              onChange={(e) => setSelectedCategory(e.currentTarget.value)}
              //  value={catId}
            >
              <option>--Select Category--</option>
              {listItem.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
        </Row>
        <Row>
          <Col>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Form.Group>
                <label>Name</label>
                <Form.Control
                  type="text"
                  value={itemName}
                  ref={register({ required: true, minLength: 5 })}
                  onChange={(e) =>
                    setItemName(e.currentTarget.value, handleSubmit())
                  }
                  name="itemName"
                />
                {errors.itemName && errors.itemName.type === "required" && (
                  <p className="text-danger">This is Required</p>
                )}
                {errors.itemName && errors.itemName.type === "minLength" && (
                  <p className="text-danger">
                    This field required minLength of 5
                  </p>
                )}
              </Form.Group>
              <Form.Group>
                <div className="form-group">
                  <label htmlFor="exampleFormControlTextarea1">
                    Description
                  </label>
                  <textarea
                    className="form-control"
                    id="exampleFormControlTextarea1"
                    value={itemDescription}
                    onChange={(e) => setItemDescription(e.currentTarget.value)}
                    rows="5"
                    name="description"
                  />
                </div>
              </Form.Group>
              <Form.Group>
                <label>Price</label>
                <Form.Control
                  type="Number"
                  value={itemPrice}
                  placeholder="Price should be number only"
                  ref={register({ required: true })}
                  onChange={(e) => setItemprice(e.currentTarget.value)}
                  name="price"
                />
              </Form.Group>
              <Form.Group>
                <label>TempId</label>
                <select
                  className="form-control"
                  value={modifier}
                  onChange={(e) => setItempTempId(e.currentTarget.value)}
                  name="tempId"
                >
                  <option>--Select Modifier--</option>
                  {listModifiers.map((item) => (
                    <option key={item.id}>{item.modifierName}</option>
                  ))}
                </select>
              </Form.Group>
              <Form.Group>
                <br />
                <br />
                <input
                  type="file"
                  onChange={handleImageAsFile}
                  id="input-file-now"
                  className="dropify"
                />
                <img src={imageAsUrl} alt="image tag" />
              </Form.Group>{" "}
              <Button variant="primary" type="submit">
                Submit
              </Button>
              &nbsp;&nbsp;
              <Link
                variant="primary"
                to="/categoryList"
                className="btn btn-primary"
              >
                Cancel
              </Link>
            </Form>
          </Col>
        </Row>
        <br></br>
      </Container>
    </div>
  );
};
export default Item;
