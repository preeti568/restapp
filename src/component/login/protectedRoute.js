import React from "react";
import { Route, Redirect } from "react-router-dom";

import { AuthConsumer } from "../AuthContext";

const ProtectedRoute = ({ component: Component, render, ...rest }) => {
  return (
    <AuthConsumer>
      {({ user }) => (
        <Route
          {...rest}
          render={(props) => {
            if (!user) {
              return (
                <Redirect
                  to={{
                    pathname: "/",
                    state: { from: props.location },
                  }}
                />
              );
            } else {
              return Component ? <Component {...props} /> : render(props);
            }
          }}
        />
      )}
    </AuthConsumer>
  );
};

export default ProtectedRoute;
