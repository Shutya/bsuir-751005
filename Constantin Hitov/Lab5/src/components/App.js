import React from "react";
import { Component } from "react";
import SourcesSelect from './Sources';
import ArticlesBlock from './ArticlesBlock';
import { MAX_ARTICLES, NEWS_PER_CLICK } from '../Info';
import { MoreNewsButton } from './MoreNewsButton';
import { NewsSearchLine } from "./NewsSearchLine";
import { NoMatchLine } from "./NoMatchLine";
import 'bootstrap/dist/css/bootstrap.css';
import '../css/main.css';



export default class App extends Component{
    constructor(params){
        super();
        this.params = params;
    }

    render(params){
        return (
            <div id='main-block'>
                <div className='navbar sticky-top'>
                    <div>
                        <a className='logo' href ='../../public/index.html'>BeeeeeeerkNews</a>
                    </div>
                    <div className='form-row form-inline'>
                        <div className='col'>
                            <SourcesSelect ref='sources' sources={this.params.sources} method={this.ReloadPage}/>
                        </div>
                        <div className='col'>
                            <NewsSearchLine ref='newsSearchLine' method={this.ReloadPage} reloadPageMethod={this.ReloadPage}/>
                        </div>
                    </div>
                </div>
                {}
                <div className='main-content text-center'>
                    <NoMatchLine ref='noMatchLine'/>
                    <ArticlesBlock ref='articlesBlock'/>
                    <MoreNewsButton ref='moreNewsButton' onClick={this.onClick} value='More...'/>
                </div>
            </div>
        );
    }

    Update = async (noMatchLine, moreNewsButton, articlesBlock, q, source) => {
        const loadedNews = await articlesBlock.LoadNews(q, source);
        if(loadedNews.length === 0){
            this.refs.noMatchLine.MakeVisible();
        } else{
            this.refs.noMatchLine.MakeInvisible();
            articlesBlock.AddArticles(loadedNews);
        }
        this.refs.moreNewsButton.Refresh(loadedNews.length, NEWS_PER_CLICK, articlesBlock.state.newsBlocks.length, MAX_ARTICLES);
    };

    UpdatePage =  function(articlesList, q, source){
        articlesList.setState({
            newsBlocks: [],
            currentPage: 1
        },
            () => this.Update(this.refs.noMatchLine, this.refs.moreNewsButton, articlesList, q, source)
        );
    };

    ReloadPage = (articlesList) => {
        const q = this.refs.newsSearchLine.refs.q.value;
        const source = this.refs.sources.refs.source.value;
        const articlesBlock = this.refs.articlesBlock;
        this.UpdatePage(articlesBlock, q, source);
    }

    onClick = async () => {
        const articlesBlock = this.refs.articlesBlock;
        const q = this.refs.newsSearchLine.refs.q.value;
        const source = this.refs.sources.refs.source.value;
        const newArticlesBlocks = await articlesBlock.LoadNews(q, source);
        articlesBlock.AddArticles(newArticlesBlocks);
        this.refs.moreNewsButton.Refresh(newArticlesBlocks.length, {NEWS_PER_CLICK}, articlesBlock.state.newsBlocks.length, MAX_ARTICLES);
    };

}
