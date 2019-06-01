import EventEmitter from "../common/EventEmitter";
import SourcesModel from "./SourcesModel";
import NewsApiLoader from "./NewsApiLoader";
import NewsModel from "./NewsModel";

export default class AppModel extends EventEmitter {
    constructor() {
        super();

        this._newsModel = new NewsModel();
        this._sourcesModel = new SourcesModel();
        this._newsLoader = new NewsApiLoader();
    }

    get newsLoader() {
        return this._newsLoader;
    }

    get newsModel() {
        return this._newsModel;
    }

    get sourcesModel() {
        return this._sourcesModel;
    }
}