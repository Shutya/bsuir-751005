let apiKey = 'apiKey=28c798263f8c4e95ae9838879059e3f5';
let ShowFirstNews=5;
let urlNow ='';
let CountNews = 5;
let resourcesCount = 7;
import model from './model.js';

let controller = {
    
    init: function(){
        urlNow= 'https://newsapi.org/v2/top-headlines?country=us'; 
        model.getContent('https://newsapi.org/v2/sources?'+apiKey,'List', resourcesCount);
        model.getContent(urlNow+'&pageSize=5&' + apiKey,'Text', CountNews);
        for (let i = 0; i<resourcesCount; i++)
            document.getElementById('header__list__btn'+String(i)).addEventListener('click', function(){
                CountNews = 5;  
                let idSources = document.getElementById('header__list__btn'+String(i)).getAttribute('data-id');  
                urlNow= 'https://newsapi.org/v2/top-headlines?sources=' + idSources;                                                                         //|+
                model.getContent(urlNow + '&pageSize='+ ShowFirstNews +'&' + apiKey,'Text',CountNews);
            });
        document.getElementById('btn-load-more').addEventListener('click', function(){
            CountNews += 5;
            model.getContent(urlNow+ '&pageSize='+CountNews+'&' + apiKey,'Text', CountNews);
            return false;

        });
        document.getElementById('header__search-btn').onclick = function(){
            let searchText = document.getElementById('header__searth-text');
            CountNews = 5;
            urlNow= 'https://newsapi.org/v2/everything?q='+searchText.value;
            model.getContent(urlNow+'&pageSize='+CountNews+'&'+apiKey,'q',CountNews);              
        };
        
        document.getElementById('header__search-text').addEventListener('keyup', function(e){
            if (e.keyCode === 13){        
                document.getElementById('header__search-btn').click();
                return false;
            }
        });
        
    }
};
export default controller;