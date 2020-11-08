import view from './view.js';
let maxCountNews = 40;

// rename to model+
let model = {
    
    getContent: function(url,str, countNews){
        let req = new Request(url); 
        fetch(req)
            .then(function(response){
                return response.json();
            }).then(function(data){
                if (data.status == 'ok'){
                    console.log(url);
                    console.log(data);
                    if (str =='List')
                        view.displaySourcesList(data, countNews);
                    else
                        model.doText(data, countNews);
                    
                }
            });
    },   

    createText:function(data, n){
        let output ='';
        for (let i = 0; i<n; i++){ 
            let urlToImage = data.articles[i].urlToImage;
            let title = data.articles[i].title;
            let description = data.articles[i].description;
            let source =  data.articles[i].source.name;
            if (description==null) 
                description='';
            if (urlToImage ==null)
                urlToImage='./picture/pic.png';
            let url = data.articles[i].url;
            output +='<li><img src=' + urlToImage+'><a href=' + url + ' <h3>' + title + '</h3></a><h6>' + source +'</h6><p>' + description + '</p></li>';
            
        }
        
        view.displayText(output);

    },
    doText: function(data, countNews){
        //document fragment 
        let n;
        if (data.articles.length < countNews)
            n = data.articles.length;
        else
            n = countNews;

        if (n == 0){            
            view.displayNothing();
            view.hideButton();
            return;
        }
        view.showButton();
        if ( (data.articles.length == data.totalResults) || (n == maxCountNews) ) // const something = 40+
            view.hideButton();
            // wrap into function+
        model.createText(data, n);       
        
    }
  
};
export default model;