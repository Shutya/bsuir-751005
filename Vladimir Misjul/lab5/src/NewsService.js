class NewsService {

    constructor(apiKey) {
        this.apiKey = apiKey;
    }

    async getSources() {
        var sourcesApiUrl = 'https://newsapi.org/v2/sources?' +
        `apiKey=${this.apiKey}`;
        var sourcesReq = new Request(sourcesApiUrl);
        var response = await fetch(sourcesReq);
        var json = await response.json();
        let newsSources = json.sources;
        newsSources.unshift({name: "All news", id: ""});
        return newsSources;
    }

    async getArticles(query, source) {
        let newsApiUrl = 'https://newsapi.org/v2/top-headlines?' +
            'language=en&' +
            'pageSize=40&' +
            `apiKey=${this.apiKey}`;
        if(query){
            newsApiUrl = `${newsApiUrl}&q=${query}`;
        }

        if(source) {
            newsApiUrl = `${newsApiUrl}&sources=${source}`;
        }

        var newsReq = new Request(newsApiUrl);
        var response = await fetch(newsReq);
        var json = await response.json();
        return json.articles;
    }
}

export default NewsService;