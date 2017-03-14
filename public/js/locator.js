
function areaZip() {
  $('form').submit(function(e) {

    e.preventDefault()
  })
  $('#search').keypress(function(e) {
    if (e.keyCode === 13) {
      $('.marketInfo').empty();
      var zip = $('#search').val()
      getMarket(zip);
   }
  });
}
function getMarket(zip) {
  var resultsStr= ""
  var markets = $.get("http://search.ams.usda.gov/farmersmarkets/v1/data.svc/zipSearch?zip=" + zip).then(function(markets) {
     var data = markets.results;

     for (var i = 0; i < data.length; i++) {
       resultsStr = "\n<tr class=\"FM" + i + "\">\n<td data-field=\"id\">" + data[i].marketname + "</td>\n"
       $(".marketInfo").append(resultsStr)
       getInfo(data[i].id, i)
      }
  });
}

function getInfo(id, i) {

  var info = $.get("http://search.ams.usda.gov/farmersmarkets/v1/data.svc/mktDetail?id=" + id).then(function(info) {
    address = info.marketdetails.Address;
    //products = info.marketdetails.Products;
    //schedule = info.marketdetails.Schedule;
    var str = "<td data-field=\"address\">" + address + "</td>\n</tr>"
    //data-field=\"schedule\">" + schedule + "</td>\n<td data-field=\"products\"" + products + "</td>\n</tr>");
    console.log(str);
    $(".FM"+i).append(str)
  });
}

areaZip();
