const NEWS_KEY = "d6100836287d43bfbf39de7728e69824";

const NO_PHOTO = 'NoFoto.png';
const def = "default";
const NMB_OF_ARTICLES = 8;

let currentPage = 0;
let moreBtn = document.getElementById('more');
let Body = document.getElementById('article');
let srcSelect = document.getElementById("source");
let srcStr = '';
let qStr = '';
let searchBtn = document.getElementById('find');
let noSearch = document.getElementById('no_search_message');
let searchLine = document.getElementById('search');

function NewArticle(Inf){
    let article = document.createElement("article");
    article.setAttribute("class","article");
    let title = document.createElement("div");
    title.setAttribute("class", "article-title");
    if(Inf.title !== null){
        title.innerText=Inf.title;
    }
    else{
        title.innerText = def;
    }
    article.appendChild(title);

    let image = document.createElement("img");
    image.setAttribute("class", "article-image");


    let ref = document.createElement("a");
    ref.setAttribute("class","article-ref")
    image.setAttribute("src", Inf.urlToImage == null ? NO_PHOTO : Inf.urlToImage);
    image.setAttribute("alt", def);
    ref.setAttribute('href', Inf.url)

    ref.appendChild(image);
    article.appendChild(ref);


    let descriptionBlock = document.createElement("div");
    descriptionBlock.setAttribute("class", "article-description");
    let tempP;
    tempP = document.createElement("p");

    if(Inf.description !== null)
        tempP.innerText = Inf.title;
    else
        tempP.innerText = def;

    descriptionBlock.appendChild(tempP);
    article.appendChild(descriptionBlock);

    return article;
}

function RefreshPage(){
    ClearArticles();
    NewNews();
}


function NewPage(json, pageType){

    if(pageType > 0){
        noSearch.style.display = 'none';
console.log(currentPage);

        if(json.articles.length === 0 || currentPage>5){
            moreBtn.style.display = 'none';
        }
        else{
            moreBtn.style.display = 'block';
            json.articles.forEach((inf) => {
                    Body.appendChild(NewArticle(inf));
                }
            );
        }
    }
    else{
        noSearch.style.display = 'block';
        moreBtn.style.display = 'none';
    }

}


function NewNews(){
    let url = PrepareUrl();
    let req = new Request(url);
    fetch(req).then(function(response) {
        if( 200 <= response.status && response.status <= 299){
            return response.json();
        }
    }).then(function(json){
        if(!json.totalResults)
            NewPage(json, 0);
        else
            NewPage(json, 1);
    })

}


function PrepareUrl(){

    qStr = '';

    if(searchLine.value !== '')
        qStr = '&q=' + searchLine.value;

    if(srcSelect.value !== 'show all')
        srcStr = '&sources=' + srcSelect.value;

    return 'https://newsapi.org/v2/top-headlines?language=ru&page=' + currentPage++ + '&pageSize=' + NMB_OF_ARTICLES +
        qStr + srcStr + '&apiKey=' + NEWS_KEY;
}

function LoadSources(){
    let url = 'https://newsapi.org/v2/sources?country=ru&apiKey=' + NEWS_KEY;

    let request = new Request(url);

    fetch(request).then(function (response){

        console.log(response);
        return response.json();
    }).then(function (json)  {
        console.log(json);
        let newselect = document.getElementById('source');
        let opt = document.createElement('option');
        opt.value ='show all' ;
        opt.textContent = 'show all';
        newselect.appendChild(opt);
        json.sources.forEach(function (x){
            let opt = document.createElement('option');
            opt.value = x.id;
            opt.textContent = x.name;
            newselect.appendChild(opt);
        })
    })
}


searchLine.onchange = function (){
    RefreshPage();
}


searchBtn.onclick = function ()  {
    RefreshPage();
}

moreBtn.onclick = function() {
    NewNews();
}

srcSelect.onclick =function () {
    RefreshPage();
}

function ClearArticles(){
    while (Body.firstChild) {
        Body.firstChild.remove();
    }
    currentPage = 1;
}

NewNews();
LoadSources();