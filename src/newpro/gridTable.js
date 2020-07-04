import React, { Component } from "react";

import ReactTable from "react-table";

class GridTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      columns: [],
      data: [],
    };
  }

  render() {
    const columns = [
      {
        Header: "Category Name",
        accessor: "CategoryName",
        style: {
          textAlign: "right",
        },
        width: 100,
        maxWidth: 100,
        minWidth: 100,
      },
      {
        Header: "Description",
        accessor: "Description",
        style: {
          textAlign: "right",
        },
        width: 100,
        maxWidth: 100,
        minWidth: 100,
      },
      // {
      //   Header: "Update",
      //   accessor: "Update",
      //   sortable: false,
      //   filterable: false,
      // },
      // {
      //   Header: "body",
      //   accessor: "body",
      //   sortable: false,
      //   filterable: false,
      // },
      // {
      //   Header: "Actions",
      //   cell: (props) => {
      //     return (
      //       <button style={{ backgroundColor: "red ", color: "#fefefe" }}>
      //         Delete
      //       </button>
      //     );
      //   },
      //   filterable: false,
      // },
    ];

    return (
      <div>
        <ReactTable style={{}} data={} columns={columns} />
      </div>
    );
  }
}
export default GridTable;
