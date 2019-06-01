import EventEmitter from "../common/EventEmitter";

export default class NewsApiLoader extends EventEmitter {
    constructor(apiKey) {
        super();
        this.apiKey = apiKey;
    }

    async querySources(params = {}) {
        return await this.query("sources", params);
    }

    async queryNews(params = {}) {
        return await this.query("everything", params);
    }

    async queryTopHeadlines(params = {}) {
        return await this.query("top-headlines", params);
    }

    async query(endpoint, params = {}) {
        params.lang = "en";
        let query = this.constructQuery(endpoint, params);
        let fetchOptions = {
            mode: "cors"
        };
        let response = await fetch(query, fetchOptions);
        let data = await response.json();
        return await data;
    }

    constructQuery(endpoint, params = {}) {
        let url = `https://newsapi.org/v2/${endpoint}`;
        let queryParams = params;
        queryParams.apiKey = this.apiKey;
        let query = Object.getOwnPropertyNames(queryParams).map(key => `${key}=${params[key]}`).join("&");
        return query ? `${url}?${query}` : url;
    }
}