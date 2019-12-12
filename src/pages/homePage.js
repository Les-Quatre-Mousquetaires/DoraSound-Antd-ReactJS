/*
 * Created by @tranphuquy19 on 12/12/2019
 * Email: tranphuquy19@gmail.com
 */
import React, {Component, useContext, useState} from 'react';
import {connect} from "react-redux";
import {Get_All} from "../actions/songsAction";
import {Avatar, Icon, Card, Carousel} from 'antd';
import './homePage.css';
import AlbumPlayList from "../components/HomeComponents/AlbumPlayList";

const {Meta} = Card;

class HomePage extends Component {
    constructor(props) {
        super(props);

    }

    componentDidMount() {
        let {getAllSongs} = this.props;
        getAllSongs();
    }

    render() {
        let playist = [];
        let albumPlaylist;
        if (this.props.song.length > 0) {
            playist = this.props.song;
            albumPlaylist = playist.map((item, index) => {
                let imgURL = "https://doraneko.tk/resources/images/" + item.image;
                return (
                    <div key={index}>
                        {/*<img id="imgTrend" alt="" src={imgURL}/>*/}
                        <Card
                            style={{width: "auto", height: "auto"}}
                            cover={
                                <img id="imgTrend"
                                     alt="example"
                                     src={imgURL}
                                />
                            }
                            actions={[
                                <AlbumPlayList id={item._id} type="play-circle" name="Nghe Luôn"/>,
                                <AlbumPlayList id={item._id} type="plus" name="Thêm vào danh sách"/>,
                                <AlbumPlayList id={item._id} type="ellipsis" name="Chia sẻ"/>,
                            ]}
                        >
                            <Meta id="name_song"
                                  title={item.name}
                            />
                        </Card>
                        {/*<div className="row">*/}
                        {/*    <div className="col-2 mt-3">*/}
                        {/*        <AlbumPlayList id={item._id}/>*/}
                        {/*    </div>*/}
                        {/*</div>*/}
                    </div>
                );
            });
        }
        return (
            <div className="container-fluid">
                <Carousel effect="fade" autoplay>
                    {albumPlaylist}
                </Carousel>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        song: state.songsReducer
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        getAllSongs: () => {
            dispatch(
                Get_All()
            );
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
