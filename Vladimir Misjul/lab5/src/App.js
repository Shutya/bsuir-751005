import React from 'react';
import './App.css';
 
class NewsSource extends React.Component {
  render() {
    return <div className="news-source" onClick={() => this.props.selectSource(this.props.id)}>{this.props.name}</div>;
  }
}
 
class NewsCard extends React.Component {
  render() {
    return <div className="news-card" onClick={this.navigate.bind(this)}>
      <h2>{this.props.title}</h2>
      <p>{this.props.description}</p>
      <a href={this.props.url}>Read more</a>
    </div>;
  }
 
  navigate() {
    window.location.href = this.props.url;
  }
}
 
class App extends React.Component {
 
  constructor(props) {
    super(props);
    this.state = {
      query: "",
      source: "",
      articles: [],
      sources: [],
      newsCount: 0
    };
  }
 
  componentDidMount() {
    this.getArticlesWithSources();
  }
 
  render() {
    return <div>
      {this.renderNewsSources()}
      {this.renderNewsSearch()}
      {this.renderNewsCards()}
      {this.renderShowMore()}
    </div>;
  }
 
  renderNewsSources() {
    var newsSources = this.state.sources.map((source, index) =>
      <NewsSource key={index} name={source.name} id={source.id} selectSource={this.selectSource.bind(this)} />
    );
    return <div className="news-sources">
      {newsSources}
    </div>;
  }
 
  renderNewsSearch() {
    return <div className="news-search">
      <input
        type="text"
        value={this.state.query}
        onChange={this.handleChange.bind(this)}
        placeholder="Search..."
      />
    </div>;
  }
 
  renderNewsCards() {
    var newsCards = this.state.articles.slice(0,this.state.newsCount).map((article, index) =>
      <NewsCard key={index} title={article.title} description={article.description} url={article.url} />
    );
    if (!newsCards.length) {
      return <div className="news-cards">There are no articles matching your request.</div>;
    }
    return <div className="news-cards">
      {newsCards}
    </div>;
  }
 
  renderShowMore() {
    if (this.state.newsCount < this.state.articles.length) {
      return <div className="show-more" onClick={this.showMore.bind(this)}>Show more</div>;
    }
  }
 
  async getArticlesWithSources() {
    var sources = await this.props.newsService.getSources();
    var articles = await this.props.newsService.getArticles(this.state.query, this.state.source);
    this.setState({ sources: sources, articles: articles, newsCount: 5 });
  }
 
  async getArticles() {
    var articles = await this.props.newsService.getArticles(this.state.query, this.state.source);
    this.setState({ articles: articles, newsCount: 5 });
  }
 
  handleChange(e) {
    this.setState({ query: e.target.value });
    this.getArticles();
  }
 
  async selectSource(id) {
    var articles = await this.props.newsService.getArticles(this.state.query, id);
    this.setState({ source: id, articles: articles, newsCount: 5 });
  }
 
  showMore() {
    this.setState({newsCount: this.state.newsCount + 5});
  }
}
 
export default App;