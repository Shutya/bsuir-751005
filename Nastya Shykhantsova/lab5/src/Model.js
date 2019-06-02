const key = "158b90ae4f0d4b918241c1c3e69335ed";
const BATCH_SIZE = 5;

export default function Model() {
    this.loaded = [];
    this.pointer = 0;
};

Model.prototype.loadSources = async function() {
    const url = `https://newsapi.org/v2/sources?apiKey=${key}`;
    const req = new Request(url);
    return fetch(req).then(json => json.json());
}

Model.prototype.loadRequest = async function(request = {}, sources = new Set()) {
    this.pointer = 0;
    const endpoint = request.endpoint || (sources.size ? "everything" : "top-headlines");
    request.endpoint = undefined;
    let url = `https://newsapi.org/v2/${endpoint}?`;
    request.sources = [ ...sources.values() ].join(',');
    if (!request.sources) {
        request.country = "us";
    } else {
        request.country = undefined;
    }
    request = Object.entries(request);
    for (const [key, value] of request) {
        if (value) {
            url += `${key}=${encodeURI(value)}&`;
        }
    }
    url += `pageSize=40&apiKey=${key}`;
    const req = new Request(url);
    let res = (await (await fetch(req)).json()).articles;
    if (res && res.length) {
        this.loaded = res;
    } else {
        this.loaded = [];
    }
}

Model.prototype.nextBatch = function() {
    let batch = this.loaded.slice(this.pointer, this.pointer + BATCH_SIZE);
    this.pointer += batch.length;
    return batch;
}

Model.prototype.hasMore = function() {
    return this.pointer < this.loaded.length;
}