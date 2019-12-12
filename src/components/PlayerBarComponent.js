import React, {useContext, useRef, useState} from "react";
import {FixedBottom} from "react-fixed-bottom";
import {Button, Col, Dropdown, Icon, Menu, Row, Slider} from "antd";
import {PlayerContext} from "../contexts/playerContext";
import {fancyTimeFormat, getRoundTime, getSeekTime} from "../commons/songsCommons";
import {PlaylistContext} from "../contexts/playlistContext";

let masterDuration = 0;

export function PlayerBarComponent(props) {
    let playerBarStyle = {
        backgroundColor: '#03141A'
    };
    let music = [
        {
            name: 'Em của ngày hôm kia',
            lyric: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet, eveniet harum? Dignissimos, impedit, vitae. Aperiam aspernatur commodi ducimus earum iste necessitatibus tempore, totam. Adipisci cupiditate, explicabo facilis id laborum sed?',
            singer: 'Em Sơn Tùng',
            artist: 'Anh của Em Sơn Tùng',
            category: 'Nhạc quẩy',
            views: 151554,
            downloads: 51689,
            per: 12
        },
        {
            name: 'Em của ngày mai',
            lyric: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet, eveniet harum? Dignissimos, impedit, vitae. Aperiam aspernatur commodi ducimus earum iste necessitatibus tempore, totam. Adipisci cupiditate, explicabo facilis id laborum sed?',
            singer: 'Anh Sơn Tùng',
            artist: 'Anh của Anh Sơn Tùng',
            category: 'Nhạc nhảy',
            views: 123214,
            downloads: 516389,
            per: 21
        },
        {
            name: 'Em của ngày hôm tê',
            lyric: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet, eveniet harum? Dignissimos, impedit, vitae. Aperiam aspernatur commodi ducimus earum iste necessitatibus tempore, totam. Adipisci cupiditate, explicabo facilis id laborum sed?',
            singer: 'Chú Sơn Tùng',
            artist: 'Anh của Chú Sơn Tùng',
            category: 'Nhạc ngủ',
            views: 6856,
            downloads: 6786843,
            per: 56
        },
        {
            name: 'Em của ngày mốt',
            lyric: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet, eveniet harum? Dignissimos, impedit, vitae. Aperiam aspernatur commodi ducimus earum iste necessitatibus tempore, totam. Adipisci cupiditate, explicabo facilis id laborum sed?',
            singer: 'Bác Sơn Tùng',
            artist: 'Anh của Bác Sơn Tùng',
            category: 'Nhạc báo thức',
            views: 87968,
            downloads: 123131,
            per: 72
        },
        {
            name: 'Em của ngày hôm nào đó',
            lyric: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet, eveniet harum? Dignissimos, impedit, vitae. Aperiam aspernatur commodi ducimus earum iste necessitatibus tempore, totam. Adipisci cupiditate, explicabo facilis id laborum sed?',
            singer: 'Hàng xóm Sơn Tùng',
            artist: 'Anh của Hàng sóm Sơn Tùng',
            category: 'Nhạc đám cưới',
            views: 789675,
            downloads: 352648,
            per: 11
        },
        {
            name: 'Em của ngày hôm nớ',
            lyric: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet, eveniet harum? Dignissimos, impedit, vitae. Aperiam aspernatur commodi ducimus earum iste necessitatibus tempore, totam. Adipisci cupiditate, explicabo facilis id laborum sed?',
            singer: 'Má hai Sơn Tùng',
            artist: 'Anh của Má hai Sơn Tùng',
            category: 'Nhạc khai sinh',
            views: 678679,
            downloads: 57342,
            per: 46
        }
    ];

    let [songIndex, setSongIndex] = useState(0);
    let {audio, state, controls, ref} = useContext(PlayerContext);
    let {playlist, setPlaylist} = useContext(PlaylistContext);

    if (state.duration && state.duration !== 0) {
        masterDuration = state.duration;
    }

    let nextSong = () => {
        let tempPlayList = [...playlist];
        tempPlayList.shift();
        console.log(tempPlayList)
        if(tempPlayList.length == 0) controls.seek(masterDuration);
        else setPlaylist(tempPlayList)
    };

    let removeSongByIndex = (i) => {
        let tempPlaylist = [...playlist];
        tempPlaylist.splice(i, 1);
        if(tempPlaylist.length == 0) controls.seek(masterDuration);
        else setPlaylist(tempPlaylist);
    }

    const onSlideBarChange = value => {
        console.log(value);
        controls.seek(getSeekTime(value, masterDuration));
    }

    const getTime = () => {
        let currentTime = getRoundTime(state.time, masterDuration);
        return currentTime ? currentTime : 0;
    }

    const items = () => {
        return playlist.map((item, index) => {
            return <Menu.Item key={index}>
                {item.name}
                <span onClick={() => removeSongByIndex(index)} className="text-danger ml-2">
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
            {audio}
            <Row>
                <Col span={24} style={playerBarStyle}>
                    <div className="row pb-2 pl-3 pr-3 pt-1">
                        <div className="col-12">
                            <div className="d-inline">
                                <span className="text-success">{playlist[0].name}</span>
                                <span className="text-white"> - </span>
                                <span className="text-light">{playlist[0].singer}</span>
                            </div>
                            <br/>
                            <div className="d-inline-flex">
                                <span className="flex-item text-secondary">Sáng tác: {music[songIndex].artist} | Thể loại: {music[songIndex].category} | Lượt nghe: {music[songIndex].views} | Lượt tải: {music[songIndex].downloads}</span>
                            </div>
                            <br/>
                            <div className="d-flex align-items-center">
                                <a className="text-light" onClick={state.paused ? controls.play : controls.pause}><i
                                    className={state.paused ? 'fas fa-play' : 'fas fa-pause'}/></a>
                                <a onClick={nextSong} className="text-light ml-1">
                                    <i className="fas fa-step-forward"/></a>
                                <Slider className="flex-grow ml-3 mb-3 justify-content-center"
                                        style={{maxHeight: "0.3rem", width: "60%"}} tipFormatter={null}
                                        defaultValue={0}
                                        value={getTime()}
                                        onChange={onSlideBarChange}>
                                </Slider>
                                <div className="text-white m-2"><span>{fancyTimeFormat(Math.floor(state.time))}</span>
                                </div>
                                <a className="text-success"><i className="fas fa-repeat-alt"/></a>
                                <a className="text-light ml-1"><i className="far fa-random"/></a>
                                <a className="text-light ml-1"><i className="fas fa-volume"/></a>
                                <Slider className="flex-grow ml-3 mb-3 flex-grow"
                                        style={{maxHeight: "0.2rem", width: "10%"}} tipFormatter={null}>
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
