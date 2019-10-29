import React, { Component } from "react";

class Survey extends Component {
    state = {};
    render() {
        return (
            <>
                <p>survey page {this.props.match.params.id}</p>
            </>
        );
    }
}

export default Survey;
