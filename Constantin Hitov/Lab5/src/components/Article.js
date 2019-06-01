import React from "react";
import {monthNames, NO_TEXT, NO_PHOTO_IMG} from '../Info';

function Article(props){

    let a;
    if(props.article.title !== null){
        a = <a className = 'card-header text-info' href={props.article.url}>{props.article.title}</a>;
    }
    else{
        a = <a className = 'card-header text-info' href={props.article.url}></a>;
    }

    let image;
    if(props.article.urlToImage === null)
        image = <img className="article-image" src={NO_PHOTO_IMG}/>;
    else
        image = <img className="article-image" src={props.article.urlToImage}/>;

    const date = new Date(props.article.publishedAt);
    let temp = (date.getDay() + 1) + ' ' + monthNames[date.getMonth()] + ' ' +
                      date.getFullYear();

    const dateBlock = <div className='card-subtitle text-info'><p>{temp}</p></div>;

    if(props.article.description !== null)
        temp = <p>{props.article.title}</p>;
    else
        temp = <p>{NO_TEXT}</p>;

    const descriptionBlock = <div className='article-description'>{temp}</div>;

    return (
        <article className='card text-left text-info bg-secondary'>
            {}
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
