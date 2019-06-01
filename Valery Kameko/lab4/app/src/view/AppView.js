import EventEmitter from "../common/EventEmitter";
import SourcesView from "./SourcesView";
import NewsView from "./NewsView";

export default class AppView extends EventEmitter {
    constructor() {
        super();
        let self = this;

        this._sourcesView = new SourcesView(document.querySelector(".sources-section .sources"));
        this._newsView = new NewsView(document.querySelector(".news-section .news"));

        document.querySelector(".search__search-button").addEventListener("click", () =>
            self.emit("searchClicked")
        );
    }

    get sourcesView() {
        return this._sourcesView;
    }

    get newsView() {
        return this._newsView;
    }

    getQuery() {
        return document.querySelector(".search__search-input").value;
    }
}