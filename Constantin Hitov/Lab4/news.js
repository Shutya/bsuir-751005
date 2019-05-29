const API_KEY = "04841bf30c964970ab2a2a282ff94ba8";
const PAGES_COUNT = 8;
const ARTICLES_AMOUNT = 6;
const NO_PHOTO = 'no-preview.png';

let currentPage = 1;
let currentSources = 'null';
let currentText = '';

let moreNews = document.getElementById('morenewsButton');
moreNews.onclick = function() {
  loadNews();
}

let searchInput = document.getElementById('searchInput');
searchInput.onkeypress = function(e) {
  if (e.which == 13) {
    update();
  }
}

let searchButton = document.getElementById('searchButton');
searchButton.onclick = function() {
  update();
}

let searchSource = document.getElementById('searchSource');
searchSource.onchange = function() {
  update();
}

function createArticle(article){
  let item = document.createElement('article');
  item.setAttribute("class","main");
  let cardHeader = document.createElement('div');
  cardHeader.setAttribute("class","article-head");
  let cardBody = document.createElement('div');
  cardBody.setAttribute("class","article-body");

  let header = document.createElement('h2');
  let linkHeader = document.createElement('a');
  linkHeader.setAttribute("href", article.url);
  linkHeader.textContent = article.title;
  header.appendChild(linkHeader);

  let publish = document.createElement('div');
  let publishData = document.createElement('p');
  let date = new Date(article.publishedAt);
  publish.className = "article-properties";
  publishData.textContent = date.getDate() + '.' + (date.getMonth() + 1) + '.' + date.getFullYear()+ ' ' + date.getHours() + ':' + date.getMinutes();
  publishData.textContent += ' (' + (article.author == null ? article.source.name : article.author) + ')';
  publish.appendChild(publishData);
  cardHeader.appendChild(header);
  cardHeader.appendChild(publish);

  let img = document.createElement('img');
  img.setAttribute("src", article.urlToImage == null ? NO_PHOTO : article.urlToImage);
  img.setAttribute("alt", article.title);
  img.setAttribute("class", "img-preview");

  let desc = document.createElement('p');
  desc.textContent = article.description;

  cardBody.appendChild(img);
  cardBody.appendChild(desc);
  item.appendChild(cardHeader);
  item.appendChild(cardBody);

  return item;
}

function refreshArticles(){
  currentSources = searchSource.value;
  currentText = searchInput.value;
  newsContainer.innerHTML = '';
  currentPage = 1;
}

function prepareURL() {
  let q = '';
  let sources = '';

  if(currentText != ''){
    q = '&q=' + currentText
  }
  if(currentSources != 'null'){
    sources = '&sources=' + currentSources
  }

  return 'https://newsapi.org/v2/top-headlines?language=en&apiKey=' + API_KEY + '&page=' + (currentPage++) + '&pageSize=' + ARTICLES_AMOUNT + q + sources;
}

function loadNews() {
  let url = prepareURL();
  let request = new Request(url);
  fetch(request).then(function(response) {
    if (200 <= response.status <= 299) {
       return response.json();
    }
  }).then(function(json){

    let news = document.getElementById('newsContainer');
    let articles = json.articles;
    articles.forEach(function(article) {
      news.appendChild(createArticle(article));
    })

    if( (articles.length == 0) || (currentPage == (PAGES_COUNT + 1)) ){
      let moreNews = document.getElementById('morenewsButton');
      moreNews.style.display = 'null';
    }

    if( (articles.length == 0) && (currentPage > 1)){
      let noNews = document.getElementById('newsContainer');
      if(noNews.innerHTML == '') {
        noNews.innerHTML = 'There are no articles matching your request!<br>Please, search something else.';
      }
    }
    })
}

function update() {
  refreshArticles();
  loadNews();
}

function loadSources() {
  let url = 'https://newsapi.org/v2/sources?country=us&language=en&apiKey=' + API_KEY;
  let request = new Request(url);

  fetch(request).then(function(response) {
    if(200 <= response.status <= 299) {
      return response.json();
    }
   }).then(function(json){
     let select = document.getElementById("searchSource");
     let sources = json.sources;
     sources.forEach(function(source) {
       let e = document.createElement("option");
       e.textContent = source.name;
       e.value = source.id;
       select.appendChild(e);
    })
    })
}

loadNews();
loadSources();
