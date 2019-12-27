import React, {Component} from 'react';
import SearchBar from "./SearchBar";
import SearchResult from "./SearchResult";
import {connect} from "react-redux";
import {Get_All} from "../../actions/songsAction";

class SearchComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: undefined
        };
        let {getAllSongs} = this.props;
        getAllSongs();
    }


    searchData = (e) => {
        let data = [];
        if (this.props.song) {
            for (let i = 0; i < this.props.song.length; i++) {
                data.push(this.props.song[i].name);
            }
            let queryData = [];
            if (e.target.value !== '') {
                data.forEach((song) => {
                    if (song.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1) {
                        if (queryData.length < 10) {
                            queryData.push(song);
                        }
                    }
                });
            }
            this.setState({
                list: queryData
            });
        }
    };

    render() {
        return (
            <div>
                <SearchBar search={this.searchData}/>
                {(this.state.list) ? <SearchResult data={this.state.list}/> : ""}
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
export default connect(mapStateToProps, mapDispatchToProps)(SearchComponent);
