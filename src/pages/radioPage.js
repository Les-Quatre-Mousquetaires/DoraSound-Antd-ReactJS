/*
 * Created by @tranphuquy19 on 12/12/2019
 * Email: tranphuquy19@gmail.com
 */
import React from 'react';
import RealtimeProvider from "../providers/realtimeProvider";
import RadioContentComponent from "../components/radio/radioContentComponent";

const RadioPage = () => {
    return (
        <RealtimeProvider>
            <RadioContentComponent/>
        </RealtimeProvider>
    );
};

export default RadioPage;

