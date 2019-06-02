import React from 'react';

export default class Article extends React.Component {
    render() {
        const article = this.props.article;
        let info = article.source.name;
        if (article.publishedAt) {
            const date = new Date(article.publishedAt).toLocaleString("en-US", {
                hour12: false, day: "2-digit", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit"
            });
            info += `, ${date}`; 
        }
        if (article.author) {
            info += `, Author: ${article.author}`;
        }
        return (
            <div className="contentElementWrapper">
                <div className="contentElement">
                    <div 
                        className="contentElementImg"
                        style={{backgroundImage: `url("${article.urlToImage}")`}}>
                    </div>
                    <article className="article">
                        <a 
                            className="articleLink"
                            href={article.url}>
                            <header className="articleHeader">
                                <h2 className="articleTitle">
                                    {article.title}
                                </h2>
                                <span className="articleInfo">
                                    {info}
                                </span>
                            </header>
                            <section className="articleBody">
                                {article.description}
                            </section>
                        </a>
                    </article>
                </div>
            </div>
        );
    }
}
