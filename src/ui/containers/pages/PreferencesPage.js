import React, {Component} from 'react';
import "../../style/pages/PreferencesPage.scss";
import HeaderPage from "../layouts/HeaderPage";
import {connect} from "react-redux";
import {Col, Grid, Label, Row} from "react-bootstrap";
import Slider from "rc-slider";
import 'rc-slider/assets/index.css';
import {getScores, getTrainingTweet, judgeTweet, updateScore} from "../../../reducers/recommender";
import TweetBox from "../../components/tweet-box/TweetBox";
import ActionButton from "../../components/actionButton/ActionButton";

class PreferencesPage extends Component {

    constructor(props) {
        super(props);

        this.updateScore = this.updateScore.bind(this);
    }

    componentWillMount() {
        this.props.dispatch(getTrainingTweet());
    }

    updateScore(score, i) {
        score.score = i;
        this.props.dispatch(updateScore(score, i))
    }

    render() {
        let {recommendations, tweets} = this.props.recommender;

        let mainTweet = tweets[0],
            nextTweet = tweets[1];

        return (
            <HeaderPage>
                <Grid>
                    <Row>
                        <Col xs={12} md={8} mdOffset={2} bsClass="classification col">
                            <h2>Preferences Trainer</h2>
                            <br/>
                            <Row>
                                <Col xs={12} md={12}>
                                    <p>
                                        This page allows you to train your recommendations to your own opinions. The
                                        Sentiment Trainer will present a random assortment of each of the categories to
                                        the right, at which point you will identify one of the following: (1) <span
                                        style={{color: '#ff0100', fontWeight: 600}}>Negative (<i
                                        className="fas fa-thumbs-down"/>)</span> - You dislike this tweet and do not
                                        want
                                        to see more like this. (2) <span style={{color: '#ffbd00', fontWeight: 600}}>No Opinion (<i
                                        className="fas fa-hand-paper"/>)</span> - You neither like nor dislike this
                                        tweet. (3) <span style={{color: '#15af00', fontWeight: 600}}>Positive (<i
                                        className="fas fa-thumbs-up"/>)</span> - You like this tweet and want to see
                                        more
                                        like this.
                                    </p>
                                </Col>
                            </Row>
                            <br/>
                            <Row>
                                <Col xs={12} md={12}>
                                    <div className="tweet-box-container">
                                        {mainTweet !== undefined &&
                                        [<TweetBox text={mainTweet.text}
                                                   retweets={mainTweet['retweetCount']}
                                                   favourites={mainTweet['favoriteCount']}
                                                   profileImage={mainTweet['profileImage']}
                                                   user={mainTweet['user']}
                                                   extra={[<Label bsStyle="primary">{mainTweet['topic']}</Label>]}/>,
                                        ]}
                                    </div>
                                </Col>
                            </Row>
                            <br/>
                            <br/>
                            <Row>
                                <Col xs={6} md={3} style={{textAlign: 'center', display: mainTweet !== undefined && mainTweet['sentiment'] === 'positive' ? 'block' : 'none'}}>
                                    <div style={{display: mainTweet !== undefined && mainTweet['sentiment'] === 'positive' ? 'block' : 'none'}}>
                                        <span className="fas fa-smile fa-6x" style={{color: '#1ad600'}}/>
                                    </div>
                                </Col>
                                <Col xs={6} md={3} style={{textAlign: 'center', display: mainTweet !== undefined && mainTweet['sentiment'] === 'mixed' ? 'block' : 'none'}}>
                                    <div style={{display: mainTweet !== undefined && mainTweet['sentiment'] === 'mixed' ? 'block' : 'none'}}>
                                        <span className="fas fa-meh fa-6x" style={{color: '#ffbd00'}}/>
                                    </div>
                                </Col>
                                <Col xs={6} md={3} style={{textAlign: 'center', display: mainTweet !== undefined && mainTweet['sentiment'] === 'negative' ? 'block' : 'none'}}>
                                    <div style={{display: mainTweet !== undefined && mainTweet['sentiment'] === 'negative' ? 'block' : 'none'}}>
                                        <span className="fas fa-frown fa-6x" style={{color: '#ff0100'}}/>
                                    </div>
                                </Col>
                                <Col xs={6} md={3}>
                                    <ActionButton icon="fas fa-thumbs-down fa-3x" colour={'#ff0100'}
                                                  onClick={() => this.props.dispatch(judgeTweet(mainTweet, -1, mainTweet['sentiment']))}
                                    />
                                </Col>
                                <Col xs={6} md={3}>
                                    <ActionButton icon="fas fa-hand-paper fa-3x" colour={'#ffbd00'}
                                                  onClick={() => this.props.dispatch(judgeTweet(mainTweet, 0, mainTweet['sentiment']))}
                                    />
                                </Col>
                                <Col xs={6} md={3}>
                                    <ActionButton icon="fas fa-thumbs-up fa-3x" colour={'#15af00'}
                                                  onClick={() => this.props.dispatch(judgeTweet(mainTweet, 1, mainTweet['sentiment']))}
                                    />
                                </Col>
                            </Row>
                        </Col>
                        {/*<Col xs={12} md={4} bsClass="preferences col">
                            <h2>Preferences Scale</h2>
                            <br/>
                            <p>
                                These are your preferences scaled by category, from negative (<span
                                className="fa fa-thumbs-down"/>) to neutral (<span className="fa fa-hand-stop-o"/>) to
                                positive (<span className="fa fa-thumbs-up"/>). Changes are saved automatically. In
                                order to view more about a specific category, click the title of the corresponding
                                slider.
                            </p>
                            {recommendations.scores.map(score => {
                                let colour = score.score > 6.5 ? "green" : score.score > 3.5 ? "yellow" : "red";
                                let secondColour = score.score > 6.5 ? "darkgreen" : score.score > 3.5 ? "orange" : "darkred";
                                return <div className="slider">
                                    <span>{score.label}</span>
                                    <Slider min={0} max={10} step={0.1} defaultValue={score.score}
                                            trackStyle={[{backgroundColor: colour}]}
                                            handleStyle={[{
                                                backgroundColor: colour,
                                                border: '2px solid ' + secondColour
                                            }]}
                                            marks={{
                                                0: <span className="fa fa-thumbs-down"/>,
                                                5: <span className="fa fa-hand-stop-o"/>,
                                                10: <span className="fa fa-thumbs-up"/>
                                            }}
                                            onAfterChange={(i) => this.updateScore(score, i)}/>
                                </div>
                            })}
                        </Col>*/}
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
