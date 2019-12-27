import React, { Component } from 'react'
import {connect} from 'react-redux';
import { getAllUsers, deleteUser } from '../actions/userAction';
import { Table, Popconfirm, Button, Tag, Input, Icon, Tabs } from 'antd';
import Highlighter from 'react-highlight-words';
import { Image } from 'react-bootstrap';
import ReactImageZoom from 'react-image-zoom';

function onChange(pagination, filters, sorter, extra) {
  console.log('params', pagination, filters, sorter, extra);
}

class AdminPage extends Component {
    constructor(props) {
      super(props);
      let {getAllUsers} = this.props;
      getAllUsers();
    }  

    state = {
      searchText: '',
      searchedColumn: ''
    };
    
    getColumnSearchProps = dataIndex => ({
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
        <div style={{ padding: 8 }}>
          <Input
            ref={node => {
              this.searchInput = node;
            }}
            placeholder={`Search ${dataIndex}`}
            value={selectedKeys[0]}
            onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
            onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
            style={{ width: 188, marginBottom: 8, display: 'block' }}
          />
          <Button
            type="primary"
            onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
            icon="search"
            size="small"
            style={{ width: 90, marginRight: 8 }}
          >
            Search
          </Button>
          <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
            Reset
          </Button>
        </div>
      ),
      filterIcon: filtered => (
        <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />
      ),
      onFilter: (value, record) =>
        record[dataIndex]
          .toString()
          .toLowerCase()
          .includes(value.toLowerCase()),
      onFilterDropdownVisibleChange: visible => {
        if (visible) {
          setTimeout(() => this.searchInput.select());
        }
      },
      render: text =>
        this.state.searchedColumn === dataIndex ? (
          <Highlighter
            highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
            searchWords={[this.state.searchText]}
            autoEscape
            textToHighlight={text.toString()}
          />
        ) : (
          text
        ),
    });

    handleSearch = (selectedKeys, confirm, dataIndex) => {
      confirm();
      this.setState({
        searchText: selectedKeys[0],
        searchedColumn: dataIndex,
      });
    };
  
    handleReset = clearFilters => {
      clearFilters();
      this.setState({ searchText: '' });
    };

    handleDelete = (key) => {
      let {deleteUser} = this.props;
      //console.log(key);
      deleteUser(key);
    };
    
    userColumns = [
      {
        title: 'Id',
        dataIndex: '_id',
        key: '_id'
      },
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        ...this.getColumnSearchProps('name')
      },
      {
        title: 'Role',
        dataIndex: 'role',
        filters: [
          {
            text: 'User',
            value: 'user'
          },
          {
            text: 'Admin',
            value: 'admin'
          }
        ],
        onFilter: (value, record) => record.role.indexOf(value) === 0,
        sorter: (a, b) => a.role.length - b.role.length,
        render: (role) => 
          
            {
              let color = (role === 'admin') ? 'red' : 'geekblue';
              return (
                <Tag color ={color} key={role}>
                  {role.toUpperCase()}
                </Tag>
              ) 
            }
        
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
  
    songColumns = [
      {
        title: 'Id',
        dataIndex: '_id',
        key: '_id'
      },
      {
        title: 'Image',
        dataIndex: 'image',
        render: (image) => {
          let imgLink = `https://doraneko.tk/resources/images/${image}`;
          return <img src={imgLink} alt="" style={{width: '120px', height: '40px'}}/>
        }
      },
      {
        title: 'Name',
        dataIndex: 'name',
        ...this.getColumnSearchProps('name')
      }
    ]

    render() {
      const {TabPane} = Tabs;

      return (
        <Tabs defaultActiveKey="1">
          <TabPane tab="Members" key="1">
            <div className="container">
              <Table columns={this.userColumns} 
                dataSource={this.props.users} 
                onChange={onChange} 
                pagination={{ pageSize: 5 }} 
                scroll={{ y: 300 }}
              >
              </Table>
            </div>
          </TabPane>
          <TabPane tab="Songs" key="2">
            <div className="container">
              <Table columns={this.songColumns}
              dataSource={this.props.songs}
              onChange={onChange}
              pagination={{pageSize: 5}}
              scroll={{y:300}}>
              </Table>
            </div>
          </TabPane>
        </Tabs>
      )
    }
    
}

const mapStateToProps = (state) => {
    return {
        users: state.userReducer,
        songs: state.songsReducer
    }
}

const mapDispatchToProps = dispatch => ({
    getAllUsers: () => dispatch(getAllUsers()),
    deleteUser: (id) => dispatch(deleteUser(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(AdminPage);