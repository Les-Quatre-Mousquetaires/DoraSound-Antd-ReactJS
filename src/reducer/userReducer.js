import User from "../models/userModel";
import { GET_ALL_USERS, DELETE_USER } from "../commons/type";

let usersInitState = [User];

let userReducer = (state = usersInitState, action) => {
    switch(action.type) {
        case GET_ALL_USERS:
            state = action.payload.data;
            return state;
        case DELETE_USER:
            console.log(action.payload);
            return state.filter((user) => user._id !== action.payload);
        default:
            return state;
    }
};
export default userReducer;