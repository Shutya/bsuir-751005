import EventEmitter from "../common/EventEmitter";
import default_image from "../../assets/default_image.png";

export default class NewsView extends EventEmitter {
    constructor(element) {
        super();
        let self = this;
        this.element = element;
        this.element.querySelector(".news__load-more").addEventListener("click", () => 
            self.loadMore()
        );

        this.newsViewBatchCount = 5;

        this.flushMaxNewsViewCount(this.newsViewBatchCount);
        this.newsItemsViewCount = 0;
        this.hideLoadMoreButton();
        this.hideNotFound();
    }
    
    initializeNewNewsItem(node, itemData) {
        node.querySelector(".news-item__title").textContent = itemData.title;
        node.querySelector(".news-item__content").textContent = 
            itemData.content ? itemData.content.replace(/\[\+\d+ chars\]/g, "") : ""                                                                                                        ;
        node.querySelector(".news-item__image").setAttribute("style", 
            "background-image: url(" + (itemData.urlToImage || default_image) + ");");
        node.querySelector(".news-item__link-container").setAttribute("href", itemData.url);
        node.querySelector(".news-item__source").textContent = itemData.source.name;
        return node;
    }

    addNewNewsItems(...itemsData) {
        const template = document.getElementById("newsItem-tpl");

        let container = this.element.getElementsByClassName("news__container")[0];

        itemsData.forEach(itemData => {
            if (this.newsItemsViewCount < this.maxNewsItemsViewCount) {
                let clone = template.content.querySelector(".news-item").cloneNode(true);
                clone = this.initializeNewNewsItem(clone, itemData);
                container.appendChild(clone);
                this.newsItemsViewCount++;
            }
        });
        if (this.newsItemsViewCount === this.maxNewsItemsViewCount) {
            this.hideLoadMoreButton();
        }
    }

    clearAllNews() {
        Array.from(this.element.getElementsByClassName("news-item")).forEach(node => 
            node.parentNode.removeChild(node)
        );
        this.newsItemsViewCount = 0;
        this.maxNewsItemsViewCount = 0;
    }

    hideLoadMoreButton() {
        this.element.querySelector(".news__load-more").classList.add("hidden");
    }

    showLoadMoreButton() {
        this.element.querySelector(".news__load-more").classList.remove("hidden");
    }

    flushMaxNewsViewCount() {
        this.currentMaxNewsViewCount = 0;
    }

    set maxNewsItemsViewCount(value) {
        this.currentMaxNewsViewCount = Math.min(value, 40);
    }

    get maxNewsItemsViewCount() {
        return this.currentMaxNewsViewCount;
    }

    get newsViewCount() {
        return this.newsItemsViewCount;
    }

    set newsItemsViewBatchCount(value) {
        this.newsViewBatchCount = value;
    }

    get newsItemsViewBatchCount() {
        return this.newsViewBatchCount;
    }

    showNotFound() {
        let newsNotFoundNode = this.element.querySelector(".news__not-found");
        newsNotFoundNode.classList.remove("hidden");
    }


    hideNotFound() {
        let newsNotFoundNode = this.element.querySelector(".news__not-found");
        newsNotFoundNode.classList.add("hidden");
    }

    loadMore() {
        this.hideLoadMoreButton();
        this.maxNewsItemsViewCount += this.newsViewBatchCount;
        if (this.maxNewsItemsViewCount > this.newsViewCount)
            this.emit("loadMoreFired", this.maxNewsItemsViewCount - this.newsViewCount);
    }
}