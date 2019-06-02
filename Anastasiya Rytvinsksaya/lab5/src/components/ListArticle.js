import React from 'react';
import './style.css';


export default function ListArticle(props){console.log(props.urlToImage);
    if (props.urlToImage==null)
        props.urlToImage='./picture/pic.jpg';
    if (props.description==null) 
        props.description='';
        
    return(
        <div key={props.title}>
        <li>
            <img src={props.urlToImage} alt=''/>
            <a href={props.url}>
                <h3>{props.title}</h3>
            </a>
            <h6>{props.source.name}</h6>
            <p>{props.description}</p>
        </li></div>

    );
}