const preloader = document.getElementById('preloader');
let newsCount = 0;

function startSearch(eventKey) {
    if (eventKey.code === 13) {
        let keyWord = document.getElementById("search").value;
        searchNews(false, keyWord);
    }
    else alert("hui")
}

function searchNews(showMore, keyWord) {
    let list = document.getElementById('list');
    if (!showMore) {
        newsCount = 0;
        document.getElementById("list").innerHTML = "";
        preloader.removeAttribute('hidden');
    }
    else list.removeChild(document.getElementById("show-more-button"));
    let url= "https://newsapi.org/v2/everything?" +
        `q=${keyWord}` +
        "&from=2019-05-21&to=2019-05-21&" +
        "sortBy=popularity&" +
        "apiKey=62b6b9e65efb4ecf9b6ec3626214bbc1";
    let req = new Request(url);
    fetch(req)
        .then(function(response){
            return response.json();
        })
        .then(res => res.articles)
        .then(function (res) {
            for (let i = newsCount; i < newsCount + 5; i++) {
                let outInf=res[i];
                let card = document.createElement("div");
                card.setAttribute("class", "card middle z-depth-5");
                let imageContainer = document.createElement("div");
                imageContainer.setAttribute("class", "card-image waves-effect waves-block waves-light");
                let image = document.createElement("img");
                image.setAttribute("class","activator");
                image.setAttribute("src",outInf.urlToImage);
                imageContainer.appendChild(image);
                let cardContent = document.createElement("div");
                cardContent.setAttribute("class", "card-content");
                let newsAuthor = document.createElement("span");
                newsAuthor.setAttribute("class", "card-title activator grey-text text-darken-4");
                newsAuthor.appendChild(document.createTextNode(outInf.author));
                let linkParagraph = document.createElement("p");
                let linkToArticle = document.createElement("a");
                linkToArticle.setAttribute("href", outInf.url);
                linkToArticle.appendChild(document.createTextNode("Read more"));
                linkParagraph.appendChild(linkToArticle);
                cardContent.appendChild(newsAuthor);
                cardContent.appendChild(linkParagraph);
                let cardReveal = document.createElement("div");
                cardReveal.setAttribute("class","card-reveal");
                let shortSummary = document.createElement("p");
                shortSummary.appendChild(document.createTextNode(outInf.content));
                let closeSummary = document.createElement("span");
                closeSummary.setAttribute("class", "card-title grey-text text-darken-4");
                closeSummary.appendChild(document.createTextNode("X"));
                cardReveal.appendChild(closeSummary);
                cardReveal.appendChild(shortSummary);
                card.appendChild(imageContainer);
                card.appendChild(cardContent);
                card.appendChild(cardReveal);
                list.appendChild(card);
            }
            newsCount += 5 ;
            let showMoreBtn = document.createElement("button");
            showMoreBtn.setAttribute("class", "waves-effect waves-light btn-small red lighten-4 z-depth-2");
            showMoreBtn.appendChild(document.createTextNode("Show more"));
            showMoreBtn.setAttribute("onClick", `searchNews(true, ${keyWord})`);
            showMoreBtn.setAttribute("id", "show-more-button");
            list.appendChild(showMoreBtn);
            preloader.setAttribute("hidden", "")
        });
}

