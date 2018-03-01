   function initMap() {
        var markerArray = [];
        var stepDisplay = new google.maps.InfoWindow;
        var directionsService = new google.maps.DirectionsService;
        var directionsDisplay = new google.maps.DirectionsRenderer;
        var shibuya = {lat: 35.658034, lng: 139.701786};
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 14,
          center: shibuya
        });
        directionsDisplay.setMap(map);

        document.getElementById('search').addEventListener('click', function() {
          calculateAndDisplayRoute(directionsService, directionsDisplay,markerArray, stepDisplay, map);
        });

        ////input autocomplete
//        var input1 = document.getElementById('start');
//        var autocomplete1 = new google.maps.places.Autocomplete(input1, );
//        autocomplete1.bindTo('bounds', map);

      }

      function calculateAndDisplayRoute(directionsService, directionsDisplay) {
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
            var route = response.routes[0];
            var summaryPanel = document.getElementById('directions-panel');
            summaryPanel.innerHTML = '';
            // For each route, display summary information.
            for (var i = 0; i < route.legs.length; i++) {
              var routeSegment = i + 1;
              summaryPanel.innerHTML += '<b>Route Segment: ' + routeSegment +
                  '</b><br>';

              summaryPanel.innerHTML += route.legs[i].start_address + ' to ';
              summaryPanel.innerHTML += route.legs[i].end_address + '<br>';
              summaryPanel.innerHTML += route.legs[i].distance.text + '<br><br>';
            }
          } else {
            window.alert('Directions request failed due to ' + status);
          }
        });
      }