import React, { Component } from "react";
import { connect } from "react-redux";
import { checkDates } from "../utils/index";
import GreenClock from "../images/clock-green.svg";
import RedClock from "../images/clock-red.svg";

// actions
import { fetchSurvey } from "../actions/index";
import Flex from "../components/utils/Flex";
import Error from "../components/utils/Error";

const mapStateToProps = state => {
    return {
        survey: state.fetchOneSurveyReducer.survey,
        isLoading: state.fetchOneSurveyReducer.isLoading,
        fetchError: state.fetchOneSurveyReducer.error
    };
};

function mapDispatchToProps(dispatch) {
    return {
        fetchSurvey: id => dispatch(fetchSurvey(id))
    };
}

class Survey extends Component {
    componentDidMount() {
        this.props.fetchSurvey(this.props.match.params.id);
    }
    render() {
        const { survey, isLoading, fetchError } = this.props;
        const { dateText, dateColor } = checkDates(
            survey.open_date,
            survey.close_date
        );

        // name,
        // descrip,
        // creation_date,
        // open_date,
        // close_date,
        // author

        return (
            <div className="container">
                {isLoading && <p>Loading . . . </p>}

                {fetchError ? (
                    <Flex>
                        <Error error={fetchError} />
                    </Flex>
                ) : (
                    <>
                        <Flex>
                            <div style={{flex: "66 0 300px"}}>
                                <h2>{survey.name}</h2>
                            </div>
                            <div style={{flex: "33 0 150px"}}>
                                <p
                                    style={{
                                        fontWeight: 700,
                                        float: "right",
                                        color: dateColor
                                    }}
                                >
                                    <img
                                        src={
                                            dateColor === "green"
                                                ? GreenClock
                                                : RedClock
                                        }
                                        alt="Clock"
                                        style={{
                                            color: dateColor,
                                            width:
                                                "calc(0.8 * var(--text-base-size))",
                                            padding: "0 2px"
                                        }}
                                    />
                                    <small>{dateText}</small>
                                </p>
                            </div>
                        </Flex>

                        {survey.descrip.length > 0 && <p>{survey.descrip}</p>}
                        {survey.author.length > 0 && (
                            <p>
                                Survey Author: <b>{survey.author}</b>
                            </p>
                        )}
                        <hr></hr>
                    </>
                )}
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Survey);
