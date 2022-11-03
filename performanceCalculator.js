const samplePortfolio = [
    {stock: 'TROW', quantity: 750, begPrice: 87.5, endPrice: 99},
    {stock: 'ABNB', quantity: 2000, begPrice: 75.5, endPrice: 76},
];

let startDate = '2022-02-28';
let endDate = '2022-03-30';
const stockData = [];
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


function getStockData(date, ticker) {
    $.ajax({
        url:'https://api.polygon.io/v1/open-close/' + ticker + '/'+ date +'?adjusted=true&apiKey=IK60Z7z6FFgT_8LIJy3nud0g14J_GSHW'
    }).then(
        (data)=> {
            stockData.push(data);
        },
        ()=> {
            console.log('request failed or bad request')
        }
    );
}

function calculatePerformance() {
    startDate = $("#startDate").val();
    endDate = $("#endDate").val();
    stock1 = $("#ticker1").val();
    stock2 = $("#ticker2").val();
    quantity1 = $("#quantity1").val();
    quantity2 = $("#quantity2").val();
    getStockData(startDate, stock1);
    // stock1EndPrice = getStockData(endDate, stock1);
    // stock2BegPrice = getStockData(startDate, stock2);
    // stock2EndPrice = getStockData(endDate, stock2);

    console.log(stockData);
    stock1BegPrice = stockData[0]
    console.log(stock1BegPrice, stock1EndPrice, stock2BegPrice, stock2EndPrice);


}

function printPerformance(){
    for (let i = 0; i < samplePortfolio.length; i++){
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

$(()=>{
    $('#stockForm').on('submit', (event)=>{
        event.preventDefault();
        calculatePerformance();
    });
})