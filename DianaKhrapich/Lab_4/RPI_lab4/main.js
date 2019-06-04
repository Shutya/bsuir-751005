

function myFunction() {

   let url= 'https://newsapi.org/v2/everything?' +
        'q=Apple&' +
        'from=2019-06-04&' +
        'sortBy=popularity&' +
        'apiKey=9f0f3333d7e94adc82e9d2c336e96324';
    var req = new Request(url);
    fetch(req)
        .then(function(response){
            return response.json();
        })
        .then(res => res.articles)
        .then(function (res) {

            let object = document.getElementById("list");
            object.innerHTML=``;
            for (let i = 0; i < 40; i++) {
                outInf=res[i];
                object.innerHTML += `  <div class="card middle">
                <div class="card-image waves-effect waves-block waves-light">
                  <img class="activator" src="${outInf.urlToImage}">
                </div>
                <div class="card-content">
                  <span class="card-title activator grey-text text-darken-4">${outInf.author}<i class="material-icons right">News</i></span>
                  <p><a href="${outInf.url}">link</a></p>
                </div>
                <div class="card-reveal">
                  <span class="card-title grey-text text-darken-4"><i class="material-icons right">close</i></span>
                  <p>${outInf.content}</p>
                </div>
              </div>`
            }
        })
}
function  sport()
{
    let url= 'https://newsapi.org/v2/everything?' +
        'q=sports&' +
        'from=2019-06-04&' +
        'sortBy=popularity&' +
        'apiKey=9f0f3333d7e94adc82e9d2c336e96324';
    var req = new Request(url);
    fetch(req)
        .then(function(response){
            return response.json();
        })
        .then(res => res.articles)
        .then(function (res) {
            let object = document.getElementById("list");
            object.innerHTML=``;
            for (let i = 0; i < 40; i++) {
                outInf=res[i];
                object.innerHTML += `  <div class="card middle">
                <div class="card-image waves-effect waves-block waves-light">
                  <img class="activator" src="${outInf.urlToImage}">
                </div>
                <div class="card-content">
                  <span class="card-title activator grey-text text-darken-4">${outInf.author}<i class="material-icons right">News</i></span>
                  <p><a href="${outInf.url}">link</a></p>
                </div>
                <div class="card-reveal">
                  <span class="card-title grey-text text-darken-4"><i class="material-icons right">close</i></span>
                  <p>${outInf.content}</p>
                </div>
              </div>`
            }
        })
}
function  technology()
{
    let url= 'https://newsapi.org/v2/everything?' +
        'q=technology&' +
        'from=2019-06-04&' +
        'sortBy=popularity&' +
        'apiKey=9f0f3333d7e94adc82e9d2c336e96324';
    var req = new Request(url);
    fetch(req)
        .then(function(response){
            return response.json();
        })
        .then(res => res.articles)
        .then(function (res) {
            let object = document.getElementById("list");
            object.innerHTML=``;
            for (let i = 0; i < 40; i++) {
                outInf=res[i];
                object.innerHTML += `  <div class="card middle">
                <div class="card-image waves-effect waves-block waves-light">
                  <img class="activator" src="${outInf.urlToImage}">
                </div>
                <div class="card-content">
                  <span class="card-title activator grey-text text-darken-4">${outInf.author}<i class="material-icons right">News</i></span>
                  <p><a href="${outInf.url}">link</a></p>
                </div>
                <div class="card-reveal">
                  <span class="card-title grey-text text-darken-4"><i class="material-icons right">close</i></span>
                  <p>${outInf.content}</p>
                </div>
              </div>`
            }
        })
}
function  health(){
    let url= 'https://newsapi.org/v2/everything?' +
        'q=health&' +
        'from=2019-06-04&' +
        'sortBy=popularity&' +
        'apiKey=9f0f3333d7e94adc82e9d2c336e96324';
    var req = new Request(url);
    fetch(req)
        .then(function(response){
            return response.json();
        })
        .then(res => res.articles)
        .then(function (res) {
            let object = document.getElementById("list");
            object.innerHTML=``;
            for (let i = 0; i < 40; i++) {
                outInf=res[i];
                object.innerHTML += `  <div class="card middle">
                <div class="card-image waves-effect waves-block waves-light">
                  <img class="activator" src="${outInf.urlToImage}">
                </div>
                <div class="card-content">
                  <span class="card-title activator grey-text text-darken-4">${outInf.author}<i class="material-icons right">News</i></span>
                  <p><a href="${outInf.url}">link</a></p>
                </div>
                <div class="card-reveal">
                  <span class="card-title grey-text text-darken-4"><i class="material-icons right">close</i></span>
                  <p>${outInf.content}</p>
                </div>
              </div>`
            }
        })

}
function  science(){
    let url= 'https://newsapi.org/v2/everything?' +
        'q=science&' +
        'from=2019-06-04&' +
        'sortBy=popularity&' +
        'apiKey=9f0f3333d7e94adc82e9d2c336e96324';
    var req = new Request(url);
    fetch(req)
        .then(function(response){
            return response.json();
        })
        .then(res => res.articles)
        .then(function (res) {
            let object = document.getElementById("list");
            object.innerHTML=``;
            for (let i = 0; i < 40; i++) {
                outInf=res[i];
                object.innerHTML += `  <div class="card middle">
                <div class="card-image waves-effect waves-block waves-light">
                  <img class="activator" src="${outInf.urlToImage}">
                </div>
                <div class="card-content">
                  <span class="card-title activator grey-text text-darken-4">${outInf.author}<i class="material-icons right">News</i></span>
                  <p><a href="${outInf.url}">link</a></p>
                </div>
                <div class="card-reveal">
                  <span class="card-title grey-text text-darken-4"><i class="material-icons right">close</i></span>
                  <p>${outInf.content}</p>
                </div>
              </div>`
            }
        })
}
function  entertaiment(){
    let url= 'https://newsapi.org/v2/everything?' +
        'q=entertaiment&' +
        'from=2019-06-04&' +
        'sortBy=popularity&' +
        'apiKey=9f0f3333d7e94adc82e9d2c336e96324';
    var req = new Request(url);
    fetch(req)
        .then(function(response){
            return response.json();
        })
        .then(res => res.articles)
        .then(function (res) {
            let object = document.getElementById("list");
            object.innerHTML=``;
            for (let i = 0; i < 40; i++) {
                outInf=res[i];
                object.innerHTML += `  <div class="card middle">
                <div class="card-image waves-effect waves-block waves-light">
                  <img class="activator" src="${outInf.urlToImage}">
                </div>
                <div class="card-content">
                  <span class="card-title activator grey-text text-darken-4">${outInf.author}<i class="material-icons right">News</i></span>
                  <p><a href="${outInf.url}">link</a></p>
                </div>
                <div class="card-reveal">
                  <span class="card-title grey-text text-darken-4"><i class="material-icons right">close</i></span>
                  <p>${outInf.content}</p>
                </div>
              </div>`
            }
        })
}





