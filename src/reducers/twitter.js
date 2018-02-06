const GET_USER_TWEETS = 'twitter/GET_USER_TWEETS';
const GET_USER_TWEETS_SUCCESS = 'twitter/GET_USER_TWEETS_SUCCESS';
const GET_USER_TWEETS_FAIL = 'twitter/GET_USER_TWEETS_FAIL';

const initialState = {
    userData: [],
    loadingUserData: undefined
};

// reducer

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_USER_TWEETS:
            return {
                ...state,
                userData: [],
                loadingUserData: true
            };
        case GET_USER_TWEETS_SUCCESS:
            return {
                ...state,
                userData: action.result.data,
                loadingUserData: false
            };
        case GET_USER_TWEETS_FAIL:
            return {
                ...state,
                loadingUserData: false
            };
        default:
            return state;
    }
}

export function getUserTweets(username) {
    return {
        types: [GET_USER_TWEETS, GET_USER_TWEETS_SUCCESS, GET_USER_TWEETS_FAIL],
        promise: client => client.get('/api/user/'+username+'/analysis'),
        afterSuccess: (dispatch, getState, response) => {
        },
        afterFailure: (dispatch, getState, error) => {
        }
    };
}