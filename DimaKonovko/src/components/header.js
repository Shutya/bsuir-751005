import React from "react";

const API_KEY = "c86341bb69c8489b916f7c215024b869";

class Header extends React.Component {

    getNews(newsType) {
        const eachRow = `<div className='row'>
        <a href='<HREF>'><h3 className='title'><TITLE></h3></a>
        <img src='<SRC>'>
        <p className='decription'><DESCRIPTION></p>
        </div>`;

        const req = new Request(`https://newsapi.org/v2/everything?q=${newsType}&from=2019-05-21&sortBy=popularity&apiKey=${API_KEY}`);
        fetch(req)
            .then(function(response) {
                return response.json();
            })
            .then(res => res.articles)
            .then(function(res) {
                const object = document.getElementById("list");
                object.innerHTML = ``;
                for (let i = 0; i < 100; i++) {
                    let content = eachRow;
                    content = content.replace('<TITLE>', res[i].title);
                    content = content.replace('<HREF>', res[i].url);
                    content = content.replace('<SRC>', res[i].urlToImage);
                    content = content.replace('<DESCRIPTION>', res[i].content);
                    object.innerHTML += content;
                }
            })
    }

    render() {
        return (
            <div>
                <header className="main-header">
                    <nav className="header-menu">
                        <ul className="header-menu-list">
                            <a className="header-menu-list-item" onClick={this.getNews('Sport')}>
                                <li>Sport</li>
                            </a>
                            <a className="header-menu-list-item" onClick={() => {this.getNews('Technology')}}>
                                <li>Technology</li>
                            </a>
                                <a className="header-menu-list-item" onClick={() => {this.getNews('Health')}}>
                                <li>Health</li>
                            </a>
                            <a className="header-menu-list-item" onClick={() => {this.getNews('Science')}}>
                                <li>Science</li>
                            </a>
                            <a className="header-menu-list-item" onClick={() => {this.getNews('Entertaiment')}}>
                                <li>Entertaiment</li>
                            </a>
                        </ul>
                    </nav>
                </header>
                <div className="content-row">
                    <div id="list"></div>
                </div>
            </div>
        );
    }

}

export default Header;




