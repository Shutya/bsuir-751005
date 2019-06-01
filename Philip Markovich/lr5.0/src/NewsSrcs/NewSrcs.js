import React from 'react';
import "./NewSrcs.css";
import NewsSrc from "../NewSrc/NewSrcItem";

const NewsSrcs = props => {

        return(
                <nav>
                    <ul id="news_srcs" className="srcs" onClick = {props.handler}>
                          {  props.data.map( elem =>{
                            return <NewsSrc key = {elem.id} src = {elem.id} name = {elem.name} />;
                        })}   
                    </ul>
                    <button id="btn_upload_news" className="btn_news" onClick = {props.uplNews}>
                        Upload
                    </button>
                </nav>
        ) ;       
                
}

export default NewsSrcs;