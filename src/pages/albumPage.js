/*
 * Created by @tranphuquy19 on 12/12/2019
 * Email: tranphuquy19@gmail.com
 */
import React, {useContext} from 'react';
import {Card} from 'antd';
import {connect} from "react-redux";
import {Get_All} from "../actions/songsAction";

const gridStyle = {
    width: '25%',
    textAlign: 'center',
};
const {Meta} = Card;

const AlbumPage = (props) => {
    let {getAllSongs} = props;
    getAllSongs();
    let album = [];
    if(props.song.length>0){
         album = props.song.map((item, index) => {
            let imgURL = "https://doraneko.tk/resources/images/" + item.image;
            return (
                <Card.Grid style={gridStyle} key={index}>
                <Card
                    id={item._id}
                    hoverable
                    style={{width: "200",height:"200"}}
                    cover={<img alt="example" style={{width:'200',height:'200'}} src={imgURL}/>}
                    onClick={(e)=>{console.log(e.target.value)}}>
                    <Meta title={item.name}/>
                </Card>
                </Card.Grid>
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
const mapDispatchToProps = (dispatch) => {
    return {
        getAllSongs: () => {
            dispatch(
                Get_All()
            );
        }
    }
};
export default connect(mapStateToProps,mapDispatchToProps)(AlbumPage);

