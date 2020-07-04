import React from "react";
import "./App.css";
import Restaurant from "./component/Restaurant";

import { AuthConsumer } from "./component/AuthContext";

const App = () => {
  return (
    <AuthConsumer>
      {({ user }) => (
        <div>
          <Restaurant />
        </div>
      )}
    </AuthConsumer>
  );
};
export default App;
