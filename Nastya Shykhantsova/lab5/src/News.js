import React from 'react';

function News({data}){
    const img = data.urlToImage ? data.urlToImage : './images/img1.jpg';
    const imgStyle = {
        backgroundImage: `url(${img})`
    }
    return (
        <div className="news-item">
                <div className="news-item__content__img" style={imgStyle}></div>
                <div className="news-item__content">
                    <h3 className="news-item__content__title">{data.title}</h3>
                    <h4 className="news-item__content__source">{data.source.name}</h4>
                    <p className="news-item__content__text">{data.description}</p>
                    <a className="news-item__content__link" href={data.url}>Read more</a>
                </div>
        </div>
    )
}

export default News
