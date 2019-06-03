import React from "react";
import {monthNames, ANIME, NO_PHOTO_IMG} from '../Info';

function Article(props){

    // const title = <div className = 'article-title'></div>;
    let a;
    if(props.article.title !== null){
        a = <a className = 'card-header' href={props.article.url}>{props.article.title}</a>;
    }
    else{
        a = <a className = 'card-header' href={props.article.url}>ANIME</a>;
    }

    let image;
    if(props.article.urlToImage === null)
        image = <img className="article-image" src={NO_PHOTO_IMG}/>;
    else
        image = <img className="article-image" src={props.article.urlToImage}/>;


    const date = new Date(props.article.publishedAt);
    let temp = (date.getDay() + 1) + ' ' + monthNames[date.getMonth()] + '. ' + 
                      date.getFullYear() + ' y.';

    const dateBlock = <div className='card-subtitle text-muted'><p>{temp}</p></div>;



    if(props.article.description !== null)
        temp = <p>{props.article.title}</p>;
    else        
        temp = <p>{ANIME}</p>;     
        
    const descriptionBlock = <div className='article-description'>{temp}</div>;
    
    return (
        <article className='card text-center text-white bg-dark mb-3'>
            {/* {title} */}
            {a}
            <div className=''>
                {image}
            </div>
            <div className='card-body'>
                {dateBlock}
                {descriptionBlock}
            </div>
        </article>
        
    )
}

export default Article;