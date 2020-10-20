//Import actions type
import { SET_MEDIA, SET_TOKEN, SEARCH, SORT_BY_DATE, START_LOADING, SET_ERROR, SET_LOGIN, SET_PAGE, DELETE_MEDIA } from '../actions/MediaActions';

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
        case SORT_BY_DATE:
            return {
                ...state,
                sortByCreationDate: action.payload.checked
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
        case SET_PAGE:
            return {
                ...state,
                page: action.payload.page,
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