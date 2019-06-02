var currentNewsCount = 5;
var isLoadMore = false;
var urlToLoadNews = "https://newsapi.org/v2/top-headlines?country=us&apiKey=41b2b7f6a0214545bd7d9ae3f86f1741";
document.addEventListener('DOMContentLoaded', function() {
    SendReqToServer("topNews", urlToLoadNews, currentNewsCount);
    document.getElementById("searchbtn").addEventListener('click', function(e) {
        e.preventDefault();
        let query = document.getElementById("searchquery").value;
        let url = "https://newsapi.org/v2/top-headlines?q=" + query + "&country=us&apiKey=41b2b7f6a0214545bd7d9ae3f86f1741";
        SendReqToServer(query, url, 0);
    });

    var CountrySelect = document.getElementsByClassName('CountryClass');
    for (var i = 0; i < CountrySelect.length; i++) {
        (function(index) {
            var ContryIdent = CountrySelect[index].id
            CountrySelect[index].addEventListener("click", function() {
                urlToLoadNews = "https://newsapi.org/v2/top-headlines?country=" + ContryIdent + "&apiKey=41b2b7f6a0214545bd7d9ae3f86f1741";
                currentNewsCount = 5;
                SendReqToServer(ContryIdent, urlToLoadNews, currentNewsCount);
            })
        })(i);
    }

    document.getElementById("loadbtn").addEventListener('click', function() {

        SendReqToServer("topNews", urlToLoadNews, currentNewsCount);
    });

});

function DisplayNews(countNews, latestNews, output) {
    for (var i = 0; i < countNews; i++) {
        if (i === latestNews.length - 1 || i === 39) {
            document.getElementById("loadbtn").value = "alalaala";
            isLoadMore = false;
            return output;
        }
        output +=
            `<div class="NewItem" style="width: 700px; margin-left: 280px;">
            <h4><b>${latestNews[i].title}</b></h4>
            <img src="${latestNews[i].urlToImage}" style="width: 800px; height: 500px">
            <p>${latestNews[i].description}</p>
            <p>Published at: ${latestNews[i].publishedAt}</p>
            <a href="${latestNews[i].url}" target="_blank" style="width: 100%;" class="btn">Read more</a>
          </div>`;
    }
    document.getElementById("loadbtn").type = "submit";
    return output;
}

function DisplayQuery(latestNews, output) {
    for (var i in latestNews) {
        if (i >= 50) {
            return output;
        }
        output +=
            `<div class="" style="width: 700px; margin-left: 280px;">
            <h4><b>${latestNews[i].title}</b></h4>
            <img src="${latestNews[i].urlToImage}" class="responsive-img">
            <p>${latestNews[i].description}</p>
            <p>Published at: ${latestNews[i].publishedAt}</p>
            <a href="${latestNews[i].url}" target="_blank" style="width: 100%;" class="btn">Read more</a>
         </div>`;
    }
    document.getElementById("loadbtn").type = "hidden";
    return output;
}

function SendReqToServer(query, url, countNews) {
    if (query !== "") {
        ajax({
            method: 'GET',
            url: url,
            success: function(news) {
                let output = "";
                let latestNews = news.articles;

                if (latestNews.length !== 0) {
                    if (countNews === 0) {
                        output = DisplayQuery(latestNews, "");
                    } else {
                        output = DisplayNews(countNews, latestNews, output);
                        currentNewsCount += 5;
                    }
                    document.getElementById("newsResults").innerHTML = output;
                } else {
                    let noNews = `<div style="font-size:30px; margin-left:20px; width:700px; margin-top:40px; color:red;">
                  <h2>Для вас нет новостей:(</h2>
                </div>`;
                    document.getElementById("loadbtn").type = "hidden";
                    document.getElementById("newsResults").innerHTML = noNews;
                }
            },
            error: function() {
                let internetFailure = `
             <div style= "font-size:30px; text-align:center; margin-top:40px; color: red;"> <h2>Не удалось выполнить запрос</h2>            
             </div>`;
                document.getElementById("newsResults").innerHTML = internetFailure;
            }
        });
    }
}

function ajax(params) {
    var request = new XMLHttpRequest();
    request.open(params.method, params.url, true);
    request.onreadystatechange = function() {
        if (this.readyState === 4) {
            if (this.status >= 200 && this.status < 400) {
                if (params.success) {
                    params.success(JSON.parse(this.response));
                }
            } else {
                if (params.error) {
                    params.error();
                }
            }
        }
    };
    request.send();
}