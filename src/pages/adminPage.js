import React, { Component } from 'react'
import {connect} from 'react-redux';
import { getAllUsers, deleteUser } from '../actions/userAction';
import UserListComponent from '../components/admin/userListComponent';
import { Table, Popconfirm, Button } from 'antd';

function onChange(pagination, filters, sorter, extra) {
  console.log('params', pagination, filters, sorter, extra);
}

class AdminPage extends Component {
    constructor(props) {
      super(props);
      let {getAllUsers} = this.props;
      getAllUsers();
    }  
    
    columns = [
      {
        title: 'Id',
        dataIndex: '_id'
      },
      {
        title: 'Name',
        dataIndex: 'name',
        onFilter: (value, record) => record.name.indexOf(value) === 0,
        sorter: (a, b) => a.name.length - b.name.length,
        sortDirections: ['descend'],
      },
      {
        title: 'Action',
        dataIndex: '',
        key: 'x',
        render: (text, record) =>
          this.props.users.length >= 1 ? (
            <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDelete(record._id)}>
              <Button>Delete</Button>
            </Popconfirm>
          ) : null,
      }
  ];

    handleDelete = (key) => {
      let {deleteUser} = this.props;
      //console.log(key);
      deleteUser(key);
    }
    
    render() {
      return (
        <div className="container">
            <Table columns={this.columns} 
              dataSource={this.props.users} 
              onChange={onChange} 
              pagination={{ pageSize: 5 }} 
              scroll={{ y: 240 }}
            >
            </Table>
        </div>
      )
    }
    
}

const mapStateToProps = (state) => {
    return {
        users: state.userReducer
    }
}

const mapDispatchToProps = dispatch => ({
    getAllUsers: () => dispatch(getAllUsers()),
    deleteUser: (id) => dispatch(deleteUser(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(AdminPage);