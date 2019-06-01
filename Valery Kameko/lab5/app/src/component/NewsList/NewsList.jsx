import React from 'react';
import './NewsList.less';
import PropTypes from 'prop-types';
import NewsItem from '../NewsItem/NewsItem';

export default class NewsList extends React.Component {
    render() {
        const { news } = this.props;

        return (
            <div className="news">
                <div className="news__container">
                    {news.map((newsItem, index) =>(
                        <NewsItem 
                            title={newsItem.title}
                            url={newsItem.url}
                            urlToImage={newsItem.urlToImage}
                            content={newsItem.content}
                            source={newsItem.source} 
                            key={index}/>
                    ))}
                </div>
            </div>
        )
    }
}

NewsList.propTypes = {
    onChangeChoosed: PropTypes.func,
    news: PropTypes.arrayOf(PropTypes.shape({
        title: PropTypes.string,
        url: PropTypes.string,
        urlToImage: PropTypes.string,
        content: PropTypes.string,
        source: PropTypes.shape({
            id: PropTypes.string,
            name: PropTypes.string
        })
    }))
};