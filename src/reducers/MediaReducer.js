//Import actions type
import { SET_MEDIA, SET_TOKEN, SEARCH, SET_FILTER_QUERY, START_LOADING, SET_ERROR, SET_LOGIN, DELETE_MEDIA } from '../actions/MediaActions';

const getTokenFromLocalSorage = () => {
    let token = localStorage.getItem("token");
    return token === null ? '' : token;
}

const userToken = getTokenFromLocalSorage();

const initState = {
    media: [],
    token: userToken,
    totalCount: 0,
    page: 1,
    loading: false,
    isLogin: userToken ? true : false,
    q: "",
    sortByCreationDate: false,
    error: null,
}

const mediaReducer = (state = initState, action) => {
    console.log(action.payload);
    
    switch (action.type) {
        case SET_MEDIA:
            return {
                ...state,
                media: action.payload.data.media,
                totalCount: action.payload.data.totalCount,
                isLogin: true,
                loading: false,
                error: null,
            };
        case SET_TOKEN:
            return {
                ...state,
                token: action.payload
            };
        case SEARCH:
            return {
                ...state,
                q: action.payload.q
            };
        case SET_FILTER_QUERY:
            return {
                ...state,
                q: action.payload.q,
                sortByCreationDate: action.payload.soryByCreationDate,
                page: action.payload.page,
            };
        case START_LOADING:
            return {
                ...state,
                loading: true
            };
        case SET_LOGIN:
            return {
                ...state,
                isLogin: action.payload.status,
                error: null,
            };
        case SET_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload.error
            };
        case DELETE_MEDIA:
            return {
                ...state,
                media: state.media.filter(item => item.id !== action.payload.id)
            };
        default:
            return state;
    }
}

export default mediaReducer;