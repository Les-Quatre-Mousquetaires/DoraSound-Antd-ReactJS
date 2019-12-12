import {combineReducers} from 'redux';
import songsReducer from './songsReducer'
const masterReducer = combineReducers({
    songsReducer
});
export default masterReducer;