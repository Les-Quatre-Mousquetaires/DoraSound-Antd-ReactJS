/*
 * Created by @tranphuquy19 on 12/12/2019
 * Email: tranphuquy19@gmail.com
 */
import React, { useContext, useEffect } from 'react';
import { Table, Checkbox } from 'antd'
import { RealtimePlaylistContext } from '../../contexts/realtimePlaylistContext';
import { UserContext } from '../../contexts/userContext';
import User from '../../models/userModel';
import { SocketDataObjectContext } from '../../contexts/socketObjectDataContext';
import { commands } from '../../commons/commands';

const RatingTableComponent = () => {
    const [user, setUser] = useContext(UserContext);
    const { realtimePlaylist, setRealtimePlaylist } = useContext(RealtimePlaylistContext);
    const {socketDataObject, sendSocketDataObject} = useContext(SocketDataObjectContext);
    useEffect((realtimePlaylist)=>{
        console.log(realtimePlaylist);
    })
    const columns = [
        {
            title: 'Top',
            dataIndex: 'top',
            key: 'top',
            render: text => <a>{text}</a>,
        },
        {
            title: 'Bài hát',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Ca sĩ',
            dataIndex: 'single',
            key: 'single',
        },
        {
            title: 'Điểm XH',
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
                        if (e.target.checked) {
                            //like
                            realtimePlaylist.forEach((item) => {
                                if (item.key == e.target.id) {
                                    item.point++;
                                    //console.log(item.point);
                                }
                            });
                            realtimePlaylist.sort((a,b)=>{
                                return b.point-a.point;
                            })
                            setRealtimePlaylist([...realtimePlaylist]);
                        } else {
                            //dislike
                            realtimePlaylist.forEach((item) => {
                                if (item.key == e.target.id) {
                                    item.point--;
                                    //console.log(item.point);
                                }
                            });
                            realtimePlaylist.sort((a,b)=>{
                                return b.point-a.point;
                            })
                            setRealtimePlaylist([...realtimePlaylist]);
                        }
                        sendSocketDataObject({
                            command: commands.VOTE_AUDIO,
                            payload: {
                                data: realtimePlaylist
                            }
                        });
                    }}>Like</Checkbox>
                </span>
            ),
        }
    ];
    var data = [];
    var dataSource = realtimePlaylist.map((item, index) => {
        let temp = {
            key: item.key,
            top: index + 1,
            name: item.name,
            single: item.single,
            point: item.point,
            vote: item.vote
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

