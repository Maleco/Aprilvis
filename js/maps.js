var citymap = {};
citymap['all'] = {
	center: new google.maps.LatLng(52.993871, 6.563529),
	color: '#FF0000',
	title: 'All of Assen',
	description: 'This page gives an average indication of the sound appraisal of the city Assen',
	pleasantness: -0.326141325,
	eventfulness: 0.161100319
};

citymap['6'] = {
	center: new google.maps.LatLng(53.027914, 6.575063),
	color: '#FF0000',
	title: 'Highway entrance',
	description: 'North of Assen, one can find a business park located close to highway A28.',
	pleasantness: -0.326141325,
	eventfulness: 0.161100319
};

citymap['14'] = {
	center: new google.maps.LatLng(53.020294, 6.575874),
	color: '#33CC33',
	title: 'Marsdijk, calm residential area',
	description: 'The neighbourhood of Marsdijk is a lively residential area with around 13.000 residents. The recording at this location was performed close to a playground for young children.',
	pleasantness: 0.0211092542,
	eventfulness: -0.0083901408
};

citymap['29'] = {
	center: new google.maps.LatLng(53.007009, 6.564543),
	color: '#FFFF00',
	title: 'Pijperstraat, residential area',
	description: 'The recording in Noorderpark, a quiet residential area, was performed close to a playground for young children.',
	pleasantness: 0.0413660284,
	eventfulness: 0.299170528
};

citymap['44'] = {
	center: new google.maps.LatLng(52.992336, 6.555561),
	color: '#33CC33',
	title: 'Prinses Ireneschool, primary school',
	description: 'This residential area close to the city centre and the Asserbos is sometimes crowded with children going to elementary school.',
	pleasantness: 0.115830636,
	eventfulness: 0.044295792
};

citymap['59'] = {
	center: new google.maps.LatLng(52.979213, 6.542447),
	color: '#FF0000',
	title: 'Gooiland, bus stop',
	description: 'Baggelhuizen is a residential area close to the Asserbos and the Baggelhuizerplas. Furthermore this neighborhood is close to the TT-Circuit, the military shooting area and highway A28.',
	pleasantness: -0.0933560795,
	eventfulness: 0.0135738
};

citymap['93'] = {
	center: new google.maps.LatLng(52.990939, 6.547211),
	color: '#33CC33',
	title: 'Rode Heklaan, forest',
	description: 'The Asserbos is a forest of 114 hectare between the city centre of Assen and the Baggelhuizen neighbourhood. A road connecting the city centre and Baggelhuizen runs straight through the forest.',
	pleasantness: 0.0564743027,
	eventfulness: 0.013545002
};

citymap['156'] = {
	center: new google.maps.LatLng(52.977516, 6.548337),
	color: '#FF0000',
	title: 'VRI Haarweg, highway',
	description: 'This is an intersection connecting the A28 highway with the Europaweg.',
	pleasantness: -0.2630250851,
	eventfulness: 0.052430058
};

citymap['160'] = {
	center: new google.maps.LatLng(52.992477, 6.570319),
	color: '#FF0000',
	title: 'Stationsplein, trainstation',
	description: 'The Trainstation of Assen',
	pleasantness: -0.2678802225,
	eventfulness: 0.183648769
};

citymap['171'] = {
	center: new google.maps.LatLng(53.017673, 6.570377),
	color: '#FF0000',
	title: 'Peelo, overpass',
	description: 'The recordings here were located at a new junction connecting Marsdijk and Peelo and leading to the A28 and the city centre.',
	pleasantness: -0.2228291208,
	eventfulness: 0.117568737
};

citymap['201'] = {
	center: new google.maps.LatLng(53.003586, 6.507009),
	color: '#33CC33',
	title: 'Kloosterveen, bus lane',
	description: 'Kloosterveen is a new neighbourhood. The recording was done close to a bus lane.',
	pleasantness: 0.1220670455,
	eventfulness: -0.1608200557
};

var cityCircle;


function initializeAll() {
   // Create the map.
   var mapOptions = {
      zoom: 13,
      center: new google.maps.LatLng(52.9989785, 6.5732356),
      mapTypeId: google.maps.MapTypeId.TERRAIN //SATELLITE ROADMAP TERRAIN
   };

   var map = new google.maps.Map(document.getElementById('map-canvas'),mapOptions);
   var infoWindow = new google.maps.InfoWindow();

   for (var node in citymap) {
      if (node != 'all') {
         var populationOptions = {
            strokeColor: '#FF0000',
            strokeOpacity: 0.0,
            strokeWeight: 2,
            fillColor: citymap[node].color,
            fillOpacity: 0.55,
            map: map,
            center: citymap[node].center,
            radius: 450,
         };
         // Add the circle for this city to the map.
         cityCircle = new google.maps.Circle(populationOptions);

         var contentString =
            '<div id="content">'+
            '<div id="siteNotice">'+
            '</div>'+
            '<h1 id="firstHeading" class="firstHeading">'+
            'Location ' + node + ': ' + citymap[node].title +
            '</h1>'+
            '<div id="bodyContent">'+
            citymap[node].description+
            '<p style="text-align:center"><a href="results.php?node=' +node+ '">'+
            'Results'+
            '</a></div>'+
            '</div>';

         var titleString =
            'Location ' + node + ': ' + node.title;

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

}

function initializeOne(node) {
	var mapOptions = {
		zoom: 15,
		center: citymap[node].center,
		mapTypeId: google.maps.MapTypeId.TERRAIN //SATELLITE ROADMAP TERRAIN
	};
	var panoramaOptions = {
		position: citymap[node].center,
		pov: {
		heading: 34,
		pitch: 10
		}
	};

	var map = new google.maps.Map(document.getElementById('smallmap-canvas'),mapOptions);
	var infoWindow = new google.maps.InfoWindow();

	var panorama = new google.maps.StreetViewPanorama(document.getElementById('smallstreetview-canvas'), panoramaOptions);

	var marker = new google.maps.Marker({
		position: citymap[node].center,
		map: map,
		title: citymap[node].title,
	});
}
