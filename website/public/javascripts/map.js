var map;
var infoWindows = [];

function initialize() {
	var mapOptions = {
		zoom: 8,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	map = new google.maps.Map(document.getElementById('map_canvas'), mapOptions);
	for (var i = 0; i < locations.length; i++) {
		var location = locations[i];
		var myLatLng = new google.maps.LatLng(location.latitude, location.longitude);
		var marker = new google.maps.Marker({
			position: myLatLng,
			map: map,
			title: location.name,
			zIndex: 1
		});
		var infowindow = new google.maps.InfoWindow({
			content: location.name
		});
		infoWindows.push(infowindow);
		addMarkerListener(marker,infowindow);
	}

	function addMarkerListener(marker,infowindow) {
		google.maps.event.addListener(marker, 'click', function() {
		closeAllInfoWindows();
		infowindow.open(map,marker);
	});
}

function closeAllInfoWindows() {
	for(var i in infoWindows) {
		infoWindows[i].close();
	}
}

// Try HTML5 geolocation
if(navigator.geolocation) {
	navigator.geolocation.getCurrentPosition(function(position) {
	var pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

	map.setCenter(pos);
	map.setZoom(12);
}, function() {
	handleNoGeolocation(true);
});
} else {
	// Browser doesn't support Geolocation
	handleNoGeolocation(false);
	}
}

function handleNoGeolocation(errorFlag) {
	if (errorFlag) {
		var content = 'Error: The Geolocation service failed.';
	} else {
		var content = 'Error: Your browser doesn\'t support geolocation.';
	}

	var options = {
		map: map,
		position: new google.maps.LatLng(60, 105),
		content: content
	};

	var infowindow = new google.maps.InfoWindow(options);
	map.setCenter(options.position);
}
google.maps.event.addDomListener(window, 'load', initialize);
