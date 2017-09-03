const GET_TRAINING_TWEETS = 'twitter/GET_TRAINING_TWEETS';
const GET_TRAINING_TWEETS_SUCCESS = 'twitter/GET_TRAINING_TWEETS_SUCCESS';
const GET_TRAINING_TWEETS_FAIL = 'twitter/GET_TRAINING_TWEETS_FAIL';

const JUDGE_TRAINING_TWEET = 'twitter/JUDGE_TRAINING_TWEET';
const JUDGE_TRAINING_TWEET_SUCCESS = 'twitter/JUDGE_TRAINING_TWEET_SUCCESS';
const JUDGE_TRAINING_TWEET_FAIL = 'twitter/JUDGE_TRAINING_TWEET_FAIL';
const UPDATE_JUDGEMENT = 'twitter/UPDATE_JUDGEMENT';

const MESSAGE = 'authentication/MESSAGE';
const ERROR_MESSAGE = 'authentication/ERROR_MESSAGE';

const initialState = {
    training: {
        slidingMain: false,
        sendingMain: false,
        lastJudgement: 'NONE',
        tweets: [],
        archive: []
    }
};

// reducer

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_TRAINING_TWEETS:
            return {
                ...state,
                training: {
                    ...state.training,
                    slidingMain: true
                }
            };
        case GET_TRAINING_TWEETS_SUCCESS:
            let archive = state.training.archive;

            if(state.training.tweets.length >= 1) {
                archive = [...state.training.archive, {...state.training.tweets[0], judgement: state.training.lastJudgement, judged: new Date().getTime()}]
            }
            if(archive.length > 25) {
                archive = archive.splice(1);
            }
            return {
                ...state,
                training: {
                    ...state.training,
                    slidingMain: false,
                    sendingMain: false,
                    tweets: action.result.data.length > 1 ? action.result.data
                        : [state.training.tweets[1], ...action.result.data],
                    archive: archive,
                }
            };
        case JUDGE_TRAINING_TWEET:
            return {
                ...state,
                training: {
                    ...state.training,
                    sendingMain: true,
                    lastJudgement: action.judgement
                }
            };
        case JUDGE_TRAINING_TWEET_SUCCESS:
            return state;
        default:
            return state;
    }
}

export function getTweets(quantity) {
    if (quantity === undefined) quantity = 1;
    return {
        types: [GET_TRAINING_TWEETS, GET_TRAINING_TWEETS_SUCCESS, GET_TRAINING_TWEETS_FAIL],
        promise: client => client.get('/tweet/tweets', {
            params: {
                quantity: quantity
            }
        }),
        afterSuccess: (dispatch, getState, response) => {
        },
        afterFailure: (dispatch, getState, error) => {
        }
    };
}

export function judgeTweet(tweet, judgement) {
    return {
        types: [JUDGE_TRAINING_TWEET, JUDGE_TRAINING_TWEET_SUCCESS, JUDGE_TRAINING_TWEET_FAIL],
        promise: client => client.post('/tweet/judgement', {
            ...tweet,
            params: {
                judgement: judgement
            }
        }),
        afterSuccess: (dispatch, getState, response) => {
            dispatch(getTweets(1));
        },
        judgement: judgement || 'NONE'
    }
}