import React from 'react';
import './App.css';
import NewsList from './component/newsList.js';
import Search from './component/search';
import Sources from './component/sources';
import LoadMore from './component/loadMore';


class App {
    async
    async

    init() {
        this.currDisplayed = 5;
        this.newsBlockSize = 5;
        this.maxDisplayed = 40;
        this.apiKey = "76d2be34fb4d455e951fe1c5689ca2ba";
        this.newsApiWD = "https://newsapi.org/v2/";
        this.currRequest = this.newsApiWD + `top-headlines?country=us&apiKey=${this.apiKey}`;
        this.maxDisplayed = 40;
        this.CurrSources = new Sources(this.newsApiWD + `sources?apiKey=${this.apiKey}`);
        await
        this.getCurrNewsList();
    }

    getCurrNewsList() {
        this.CurrNewsList = new NewsList(this.currDisplayed);
        this.CurrNewsList.getNews(this.currRequest);
    }

    render() {
        console.log("STaRT RENDER");
        var BoundSourcesRender = this.CurrSources.render.bind(this.CurrSources);
        this.CurrNewsList.maxDisplay = this.currDisplayed;
        var CurrNewsListRender = this.CurrNewsList.render.bind(this.CurrNewsList);
        return (
            < div >
            < Search / >
            < BoundSourcesRender / >
            < CurrNewsListRender / >
            < LoadMore / >
            < /div>
    )
        ;
    }
}

export default App;
