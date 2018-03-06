import React, {Component} from 'react';
import "../../style/pages/RecommenderPage.scss";
import HeaderPage from "../layouts/HeaderPage";
import {connect} from "react-redux";
import {Clearfix, Col, Grid, Label, Row} from "react-bootstrap";
import {getRecommendedTweets, judgeTweet, judgeTweetExternal} from "../../../reducers/recommender";
import TweetBox from "../../components/tweet-box/TweetBox";
import TweetTinyBox from "../../components/tweet-box/TweetTinyBox";

class RecommenderPage extends Component {

    constructor(props) {
        super(props);

        this.judgeTweet = this.judgeTweet.bind(this);
    }

    componentDidMount() {
        console.log("hi");
        this.props.dispatch(getRecommendedTweets(true));
        this.props.dispatch(getRecommendedTweets(false));
    }

    judgeTweet(tweet, action) {
        this.props.dispatch(judgeTweetExternal(tweet, action))
    }

    componentWillUnmount() {
        console.log("bye")
    }

    render() {
        let {popular, recent} = this.props.recommendations;

        return (
            <HeaderPage>
                <Grid fluid className="recommender">
                    <Row>
                        <Col xs={12}>
                            <Row className="popular row">
                                <h3>Popular tweets you might like...</h3>
                                {popular.map(tweet =>
                                    <Col xs={12} md={6}>
                                        <TweetTinyBox tweet={tweet}
                                                      extra={[<Label
                                                          bsStyle="primary">{tweet['topic'].substring(0, 9)}</Label>,
                                                          <Label bsStyle="primary">{tweet['sentiment']}</Label>]}
                                                      judgeTweet={this.judgeTweet}/>
                                    </Col>
                                )}
                            </Row>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12}>

                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12}>
                            <div className="recent">
                                <h3>Recent tweets you might like...</h3>
                                {recent.map(tweet =>
                                    <Col xs={12} md={6}>
                                        <TweetTinyBox tweet={tweet}
                                                      extra={[<Label
                                                          bsStyle="primary">{tweet['topic'].substring(0, 9)}</Label>,
                                                          <Label bsStyle="primary">{tweet['sentiment']}</Label>]}
                                                      judgeTweet={this.judgeTweet}/>
                                    </Col>
                                )}
                            </div>
                        </Col>
                    </Row>
                </Grid>
            </HeaderPage>
        );
    }
}

RecommenderPage.defaultProps = {
    data: {},
};

let mapStateToProps = (state) => {
    return {
        recommendations: state.recommender.recommendations
    }
};

export default connect(mapStateToProps)(RecommenderPage);
