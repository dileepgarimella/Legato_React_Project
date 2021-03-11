import React from "react";
import {
  BrowserRouter,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Login from './components/Login/Login';
import Search from './components/Search/search'
import EmployeeData from './components/Details/EmployeeData'
import App from './App'
export default function RouterComp() {
    return (
      <BrowserRouter >
          <Switch>
            <Route path="/" exact component={Login}/>
            <Route path="/employee" component={EmployeeData}/>
            <Route path="/Search" component={Search}/>
          </Switch>
      </BrowserRouter>
    );
  }