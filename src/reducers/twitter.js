const GET_TWEETS = 'twitter/GET_TWEETS';
const GET_TWEETS_SUCCESS = 'twitter/GET_TWEETS_SUCCESS';
const GET_TWEETS_FAIL = 'twitter/GET_TWEETS_FAIL';

const MESSAGE = 'authentication/MESSAGE';
const ERROR_MESSAGE = 'authentication/ERROR_MESSAGE';

const initialState = {
    tweets: []
};

// reducer

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_TWEETS:
            return {
                ...state,

            };
        default:
            return state;
    }
}

export function getTweets() {
    return {
        types: [GET_TWEETS, GET_TWEETS_SUCCESS, GET_TWEETS_FAIL],
        promise: client => client.get('/tweet/tweets'),
        afterSuccess: (dispatch, getState, response) => {
            console.log(response);
        }
    };
}