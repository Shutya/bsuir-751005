const requestStart = 'https://newsapi.org/v2/top-headlines?';
const country = 'country=ru&';
const subcategories = {
    "Business": 'category=business&',
    "Entertainment": 'category=entertainment&',
    "Health": 'category=health&',
    "Science": 'category=science&',
    "Sports": 'category=sports&',
}
const apiKey = 'apiKey=5bf446ed86c34d97908fedb4b1426d48';


let source_items = document.getElementsByClassName("source-item");
Array.from(source_items).forEach(element => {
    element.addEventListener("click", function(){
        let url = requestStart + country + subcategories[element.innerText] + apiKey;
        let req = new Request(url);
        
        startLoadAnimation();
        fetch(req)
            .then(res => res.json())
            .then(res => res.articles)
            .then(function(res){
                let content = document.getElementById("content");
                content.innerHTML = '';
                stopLoadAnimation();
                for (let i = 0; i < res.length; i++){
                    content.innerHTML += 
                    `<div class="card">
                        <div class="card__meta">
                            <div class="card__meta-photo" style="background-image: url(${res[i].urlToImage});"></div>
                            <div class="card__meta-info">
                                <span>${res[i].publishedAt.toString()}</span>    
                            </div>
                        </div>
                        <div class="card__decription">
                            <h2 class="card__description-title">${res[i].title}</h2>
                            <h3 class="card__description-source">${res[i].source.name}</h3>
                            <p class="card__description-content">${res[i].description}</p>
                            <p class="card__read-more">
                                <a href="${res[i].url}">Read more..</a>
                            </p>
                        </div>
                    </div>`;
                }
                let cards = document.getElementsByClassName("card");
                for (let i = 5; i < cards.length; i++){    // display 5 cards
                    cards[i].style.display = "none";
                }
                cards.length > 5 ? showLoadMore() : hideLoadMore();
            });
    });
});


document.getElementById("load-more").addEventListener("click", function(){
    startLoadAnimation();
    hideLoadMore();
    setTimeout(function(){/* JUST FOR FUN  */
        let cards = Array.from(document.getElementsByClassName("card"));
        let countOfVisualCards = 0;
        cards.forEach(element => {
            if (element.style.display != "none"){
                countOfVisualCards++;
            }
        });
        stopLoadAnimation();
        showLoadMore();
        if (countOfVisualCards + 5 > cards.length){
            for (let i = countOfVisualCards; i < cards.length; i++){
                cards[i].style.display = "flex";
            }
            countOfVisualCards = cards.length;
        }
        else{
            for (let i = countOfVisualCards; i < countOfVisualCards + 5; i++){
                cards[i].style.display = "flex";
            }  
            countOfVisualCards += 5;
        }
        if (countOfVisualCards == cards.length){
            hideLoadMore();
        }
    }, 500);
});


function startLoadAnimation(){
    document.getElementById("circularG").style.display = "block";
}

function stopLoadAnimation(){
    document.getElementById("circularG").style.display = "none";
}

function hideLoadMore(){
    document.getElementById("load-more").style.display = "none";
}

function showLoadMore(){
    document.getElementById("load-more").style.display = "inline";
}
