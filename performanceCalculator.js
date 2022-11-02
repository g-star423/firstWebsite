const samplePortfolio = [
    {stock: 'TROW', quantity: 750},
    {stock: 'ABNB', quantity: 2000},
]

let startDate = '2022-02-28'
let endDate = '2022-03-30'
const stockData = [];

function getStockData(date, ticker) {
    $.ajax({
        url:'https://api.polygon.io/v1/open-close/' + ticker + '/'+ date +'?adjusted=true&apiKey=IK60Z7z6FFgT_8LIJy3nud0g14J_GSHW'
    }).then(
        (data)=> {
            stockData.push(data);
            console.log(stockData);
        },
        ()=> {
            console.log('request failed or bad request')
        }
    );
}
// getStockData(endDate, samplePortfolio[1].stock);

for (let i = 0; i < samplePortfolio.length; i++) {
    console.log(samplePortfolio[i].stock)
    getStockData(endDate, samplePortfolio[i].stock);
}

console.log(stockData)