let news_arr = [];

let news_info = {
	news_count: 0,
	all_loaded: false,
	curr_page: 1,
	curr_src: '',
	curr_query: ''
};
		
function get_src() {
	let source_url = "https://newsapi.org/v2/sources?country=ru&apiKey=85e7cc31bc4b4402aa6ea31c46b2bdbe"; 
	let req = new Request(source_url);
	return fetch(req);
}

function get_news(info) {
	let news_url = `https://newsapi.org/v2/top-headlines?${info.curr_query != '' ? "q=" + info.curr_query + "&" : ''}${info.curr_src != '' ? "sources=" + info.curr_src + "&" : "country=ru&"}pageSize=5&page=${info.curr_page}&apiKey=85e7cc31bc4b4402aa6ea31c46b2bdbe`;
	let req = new Request(news_url);
	return fetch(req);	
}

function find_source_button(elem)
{
	while (elem.tagName !== 'BUTTON')
		elem = elem.parentNode;
	return elem;
}

function update_news(data, info) {
	news_arr.length = 0;
	if (info.news_count < 40) {
		for (i=0; i<data.articles.length; i++) {
			news_arr[i] = data.articles[i];
		}
		info.news_count += data.articles.length;
		info.curr_page++;
	}	
	info.all_loaded = (data.totalResults == info.news_count || info.news_count == 40);
}

function update_src(data) {
	news_arr.length = 0;
	for (i=0; i<data.sources.length; i++) {
		news_arr[i] = data.sources[i];
	}
}

function set_query(info) {
	info.curr_page = 1;
	info.news_count = 0;
	info.curr_query = document.querySelector('.query-text').value;
}

function set_src(info, elem) {
	info.curr_page = 1;
	info.news_count = 0;
	info.curr_src = elem.querySelector('.src__tmpl__id').innerHTML;
}

function show_all(info) {
	info.curr_src = '';
	info.curr_page = 1;
	info.display_news_count = 0;
}

function rm_news_list(info) {
	let list = document.getElementsByClassName('news__tmpl__ref');
	let i;
	for (i=0;i<list.length;)
		list[i].remove();
}

function create_news_block(article, fragment) {
	let token = news__tmpl.content.cloneNode(true);
	token.querySelector('.news__tmpl__img').src = article.urlToImage;
	token.querySelector('.news__tmpl__title').innerHTML = article.title;
	token.querySelector('.news__tmpl__description').innerHTML = article.description;
	token.querySelector('.news__tmpl__ref').href = article.url;
	fragment.appendChild(token);
}

function create_source_block(source, fragment) {
	let token = src__tmpl.content.cloneNode(true);
	token.querySelector('.src__tmpl__name').innerHTML = source.name;
	token.querySelector('.src__tmpl__id').innerHTML = source.id;
	token.querySelector('.src__tmpl__button').title = source.description;
	fragment.appendChild(token);
}

function display_news(news_arr, info) {
	let fragment = document.createDocumentFragment();
	for (i=0; i<news_arr.length; i++) {
		create_news_block(news_arr[i], fragment);	
	}
	document.querySelector('.news-block-list').appendChild(fragment);
	
	if (info.all_loaded) {
		document.querySelector('.load-more-button').style.display = 'none';
	}
	else {
		document.querySelector('.load-more-button').style.display = '';
	}
	
	if (info.news_count == 0) {
		document.querySelector('.news-block-not-found').style.display = 'block';
	}
}

function show_src(source_arr) {
	let fragment = document.createDocumentFragment();
	for (i=0; i<source_arr.length; i++) {
		create_source_block(source_arr[i], fragment);
	}
	document.querySelector('.news-block__src__concrete').appendChild(fragment);
}

function rm_news() {
	let list = document.getElementsByClassName('news__tmpl__ref');
	
	for (i=0; i<list.length;) {
		list[i].remove();
	}
	
	document.querySelector('.news-block-not-found').style.display = 'none';
	document.querySelector('.load-more-button').style.display = 'none';
}

function set_src_eventListeners() {
	document.querySelector('.news-block__src__concrete').addEventListener('click', function() {
		let source_button = find_source_button(event.target);
		set_src(news_info, source_button);
		rm_news();
		get_news(news_info)
		.then(response => { return response.json() })
		.then(data => update_news(data, news_info))
		.then(() => display_news(news_arr, news_info));
	});
}

document.querySelector('#load-more').addEventListener('click', function() {
	get_news(news_info)
	.then (response => { return response.json() })
	.then(data => update_news(data, news_info))
	.then(() => display_news(news_arr, news_info));
});

document.querySelector('.query-button').addEventListener('click', function() {
	set_query(news_info);
	rm_news();
	get_news(news_info)
	.then (response => { return response.json() })
	.then(data => update_news(data, news_info))
	.then(() => display_news(news_arr, news_info));				
});

document.querySelector('.query-text').addEventListener('keydown', function() {
	if (event.keyCode == 13)
	{
		set_query(news_info);
		rm_news();
		get_news(news_info)
		.then (response => { return response.json() })
		.then(data => update_news(data, news_info))
		.then(() => display_news(news_arr, news_info));		
	}
});

document.querySelector('.news-block__src__show__all').addEventListener('click', function() {
	show_all(news_info);
	rm_news();
	get_news(news_info)
	.then (response => { return response.json() })
	.then(data => update_news(data, news_info))
	.then(() => display_news(news_arr, news_info));	
});

get_src()
.then(response => { return response.json() })
.then(data => update_src(data))
.then(() => show_src(news_arr))
.then(() => set_src_eventListeners());

get_news(news_info)
.then (response => { return response.json() })
.then(data => update_news(data, news_info))
.then(() => display_news(news_arr, news_info));