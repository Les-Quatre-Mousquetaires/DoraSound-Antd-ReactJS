import React, {useContext} from 'react';
import { ViewUserContext } from '../contexts/ViewUserContext';
import {Link} from 'react-router-dom';

export const ViewUserComponent = () => {
    const {viewUser} = useContext(ViewUserContext); 
    console.log(viewUser)
    return (
        <div>
        <React.Fragment>
            <h2>{viewUser.name}</h2>
            <h2>Your song</h2>
            <div>{viewUser.song}</div>
            <Link to='/upload'>Add more track</Link>    
        </React.Fragment>
        </div>
    )
}
