export default class View{
    renderItem(item, data){
      item.querySelector('.news__picture').style.backgroundImage = `url(${data.urlToImage})`;
      item.querySelector('.news__title').textContent = data.title;
      item.querySelector('.news__source').textContent = data.source.name;
      item.querySelector('.news__text').textContent = data.description;
      item.querySelector('.news__link').setAttribute('href', data.url);
      return item;
    }

    renderItems(newsCount, data){
      const fragment = document.createDocumentFragment();
      const news_template = document.querySelector('#news-template');
      for (let i = 0; i < newsCount; i++) {
        const item = (news_template.content) ? news_template.content.cloneNode(true).querySelector('.news-template__item') 
          : news_template.querySelector('.news-template__item').cloneNode(true);
        const child = this.renderItem(item, data[i]);
        fragment.appendChild(child);
      }
      return fragment;  
    }
}