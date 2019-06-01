import EventEmitter from "../common/EventEmitter";
import AppModel from "../model/AppModel";
import AppView from "../view/AppView";
import NewsController from "./NewsController";
import SourcesController from "./SourcesController";
import NewsSelector from "../model/NewsSelector";

export default class AppController extends EventEmitter {
    constructor() {
        super();
        let self = this;

        this.newsSelector = new NewsSelector();
        this.currentNewsSelector = new NewsSelector();

        this.view = new AppView();
        this.model = new AppModel();

        this.newsController = new NewsController(this.model.newsModel, this.view.newsView);
        this.sourcesController = new SourcesController(this.model.sourcesModel, this.view.sourcesView);

        this.sourcesController.on("sourceEnabled", sourceId => 
            self.newsSelector.enableSource(sourceId)
        );
        this.sourcesController.on("sourceDisabled", sourceId => 
            self.newsSelector.disableSource(sourceId)
        );
        this.view.on("searchClicked", () => {
            self.currentNewsSelector = self.newsSelector.copy();
            self.currentNewsSelector.setQuery(self.view.getQuery());
            self.model.newsModel.clear();
            self.view.newsView.loadMore();
        });
        this.newsController.on("loadMoreFired", count => {
            if (!self.currentNewsSelector.getEnd()) {
                self.loadNewsBatch(count);
            }
        });
    }

    async loadSources() {
        let sources = await this.model.newsLoader.querySources();
        if (sources.status == "ok")
            this.model.sourcesModel.addSources(sources.sources);
        return;
    }

    async loadNewsBatch(count) {
        while (count > 0) {
            let queryEndpoint = this.currentNewsSelector.getQueryEndpoint();
            let params = this.currentNewsSelector.getQueryParameters();
            let news = await this.model.newsLoader.query(queryEndpoint, params);
            if (news.status === "ok") {
                this.newsController.addNewsItems(...news.articles);
                count -= news.articles.length;
            }
            if (news.status !== "ok" || news.articles.length < params.pageSize) {
                this.currentNewsSelector.setEnd();
                break;
            }
        }
    }

    async run() {
        this.loadSources();
        this.view.newsView.loadMore();
    }
}