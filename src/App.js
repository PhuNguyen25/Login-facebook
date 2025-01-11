import React from "react";
import "./App.css";
import "./responsive.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomeScreen from "./views/HomeScreen";
import HomeRouter from "./routes/HomeRouter";
import Category from "./components/ManageCategory";
import Blog from "./components/ManageBlog";
import Item from "./components/ManageItem";
import ModifierGroup from "./components/ManageModifierGroup";
import Modifiers from "./components/ManageModifiers";
import NotFound from "./views/NotFound";
import Dashboard from "./components/Dashboard";
import Login from "./views/Login";
import EditBlog from "./components/EditBlog";
import User from "./components/ManageUser";
import Order from "./components/ManageOrder";
import Profile from "./views/Profile";
class App extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <HomeRouter path="/" component={Dashboard} exact />
          {/* <HomeRouter path="/" component={HomeScreen} exact /> */}
          <HomeRouter path="/Category" component={Category} exact />
          <HomeRouter path="/Blog/EditBlog" component={EditBlog} exact />
          <HomeRouter path="/Blog" component={Blog} exact />
          <HomeRouter path="/Item" component={Item} exact />
          <HomeRouter path="/User" component={User} exact />
          <HomeRouter path="/ModifierGroup" component={ModifierGroup} exact />
          <HomeRouter path="/Modifiers" component={Modifiers} exact />
          <Route path="/login" component={Login} exact />
          <HomeRouter path="/Order" component={Order} exact />
          <HomeRouter path="/profile" component={Profile} exact />
          <HomeRouter component={NotFound} />
        </Switch>
      </Router>
    );
  }
}



export default App;
