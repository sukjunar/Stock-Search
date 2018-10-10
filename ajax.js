const checkSymbol = function () {

  const queryURL = `https://api.iextrading.com/1.0/stock/AA/batch?types=quote,news,logo,company`;
  let = now = new Date();

  $.ajax({
    url: queryURL,
    method: 'GET'
  }).then(function (response) {
    console.log(response)
    console.log(response.length)
  })
}
    
$('#submitButton').on('click', checkSymbol);