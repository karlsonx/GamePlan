import React from 'react';

const RSVPItem = props => {

    return (
        <div>
            {props.user_name}
            <button >Yes</button>
            <button >No</button>
        </div>
    )
}


export default RSVPItem;