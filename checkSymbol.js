const generateInfo = function () {

    const queryURL = `https://api.iextrading.com/1.0/stock/AA/batch?types=company,quote,news,company,logo`
  
    $.ajax({
      url: queryURL,
      method: 'GET'
    }).then(function(response) {
        console.log(response);
    }
    )
}

$('#').on('click', checkSymbol);