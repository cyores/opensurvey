import React, { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

// components
import Header from "./components/Header";
import Footer from "./components/Footer";
import ScrollToTop from "./components/utils/ScrollToTop";

// pages
import Home from "./pages/Home";
import CreateSurvey from "./pages/CreateSurvey";
import Survey from "./pages/Survey";
import Responses from "./pages/Responses";

export default function App() {
    const darkOnDefault = false;
    const defaultTheme = darkOnDefault ? "night" : "light";
    const [theme, setTheme] = useState(defaultTheme);
    return (
        <Router>
            <ScrollToTop>
                <Header
                    darkOnDefault={darkOnDefault}
                    onToggleChange={input => {
                        if (input.target.checked) {
                            setTheme("night");
                        } else {
                            setTheme("light");
                        }
                    }}
                />
                {theme === "night" && (
                    <style>{`
                    :root {
                        --color-bg: var(--color-night-bg);
                        --color-text: var(--color-night-text);
                        --color-shadow: var(--color-night-shadow);
                    }
                `}</style>
                )}
                {theme === "light" && (
                    <style>{`
                    :root {
                        --color-bg: var(--color-light-bg);
                        --color-text: var(--color-light-text);
                        --color-shadow: var(--color-light-shadow);
                    }
                `}</style>
                )}
                <Route exact path="/" component={Home} />
                <Route path="/create-survey" component={CreateSurvey} />
                <Route
                    exact
                    path="/survey/:id"
                    render={props => (
                        <Survey key={props.match.params.id} {...props} />
                    )}
                />
                <Route
                    exact
                    path="/responses/:id"
                    render={props => (
                        <Responses key={props.match.params.id} {...props} />
                    )}
                />
                <Footer />
            </ScrollToTop>
        </Router>
    );
}
