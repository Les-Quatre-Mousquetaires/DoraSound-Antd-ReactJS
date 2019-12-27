import React from 'react'
import { Card } from 'antd';
import Meta from 'antd/lib/card/Meta';

const UserListComponent = ({user, index}) => {
    return (
        <Card>
            <Meta title={user.name}/>
        </Card>
       
        
    )
}

export default UserListComponent;