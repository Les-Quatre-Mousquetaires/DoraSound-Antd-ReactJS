import {combineReducers} from 'redux';
import songsReducer from './songsReducer';
import userReducer from './userReducer';
const masterReducer = combineReducers({
    songsReducer, userReducer
});
export default masterReducer;