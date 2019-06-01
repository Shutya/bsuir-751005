import React from 'react';
import PropTypes from 'prop-types';
import './NewsItem.less';
import default_image from '../../../assets/default_image.png';

export default class NewsItem extends React.Component {
    render() {
        const { title, content, source, url, urlToImage } = this.props;
        let imageStyle = {
            backgroundImage: `url(${urlToImage || default_image})`
        };

        let filteredContent = content && content.replace(/\[\+\d+ chars\]/g, "");

        return (
            <div className="news-item">
                <a href={url} rel="noopener noreferrer" className="news-item__link-container" target="_blank">
                    <div className="news-item__container"> 
                        <div className="news-item__image" style={imageStyle}></div>
                        <div className="news-item__description-container">
                            <h1 className="news-item__title">{title}</h1>
                            <h3 className="news-item__source">{source.name}</h3>
                            <hr />
                            <p className="news-item__content">{filteredContent}</p>
                        </div>
                    </div>
                </a>
            </div>
        )
    }
}

NewsItem.propTypes = {
    title: PropTypes.string,
    source: PropTypes.shape({
        name: PropTypes.string,
        id: PropTypes.string
    }),
    content: PropTypes.string,
    url: PropTypes.string,
    urlToImage: PropTypes.string,
};