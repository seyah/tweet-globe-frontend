import React, {Component} from 'react';
import "../../style/pages/JudgerPage.scss";
import HeaderPage from "../layouts/HeaderPage";
import ActionButton from "../../components/actionButton/ActionButton";
import TweetBox from "../../components/tweet-box/TweetBox";
import {connect} from "react-redux";
import {getTweets, judgeTweet} from "../../../reducers/twitter";

class JudgerPage extends Component {

    componentWillMount() {
        this.props.dispatch(getTweets(2));
    }

    render() {

        let {training} = this.props.twitter;

        let mainTweet = training.tweets[0],
            nextTweet = training.tweets[1];

        return (
            <HeaderPage>
                <div className="content judger">
                    <div className="sidebar">
                        <h1 className="text text-primary">History</h1>
                        <div className="archive">
                            {training.archive.sort((a, b) => b.judged - a.judged).map((tweet, index) => {
                                return <div key={index} className={"archive-tweet " + tweet.judgement.toLowerCase()}>
                                    <span>
                                        {tweet.text}
                                    </span>
                                </div>
                            })}
                        </div>
                    </div>
                    <div className="panel">
                        <div className="emotion-container">
                            <div className="tweet-view">
                                <div className="tweet-box-preview">
                                    {nextTweet !== undefined &&
                                    <TweetBox text={nextTweet.text}
                                              retweets={nextTweet.retweetCount}
                                              favourites={nextTweet.favoriteCount}/>}
                                </div>
                                <div className={"tweet-box-container " + (training.sendingMain ? "sending" : "")}>
                                    {mainTweet !== undefined &&
                                    <TweetBox text={mainTweet.text}
                                              retweets={mainTweet.retweetCount}
                                              favourites={mainTweet.favoriteCount}
                                              className={training.slidingMain ? "done" : ""}/>}
                                </div>
                            </div>
                            <div className="emotion-controls">
                                <ActionButton icon="fa-thumbs-down fa-3x" colour={'#af0100'}
                                              onClick={() => this.props.dispatch(judgeTweet(mainTweet, 'HATE'))}/>
                                <ActionButton icon="fa-hand-stop-o fa-3x" colour={'#af7d00'}
                                              onClick={() => this.props.dispatch(judgeTweet(mainTweet, 'EMPTY'))}/>
                                <ActionButton icon="fa-thumbs-up fa-3x" colour={'#15af00'}
                                              onClick={() => this.props.dispatch(judgeTweet(mainTweet, 'LOVE'))}/>
                                <ActionButton icon="fa-times fa-3x" colour={'#0100af'}
                                              onClick={() => this.props.dispatch(judgeTweet(mainTweet, 'NONE'))}/>
                            </div>
                        </div>
                    </div>
                </div>
            </HeaderPage>
        );
    }
}

JudgerPage.propTypes = {};

let mapStateToProps = (state) => {
    return {
        twitter: state.twitter
    }
};

export default connect(mapStateToProps)(JudgerPage);
