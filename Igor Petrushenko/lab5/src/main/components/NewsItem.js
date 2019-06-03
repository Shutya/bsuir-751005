import React from 'react';
import './css/NewsItem.css';

export default class NewsItem extends React.Component {
    constructor(props) {
        super(props);
        this.jsonData = props.item;
    }

    render() {
        const article = this.jsonData;
        return (
            <div id="news-template">
                <div className="news-template__item">
                    <img className="news-template__item news__picture" src={article.urlToImage}/>
                    <div className="news__content">
                        <h2 className="news__title">{article.title}</h2>
                        <h3 className="news__source">{article.source.name}</h3>
                        <p className="news__text">{article.description}</p>
                        <a className="news__link" href={article.url}>Read more...</a>
                    </div>
                </div>
            </div>
        )
    }
}
