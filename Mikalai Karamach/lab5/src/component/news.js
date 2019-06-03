import React, {PureComponent} from 'react'

export default class News extends PureComponent {
    render() {
        var style = {
            backgroundImage: `url(${this.props.article.urlToImage})`
        };
        return (
            < div
        id = "news"
        className = "news" >
            < div
        className = "newsPicture"
        style = {style} > < /div>
            < div
        className = "newsContent" >
            < a
        className = "newsLink"
        href = {this.props.article.url
    }>
    <
        h2
        className = "newsHeadline" > {this.props.article.title
    }<
        /h2>
        < span
        className = "newsSource" > {this.props.article.source.name
    }<
        /span>
        < article
        className = "newsDescription" > {this.props.article.description
    }<
        /article>
        < /a>
        < /div>
        < /div>
    )
    }
}