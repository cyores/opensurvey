import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { connect } from "react-redux";

// components
import Header from "./components/Header";

// pages
import Home from "./pages/Home";

function App() {
    return (
        <Router>
            <Header />
            <Route exact path="/" component={Home} />
        </Router>
    );
}

export default connect()(App);
