import React from "react";

const Restaurant = (props) => {
  const [state, setState] = React.useState({
    level: "",
  });

  // function handleChange(evt) {
  //   const value =
  //     evt.target.type === "checkbox" ? evt.target.checked : evt.target.value;
  //   setState({
  //     ...state,
  //     [evt.target.name]: value,
  //   });
  // }

  function handleChange(evt) {
    if (evt.target.checked && evt.target.value === "pickup") {
      props.history.push("/category");
    } else {
      props.history.push("/");
    }
    setState({ level: evt.target.value });
  }
  return (
    <div className="App">
      {" "}
      <br />
      <br />
      <br />
      <h3>Restaurant APP</h3> <br />
      <br />
      {/* <div>
        <h4 className="heading">Select the Mode</h4>
        <br />
        <div>
          <label>
            Pickup&nbsp;{" "}
            <input
              type="radio"
              name="level"
              value="pickup"
              checked={state.level === "pickup"}
              onChange={handleChange}
            />
          </label>
          &nbsp; &nbsp; &nbsp;{" "}
          <label>
            Delivery &nbsp;{" "}
            <input
              type="radio"
              name="level"
              value="delivery"
              checked={state.level === "delivery"}
              onChange={handleChange}
            />
          </label>
          &nbsp; &nbsp; &nbsp; <input type="checkbox" />
        </div>
      </div> */}
    </div>
  );
};
export default Restaurant;
