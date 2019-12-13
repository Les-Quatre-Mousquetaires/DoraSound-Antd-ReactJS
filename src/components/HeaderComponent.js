import React, {useContext} from "react";
import {Avatar, Dropdown, Icon, Layout, Menu} from "antd";
import {LoginModalContext} from "../contexts/loginModalContext";
import {UserContext} from "../contexts/userContext";
import {localLogout} from "../actions/authAction";
import User from "../models/userModel";
import SearchComponent from "./SearchComponents/SearchComponent";


const {Header} = Layout;

function HeaderComponent(props) {
    const [loginModal, setLoginModel] = useContext(LoginModalContext);
    const [user, setUser] = useContext(UserContext);

    const handleClickLogin = () => {
        setLoginModel({...loginModal, isVisible: true});
    };
    const onLogoutClick = () => {
        localLogout();
        setUser(User);
    };
    const menu = (
        <Menu>
            <Menu.Item>
                <a rel="noopener noreferrer">
                    <span><Icon className="mb-2" type="user"/> Profile</span>
                </a>
            </Menu.Item>
            <Menu.Item>
                <a rel="noopener noreferrer">
                    <span><Icon className="mb-2" type="setting"/> Settings</span>
                </a>
            </Menu.Item>
            <Menu.Divider/>
            <Menu.Item onClick={() => onLogoutClick()}>
                <a rel="noopener noreferrer">
                    <span><Icon className="mb-2" type="logout"/> Logout</span>
                </a>
            </Menu.Item>
        </Menu>
    );
    return <Header style={{background: "#fff", padding: 0}}>
        <nav className="navbar navbar-light navbar-inverse"
             style={{backgroundColor: '#001529', height: '66px', paddingTop: '0px', paddingBottom: '0px'}}>
            <ul className="navbar-header" href="#" style={{paddingTop: '0px', paddingBottom: '0px'}}>
                <img src="LOGO2.png" width={200} height={48} alt=""/>
            </ul>


            <div className="float-right mr-5">
                <div className="row ">
                    <div className="col-7 ">
                        <SearchComponent />
                    </div>
                    <div className="col-5">
                        <form className="form-inline">
                            {(user && user.token) ?
                                <div style={{marginRight: '1em', marginLeft: '3em', cursor: 'pointer'}}>
                                    <Dropdown overlay={menu}>
                                        <Avatar
                                            size={40}
                                            style={{
                                                backgroundColor: '#3bc8e7',
                                                verticalAlign: 'middle'
                                            }}>{user.name.split(' ').pop()}</Avatar>
                                    </Dropdown>
                                </div>
                                :

                                <div className="ms_top_btn">
                                    <a className="ms_btn m-auto" style={{color: 'white'}}
                                       onClick={() => handleClickLogin()}>Đăng
                                        Nhập</a>
                                </div>
                            }
                        </form>
                    </div>
                </div>
            </div>

        </nav>
    </Header>;
};

export default (HeaderComponent);

