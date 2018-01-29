import React, {Component} from 'react';
import "../../style/pages/PreferencesPage.scss";
import HeaderPage from "../layouts/HeaderPage";
import {connect} from "react-redux";
import {Col, Grid, Row} from "react-bootstrap";
import Slider from "rc-slider";
import 'rc-slider/assets/index.css';
import {getScores} from "../../../reducers/recommender";

class PreferencesPage extends Component {

    componentWillMount() {
        this.props.dispatch(getScores());
    }

    render() {
        let { scores } = this.props.recommender.recommendations;

        return (
            <HeaderPage>
                <Grid fluid>
                    <Row>
                        <Col xs={12} md={3}>
                            <h3>Preferences Scale</h3>
                            {scores.map(score => <div className="slider">
                                <span>{score.label}</span>
                                <Slider min={-1} max={1} step={0.01} defaultValue={score.score}/>
                            </div>)}
                        </Col>
                        <Col xs={12} md={9}>

                        </Col>
                    </Row>
                </Grid>
            </HeaderPage>
        );
    }
}

PreferencesPage.propTypes = {
    scores: []
};

let mapStateToProps = (state) => {
    return {
        recommender: state.recommender
    }
};

export default connect(mapStateToProps)(PreferencesPage);
