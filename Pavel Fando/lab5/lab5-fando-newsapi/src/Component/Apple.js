import React, {Component} from 'react';
import App from "../App.js";
import * as ReactDOM from "react-dom";

class Apple extends Component {
    constructor(props) {
        super(props);

        this.state = {
            num: 0,
            articles: [],
        };
    }

    componentDidMount() {
        fetch('https://newsapi.org/v2/everything?' +
            'q=Apple&' +
            'from=2019-05-21&' +
            'sortBy=popularity&' +
            'apiKey=62b6b9e65efb4ecf9b6ec3626214bbc1')
            .then(response => response.json())
            .then(data => this.setState({articles: data.articles}));

    }
     showMore() {
        this.state.num += 5;
    }

    render() {
        let articlesTemp = this.state.articles;
        let articles = articlesTemp.slice(this.state.num, this.state.num+5);
        let newsNum = this.state.num;
        console.log(this.state.num);
        // <App/>??
        return (
            <div>
                <nav className="red lighten-4">
                    <div className="nav-wrapper">
                        <ul className="left">
                            <li><a onClick={App.showAppleNews} href="#root">Apple</a></li>
                            <li><a onClick={App.showSportNews} href="#root">Sport</a></li>
                            <li><a onClick={App.showTechnoNews} href="#root">Technology</a></li>
                            <li><a onClick={App.showHealthNews} href="#root">Health</a></li>
                            <li><a onClick={App.showScienceNews} href="#root">Science</a></li>
                            <li><a onClick={App.showEntertainmentNews} href="#root">Entertainment</a></li>
                        </ul>
                    </div>
                </nav>
                {articles.map(article =>
                    <div key={article.author} className="card middle">
                        <div className="card-image waves-effect waves-block waves-light">
                            <img className="activator" src={article.urlToImage}/>
                        </div>
                        <div className="card-content">
                            <span className="card-title activator grey-text text-darken-4">{article.author}</span>
                            <p><a href={"articles[0].url"}>link</a></p>
                        </div>
                        <div className="card-reveal">
                        <span className="card-title grey-text text-darken-4"><i
                            className="material-icons right">close</i></span>
                            <p>{article.content}</p>
                        </div>
                    </div>

                )

                }
                <button className="waves-effect waves-light btn-small red lighten-4 z-depth-2" onClick={this.showMore.bind(this)}>Show more</button>
            </div>
        )
    }
}

export default Apple;
