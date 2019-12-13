/*
 * Created by @tranphuquy19 on 12/12/2019
 * Email: tranphuquy19@gmail.com
 */
import React, {Component, Fragment} from 'react';
import getUser from '../actions/userAction';
import {Link} from 'react-router-dom';
import User from '../models/userModel';
import { ViewUserContext } from '../contexts/ViewUserContext';
import { ViewUserComponent } from '../components/ViewUserComponent';



class UserPage extends Component {   
    constructor(props) {
        super(props);      
        this.state = {
        }
    }

    getUserData = async (id) => {
        let {data} = await getUser(id);
        this.setState({
            ...data
        })
    }

    render() {
        this.getUserData(this.props.match.params.id);
        return (
            // <ViewUserComponent  />
        <Fragment>
            <div>{this.state.name}</div>
            <Link to='/upload'>Add more track</Link>
        </Fragment>
        );
    }
   
    // const [user, setUser] = useState(getUserData(match.params.id));
   
    
    
      

};

export default UserPage;


