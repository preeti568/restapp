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
      .collection("Category")
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

const deleteItem = (item) => {
  firebase
    .firestore()
    .collection("Category")
    .doc(item.id)
    .delete()
    .then(function () {
      console.log("Document successfully deleted!");
      alert(`${item.name} Category successfully deleted!`);
    });

  firebase
    .firestore()
    .collection("Category")
    .doc(item.id)
    .collection("Items")
    .get()
    .then((res) => {
      res.forEach((element) => {
        element.ref.delete();
      });
    })
    .catch(function (error) {
      console.error("Error removing document: ", error);
    });
};

const addItem = (id) => {
  console.log(id.name);
};

const CategoryList = () => {
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
      m.name.toLowerCase().startsWith(searchQuery.toLowerCase())
    );
  }
  const data = paginate(listItem, currentPage, pageSize);

  return (
    <AuthConsumer>
      {({ user }) => (
        <div>
          <Container>
            <Row>
              <Col>
                <center>
                  <h2> Category List </h2>
                </center>
              </Col>
            </Row>
            <br />

            <React.Fragment>
              <p>Showing {count} Categories in the Database</p>
            </React.Fragment>

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
                        <Link to="/category" className="btn btn-info my-3">
                          + Add Category{" "}
                        </Link>
                      </th>
                    </tr>
                  </thead>

                  <thead>
                    <tr className="text-center">
                      <th>Category Name</th>
                      <th>Description</th>
                      <th>Update</th>
                      <th>AddItem</th>
                      <th>Delete</th>
                    </tr>
                  </thead>
                  {data.map((item) => (
                    <tbody key={item.id}>
                      <tr>
                        <td>{item.name}</td>
                        <td>{item.description}</td>
                        <td className="text-center">
                          <Link
                            to={`/update/${item.id}`}
                            className="btn text-primary"
                          >
                            <i className="fas fa-pencil-alt"></i>
                          </Link>
                        </td>
                        <td className="text-center">
                          <Link
                            onClick={() => addItem(item)}
                            to={`/itemlist/${item.id}`}
                            className="btn text-warning"
                          >
                            <i className="fa fa-plus-circle"></i>
                          </Link>
                        </td>
                        <td className="text-center">
                          <a
                            className="btn text-danger"
                            onClick={() => deleteItem(item)}
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
      )}
    </AuthConsumer>
  );
};
export default CategoryList;
