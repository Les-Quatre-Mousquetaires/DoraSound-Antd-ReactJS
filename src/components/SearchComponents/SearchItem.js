import React, { useContext } from 'react';
import { PlaylistContext } from "../../contexts/playlistContext";
import { SongIndexContext } from "../../contexts/songIndexContext";
import { PlayStatusContext } from "../../contexts/playStatusContext";
import { connect } from "react-redux";

const SearchItem = (props) => {
    const { playlist, setPlaylist } = useContext(PlaylistContext);
    const { songIndex, setSongIndex } = useContext(SongIndexContext);
    const { playStatus, setPlayStatus } = useContext(PlayStatusContext);
    let songCurrent = null;
    props.song.forEach(item => {
        if (item.name === props.value) {
            songCurrent = item;
        }
    });
    return (
        <li className="li list-group-item" style={{ cursor: 'pointer' }} onClick={(e) => {
            let music = [];
            music.push(songCurrent);
            for (let i = 0; i < playlist.length; i++) {
                if (songCurrent._id !== playlist[i]._id) {
                    music.push(playlist[i]);
                }
            }
            setPlaylist(music);
            setSongIndex(0);
            setPlayStatus('PLAYING');
        }}>
            <p className="h6">{props.value}</p>
        </li>
    )
};
const mapStateToProps = (state) => {
    return {
        song: state.songsReducer
    };
};
export default connect(mapStateToProps)(SearchItem);
