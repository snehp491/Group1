let cryptoUrl = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd"

fetch(cryptoUrl).then(function(cryptoResponse){
    return cryptoResponse.json()
})
.then(function(crypto) {
    console.log(crypto)
    for (i = 0; i < 5; i++) {
        // console.log(crypto[i].id) 
        // console.log(crypto[i].symbol) 
        // console.log(crypto[i].current_price) 
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

const searchFn = function(e) {
    console.log(e.target.value);
    const ticker = e.target.value;
    if (!ticker) {
        const resultsElement = document.getElementById('resultsTable');
            resultsElement.innerHTML = '';
    }
    else if (ticker) {
        fetch('https://www.coinbase.com/api/v2/assets/search?base=USD&country=US&filter=all&include_prices=true&limit=5&order=asc&page=1&resolution=day&sort=rank&query=' + ticker)
        .then(function(response){
            return response.json();
        }).
        then((data) => {
            console.log(data['data']);
            
            const resultsElement = document.getElementById('resultsTable');
            resultsElement.innerHTML = ''
        
            for (const element of data['data']) {
                const row = document.createElement('tr');

                const cellZero = document.createElement('td');
                const faIcon = document.createElement('i');
                faIcon.className = 'fa fa-star-o';

                cellZero.append(faIcon);

                const cellOne = document.createElement('td');
                const icon = document.createElement('img');
                icon.src = element['image_url'];
                icon.height = 32;
                icon.width = 32;

                cellOne.appendChild(icon);

                const cellTwo = document.createElement('td');
                const name = document.createElement('p');

                const cryptoName = document.createElement('strong');
                cryptoName.textContent = element.name;
                name.append(cryptoName);

                const cryptoTicker = document.createElement('span');
                cryptoTicker.className = 'ml-2 text-muted';
                cryptoTicker.textContent = '- ' + element.symbol;
                name.append(cryptoTicker);

                cellTwo.appendChild(name);
                
                console.log(cellTwo);
                const cellThree = document.createElement('td');
                const price = document.createElement('span');
                price.textContent = '$' + element.latest;
                cellThree.append(price);
                console.log(cellThree);

                const cellFour = document.createElement('td');
                const percentSpan = document.createElement('span');
                const percentChange = parseFloat(element.percent_change) * 100;
                console.log('percent change: ' + percentChange);
                if(percentChange < 0) {
                    percentSpan.className = 'text-danger';
                } else {
                    percentSpan.className = 'text-success';
                }

                percentSpan.textContent = percentChange.toFixed(2) + '%';

                cellFour.append(percentSpan);

                const cellFive = document.createElement('td');
                const chart = document.createElement('div');
                chart.id = i;

                cellFive.append(chart);

                const data = element.prices.filter(function(value, index, Arr) {
                    return index % 25 == 0;
                });

                var options1 = {
                    series: [{
                    data: data
                  }],
                    chart: {
                    type: 'line',
                    width: 100,
                    height: 35,
                    sparkline: {
                      enabled: true
                    }
                  },
                  padding: {
                    top: 5,
                    right: 0,
                    bottom: 5,
                    left: 0
                },  
                  tooltip: {
                    fixed: {
                      enabled: false
                    },
                    x: {
                      show: false
                    },
                    y: {
                      title: {
                        formatter: function (seriesName) {
                          return ''
                        }
                      }
                    },marker: {
                        show: false
                      }
                    }
                    };

                var chart1 = new ApexCharts(chart, options1);
                chart1.render();

                row.append(cellZero);
                row.append(cellOne);
                row.append(cellTwo);
                row.append(cellThree);
                row.append(cellFour);
                row.append(cellFive);
                
                resultsElement.appendChild(row);

            }

            for (const element of data['data']) {

            }
        }).then(() => {
            const settings = {
                "async": false,
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

                const resultsElement = document.getElementById('resultsTable');

                const tickers = new Array();
                const tickerIds = {};
                for (i = 0; i < 5; i++) {
                    console.log(response.finance.result[0].quotes[i].shortName)
                    console.log(response.finance.result[0].quotes[i].symbol)
                    console.log(response.finance.result[0].quotes[i].regularMarketPrice)

                    tickers.push(response.finance.result[0].quotes[i].symbol);
                    const row = document.createElement('tr');

                    const cellZero = document.createElement('td');
                    const faIcon = document.createElement('i');
                    faIcon.className = 'fa fa-star-o';
    
                    cellZero.append(faIcon);
    
                    const cellOne = document.createElement('td');
                    const icon = document.createElement('p');
                    icon.innerText = '-';
                    cellOne.appendChild(icon);
    
                    const cellTwo = document.createElement('td');
                    const name = document.createElement('p');
    
                    const cryptoName = document.createElement('strong');
                    cryptoName.textContent =response.finance.result[0].quotes[i].shortName;
                    name.append(cryptoName);
    
                    const cryptoTicker = document.createElement('span');
                    cryptoTicker.className = 'ml-2 text-muted';
                    cryptoTicker.textContent = '- ' + response.finance.result[0].quotes[i].symbol;
                    name.append(cryptoTicker);
    
                    cellTwo.appendChild(name);
                    
                    console.log(cellTwo);
                    const cellThree = document.createElement('td');
                    const price = document.createElement('span');
                    price.textContent = '$' + response.finance.result[0].quotes[i].regularMarketPrice;
                    cellThree.append(price);
                    console.log(cellThree);
    
                    const cellFour = document.createElement('td');
                    const percentSpan = document.createElement('span');
                    const percentChange = response.finance.result[0].quotes[i].regularMarketChangePercent;
                    console.log('percent change: ' + percentChange);
                    if(percentChange < 0) {
                        percentSpan.className = 'text-danger';
                    } else {
                        percentSpan.className = 'text-success';
                    }
    
                    percentSpan.textContent = percentChange.toFixed(2) + '%';
    
                    cellFour.append(percentSpan);

                    const cellFive = document.createElement('td');
                    const chart = document.createElement('div');
                    chart.id = 'stock-chart-' + i;

                    tickerIds[response.finance.result[0].quotes[i].symbol] = chart.id;
                    cellFive.append(chart);

                    row.append(cellZero);
                    row.append(cellOne);
                    row.append(cellTwo);
                    row.append(cellThree);
                    row.append(cellFour);
                    row.append(cellFive);
                    
                    resultsElement.appendChild(row);
                }

                
                const options = {
                    "async": false,
                    "crossDomain": true,
                    "url": "https://yh-finance.p.rapidapi.com/market/get-spark",
                    "method": "GET",
                    "data": {symbols: tickers.join(), interval: '1m', range: '1d'},
                    "headers": {
                        "X-RapidAPI-Host": "yh-finance.p.rapidapi.com",
                        "X-RapidAPI-Key": "85c2606b4emsh1b3962545e80b24p1c20dejsnc207af3b768f"
                    }
                };
            
            
                  $.ajax(options).done(function (response) {
                      console.log('res');
                    console.log(response);
                    Object.keys(response).forEach(key => {
                        const element = document.getElementById(tickerIds[key]);

                        console.log(element);
                        const data = response[key].close.filter(function(value, index, Arr) {
                            return index % 25 == 0;
                        });
        
                        var options1 = {
                            series: [{
                            data: data
                          }],
                            chart: {
                            type: 'line',
                            width: 100,
                            height: 35,
                            sparkline: {
                              enabled: true
                            }
                          },
                          padding: {
                            top: 5,
                            right: 0,
                            bottom: 5,
                            left: 0
                        },  
                          tooltip: {
                            fixed: {
                              enabled: false
                            },
                            x: {
                              show: false
                            },
                            y: {
                              title: {
                                formatter: function (seriesName) {
                                  return ''
                                }
                              }
                            },marker: {
                                show: false
                              }
                            }
                            };
        
                        var chart1 = new ApexCharts(element, options1);
                        chart1.render();
                    });

                }).catch(function (error) {
                });
                
            });
        });
    }
}

const searchInput = document.getElementById('searchInput');
searchInput.addEventListener('keypress', searchFn);