import apiCaller from '../commons/apiCaller';
import {GET_ALL_SONGS} from '../commons/type';
const Get_All = ()=>{
    return async dispatch =>{
        const response = await apiCaller('api/songs/','GET');
        //console.log('RES:',response);
        dispatch({type: GET_ALL_SONGS, payload: response});
    }
};

export {Get_All};
