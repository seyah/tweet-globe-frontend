import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './TweetBox.scss';

class TweetBox extends Component {
	render() {
		let {text, retweets, favourites} = this.props;

		let formattedText = text.split(' ');
		formattedText = formattedText.map(word => {
			if(word.match('#\\w+')) {
				return <a className="tweet-hashtag"
                          target="_blank"
                          href={"https://twitter.com/hashtag/" + word.replace('#', '')}>{word}</a>
			} else if (word.match('@\\w+')) {
				return <span className="tweet-mention">{word}</span>
			} else {
				return word;
			}
		});

		let result = [];
        for (let i = 0; i < formattedText.length; i++) {
            result = result.concat(formattedText[i], ' ');
        }

		return (
			<div className="tweet-box">
				<div className="tweet-content">
                    <p>
					    {result.map(a => a)}
                    </p>
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
	favourites: 0
};

TweetBox.propTypes = {
	text: PropTypes.string,
	retweets: PropTypes.number,
	favourites: PropTypes.number,
};

export default TweetBox;
