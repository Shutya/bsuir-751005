import { API_KEY} from './Info';


export async function LoadSources(){
    let url = 'https://newsapi.org/v2/sources?country=us&apiKey=' + API_KEY;
    return GetRequest(url);
}

async function LoadNews(currentPage, pageSize, q, source, apiKey){

    if(q !== '' && typeof(q) !== 'undefined'){
        q = '&q=' + q;
    }
    else    
        q='';

    if(source !== '' && typeof(source) !== 'undefined'){
        source = '&sources=' + source; 
    }
    else    
        source = '';

    let url = 'https://newsapi.org/v2/top-headlines?language=en&page=' + currentPage + '&pageSize=' + pageSize + 
               q + source + '&apiKey=' + apiKey;
    console.log(url);
    let req = new Request(url);
    let response = await fetch(req);
    if(200 <= response.status && response.status < 300){
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


export async function GetArticles(currentPage, pageSize, q, source){
    let result = await LoadNews(currentPage, pageSize, q, source, API_KEY);
    return result;
}