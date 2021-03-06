import * as PropTypes from "prop-types";
import React, { useContext } from "react";
import {Layout, Menu, Icon} from 'antd';
import {Link} from "react-router-dom";
import { UserContext } from "../contexts/userContext";

const {Sider} = Layout;
const {SubMenu} = Menu;


export function SiderComponent(props) {
    const [user, setUser] = useContext(UserContext);
    let profileUrl = '/users/' + user._id;
    return <Sider collapsible collapsed={props.collapsed} onCollapse={props.onCollapse}>
        {/*<div className="logo"/>*/}
        <div style={{height: '62px'}}></div>
        <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
            <Menu.Item key="1" className="text-success">
                <Icon type="home"/>
                <span><Link to="/">Home</Link></span>
            </Menu.Item>
            <Menu.Item key="2" className="text-success">
                <Icon type="profile"/>
                <span><Link to="/profile">Profile</Link></span>
            </Menu.Item>
            <SubMenu key="sub1" title={<span><Icon type="windows"/><span>Music World</span></span>}>
                <Menu.Item key="3"><i className="fas fa-compact-disc"> <Link to="/albums"> Albums</Link></i></Menu.Item>
                {/* <Menu.Item key="4"><i className="fas fa-guitar"> <Link to="/categories"> Categories</Link></i></Menu.Item> */}
                <Menu.Item key="5"><i className="fas fa-broadcast-tower"> <Link to="/radio"> Radio</Link></i></Menu.Item>
            </SubMenu>
            {/* <SubMenu key="sub2" title={<span><Icon type="team"/><span>Team</span></span>}>
                <Menu.Item key="6">Team 1</Menu.Item>
                <Menu.Item key="8">Team 2</Menu.Item>
            </SubMenu> */}
            <Menu.Item key="9"><Icon type="file"/>
                <Link to={profileUrl}><span>File</span></Link>
            </Menu.Item>
            {user.role === 'admin'? 
                <Menu.Item key="10"><Link to="/admin"><i className="fas fa-users-crown"></i></Link></Menu.Item> : null
            }
        </Menu>
    </Sider>;
}

SiderComponent.propTypes = {
    collapsed: PropTypes.bool,
    onCollapse: PropTypes.func
};
