const stocksList = ['FB', 'AAPL', 'TSLA', 'GOOG'];
const favesList = [];
const validationList = [];

const render = function () {
    $('.buttons').empty();
    stocksList.forEach(function (element) {
        let newButton = $('<button>');
        newButton.addClass('stock');
        newButton.text(element);
        $('.buttons').append(newButton);
    })
}

const faveRender = function () {
    $('.faveButtons').empty();
    favesList.forEach(function (element) {
        let newFaveButton = $('<button>');
        newFaveButton.addClass('stock');
        newFaveButton.text(element);
        $('.faveButtons').append(newFaveButton);
    })
}

const addButton = function (event) {
    event.preventDefault();
    const stock = $('#input').val().toUpperCase();
    if (validationList.includes(stock)) { 
        stocksList.push(stock);
    }
    $('#input').val('');
    render();
}

const clearButton = function (event) {
    event.preventDefault();
    stocksList.splice(0, stocksList.length);
    render();
}

const favoriteButton = function (event) {
    event.preventDefault();
    const fave = $('#input').val().trim().toUpperCase();
    if (validationList.includes(fave)) {
        favesList.push(fave);
    }
    $('#input').val('');
    faveRender();
}

const checkSymbol = function () {
    const symbolName = $(this).text();
    const queryURL = `https://api.iextrading.com/1.0/stock/${symbolName}/batch?types=quote,news,logo,company`;
    const newsURL = `https://api.iextrading.com/1.0/stock/${symbolName}/news/last/10`;
    let = now = new Date();

    $.ajax({
        url: queryURL,
        method: 'GET'
    }).then(function (response) {

        // LOGO
        $(".logo").html(`<img src="${response.logo.url}" style="width:250px"/>`);

        // Company Name
        $(".companyName").html(`<h1>${response.company.companyName}</h1>`);

        // CEO
        $(".ceoName").html(`<h2>CEO: ${response.company.CEO}</h2>`);

        // Price
        $(".currentPrice").html(`<h2>Current Price: $${response.quote.latestPrice}</h2>`);
    })
    $.ajax({
        url: newsURL,
        method: 'GET'
    }).then(function (response) {
        // News
        $(".news").empty();
        $(".news").html(`<h3>News</h3>`);
        for (let i = 0; i < response.length; i++) {
            $(".news").append(`<h4><a href="${response[i].url}" target="_blank">${response[i].headline}</a></h4><time>${response[i].datetime}</time><summary>${response[i].summary}</summary><br />`)
        }    })
}

const pullSymbols = function () {
    $.ajax({
        url: "https://api.iextrading.com/1.0/ref-data/symbols",
        method: 'GET'
    }).then(function (response) {
        for (let i = 0; i < response.length; i++) {
            validationList.push(response[i].symbol)
        }
    })
    render();
}

const consoleLog = function () {
    console.log("it works?")
}

render();
pullSymbols();
$('#submitButton').on('click', addButton);
$('#clearButton').on('click', clearButton);
$('#favoriteButton').on('click', favoriteButton);
$('.buttons').on('click', '.stock', checkSymbol);
$('.faveButtons').on('click', '.stock', checkSymbol);