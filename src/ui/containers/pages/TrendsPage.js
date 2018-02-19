import React, {Component} from 'react';
import PropTypes from 'prop-types';
import "../../style/pages/TrendsPage.scss";
import HeaderPage from "../layouts/HeaderPage";
import {connect} from "react-redux";
import {Col, Grid, Panel, Row} from "react-bootstrap";
import {getTrendData, getTrends} from "../../../reducers/trends";
import {
    Bar,
    BarChart,
    CartesianGrid,
    Cell,
    Label,
    Legend,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip,
    XAxis, YAxis
} from "recharts";

class TrendsPage extends Component {

    constructor(props) {
        super(props);

        this.getTrendData = this.getTrendData.bind(this);

        this.state = {
            trend: ""
        }
    }

    componentWillMount() {
        this.props.dispatch(getTrends());
    }

    getTrendData(trend) {
        this.props.dispatch(getTrendData(trend['query']));
        this.setState({
            ...this.state,
            trend: trend['name']
        });
    }

    render() {
        let {trends, trendData, loadingTrendData} = this.props.trends;

        let sentimentNames, topicNames,
            sentimentData, topicData,
            sentimentAnalysis, topicClassification;
        if (trendData !== undefined && trendData.length > 0) {
            sentimentNames = [...new Set(trendData.map(tweet => tweet['sentiment']['name']))];
            sentimentData = sentimentNames.map(name => {
                return {
                    name: name,
                    value: trendData.filter(tweet => tweet['sentiment']['name'].indexOf(name) > -1).length,
                    colour: name === "positive" ? "#0aac00"
                        : name === "negative" ? "#aa0004"
                            : "#e6b000"
                }
            });

            topicNames = [...new Set(trendData.map(tweet => tweet['topic']['name']))];
            topicData = topicNames.map(name => {
                return {
                    name: name,
                    value: trendData.filter(tweet => tweet['topic']['name'].indexOf(name) > -1).length,
                    colour: name === "business" ? "#0024a5"
                        : name === "politics" ? "#00b6cc"
                            : name === "entertainment" ? "#ff9c00"
                                : name === "sport" ? "#18bc00"
                                    : name === "tech" ? "#bf0076"
                                        : "#000"
                }
            });

            sentimentAnalysis = [];
            sentimentNames.forEach(name => {
                let filteredData = trendData.filter(tweet => tweet['sentiment']['name'] === name);
                sentimentAnalysis[name.toUpperCase()] = (topicNames.map(nameB => {
                    return {
                        name: nameB,
                        value: filteredData.filter(tweet => tweet['topic']['name'].indexOf(nameB) > -1).length,
                        colour: nameB === "business" ? "#0024a5"
                            : nameB === "politics" ? "#00b6cc"
                                : nameB === "entertainment" ? "#ff9c00"
                                    : nameB === "sport" ? "#18bc00"
                                        : nameB === "tech" ? "#bf0076"
                                            : "#000"
                    }
                }));
            });

            topicClassification = [];
            topicNames.forEach(name => {
                let filteredData = trendData.filter(tweet => tweet['topic']['name'] === name);
                topicClassification[name.toUpperCase()] = (sentimentNames.map(nameB => {
                    return {
                        name: nameB,
                        value: filteredData.filter(tweet => tweet['sentiment']['name'].indexOf(nameB) > -1).length,
                        colour: nameB === "positive" ? "#0aac00"
                            : nameB === "negative" ? "#aa0004"
                                : "#e6b000"
                    }
                }));
            });
        }

        return (
            <HeaderPage>
                <Grid fluid>
                    <Row>
                        <Col xs={12} md={4} lg={3}>
                            <div className="trends">
                                <h2>Trending Tweets</h2>
                                <div className="trends-list">
                                    {trends.map(trend =>
                                        <span key={trend['name']} className="trend"
                                              onClick={() => this.getTrendData(trend)}>{trend['name']}</span>
                                    )}
                                </div>
                            </div>
                        </Col>
                        <Col xs={12} md={8} lg={9}>
                            <div
                                className={"trend-data" + (loadingTrendData === undefined || loadingTrendData ? " empty" : "")}>
                                <h2>Trend Statistics</h2>
                                {loadingTrendData === undefined &&
                                <div className="empty-box"><p>Select a trend on the left.</p></div>}
                                {loadingTrendData === true &&
                                <div className="empty-box"><i className="fa fa-5x fa-spin fa-cog"/></div>}
                                {(trendData !== undefined && trendData.length > 0) &&
                                <Grid fluid>
                                    <Row>
                                        <Col xs={12} style={{textAlign: 'center'}}>
                                            <p>
                                                <a href="#trend-summary">Trend Summary</a> | <a href="#trend-sentiment">Sentiment
                                                Analysis</a> | <a href="#trend-topic">Topic Classification</a> | <a
                                                href="#trend-tweets">Tweets Analysis</a>
                                            </p>
                                            <p>
                                                This document breaks down the 500 most recent tweets based on
                                                the selected or searched term. It provides a high level summary of
                                                sentiment analysis and topic classification, with a further breakdown
                                                available for each tweet used in the analysis. The content of each tweet
                                                is viewed at the user's discretion.
                                            </p>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <h3 id="trend-summary">Summary</h3>
                                    </Row>
                                    <Row>
                                        <Col xs={12} style={{textAlign: 'center'}}>
                                            <p><span className="bold">Search Term:</span> {this.state.trend}</p>
                                            <p><span className="bold">No. of Tweets:</span> {trendData.length}</p>
                                            <p><span
                                                className="bold">Search Time:</span> {new Date().toLocaleTimeString()} {new Date().toDateString()}
                                            </p>
                                        </Col>
                                    </Row>
                                    <br/>
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
                                    </Row>
                                    <br/>
                                    <Row>
                                        <h3 id="trend-sentiment">Sentiment Analysis</h3>
                                    </Row>
                                    <Row>
                                        <Col xs={12} style={{textAlign: 'center'}}>
                                            <p>Sentiment Analysis is the process of identifying an opinion with text.
                                                This report identifies either a positive, negative, or mixed/neutral
                                                sentiment. Importantly, this analysis is context-free but not bias-free.
                                                The training data for this model is built upon a collection of opinions
                                                as per the nature of the analysis.</p>
                                        </Col>
                                    </Row>
                                    <br/>
                                    <Row>
                                        {sentimentNames.map(name => {
                                            let data = sentimentAnalysis[name.toUpperCase()];
                                            return <Col xs={12} md={4}>
                                                <h4 style={{textAlign: "center"}}>{name.toUpperCase()}</h4>
                                                <ResponsiveContainer width="100%" height={400}>
                                                    <PieChart>
                                                        <Legend verticalAlign="top" height={36}/>
                                                        <Pie isAnimationActive={true} data={data}
                                                             margin={{top: 0, bottom: 0, left: 0, right: 0}}
                                                             innerRadius={50} outerRadius={120} fill="#8884d8" label>
                                                            {data.map((entry, index) => {
                                                                return <Cell dataKey={name + '-cell-' + index}
                                                                             fill={entry['colour']}/>
                                                            })}
                                                        </Pie>
                                                        <Tooltip/>
                                                    </PieChart>
                                                </ResponsiveContainer>
                                            </Col>
                                        })}
                                    </Row>
                                    <br/>
                                    <Row>
                                        <h3 id="trend-topic">Topic Classification</h3>
                                    </Row>
                                    <Row>
                                        <Col xs={12} style={{textAlign: 'center'}}>
                                            <p>Topic Classification is the process of identifying common themes within a
                                                document, or a piece of text. These themes are then labelled. The labels
                                                used in this model are Business, Politics, Entertainment, Sport, and
                                                Tech, and are extracted from a collection of news articles.</p>
                                        </Col>
                                    </Row>
                                    <br/>
                                    <Row>
                                        {topicNames.map(name => {
                                            let data = topicClassification[name.toUpperCase()];
                                            return <Col xs={12} md={4}>
                                                <h4 style={{textAlign: "center"}}>{name.toUpperCase()}</h4>
                                                <ResponsiveContainer width="100%" height={400}>
                                                    <PieChart>
                                                        <Legend verticalAlign="top" height={36}/>
                                                        <Pie isAnimationActive={true} data={data}
                                                             margin={{top: 0, bottom: 0, left: 0, right: 0}}
                                                             innerRadius={50} outerRadius={120} fill="#8884d8" label>
                                                            {data.map((entry, index) => {
                                                                return <Cell dataKey={name + '-cell-' + index}
                                                                             fill={entry['colour']}/>
                                                            })}
                                                        </Pie>
                                                        <Tooltip/>
                                                    </PieChart>
                                                </ResponsiveContainer>
                                            </Col>
                                        })}
                                    </Row>
                                    <br/>
                                    <Row>
                                        <h3 id="trend-tweets">Tweet Analysis</h3>
                                    </Row>
                                    <Row>
                                        <Col xs={12} style={{textAlign: 'center'}}>
                                            <p>This section provides a break down of each of the tweets and the
                                                appropriate statistics associated with them.</p>
                                        </Col>
                                    </Row>
                                    <br/>
                                    <Row>
                                        {trendData.sort((a, b) => b['sentiment']['name']
                                            .localeCompare(a['sentiment']['name']))
                                            .map((tweet, index) => {
                                                let topicStatistics = Object.keys(tweet['topic']['predictions']).map(topic => {
                                                    return {
                                                        name: topic,
                                                        amt: tweet['topic']['predictions'][topic],
                                                        topic: tweet['topic']['predictions'][topic]
                                                    }
                                                });
                                                let sentimentStatistics = Object.keys(tweet['sentiment']['predictions']).map(sentiment => {
                                                    return {
                                                        name: sentiment,
                                                        amt: tweet['sentiment']['predictions'][sentiment],
                                                        sentiment: tweet['sentiment']['predictions'][sentiment]
                                                    }
                                                });

                                                return <Col xs={12} md={6}>
                                                    <Panel key={index}
                                                           bsStyle={tweet['sentiment']['name'] === 'positive'
                                                               ? 'success' : tweet['sentiment']['name'] === 'negative'
                                                                   ? 'danger' : 'warning'}>
                                                        <Panel.Heading>
                                                            <Panel.Title>Tweet {index + 1}</Panel.Title>
                                                            <Panel.Toggle>
                                                                <small> Toggle</small>
                                                            </Panel.Toggle>
                                                        </Panel.Heading>
                                                        <Panel.Collapse>
                                                            <Panel.Body>
                                                                <p>
                                                            <span className="bold">
                                                                @{tweet['user']}:
                                                            </span>
                                                                    {tweet['text']}
                                                                </p>
                                                                <ResponsiveContainer width="100%" height={200}>
                                                                    <BarChart data={topicStatistics}>
                                                                        <CartesianGrid strokeDasharray="3 3"/>
                                                                        <XAxis dataKey="name"/>
                                                                        <YAxis/>
                                                                        <Tooltip/>
                                                                        <Legend/>
                                                                        <Bar dataKey="topic" fill="#00b6cc"/>
                                                                    </BarChart>
                                                                </ResponsiveContainer>

                                                                <ResponsiveContainer width="100%" height={200}>
                                                                    <BarChart data={sentimentStatistics}>
                                                                        <CartesianGrid strokeDasharray="3 3"/>
                                                                        <XAxis dataKey="name"/>
                                                                        <YAxis/>
                                                                        <Tooltip/>
                                                                        <Legend/>
                                                                        <Bar dataKey="sentiment" fill="#ff9c00"/>
                                                                    </BarChart>
                                                                </ResponsiveContainer>
                                                            </Panel.Body>
                                                        </Panel.Collapse>
                                                    </Panel>

                                                </Col>
                                            })}
                                    </Row>
                                </Grid>
                                }
                            </div>
                        </Col>
                    </Row>
                </Grid>
            </HeaderPage>
        );
    }
}

TrendsPage.defaultProps = {
    trends: {},
};

TrendsPage.propTypes = {
    trends: PropTypes.object
};

let mapStateToProps = (state) => {
    return {
        trends: state.trends
    }
};

export default connect(mapStateToProps)(TrendsPage);
