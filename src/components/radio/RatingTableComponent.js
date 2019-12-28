/*
 * Created by @tranphuquy19 on 12/12/2019
 * Email: tranphuquy19@gmail.com
 */
import React, { useContext, useEffect } from 'react';
import { Table, Checkbox } from 'antd';
import { RealtimePlaylistContext } from '../../contexts/realtimePlaylistContext';
import { UserContext } from '../../contexts/userContext';
import { PlaylistContext } from "../../contexts/playlistContext";
import { SongIndexContext } from "../../contexts/songIndexContext";
import { PlayStatusContext } from "../../contexts/playStatusContext";
import { SocketDataObjectContext } from '../../contexts/socketObjectDataContext';
import { commands } from '../../commons/commands';
const RatingTableComponent = () => {
    const [user, setUser] = useContext(UserContext);
    const { realtimePlaylist, setRealtimePlaylist } = useContext(RealtimePlaylistContext);
    const { socketDataObject, sendSocketDataObject } = useContext(SocketDataObjectContext);
    const { playlist, setPlaylist } = useContext(PlaylistContext);
    const { songIndex, setSongIndex } = useContext(SongIndexContext);
    const { playStatus, setPlayStatus } = useContext(PlayStatusContext);

    const columns = [
        {
            title: 'Top',
            dataIndex: 'top',
            key: 'top',
        },
        {
            title: 'Bài hát',
            dataIndex: 'name',
            key: 'name',
            render: (name, record) => {
                // let song = realtimePlaylist.forEach((item) => {
                //     if (item._id == record.key) {
                //         return item;
                //     }
                // })

                return (
                    <a onClick={(e) => {
                        let currentSong = {};
                        for (let i = 0; i < realtimePlaylist.length; i++) {
                            if (realtimePlaylist[i]._id == record.key) {
                                currentSong = realtimePlaylist[i]; break;
                            }
                        }
                        let resData = [currentSong, ...playlist];
                        console.log(resData);
                        setPlaylist(resData);
                        setSongIndex(0);
                        setPlayStatus('PLAYING');
                    }}>{name}</a>
                );
            }
        },
        {
            title: 'Số lượt bình chọn',
            dataIndex: 'point',
            key: 'point',
        },
        {
            title: 'Bình chọn',
            key: 'vote',
            dataIndex: 'vote',
            render: (vote, record) => (
                <span>
                    <Checkbox id={record.key} onChange={(e) => {
                        if (user._id !== "") {
                            sendSocketDataObject({
                                command: commands.TRANSFER_VOTING,
                                payload: {
                                    songId: record.key,
                                    userId: user._id,
                                    voteUp: true
                                }
                            });
                        } else {
                            window.alert("Vui lòng đăng nhập để bình chọn!");
                        }
                    }} checked={vote.includes(user._id)}>Like</Checkbox>
                </span>
            ),
        }
    ];
    var data = [];
    var dataSource = realtimePlaylist.map((item, index) => {
        let temp = {
            key: item._id,
            top: index + 1,
            name: item.name,
            point: item.voters.length,
            vote: item.voters
        };
        data.push(temp);
    });

    return (
        <div>
            <Table dataSource={data} columns={columns} size="small" />
        </div>
    );
};

export default RatingTableComponent;

