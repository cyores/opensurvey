import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { connect } from "react-redux";

// components
import Header from "./components/Header";

// pages
import Home from "./pages/Home";
import CreateSurvey from "./pages/CreateSurvey";

function App() {
    return (
        <Router>
            <Header />
            <Route exact path="/" component={Home} />
            <Route path="/create-survey" component={CreateSurvey} />
        </Router>
    );
}

export default connect()(App);
