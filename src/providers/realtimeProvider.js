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
    const [realtimePlaylist, setRealtimePlaylist] = useState([
        {
            "key": "5dedf421ea15a1319a75c5be",
            "name": "Một năm mới bình an",
            "single": "Sơn Tùng M-TP",
            "point": 100,
            "vote": ["5e060954e9f47602c8364529"],
            "src": "7e9ad90202514a54baaf3c93da90e2ad.mp3",
            "image": "b2ff36379257066da89b114289c65406.jpg",
            "creator": "5dedd954f0911a2c8212c970",
        },{
            "key": "5dedf3a0ea15a1319a75c5bb",
            "name": "Là bạn không thể yêu",
            "single":"Lou Hoàng",
            "point": 98,
            "vote": [],
            "src": "a1ac1196ad457a5ceb85fec59b6eec5b.mp3",
            "image": "a41169b9baa2213d84b8494b6795e908.jpg",
            "creator": "5dedd954f0911a2c8212c970",
        },{
            "key": "5dedf0d9ea15a1319a75c5b0",
            "name": "Chạm khẽ tin anh một chút",
            "single":"Noo Phước Thịnh",
            "point": 96,
            "vote": [],
            "src": "7dae1c77e1cd334f45802d900ff1468c.mp3",
            "image": "cb845a040bd08749171f0f7a9ef35595.jpg",
            "creator": "5dedd954f0911a2c8212c970",
        },{
            "key": "5dedf025ea15a1319a75c5ac",
            "name": "Anh ta bỏ em rồi",
            "single": "Hương Giang Idol",
            "point": 84,
            "vote": [],
            "src": "c2d848d1cf2346f59a72695453c59d18.mp3",
            "image": "9ca2d293584e03e84abbfbc68a033ab6.jpg",
            "creator": "5dedd954f0911a2c8212c970",
        },{
            "key": "5dedf0adea15a1319a75c5af",
            "name": "Chắc ai đó sẽ về",
            "single":"Sơn Tùng M-TP",
            "point": 84,
            "vote": [],
            "src": "536464f48a1d663294a9aebea128bc12.mp3",
            "image": "0a423ecf6e07cd915b73204e5324faf9.jpg",
            "creator": "5dedd954f0911a2c8212c970",
        },{
            "key": "5dedf4e4ea15a1319a75c5c2",
            "name": "Sóng gió",
            "single": "JACK",
            "point": 84,
            "vote": [],
            "src": "1a639d21d1e7f3e13dbc8244114fdff2.mp3",
            "image": "6d5990af485b0cfcf8257d4384114336.jpg",
            "creator": "5dedd954f0911a2c8212c970",
        },{
            "key": "5dedf53fea15a1319a75c5c4",
            "name": "Tiến lên Việt Nam",
            "single":"Sơn Tùng M-TP",
            "point": 80,
            "vote": [],
            "src": "d25049fbc804f1c8d25822a163acd29b.mp3",
            "image": "52e7d9c5014e675ae3a5370aaf98b303.jpg",
            "creator": "5dedd954f0911a2c8212c970",
        },{
            "key": "5dedf588ea15a1319a75c5c5",
            "name": "Trời giấu trời mang đi",
            "single":"Amee",
            "point": 79,
            "vote": [],
            "src": "e12d6d2b8e851229f4c5f1fc0df1683b.mp3",
            "image": "694a39712e9d7478d6c42d40d41f1503.jpg",
            "creator": "5dedd954f0911a2c8212c970",
        },{
            "key": "5dedf5baea15a1319a75c5c6",
            "name": "Từng vì nhau",
            "single": "Bùi Anh Tuấn",
            "point": 78,
            "vote": [],
            "src": "b241fd8be8fb6151afb422ea75353ee0.mp3",
            "image": "bcf0458ff00a2da5968e7d9894495ed9.jpg",
            "creator": "5dedd954f0911a2c8212c970",
        },{
            "key": "5dedf101ea15a1319a75c5b1",
            "name": "Có điều gì sao không nói cùng anh",
            "single":"Trung Quân Idol",
            "point": 78,
            "vote": [],
            "src": "3fa5bf319c36161cac8760d9f426f80f.mp3",
            "image": "6d23e51767cf3bc8bae3e5f1995d8b73.jpg",
            "creator": "5dedd954f0911a2c8212c970",
        },
    ]);

    const {socketDataObject, sendSocketDataObject} = useSocketDataObject();

    useEffect(() => {
        switch (socketDataObject.command) {
            case commands.TRANSFER_MESSAGES:
                setRealtimeChatArr([socketDataObject.payload, ...realtimeChatArr]);
                break;
            case commands.VOTE_AUDIO:
                console.log(socketDataObject);
                setRealtimePlaylist([...socketDataObject.payload]);
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

