import React, {Component} from 'react';
import "../../style/pages/TrendsPage.scss";
import HeaderPage from "../layouts/HeaderPage";
import {connect} from "react-redux";
import {Col, Grid, Row} from "react-bootstrap";
import {getTrendData, getTrends} from "../../../reducers/trends";
import {Pie, PieChart, Tooltip} from "recharts";

class TrendsPage extends Component {

    constructor(props) {
        super(props);

        this.getTrendData = this.getTrendData.bind(this);
    }

    componentWillMount() {
        this.props.dispatch(getTrends());
    }

    getTrendData(trend) {
        this.props.dispatch(getTrendData(trend))
    }

    render() {
        let {trends, trendData, loadingTrendData} = this.props.trends;

        let sentimentData;
        if (trendData !== undefined && trendData.length > 0) {
            let names = [...new Set(trendData.map(tweet => tweet.sentiment.name))];
            sentimentData = names.map(name => {
                return {
                    name: name,
                    value: trendData.filter(tweet => tweet.sentiment.name.indexOf(name) > -1).length
                }
            })
        }

        const data01 = [{name: 'Group A', value: 400}, {name: 'Group B', value: 300},
            {name: 'Group C', value: 300}, {name: 'Group D', value: 200},
            {name: 'Group E', value: 278}, {name: 'Group F', value: 189}]

        const data02 = [{name: 'Group A', value: 2400}, {name: 'Group B', value: 4567},
            {name: 'Group C', value: 1398}, {name: 'Group D', value: 9800},
            {name: 'Group E', value: 3908}, {name: 'Group F', value: 4800}];

        return (
            <HeaderPage>
                <Grid fluid>
                    <Row>
                        <Col xs={12} md={3} lg={2}>
                            <div className="trends">
                                <h2>Trends</h2>
                                {trends.map(trend =>
                                    <span key={trend['name']} className="trend"
                                          onClick={() => this.getTrendData(trend['query'])}>{trend['name']}</span>
                                )}
                            </div>
                        </Col>
                        <Col xs={12} md={9} lg={10}>
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
                                        <h3>Summary</h3>
                                        <div className="summary">
                                            <PieChart width={800} height={400}>
                                                <Pie isAnimationActive={false} data={sentimentData} cx={200} cy={200}
                                                     outerRadius={80} fill="#8884d8" label/>
                                                <Pie data={data02} cx={500} cy={200} innerRadius={40} outerRadius={80}
                                                     fill="#82ca9d"/>
                                                <Tooltip/>
                                            </PieChart>
                                        </div>
                                    </Row>
                                    <Row>

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

TrendsPage.propTypes = {
    trends: [],

};

let mapStateToProps = (state) => {
    return {
        trends: state.trends
    }
};

export default connect(mapStateToProps)(TrendsPage);
