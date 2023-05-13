function initMap() {
    // Initialize map
    var map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 37.7749, lng: -122.4194}, // Default map center (San Francisco)
      zoom: 12 // Default zoom level
    });
  
    // Add custom markers
    var marker1 = new google.maps.Marker({
      position: {lat: 37.7749, lng: -122.4194},
      map: map,
      title: 'Marker 1'
    });
  
    var marker2 = new google.maps.Marker({
      position: {lat: 37.7831, lng: -122.4039},
      map: map,
      title: 'Marker 2'
    });
  
    // Add event listener to markers
    marker1.addListener('click', function() {
      // Marker 1 click logic
    });
  
    marker2.addListener('click', function() {
      // Marker 2 click logic
    });
  
    // Enable geolocation services
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        var userLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
  
        // Add user location marker
        var userMarker = new google.maps.Marker({
          position: userLocation,
          map: map,
          title: 'Your Location'
        });
  
        // Center map on user location
        map.setCenter(userLocation);
      });
    }
  
    // Enable route planning
    var directionsService = new google.maps.DirectionsService();
    var directionsDisplay = new google.maps.DirectionsRenderer();
    directionsDisplay.setMap(map);
  
    var originInput = document.getElementById('origin');
    var destinationInput = document.getElementById('destination');
    var routeButton = document.getElementById('route-button');
  
    routeButton.addEventListener('click', function() {
      calculateRoute(directionsService, directionsDisplay);
    });
  
    function calculateRoute(service, display) {
      var origin = originInput.value;
      var destination = destinationInput.value;
  
      service.route(
        {
          origin: origin,
          destination: destination,
          travelMode: 'DRIVING'
        },
        function(response, status) {
          if (status === 'OK') {
            display.setDirections(response);
          } else {
            window.alert('Route calculation failed. Please try again.');
          }
        }
      );
    }
  }
  