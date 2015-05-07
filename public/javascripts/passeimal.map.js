;(function(Passeimal){
	Passeimal.Map = function(){	
		this.map = {};
		this.makers = [];
	};

	Passeimal.Map.prototype = function(){
		var init = function(canvas, options) {
			this.map = new google.maps.Map(canvas, options);
		};

		var insertControl = function(control, position) {
			var mapPosition = google.maps.ControlPosition.TOP_LEFT;
			if (position == 'top-left')
				mapPosition = google.maps.ControlPosition.TOP_LEFT;
			this.map.controls[mapPosition].push(control);
		};

		var insertAutocomplete = function(input, options, position){
			var insertAutoComplete = insertControl.bind(this);
			insertAutoComplete(input, position);

			this.autocomplete = new google.maps.places.Autocomplete(input, options);
			this.autocomplete.bindTo('bounds', this.map);

			addAutoCompleteEventListener(this);
		};

		var addAutoCompleteEventListener = function(context){
			var infowindow = new google.maps.InfoWindow();
			  var marker = new google.maps.Marker({
			    map: context.map,
			    anchorPoint: new google.maps.Point(0, -29)
			  });

			google.maps.event.addListener(context.autocomplete, 'place_changed', function() {
				console.log(context.autocomplete);
			    infowindow.close();
			    marker.setVisible(false);
			    var place = context.autocomplete.getPlace();
			    if (!place.geometry) {
			      window.alert("Autocomplete's returned place contains no geometry");
			      return;
			    }

			    // If the place has a geometry, then present it on a map.
			    if (place.geometry.viewport) {
			      context.map.fitBounds(place.geometry.viewport);
			    } else {
			      context.map.setCenter(place.geometry.location);
			      context.map.setZoom(17);  // Why 17? Because it looks good.
			    }
			    marker.setIcon(/** @type {google.maps.Icon} */({
			      url: place.icon,
			      size: new google.maps.Size(71, 71),
			      origin: new google.maps.Point(0, 0),
			      anchor: new google.maps.Point(17, 34),
			      scaledSize: new google.maps.Size(35, 35)
			    }));
			    marker.setPosition(place.geometry.location);
			    marker.setVisible(true);

			    var address = '';
			    if (place.address_components) {
			      address = [
			        (place.address_components[0] && place.address_components[0].short_name || ''),
			        (place.address_components[1] && place.address_components[1].short_name || ''),
			        (place.address_components[2] && place.address_components[2].short_name || '')
			      ].join(' ');
			    }

			    infowindow.setContent('<div><strong>' + place.name + '</strong><br>' + address);
			    infowindow.open(context.map, marker);
		  	});
		};

		return publicApi = {
			init: init,
			insertControl: insertControl,
			insertAutocomplete: insertAutocomplete
		}
	}();
})(Passeimal);