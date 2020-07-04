import React, { useState, useEffect } from "react";
import firebase from "../../firebase";
import { Row, Container, Col, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { paginate } from "./../utils/paginate";
import Pagination from "./../login/pagination";
import SearchBox from "./../login/searchBox";

const useItems = (props) => {
  const [items, setItems] = useState([]);
  try {
    useEffect(() => {
      const unsubscribe = firebase
        .firestore()
        .collection("Modifier")
        .doc(props.match.params.id)
        .collection("Modifier Item")
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
    .collection("Modifier")
    .doc(props.match.params.id)
    .collection("Modifier Item")
    .doc(id)
    .delete()
    .then(function () {
      console.log("Document successfully deleted!");
      alert(`${id} ModifierItem successfully deleted!`);
    })
    .catch(function (error) {
      console.error("Error removing document: ", error);
    });
};

function ModifierItemList(props) {
  let listItem = useItems(props);
  let [searchQuery, setSearchQuery] = useState("");

  const [pageSize] = useState(4);
  let [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  let count = listItem.length;

  // if (count === 0) return <p>THere are no Category in the Database</p>;

  if (searchQuery)
    listItem = listItem.filter((m) =>
      m.modifierItemName.toLowerCase().startsWith(searchQuery.toLowerCase())
    );
  const data = paginate(listItem, currentPage, pageSize);

  return (
    <div>
      <Container>
        <Row>
          <Col>
            <center>
              <h2> Modifier Item List </h2>
            </center>
            <h5>ID: {props.match.params.id}</h5>
          </Col>
        </Row>
        <br></br>

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
                      variant="info"
                      to={`/${props.match.params.id}/modifierItem`}
                      className="btn btn-primary my-3"
                    >
                      + Add Modifier Item{" "}
                    </Link>
                  </th>
                </tr>
              </thead>
              <thead>
                <tr className="text-center">
                  <th>ModifierItem Name</th>
                  <th>Description</th>
                  <th>Price</th>
                  <th>Update Modifier</th>
                  <th>Delete</th>
                </tr>
              </thead>
              {data.map((item) => (
                <tbody key={item.id}>
                  <tr>
                    <td>{item.modifierItemName}</td>
                    <td>{item.modifierItemDescription}</td>
                    <td>{item.modifierPrice}</td>
                    <td className="text-center">
                      <Link
                        to={`/modifierItemList/${props.match.params.id}/upModiItem/${item.id}`}
                        className="btn text-primary"
                      >
                        <i className="fas fa-pencil-alt"></i>
                      </Link>
                    </td>
                    <td className="text-center">
                      <Link
                        to="/modifierList"
                        className="btn text-danger"
                        onClick={() => deleteItem(item.id, props)}
                      >
                        <i className="fas fa-trash-alt"></i>
                      </Link>
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

export default ModifierItemList;
