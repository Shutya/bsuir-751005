import React from 'react';

function Source(props){
    const {source} = props;
    return (
    <div className="btn_sources">
        <button id={source.id} key={source.id}>{source.name}</button>
    </div>
    )
}
export default Source

    