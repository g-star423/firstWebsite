const samplePortfolio = [
    { stock: 'TROW', quantity: 750, begPrice: 87.5, endPrice: 99 },
    { stock: 'ABNB', quantity: 2000, begPrice: 75.5, endPrice: 76 },
];
const portfolioOutput = []
console.log("variables declared")
let startDate = '2022-02-28';
let endDate = '2022-03-30';
let stockData = null;
let stock1 = null;
let stock2 = null;
let stock1BegPrice = null;
let stock1EndPrice = null;
let stock2BegPrice = null;
let stock2EndPrice = null;
let quantity1 = null;
let quantity2 = null;
let stock1Return = null;
let stock2Return = null;
let portfolioBMV = null;
let portfolioEMV = null;
let portfolioReturn = null;


// function getStockData(date, ticker, nextFunc) {
//     $.ajax({
//         url: 'https://api.polygon.io/v1/open-close/' + ticker + '/' + date + '?adjusted=true&apiKey=IK60Z7z6FFgT_8LIJy3nud0g14J_GSHW'
//     }).then(// the code below only runs once result is gotten.
//         (data) => {
//             stockData.push(data);
//             console.log(stockData[stockData.length - 1]);
//             if (typeof nextFunc === 'function') {
//                 nextFunc();
//             }
//         },
//         () => {// error handler
//             console.log('request failed or bad request')
//         }
//     );
// }

function getStockData(date, ticker) {
    return $.ajax({
        url: 'https://api.polygon.io/v1/open-close/' + ticker + '/' + date + '?adjusted=true&apiKey=IK60Z7z6FFgT_8LIJy3nud0g14J_GSHW'
    })
}

const getAllData = () => {
    startDate = $("#startDate").val();
    endDate = $("#endDate").val();
    stock1 = $("#ticker1").val();
    stock2 = $("#ticker2").val();
    quantity1 = $("#quantity1").val();
    quantity2 = $("#quantity2").val();

    Promise.all([getStockData(startDate, stock1), getStockData(endDate, stock1), getStockData(startDate, stock2), getStockData(endDate, stock2)]).then((values) => {
        console.log('promises resolved');
        stockData = values; // data seems to come out of promise already in an array of objects
        console.log(stockData);
        calculatePerformance();
    }).catch(() => console.log('getting data failed'));

    // console.log(stockData);
    // stock1BegPrice = stockData[0]
    // console.log(stock1BegPrice, stock1EndPrice, stock2BegPrice, stock2EndPrice);


}

const calculatePerformance = () => {

    for (let i = 0; i < stockData.length; i++) {// all of these FOR loops could be DRYer, but making it work for now. They are needed because we can't guarantee all the AJAX requests will resolve in order.
        if (stockData[i].symbol == stock1 && stockData[i].from.substring(0, 10) == startDate) {
            stock1BegPrice = stockData[i].close
        }
    }
    for (let i = 0; i < stockData.length; i++) {
        if (stockData[i].symbol == stock1 && stockData[i].from.substring(0, 10) == endDate) {
            stock1EndPrice = stockData[i].close
        }
    } for (let i = 0; i < stockData.length; i++) {
        if (stockData[i].symbol == stock2 && stockData[i].from.substring(0, 10) == startDate) {
            stock2BegPrice = stockData[i].close
        }
    } for (let i = 0; i < stockData.length; i++) {
        if (stockData[i].symbol == stock2 && stockData[i].from.substring(0, 10) == endDate) {
            stock2EndPrice = stockData[i].close
        }
    }
    let stock1Obj = {
        ticker: stock1,
        begPrice: stock1BegPrice,
        endPrice: stock1EndPrice,
        BMV: stock1BegPrice * quantity1,
        EMV: stock1EndPrice * quantity1,
        return: (((stock1EndPrice - stock1BegPrice) / stock1BegPrice) * 100).toFixed(2)
    }
    portfolioOutput.push(stock1Obj)

    let stock2Obj = {
        ticker: stock2,
        begPrice: stock2BegPrice,
        endPrice: stock2EndPrice,
        BMV: stock2BegPrice * quantity2,
        EMV: stock2EndPrice * quantity2,
        return: (((stock2EndPrice - stock2BegPrice) / stock2BegPrice) * 100).toFixed(2)
    }
    portfolioOutput.push(stock2Obj)

    let portObj = {
        ticker: "TOT PORT",
        begPrice: "",
        endPrice: "",
        BMV: portfolioOutput[0].BMV + portfolioOutput[1].BMV,
        EMV: portfolioOutput[0].EMV + portfolioOutput[1].EMV,
        return: (((portfolioOutput[0].EMV + portfolioOutput[1].EMV) - (portfolioOutput[0].BMV + portfolioOutput[1].BMV)) / (portfolioOutput[0].BMV + portfolioOutput[1].BMV)).toFixed(2)
    }
    portfolioOutput.push(portObj)
    console.log(portfolioOutput)
}

function printPerformance() {
    for (let i = 0; i < samplePortfolio.length; i++) {
        const $tr = $('<tr>');
        const $th1 = $('<th>');
        const $th2 = $('<th>');
        const $th3 = $('<th>');
        const $th4 = $('<th>');
        const $th5 = $('<th>');
        const $th6 = $('<th>');
        $tr.append($th1, $th2, $th3, $th4, $th5, $th6);
        $('#performanceResults').append($tr);
    }
    $('#beginningPriceDisplay').text(`${startDate} Price`)
    $('#endingPriceDisplay').text(`${endDate} Price`)
}

$(() => {
    $('#stockForm').on('submit', (event) => {
        event.preventDefault();
        getAllData();
    });
})