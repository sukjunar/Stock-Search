const stocks = ['FB', 'AAPL', 'TSLA', 'GOOG', 'MSFT'];

const render = function () {
    $('.buttons').empty();
    stocks.forEach(function (element) {
        let newButton = $('<button>');
        newButton.addClass('stock');
        newButton.text(element);
        $('.buttons').append(newButton);
    })
}
render();

const addButton = function (event) {
    event.preventDefault();
    const stock = $('#input').val().trim().toUpperCase();
    $(this).attr("id", "`${stock}`")

    stocks.push(stock);
    $('#input').val('');
}

const checkSymbol = function () {
    const symbolName = $(this).text();
    const queryURL = `https://api.iextrading.com/1.0/stock/${symbolName}/batch?types=quote,news,logo,company`;
    let = now = new Date();

    $.ajax({
        url: queryURL,
        method: 'GET'
    }).then(function (response) {
        console.log(response)
        console.log(response.logo)
        console.log(response.logo.url)
        console.log(response.company.CEO)

        $(".logo").html(`<img src="${response.logo.url}" style="width:300px"/>`)
        $(".companyName").text(`${response.company.companyName}`)
        $(".ceoName").html(`<p>CEO: ${response.company.CEO}</p>`)
        $(".news").append(`<h2><a href="${response.news[0].url}>${response.news[0].headline}</a></h2><p>${response.news[0].summary}</p><h2><a href="${response.news[1].url}>${response.news[1].headline}</a></h2><p>${response.news[1].summary}</p>`)

    })
}

$('#submitButton').on('click', addButton);
$('.stock').on('click', checkSymbol);