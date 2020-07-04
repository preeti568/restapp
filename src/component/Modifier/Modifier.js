import React, { useState } from "react";
import firebase from "../../firebase";
import { Button, Row, Container, Col, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { storage } from "../../firebase";
import { useForm } from "react-hook-form";

const Modifier = (props) => {
  const [modifierName, setmodifierName] = useState("");
  const [modifierDescription, setmodifierDescription] = useState("");

  //img
  const allInputs = { imgUrl: "" };
  const [imageAsFile, setImageAsFile] = useState(null);
  const [imageAsUrl, setImageAsUrl] = useState(allInputs);

  //Validation
  const { register, handleSubmit, errors } = useForm();

  //img

  const handleImageAsFile = (e) => {
    const image = e.target.files[0];
    setImageAsFile((imageFile) => image);
  };

  const onSubmit = (form, e) => {
    e.preventDefault();
    try {
      if (modifierName && modifierDescription && imageAsFile) {
        console.log("start of upload");

        if (imageAsFile === "") {
          console.error(
            `not an image, the image file is a ${typeof imageAsFile}`
          );
        }
        const uploadTask = storage
          .ref(`/Modifier/${imageAsFile.name}`)
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
              .ref("Modifier")
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
                  .doc(modifierName)
                  .set({
                    modifierName,
                    modifierDescription,
                    fireBaseUrl,
                    createdAt: new Date(),
                  })
                  .then(() => setmodifierName(""), setmodifierDescription(""));
                alert("Modifier Saved successfully!!");
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
        <Row>
          <Col>
            <center>
              <h2>Modifier</h2>
            </center>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Form.Group>
                <label>Name</label>
                <Form.Control
                  type="text"
                  value={modifierName}
                  ref={register({ required: true, minLength: 5 })}
                  onChange={(e) => setmodifierName(e.currentTarget.value)}
                  name="modifierName"
                />
                {errors.modifierName &&
                  errors.modifierName.type === "required" && (
                    <p className="text-danger">This is Required</p>
                  )}
                {errors.modifierName &&
                  errors.modifierName.type === "minLength" && (
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
                    value={modifierDescription}
                    ref={register({ required: true })}
                    onChange={(e) =>
                      setmodifierDescription(e.currentTarget.value)
                    }
                    rows="5"
                    name="description"
                  />
                </div>
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
              </Button>{" "}
              &nbsp;
              <Link
                to="/modifierList"
                className="btn btn-primary"
                variant="primary"
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
export default Modifier;
