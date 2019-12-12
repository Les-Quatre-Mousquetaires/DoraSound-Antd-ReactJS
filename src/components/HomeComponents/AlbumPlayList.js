import React, {Component} from 'react';

class AlbumPlayList extends Component {
    render() {
        return <div className="col-4">
            <div className="thumbnail">
                <img src="https://doraneko.tk/resources/images/9ca2d293584e03e84abbfbc68a033ab6.jpg" alt="Fjords" style={{width: '100%'}} />
                <div className="caption">
                    <p>Lorem ipsum donec id elit non mi porta gravida at eget metus.</p>
                </div>
            </div>
        </div>;
    }
}

export default AlbumPlayList;
