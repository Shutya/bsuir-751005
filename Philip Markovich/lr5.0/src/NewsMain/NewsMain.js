import React from 'react';
import NewsItem from '../NewsItem/NewsItem';
import "./NewMain.css";
import NoNews from '../NoNews/NoNews';


const NewsMain = props => {

    return(
        
        <div id="news_main" className = "main">
            {
                console.log(props.amount)
            }
            {   
                props.amount !== 0 ? props.data.slice(0, props.amount).map( element =>{return <NewsItem data = {element} key = {element.publishedAt}/> }) : <NoNews/>
            }
        </div>
    );
}

export default NewsMain;