import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import NewsMain from "./NewsMain/NewsMain";
import NewsSrcs from './NewsSrcs/NewSrcs';
import Header from './Header/Header';
import "./index.css";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            srcs: [],
            partOfUrl: "",
            lastPartOfUrl: "",
            amount: 0,
            data: [],
            dataForDisplay: [],
            hidden: false
        };
    }


    componentDidMount(){
        axios.get('https://newsapi.org/v2/sources?language=en&apiKey=8d19f90851f74f38b619e1bbd64c281e')
        .then(response => this.setState({srcs: response.data.sources}))

        let btnNews = document.getElementById("btn_upload_news");
        
        window.addEventListener("scroll", function(){
            if (window.scrollY >= 190)
                btnNews.className += " btn_fixed";
            else
                btnNews.className = "btn_news";
        });
    }

   shouldComponentUpdate(){
        console.log("-----UPD----");
        console.log(this.state);
        return true;
   }

    srcClickHander = (e) =>{
        if (e.target.className.indexOf("src") !== -1){
            let newUrlPart = e.target.className.slice(4, e.target.className.length);
            if ((this.state.partOfUrl === "") || (newUrlPart !== this.state.partOfUrl)){
                this.setState({partOfUrl: e.target.className.slice(4, e.target.className.length)}); 
                this.getNews(newUrlPart);
            }else{
                console.log("nea");
            }
        }
    }

    uploadNewsHandler = () =>{
        let newAmount = this.state.amount + 5;
        
        let btnNews = document.getElementById('btn_upload_news'); 
        if (this.state.data.length <= newAmount){
            newAmount = this.state.data.length;    
            this.setState({hidden:  true});
            btnNews.style.display = "none";           
        }else{
            if(this.state.hidden){
                this.setState({hidden: false});    
                btnNews.style.display = "block";
            }
        }    

        console.log(newAmount);
        let newArticles = this.state.dataForDisplay.slice(0, newAmount);
        this.setState({amount: newAmount});
        this.setState({dataForDisplay: newArticles});
        console.log("-----");
        console.log(this.state.amount);
    }

    getNews = (part) => {
        let url = `https://newsapi.org/v2/everything?${part}language=en&apiKey=8d19f90851f74f38b619e1bbd64c281e`;
        console.log(url);
        axios.get(url)
        .then((response) => {
            let newAmount = 5;
            let btnNews = document.getElementById('btn_upload_news'); 
            if (response.data.articles.length <= 5){
                newAmount = response.data.articles.length;    
                this.setState({hidden:  true});
                btnNews.style.display = "none";           
            }else{
                if(this.state.hidden){
                    this.setState({hidden: false});    
                    btnNews.style.display = "block";
                }
            }    
            this.setState({amount: newAmount})
            let articles = response.data.articles.slice(0, 5);
            console.log(articles);
            this.setState({data: response.data.articles});
            this.setState({dataForDisplay: articles});
        })
    }

    findHandler = (request) => {
        console.log("------------");
        console.log(request);
        if(request != null){
            let src = `q=${request}&from=2019-05-20&sortBy=popularity&`;
            this.setState({partOfUrl: src});
            this.getNews(src);
        }
    }

    render(){
        return(
            <div>
                <Header findHandler = {this.findHandler}/>
                <NewsSrcs data = {this.state.srcs} handler = {this.srcClickHander} uplNews = {this.uploadNewsHandler}/>
                <NewsMain amount = {this.state.amount}  data = {this.state.amount !== 0 ? this.state.data : []}/>
                <footer>
                    
                </footer>
            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById("root"));


