/*
 * Created by @tranphuquy19 on 13/12/2019
 * Email: tranphuquy19@gmail.com
 */

import {useEffect, useRef, useState} from "react";
import socketIOClient from 'socket.io-client';
import config from '../commons/config';
import {commands} from "../commons/commands";

const useSocketDataObject = () => {
    const [socketDataObject, setSocketDataObject] = useState({
        command: commands.DEFAULT,
        payload: {}
    });
    const socketRef = useRef();

    useEffect(() => {
        socketRef.current = socketIOClient(config.API_URL);
        socketRef.current.on('serverSendDataObject', (dataObject) => {
            setSocketDataObject(dataObject);
        });

        return () => {
            socketRef.current.disconnect();
        }
    }, []);

    const sendSocketDataObject = (dataObject) => {
        socketRef.current.emit('clientSendDataObject', dataObject);
    }

    return {socketDataObject, sendSocketDataObject};
}

export default useSocketDataObject;
