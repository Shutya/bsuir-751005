//rename to view+
let view = {
    
    displayText: function(output){
        let listNews = document.getElementById('news');
        listNews.innerHTML = output;
        return;
    },
    displaySourcesList: function(output, CountNews){
        for(let i = 0; i<CountNews; i++){
            let listNews = document.getElementById('header__list__btn'+String(i));
            listNews.innerHTML = '<a href=#>'+output.sources[i].name;
            listNews.setAttribute('data-id',output.sources[i].id);
        }
    },
    hideButton: function(){
        document.getElementById('btn-load-more').removeAttribute('class');
        document.getElementById('btn-load-more').innerHTML='';
    },
    showButton: function(){
        document.getElementById('btn-load-more').setAttribute('class', 'button');
        document.getElementById('btn-load-more').innerHTML='<li >Load more</li>';
    },
    displayNothing: function(){
        let listNews = document.getElementById('news');
        listNews.innerHTML = '<h4>There are no articles matching your request</h4>';
    }
};
export default view;