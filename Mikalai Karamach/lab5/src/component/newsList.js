import React, {PureComponent} from 'react'
import News from './news'

export default class NewsList extends PureComponent {
    async

    constructor(maxDisplay) {
        super();
        //this.getNews(url);
        this.maxDisplay = maxDisplay;
        this.noMoreNews = false;
    }

    render() {
        let allArticles = [( < h2 key = {1} > No news < /h2>)];
        if (this.response.articles.length > 0) {
            allArticles = [];
            for (let index = 0; index < this.maxDisplay && index < this.response.articles.length; index++)
                allArticles.push(
                < News
            key = {index}
            article = {this.response.articles[index]
        }
            />
        )
            if (allArticles.length === this.response.articles.length)
                this.noMoreNews = true;
        } else
            this.noMoreNews = true;

        return (
            < div
        id = "allNews"
        className = "allNews" >
            {allArticles}
            < /div>
    )


    }

    getNews(url) {
        let req = new Request(url);
        const response = await
        fetch(req);
        this.response = await
        response.json();
    }
}
