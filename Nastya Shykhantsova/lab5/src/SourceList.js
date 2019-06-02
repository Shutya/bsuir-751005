import React from 'react';
import Source from './Source.js';

function SourceList({sourceList}){
    const list = sourceList.map(source => <Source source = {source}/>)
    return(
        list
    )
}
export default SourceList
