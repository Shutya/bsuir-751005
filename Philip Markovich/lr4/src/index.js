import css from './index.css';


document.addEventListener("DOMContentLoaded", getSrcs);

let amount = 0;
let src = "";

let btnNews = document.getElementById('btn_upload_news'); 

let newsSrcs = document.getElementById("news_srcs");

let search = document.getElementById("btn_search");

let noArticles = document.createElement("div");
noArticles.id = "null";
noArticles.className = "no_news";
noArticles.innerHTML = "There are no articles found";

let zeroFlag = false;

search.onclick = function(){
    let input = document.getElementById("request");
    let val = input.value;
    console.log(val);
    if(val != null){
        src = 
        `q=${val}&` + 'from=2019-05-20&' +
        'sortBy=popularity&';
        let main = document.getElementById("news_main");
        let child = main.lastElementChild;  
        while (child) {   
            main.removeChild(child); 
            child = main.lastElementChild; 
        }
        amount = 0;
        btnNews.click();
    }
}

function newSrc(e){
    console.log(e.target);
    if (e.target.className.indexOf("src") != -1){
        let oldSrc = src;
        src = e.target.className.slice(4, e.target.className.length);
        if (oldSrc.localeCompare(src) != 0){
            let main = document.getElementById("news_main");
            let child = main.lastElementChild;  
             while (child) {   
                main.removeChild(child); 
                child = main.lastElementChild; 
            }
            amount = 0;
            if (btnNews.disabled){
                btnNews.disabled = false;
                btnNews.style.display = "block";
                console.log(btnNews.style.display);
            }
            btnNews.click();
        }
    } 
}

newsSrcs.addEventListener("click", newSrc, false);

function getSrcs(){
    let url = "https://newsapi.org/v2/sources?language=en&apiKey=8d19f90851f74f38b619e1bbd64c281e";
    let req = new Request(url);
    fetch(req)
        .then(function(response) {
            return response.json();
        })
        .then(function(data){
            console.log(data.sources.length);
            let main = document.getElementById("news_srcs");
            for(let i = 0; i < data.sources.length; i++){
                let li = document.createElement("li");
                li.className = `src sources=${data.sources[i].id}&`;
                let div = document.createElement("div");
                div.innerHTML = data.sources[i].name;
                li.appendChild(div);
                main.appendChild(li);
            }
        })
}


window.addEventListener("scroll", function(){
    console.log(window.scrollY);
    if (window.scrollY >= 190)
        btnNews.className += " " + "btn_fixed";
    else
        btnNews.className = "btn_news";
});

btnNews.onclick = function(){
    console.log("keke");
    let url = 'https://newsapi.org/v2/everything?' + 
           src + "language=en&" +
          'apiKey=8d19f90851f74f38b619e1bbd64c281e';
    console.log(url);
    let req = new Request(url);
    fetch(req)
        .then(function(response) {
            return response.json();
        })
        .then(function(data){
            console.log(data.articles.length);
            let newAmount = amount + 4;
            console.log(newAmount);
            let news = document.getElementById("news_main"); 

            if (data.articles.length !== 0){
                if((newAmount >= data.articles.length) || (newAmount == 39)){
                    if (zeroFlag){
                        zeroFlag = false;
                        news.removeChild(news.lastChild);
                    }
                    newAmount = data.articles.length;
                    btnNews.disabled = true;
                    btnNews.style.display = "none";
                }else{
                    if(btnNews.disabled){
                        btnNews.disabled = false;
                        btnNews.style.display = "block";
                    }    
                }
                for(amount; amount <= newAmount; amount++ ){
                    let block = createBlock(data.articles[amount]);                    
                    news.appendChild(block);
                }
            }else{
                if (!zeroFlag){
                    news.appendChild(noArticles);
                    zeroFlag = true;
                }
                
            }
        })
}

function createBlock(data){
    let newsItem = document.createElement("div");
    newsItem.className = "news_item";

    let imgWrapper = document.createElement("div");
    imgWrapper.className = "img_wrapper";

    let img = document.createElement("img");
    img.src = data.urlToImage;

    imgWrapper.appendChild(img);
    
    let newsDescr = document.createElement("div");
    newsDescr.className = "news_description";

    let header = document.createElement("h4");
    header.innerHTML = data.title;
    
    let author = document.createElement("h5");
    author.innerHTML = data.author;

    let delimeter = document.createElement("div");
    delimeter.className = "delimeter"; 
    
    let src = document.createElement("a");
    src.href = data.url;


    let description = document.createElement("p"); 
    description.innerHTML = data.description;
    src.appendChild(description);

    newsDescr.appendChild(header);
    newsDescr.appendChild(author);
    newsDescr.appendChild(delimeter);
    newsDescr.appendChild(src);

    newsItem.appendChild(imgWrapper);
    newsItem.appendChild(newsDescr);

    return newsItem;
}
