import apiCaller from "../commons/apiCaller";


const getUser = async (id) => {
    const response =  await apiCaller(`api/users/${id}`,'GET');
    return response;
    
};

export default getUser;