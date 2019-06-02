import React from 'react';
import Article from './Article';

export default class News extends React.Component {
    render() {
        return (
            <div className="contentWrapper">
                {
                    this.props.loaded.map((article, index) => 
                        <Article 
                            key={index}
                            article={article}
                        />
                    )
                }
            </div>
        );
    }
}