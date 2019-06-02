import React from 'react';

export default class Footer extends React.Component {
    render() {
        return (
            <footer className="sticky">
                <p className="poweredBy">
                    Powered by 
                    <a href="https://newsapi.org">
                        NewsAPI
                    </a>
                </p>
            </footer>
        );
    }
}
