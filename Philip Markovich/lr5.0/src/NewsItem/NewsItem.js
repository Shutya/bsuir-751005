import React from 'react';
import "./NewsItem.css";

const NewsItem = props => {
    
    return(
        <div className = "news_item">
            <div className="img_wrapper">
                <img src = {props.data.urlToImage} alt={props.data.title}/>
            </div>
            <div className = "news_description">
                <h4>
                    {props.data.title}
                </h4>
                <h5>
                    {props.data.author}
                </h5>
                <div className = "delimeter">
                </div>
                <a href = {props.data.url}>
                    <p>
                        {props.data.description}
                    </p>
                </a>    
            </div>
        </div>
    );
 
}

export default NewsItem;