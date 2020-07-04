import React, { Component } from "react";
import firebase from "../../firebase";
import { Row, Container, Col, Table, Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import ReactTable from "react-table";
// import "react-table/react-table.css";

class Temp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modifierItemName: "",
      modifierPrice: "",
    };
  }

  render() {
    const columns = [
      {
        Header: "Select Item",
        accessor: "select",
      },
      {
        Header: "Modifier Item",
        accessor: "modifieritem",
      },
      {
        Header: "Price",
        accessor: "price",
      },
    ];

    const data = [
      {
        name: "Ayaan",
        age: 26,
      },
      {
        name: "Ahana",
        age: 22,
      },
      {
        name: "Peter",
        age: 40,
      },
      {
        name: "Virat",
        age: 30,
      },
      {
        name: "Rohit",
        age: 32,
      },
      {
        name: "Dhoni",
        age: 37,
      },
    ];

    return (
      <div>
        <ReactTable
          data={data}
          columns={columns}
          defaultPageSize={2}
          pageSizeOptions={[2, 4, 6]}
        />
      </div>
    );
  }
}

export default Temp;
