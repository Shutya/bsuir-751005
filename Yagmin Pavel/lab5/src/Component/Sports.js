import React, {Component} from 'react';
import App from "../App.js";

class Sports extends Component {
    constructor(props) {
        super(props);

        this.state = {
            num: 0,
            articles: [],
        };
    }

    componentDidMount() {
        fetch('https://newsapi.org/v2/everything?' +
            'q=Sports&' +
            'from=2019-05-21&' +
            'sortBy=popularity&' +
            'apiKey=62b6b9e65efb4ecf9b6ec3626214bbc1')
            .then(response => response.json())
            .then(data => this.setState({articles: data.articles}));
    }

    showMore() {
        this.props.num += 5
    }

    render() {
        const {articles} = this.state;
        return (
            <div>
                <nav className="red lighten-4">
                    <div className="nav-wrapper">
                        <ul className="left">
                            <li><a onClick={App.showBusinessNews} href="#root">Business</a></li>
                            <li><a onClick={App.showEntertainmentNews} href="#root">Entertainment</a></li>
                            <li><a onClick={App.showHealthNews} href="#root">Health</a></li>
                            <li><a onClick={App.showScienceNews} href="#root">Science</a></li>
                            <li><a onClick={App.showSportsNews} href="#root">Sports</a></li>
                        </ul>
                    </div>
                </nav>
                {articles.map(article =>
                    <div class="card middle">
                        <div class="card-image waves-effect waves-block waves-light">
                            <img class="activator" src={article.urlToImage}/>
                        </div>
                        <div class="card-content">
                            <span class="card-title activator grey-text text-darken-4">{article.author}</span>
                            <p><a href={"articles[0].url"}>link</a></p>
                        </div>
                        <div class="card-reveal">
                        <span class="card-title grey-text text-darken-4"><i
                            class="material-icons right">close</i></span>
                            <p>{article.content}</p>
                        </div>
                    </div>
                )
                }
                <button class="waves-effect waves-light btn-small red lighten-4 z-depth-2">Show more</button>
            </div>
        )
    }
}

export default Sports;