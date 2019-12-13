import {Icon, Input, Tooltip} from "antd";
import React, {useContext, useState} from "react";
import {SocketDataObjectContext} from "../../contexts/socketObjectDataContext";
import {commands} from "../../commons/commands";
import {UserContext} from "../../contexts/userContext";

export function MessageInputComponent() {
    const [messageInput, setMessageInput] = useState('');

    const [user, setUser] = useContext(UserContext);
    const {socketDataObject, sendSocketDataObject} = useContext(SocketDataObjectContext);

    const inputOnChanged = (e) => {
        setMessageInput(e.target.value);
    }

    const handleEnterPressed = (e) => {
        if (e.key === 'Enter') {
            sendSocketDataObject({
                command: commands.TRANSFER_MESSAGES,
                payload: {
                    data: messageInput,
                    creator: (user && user.name) ? user.name : 'ANONYMOUS'
                }
            });
            setMessageInput('');
        };
    }

    return <div style={{marginRight: "1em"}}>
        <Input
            value={messageInput}
            onChange={(e) => {
                inputOnChanged(e)
            }}
            onKeyPress={(e) => {
                handleEnterPressed(e)
            }}
            placeholder="Enter to send your message!"
            prefix={<Icon type="user" style={{color: "rgba(0,0,0,.25)"}}/>}
            suffix={
                <Tooltip title="Extra information">
                    <Icon type="info-circle" style={{color: "rgba(0,0,0,.45)"}}/>
                </Tooltip>
            }
        />
    </div>;
}
