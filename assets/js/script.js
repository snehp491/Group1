let cryptoUrl = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd"

const coinbaseBaseUrl = 'https://www.coinbase.com/api/v2/assets/search?base=USD&country=US&filter=all&include_prices=true&limit=5&order=asc&page=1&resolution=day&sort=rank';

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

// Fetch crypto results and return a promise after extracting the json response
function searchCrypto(input) {
    let cryptoUrl = coinbaseBaseUrl + "&query=" + input;

    return fetch(cryptoUrl).then(function(cryptoResponse){
        return cryptoResponse.json()
    });
}

function search($event) {
    console.log('input: ' + $event.target.value);

    const results = new Array();
    searchCrypto($event.target.value)
    .then((cryptoResults) => {
        for (i = 0; i < cryptoResults['data'].length; i++) {
            const item = cryptoResults['data'][i];
            results.push(
                {
                    name: item.name,
                    ticker: item.symbol,
                    image: item.image_url,
                    marketCap: parseFloat(item.market_cap),
                    percentChange: parseFloat((item.percent_change * 100).toFixed(2)),
                    price: parseFloat(item.latest),
                    recentPrices: item.prices
            
                }
            );
        }

        return results;
    })
    .then((results) => {
        console.log(results);
    });
}

const searchElement = document.getElementById('investment-search');
searchElement.addEventListener('input', search);
