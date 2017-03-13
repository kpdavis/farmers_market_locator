// function setMap() {
//   var uluru = {lat: -25.363, lng: 131.044};
//   var map = new google.maps.Map(document.getElementById('map'), {
//     zoom: 4,
//     center: uluru
//   });
//   var marker = new google.maps.Marker({
//     position: uluru,
//     map: map
//   });
// }
//
// function initMap() {
//   var map = new google.maps.Map(document.getElementById('map'), {
//     center: {lat: -34.397, lng: 150.644},
//     zoom: 6
//   });
//   var infoWindow = new google.maps.InfoWindow({map: map});
//   // Try HTML5 geolocation.
//   if (navigator.geolocation) {
//     navigator.geolocation.getCurrentPosition(function(position) {
//       var pos = {
//         lat: position.coords.latitude,
//         lng: position.coords.longitude
//       };
//
//     infoWindow.setPosition(pos);
//     infoWindow.setContent('Location found.');
//     map.setCenter(pos);
//     }, function() {
//       handleLocationError(true, infoWindow, map.getCenter());
//     });
//     } else {
//     // Browser doesn't support Geolocation
//       handleLocationError(false, infoWindow, map.getCenter());
//     }
//   }
//
//   function handleLocationError(browserHasGeolocation, infoWindow, pos) {
//     infoWindow.setPosition(pos);
//     infoWindow.setContent(browserHasGeolocation ?
//                               'Error: The Geolocation service failed.' :
//                               'Error: Your browser doesn\'t support geolocation.');
// }
$(document).ready(function() {
  getMarket(areaZip());
})
var areaZip= function() {
  $('#search').keypress(function(e) {
    if (e.keyCode === 13) {
      return $('#search').val()
    }
  });
}
function getMarket(zip) {
  var resulsStr= ""
  var id=""
  var name= ""
   var markets = $.get("http://search.ams.usda.gov/farmersmarkets/v1/data.svc/zipSearch?zip=" + zip);
   for (var i = 0; i < markets.length; i++) {
      id = markets[i].id;
      name = markets[i].marketname;
      resulsStr += "<tr>" + "\n<td data-field=\"id\">" + name + "</td>\n";

      var data = $.get("http://search.ams.usda.gov/farmersmarkets/v1/data.svc/mktDetail?id=" +id);
      address = data.Address;
      products = data.Products;
      schedule = data.Schedule;
      resulsStr += "<td data-field=\"address\">" + address + "</td>\n<td data-field=\"schedule\">" + schedule + "</td>\n<td data-field=\"products\"" + products + "</td>\n</tr>";
      $('.marketInfo').append(resulsStr);
  }

}
