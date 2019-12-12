import {GET_ALL_SONGS} from '../commons/type';
import Song from '../models/songModel';

let songInitState = Song;

let songsReducer = (state=songInitState, action )=>{
    switch (action.type) {
        case GET_ALL_SONGS:
             state = action.payload.data;
            return state;
        default:
            return state;
    }
};

export  default  songsReducer;