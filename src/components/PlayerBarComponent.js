import React, {useContext, useEffect, useRef, useState} from "react";
import {FixedBottom} from "react-fixed-bottom";
import {Col, Dropdown, Icon, Menu, Row, Slider} from "antd";
import {convertToPlayerItemObject, fancyTimeFormat, getRoundTime, getSeekTime} from "../commons/songsCommons";
import {PlaylistContext} from "../contexts/playlistContext";
import {SongIndexContext} from "../contexts/songIndexContext";
import Sound from 'react-sound';
import {PlayStatusContext} from "../contexts/playStatusContext";

export function PlayerBarComponent() {
    let playerBarStyle = {
        backgroundColor: '#03141A'
    };

    let {playStatus, setPlayStatus} = useContext(PlayStatusContext);
    let {songIndex, setSongIndex} = useContext(SongIndexContext);
    let {playlist, setPlaylist} = useContext(PlaylistContext);

    let [src, setSrc] = useState(convertToPlayerItemObject(playlist[songIndex]));
    let [position, setPosition] = useState(0);
    let [duration, setDuration] = useState(0);
    let [volume, setVolume] = useState(80);
    let [playbackRate, setPlaybackRate] = useState(1);
    let [loop, setLoop] = useState(false);

    useEffect(() => {
        setPosition(0);
        setSrc(convertToPlayerItemObject(playlist[songIndex]));
    }, [duration, playlist]);

    useEffect(() => {
        setSrc(convertToPlayerItemObject(playlist[songIndex]));
    }, [songIndex]);

    const getIndex = (deleteIndex) => {
        if (songIndex == 0) {
            if (deleteIndex >= 0) return 0;
        } else if (songIndex >= 1, songIndex <= playlist.length - 1) {
            if (deleteIndex == 0) return 0;
            else if (deleteIndex == songIndex) return songIndex - 1;
            else if (deleteIndex > songIndex) return songIndex;
        } else if (songIndex == playlist.length - 1) return songIndex;
    }

    const items = () => {
        return playlist.map((item, index) => {
            return <Menu.Item key={index}>
                <span className={`text-${index == songIndex ? 'success' : 'dark'}`} onClick={() => {
                    setSongIndex(index);
                }}>{item.name}</span>
                <span onClick={() => {
                    if (playlist.length > 1) {
                        setSongIndex(getIndex(index));
                        playlist.splice(index, 1);
                        setPlaylist(playlist);
                    }
                }} className="text-danger ml-2">
                <i className="far fa-1x fa-times-circle"></i></span>
            </Menu.Item>
        });
    };

    const menu = (
        <Menu>
            {items()}
        </Menu>
    );

    return <FixedBottom offset={10}>
        <div style={{width: "91%", minHeight: "6em", maxHeight: "6em", textAlign: "center"}}>
            <Sound
                url={src}
                playStatus={playStatus}
                position={position}
                volume={volume}
                playbackRate={playbackRate}
                loop={loop}
                onLoading={({bytesLoaded, bytesTotal}) => console.log(`${bytesLoaded / bytesTotal * 100}% loaded`)}
                onLoad={() => console.log('Loaded')}
                onPlaying={(e) => {
                    // console.log({position: e.position, duration: e.duration});
                    setPosition(e.position);
                    setDuration(e.duration);
                }}
                onPause={() => console.log('Paused')}
                onResume={() => console.log('Resumed')}
                onStop={() => console.log('Stopped')}
                onFinishedPlaying={() => {
                    songIndex == playlist.length - 1 ? setPlayStatus('PAUSED') : setSongIndex(songIndex + 1)
                }}
            />
            <Row>
                <Col span={24} style={playerBarStyle}>
                    <div className="row pb-2 pl-3 pr-3 pt-1">
                        <div className="col-12">
                            <div className="d-inline">
                                <span className="text-success">{playlist[songIndex].name}</span>
                                <span className="text-white"> - </span>
                                <span className="text-light">{playlist[songIndex].artist}</span>
                            </div>
                            <br/>
                            <div className="d-inline-flex">
                                <span className="flex-item text-secondary">Sáng tác: aaaa | Thể loại: aaaa | Lượt nghe: 123 | Lượt tải: 123123</span>
                            </div>
                            <br/>
                            <div className="d-flex align-items-center">
                                <a className="text-light" onClick={
                                    () => {
                                        playStatus == 'PLAYING' ? setPlayStatus('PAUSED') : setPlayStatus('PLAYING');
                                    }}>
                                    <i className={playStatus != 'PLAYING' ? 'fas fa-play' : 'fas fa-pause'}/>
                                </a>
                                <a
                                    onClick={
                                        () => {
                                            let nextIndex = songIndex + 1 >= playlist.length ? songIndex : songIndex + 1;
                                            setSongIndex(nextIndex);
                                        }} className="text-light ml-1">
                                    <i className="fas fa-step-forward"/></a>
                                <Slider className="flex-grow ml-3 mb-3 justify-content-center"
                                        style={{maxHeight: "0.3rem", width: "60%"}} tipFormatter={null}
                                        defaultValue={0}
                                        value={getRoundTime(position, duration)}
                                        onChange={(value) => {
                                            setPosition(getSeekTime(value, duration));
                                        }}>
                                </Slider>
                                <div className="text-white m-2">
                                    <span>{fancyTimeFormat(Math.floor(position / 1000))}</span>
                                </div>
                                <a className="text-success"><i className="fas fa-repeat-alt"/></a>
                                <a className="text-light ml-1"><i className="far fa-random"/></a>
                                <a className="text-light ml-1"><i className="fas fa-volume"/></a>
                                <Slider className="flex-grow ml-3 mb-3 flex-grow"
                                        style={{maxHeight: "0.2rem", width: "10%"}} tipFormatter={null}
                                        defaultValue={volume}
                                        onAfterChange={
                                            (value) => {
                                                console.log(value);
                                                setVolume(value)
                                            }
                                        }>
                                </Slider>
                                <div className="text-success">
                                    <Dropdown overlay={menu} placement="topCenter">
                                        <i className="fas fa-music"> Queue</i>
                                    </Dropdown>
                                </div>
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
    </FixedBottom>;
}

PlayerBarComponent.propTypes = {};
