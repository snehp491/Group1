let cryptoUrl = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd"

const coinbaseBaseUrl = 'https://www.coinbase.com/api/v2/assets/search?base=USD&country=US&filter=all&include_prices=true&limit=3&order=asc&page=1&resolution=day&sort=rank';
const globalResults = {};

let favorites = JSON.parse(localStorage.getItem('favorites'));

// const clearBtn = document.getElementById('clearBtn');
// clearBtn.addEventListener('click', clearFavorites);

function setupFavorites(favorites) {
    const favoritesElement = document.getElementById('watchlistTable');
    favoritesElement.innerHTML = '';

    for (i = 0; i < favorites.length; i++) {

        console.log(favorites);
        console.log(favorites[i]);
        console.log(favorites[i].ticker);
        const row = document.createElement('tr');

        const deleteCell = document.createElement('td');
        const deleteButton = document.createElement('button')
        deleteButton.className = 'btn btn-danger fa fa-trash-o btn';

        deleteButton.id = i;
        deleteButton.addEventListener('click', removeFavorite);
        deleteCell.append(deleteButton);
        
        if (favorites[i].type === 'Crypto') {
            getCrypto(favorites[i].slug).then((result) => {
                const blankCell = document.createElement('td');
                blankCell.src = result['data']['image']

                const tickerCell = document.createElement('td');
                tickerCell.textContent = result['data']['base'];

                const priceCell = document.createElement('td');
                priceCell.textContent = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(result['data']['prices']['latest']);

                const changeCell = document.createElement('td');
                const span = document.createElement('span');
                span.textContent = (result['data']['prices']['latest_price']['percent_change']['day'] * 100).toFixed(2) + '%';

                if (result['data']['prices']['latest_price']['percent_change']['day'] > 0) {
                    span.className = 'text-success';
                } else {
                    span.className = 'text-danger';
                }

                changeCell.append(span);

                row.append(blankCell);
                row.append(tickerCell);
                row.append(priceCell);
                row.append(changeCell);
                row.append(deleteCell);

                favoritesElement.append(row);

            });
        } else {
            getStock(favorites[i].ticker).then((result) => {
               
                const imgCell = document.createElement('td');
                imgCell.textContent = "-"

                const tickerCell = document.createElement('td');
                tickerCell.textContent = result['price']['symbol'];

                const priceCell = document.createElement('td');
                priceCell.textContent = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(result['price']['regularMarketDayHigh']['raw']);

                const changeCell = document.createElement('td');
                const span = document.createElement('span');
                span.textContent = (result['price']['regularMarketChangePercent']['raw'] * 100).toFixed(2) + '%';

                if (result['price']['regularMarketChangePercent']['raw'] > 0) {
                    span.className = 'text-success';
                } else {
                    span.className = 'text-danger';
                }

                changeCell.append(span);

                row.append(imgCell);
                row.append(tickerCell);
                row.append(priceCell);
                row.append(changeCell);
                row.append(deleteCell);

                favoritesElement.append(row);
            });
        }
    }
}
if (favorites) {
    console.log(favorites);
    setupFavorites(favorites);
} else {
    favorites = new Array();
}

const settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://yh-finance.p.rapidapi.com/market/get-trending-tickers?region=US",
    "method": "GET",
    "headers": {
        "X-RapidAPI-Host": "yh-finance.p.rapidapi.com",
        "X-RapidAPI-Key": "dont-steal-this-please-9c7eb9a856mshbbaac42b7e0462cp141808jsna624ee714591"
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

// function clearFavorites() {
//     localStorage.setItem('favorites', null);
//     const favoritesElement = document.getElementById('watchlistTable');
//     favoritesElement.innerHTML = '';

// }
function addFavorite(result) {
    favorites.push(result);

    console.log(favorites);
    localStorage.setItem('favorites', JSON.stringify(favorites));   
}

function removeFavorite($event) {
    console.log('remove : ' + $event.target.id);
    console.log(favorites);
    favorites.splice(parseInt($event.target.id), 1);
    console.log(favorites);
    localStorage.setItem('favorites', JSON.stringify(favorites));
    setupFavorites(favorites);
}

function getStock(ticker) {
    const url = 'https://yh-finance.p.rapidapi.com/stock/v2/get-summary?region=US&symbol=' + ticker;

    return fetch(url, {
        method: "GET",
        headers: {
            "X-RapidAPI-Host": "yh-finance.p.rapidapi.com",
            "X-RapidAPI-Key": "dont-steal-this-please-9c7eb9a856mshbbaac42b7e0462cp141808jsna624ee714591_thanks".substring('dont_steal_this_please_'.length, "dont-steal-this-please-9c7eb9a856mshbbaac42b7e0462cp141808jsna624ee714591_thanks".indexOf('_thanks'))
        }
    }).then((stockResponse) => {
        return stockResponse.json()
    });
}

function getCrypto(ticker) {
    const url = 'https://www.coinbase.com/api/v2/assets/prices/' + ticker + '?base=USD';

    return fetch(url).then((cryptoResponse) => {
        return cryptoResponse.json()
    });
}

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
            $(watchTrash).click(function () {
                watchRow.remove(watchCellOne)
                removeFavorite(result);
            });

            watchCellFour.append(watchTrash)

            // Append Details
            watchRow.append(watchCellZero)
            watchRow.append(watchCellOne)
            watchRow.append(watchCellTwo)
            watchRow.append(watchCellThree)
            watchRow.append(watchCellFour)

            watchResultsElement.append(watchRow);

            // Local Storage
            addFavorite(result);

        });
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
                        slug: item.slug,
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

// $("#clearBtn").on("click", function () {
//     localStorage.clear()
// })

