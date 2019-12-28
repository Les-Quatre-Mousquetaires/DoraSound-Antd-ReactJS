import { Card } from "antd";
import React, { useContext } from "react";
import { PlaylistContext } from "../../contexts/playlistContext";
import { SongIndexContext } from "../../contexts/songIndexContext";
import { PlayStatusContext } from "../../contexts/playStatusContext";
import { connect } from "react-redux";

const gridStyle = {
    width: '20%',
    textAlign: 'center',
};
const { Meta } = Card;

function AlbumElement(props) {
    const { playlist, setPlaylist } = useContext(PlaylistContext);
    const { songIndex, setSongIndex } = useContext(SongIndexContext);
    const { playStatus, setPlayStatus } = useContext(PlayStatusContext);

    let songCurrent = null;
    props.song.forEach(item => {
        if (item._id === props.item._id) {
            songCurrent = item;
        }
    });
    return <Card.Grid style={gridStyle} id={props.item._id}>
        <Card
            hoverable
            style={{ height: "200" }}
            cover={<img alt="example" style={{ height: "15em", width: '15em' }} src={props.img} />}
            onClick={(e) => {
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
            <Meta title={props.item.name} />
        </Card>
    </Card.Grid>;
}

const mapStateToProps = (state) => {
    return {
        song: state.songsReducer
    };
};
export default connect(mapStateToProps)(AlbumElement);
