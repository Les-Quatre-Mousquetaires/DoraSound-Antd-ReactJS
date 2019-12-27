import React, {Component} from 'react';


class SearchBar extends Component {
    render() {
        return(
            <div className="mt-2">
                <input type="text" className="form-control" onChange={this.props.search} placeholder="Search Here . . ."/>
            </div>
        )
    }
}

export default SearchBar;
