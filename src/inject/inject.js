chrome.extension.sendMessage({}, function(response) {
	var readyStateCheckInterval = setInterval(function() {
	if (document.readyState === "complete") {
		clearInterval(readyStateCheckInterval);


		chrome.tabs.getSelected(null, function(tab){
			console.log(tab);
    		const url = tab.url;

    		const parsedUrl = url.match(/(\w+)(?=\.com|\.io|\.net|\.org)/ig)

		const init = {
			method: 'GET',
			headers: {
    			"content-type": "application/x-www-form-urlencoded",
    			"authorization": "Bearer 1y3QmpqCkoHA2wuNZQ5zzgsGWK3lwcx6cIHqUSFuIYasTxv5QzCxACg098uOpARP9R4okAqg4FumlGq-3swUGaKTrc-qsotvSpUboPHtlW2Jxfd3eqzVC9VK9o2JWHYx",
  			}
		};

		fetch(`https://api.yelp.com/v3/businesses/search?term=${parsedUrl}&location=Santa+Monica`, init)
		.then(function(response) {
			return response.json();
		}).then(function(response) {
			console.log(response);
			console.log(parsedUrl)
			let name = response.businesses[0]['name'];
			let rating = response.businesses[0]['rating'];
			let reviewCount = response.businesses[0]['review_count'];
			let price = response.businesses[0]['price'];
			let category = response.businesses[0]['categories'][0]['title'];
			let isClosed = response.businesses[0]['is_closed'];
			let address1 = response.businesses[0]['location']['display_address'][0];
			let address2 = response.businesses[0]['location']['display_address'][1];
			let latitude = response.businesses[0]['coordinates']['latitude'];
			let longitude = response.businesses[0]['coordinates']['longitude'];
			let phone = response.businesses[0]['display_phone'];
			console.log(document.querySelector('#mainPopup'))
			document.querySelector('#mainPopup').innerHTML = `
				<h3>${name}</h3>
				<div class="star-wrap">
					<span class="stars stars-${rating}"></span>${reviewCount} Reviews
				</div>
				<div>${price} - ${category}</div>
				<div>${address1}</div>
				<div>${address2}</div>
				<div><a href="https://www.google.com/maps/@${latitude},${longitude}">Get Directions</a></div>
				<div>${phone}</div>
			`;
		});


		});

		

	}
	
	}, 10);
});