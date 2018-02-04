const GET_TRENDS = 'trends/GET_TRENDS';
const GET_TRENDS_SUCCESS = 'trends/GET_TRENDS_SUCCESS';
const GET_TRENDS_FAIL = 'trends/GET_TRENDS_FAIL';

const GET_TREND_DATA = 'trends/GET_TREND_DATA';
const GET_TREND_DATA_SUCCESS = 'trends/GET_TREND_DATA_SUCCESS';
const GET_TREND_DATA_FAIL = 'trends/GET_TREND_DATA_FAIL';

const initialState = {
    trends: [],
    trendData: [],
    loadingTrendData: undefined
};

// reducer

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_TRENDS:
            return state;
        case GET_TRENDS_SUCCESS:
            return {
                ...state,
                trends: action.result.data
            };
        case GET_TREND_DATA:
            return {
                ...state,
                loadingTrendData: true,
                trendData: []
            };
        case GET_TREND_DATA_SUCCESS:
            return {
                ...state,
                trendData: action.result.data,
                loadingTrendData: false
            };
        default:
            return state;
    }
}

export function getTrends() {
    return {
        types: [GET_TRENDS, GET_TRENDS_SUCCESS, GET_TRENDS_FAIL],
        promise: client => client.get('/api/trends/'),
        afterSuccess: (dispatch, getState, response) => {
        },
        afterFailure: (dispatch, getState, error) => {
        }
    };
}

export function getTrendData(trend) {
    return {
        types: [GET_TREND_DATA, GET_TREND_DATA_SUCCESS, GET_TREND_DATA_FAIL],
        promise: client => client.get('/api/trends/' + trend),
        afterSuccess: (dispatch, getState, response) => {
        },
        afterFailure: (dispatch, getState, error) => {
        }
    };
}