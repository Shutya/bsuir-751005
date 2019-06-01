import EventEmitter from "../common/EventEmitter";

export default class NewsModel extends EventEmitter {
    constructor() {
        super();
        
        this.currentIndex = 0;
        this.items = [];
    }

    addItem(newsItem) {
        this.items.push(newsItem);
        this.emit("newsItemsAdded", [newsItem]);
    }

    addItems(...newsItems) {
        if (newsItems) {
            this.items.push(...newsItems);
            this.emit("newsItemsAdded", newsItems);
        }
    }

    clear() {
        this.currentIndex = 0;
        this.items.length = 0;
        this.emit("cleared");
    }

    getBatch(count) {
        let batch = [];
        while (count > 0) {
            let item = this.items[this.currentIndex];
            if (!item)
                break;
            batch.push(item);
            this.currentIndex++;
            count--;
        }
        return batch;
    }

    getNewsItem(index) {
        return this.items[index];
    }

    get newsItemsCount() {
        return this.items.length;
    }

    hasMore() {
        return this.currentIndex < this.items.length;
    }
}