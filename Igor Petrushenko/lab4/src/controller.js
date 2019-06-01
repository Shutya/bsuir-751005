import View from './view';

export default class Controller {
    constructor(){
        this.ApiKey = 'apiKey=8bc4b0e702df492aa1ec9ce419f2a811';
        this.pageToShow = 0;
        this.lastAPIUrl = '';        
        this.pageToShow = 0;      
        this.view = new View();
    }

    getNewResources(){
         let newsAPIUrl =  'https://newsapi.org/v2/sources?' + this.ApiKey;
         let request = new Request(newsAPIUrl);
         
         fetch(request)
           .then((response) => {
               return response.json();
           })
           .then((data) => {
                for (let i = 0; i < data.sources.length; i++) {
                    document.querySelector('#resources').innerHTML +=
                    `<button class="btn btn__sources" id="` + data.sources[i].id + `">` 
                    + data.sources[i].name + `</button>`;
              } 
           });
    }

    getNewsBySearch(urlPart){
        document.querySelector('#error-block').style.display = 'none';
        let newsAPIUrl = 'https://newsapi.org/v2/' + urlPart + this.ApiKey;
        let request = new Request(newsAPIUrl);

        fetch(request)
          .then((response) => { 
                return response.json(); 
            })
          .then((data) => {
              this.processNewsBySearch(data);
              this.pageToShow = 2;
              this.lastAPIUrl = newsAPIUrl;
          });
    }

    processNewsBySearch(data){
        const newsCount = data.articles.length;
        const newsItems = document.querySelector('#news');
        newsItems.innerHTML = '';
       
        if(newsCount == 0){
            document.querySelector('#error-block').style.display = 'unset';  
            document.querySelector('#loadButton').style.display = 'none';
            return;
        }      
  
        const renderedItems = this.view.renderItems(newsCount, data.articles);
        newsItems.appendChild(renderedItems);
  
        const minDisplayedNews = 5;
  
        if(newsCount < minDisplayedNews)
            document.querySelector('#loadButton').style.display = 'none';
        else
            document.querySelector('#loadButton').style.display = 'unset';
        this.newsDisplayed = newsCount;  
      }

    appendNews(){
        this.lastAPIUrl = this.lastAPIUrl.replace(new RegExp('page=.*&'), 'page=' + this.pageToShow + '&');
        let request = new Request(this.lastAPIUrl);

        fetch(request)
          .then((response) => { 
              return response.json(); 
            })
          .then((data) => {
              this.processAppendNews(data);
              this.pageToShow++;
          });
    }

    processAppendNews(data){
        const newsCount = data.articles.length;
        if(newsCount == 0){
            document.querySelector('#loadButton').style.display = 'none';
            return;
        }    
  
        const renderedItems = this.view.renderItems(newsCount, data.articles);
        const newsItems = document.querySelector('#news');
        newsItems.appendChild(renderedItems);
  
        this.newsDisplayed += newsCount;
        const minDisplayedNews = 5, maxDisplayedNews = 40;
  
        if(newsCount < minDisplayedNews || this.newsDisplayed == maxDisplayedNews)
           document.querySelector('#loadButton').style.display = 'none';
      }

    start(){
        this.getNewResources();
        this.getNewsBySearch('top-headlines?country=us&pageSize=5&page=1&');

        document.querySelector('#resources').addEventListener('click', (event) =>{
            this.getNewsBySearch(`everything?sources=${event.target.id}&pageSize=5&page=1&`);
          });

        document.querySelector('#loadButton').addEventListener('click', () => {
            this.appendNews();   
        });

        document.querySelector('#search-btn').addEventListener('click', () => {
            const query = document.querySelector('#search-field').value;
            if(query.length > 0){
                this.getNewsBySearch(`everything?q=${query}&pageSize=5&page=1&`);
                query.length = 0;
            }
        });
          
        document.querySelector('#search-field')
              .addEventListener('keyup', (event) => {
              event.preventDefault();
              if (event.keyCode === 13) {
                  document.querySelector('#search-btn').click();
              }
        });
    }
}