function apple(showMore) {
    let list = document.getElementById('list');
    if (!showMore) {
        newsCount = 0;
        document.getElementById("list").innerHTML = "";
        preloader.removeAttribute('hidden');
    }
    else list.removeChild(document.getElementById("show-more-button"));
    let url= 'https://newsapi.org/v2/everything?' +
        'q=Apple&' +
        'from=2019-05-21&' +
        'sortBy=popularity&' +
        'apiKey=62b6b9e65efb4ecf9b6ec3626214bbc1';
    let req = new Request(url);
    fetch(req)
        .then(function(response){
            return response.json();
        })
        .then(res => res.articles)
        .then(function (res) {
            for (let i = newsCount; i < newsCount + 5; i++) {
                let outInf=res[i];
                let card = document.createElement("div");
                card.setAttribute("class", "card middle z-depth-5");
                let imageContainer = document.createElement("div");
                imageContainer.setAttribute("class", "card-image waves-effect waves-block waves-light");
                let image = document.createElement("img");
                image.setAttribute("class","activator");
                image.setAttribute("src",outInf.urlToImage);
                imageContainer.appendChild(image);
                let cardContent = document.createElement("div");
                cardContent.setAttribute("class", "card-content");
                let newsAuthor = document.createElement("span");
                newsAuthor.setAttribute("class", "card-title activator grey-text text-darken-4");
                newsAuthor.appendChild(document.createTextNode(outInf.author));
                let linkParagraph = document.createElement("p");
                let linkToArticle = document.createElement("a");
                linkToArticle.setAttribute("href", outInf.url);
                linkToArticle.appendChild(document.createTextNode("Read more"));
                linkParagraph.appendChild(linkToArticle);
                cardContent.appendChild(newsAuthor);
                cardContent.appendChild(linkParagraph);
                let cardReveal = document.createElement("div");
                cardReveal.setAttribute("class","card-reveal");
                let shortSummary = document.createElement("p");
                shortSummary.appendChild(document.createTextNode(outInf.content));
                let closeSummary = document.createElement("span");
                closeSummary.setAttribute("class", "card-title grey-text text-darken-4");
                closeSummary.appendChild(document.createTextNode("X"));
                cardReveal.appendChild(closeSummary);
                cardReveal.appendChild(shortSummary);
                card.appendChild(imageContainer);
                card.appendChild(cardContent);
                card.appendChild(cardReveal);
                list.appendChild(card);
            }
            newsCount += 5 ;
            let showMoreBtn = document.createElement("button");
            showMoreBtn.setAttribute("class", "waves-effect waves-light btn-small red lighten-4 z-depth-2");
            showMoreBtn.appendChild(document.createTextNode("Show more"));
            showMoreBtn.setAttribute("onClick", "apple(true)");
            showMoreBtn.setAttribute("id", "show-more-button");
            list.appendChild(showMoreBtn);
            preloader.setAttribute("hidden", "")
        });

}
function  sport(showMore) {
    let list = document.getElementById('list');
    if (!showMore) {
        newsCount = 0;
        document.getElementById("list").innerHTML = "";
        preloader.removeAttribute('hidden');
    }
    else list.removeChild(document.getElementById("show-more-button"));
    let url= 'https://newsapi.org/v2/everything?' +
        'q=sports&' +
        'from=2019-05-21&' +
        'sortBy=popularity&' +
        'apiKey=62b6b9e65efb4ecf9b6ec3626214bbc1';
    let req = new Request(url);
    fetch(req)
        .then(function(response){
            return response.json();
        })
        .then(res => res.articles)
        .then(function (res) {
            for (let i = newsCount; i < newsCount + 5; i++) {
                let outInf=res[i];
                let card = document.createElement("div");
                card.setAttribute("class", "card middle z-depth-5");
                let imageContainer = document.createElement("div");
                imageContainer.setAttribute("class", "card-image waves-effect waves-block waves-light");
                let image = document.createElement("img");
                image.setAttribute("class","activator");
                image.setAttribute("src",outInf.urlToImage);
                imageContainer.appendChild(image);
                let cardContent = document.createElement("div");
                cardContent.setAttribute("class", "card-content");
                let newsAuthor = document.createElement("span");
                newsAuthor.setAttribute("class", "card-title activator grey-text text-darken-4");
                newsAuthor.appendChild(document.createTextNode(outInf.author));
                let linkParagraph = document.createElement("p");
                let linkToArticle = document.createElement("a");
                linkToArticle.setAttribute("href", outInf.url);
                linkToArticle.appendChild(document.createTextNode("Read more"));
                linkParagraph.appendChild(linkToArticle);
                cardContent.appendChild(newsAuthor);
                cardContent.appendChild(linkParagraph);
                let cardReveal = document.createElement("div");
                cardReveal.setAttribute("class","card-reveal");
                let shortSummary = document.createElement("p");
                shortSummary.appendChild(document.createTextNode(outInf.content));
                let closeSummary = document.createElement("span");
                closeSummary.setAttribute("class", "card-title grey-text text-darken-4");
                closeSummary.appendChild(document.createTextNode("X"));
                cardReveal.appendChild(closeSummary);
                cardReveal.appendChild(shortSummary);
                card.appendChild(imageContainer);
                card.appendChild(cardContent);
                card.appendChild(cardReveal);
                list.appendChild(card);
            }
            newsCount += 5 ;
            let showMoreBtn = document.createElement("button");
            showMoreBtn.setAttribute("class", "waves-effect waves-light btn-small red lighten-4 z-depth-2");
            showMoreBtn.appendChild(document.createTextNode("Show more"));
            showMoreBtn.setAttribute("onClick", "sport(true)");
            showMoreBtn.setAttribute("id", "show-more-button");
            list.appendChild(showMoreBtn);
            preloader.setAttribute("hidden", "")
        });
}
function  technology(showMore) {
    let list = document.getElementById('list');
    if (!showMore) {
        newsCount = 0;
        document.getElementById("list").innerHTML = "";
        preloader.removeAttribute('hidden');
    }
    else list.removeChild(document.getElementById("show-more-button"));
    let url= 'https://newsapi.org/v2/everything?' +
        'q=technology&' +
        'from=2019-05-21&' +
        'sortBy=popularity&' +
        'apiKey=62b6b9e65efb4ecf9b6ec3626214bbc1';
    let req = new Request(url);
    fetch(req)
        .then(function(response){
            return response.json();
        })
        .then(res => res.articles)
        .then(function (res) {
            for (let i = newsCount; i < newsCount + 5; i++) {
                let outInf=res[i];
                let card = document.createElement("div");
                card.setAttribute("class", "card middle z-depth-5");
                let imageContainer = document.createElement("div");
                imageContainer.setAttribute("class", "card-image waves-effect waves-block waves-light");
                let image = document.createElement("img");
                image.setAttribute("class","activator");
                image.setAttribute("src",outInf.urlToImage);
                imageContainer.appendChild(image);
                let cardContent = document.createElement("div");
                cardContent.setAttribute("class", "card-content");
                let newsAuthor = document.createElement("span");
                newsAuthor.setAttribute("class", "card-title activator grey-text text-darken-4");
                newsAuthor.appendChild(document.createTextNode(outInf.author));
                let linkParagraph = document.createElement("p");
                let linkToArticle = document.createElement("a");
                linkToArticle.setAttribute("href", outInf.url);
                linkToArticle.appendChild(document.createTextNode("Read more"));
                linkParagraph.appendChild(linkToArticle);
                cardContent.appendChild(newsAuthor);
                cardContent.appendChild(linkParagraph);
                let cardReveal = document.createElement("div");
                cardReveal.setAttribute("class","card-reveal");
                let shortSummary = document.createElement("p");
                shortSummary.appendChild(document.createTextNode(outInf.content));
                let closeSummary = document.createElement("span");
                closeSummary.setAttribute("class", "card-title grey-text text-darken-4");
                closeSummary.appendChild(document.createTextNode("X"));
                cardReveal.appendChild(closeSummary);
                cardReveal.appendChild(shortSummary);
                card.appendChild(imageContainer);
                card.appendChild(cardContent);
                card.appendChild(cardReveal);
                list.appendChild(card);
            }
            newsCount += 5 ;
            let showMoreBtn = document.createElement("button");
            showMoreBtn.setAttribute("class", "waves-effect waves-light btn-small red lighten-4 z-depth-2");
            showMoreBtn.appendChild(document.createTextNode("Show more"));
            showMoreBtn.setAttribute("onClick", "technology(true)");
            showMoreBtn.setAttribute("id", "show-more-button");
            list.appendChild(showMoreBtn);
            preloader.setAttribute("hidden", "")
        });
}
function  health(showMore){
    let list = document.getElementById('list');
    if (!showMore) {
        newsCount = 0;
        document.getElementById("list").innerHTML = "";
        preloader.removeAttribute('hidden');
    }
    else list.removeChild(document.getElementById("show-more-button"));
    let url= 'https://newsapi.org/v2/everything?' +
        'q=health&' +
        'from=2019-05-21&' +
        'sortBy=popularity&' +
        'apiKey=62b6b9e65efb4ecf9b6ec3626214bbc1';
    let req = new Request(url);
    fetch(req)
        .then(function(response){
            return response.json();
        })
        .then(res => res.articles)
        .then(function (res) {
            for (let i = newsCount; i < newsCount + 5; i++) {
                let outInf=res[i];
                let card = document.createElement("div");
                card.setAttribute("class", "card middle z-depth-5");
                let imageContainer = document.createElement("div");
                imageContainer.setAttribute("class", "card-image waves-effect waves-block waves-light");
                let image = document.createElement("img");
                image.setAttribute("class","activator");
                image.setAttribute("src",outInf.urlToImage);
                imageContainer.appendChild(image);
                let cardContent = document.createElement("div");
                cardContent.setAttribute("class", "card-content");
                let newsAuthor = document.createElement("span");
                newsAuthor.setAttribute("class", "card-title activator grey-text text-darken-4");
                newsAuthor.appendChild(document.createTextNode(outInf.author));
                let linkParagraph = document.createElement("p");
                let linkToArticle = document.createElement("a");
                linkToArticle.setAttribute("href", outInf.url);
                linkToArticle.appendChild(document.createTextNode("Read more"));
                linkParagraph.appendChild(linkToArticle);
                cardContent.appendChild(newsAuthor);
                cardContent.appendChild(linkParagraph);
                let cardReveal = document.createElement("div");
                cardReveal.setAttribute("class","card-reveal");
                let shortSummary = document.createElement("p");
                shortSummary.appendChild(document.createTextNode(outInf.content));
                let closeSummary = document.createElement("span");
                closeSummary.setAttribute("class", "card-title grey-text text-darken-4");
                closeSummary.appendChild(document.createTextNode("X"));
                cardReveal.appendChild(closeSummary);
                cardReveal.appendChild(shortSummary);
                card.appendChild(imageContainer);
                card.appendChild(cardContent);
                card.appendChild(cardReveal);
                list.appendChild(card);
            }
            newsCount += 5 ;
            let showMoreBtn = document.createElement("button");
            showMoreBtn.setAttribute("class", "waves-effect waves-light btn-small red lighten-4 z-depth-2");
            showMoreBtn.appendChild(document.createTextNode("Show more"));
            showMoreBtn.setAttribute("onClick", "health(true)");
            showMoreBtn.setAttribute("id", "show-more-button");
            list.appendChild(showMoreBtn);
            preloader.setAttribute("hidden", "")
        });
}
function science(showMore){
    let list = document.getElementById('list');
    if (!showMore) {
        newsCount = 0;
        document.getElementById("list").innerHTML = "";
        preloader.removeAttribute('hidden');
    }
    else list.removeChild(document.getElementById("show-more-button"));
    let url= 'https://newsapi.org/v2/everything?' +
        'q=science&' +
        'from=2019-05-21&' +
        'sortBy=popularity&' +
        'apiKey=62b6b9e65efb4ecf9b6ec3626214bbc1';
    let req = new Request(url);
    fetch(req)
        .then(function(response){
            return response.json();
        })
        .then(res => res.articles)
        .then(function (res) {
            for (let i = newsCount; i < newsCount + 5; i++) {
                let outInf=res[i];
                let card = document.createElement("div");
                card.setAttribute("class", "card middle");
                let imageContainer = document.createElement("div");
                imageContainer.setAttribute("class", "card-image waves-effect waves-block waves-light");
                let image = document.createElement("img");
                image.setAttribute("class","activator");
                image.setAttribute("src",outInf.urlToImage);
                imageContainer.appendChild(image);
                let cardContent = document.createElement("div");
                cardContent.setAttribute("class", "card-content");
                let newsAuthor = document.createElement("span");
                newsAuthor.setAttribute("class", "card-title activator grey-text text-darken-4");
                newsAuthor.appendChild(document.createTextNode(outInf.author));
                let linkParagraph = document.createElement("p");
                let linkToArticle = document.createElement("a");
                linkToArticle.setAttribute("href", outInf.url);
                linkToArticle.appendChild(document.createTextNode("Read more"));
                linkParagraph.appendChild(linkToArticle);
                cardContent.appendChild(newsAuthor);
                cardContent.appendChild(linkParagraph);
                let cardReveal = document.createElement("div");
                cardReveal.setAttribute("class","card-reveal");
                let shortSummary = document.createElement("p");
                shortSummary.appendChild(document.createTextNode(outInf.content));
                let closeSummary = document.createElement("span");
                closeSummary.setAttribute("class", "card-title grey-text text-darken-4");
                closeSummary.appendChild(document.createTextNode("X"));
                cardReveal.appendChild(closeSummary);
                cardReveal.appendChild(shortSummary);
                card.appendChild(imageContainer);
                card.appendChild(cardContent);
                card.appendChild(cardReveal);
                list.appendChild(card);
            }
            newsCount += 5 ;
            let showMoreBtn = document.createElement("button");
            showMoreBtn.setAttribute("class", "waves-effect waves-light btn-small red lighten-4 z-depth-2");
            showMoreBtn.appendChild(document.createTextNode("Show more"));
            showMoreBtn.setAttribute("onClick", "science(true)");
            showMoreBtn.setAttribute("id", "show-more-button");
            list.appendChild(showMoreBtn);
            preloader.setAttribute("hidden", "")
        });
}
function  entertainment(showMore){
    let list = document.getElementById('list');
    if (!showMore) {
        newsCount = 0;
        document.getElementById("list").innerHTML = "";
        preloader.removeAttribute('hidden');
    }
    else list.removeChild(document.getElementById("show-more-button"));
    let url= 'https://newsapi.org/v2/everything?' +
        'q=entertainment&' +
        'from=2019-05-21&' +
        'sortBy=popularity&' +
        'apiKey=62b6b9e65efb4ecf9b6ec3626214bbc1';
    let req = new Request(url);
    fetch(req)
        .then(function(response){
            return response.json();
        })
        .then(res => res.articles)
        .then(function (res) {
            for (let i = newsCount; i < newsCount + 5; i++) {
                let outInf=res[i];
                let card = document.createElement("div");
                card.setAttribute("class", "card middle");
                let imageContainer = document.createElement("div");
                imageContainer.setAttribute("class", "card-image waves-effect waves-block waves-light");
                let image = document.createElement("img");
                image.setAttribute("class","activator");
                image.setAttribute("src",outInf.urlToImage);
                imageContainer.appendChild(image);
                let cardContent = document.createElement("div");
                cardContent.setAttribute("class", "card-content");
                let newsAuthor = document.createElement("span");
                newsAuthor.setAttribute("class", "card-title activator grey-text text-darken-4");
                newsAuthor.appendChild(document.createTextNode(outInf.author));
                let linkParagraph = document.createElement("p");
                let linkToArticle = document.createElement("a");
                linkToArticle.setAttribute("href", outInf.url);
                linkToArticle.appendChild(document.createTextNode("Read more"));
                linkParagraph.appendChild(linkToArticle);
                cardContent.appendChild(newsAuthor);
                cardContent.appendChild(linkParagraph);
                let cardReveal = document.createElement("div");
                cardReveal.setAttribute("class","card-reveal");
                let shortSummary = document.createElement("p");
                shortSummary.appendChild(document.createTextNode(outInf.content));
                let closeSummary = document.createElement("span");
                closeSummary.setAttribute("class", "card-title grey-text text-darken-4");
                closeSummary.appendChild(document.createTextNode("X"));
                cardReveal.appendChild(closeSummary);
                cardReveal.appendChild(shortSummary);
                card.appendChild(imageContainer);
                card.appendChild(cardContent);
                card.appendChild(cardReveal);
                list.appendChild(card);
            }
            newsCount += 5 ;
            let showMoreBtn = document.createElement("button");
            showMoreBtn.setAttribute("class", "waves-effect waves-light btn-small red lighten-4 z-depth-2");
            showMoreBtn.appendChild(document.createTextNode("Show more"));
            showMoreBtn.setAttribute("onClick", "entertainment(true)");
            showMoreBtn.setAttribute("id", "show-more-button");
            list.appendChild(showMoreBtn);
            preloader.setAttribute("hidden", "")
        });
}





