let cryptoUrl = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd"

const coinbaseBaseUrl = 'https://www.coinbase.com/api/v2/assets/search?base=USD&country=US&filter=all&include_prices=true&limit=3&order=asc&page=1&resolution=day&sort=rank';

fetch(cryptoUrl).then(function (cryptoResponse) {
    return cryptoResponse.json()
})
    .then(function (crypto) {
        console.log(crypto)
    })

const settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://yh-finance.p.rapidapi.com/market/get-trending-tickers?region=US",
    "method": "GET",
    "headers": {
        "X-RapidAPI-Host": "yh-finance.p.rapidapi.com",
        "X-RapidAPI-Key": "9c7eb9a856mshbbaac42b7e0462cp141808jsna624ee714591"
    }
};

// $.ajax(settings).done(function (response) {
// 	console.log(response);
//     for (i = 0; i < 5; i++) {
//         console.log(response.finance.result[0].quotes[i].longName)
//         console.log(response.finance.result[0].quotes[i].symbol)
//         console.log(response.finance.result[0].quotes[i].regularMarketPrice)
//     }
// });

function buildTable(results) {

    console.log('results length: ' + results.length);
    const resultsElement = document.getElementById('resultsTable');
  
    for (const result of results) {
        const row = document.createElement('tr');

        const cellZero = document.createElement('td');
        const watchlistBtn = document.createElement('button');
        watchlistBtn.className = 'fa fa-star-o btn';

        cellZero.append(watchlistBtn);

        const cellOne = document.createElement('td');

        if (result.image) {
            const icon = document.createElement('img');
            icon.src = result.image
            icon.height = 32;
            icon.width = 32;
            cellOne.appendChild(icon);

        } else {
            const dash = document.createElement('span');
            dash.className = 'text-muted';
            dash.textContent = '-';
            cellOne.append(dash);
        }


        const cellOneA = document.createElement('td');
        const type = document.createElement('span');
        type.className = 'text-muted'
        type.innerText = result.type;
        cellOneA.append(type);

        const cellTwo = document.createElement('td');
        const name = document.createElement('p');

        const cryptoName = document.createElement('strong');
        if (result.name) {
            cryptoName.textContent = result.name + ' - ';
        }

        name.append(cryptoName);

        const cryptoTicker = document.createElement('span');
        cryptoTicker.className = 'ml-2 text-muted';
        cryptoTicker.textContent = result.ticker;
        name.append(cryptoTicker);

        cellTwo.appendChild(name);

        const cellThree = document.createElement('td');
        const price = document.createElement('span');

        if (result.price) {
            price.textContent = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(result.price);
        } else {
            price.textContent = '-';
        }

        cellThree.append(price);

        const cellFour = document.createElement('td');
        const percentSpan = document.createElement('span');
        const percentChange = result.percentChange;

        if (percentChange < 0) {
            percentSpan.className = 'text-danger';
        } else {
            percentSpan.className = 'text-success';
        }

        percentSpan.textContent = result.percentChange + '%';

        cellFour.append(percentSpan);

        const cellFive = document.createElement('td');
        const marketCapSpan = document.createElement('span');
        if (result.marketCap) {
            marketCapSpan.textContent = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(result.marketCap);
        } else {
            marketCapSpan.textContent = '$ -';
        }

        cellFive.append(marketCapSpan);

        row.append(cellZero);
        row.append(cellOne);
        row.append(cellOneA);
        row.append(cellTwo);
        row.append(cellThree);
        row.append(cellFour);
        row.append(cellFive);

        resultsElement.appendChild(row);

        $(watchlistBtn).click(function () {

            const watchResultsElement = document.getElementById('watchlistTable');

            const watchRow = document.createElement('tr');

            // Get logo
            const watchCellZero = document.createElement('td');

            if (result.image) {
                const watchIcon = document.createElement('img');
                watchIcon.src = result.image
                watchIcon.height = 24;
                watchIcon.width = 24;
                watchCellZero.appendChild(watchIcon);

            } else {
                const watchDash = document.createElement('span');
                watchDash.className = 'text-muted';
                watchDash.textContent = '-';
                watchCellZero.append(watchDash);
            }

            // Get Ticker
            const watchCellOne = document.createElement('td');
            const watchName = document.createElement('p');

            const watchCryptoTicker = document.createElement('span');
            watchCryptoTicker.textContent = result.ticker;
            watchName.append(watchCryptoTicker);

            watchCellOne.appendChild(watchName);

            // Get Price
            const watchCellTwo = document.createElement('td');
            const watchPrice = document.createElement('span');

            if (result.price) {
                watchPrice.textContent = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(result.price);
            } else {
                watchPrice.textContent = '-';
            }

            watchCellTwo.append(watchPrice);

            // Get Percentage
            const watchCellThree = document.createElement('td');
            const watchPercentSpan = document.createElement('span');
            const watchPercentChange = result.percentChange;

            if (watchPercentChange < 0) {
                watchPercentSpan.className = 'text-danger';
            } else {
                watchPercentSpan.className = 'text-success';
            }

            watchPercentSpan.textContent = result.percentChange + '%';

            watchCellThree.append(watchPercentSpan);

            // Display Trash Can
            const watchCellFour = document.createElement('td');
            const watchTrash = document.createElement('button');
            watchTrash.className = 'fa fa-trash-o btn';
            $(watchTrash).click(function(){
                watchRow.remove(watchCellOne)
            })

            watchCellFour.append(watchTrash)

            // Append Details
            watchRow.append(watchCellZero)
            watchRow.append(watchCellOne)
            watchRow.append(watchCellTwo)
            watchRow.append(watchCellThree)
            watchRow.append(watchCellFour)

            watchResultsElement.append(watchRow);

            // Local Storage

        })
    }

    const loader = document.getElementById('loadingResults');
    loader.style = 'display: none;';
}

