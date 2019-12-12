/*
 * Created by @tranphuquy19 on 10/12/2019
 * Email: tranphuquy19@gmail.com
 */

import User from "./models/userModel";
import React, {useState} from "react";
import {UserContext} from "./contexts/userContext";
import {LoginModalContext} from "./contexts/loginModalContext";
import {PlaylistContext} from "./contexts/playlistContext";
import {SongIndexContext} from "./contexts/songIndexContext";

const Store = ({children}) => {
    const userLogged = JSON.parse(localStorage.getItem('user'));
    let userInitState = (userLogged && userLogged.token) ? userLogged : {user: User};

    const [user, setUser] = useState(userInitState);
    const [modalLogin, setModalLogin] = useState({
        isLoading: false,
        isVisible: false
    });
    const [playlist, setPlaylist] = useState([
        {
            "_id": "5dedeed78b7207310f14a7c0",
            "artist": [],
            "comments": [],
            "name": "Âm Thầm Bên Em",
            "src": "c3da7c9dc2557624bb4abc7c2770df94.mp3",
            "image": "4e403e9d117cc031e8409a3bf1ad93da.jpg",
            "creator": "5dedd954f0911a2c8212c970",
            "updatedAt": "2019-12-09T06:51:03.216Z",
            "createdAt": "2019-12-09T06:51:03.216Z"
        }, {
            "_id": "5dedef69ea15a1319a75c5a8",
            "artist": [],
            "comments": [],
            "name": "Anh chỉ quan tâm em",
            "src": "f09bc4c2fe07520483672be4039f850a.mp3",
            "image": "0791b210408c6ebbb8449f770c9ba944.jpg",
            "creator": "5dedd954f0911a2c8212c970",
            "updatedAt": "2019-12-09T06:53:29.968Z",
            "createdAt": "2019-12-09T06:53:29.968Z"
        }, {
            "_id": "5dedeff0ea15a1319a75c5ab",
            "artist": [],
            "comments": [],
            "name": "Anh sai rồi",
            "src": "b9c478822e7ffbccde3d8b636b011ac4.mp3",
            "image": "e4ffbd457105131bd59fe7de42858f75.jpg",
            "creator": "5dedd954f0911a2c8212c970",
            "updatedAt": "2019-12-09T06:55:44.093Z",
            "createdAt": "2019-12-09T06:55:44.093Z"
        },
    ]);
    const [songIndex, setSongIndex] = useState(0);

    return (
        <UserContext.Provider value={[user, setUser]}>
            <LoginModalContext.Provider value={[modalLogin, setModalLogin]}>
                <PlaylistContext.Provider value={{playlist, setPlaylist}}>
                    <SongIndexContext.Provider value={{songIndex, setSongIndex}}>
                        {children}
                    </SongIndexContext.Provider>
                </PlaylistContext.Provider>
            </LoginModalContext.Provider>
        </UserContext.Provider>
    );
}
export default Store;
