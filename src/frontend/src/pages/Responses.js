import React, { Component } from "react";
import { connect } from "react-redux";

// actions
import { fetchResponses } from "../actions/index";

// components
import Flex from "../components/utils/Flex";
import Error from "../components/utils/Error";
import Spinner from "../components/utils/Spinner";
import PageTransition from "../components/utils/PageTransition";

const mapStateToProps = state => {
    return {
        responses: state.fetchAllResponsesReducer.responses
    };
};

function mapDispatchToProps(dispatch) {
    return {
        fetchResponses: id => dispatch(fetchResponses(id))
    };
}
class Responses extends Component {
    componentDidMount() {
        this.props.fetchResponses(this.props.match.params.id);
    }
    render() {
        const { responses, isLoading, fetchError } = this.props;
        console.log(responses);
        if (isLoading) {
            return (
                <div className="container">
                    <Spinner />
                </div>
            );
        }

        if (fetchError) {
            return (
                <div className="container">
                    <Flex>
                        <Error error={fetchError} />
                    </Flex>
                </div>
            );
        }
        return (
            <PageTransition>
                <div className="container">
                    <h2>Survey Results</h2>
                    <hr></hr>
                    {responses.length === 0 && (
                        <p>There are no responses to this survey.</p>
                    )}
                    {responses.map(response => (
                        <p>{response.response}</p>
                    ))}
                </div>
            </PageTransition>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Responses);
