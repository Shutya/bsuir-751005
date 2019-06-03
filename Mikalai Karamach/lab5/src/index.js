import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import sleep from './sleep';

let Appl = new App();
export default Appl;
var BoundRender = Appl.render.bind(Appl);
justDoIt();

async

function justDoIt() {
    await
    Appl.init();
    while (!Appl.CurrSources.response || !Appl.CurrNewsList.response)
        await
    sleep(1);
    ReactDOM.render( < BoundRender / >, document.getElementById('root')
)
    ;

    setEventHandlers();
};

function setEventHandlers() {
    document.getElementById("moreNewsBtn").addEventListener("click", async

    function (e) {//(e) =>
        Appl.currDisplayed += Appl.newsBlockSize;
        if (Appl.currDisplayed >= Appl.maxDisplayed) {
            Appl.currDisplayed = Appl.maxDisplayed;
            document.querySelector(".moreNewsBtn").style.display = 'none';
        }
        ReactDOM.render( < BoundRender / >, document.getElementById('root')
    )
        ;
        if (Appl.CurrNewsList.noMoreNews)
            document.querySelector(".moreNewsBtn").style.display = 'none';
        setEventHandlers();
    }

)
    ;

    [...document.getElementsByClassName("sourceBtn")
].
    forEach((e) = > {
        e.addEventListener("click", async

    function (ev) {
        console.log("CLICk");
        Appl.currRequest = Appl.newsApiWD + `top-headlines?sources=${ev.target.id}&apiKey=${Appl.apiKey}`;
        await
        refreshNews();
        console.log("END REFRESH");
    }

)
    ;
})
    ;

    document.getElementById("searchBtn").addEventListener("click", async

    function (e) {
        const req = document.getElementById("searchInput").value;
        Appl.currRequest = Appl.newsApiWD + `top-headlines?q=${req}&sortBy=popularity&apiKey=${Appl.apiKey}`;
        if (req.trim()) {
            await
            refreshNews();
        }
        ;
    }

)
    ;

    document.getElementById("searchInput").addEventListener("keyup", function (e) {
        if (e.keyCode === 13) document.getElementById("searchBtn").click();
    });
}

async

function refreshNews() {
    console.log("refresh!")
    document.querySelector(".moreNewsBtn").style.display = 'unset';
    Appl.currDisplayed = 5;
    await
    Appl.getCurrNewsList();
    while (!Appl.CurrNewsList.response) {
        await
        sleep(1);
        console.log("sleeeep!")
    }
    ReactDOM.render( < BoundRender / >, document.getElementById('root')
)
    ;
    if (Appl.CurrNewsList.noMoreNews)
        document.querySelector(".moreNewsBtn").style.display = 'none';
    setEventHandlers();
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
