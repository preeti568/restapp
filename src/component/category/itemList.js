import React, { useState, useEffect } from "react";
import firebase from "../../firebase";
import { Row, Container, Col, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import Pagination from "../login/pagination";
import { paginate } from "../utils/paginate";

import SearchBox from "../login/searchBox";

const useItems = (props) => {
  const [items, setItems] = useState([]);
  try {
    useEffect(() => {
      const unsubscribe = firebase
        .firestore()
        .collection("Category")
        .doc(props.match.params.id)
        .collection("Items")
        .orderBy("createdAt", "desc")
        .get()
        .then((querySnapshot) => {
          const listItems = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setItems(listItems);
          console.log(listItems);
        });
      // return () => unsubscribe();
    }, []);
  } catch (e) {
    console.log(e);
  }

  return items;
};

const deleteItem = (id, props) => {
  firebase
    .firestore()
    .collection("Category")
    .doc(props.match.params.id)
    .collection("Items")
    .doc(id)
    .delete()
    .then(function () {
      console.log("Item successfully deleted!");
      alert(`${id} Item successfully deleted!`);
    })
    .catch(function (error) {
      console.error("Error removing document: ", error);
    });
};

function ItemList(props) {
  let listItem = useItems(props);
  const [pageSize] = useState(4);
  let [currentPage, setCurrentPage] = useState(1);
  let [searchQuery, setSearchQuery] = useState("");

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  let count = listItem.length;

  if (searchQuery)
    listItem = listItem.filter((m) =>
      m.itemName.toLowerCase().startsWith(searchQuery.toLowerCase())
    );

  const data = paginate(listItem, currentPage, pageSize);

  return (
    <div>
      <Container>
        <Row>
          <Col>
            <center>
              <h2> Category Item List </h2>
            </center>
            <h5>ID: {props.match.params.id}</h5>
          </Col>
        </Row>
        {count === 0 ? (
          <React.Fragment>
            <p>Total {count} Items in the Database</p>
            <Link
              to={`/${props.match.params.id}/item`}
              className="btn btn-info my-3"
            >
              + AddItem{" "}
            </Link>
          </React.Fragment>
        ) : (
          <Row>
            <Col>
              <Table striped bordered hover variant="dark">
                <thead>
                  <tr>
                    <th colSpan="3" className="text-left">
                      <SearchBox value={searchQuery} onChange={handleSearch} />
                    </th>

                    <th colSpan="2" className="text-center">
                      <Link
                        to={`/${props.match.params.id}/item`}
                        className="btn btn-info my-3"
                      >
                        + AddItem{" "}
                      </Link>
                    </th>
                  </tr>
                </thead>
                <thead>
                  <tr className="text-center">
                    <th>Item Name</th>
                    <th>Description</th>
                    <th>Price</th>
                    <th>Update </th>
                    <th>Delete</th>
                  </tr>
                </thead>
                {data.map((item) => (
                  <tbody key={item.id}>
                    <tr>
                      <td>{item.itemName}</td>
                      <td>{item.itemDescription}</td>
                      <td>{item.itemPrice}</td>
                      <td className="text-center">
                        <Link
                          to={`/itemList/${props.match.params.id}/upItem/${item.id}`}
                          className="btn text-primary"
                        >
                          <i className="fas fa-pencil-alt"></i>
                        </Link>
                      </td>
                      <td className="text-center">
                        <Link
                          to="/categoryList"
                          className="btn text-danger"
                          onClick={() => deleteItem(item.id, props)}
                        >
                          <i className="fas fa-trash-alt"></i>
                        </Link>
                      </td>{" "}
                    </tr>
                  </tbody>
                ))}{" "}
              </Table>
            </Col>
          </Row>
        )}
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

export default ItemList;
