import React from 'react';
import './App.less';

import SourceList from '../SourceList/SourceList';
import NewsList from '../NewsList/NewsList';
import NewsModel from '../../model/NewsModel';
import NewsApiLoader from '../../util/NewsApiLoader';
import NewsSelector from '../../model/NewsSelector';
import Search from '../Search/Search';

const apiKey = "c055f2051a1845988a3a360e5a6ad559"

export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            news: [],
            selectedSources: [],
            desiredNewsCount: 0,
            sources: []
        };

        this.apiLoader = new NewsApiLoader(apiKey);
        this.newsModel = new NewsModel();
        this.newsSelector = new NewsSelector();

        this.newsLimit = 40;

        this.newsModel.on("newsItemsAdded", items => this.handleNewNewsItems(...items));

        this.viewNewsBatchCount = 5;

        this.loadSources();
    }

    async loadSources() {
        const sourcesData = await this.apiLoader.querySources();
        if (sourcesData.status == "ok") {
            this.setState({
                ...this.state,
                sources: sourcesData.sources
            });
        }
    }

    handleNewNewsItems() {
        const { news } = this.state;

        if (this.state.news.length < this.state.desiredNewsCount) {
            let batch = this.newsModel.getBatch(this.state.desiredNewsCount - this.state.news.length);
            this.setState({
                news: news.concat(...batch)
            });
        }

        this.setState({
            showLoadMore: this.newsModel.hasMore()
        });
    }

    handleNoNews() {
        this.setState({
            ...this.state,
            showNotFound: true
        })
    }

    async loadNewsBatch(count) {
        do {
            let queryEndpoint = this.newsSelector.getQueryEndpoint();
            let queryParameers = this.newsSelector.getQueryParameters();
            let data = await this.apiLoader.query(queryEndpoint, queryParameers);

            if (data.status === "ok") {
                if (data.totalResults === 0) {
                    this.handleNoNews();
                } else {
                    this.newsModel.addItems(...data.articles);
                    count -= data.articles.length;
                }
            }
            if (data.status !== "ok" || data.articles.length < queryParameers.pageSize) {
                this.newsSelector.setEnd();
                break;
            }
            this.newsSelector.updatePage();
        } while (count > 0);
    }

    handleLoadMore() {
        const { desiredNewsCount, news, selectedSources } = this.state;

        this.newsSelector.setChoosedSources(...selectedSources);

        let newDesiredNewsCount = Math.min(this.newsLimit, desiredNewsCount + this.viewNewsBatchCount);
        let newsBatchCount = Math.max(newDesiredNewsCount - news.length, 0);
        let newsBatch = this.newsModel.getBatch(newsBatchCount);
        let newNews = news.concat(...newsBatch);
        let showLoadMore = false;

        if (newNews.length === newDesiredNewsCount && newDesiredNewsCount < this.newsLimit && this.newsModel.hasMore()) {
            showLoadMore = true;
        }

        this.setState({
            news: newNews,
            desiredNewsCount: newDesiredNewsCount,
            showLoadMore: showLoadMore
        });

        if (newNews.length < newDesiredNewsCount || !this.newsModel.hasMore()) {
            if (!this.newsSelector.getEnd())
                this.loadNewsBatch(this.viewNewsBatchCount - newsBatch.length);
        }
    }

    handleChangeChoosedSources(selectedSources) {
        this.setState({
            selectedSources: selectedSources
        })
    }

    handleQuery(query) {
        const { selectedSources } = this.state;

        this.newsSelector.flush();
        this.newsModel.clear();

        this.newsSelector.setQuery(query);
        this.setState({
            news: [],
            selectedSources: selectedSources,
            desiredNewsCount: 0,
            showLoadMore: false,
            showNotFound: false
        }, () => this.handleLoadMore());
    }

    render() {
        const { news, sources, showLoadMore, showNotFound } = this.state;

        return (
            <div className="root">
                <header className="header">
                    <h1 className="header__title">News API React application</h1>
                </header>
                <main className="content">
                    <div className="content__item search-container">
                        <Search onSearchClicked={query => this.handleQuery(query)} />
                    </div>
                    <div className="content__item source-list-container">
                        <SourceList onChangeChoosed={choosedSources => this.handleChangeChoosedSources(choosedSources)} sources={sources} />
                    </div>
                    <div className="content__item news-list-container">
                        <NewsList news={news} />
                    </div>
                    {showLoadMore && (
                        <div className="content__item load-more-container">
                            <button className="content__load-more" onClick={() => this.handleLoadMore()}>Load more</button>
                        </div>
                    )}
                    {showNotFound && (
                        <div className="content__item not-found-container">
                            <p className="content__not-found">No news found</p>
                        </div>
                    )}
                </main>
                <footer className="footer">
                    <div className="newsapi-reference">
                        <span className="newsapi-reference__text">Powered by <a href="https://newsapi.org" className="newsapi-reference__link">NewsAPI</a></span>
                    </div>
                </footer>
            </div>
        );
    }
}