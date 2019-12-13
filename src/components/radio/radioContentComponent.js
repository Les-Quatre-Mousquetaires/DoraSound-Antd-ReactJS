/*
 * Created by @tranphuquy19 on 13/12/2019
 * Email: tranphuquy19@gmail.com
 */
import React, {useContext, useEffect, useState} from 'react';
import RatingTableComponent from "./RatingTableComponent";
import ScrollToBottom from "react-scroll-to-bottom";
import {MessageCardComponent} from "./MessageCardComponent";
import {MessageInputComponent} from "./MessageInputComponent";
import {RealtimeChatContext} from "../../contexts/realtimeChatContext";

const RadioContentComponent = () => {
    const {realtimeChatArr, setRealtimeChatArr} = useContext(RealtimeChatContext);
    const [messageCards, setMessageCards] = useState([]);

    useEffect(()=>{
        const temp = [...messageCards];
        temp.unshift(<MessageCardComponent data={realtimeChatArr[0]}/>);
        setMessageCards(temp);
    }, [realtimeChatArr]);
    return (
        <div className="row">
            <div className="col-6">
                <RatingTableComponent/>
            </div>
            <div className="col-6">
                <div className="row">
                    <div className="col-12" style={{minHeight: '300px', maxHeight: '300px', overflowY: 'auto'}}>
                        <ScrollToBottom mode="bottom">
                            {messageCards}
                        </ScrollToBottom>
                    </div>
                    <div className="col-12">
                        <MessageInputComponent/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RadioContentComponent;

