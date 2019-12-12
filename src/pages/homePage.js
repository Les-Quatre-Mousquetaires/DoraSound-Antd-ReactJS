/*
 * Created by @tranphuquy19 on 12/12/2019
 * Email: tranphuquy19@gmail.com
 */
import React, {Component} from 'react';
import {connect} from "react-redux";
import {Get_All} from "../actions/songsAction";
import { Icon,Button,Carousel } from 'antd';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import './homePage.css';
import AlbumPlayList from "../components/HomeComponents/AlbumPlayList";


class HomePage extends Component {
    constructor(props){
        super(props);

    }
    componentDidMount() {
        let {getAllSongs} = this.props;
        getAllSongs();
    }
    playOnAlbum = (e)=>{
      console.log(e.target.id);
    };
    render() {
        let playist = [];
        let albumPlaylist;
        if(this.props.song.length>0){
            playist = this.props.song;
            albumPlaylist = playist.map((item,index)=>{
                let imgURL = "https://doraneko.tk/resources/images/"+item.image;
                return (
                    <div key={index}>
                        <img id="imgTrend" src={imgURL}/>
                        <h3 id={item._id} onClick={this.playOnAlbum} className="legend">{item.name}</h3>
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
const mapStateToProps = (state)=>{
  return{
    song:  state.songsReducer
  };
};
const mapDispatchToProps = (dispatch)=>{
    return {
        getAllSongs: ()=>{
            dispatch(
                Get_All()
            );
        }
    }
};
export default connect(mapStateToProps,mapDispatchToProps)(HomePage);
