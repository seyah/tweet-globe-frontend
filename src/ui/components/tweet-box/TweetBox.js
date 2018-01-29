import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './TweetBox.scss';
import {Media} from "react-bootstrap";

class TweetBox extends Component {
    render() {
        let {text, retweets, favourites, className} = this.props;

        let formattedText = text.split(' ');
        formattedText = formattedText.map((word, index) => {
            if (word.match('#\\w+')) {
                return <a key={index}
                          className="tweet-hashtag"
                          target="_blank"
                          href={"https://twitter.com/hashtag/" + word.replace('#', '')}>{word}</a>
            } else if (word.match('@\\w+')) {
                return <span key={index} className="tweet-mention">{word}</span>
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
                            <i className="fa fa-2x fa-user-circle" />
                        </Media.Left>
                        <Media.Body>
                            <p>{result.map(a => a)}</p>
                        </Media.Body>
                    </Media>
                </div>
                <div className="tweet-footer">
					<span className="retweets">
						<i className="fa fa-exchange"/>
                        {retweets}
					</span>
                    <span className="favourites">
						<i className="fa fa-star"/>
                        {favourites}
					</span>
                </div>
            </div>
        );
    }
}

TweetBox.defaultProps = {
    text: "Some sample text. #Test @Hi",
    retweets: 0,
    favourites: 0,
    className: ""
};

TweetBox.propTypes = {
    text: PropTypes.string,
    retweets: PropTypes.number,
    favourites: PropTypes.number,
    className: PropTypes.string
};

export default TweetBox;
