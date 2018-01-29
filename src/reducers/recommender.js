const GET_SCORES = 'twitter/GET_SCORES';
const GET_SCORES_SUCCESS = 'twitter/GET_SCORES_SUCCESS';
const GET_SCORES_FAIL = 'twitter/GET_SCORES_FAIL';

const initialState = {
    recommendations: {
        scores: []
    }
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