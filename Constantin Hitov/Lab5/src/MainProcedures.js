import { API_KEY} from './Info';


export async function LoadSources(){
    let url = 'https://newsapi.org/v2/sources?country=us&apiKey=' + API_KEY;
    return GetRequest(url);
}

async function LoadNews(currentPage, pageSize, q, sources, apiKey){
    if(q !== '' && typeof(q) !== 'undefined'){
        q = '&q=' + q;
    }
    else
        q='';
    if(sources !== '' && typeof(sources) !== 'undefined'){
        sources = '&sources=' + sources;
    }
    else
        sources = '';

    let url = 'https://newsapi.org/v2/top-headlines?language=en&apiKey=' + apiKey + '&page=' + currentPage + '&pageSize=' + pageSize + q + sources;
    let req = new Request(url);
    let response = await fetch(req);
    if(200 <= response.status && response.status <= 299){
        let json = await response.json();
        return json;
    }
}

async function GetRequest(url){
    let result = [];
    let req = new Request(url);
    let response = await fetch(req);
    let json = await response.json();
    let index = 0;
    json.sources.forEach((x) => {
        result[index] = x;
        index++;
    })
    return result;
}


export async function GetArticles(currentPage, pageSize, q, sources){
    let result = await LoadNews(currentPage, pageSize, q, sources, API_KEY);
    return result;
}
