import React, { useState, useEffect } from "react";
import firebase from "../../firebase";
import { Button, Row, Container, Col, Form } from "react-bootstrap";
import { storage } from "../../firebase";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

const Employees = (props) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");

  //img
  const allInputs = { imgUrl: "" };
  const [imageAsFile, setImageAsFile] = useState(null);
  const [imageAsUrl, setImageAsUrl] = useState(allInputs);
  //Validation
  const { register, handleSubmit, errors } = useForm();

  const handleImageAsFile = (e) => {
    const image = e.target.files[0];
    setImageAsFile((imageFile) => image);
  };

  const countries = require("./countries.json");
  const cities = require("./cities.json");
  const states = require("./states.json");

  const [listCountry, setListCountry] = useState({});
  const [listState, setListState] = useState([]);
  const [listCity, setListCity] = useState([]);

  useEffect(() => {
    setListCountry(countries);
    setListState(states);
    setListCity(cities);
  }, []);

  console.log(listCountry);

  const onSubmit = (form, e) => {
    e.preventDefault();
    try {
      if (
        name &&
        phone &&
        email &&
        address &&
        imageAsFile &&
        country &&
        state &&
        city
      ) {
        console.log("start of upload");
        if (imageAsFile === "") {
          console.error(
            `not an image, the image file is a ${typeof imageAsFile}`
          );
        }
        const uploadTask = storage
          .ref(`/Employees/${imageAsFile.name}`)
          .put(imageAsFile);

        uploadTask.on(
          "state_changed",
          (snapShot) => {},
          (err) => {
            console.log(err);
          },
          () => {
            storage
              .ref("Employees")
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
                  .collection("Employees")
                  .doc(name)
                  .set({
                    name,
                    phone,
                    email,
                    address,
                    city,
                    state,
                    country,
                    createdAt: new Date(),
                    fireBaseUrl,
                  })
                  .then(
                    () => setName(""),
                    setPhone(""),
                    setEmail(""),
                    setAddress(""),
                    setCity(""),
                    setState(""),
                    setCountry(""),
                    setImageAsUrl("")
                  );
              });
            props.history.push({
              pathname: "/employeeList",
            });
          }
        );

        alert("Employee Saved successfully!!");
      } else {
        alert("Please Fill All Details !!!");
      }
    } catch (err) {
      console.log("Error in Submission", err);
    }
  };

  const handleCountry = (e) => {
    let a;
    let b = [];
    setCountry(e.target.value);
    a = listCountry.countries.find((cntry) => cntry.name === e.target.value);
    console.log(a.id);
    b = states.states.filter((b) => b.country_id === a.id);
    setListState(b);
  };

  const handleState = (e) => {
    let a;
    let b = [];
    setState(e.target.value);
    a = listState.find((cntry) => cntry.name === e.target.value);
    console.log(a.id);

    b = cities.cities.filter((cntry) => cntry.state_id === a.id);

    setListCity(b);
    console.log(b.id);
  };
  return (
    <div>
      <Container>
        <Row>
          <Col>
            <center>
              <h2>Employee Details</h2>
            </center>

            <Form onSubmit={handleSubmit(onSubmit)}>
              <Form.Group>
                <label>Employee Name</label>
                <Form.Control
                  placeholder="Enter Name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.currentTarget.value)}
                  name="name"
                />
                {errors.name && errors.name.type === "required" && (
                  <p className="text-danger">This is Required</p>
                )}
              </Form.Group>
              <Form.Group>
                <div className="form-group">
                  <label htmlFor="exampleFormControlTextarea1">
                    Contact No.
                  </label>
                  <Form.Control
                    placeholder="Enter Phone number"
                    type="Number"
                    className="form-control"
                    id="exampleFormControlTextarea1"
                    value={phone}
                    ref={register({
                      required: true,
                      minLength: 10,
                      maxLength: 10,
                      type: "number",
                    })}
                    onChange={(e) => setPhone(e.currentTarget.value)}
                    name="phone"
                  />
                  {errors.phone && errors.phone.type === "required" && (
                    <p className="text-danger">This Field is Required</p>
                  )}
                </div>
              </Form.Group>
              <Form.Group>
                <div className="form-group">
                  <label htmlFor="exampleFormControlTextarea1">E-Mail</label>
                  <Form.Control
                    type="email"
                    placeholder="name@example.com"
                    className="form-control"
                    id="exampleFormControlTextarea1"
                    value={email}
                    // ref={register({ required: true })}
                    onChange={(e) => setEmail(e.currentTarget.value)}
                    name="email"
                  />
                  <Form.Text
                    style={{ Color: "#452300" }}
                    className="text-muted"
                  >
                    We'll never share your email with anyone else.
                  </Form.Text>
                </div>
              </Form.Group>
              <Form.Group>
                <div className="form-group">
                  <label htmlFor="exampleFormControlTextarea1">Address</label>
                  <textarea
                    className="form-control"
                    id="exampleFormControlTextarea1"
                    value={address}
                    onChange={(e) => setAddress(e.currentTarget.value)}
                    rows="4"
                    name="address"
                  />
                </div>
              </Form.Group>
              <div class="row">
                <div class="col-md-4">
                  <Form.Group>
                    <div className="form-group">
                      <label>Country</label>
                      &nbsp;&nbsp;
                      <select
                        value={country}
                        onChange={handleCountry}
                        name="country"
                        style={{ height: "30px", fontFamily: "cursive" }}
                      >
                        <option>Select Country</option>

                        {listCountry.countries &&
                          listCountry.countries.map((a) => (
                            <option key={a.name}>{a.name}</option>
                          ))}
                      </select>
                    </div>
                  </Form.Group>
                </div>
                <div class="col-sm-1"></div>

                <div class="col-sm-3">
                  <Form.Group>
                    <div className="form-group">
                      <div htmlFor="exampleFormControlTextarea1">State</div>

                      <select
                        style={{ width: 200 }}
                        value={state}
                        onChange={handleState}
                        name="state"
                        style={{ height: "30px", fontFamily: "cursive" }}
                      >
                        <option>Select State</option>
                        {Object.keys(listState).map((a) => (
                          <option>{listState[a].name}</option>
                        ))}
                      </select>
                    </div>
                  </Form.Group>
                </div>
                <div class="col-sm-1"></div>

                <div class="col-md-2">
                  <Form.Group>
                    <div className="form-group">
                      <div htmlFor="exampleFormControlTextarea1">City</div>

                      <select
                        value={city}
                        onChange={(e) => setCity(e.currentTarget.value)}
                        style={{ height: "30px", fontFamily: "cursive" }}
                        name="city"
                      >
                        {" "}
                        <option>Select City</option>
                        {console.log(listCity)}
                        {Object.keys(listCity).map((a) => (
                          <option>{listCity[a].name}</option>
                        ))}
                      </select>
                    </div>
                  </Form.Group>
                </div>
              </div>
              <Form.Group>
                <br />
                <br />
                <label style={{ display: "inline-block", marginLeft: "30px" }}>
                  Driving Licence
                </label>
                <br />
                <input
                  placeholder="please upload clear Scanned driving licence"
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
              &nbsp;&nbsp; &nbsp;&nbsp;
              <Link
                variant="primary"
                to="/employeeList"
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

export default Employees;
