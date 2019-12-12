/*
 * Created by @tranphuquy19 on 12/12/2019
 * Email: tranphuquy19@gmail.com
 */
import React, {Component} from 'react';
import {connect} from "react-redux";
import {Get_All} from "../actions/songsAction";
import Swiper from 'react-id-swiper';
import 'swiper/css/swiper.css'

import AlbumPlayList from "../components/HomeComponents/AlbumPlayList";

const params = {
    slidesPerView: 3,
    spaceBetween: 30,
    freeMode: true,
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    }
};

class HomePage extends Component {
    constructor(props){
        super(props);

    }
    componentDidMount() {
        let {getAllSongs} = this.props;
        getAllSongs();
    }
    render() {
        let playist = [];
        let albumPlaylist;
        if(this.props.song.length>0){
            playist = this.props.song;
            //console.log("1 :",playist);
            albumPlaylist = playist.map((item,index)=>{
                let imgURL = "https://doraneko.tk/resources/images/"+item.image;
                return (
                        <div className="col-3" key={index} >
                            <div className="thumbnail" >
                                <img src={imgURL} alt="Fjords" style={{width: '300px',height:"300px"}}/>
                                <div className="caption">
                                    <p>{item.name}</p>
                                </div>
                            </div>
                        </div>
                );
            });
        }
        return (
            <div>
                PlayList:
                <div className="row">
                    {albumPlaylist}
                </div>



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
