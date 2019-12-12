import { Breadcrumb, Layout } from "antd";
import React, { useContext } from "react";
import { PlayerBarComponent } from "./PlayerBarComponent";
import { PlayerContext } from "../contexts/playerContext";

const { Content } = Layout;

export function ContentComponent() {
    let { audio, state, controls, ref } = useContext(PlayerContext);

    return <Content style={{ margin: "0 0px" }}>
        

        {/*Content Here*/}      
        <form>
            
            <div className="ms_profile_wrapper" style={{background: "#14182a",margin:0,padding:0}}>
                <h1>Edit Profile</h1>
                <div className="ms_profile_box">
                    <div className="ms_pro_img">
                        <img src="image/01.jpg" alt="" className="img-fluid" />
                        <div className="pro_img_overlay">
                            <i className="fa_icon edit_icon" />
                        </div>
                    </div>
                    <div className="ms_pro_form">
                        <div className="form-group">
                            <label>Your Name *</label>
                            <input type="text" placeholder="Name" className="form-control" />
                        </div>
                        <div className="form-group">
                            <label>Your Email *</label>
                            <input type="text" placeholder="Name@gmail.com" className="form-control" />
                        </div>
                        <div className="form-group">
                            <label>Your Password *</label>
                            <input type="password" placeholder="********" className="form-control" />
                        </div>
                        <div className="form-group">
                            <label>Confirm Password *</label>
                            <input type="password" placeholder="********" className="form-control" />
                        </div>
                        <div className="pro-form-btn text-center marger_top15">
                            <a href="#" className="ms_btn">Lưu</a>
                            <a href="#" className="ms_btn">Hủy Bỏ</a>
                        </div>
                    </div>
                </div>
            </div>
        </form>
        

        {/*End content*/}

        <PlayerBarComponent />
    </Content>;
}
