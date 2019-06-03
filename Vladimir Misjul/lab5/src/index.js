import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import NewsService from './NewsService';

ReactDOM.render(<App newsService={new NewsService("04aeed58493e4c7c99829c4b1f97d4f6")}/>, document.getElementById('root'));
