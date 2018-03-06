import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './TweetBox.scss';
import {Col, Grid, Image, Media, OverlayTrigger, Row, Tooltip} from "react-bootstrap";
import ActionButton from "../actionButton/ActionButton";

class TweetTinyBox extends Component {

    constructor(props) {
        super(props);

        this.state = {
            judged: false,
            action: -2
        };

        this.judgeTweet = this.judgeTweet.bind(this);
    }

    judgeTweet(action) {
        this.setState({
            ...this.state,
            judged: true,
            action: action
        });

        let {tweet} = this.props;
        this.props.judgeTweet(tweet, action);
    }

    render() {
        let {judged} = this.state;
        let {className, extra} = this.props;
        let {text, retweetCount, favoriteCount, profileImage, user, topic, sentiment} = this.props.tweet;
        let formattedText = text.replace("\n", "").split(' ');
        formattedText = formattedText.map((word, index) => {
            if (word.match('#\\w+')) {
                return <a key={index}
                          className="tweet-hashtag"
                          target="_blank"
                          href={"https://twitter.com/hashtag/" + word.replace('#', '')}>{word}</a>
            } else if (word.match('@\\w+')) {
                return <span key={index} className="tweet-mention">{word}</span>
            } else if (word.match('(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9]\.[^\s]{2,})')) {
                return <a key={index}
                          className="tweet-url"
                          target="_blank"
                          href={word}>{word}</a>
            } else {
                return <span key={index}>{word}</span>;
            }
        });

        let result = [];
        for (let i = 0; i < formattedText.length; i++) {
            result = result.concat(formattedText[i], ' ');
        }

        return (
            <div className={"tweet-tiny-box " + className}>
                <Grid fluid className="tweet-content">
                    <Col>
                        <Col xs={12} sm={2} md={1} style={{textAlign: 'center'}}>
                            <OverlayTrigger placement="top" overlay={<Tooltip>{user}</Tooltip>}>
                                {profileImage !== undefined ?
                                    <a href={"http://twitter.com/" + user}><Image src={profileImage} circle/></a>
                                    :
                                    <i className="fas fa-2x fa-user-circle"/>}
                            </OverlayTrigger>
                        </Col>
                        <Col xs={12} sm={11}>
                            <Col>
                                <Col xs={12} sm={8} style={{padding: 0}}>
                                    <p>{result.map(a => a)}</p>
                                </Col>
                                <Col xs={12} sm={2}>
                                    <Col xs={2} sm={6} md={12} style={{textAlign: 'center'}}>
                                            <span className="retweets"><i
                                                className="fas fa-exchange-alt fa-1x"/> {retweetCount}</span>
                                    </Col>
                                    <Col xs={2} sm={6} md={12} style={{textAlign: 'center'}}>
                                        <span className="favourites"><i
                                            className="fas fa-star fa-1x"/> {favoriteCount}</span>
                                    </Col>
                                    {extra.map(a => <Col xs={4} sm={6} md={12} style={{textAlign: 'center'}}>{a}</Col>)}
                                </Col>
                                <br/>
                                <Col xs={12} lg={2}>
                                    <Row>
                                        <Col xs={4} style={{textAlign: 'center'}}>
                                            <ActionButton tiny icon="fas fa-thumbs-down" colour={'#ff0100'} disabled={judged}
                                                onClick={() => this.judgeTweet(-1)}
                                            />
                                        </Col>
                                        <Col xs={4} style={{textAlign: 'center'}}>
                                            <ActionButton tiny icon="fas fa-hand-paper" colour={'#ffbd00'} disabled={judged}
                                                onClick={() => this.judgeTweet(0)}
                                            />
                                        </Col>
                                        <Col xs={4} style={{textAlign: 'center'}}>
                                            <ActionButton tiny icon="fas fa-thumbs-up" colour={'#15af00'} disabled={judged}
                                                onClick={() => this.judgeTweet(1)}
                                            />
                                        </Col>
                                    </Row>
                                </Col>
                            </Col>
                        </Col>
                    </Col>
                </Grid>
            </div>
        );
    }
}

TweetTinyBox.defaultProps = {
    tweet: {},
    className: "",
    sentiment: "",
    extra: [],
    judgeTweet: () => {}
};

TweetTinyBox.propTypes = {
    tweet: PropTypes.object,
    className: PropTypes.string,
    extra: PropTypes.array,
    judgeTweet: PropTypes.func
};

export default TweetTinyBox;
