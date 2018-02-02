import React, {Component} from 'react';
import "../../style/pages/TrendsPage.scss";
import HeaderPage from "../layouts/HeaderPage";
import {connect} from "react-redux";
import {Col, Grid, Row} from "react-bootstrap";
import {getTrendData, getTrends} from "../../../reducers/trends";

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
                                {trendData !== undefined && trendData}
                                <Row>
                                    <h3>Summary</h3>
                                    <div className="summary">

                                    </div>
                                </Row>
                            </div>
                        </Col>
                    </Row>
                </Grid>
            </HeaderPage>
        );
    }
}

TrendsPage.propTypes = {
    trends: []
};

let mapStateToProps = (state) => {
    return {
        trends: state.trends
    }
};

export default connect(mapStateToProps)(TrendsPage);
