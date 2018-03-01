function initMap() {

    var markerArray = [];
    var stepDisplay = new google.maps.InfoWindow;
    var directionsService = new google.maps.DirectionsService;
    var directionsDisplay = new google.maps.DirectionsRenderer;

    var geocoder = new google.maps.Geocoder();

    var shibuya = {lat: 35.658034, lng: 139.701786};
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 14,
      center: shibuya
    });

    directionsDisplay.setMap(map);

    var service = new google.maps.places.PlacesService(map);


    document.getElementById('search').addEventListener('click', function() {
    calculateAndDisplayRoute(directionsService, directionsDisplay, geocoder, markerArray, stepDisplay, map);
    service.textSearch({location: map.getCenter(),radius: '500', query: 'hikarie'}, callback);
    });


}

function callback(results, status) {
if (status == 'OK') {
var summaryPanel = document.getElementById('directions-panel');
summaryPanel.innerHTML = 'lululu';
}}

function calculateAndDisplayRoute(directionsService, directionsDisplay, geocoder) {


        var waypts = [];
        // {location:"ユーロスペース", stopover:true}
        var checkboxArray = document.getElementsByName('wp');
        for (var i = 0; i < checkboxArray.length; i++) {
            if (checkboxArray[i].value != ''){
              waypts.push({
              location: checkboxArray[i].value,
              stopover: true
            });
            }
        }




        directionsService.route({
          origin: document.getElementById('start').value,
          destination: document.getElementById('goal').value,
          waypoints: waypts,
          optimizeWaypoints: true,
          travelMode: 'WALKING'
        }, function(response, status) {
          if (status === 'OK') {
            directionsDisplay.setDirections(response);
//            var route = response.routes[0];
//            var summaryPanel = document.getElementById('directions-panel');
//            summaryPanel.innerHTML = '';
//            // For each route, display summary information.
//            summaryPanel.innerHTML = response.geocoded_waypoints + '<br>';
////            summaryPanel.innerHTML = response.routes[0].legs[0].start_location+'<br>';
////            summaryPanel.innerHTML = directionsGeocodedWaypoint.place_id;
//            for (var i = 0; i < route.legs.length; i++) {
//              var routeSegment = i + 1;
//              summaryPanel.innerHTML += '<b>Route Segment: ' + routeSegment +
//                  '</b><br>';
//
//              summaryPanel.innerHTML += route.legs[i].start_address + ' to ';
//              summaryPanel.innerHTML += route.legs[i].end_address + '<br>';
//              summaryPanel.innerHTML += route.legs[i].distance.text + '<br><br>';
//            }
          } else {
            window.alert('Directions request failed due to ' + status);
          }
        });

geocoder.geocode({'address': document.getElementById('start').value},
function(results, status) {
if (status == 'OK') {
var summaryPanel = document.getElementById('directions-panel');
//            summaryPanel.innerHTML = results.placeID + '<br>';
summaryPanel.innerHTML = results.address_components + 'lalala<br>';
} else {
alert('Geocode was not successful for the following reason: ' + status);
}
});

}