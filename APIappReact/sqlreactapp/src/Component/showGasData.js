import React, { Component } from "react";

import firebase from "../firebase";
import ReactTable from "react-table";
import { Row, Container, Col } from "react-bootstrap";

import "react-table/react-table.css";
import { lowerCase } from "lodash";

class ShowGasData extends Component {
  constructor(props) {
    super(props);

    this.state = {
      columns: [],
      data: [],
    };
  }
  ShowGasData;

  componentDidMount() {
    // firebase
    //   .firestore()
    //   .collection("Employees")
    //   .orderBy("createdAt", "desc")
    //   .onSnapshot((snapshot) => {
    //     const listItems = snapshot.docs.map((doc) => ({
    //       id: doc.id,
    //       ...doc.data(),
    //     }));
    //     this.setState({ data: listItems });
    //     console.log(listItems);
    //   });
  }

  render() {
    const columns = [
      {
        Header: "Name",
        accessor: "name",
        style: {
          textAlign: "right",
        },
        width: 100,
        maxWidth: 100,
        minWidth: 100,
      },
      {
        Header: "Address",
        accessor: "address",
        style: {
          textAlign: "right",
        },
        width: 100,
        maxWidth: 100,
        minWidth: 100,
      },
      {
        Header: "Email",
        accessor: "email",
        style: {
          textAlign: "right",
        },
      },
      {
        Header: "Phone",
        accessor: "phone",
        style: {
          textAlign: "right",
        },
      },
    ];

    return (
      <>
        <Container>
          <br />
          <br />
          <ReactTable
            columns={columns}
            data={this.state.data}
            filterable
            defaultPageSize={10}
            noDataText={"Please Wait"}
            // getTdProps
          />
        </Container>
      </>
    );
  }
}
export default ShowGasData;
