import apiCaller from '../commons/apiCaller';
import { GET_ALL_USERS, DELETE_USER } from '../commons/type';

const getAllUsers = () => {
    return async dispatch => {
        const response = await apiCaller('api/users', 'GET');
        dispatch({type: GET_ALL_USERS, payload: response})
    }
}

const deleteUser = (id) => {
    return async dispatch => {
        await apiCaller(`api/users/${id}`, 'DELETE');
        dispatch({type: DELETE_USER, payload: id})
    }
}


export {getAllUsers, deleteUser}