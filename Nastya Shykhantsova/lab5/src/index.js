import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import SourceList  from './SourceList.js';
import NewsList from './NewsList.js';

let  lastUsedUrl = '';
let page = 0;
let alreadyNewsDisplayed = 0;
let newsInfo = [];
const loadButton = '#main-load-bn';
const errorLabel = '#main-errorLabel';
const promosionImg = '#main-img';

let view = {
    hideElement:  (element) => {
        document.querySelector(element).style.display = 'none';
    },
    showElement : (element) => {
        document.querySelector(element).style.display = 'unset';
    }
}

let controller =  {
    loadSources : () => {
        const url = 'https://newsapi.org/v2/sources?apiKey=a94986aa603a4ece86cb5ede2cde5a7f&category=technology&country=us';
        const request = new Request(url);
        fetch(request)
            .then( (response) => response.json())
            .then(
                (data) => {
                    ReactDOM.render(<SourceList sourceList= {data.sources}/>, document.getElementById('main-sources'));
                }
            );
    },

    loadNewsByUrl : (urlPart) => {
        view.hideElement(loadButton);
        view.hideElement(promosionImg);
        view.hideElement(errorLabel);
        const url = `https://newsapi.org/v2/${urlPart}apiKey=a94986aa603a4ece86cb5ede2cde5a7f`;
        const request = new Request(url);
        fetch(request)
            .then( (response) => response.json())
            .then((data) => {
                let newsCount = data.articles.length;
                if(newsCount === 0){
                    view.showElement(errorLabel);
                    view.showElement(promosionImg);
                    view.hideElement(loadButton);
                    newsInfo = [];
                    model.createNewsBlock(newsInfo);
                    return;
                }
                newsInfo = data.articles;
                model.createNewsBlock(data.articles);
                if (newsCount < 5)
                    view.hideElement(loadButton);
                else
                    view.showElement(loadButton);
                lastUsedUrl = url;
                page = 2;
                alreadyNewsDisplayed = newsCount;
            });
    },

    appendNews: () => {
        lastUsedUrl = lastUsedUrl.replace(new RegExp('page=.*&'), `page=${page}&`);
        const request = new Request(lastUsedUrl);
        fetch(request)
            .then( (response) => response.json() )
            .then(
                (data) => {
                    let newsCount = data.articles.length;
                    if(newsCount === 0) {
                        view.hideElement(loadButton);
                        return;
                    }
                    newsInfo = newsInfo.concat(data.articles);
                    model.createNewsBlock(newsInfo);
                    alreadyNewsDisplayed += newsCount;
                    page++;
                    if(newsCount < 5 || alreadyNewsDisplayed === 40){
                        view.hideElement(loadButton);
                    }
            });
    }
}

let model = {
    createNewsBlock : ( data) =>{
        ReactDOM.render(<NewsList newsList={data}/>,document.getElementById('main-newsContent'));
    }
}

controller.loadSources();
document.querySelector(loadButton).addEventListener('click', () => {
    controller.appendNews();
  });

document.querySelector('#main-sources').addEventListener('click', (event) =>{
    controller.loadNewsByUrl(`everything?sources=${event.target.id}&pageSize=5&page=1&`);
});

document.querySelector('#main-search-bn').addEventListener('click',
    () => {
        if(document.querySelector('#main-search-input').value.length > 0){
            controller.loadNewsByUrl(`everything?q=${document.querySelector('#main-search-input').value}&pageSize=5&page=1&`);
    }
});

document.querySelector('#main-search-input').addEventListener('keyup',
    (event) => {
        event.preventDefault();
        if (event.keyCode === 13) {
            document.querySelector('#main-search-bn').click();
    }
});
