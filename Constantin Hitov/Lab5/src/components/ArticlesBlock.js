import React from 'react';
import {Component} from 'react';
import Article from './Article';
import {GetArticles} from '../MainProcedures';

class  ArticlesBlock extends Component{

    constructor(params){
        super();
        this.ref = params._ref;
        this.state = {
            newsBlocks: [],
            currentPage: 1,
            pageSize: 5
        }

    }

    LoadNews = async (q, source) => {
        const newArticles = await this.LoadNewsRequest(q, source);
        return newArticles;
    }

    async componentDidMount(){
        const newArticles = await this.LoadNews('', '');
        this.AddArticles(newArticles);
    }

    render(){
        return(
            <div id='articles' className='container' ref={this.ref}>
                {this.state.newsBlocks}
            </div>
        )
    }

    LoadNewsRequest = async (q, source) => {
        const newArticles = await GetArticles(this.state.currentPage++, this.state.pageSize, q, source);
        return newArticles.articles;
    }

    AddArticles = (newArticles) => {
        newArticles = newArticles.map((x) => {
            return <Article article={x}/>;
        });

        this.setState({
            newsBlocks : this.state.newsBlocks.concat(newArticles)
        }
        );
    }

}


export default ArticlesBlock
