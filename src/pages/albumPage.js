/*
 * Created by @tranphuquy19 on 12/12/2019
 * Email: tranphuquy19@gmail.com
 */
import React, {useContext} from 'react';
import {PlaylistContext} from "../contexts/playlistContext";
import {SongIndexContext} from "../contexts/songIndexContext";
import {PlayStatusContext} from "../contexts/playStatusContext";

const AlbumPage = () => {
    const newAlbums = [{
        "_id": "5dedf025ea15a1319a75c5ac",
        "artist": [],
        "comments": [],
        "name": "Anh ta bỏ em rồi",
        "src": "c2d848d1cf2346f59a72695453c59d18.mp3",
        "image": "9ca2d293584e03e84abbfbc68a033ab6.jpg",
        "creator": "5dedd954f0911a2c8212c970",
        "updatedAt": "2019-12-09T06:56:37.931Z",
        "createdAt": "2019-12-09T06:56:37.931Z"
    }, {
        "_id": "5dedf04dea15a1319a75c5ad",
        "artist": [],
        "comments": [],
        "name": "Ấn nút nhớ thả giấc mơ",
        "src": "e3bf912a54b717fe184c1cd8853801e7.mp3",
        "image": "3c39a2180f473784dab478cc3b1638d4.jpg",
        "creator": "5dedd954f0911a2c8212c970",
        "updatedAt": "2019-12-09T06:57:17.944Z",
        "createdAt": "2019-12-09T06:57:17.944Z"
    }, {
        "_id": "5dedf07fea15a1319a75c5ae",
        "artist": [],
        "comments": [],
        "name": "Bình yên nơi đâu",
        "src": "25010c53a5c3c20ed41c397ee99df42f.mp3",
        "image": "666d510595c79a3ed305ee33049d9114.jpg",
        "creator": "5dedd954f0911a2c8212c970",
        "updatedAt": "2019-12-09T06:58:07.511Z",
        "createdAt": "2019-12-09T06:58:07.511Z"
    }];

    const {playlist, setPlaylist} = useContext(PlaylistContext);
    const {songIndex, setSongIndex} = useContext(SongIndexContext);
    const {playStatus, setPlayStatus} = useContext(PlayStatusContext);

    return (
        <div>
            <div className="row">
                <button className="btn btn-primary col" onClick={() => {
                    setPlaylist([newAlbums[0], ...playlist]);
                    setSongIndex(0);
                    setPlayStatus('PLAYING');
                }}>Set uu tien bai 1
                </button>
                <button className="btn btn-primary col" onClick={() => {
                    playlist.splice(songIndex + 1, 2, newAlbums[0]);
                    setPlaylist(playlist);
                }}>Chen bai 1 sau danh sach phat
                </button>
                <button className="btn btn-primary col" onClick={() => {
                    setPlaylist([...playlist, ...newAlbums]);
                }}>Chen album sau danh sach phat
                </button>
                <button className="btn btn-primary col" onClick={() => {
                    setPlayStatus('PAUSED');
                }}>Bai dung nhac
                </button>
            </div>
        </div>
    );
};

export default AlbumPage;

