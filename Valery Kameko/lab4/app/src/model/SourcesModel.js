import EventEmitter from "../common/EventEmitter";

export default class SourcesModel extends EventEmitter {
    constructor() {
        super();
        this.sources = [];
    }

    addSource(source) {
        this.sources.push(source);
        this.emit("sourcesAdded", [source]);
    }

    addSources(sources) {
        this.sources.push(...sources);
        this.emit("sourcesAdded", sources);
    }
}