/*
 * Created by @tranphuquy19 on 12/12/2019
 * Email: tranphuquy19@gmail.com
 */
import React, {useContext} from 'react';
import {Card} from 'antd';
import {connect} from "react-redux";
import {Get_All} from "../actions/songsAction";
import AlbumElement from "../components/AlbumComponents/AlbumElement"



const AlbumPage = (props) => {
    let album = [];
    if(props.song.length>0){
         album = props.song.map((item, index) => {
            let imgURL = "https://doraneko.tk/resources/images/" + item.image;
            return (
                <AlbumElement key={index} item={item} img={imgURL}/>
            );
        });
    }
    return (

        <Card title="Album">
            {album}
        </Card>
    );
};
const mapStateToProps = (state) => {
    return {
        song: state.songsReducer
    };
};
export default connect(mapStateToProps)(AlbumPage);

