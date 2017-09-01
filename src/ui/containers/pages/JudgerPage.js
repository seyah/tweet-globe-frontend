import React, {Component} from 'react';
import "../../style/pages/JudgerPage.scss";
import BorderlessPage from "../layouts/BorderlessPage";
import ActionButton from "../../components/actionButton/ActionButton";
import TweetBox from "../../components/tweet-box/TweetBox";
import {connect} from "react-redux";
import {getTweets} from "../../../reducers/twitter";

class JudgerPage extends Component {

    render() {
        return (
            <BorderlessPage>
                <div className="content judger">
                    <div className="sidebar">
                        <h1 className="text text-primary">
                            tttt ttt
                        </h1>
                    </div>
                    <div className="panel">
                        <div className="emotion-container">
                            <div className="tweet-view">
                                <div className="tweet-box-preview">
                                    <TweetBox/>
                                </div>
                                <div className="tweet-box-container">
                                    <TweetBox/>
                                </div>
                            </div>
                            <div className="emotion-controls">
                                <ActionButton icon="fa-thumbs-down fa-3x" colour={'#af0100'}/>
                                <ActionButton icon="fa-hand-stop-o fa-3x" colour={'#af7d00'}/>
                                <ActionButton icon="fa-thumbs-up fa-3x" colour={'#15af00'}/>
                                <ActionButton icon="fa-thumbs-up fa-3x" colour={'#0100af'} onClick={() => this.props.dispatch(getTweets())}/>
                            </div>
                        </div>
                    </div>
                </div>
            </BorderlessPage>
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
