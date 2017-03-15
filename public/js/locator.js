
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
       resultsStr = "\n<tr class=\"FM" + i + "\">\n<td class=\"name\" data-field=\"id\">" + data[i].marketname + "</td>\n"
       $(".marketInfo").append(resultsStr)
       getInfo(data[i].id, i)
      }
  });
}

function getInfo(id, i) {
  var info = $.get("http://search.ams.usda.gov/farmersmarkets/v1/data.svc/mktDetail?id=" + id).then(function(info) {
    var address = info.marketdetails.Address;
    var map = info.marketdetails.GoogleLink;
    var str = "<td class=\"address\" data-field=\"address\"><a href=\"" + map + "\">" + address + "</a></td>\n</tr>";

    $(".FM"+i).append(str)
  });
}

function getMap() {
 $("td").onclick(function() {

 })
}


areaZip();
