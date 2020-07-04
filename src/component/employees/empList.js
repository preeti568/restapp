import React, { useState, useEffect } from "react";
import firebase from "../../firebase";
import { Row, Container, Col, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AuthConsumer } from "../AuthContext";
import Pagination from "../login/pagination";
import { paginate } from "../utils/paginate";
import SearchBox from "../login/searchBox";

const useItems = () => {
  const [items, setItems] = useState([]);
  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection("Employees")
      .orderBy("createdAt", "desc")
      .onSnapshot((snapshot) => {
        const listItems = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setItems(listItems);
        console.log(listItems);
      });
    return () => unsubscribe();
  }, []);
  return items;
};

const deleteItem = (id) => {
  firebase.firestore().collection("Employees").doc(id).delete();
  alert(`${id} Employee successfully deleted!`);
};

const addItem = (id) => {
  console.log(id.name);
};

const EmployeeList = () => {
  let listItem = useItems();
  const [pageSize] = useState(5);
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

  // if (count === 0) return <p>There are no Employee in the Database</p>;

  if (searchQuery)
    listItem = listItem.filter((m) =>
      m.name.toLowerCase().startsWith(searchQuery.toLowerCase())
    );

  const data = paginate(listItem, currentPage, pageSize);
  return (
    <AuthConsumer>
      {({ user }) => (
        <div>
          <Container>
            <Row>
              <Col>
                <center>
                  <h2> Employees List </h2>
                </center>
              </Col>
            </Row>
            <br />
            {count === 0 ? (
              <React.Fragment>
                <p>Showing {count} Employees in the Database</p>
                <Link to="/employees" className="btn btn-info my-3">
                  + Add Employee{" "}
                </Link>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <p>Showing {count} Employees in the Database</p>
                <Row>
                  <Col>
                    <Table striped bordered hover variant="dark">
                      <thead>
                        <tr>
                          <th colSpan="3" className="text-left">
                            <SearchBox
                              value={searchQuery}
                              onChange={handleSearch}
                            />
                          </th>
                          <th colSpan="2" className="text-center">
                            <Link to="/employees" className="btn btn-info my-3">
                              + Add Employee{" "}
                            </Link>
                          </th>
                        </tr>
                      </thead>
                      <thead>
                        <tr className="text-center">
                          <th>Employee Name</th>
                          <th>Contact Number</th>
                          <th>Address</th>
                          <th>Update</th>
                          <th>Delete</th>
                        </tr>
                      </thead>
                      {data.map((item) => (
                        <tbody key={item.id}>
                          <tr>
                            <td>{item.name}</td>
                            <td>{item.phone}</td>
                            <td>{item.address}</td>
                            <td className="text-center">
                              <Link
                                to={`/updateemployee/${item.id}`}
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
              </React.Fragment>
            )}
            <Pagination
              itemCount={count}
              pageSize={pageSize}
              onPageChange={handlePageChange}
              currentPage={currentPage}
            />
          </Container>
        </div>
      )}
    </AuthConsumer>
  );
};
export default EmployeeList;
