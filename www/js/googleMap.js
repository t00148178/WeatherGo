var map;

function initMap() {

    map = new google.maps.Map(document.getElementById('map'), {

        center: {lat: defaultLat, lng: defaultLng},
        zoom: 6
    });
    map.addListener("click", updateMap)

    var infoWindow = new google.maps.InfoWindow({map: map});

    // Try HTML5 geolocation.
    if (navigator.geolocation) {

        navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            infoWindow.setPosition(pos);
            infoWindow.setContent('Location found.');

            map.setCenter(pos);
            
            getLocationId(position.coords.latitude, position.coords.longitude);
        }, function() {

            getLocationId(defaultLat, defaultLng);
            handleLocationError(true, infoWindow, map.getCenter());
        });
    } else {
        getLocationId(defaultLat, defaultLng);
        handleLocationError(false, infoWindow, map.getCenter());
    }
}


function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
        'Error: The Geolocation service failed.' :
        'Error: Your browser doesn\'t support geolocation.');
}

// map update function
function updateMap(e) {

    var latLng = e.latLng;
    map = new google.maps.Map(document.getElementById('map'), {

        center: {lat: latLng.lat(), lng: latLng.lng()},
        zoom: 8
    });

    map.addListener("click", updateMap)

    getLocationId(latLng.lat(), latLng.lng())

}