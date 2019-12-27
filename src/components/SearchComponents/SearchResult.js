import React, {Component} from 'react';
import SearchItem from "./SearchItem";
//import './SearchResult.css'
class SearchResult extends Component {
    render() {
        return (
            <div>
                <ul className="ul list-group " style={{position: 'absolute', zIndex:1}}>
                    {this.props.data.map(function (value,index) {
                        return <SearchItem key={index} value={value}/>
                    })}
                </ul>
            </div>
        )

    }
}

export default SearchResult;
