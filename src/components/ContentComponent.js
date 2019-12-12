import {Breadcrumb, Layout} from "antd";
import React, {useContext} from "react";
import {PlayerBarComponent} from "./PlayerBarComponent";
import {PlayerContext} from "../contexts/playerContext";
import {BrowserRouter} from "react-router-dom";
import routerRendering from "../commons/routerRendering";
import homeContentRoutes from "../routers/homeContentRoutes";

const {Content} = Layout;

export function ContentComponent() {
    return <Content style={{margin: "0 16px"}}>
        <Breadcrumb style={{margin: "16px 0"}}>
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
        </Breadcrumb>

        {/*Content Here*/}
        <div style={{padding: 24, background: "#fff"}}>
            {routerRendering(homeContentRoutes, true)}
        </div>
        {/*End content*/}

        <PlayerBarComponent/>
    </Content>;
}
