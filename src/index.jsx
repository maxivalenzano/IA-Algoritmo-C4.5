import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import App from "./App";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

const rootElement = document.getElementById("root");
ReactDOM.render(
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={App} />
        </Switch>
    </BrowserRouter>,
    rootElement
);