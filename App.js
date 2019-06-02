import React, { Component } from 'react';

export default class Main extends Component{

    constructor(props) {
        super(props);
        this.state = {
          sources: [],
          page: 1,
          lastUrl: "",
          newsDisplayed: 0,
          buttonHide: false,
          errorHide: true
        };
        this.load_more_btn_handler = this.load_more_btn_handler.bind(this);
        this.get_source = this.get_source.bind(this);
        /*
       	document.querySelector('#view_source_list').addEventListener('click', 
	    	(event) =>{
	            process_with_search(`everything?sources=${event.target.id}&pageSize=5&page=1&`);
	        });

	    document.querySelector('#load_btn').addEventListener('click', 
	    	() => {
	            add_news();   	
	        });

	    document.querySelector('#search_field_id').addEventListener('keyup', 
	    	(event) => {
	              event.preventDefault();
	              if (event.keyCode == 13) document.querySelector('#btn_search_id').click();
	        });
		*/

        this.filter_handler = this.filter_handler.bind(this);
        this.handleKeyUp = this.handleKeyUp.bind(this);
    }

	get_cur_time(){
		var today = new Date();
		var dd = String(today.getDate()).padStart(2, '0');
		var mm = String(today.getMonth() + 1).padStart(2, '0');
		var yyyy = today.getFullYear();
		today = mm + '/' + dd + '/' + yyyy;
		return '<h1>' + 'Today is: '+ today + '</h1>';
	}

    add_ein_news(doc, data){
    	doc.querySelector('.news_table').innerHTML += '<a class="news_class" href="' + data.url + '">' + data.title + '<br>' + 
		(data.urlToImage ? ('<img src="' + data.urlToImage + '" alt="' + data.url + '"/><br>') : "") + '<hr></a>'
        return doc;
    }

    get_news_source(this_ptr){
        const url = 'https://newsapi.org/v2/sources?apiKey=a2e47115d1424ba98afeedef8beeed98';
        const request = new Request(url);
        fetch(request)
          .then(function(response) { 
          	return response.json(); })
          .then(function(data) {
            this_ptr.setState({ 
            	sources: data.sources 
            })
            // init_news_source(data); 
          });
    }

    process_with_search(cnt_news, data, this_ptr){
    	const news_item = document.querySelector('#news-item-tpl');
    	//lastUsedUrl = lastUsedUrl.substr(0, position + 5) + cur_page + lastUsedUrl.substr(position + 6, lastUsedUrl.length - 1);
        const template_for_doc = document.createDocumentFragment();
        
        for (let i = 0; i < cnt_news; i++) 
        {
          const item = (news_item.content) ? news_item.content.cloneNode(true).querySelector('.news__item') : news_item.querySelector('.news__item').cloneNode(true);
          //const item =  news_item.querySelector('.news__item').cloneNode(true);
          // const item = news_item.content.cloneNode(true).querySelector('.news__item');
          const news = this_ptr	.add_ein_news(item, data[i]);
          template_for_doc.appendChild(news);
        }
        return template_for_doc;
    }

    add_news(urlPart){     
        let this_ptr = this;
        this_ptr.setState(
        	{errorHide: true});
        /*let newsAPIUrl = 'https://newsapi.org/v2/' + main_url + 'apiKey=a2e47115d1424ba98afeedef8beeed98';
        let request = new Request(newsAPIUrl);
        document.getElementById("news").innerHTML = "";*/
        const url = 'https://newsapi.org/v2/' + urlPart + 'apiKey=a2e47115d1424ba98afeedef8beeed98';
        const request = new Request(url);
        fetch(request)
          .then(function(response) { return response.json(); })
          .then(function(data) {  
            const block_of_news = document.querySelector('#news');
            block_of_news.innerHTML = '';
            const cnt_news = data.articles.length;
            /*fetch(request)
	          .then((response) => { 
	                return response.json(); 
	            })
	          .then((data) => {
	          	  cur_page = 2;
	              write_news(data);
	              lastUsedUrl = newsAPIUrl;
	          });*/
            if(!cnt_news){
                this_ptr.setState(
                	{errorHide: false});
                this_ptr.setState(
                	{buttonHide: true});
                return;
            }      
            block_of_news.appendChild(this_ptr.process_with_search(cnt_news, data.articles, this_ptr));
            this_ptr.setState({ 
            	buttonHide: cnt_news < 5, lastUrl: url, page: 2, newsDisplayed: cnt_news });
          });
    }

    load_more_btn_handler(){
        var this_ptr = this;
        var url = this_ptr.state.lastUrl.replace(new RegExp('page=.*&'), 
        										'page=' + this_ptr.state.page + '&');//substr(0, position + 5) + cur_page + lastUsedUrl.substr(position + 6, lastUsedUrl.length - 1);
        this_ptr.setState(
        	{lastUrl: url});
        const request = new Request(url);
        fetch(request)
          .then(function(response) { 
          	return response.json(); })
          .then(function(data) {
            const cnt_news = data.articles.length;
            if(!cnt_news){
                this_ptr.setState({
                	buttonHide: true});
                return;
            }     
            document.querySelector('#news').appendChild(this_ptr.process_with_search(cnt_news, data.articles, this_ptr));
            this_ptr.setState({ page: this_ptr.state.page + 1, newsDisplayed: this_ptr.state.newsDisplayed + cnt_news });
            if(cnt_news < 5 || this_ptr.state.newsDisplayed >= 40){
                this_ptr.setState(
                	{buttonHide: true});
            }
          });
    }

    get_source(event){
        this.add_news(`everything?sources=${event.target.id}&pageSize=5&page=1&`);
    }

    filter_handler(){
        const query = document.querySelector('#search-field').value;
        if(query.length > 0){
            this.add_news(`everything?q=${query}&pageSize=5&page=1&`);
        }
    }

    handleKeyUp(event){
        event.preventDefault();
        if (event.keyCode === 13) {
            document.querySelector('#filter-btn').click();
        }
    }

    componentWillMount(){//start up method
        this.get_news_source(this);
        this.add_news('top-headlines?country=ru&pageSize=5&page=1&');
    }

    render(){
        var btn;
        document.querySelector('#time_').innerHTML = this.get_cur_time();
        if (!this.state.buttonHide){
            btn = <button className="load_more_btn" id="load-btn" onClick={this.load_more_btn_handler}>Load more...</button>
        }
        var errorMsg;
        if (!this.state.errorHide){
            errorMsg = <h2 className="app__main-error" 
            id="error-block">There are no articles matching your request</h2>
        }
        return(
        	
            <main className="app__main">
            	
                <div id="sources" >
                {this.state.sources.map((source, i) => {
                    return (
                        <button className="source_btn" 
                        key={i} id={source.id} onClick={this.get_source}>{source.name}</button>
                    );
                })}
                </div>

                <div className="app__main-search">
               		
                    <input className="search_field" type="search" maxLength="40" placeholder="Enter query" 
                    id="search-field" onKeyUp={this.handleKeyUp}/>
                    <button className="search_btn" id="filter-btn" onClick={this.filter_handler}>Search</button>

                </div>
                <br/>
                <br/>
                <hr class="main_line"/>
            <div id="news" className="app__main-news"></div>
            <br/>
            {errorMsg}
            {errorHandler}
            {btn}
            </main>
        );
    }
}