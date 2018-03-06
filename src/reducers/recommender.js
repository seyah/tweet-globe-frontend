const JUDGE_TWEET = 'recommender/JUDGE_TWEET';
const JUDGE_TWEET_SUCCESS = 'recommender/JUDGE_TWEET_SUCCESS';
const JUDGE_TWEET_FAIL = 'recommender/JUDGE_TWEET_FAIL';

const JUDGE_TWEET_EXTERNAL = 'recommender/JUDGE_TWEET_EXTERNAL';
const JUDGE_TWEET_EXTERNAL_SUCCESS = 'recommender/JUDGE_TWEET_EXTERNAL_SUCCESS';
const JUDGE_TWEET_EXTERNAL_FAIL = 'recommender/JUDGE_TWEET_EXTERNAL_FAIL';

const GET_TRAINING_TWEETS = 'recommender/GET_TRAINING_TWEETS';
const GET_TRAINING_TWEETS_SUCCESS = 'recommender/GET_TRAINING_TWEETS_SUCCESS';
const GET_TRAINING_TWEETS_FAIL = 'recommender/GET_TRAINING_TWEETS_FAIL';

const GET_RECOMMENDED_TWEETS = 'recommender/GET_RECOMMENDED_TWEETS';
const GET_RECOMMENDED_TWEETS_SUCCESS = 'recommender/GET_RECOMMENDED_TWEETS_SUCCESS';
const GET_RECOMMENDED_TWEETS_FAIL = 'recommender/GET_RECOMMENDED_TWEETS_FAIL';

const GET_RECOMMENDED_TWEETS_RECENT = 'recommender/GET_RECOMMENDED_TWEETS_RECENT';
const GET_RECOMMENDED_TWEETS_RECENT_SUCCESS = 'recommender/GET_RECOMMENDED_TWEETS_RECENT_SUCCESS';
const GET_RECOMMENDED_TWEETS_RECENT_FAIL = 'recommender/GET_RECOMMENDED_TWEETS_RECENT_FAIL';

const initialState = {
    tweets: [],
    recommendations: {
        recent: [],
        popular: [],
        trends: []
    }
};

// reducer

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case JUDGE_TWEET:
            return {
                ...state,
                tweets: state.tweets.slice(1)
            };
        case GET_TRAINING_TWEETS:
            return state;
        case GET_TRAINING_TWEETS_SUCCESS:
            return {
                ...state,
                tweets: state.tweets.concat(action.result.data)
            };
        case GET_RECOMMENDED_TWEETS_SUCCESS:
            return {
                ...state,
                recommendations: {
                    ...state.recommendations,
                    popular: action.result.data
                }
            };
        case GET_RECOMMENDED_TWEETS_RECENT_SUCCESS:
            return {
                ...state,
                recommendations: {
                    ...state.recommendations,
                    recent: action.result.data
                }
            };
        default:
            return state;
    }
}

export function judgeTweet(tweet, x, y) {
    return {
        types: [JUDGE_TWEET, JUDGE_TWEET_SUCCESS, JUDGE_TWEET_FAIL],
        promise: client => client.put('/api/recommender/judgement', {
            tweet: tweet['text'],
            judgement: x,
            sentiment: y
        }),
        afterSuccess: (dispatch, getState, response) => {
            if (getState().recommender.tweets.length < 5) {
                dispatch(getTrainingTweet());
            }
        },
        afterFailure: (dispatch, getState, error) => {
        }
    };
}

export function judgeTweetExternal(tweet, x) {
    return {
        types: [JUDGE_TWEET_EXTERNAL, JUDGE_TWEET_EXTERNAL_SUCCESS, JUDGE_TWEET_EXTERNAL_FAIL],
        promise: client => client.put('/api/recommender/judgement', {
            tweet: tweet['text'],
            judgement: x,
            sentiment: tweet['sentiment']
        }),
        afterSuccess: (dispatch, getState, response) => {
        },
        afterFailure: (dispatch, getState, error) => {
        }
    };
}

export function getTrainingTweet() {
    return {
        types: [GET_TRAINING_TWEETS, GET_TRAINING_TWEETS_SUCCESS, GET_TRAINING_TWEETS_FAIL],
        promise: client => client.get('/api/recommender/training_tweet'),
        afterSuccess: (dispatch, getState, response) => {
        },
        afterFailure: (dispatch, getState, error) => {
        }
    };
}

export function getRecommendedTweets(recent) {
    return {
        types: recent ? [GET_RECOMMENDED_TWEETS_RECENT, GET_RECOMMENDED_TWEETS_RECENT_SUCCESS, GET_RECOMMENDED_TWEETS_RECENT_FAIL] : [GET_RECOMMENDED_TWEETS, GET_RECOMMENDED_TWEETS_SUCCESS, GET_RECOMMENDED_TWEETS_FAIL],
        promise: client => client.get('/api/recommender/recommendations', {
            params: {
                recent: recent
            }
        }),
        afterSuccess: (dispatch, getState, response) => {
        },
        afterFailure: (dispatch, getState, error) => {
        }
    };
}