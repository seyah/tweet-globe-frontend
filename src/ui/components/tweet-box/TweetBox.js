import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './TweetBox.scss';
import {Image, Media, OverlayTrigger, Tooltip} from "react-bootstrap";

class TweetBox extends Component {
    render() {
        let {text, retweets, favourites, profileImage, user, className, extra} = this.props;

        let formattedText = text.split(' ');
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
            <div className={"tweet-box " + className}>
                <div className="tweet-content">
                    <Media>
                        <Media.Left>
                            <OverlayTrigger placement="top" overlay={<Tooltip>{user}</Tooltip>}>
                                {profileImage !== undefined ?
                                <a href={"http://twitter.com/" + user}><Image src={profileImage} circle /></a>
                                :
                                <i className="fas fa-2x fa-user-circle"/>}
                            </OverlayTrigger>
                        </Media.Left>
                        <Media.Body>
                            <p>{result.map(a => a)}</p>
                        </Media.Body>
                    </Media>
                </div>
                <div className="tweet-footer">
					<span className="retweets">
						<i className="fas fa-exchange-alt"/>
                        {retweets}
					</span>
                    <span className="favourites">
						<i className="fas fa-star"/>
                        {favourites}
					</span>
                    {extra.map(a => {a})}
                </div>
            </div>
        );
    }
}

TweetBox.defaultProps = {
    text: "Some sample text. #Test @Hi",
    retweets: 0,
    favourites: 0,
    profileImage: undefined,
    user: "",
    className: "",
    extra: []
};

TweetBox.propTypes = {
    text: PropTypes.string,
    retweets: PropTypes.number,
    favourites: PropTypes.number,
    profileImage: PropTypes.string,
    user: PropTypes.string,
    className: PropTypes.string,
    extra: PropTypes.array
};

export default TweetBox;
