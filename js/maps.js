var citymap = {};
citymap['6'] = {
	center: new google.maps.LatLng(53.027914, 6.575063),
	color: '#FF0000',
	title: 'Highway entrance',
	description: 'In the north of Assen, you can find a business park located close to the highway A28.'
};

citymap['14'] = {
	center: new google.maps.LatLng(53.020294, 6.575874),
	color: '#0066FF',
	title: 'Rustige woonwijk',
	description: 'The neighborhood Marsdijk is a lively residential area with around 13.000 residents. The recording at this location was done close to a playground for young children.'
};

citymap['29'] = {
	center: new google.maps.LatLng(53.007009, 6.564543),
	color: '#33CC33',
	title: 'Woonwijk',
	description: 'The recording in Noorderpark, a quiet residential area, was done close to a playground for young children.'
};

citymap['44'] = {
	center: new google.maps.LatLng(52.992336, 6.555561),
	color: '#33CC33',
	title: 'Primary School',
	description: 'This residential area close to the city centre and the Asserbos is sometimes crowded with children going to elementary school.'
};


citymap['59'] = {
	center: new google.maps.LatLng(52.979213, 6.542447),
	color: '#0066FF',
	title: 'Baggelhuizen/Residential area',
	description: 'Baggelhuizen is a residential area close to the Asserbos and the Baggelhuizerplas. Furthermore this neighborhood is close to the TT-Circuit, the military shooting area and the highway A28.'
};


citymap['93'] = {
	center: new google.maps.LatLng(52.990939, 6.547211),
	color: '#FF0000',
	title: 'Forest',
	description: 'The Asserbos is a forest of 114 hectare between the city centre of Assen and the Baggelhuizen neighborhood. A road that connects the city centre and Baggelhuizen runs straight through the forest. '
};

citymap['156'] = {
	center: new google.maps.LatLng(52.977516, 6.548337),
	color: '#FFFF00',
	title: 'Assen',
	description:'This is an intersection connecting the A28 highway with the  Europaweg.'
};

citymap['160'] = {
	center: new google.maps.LatLng(52.992477, 6.570319),
	color: '#33CC33',
	title: 'Trainstation',
	description: 'The Trainstation of Assen'
};

citymap['171'] = {
	center: new google.maps.LatLng(53.017673, 6.570377),
	color: '#33CC33',
	title: 'Residential area',
	description: 'The recordings here were located at a new junction connecting Marsdijk and Peelo and leading to the A28 and the city centre. '
};

citymap['201'] = {
	center: new google.maps.LatLng(53.003586, 6.507009),
	color: '#FFFF00',
	title: 'Woonwijk/bussluis',
	description: 'Kloosterveen is a new neighborhood. The recording was done close to a bus lane.'
};

var cityCircle;


function initializeAll() {
	// Create the map.
	var mapOptions = {
		zoom: 12,
		center: new google.maps.LatLng(52.9989785, 6.5732356),
		mapTypeId: google.maps.MapTypeId.TERRAIN //SATELLITE ROADMAP TERRAIN
	};

	var map = new google.maps.Map(document.getElementById('map-canvas'),mapOptions);
	var infoWindow = new google.maps.InfoWindow();

	for (var node in citymap) {
		var populationOptions = {
			strokeColor: '#FF0000',
			strokeOpacity: 0.0,
			strokeWeight: 2,
			fillColor: citymap[node].color,
			fillOpacity: 0.35,
			map: map,
			center: citymap[node].center,
			radius: 250,
		};
		// Add the circle for this city to the map.
		cityCircle = new google.maps.Circle(populationOptions);

		var contentString = 
			'<div id="content">'+
			'<div id="siteNotice">'+
			'</div>'+
			'<h1 id="firstHeading" class="firstHeading">'+
			'Locatie ' + node + ': ' + citymap[node].title +
			'</h1>'+
			'<div id="bodyContent">'+
			citymap[node].description+
			'<p><a href="results.php?node=' +node+ '">'+
			'Results'+
			'</a></div>'+
			'</div>';

		var titleString = 
			'Locatie ' + node + ': ' + node.title;

		var marker = new google.maps.Marker({
			position: citymap[node].center,
			map: map,
			title: titleString,
				//title: citymap[node].title,
			description: contentString
		});

		google.maps.event.addListener(marker, 'click', function() {
			infoWindow.setContent(this.description)
				infoWindow.open( map, this );
		});
	}

}

function initializeOne(node) {
	var mapOptions = {
		zoom: 15,
		center: citymap[node].center,
		mapTypeId: google.maps.MapTypeId.TERRAIN //SATELLITE ROADMAP TERRAIN
	};

	var map = new google.maps.Map(document.getElementById('smallmap-canvas'),mapOptions);
	var infoWindow = new google.maps.InfoWindow();

	var marker = new google.maps.Marker({
		position: citymap[node].center,
		map: map,
		title: citymap[node].title,
	});
}
