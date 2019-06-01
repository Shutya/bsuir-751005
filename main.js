var requestURL = 'https://newsapi.org/v2/everything?q=<NEWS_TYPE>&from=2019-05-21&sortBy=popularity&apiKey=c86341bb69c8489b916f7c215024b869';

var eachRow = `<div class = 'row'>
<a href='<HREF>'><h3 class='title'><TITLE></h3></a>
  <img src='<SRC>'>
  <p class='decription'><DESCRIPTION></p>
</div>`;


function getNews(newsType) {
    let url = requestURL.replace('<NEWS_TYPE>', newsType);
    var req = new Request(url);
    fetch(req)
        .then(function(response) {
            return response.json();
        })
        .then(res => res.articles)
        .then(function(res) {
            let object = document.getElementById("list");
            object.innerHTML = ``;
            for (let i = 0; i < 100; i++) {
                outInf = res[i];
                let content = eachRow;
                content = content.replace('<TITLE>', outInf.title);
                content = content.replace('<HREF>', outInf.url);
                content = content.replace('<SRC>', outInf.urlToImage);
                content = content.replace('<DESCRIPTION>', outInf.content);
                object.innerHTML += content;
            }
        })
}