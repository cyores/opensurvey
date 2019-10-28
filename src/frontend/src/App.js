import React, { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

// components
import Header from "./components/Header";
import Footer from "./components/Footer";

// pages
import Home from "./pages/Home";
import CreateSurvey from "./pages/CreateSurvey";

export default function App() {
    const darkOnDefault = false;
    const defaultTheme = darkOnDefault ? "night" : "light";
    const [theme, setTheme] = useState(defaultTheme);
    return (
        <Router>
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
                    :root {--color-bg: var(--color-night-bg); --color-text: var(--color-night-text)}
                `}</style>
            )}
            {theme === "light" && (
                <style>{`
                    :root {--color-bg: var(--color-light-bg); --color-text: var(--color-light-text)}
                `}</style>
            )}
            <Route exact path="/" component={Home} />
            <Route path="/create-survey" component={CreateSurvey} />
            <Footer />
        </Router>
    );
}
