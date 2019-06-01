import EventEmitter from "../common/EventEmitter";

export default class NewsSelector extends EventEmitter {
    constructor() {
        super();
        this.sourceIds = [];
        this.query = "";
        this.page = 1;
        this.end = false;
    }

    copy() {
        let clone = new NewsSelector();
        clone.setQuery(this.query);
        this.sourceIds.forEach(source => clone.enableSource(source));
        clone.flush();
        return clone;
    }

    enableSource(sourceId) {
        this.sourceIds.push(sourceId);
    }

    disableSource(sourceId) {
        this.sourceIds = this.sourceIds.filter(element => element !== sourceId);
    }

    setQuery(query) {
        this.query = query;
    }

    getCurrentPage() {
        return this.page;
    }

    getPageSize() {
        return 40;
    }

    flush() {
        this.page = 1;
    }

    getQueryEndpoint() {
        return this.query ? "everything" : "top-headlines";
    }

    getQueryParameters() {
        let params = {
            page: this.page,
            pageSize: this.getPageSize()
        };
        if (this.sourceIds.length !== 0) {
            params.sources = this.sourceIds.join(",");
        }
        else if (this.getQueryEndpoint() == "top-headlines") {
            params.country = "be";
        }
        if (this.query)
            params.q = this.query;
        return params;
    }

    updatePage() {
        this.page++;
    }

    setEnd() {
        this.end = true;
    }

    getEnd() {
        return this.end;
    }
}