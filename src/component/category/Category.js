import React, { useState } from "react";
import firebase from "../../firebase";
import { Button, Row, Container, Col, Form } from "react-bootstrap";
import { storage } from "../../firebase";
import { Alert } from "reactstrap";
import { AuthConsumer } from "../AuthContext";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import history from "./../history";

const Category = (props) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  //img
  const allInputs = { imgUrl: "" };
  const [imageAsFile, setImageAsFile] = useState(null);
  const [imageAsUrl, setImageAsUrl] = useState(allInputs);
  //Validation
  const { register, handleSubmit, errors } = useForm();

  //img

  const handleImageAsFile = (e) => {
    let image = e.target.files[0];
    setImageAsFile((imageFile) => image);
  };

  //img

  const onSubmit = (form, e) => {
    e.preventDefault();

    try {
      if (name && description && imageAsFile) {
        console.log("start of upload");
        if (imageAsFile === "") {
          console.error(
            `not an image, the image file is a ${typeof imageAsFile}`
          );
        }
        const uploadTask = storage
          .ref(`/Category/${imageAsFile.name}`)
          .put(imageAsFile);

        uploadTask.on(
          "state_changed",
          (snapShot) => {},
          (err) => {
            console.log(err);
          },
          () => {
            storage
              .ref("Category")
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
                  .doc(name)
                  .set({
                    name,
                    description,
                    createdAt: new Date(),
                    fireBaseUrl,
                  })
                  .then(
                    () => setName(""),
                    setDescription(""),
                    setImageAsFile("")
                  );

                // <Alert color="success">Category Saved successfully!!</Alert>;

                alert("Category Saved successfully!!");
              });
            props.history.push({
              pathname: "/categoryList",
            });
          }
        );
      } else {
        //       {<Alert key={idx} variant={variant}>
        //   This is a {variant} alert—check it out!
        // </Alert>

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
              <h2>Category</h2>
            </center>

            <Form onSubmit={handleSubmit(onSubmit)}>
              <Form.Group>
                <label>Name</label>
                <Form.Control
                  placeholder="Enter Name"
                  type="text"
                  ref={register({
                    required: true,
                    //  minLength: 5
                  })}
                  value={name}
                  onChange={(e) => setName(e.currentTarget.value)}
                  name="name"
                />
                {errors.name && errors.name.type === "required" && (
                  <p className="text-danger">This field is Required</p>
                )}
                {/* {errors.name && errors.name.type === "minLength" && (
                  <p className="text-danger">
                    This field required minLength of 5
                  </p>
                )} */}
              </Form.Group>
              <Form.Group>
                <div className="form-group">
                  <label htmlFor="exampleFormControlTextarea1">
                    Description
                  </label>
                  <textarea
                    className="form-control"
                    id="exampleFormControlTextarea1"
                    value={description}
                    ref={register({ required: true })}
                    onChange={(e) => setDescription(e.currentTarget.value)}
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
                {/* <img src={imageAsUrl} alt="image tag" /> */}
              </Form.Group>{" "}
              <Button variant="primary" type="submit">
                Submit
              </Button>
              &nbsp;&nbsp;
              {/* <Link
                variant="primary"
                to="/item"
                className="btn btn-primary"
                // component={<Item />}
              >
                Add Items
              </Link> */}
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
      </Container>
    </div>
  );
};

export default Category;
