import React from "react";
import Wave from "../images/wave4.svg";

// components
import { NavLink } from "react-router-dom";
import Button from "./utils/Button";

export default function HomeHero() {
    return (
        <div
            style={{
                background: `url(${Wave})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                marginBottom: "-7%",
                height: "34vh",
                padding: "var(--space-md) 0",
                margin: 0,
                marginTop: "-2vh",
                paddingTop: "calc(2vh + var(--space-xl))",
            }}
        >
            <div className="container" style={{minHeight: "unset"}}>
                <h1 style={{ marginTop: "var(--space-sm)" }}>Open Survey</h1>
                <h6 style={{ margin: 0 }}>
                    An open source tool to create public surveys to share with
                    anyone.
                </h6>
                <NavLink to="/create-survey">
                    <Button
                        theme="primary"
                        style={{ margin: "var(--space-sm) 0" }}
                    >
                        Create Survey
                    </Button>
                </NavLink>
            </div>
        </div>
    );
}
