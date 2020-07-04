import React, { useState, useEffect } from "react";
import { Button, Row, Container, Col, Form, Table } from "react-bootstrap";
import firebase from "../firebase";
import { Link } from "react-router-dom";
import Pagination from "../component/login/pagination";
import { paginate } from "../component/utils/paginate";
import SearchBox from "../component/login/searchBox";
import { add } from "lodash";

const useItems = () => {
  const [items, setItems] = useState([]);
  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection("Project")
      .orderBy("createdAt", "desc")
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

function SampleForm(props) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [houseNo, setHouseNo] = useState("");
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");
  const [state, setState] = useState("");

  let listItem = useItems();

  const [pageSize] = useState(4);
  let [searchQuery, setSearchQuery] = useState("");
  let [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  let count = listItem.length;

  if (searchQuery) {
    listItem = listItem.filter((m) =>
      m.gender.toLowerCase().startsWith(searchQuery.toLowerCase())
    );
  }
  const data = paginate(listItem, currentPage, pageSize);

  const onSubmit = (e) => {
    e.preventDefault();
    try {
      if (firstName && lastName && gender) {
        firebase
          .firestore()
          .collection("Project")
          .doc(firstName)
          .set({
            firstName,
            lastName,
            createdAt: new Date(),
            gender,
            address: {
              houseNo,
              street,
              city,
              state,
            },
          })
          .then(
            () => setFirstName(""),
            setLastName(""),
            setGender(""),
            setHouseNo(""),
            setCity(""),
            setStreet(""),
            setState("")
          );
        alert("Data Saved");
      }
    } catch (error) {
      console.log("Error");
    }
  };
  const deleteItem = (id) => {
    firebase
      .firestore()
      .collection("Project")
      .doc(id)
      .delete()
      .then(function () {
        console.log("Document successfully deleted!");
      })
      .catch(function (error) {
        console.error("Error removing document: ", error);
      });
  };
  console.log(data);
  return (
    <div>
      <Container>
        <Form onSubmit={onSubmit}>
          <div class="row">
            <div class="col-3">
              <Form.Group>
                <label>FirstName</label>
                <Form.Control
                  placeholder="Enter FirstName"
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.currentTarget.value)}
                  name="firstName"
                />
              </Form.Group>{" "}
            </div>
            <div class="col-3">
              <Form.Group>
                <label>LastName</label>
                <Form.Control
                  placeholder="Enter LastName"
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.currentTarget.value)}
                  name="lastName"
                />
              </Form.Group>{" "}
            </div>
            <div class="col-3">
              <Form.Group>
                <label>Gender</label>
                <select
                  className="form-control"
                  value={gender}
                  onChange={(e) => setGender(e.currentTarget.value)}
                  name="gender"
                >
                  <option defaultValue>Select Gender</option>
                  <option value="male">Male</option>

                  <option value="female">Female</option>
                </select>
              </Form.Group>
            </div>
            <div class="col-3">
              <br />

              <center>
                <button className="btn btn-info" type="submit">
                  SAVE
                </button>
              </center>
            </div>
          </div>
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
              </div>
            </Form.Group>
          </div>
        </Form>
      </Container>
      <br />
      <br />
      <br />
      <Container>
        <Row>
          <Col>
            <Table striped bordered hover variant="secondary">
              <thead>
                <tr>
                  <th colSpan="4" className="text-center">
                    <SearchBox value={searchQuery} onChange={handleSearch} />
                  </th>
                  <th className="text-center">Search By Gender </th>
                </tr>
              </thead>
              <thead>
                <tr className="text-center">
                  <th>FirstName</th>
                  <th>LastName</th>
                  <th>Gender</th>
                  <th>Update</th>
                  <th>Delete</th>
                </tr>
              </thead>
              {data.map((item) => (
                <tbody key={item.id}>
                  <tr>
                    <td>{item.firstName}</td>
                    <td>{item.lastName}</td>
                    <td>{item.gender}</td>
                    {/* <td>
                      {item.address.map((a) => (
                        <ul>
                          <li>{a.houseNo}</li>
                          <li>{a.street}</li>
                          <li>{a.city}</li>
                          <li>{a.state}</li>
                        </ul>
                      ))}
                    </td> */}
                    <td className="text-center">
                      <Link
                        to={`/updateSample/${item.id}`}
                        className="btn text-primary"
                      >
                        <i className="fas fa-pencil-alt"></i>
                      </Link>
                    </td>
                    <td className="text-center">
                      <a
                        className="btn text-danger"
                        onClick={() => deleteItem(item.id)}
                      >
                        <i className="fas fa-trash-alt"></i>
                      </a>
                    </td>
                  </tr>
                </tbody>
              ))}
            </Table>
          </Col>
        </Row>
        <Pagination
          itemCount={count}
          pageSize={pageSize}
          onPageChange={handlePageChange}
          currentPage={currentPage}
        />
      </Container>
    </div>
  );
}

export default SampleForm;
