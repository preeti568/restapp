import React, { useState } from "react";
import firebase from "../../firebase";
import { Button, Row, Container, Col, Form } from "react-bootstrap";

import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

const ModifierTemplatePage = (props) => {
  const [templateName, setTemplateName] = useState("");
  const [templatedescription, setTemplateDescription] = useState("");

  //Validation
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = (form, e) => {
    e.preventDefault();
    try {
      if (templateName && templatedescription) {
        firebase
          .firestore()
          .collection("ModifierTemplate")
          .doc(templateName)
          .set({
            templateName,
            templatedescription,
            createdAt: new Date(),
          })
          .then(() => setTemplateName(""), setTemplateDescription(""));

        alert("ModifierTemplate Saved successfully!!");
        props.history.push({
          pathname: "/modifierTemplateList",
        });
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
              <h2>Modifier Template</h2>
            </center>

            <Form onSubmit={handleSubmit(onSubmit)}>
              <Form.Group>
                <label>Template Name</label>
                <Form.Control
                  placeholder="Enter Name"
                  type="text"
                  ref={register({ required: true, minLength: 5 })}
                  value={templateName}
                  onChange={(e) => setTemplateName(e.currentTarget.value)}
                  name="templateName"
                />
                {errors.templateName &&
                  errors.templateName.type === "required" && (
                    <p className="text-danger">This is Required</p>
                  )}
                {errors.templateName &&
                  errors.templateName.type === "minLength" && (
                    <p className="text-danger">
                      This field required minLength of 5
                    </p>
                  )}
              </Form.Group>
              <Form.Group>
                <div className="form-group">
                  <label htmlFor="exampleFormControlTextarea1">
                    Template Description
                  </label>
                  <textarea
                    className="form-control"
                    id="exampleFormControlTextarea1"
                    value={templatedescription}
                    ref={register({ required: true })}
                    onChange={(e) =>
                      setTemplateDescription(e.currentTarget.value)
                    }
                    rows="5"
                    name="templatedescription"
                  />
                </div>
              </Form.Group>
              <Button variant="primary" type="submit">
                Submit
              </Button>
              &nbsp;&nbsp;
              <Link
                variant="primary"
                to="/modifierTemplateList"
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

export default ModifierTemplatePage;
