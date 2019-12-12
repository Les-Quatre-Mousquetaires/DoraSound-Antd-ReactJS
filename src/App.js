import React, {useState} from 'react';
import './App.css';
import {Layout} from 'antd';
import 'antd/dist/antd.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
import {SiderComponent} from "./components/SiderComponent";
import {HeaderComponent} from "./components/HeaderComponent";
import {ContentComponent} from "./components/ContentComponent";
import Store from "./store";
import LoginModelComponent from "./components/LoginModalComponent";
import {BrowserRouter} from "react-router-dom";

function App() {
    let [collapsed, setCollapsed] = useState(true);
    const onCollapse = (collapsed) => {
        setCollapsed(collapsed);
    };
    return (
        <Store>
            <BrowserRouter>
                <Layout style={{minHeight: '100vh'}}>
                    <SiderComponent collapsed={collapsed} onCollapse={onCollapse}/>
                    <Layout>
                        <HeaderComponent/>
                        <ContentComponent/>
                        {/*<Footer style={{textAlign: 'center'}}>Ant Design ©2018 Created by Ant UED</Footer>*/}
                    </Layout>
                </Layout>
                <LoginModelComponent/>
            </BrowserRouter>
        </Store>
    );
}

export default App;
