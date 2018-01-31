const GET_SCORES = 'recommender/GET_SCORES';
const GET_SCORES_SUCCESS = 'recommender/GET_SCORES_SUCCESS';
const GET_SCORES_FAIL = 'recommender/GET_SCORES_FAIL';

const UPDATE_SCORE = 'recommender/UPDATE_SCORE';
const UPDATE_SCORE_SUCCESS = 'recommender/UPDATE_SCORE_SUCCESS';
const UPDATE_SCORE_FAIL = 'recommender/UPDATE_SCORE_FAIL';

const GET_TRAINING_TWEETS = 'recommender/GET_TRAINING_TWEETS';
const GET_TRAINING_TWEETS_SUCCESS = 'recommender/GET_TRAINING_TWEETS_SUCCESS';
const GET_TRAINING_TWEETS_FAIL = 'recommender/GET_TRAINING_TWEETS_FAIL';

const initialState = {
    recommendations: {
        scores: []
    },
    tweets: [{text: '', retweetCount: 0, favoriteCount: 0}]
};

// reducer

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_SCORES:
            return state;
        case GET_SCORES_SUCCESS:
            return {
                ...state,
                recommendations: {
                    ...state.recommendations,
                    scores: action.result.data
                }
            };
        case UPDATE_SCORE:
            return state;
        case UPDATE_SCORE_SUCCESS:
            return {
                ...state,
                recommendations: {
                    ...state.recommendations,
                    scores: action.result.data
                }
            };
        case GET_TRAINING_TWEETS:
            return state;
        case GET_TRAINING_TWEETS_SUCCESS:
            return {
                ...state,
                tweets: action.result.data.length > 1 ? action.result.data
                    : [state.tweets[1], ...action.result.data]
            };
        default:
            return state;
    }
}

export function getScores() {
    return {
        types: [GET_SCORES, GET_SCORES_SUCCESS, GET_SCORES_FAIL],
        promise: client => client.get('/api/recommender/scores'),
        afterSuccess: (dispatch, getState, response) => {
        },
        afterFailure: (dispatch, getState, error) => {
        }
    };
}

export function updateScore(score, i) {
    return {
        types: [UPDATE_SCORE, UPDATE_SCORE_SUCCESS, UPDATE_SCORE_FAIL],
        promise: client => client.put('/api/recommender/scores', {
            ...score,
            score: i
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