import { combineReducers } from 'redux';
import MediaReducer from './MediaReducer';

const rootReducers = combineReducers({
    media: MediaReducer
});

export default rootReducers;