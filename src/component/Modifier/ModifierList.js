import React, { useState, useEffect } from "react";
import firebase from "../../firebase";
import { Row, Container, Col, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { paginate } from "./../utils/paginate";
import Pagination from "./../login/pagination";
import SearchBox from "./../login/searchBox";

const useItems = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection("Modifier")
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

const deleteItem = (item) => {
  firebase
    .firestore()
    .collection("Modifier")
    .doc(item.id)
    .delete()
    .then(function () {
      console.log("Document successfully deleted!");
      alert(`${item.modifierName} Modifier successfully deleted!`);
    });

  firebase
    .firestore()
    .collection("Modifier")
    .doc(item.id)
    .collection("Modifier Item")
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

const ModifierList = () => {
  let listItem = useItems();
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

  if (count === 0) return <p>THere are no Category in the Database</p>;

  if (searchQuery)
    listItem = listItem.filter((m) =>
      m.modifierName.toLowerCase().startsWith(searchQuery.toLowerCase())
    );

  const data = paginate(listItem, currentPage, pageSize);

  return (
    <div>
      <Container>
        <Row>
          <Col>
            <center>
              <h2> Modifier List </h2>
            </center>
          </Col>
        </Row>
        <br />
        <p>Showing {count} Modifiers in the Database</p>

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
                      to="/modifier"
                      className="btn btn-info my-3"
                    >
                      + Add Modifier{" "}
                    </Link>
                  </th>
                </tr>
              </thead>
              <thead>
                <tr className="text-center">
                  <th>Modifier Name</th>
                  <th>Description</th>
                  <th>Update Modifier</th>

                  <th>AddModifierItem</th>
                  <th>Delete</th>
                </tr>
              </thead>
              {data.map((item) => (
                <tbody key={item.id}>
                  <tr>
                    <td>{item.modifierName}</td>
                    <td>{item.modifierDescription}</td>
                    <td className="text-center">
                      <Link
                        to={`/upModifier/${item.id}`}
                        className="btn text-primary"
                      >
                        <i className="fas fa-pencil-alt"></i>
                      </Link>
                    </td>

                    <td className="text-center">
                      <Link
                        className="btn text-info"
                        to={`/modifierItemList/${item.id}`}
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
  );
};
export default ModifierList;
