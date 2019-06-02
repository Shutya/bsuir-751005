import React from 'react';
import News from './News.js'

function NewsList({newsList}){
    const list = newsList.map(news => <News data = {news}/>)
    return(list)
}
export default NewsList
