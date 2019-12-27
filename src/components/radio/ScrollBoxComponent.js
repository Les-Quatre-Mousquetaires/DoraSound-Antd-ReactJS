/*
 * Created by @tranphuquy19 on 13/12/2019
 * Email: tranphuquy19@gmail.com
 */
import React from 'react';
import ScrollToBottom, { useScrollToBottom, useSticky } from 'react-scroll-to-bottom';
import {MessageCardComponent} from "./MessageCardComponent";

const ScrollBoxComponent = ({data}) => {
    const scrollToBottom = useScrollToBottom();
    const [sticky] = useSticky();

    return (
        <React.Fragment>
            <MessageCardComponent data={data}/>
            { !sticky && <button onClick={ scrollToBottom }>Click me to scroll to bottom</button> }
        </React.Fragment>
    );
}

export default () => (
    <ScrollToBottom>
        <ScrollBoxComponent />
    </ScrollToBottom>
)
