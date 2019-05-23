"use strict"

const API_KEY = "8c2a4b8a22e14e04889f9654938a8438"
const PAGES_COUNT = 8
const PER_PAGE = 5
const NO_PHOTO = 'http://www.fsxaddons.com/static/img/no-preview.jpg'

var current_page = 1
var curr_source = 'none'
var curr_text = ''

function createArticle(article) {

   var item = document.createElement('article')
   item.className = "main"

   var cardHeader = document.createElement('div')
   var cardBody = document.createElement('div')
   cardHeader.className = "article-head"
   cardBody.className = "article-body"

   var header = document.createElement('h2')
   var linkHeader = document.createElement('a')
   linkHeader.setAttribute("href", article.url)
   linkHeader.textContent = article.title
   header.appendChild(linkHeader)

   var publish = document.createElement('div')
   var publishData = document.createElement('p')
   var date = new Date(article.publishedAt);
   publish.className = "article-properties"
   publishData.textContent = date.getDate() + '.' + (date.getMonth() + 1) + '.' + date.getFullYear() 
                              + ' ' + date.getHours() + ':' + date.getMinutes() 
                              + ' (' + (article.author == null ? article.source.name : article.author) + ')'
   publish.appendChild(publishData)

   cardHeader.appendChild(header)
   cardHeader.appendChild(publish)

   var img = document.createElement('img')
   img.setAttribute("src", article.urlToImage == null ? NO_PHOTO : article.urlToImage)
   img.setAttribute("alt", article.title)
   img.setAttribute("class", "img-preview")

   var desc = document.createElement('p')
   desc.textContent = article.description

   cardBody.appendChild(img)
   cardBody.appendChild(desc)

   item.appendChild(cardHeader)
   item.appendChild(cardBody)

   return item;
}

function loadNews() {
   var url = 'https://newsapi.org/v2/top-headlines?language=en&apiKey='
   + API_KEY + '&page=' + (current_page++) + '&pageSize=' + PER_PAGE

   if(curr_text != '') {
      url += '&q=' + curr_text
   }

   if(curr_source != 'none') {
      url += '&sources=' + curr_source
   }

   var request = new Request(url)
   fetch(request).then(function(response) {
      return response.json();
   }).then(function(json){

      var news = document.getElementById('NewsContainer')

      var articles = json.articles
      if(json.status) {
         articles.forEach(function(article) {
           news.appendChild(createArticle(article))
         })

         if( (articles.length == 0) || (current_page == (PAGES_COUNT + 1)) ){
            var moreNews = document.getElementById('more_news')
            moreNews.style.display = 'none'
         }   

         if( (articles.length == 0) && (current_page > 1)){ 
            var noNews = document.getElementById('NewsContainer')
            if(noNews.innerHTML == '') {
               noNews.innerHTML = 'There are no articles matching your request'
            }
         }

      }

   })

}

function loadSources() {
   var url = 'https://newsapi.org/v2/sources?country=us&language=en&apiKey=' + API_KEY       

   var request = new Request(url)
   fetch(request).then(function(response) {
      return response.json();
   }).then(function(json){
      var select = document.getElementById("searchSource");

      if(json.status) {
         var sources = json.sources
         sources.forEach(function(source) {
            var e = document.createElement("option")
            e.textContent = source.name
            e.value = source.id
            select.appendChild(e)
         })
      }
   })
}

function search() {
   var newsContainer = document.getElementById('NewsContainer')
   var searchInput = document.getElementById('searchInput')
   var searchSource = document.getElementById('searchSource')

   newsContainer.innerHTML = ''
   current_page = 1

   curr_source = searchSource.value
   curr_text = searchInput.value

   loadNews()     
}

var moreNews = document.getElementById('more_news')
moreNews.onclick = function() {
   loadNews()
}

var searchInput = document.getElementById('searchInput')
var searchButton = document.getElementById('searchButton')
var searchSource = document.getElementById('searchSource')

searchSource.onchange = function() {
   search() 
}

searchInput.onkeypress = function(e) {
   if (e.which == 13) {
      search()
   }
}

searchButton.onclick = function() {
   search()
}

loadNews()
loadSources()
