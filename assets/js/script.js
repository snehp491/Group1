let cryptoUrl = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd"

fetch(cryptoUrl).then(function(cryptoResponse){
    return cryptoResponse.json()
})
.then(function(crypto) {
    console.log(crypto)
    for (i = 0; i < 5; i++) {
        console.log(crypto[i].id) 
        console.log(crypto[i].symbol) 
        console.log(crypto[i].current_price) 
    }
})

const settings = {
	"async": true,
	"crossDomain": true,
	"url": "https://yh-finance.p.rapidapi.com/market/get-trending-tickers?region=US",
	"method": "GET",
	"headers": {
		"X-RapidAPI-Host": "yh-finance.p.rapidapi.com",
		"X-RapidAPI-Key": "85c2606b4emsh1b3962545e80b24p1c20dejsnc207af3b768f"
	}
};

$.ajax(settings).done(function (response) {
	console.log(response);
    for (i = 0; i < 5; i++) {
        console.log(response.finance.result[0].quotes[i].longName)
        console.log(response.finance.result[0].quotes[i].symbol)
        console.log(response.finance.result[0].quotes[i].regularMarketPrice)
    }
});

function search($event) {
    console.log('input: ' + $event.target.value);
}

const searchElement = document.getElementById('investment-search');
searchElement.addEventListener('input', search);
