/*
 * Created by @tranphuquy19 on 10/12/2019
 * Email: tranphuquy19@gmail.com
 */

import React, {useContext, useState} from 'react';
import {Button, Icon, Input, Modal, message} from "antd";
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import {LoginModalContext} from "../contexts/loginModalContext";
import {apiAuthLogin, apiAuthLoginFb} from "../actions/authAction";
import {UserContext} from "../contexts/userContext";

const LoginModelComponent = () => {
    let hasError = false;

    const [user, setUser] = useContext(UserContext);
    const [loginModel, setLoginModel] = useContext(LoginModalContext);
    const [formValues, setFormValues] = useState({
        email: '',
        password: ''
    });

    const handleCancel = () => {
        setLoginModel({...loginModel, isVisible: false});
    }

    let handle401 = (err) => {
        hasError = true;
        message.error("Sai mật khẩu!");
    }

    const handleLoginWithPass = async () => {
        setLoginModel({...loginModel, isLoading: true})
        const responseApi = await apiAuthLogin(formValues).catch(handle401);
        afterLoginSubmit(responseApi)
    }

    const handleResponseFb = async (res) => {
        setLoginModel({...loginModel, isLoading: true});
        const responseApi = await apiAuthLoginFb(res.accessToken).catch(handle401);
        afterLoginSubmit(responseApi);
    }

    const afterLoginSubmit = (responseApi) => {
        if (hasError) {
            setLoginModel({...loginModel, isLoading: false});
        } else {
            //console.log(responseApi);
            setUser(responseApi.data);
            setLoginModel({isLoading: false, isVisible: false});
        }
    }

    const handleFbClicked = () => {

    }

    let onFormChange = (e) => {
        let {name, value} = e.target;
        setFormValues({
            ...formValues,
            [name]: value
        });
    }

    return (
        <div>
            <Modal
                visible={loginModel.isVisible}
                title="Login DoraSound"
                onOk={() => handleLoginWithPass()}
                onCancel={() => handleCancel()}
                footer={[
                    <Button key="back" onClick={() => handleCancel()}>
                        Return
                    </Button>,
                    <Button key="submit" type="primary" loading={loginModel.isLoading}
                            onClick={() => handleLoginWithPass()}>
                        Login
                    </Button>
                    , <FacebookLogin
                        key="auth"
                        appId="483388002507299"
                        autoLoad={false}
                        fields="name,email,picture"
                        callback={handleResponseFb}
                        onClick={handleFbClicked}
                        render={renderProps => {
                            return (
                                <Button type="primary" icon="facebook" loading={loginModel.isLoading}
                                        onClick={renderProps.onClick}>
                                    LoginWithFB
                                </Button>
                            )
                        }}/>
                ]}>
                <div className="col-md-10">
                    <Input onChange={(e) => {
                        onFormChange(e)
                    }} addonBefore={<Icon type="menu"/>} name="email" type="text"
                           placeholder="Input Your Email Address"/>
                    <Input onChange={(e) => {
                        onFormChange(e)
                    }} addonBefore={<Icon type="question-circle"/>} name="password" type="password"
                           placeholder="Input Your Password"/>
                </div>
            </Modal>
        </div>
    );
};

export default LoginModelComponent;
