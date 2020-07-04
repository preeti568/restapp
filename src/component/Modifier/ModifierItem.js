import React, { useState, useEffect } from "react";
import firebase from "../../firebase";
import { Button, Row, Container, Col, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { storage } from "../../firebase";
import { Link } from "react-router-dom";

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

const ModifierItem = (props) => {
  const [selectedModifierName, setselectedModifierName] = useState(
    props.match.params.id
  );
  const [modifierItemName, setmodifierItemName] = useState("");
  const [modifierItemDescription, setmodifierDescription] = useState("");
  const [modifierPrice, setmodifierPrice] = useState("");

  //img
  const allInputs = { imgUrl: "" };
  const [imageAsFile, setImageAsFile] = useState(null);
  const [imageAsUrl, setImageAsUrl] = useState(allInputs);

  //img

  const handleImageAsFile = (e) => {
    const image = e.target.files[0];
    setImageAsFile((imageFile) => image);
  };

  const listModifiers = useModifier();
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = (form, e) => {
    // e.preventDefault();
    try {
      if (
        modifierItemName &&
        modifierItemDescription &&
        modifierPrice &&
        imageAsFile
      ) {
        console.log("start of upload");

        if (imageAsFile === "") {
          console.error(
            `not an image, the image file is a ${typeof imageAsFile}`
          );
        }
        const uploadTask = storage
          .ref(`/ModifierItem/${imageAsFile.name}`)
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
              .ref("ModifierItem")
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
                  .collection("Modifier")
                  .doc(selectedModifierName)
                  .collection("Modifier Item")
                  .doc(modifierItemName)
                  .set({
                    modifierItemName,
                    modifierItemDescription,
                    modifierPrice,
                    createdAt: new Date(),
                    fireBaseUrl,
                  })
                  .then(
                    () => setmodifierItemName(""),
                    setmodifierDescription(""),
                    setmodifierPrice(""),
                    setImageAsUrl("")
                  );
                alert("ModifierItem Saved successfully!!");
              });
            props.history.push({
              pathname: "/modifierList",
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
        <br />
        <Row>
          <div className="col-md-8"></div>
          <div className="col-md-4">
            <select
              className="form-control"
              value={selectedModifierName}
              onChange={(e) => setselectedModifierName(e.currentTarget.value)}
              name="tempId"
              disabled
            >
              <option>--Select Modifier--</option>
              {listModifiers.map((item) => (
                <option key={item.id}>{item.modifierName}</option>
              ))}
            </select>
          </div>
        </Row>
        <Row>
          <Col>
            <center>
              <h2>Modifier Item</h2>
            </center>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Form.Group>
                <label>Name</label>
                <Form.Control
                  type="text"
                  ref={register({ required: true })}
                  value={modifierItemName}
                  onChange={(e) => setmodifierItemName(e.currentTarget.value)}
                  name="modifierName"
                />
                {errors.modifierName &&
                  errors.modifierName.type === "required" && (
                    <p className="text-danger">This is Required</p>
                  )}
                {errors.modifierName &&
                  errors.modifierName.type === "required" && (
                    <p className="text-danger">This is Required</p>
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
                    value={modifierItemDescription}
                    onChange={(e) =>
                      setmodifierDescription(e.currentTarget.value)
                    }
                    rows="5"
                    name="description"
                  />
                </div>
              </Form.Group>
              <Form.Group>
                <label>Price</label>
                <Form.Control
                  type="Number"
                  value={modifierPrice}
                  placeholder="Price should be number only"
                  onChange={(e) => setmodifierPrice(e.currentTarget.value)}
                  name="modifierPrice"
                />
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
              <Button
                variant="primary"
                onClick={() => {
                  onSubmit();
                }}
                type="submit"
              >
                Submit
              </Button>
              &nbsp;&nbsp;
              <Link to="/modifierList" className="btn btn-primary">
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

export default ModifierItem;
