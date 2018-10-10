const stocks = ['FB', 'AAPL', 'TSLA', 'GOOG'];

const render = function () {
    $('.buttons').empty();
    stocks.forEach(function(element) {
        let newButton = $('<button>');
        newButton.addClass('stock');
        newButton.attr('data-name', element);
        newButton.text(element);
        $('.buttons').append(newButton);
    })
}
render ();

const addButton = function(event) {
    event.preventDefault();
    const stock = $('#input').val().trim().toUpperCase();
    
    console.log(stock);
    console.log(stocks)
    console.log(stock == false)
    if (stock == true) {
    stocks.push(stock);;
    }
    $('#input').val('');
    render();
}

const checkSymbol = function () {

    const queryURL = `https://api.iextrading.com/1.0/ref-data/symbols`;
    let = now = new Date();
  
    $.ajax({
      url: queryURL,
      method: 'GET'
    }).then(function(response) {}
    )
}
  checkSymbol()

$('#submitButton').on('click', addButton);