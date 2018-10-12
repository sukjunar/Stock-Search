const stocksList = ['FB', 'AAPL', 'TSLA', 'GOOG'];
const favesList = [];

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
    stocksList.push(stock);
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

    favesList.push(fave);
    $('#input').val('');
    faveRender();
}

const checkSymbol = function () {
    const symbolName = $(this).text();
    const queryURL = `https://api.iextrading.com/1.0/stock/${symbolName}/batch?types=quote,news,logo,company`;
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
        
        // News
        $(".news").empty();
        $(".news").html(`<h2>News</h2>`);
        for (let i = 0; i < response.news.length; i++) {
            $(".news").append(`<h3><a href="${response.news[i].url}">${response.news[i].headline}</a></h3><time>${response.news[i].datetime}</time><p>${response.news[i].summary}</p>`)
        }
    })
}

const randomFunction = function () {
    console.log("it works?")
}

render();
$('#submitButton').on('click', addButton);
$('#clearButton').on('click', clearButton);
$('#favoriteButton').on('click', favoriteButton);
$('.buttons').on('click', '.stock', checkSymbol);