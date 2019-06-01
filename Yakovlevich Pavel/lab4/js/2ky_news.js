"use strict"

const API_KEY = "96706f5533b9406e847c2c062cc1d5ec";
const NO_PHOTO_IMG = 'https://www.fsxaddons.com/static/img/no-preview.jpg';
const monthNames = ["jan", "feb", "mar", "apr", "may", "jun",
                    "jul", "aug", "sep", "oct", "nov", "dec"
];
const ANIME = "ANIME";
const NEWS_PER_CLICK = 5;

let currentPage = 1;
let currentIndex = 0;
let moreNewsButton = document.getElementById('more-news');
let documentBody = document.getElementById('articles-block');
let sourcesSelect = document.getElementById("sources");
let sourceString = '';
let qString = '';
let searchButton = document.getElementById('find-news');
let noSearchResult = document.getElementById('no-search-results');

function CreateArticle(articleInfo){
    let article = document.createElement("article");
    let tempP;
    
    let title = document.createElement("div");
    title.setAttribute("class", "article-title");
    tempP = document.createElement("a");
    if(articleInfo.title !== null){
        tempP.innerText = articleInfo.title;
    }
    else{
        tempP.innerText = ANIME;
    }

    tempP.setAttribute('href', articleInfo.url)

    title.appendChild(tempP);

    article.appendChild(title);

    let image = document.createElement("img");
    image.setAttribute("class", "article-image");
    image.setAttribute("src", articleInfo.urlToImage == null ? NO_PHOTO_IMG : articleInfo.urlToImage);
    image.setAttribute("alt", ANIME);
    article.appendChild(image);

    let dateBlock = document.createElement("div");
    dateBlock.setAttribute("class", "article-date");
    tempP = document.createElement("p");
    let date = new Date(articleInfo.publishedAt);
    tempP.innerText = (date.getDay() + 1) + ' ' + monthNames[date.getMonth()] + '. ' + 
                      date.getFullYear() + ' y.';
    dateBlock.appendChild(tempP);
    article.appendChild(dateBlock);

    let descriptionBlock = document.createElement("div");
    descriptionBlock.setAttribute("class", "article-description");
    tempP = document.createElement("p");

    if(articleInfo.description !== null)
        tempP.innerText = articleInfo.title;
    else        
        tempP.innerText = ANIME;         
    
    descriptionBlock.appendChild(tempP);
    article.appendChild(descriptionBlock);

    return article;
}

function RefreshPage(){
    ClearArticles();
    LoadNews(API_KEY);
}

function LoadPage(json, pageType){
    console.log(json);
    console.log(pageType);
    if(pageType > 0){
        if(pageType == 2){
            moreNewsButton.style.display = 'none';
        } else{
            moreNewsButton.style.display = 'block';
        }

        noSearchResult.style.display = 'none'; 
        json.articles.forEach((x) => {
            documentBody.appendChild(CreateArticle(x));
        }
        );
    }
    else{
        noSearchResult.style.display = 'block'; 
        moreNewsButton.style.display = 'none';
    }
   
}

function LoadNews(apiKey){
    let url = PrepareUrl(apiKey);
    console.log(url);
    let req = new Request(url);
    fetch(req).then(function(response) {
            if(200 <= response.status && response.status < 300){
                return response.json();
            }
        }).then(function(json){
            if(!json.totalResults){
                LoadPage(json, 0);
            } else{
                if(json.articles.length < NEWS_PER_CLICK || json.articles.length === 0){
                    LoadPage(json, 2);
                }else{
                    LoadPage(json, 1);
                }
            }
        }) 

}



function LoadSources(){
    let url = 'https://newsapi.org/v2/sources?country=us&apiKey=' + API_KEY;
    console.log(url);
    let req = new Request(url);
    fetch(req).then((response)=>{
        return response.json();
    }).then((json) => {
        let select = document.getElementById('sources');
        json.sources.forEach((x) => {
            let option = document.createElement('option');
            option.value = x.id;
            option.textContent = x.name;
            select.appendChild(option);
        })

    })

}

let searchLine = document.getElementById('search-line');

searchLine.onchange = function search(){
    RefreshPage(API_KEY);
}

moreNewsButton.onclick = () => {
    LoadNews(API_KEY);
}

sourcesSelect.onclick = () => {
    RefreshPage(API_KEY);
}

function PrepareUrl(apiKey){
    if(sourcesSelect.value !== '')
        sourceString = '&sources=' + sourcesSelect.value;
    qString = '';
    if(searchLine.value !== '')
        qString = '&q=' + searchLine.value;
    return 'https://newsapi.org/v2/top-headlines?language=en&page=' + currentPage++ + '&pageSize=' + NEWS_PER_CLICK + 
               qString + sourceString + '&apiKey=' + apiKey;
}

function ClearArticles(){
    while (documentBody.firstChild) {
        documentBody.firstChild.remove();
    }
    currentPage = 1;
}

LoadSources();
LoadNews(API_KEY);
