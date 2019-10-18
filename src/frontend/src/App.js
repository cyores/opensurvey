import React from "react";
import logo from "./logo.svg";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { connect } from "react-redux";

// pages
import Home from "./pages/Home";

function App() {
    return (
        <Router>
            <Route exact path="/" component={Home} />
        </Router>
    );
}

export default connect()(App);
