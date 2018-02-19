import React, {Component} from 'react';
import "../../style/pages/UserAnalysisPage.scss";
import HeaderPage from "../layouts/HeaderPage";
import {connect} from "react-redux";
import {Button, Col, Grid, Row} from "react-bootstrap";
import {Field, reduxForm} from "redux-form";
import {getUserTweets} from "../../../reducers/twitter";
import {Cell, Label, Legend, Pie, PieChart, ResponsiveContainer, Tooltip} from "recharts";

class UserAnalysisPage extends Component {

    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = {
            name: ''
        }
    }

    handleSubmit(formProps) {
        this.props.dispatch(getUserTweets(formProps.user));
        this.setState({
            ...this.state,
            name: formProps.user
        });
    }

    render() {
        let {userData, loadingUserData} = this.props.data;

        let sentimentData, topicData;
        if (userData.length > 1) {
            sentimentData = Object.keys(userData[0]).map(a => {
                return {
                    name: a,
                    value: userData[0][a],
                    colour: a === "positive" ? "#0aac00"
                        : a === "negative" ? "#aa0004"
                            : "#e6b000"
                }
            });

            topicData = Object.keys(userData[1]).map(a => {
                return {
                    name: a,
                    value: userData[1][a],
                    colour: a === "business" ? "#0024a5"
                        : a === "politics" ? "#00b6cc"
                            : a === "entertainment" ? "#ff9c00"
                                : a === "sport" ? "#18bc00"
                                    : a === "tech" ? "#bf0076"
                                        : "#000"
                }
            })
        }

        return (
            <HeaderPage>
                <Grid className="user-analysis">
                    <Row>
                        <Col xs={12}>
                            <h2>User Profile Analysis</h2>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12} md={8} mdOffset={2}>
                            <p>This page allows you to load a public user profile and view their most recent 2000 tweets
                                and perform an analysis on them.</p>
                        </Col>
                    </Row>
                    <Row>
                        <UserSearchForm onSubmit={this.handleSubmit}/>
                    </Row>
                    <br/>
                    {loadingUserData &&
                    <Row>
                        <Col xs={12}>
                            <i className="fa fa-5x fa-spin fa-cog" style={{textAlign: "center", width: "100%"}}/>
                        </Col>
                    </Row>}
                    {userData !== undefined && userData.length > 1 &&
                    [<Row>
                        <Col xs={12} md={4} mdOffset={4}>
                            <h3>Screen Name: {this.state.name}</h3>
                        </Col>
                    </Row>,
                        <Row>
                            <Col xs={12} md={10} mdOffset={1}>

                            </Col>
                        </Row>,
                        <Row>
                            <Col xs={12} md={4} mdOffset={2}>
                                <h4 style={{textAlign: "center"}}>Sentiment Analysis</h4>
                                <ResponsiveContainer width="100%" height={400}>
                                    <PieChart>
                                        <Legend verticalAlign="top" height={36}/>
                                        <Pie isAnimationActive={true} data={sentimentData}
                                             margin={{top: 0, bottom: 0, left: 0, right: 0}}
                                             innerRadius={50} outerRadius={120} fill="#8884d8" label>
                                            {sentimentData.map((entry, index) => {
                                                return <Cell dataKey={'sentiment-cell-' + index}
                                                             fill={entry['colour']}/>
                                            })}
                                            <Label content="any text" position="top"/>
                                        </Pie>
                                        <Tooltip/>
                                    </PieChart>
                                </ResponsiveContainer>
                            </Col>
                            <Col xs={12} md={4}>
                                <h4 style={{textAlign: "center"}}>Topic Classification</h4>
                                <ResponsiveContainer width="100%" height={400}>
                                    <PieChart>
                                        <Legend verticalAlign="top" height={36}/>
                                        <Pie isAnimationActive={true} data={topicData}
                                             margin={{top: 0, bottom: 0, left: 0, right: 0}}
                                             innerRadius={50} outerRadius={120} fill="#8884d8" label>
                                            {topicData.map((entry, index) => {
                                                return <Cell dataKey={'topic-cell-' + index}
                                                             fill={entry['colour']}/>
                                            })}
                                        </Pie>
                                        <Tooltip/>
                                    </PieChart>
                                </ResponsiveContainer>
                            </Col>
                        </Row>]}
                </Grid>
            </HeaderPage>
        );
    }
}

let UserSearchForm = props => {
    // eslint-disable-next-line react/prop-types
    const {pristine, submitting, handleSubmit} = props;

    return (
        <form onSubmit={handleSubmit}>
            <Col xs={12} md={4} mdOffset={3}>
                <div className="field">
                    <Field name="user" component="input" type="text" placeholder="@User"/>
                </div>
            </Col>
            <Col xs={12} md={2}>
                <Button bsStyle="primary" disabled={pristine || submitting} onClick={handleSubmit}>
                    Submit
                </Button>
            </Col>
        </form>
    );
};

UserSearchForm = reduxForm({
    form: 'user-search'
})(UserSearchForm);

UserAnalysisPage.defaultProps = {
    data: {},
};

let mapStateToProps = (state) => {
    return {
        data: state.twitter
    }
};

export default connect(mapStateToProps)(UserAnalysisPage);
