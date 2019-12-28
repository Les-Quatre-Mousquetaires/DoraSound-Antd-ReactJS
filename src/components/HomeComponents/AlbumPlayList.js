import React, { useContext } from 'react';
import { Icon, Button } from 'antd';
import { connect } from "react-redux";
import { PlaylistContext } from "../../contexts/playlistContext";
import { SongIndexContext } from "../../contexts/songIndexContext";
import { PlayStatusContext } from "../../contexts/playStatusContext";


const AlbumPlayList = (props) => {
    const { playlist, setPlaylist } = useContext(PlaylistContext);
    const { songIndex, setSongIndex } = useContext(SongIndexContext);
    const { playStatus, setPlayStatus } = useContext(PlayStatusContext);
    return (
        <div>
            {/*{props.id}*/}
            <Icon type={props.type} id={props.type} onClick={(e) => {
                let songCurrent = null;
                props.song.forEach(item => {
                    if (item._id === props.id) {
                        songCurrent = item;
                    }
                });
                switch (props.type) {
                    case "play-circle":
                        if (playlist.indexOf(songCurrent) > -1) {
                            window.alert("Đã có trong danh sách");
                        } else {
                            setPlaylist([songCurrent, ...playlist]);
                            setSongIndex(0);
                            setPlayStatus('PLAYING');
                        }

                        return;
                    case "plus":
                        playlist.splice(songIndex + 1, 0, songCurrent);
                        setPlaylist(playlist);
                        return;
                    case "ellipsis":
                        setPlayStatus('PAUSED');
                        return;
                    default:
                        return;
                }
            }} />
            <p>{props.name}</p>
        </div>
    );
};
const mapStateToProps = (state) => {
    return {
        song: state.songsReducer
    };
};
export default connect(mapStateToProps)(AlbumPlayList);
