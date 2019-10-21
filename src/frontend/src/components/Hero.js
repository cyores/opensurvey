import React from "react";
import Wave from "../images/wave4.svg";

// components
import { NavLink } from "react-router-dom";
import Button from "../components/utils/Button";

export default function Hero() {
    return (
        <div
            style={{
                background: `url(${Wave})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                marginBottom: "-16vh",
                height: "34vh",
                padding: "var(--space-md) 0",
                marginTop: "-7vh",
                paddingTop: "calc(7vh + var(--space-xl))",
            }}
        >
            <div className="container" style={{minHeight: "unset"}}>
                <h1 style={{ marginTop: 0 }}>Open Survey</h1>
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