// Fetch crypto results and return a promise after extracting the json response
function searchCrypto(input) {
    let cryptoUrl = coinbaseBaseUrl + "&query=" + input;

    return fetch(cryptoUrl).then(function (cryptoResponse) {
        return cryptoResponse.json()
    });
}

// Fetch stock results and return a promise after extracting the json response
function searchStocks(input) {

    let stockUrl = 'https://yh-finance.p.rapidapi.com/auto-complete?region=US&q=' + input;

    return fetch(stockUrl, {
        method: "GET",
        headers: {
            "X-RapidAPI-Host": "yh-finance.p.rapidapi.com",
            "X-RapidAPI-Key": "9c7eb9a856mshbbaac42b7e0462cp141808jsna624ee714591"
        }
    }).then((stockResponse) => {
        return stockResponse.json()
    });
}

function search($event) {

    const searchElement = document.getElementById('investment-input');
    const userInput = searchElement.value;

    console.log('input: ' + userInput);

    if (userInput < 2) {
        return;
    }

    const loader = document.getElementById('loadingResults');
    loader.style = 'display: inline-block;';
    const resultsElement = document.getElementById('resultsTable');
    resultsElement.innerHTML = ''

    const results = new Array();
    searchCrypto(userInput)
        .then((cryptoResults) => {
            console.log(cryptoResults);
            for (i = 0; i < cryptoResults['data'].length; i++) {
                const item = cryptoResults['data'][i];
                console.log('processing crypto ' + item.symbol);
                results.push(
                    {
                        type: 'Crypto',
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
        .then((existingResults) => {
            searchStocks(userInput)
                .then((stockResults) => {
                    console.log(stockResults);
                    console.log(existingResults);
                    console.log(stockResults['quotes'].length);
                    for (i = 0; i < 3 && i < stockResults['quotes'].length; i++) {
                        const item = stockResults['quotes'][i];
                        console.log('processing stock ' + item.symbol);

                        const row = {
                            type: item.typeDisp,
                            name: item.longname,
                            ticker: item.symbol
                        };

                        const settings = {
                            "async": false,
                            "crossDomain": true,
                            "url": "https://yh-finance.p.rapidapi.com/stock/v2/get-summary?region=US&symbol=" + item.symbol,
                            "method": "GET",
                            "headers": {
                                "X-RapidAPI-Host": "yh-finance.p.rapidapi.com",
                                "X-RapidAPI-Key": "9c7eb9a856mshbbaac42b7e0462cp141808jsna624ee714591"
                            }
                        };

                        $.ajax(settings).done(function (response) {
                            // console.log(response);

                            row['marketCap'] = response['price']['marketCap']['raw'];
                            row['percentChange'] = parseFloat((response['price']['regularMarketChangePercent']['raw'] * 100).toFixed(2)),
                                row['price'] = response['price']['regularMarketPrice']['raw'];
                            row['recentPrices'] = null;

                        });

                        existingResults.push(row);
                    }
                }).then(() => {
                    console.log('triggering buildTable');
                    buildTable(existingResults);
                });
        });
}

const searchBtn = document.getElementById('searchBtn');
searchBtn.addEventListener('click', search);


