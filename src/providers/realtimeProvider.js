/*
 * Created by @tranphuquy19 on 13/12/2019
 * Email: tranphuquy19@gmail.com
 */
import React, {useContext, useEffect, useState} from 'react';
import {RealtimeChatContext} from "../contexts/realtimeChatContext";
import {RealtimePlaylistContext} from "../contexts/realtimePlaylistContext";
import useSocketDataObject from "../hooks/useSocketDataObject";
import {SocketDataObjectContext} from "../contexts/socketObjectDataContext";
import {commands} from "../commons/commands";
import {UserContext} from "../contexts/userContext";

const RealtimeProvider = ({children}) => {
    const [realtimeChatArr, setRealtimeChatArr] = useState([]);
    const [realtimePlaylist, setRealtimePlaylist] = useState([]);

    const {socketDataObject, sendSocketDataObject} = useSocketDataObject();

    useEffect(() => {
        switch (socketDataObject.command) {
            case commands.TRANSFER_MESSAGES:
                setRealtimeChatArr([socketDataObject.payload, ...realtimeChatArr]);
                break;
        }
    }, [socketDataObject]);
    return (
        <div>
            <RealtimeChatContext.Provider value={{realtimeChatArr, setRealtimeChatArr}}>
                <RealtimePlaylistContext.Provider value={{realtimePlaylist, setRealtimePlaylist}}>
                    <SocketDataObjectContext.Provider value={{socketDataObject, sendSocketDataObject}}>
                        {children}
                    </SocketDataObjectContext.Provider>
                </RealtimePlaylistContext.Provider>
            </RealtimeChatContext.Provider>
        </div>
    );
};

export default RealtimeProvider;

