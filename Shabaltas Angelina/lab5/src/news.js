const url =

    "https://newsapi.org/v2/top-headlines?country=us&apiKey=28c798263f8c4e95ae9838879059e3f5";



export async function getNews() {

    let result = await fetch(url).then(response => response.json());

    return result.articles;

}