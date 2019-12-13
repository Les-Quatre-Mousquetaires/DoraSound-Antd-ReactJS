import {Avatar, Card} from "antd";
import randomColor from "randomcolor";
import * as PropTypes from "prop-types";
import React from "react";

const {Meta} = Card;

export function MessageCardComponent(props) {
    if (props.data){
        return <div>
            <Card style={{width: "auto", marginTop: 2}} loading={false}>
                <Meta
                    avatar={
                        <Avatar style={{
                            verticalAlign: "middle",
                            backgroundColor: randomColor({luminosity: 'dark'})
                        }}>{props.data.creator.split(" ").pop()}</Avatar>
                    }
                    title={props.data.creator}
                    description={props.data.data}
                />
            </Card>
        </div>;
    }else return <div></div>;

}

MessageCardComponent.propTypes = {data: PropTypes.shape({creator: PropTypes.string, message: PropTypes.string})};
