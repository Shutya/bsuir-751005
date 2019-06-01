import EventEmitter from "../common/EventEmitter";


export default class NewsController extends EventEmitter {
    constructor(model, view) {
        super();
        let self = this;
        this.view = view;
        this.model = model;

        this.model.on("newsItemsAdded", () => {
            if (self.view.newsViewCount < self.view.maxNewsItemsViewCount) {
                let batch = self.model.getBatch(self.view.maxNewsItemsViewCount - self.view.newsViewCount);
                self.view.addNewNewsItems(...batch);
            }
            if (self.model.hasMore())
                self.view.showLoadMoreButton();
            else
                self.view.hideLoadMoreButton();
            if (self.model.newsItemsCount === 0) {
                self.view.showNotFound();
            }
        });
        this.view.on("loadMoreFired", batchCount => {
            let batch = self.model.getBatch(batchCount);
            self.view.addNewNewsItems(...batch);
            if (!self.model.hasMore()) {
                self.view.hideLoadMoreButton();
                self.emit("loadMoreFired", batchCount);
            } else {
                self.view.showLoadMoreButton();
            }
        });
        this.model.on("cleared", () => {
            self.view.clearAllNews();
            self.view.hideLoadMoreButton();
            self.view.hideNotFound();
        });
    }

    addNewsItems(...newsItem) {
        this.model.addItems(...newsItem);
    }
}