import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ModifierItem from "./component/Modifier/ModifierItem";
import Modifier from "./component/Modifier/Modifier";
import Items from "./component/category/Item";
import Category from "./component/category/Category";
import UpdateCategory from "./component/category/Update";
import AuthProvider from "./component/AuthContext";
import UserForm from "./component/login/UserForm";
import Restaurant from "./component/Restaurant";
import Header from "./component/login/Header";
import ProtectedRoute from "./component/login/protectedRoute";
import ModifierList from "./component/Modifier/ModifierList";
import ModifierItemList from "./component/Modifier/ModifierItemList";
import ItemList from "./component/category/itemList";
import UpModifier from "./component/Modifier/UpModifier";
import UpModiItem from "./component/Modifier/UpModiItem";
import UpItem from "./component/category/upItem";
import CategoryList from "./component/category/CategoryList";
import ModifierTemplateList from "./component/modifiertemp/modifierTemplatelist";
import ModifierTemplatePage from "./component/modifiertemp/modifierTemplate";
import ModifierTemplate from "./component/modifiertemp/modifierTemp";
import UpTemplate from "./component/modifiertemp/upTemp";
import Employees from "./component/employees/employees";
import UpdateEmployee from "./component/employees/updateEmp";
import EmployeeList from "./component/employees/empList";
import GridTable from "./reactTable/gridTable";
import AddPrintData from "./component/addPrintData";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Header />
        <Switch>
          <Route exact path="/" component={UserForm} />
          <Route path="/radio" component={App} />
          <ProtectedRoute exact path="/:id/restaurant" component={Restaurant} />
          {/* Category */}
          <ProtectedRoute path="/category" component={Category} />
          <ProtectedRoute path="/categoryList" component={CategoryList} />
          <ProtectedRoute
            path="/update/:id"
            render={(props) => <UpdateCategory {...props} />}
          />
          {/* Item */}
          <ProtectedRoute
            path={["/:categoryid/item", "/item"]}
            component={Items}
          />
          {/* <ProtectedRoute
            path="/itemlist/:id"
            render={(props) => <ItemList {...props} />}
          /> */}
          <ProtectedRoute
            path="/itemList/:categoryid/upItem/:id"
            render={(props) => <UpItem {...props} />}
          />
          {/* Modifier */}
          <ProtectedRoute path="/modifier" component={Modifier} />
          <ProtectedRoute
            path="/modifierList"
            render={(props) => <ModifierList {...props} />}
          />
          <ProtectedRoute
            exact
            path="/upModifier/:id"
            render={(props) => <UpModifier {...props} />}
          />
          <ProtectedRoute
            path="/:id/modifierItem"
            render={(props) => <ModifierItem {...props} />}
          />
          <ProtectedRoute
            path="/modifierTemplateList"
            render={(props) => <ModifierTemplateList {...props} />}
          />
          <ProtectedRoute
            exact
            path="/modifierItemList/:modifierid/upModiItem/:id"
            render={(props) => <UpModiItem {...props} />}
          />
          {/* Employees */}
          <ProtectedRoute path="/employees" component={Employees} />
          <ProtectedRoute path="/employeeList" component={EmployeeList} />
          <Route
            exact
            path="/updateemployee/:id"
            render={(props) => <UpdateEmployee {...props} />}
          />
          {/* Modifier Template */}
          <ProtectedRoute
            path="/modifierTemplate"
            render={(props) => <ModifierTemplatePage {...props} />}
          />
          <ProtectedRoute
            path="/addModifierTemplate/:templateid"
            render={(props) => <ModifierTemplate {...props} />}
          />
          <Route
            exact
            path="/updatetemplate/:id"
            render={(props) => <UpTemplate {...props} />}
          />
          <ProtectedRoute
            path="/modifierItemList/:id"
            render={(props) => <ModifierItemList {...props} />}
          />
          <ProtectedRoute
            path="/itemlist/:id"
            render={(props) => <ItemList {...props} />}
          />
          <ProtectedRoute path="/gridTable" component={GridTable} />
          <ProtectedRoute path="/AddPrintData" component={AddPrintData} />
        </Switch>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
