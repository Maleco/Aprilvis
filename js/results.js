// Function to add leading zeros

function zeroPad(num, numZeros) {
	 var n = Math.abs(num);
	 var zeros = Math.max(0, numZeros - Math.floor(n).toString().length );
	 var zeroString = Math.pow(10,zeros).toString().substr(1);
	 if( num < 0 ) {
			zeroString = '-' + zeroString;
	 }

	 return zeroString+n;
}
var node = document.getElementById("nodeValue").innerHTML;
var nodeData = citymap[node];

// Read in a csv for this node
$.ajax({
	 url: "data/data_concat/node" + zeroPad(node,3) +  ".csv",
	 success: function (csvd) {
			data = $.csv2Array(csvd);
	 },
	 dataType: "text",
	 complete: function () {
			// call a function on complete 
			doStuff(data);
	 }
});

function doStuff (data) {

	 document.getElementById("nodeDescription").innerHTML = 
	 nodeData.description +
			'<br><br><div id="smallmap-canvas"></div>';
	 initializeOne(node);

	 // Toggle menu for the appraisals
	 $("#humanAppraisal").button('toggle');
	 document.getElementById("nodeAppraisalPlot").innerHTML = 
	 '<img alt="Human Appraisal Plot" src="img/human_appraisals/Human_Appraisal_node' 
	 + zeroPad(node,3) + '.png">';

	 // Create a nice dropdown menu to switch nodes 
	 var dropdownHTML = '<button type="button" class="btn btn-info btn-block dropdown-toggle" data-toggle="dropdown" aria-expanded="false" style="color:white">' +
			'Location ' + node + ": " + nodeData.title + '    <span class="caret"></span></button>' +
			'<ul class="dropdown-menu" role="menu">' +
			'<li><a href="results.php?node=' + node + '">Location ' + node + ": " + nodeData.title + '    </a></li>' +
			'<li class="divider"></li>';

	 for (var nod in citymap) 
	 {
			dropdownHTML += 
			'<li><a href="results.php?node=' + nod + '">Location ' + nod + ": " + 
				 citymap[nod].title + '    </a></li>';
	 }

	 dropdownHTML += '</ul>';
	 document.getElementById("nodeDropDown").innerHTML = dropdownHTML;

	 // And now the csv graphs

	 // First gather the data
	 
	 // Sum the 4 quarters (proportion of the total)
	 //  top left, top right, bot left, bot right
	 var pleasantness = [];
	 var eventfulness = [];
	 var foreground = [];
	 var birds = [];
	 var speech = [];
	 var child = [];
	 var bike = [];
	 var scooter = [];
	 var car = [];
	 var heavy = [];

	 var chaotic = 0;
	 var lively = 0;
	 var boring = 0;
	 var calm = 0;

	 for (var i = 1; i < data.length; i++) {
			pleasantness.push(data[i][0]);
			eventfulness.push(data[i][1]);
			foreground.push(data[i][2]);
			birds.push(data[i][3]);
			speech.push(data[i][4]);
			child.push(data[i][5]);
			bike.push(data[i][6]);
			scooter.push(data[i][7]);
			car.push(data[i][8]);
			heavy.push(data[i][9]);

			if (data[i][0] < 0 & data[i][1] < 0) chaotic++;	
			if (data[i][0] > 0 & data[i][1] < 0) lively++;	
			if (data[i][0] < 0 & data[i][1] > 0) boring++;	
			if (data[i][0] > 0 & data[i][1] > 0) calm++;	
	 }

	 function averagePerSecond (input) {
			var output = [];
			for (var i = 0; i < input.length; i+=10) {
				 output.push( 
						Number(input[i]  ) + 
							 Number(input[i+1]) + 
							 Number(input[i+2]) + 
							 Number(input[i+3]) + 
							 Number(input[i+4]) + 
							 Number(input[i+5]) + 
							 Number(input[i+6]) + 
							 Number(input[i+7]) + 
							 Number(input[i+8]) + 
							 Number(input[i+9]) ) ; 
			}
			return output;
	 }

	 var avgChild = []
	 //Average over the seconds
	 for (var i = 0; i < data.length; i+=10) {
			avgChild.push( 
				 Number(child[i]  ) + 
				 Number(child[i+1]) + 
				 Number(child[i+2]) + 
				 Number(child[i+3]) + 
				 Number(child[i+4]) + 
				 Number(child[i+5]) + 
				 Number(child[i+6]) + 
				 Number(child[i+7]) + 
				 Number(child[i+8]) + 
				 Number(child[i+9]) ) ; 
	 }

	 avgFG = averagePerSecond(averagePerSecond(foreground));
	 avgFG.unshift("Foreground");
	 avgBirds = averagePerSecond(averagePerSecond(birds));
	 avgBirds.unshift("Birds");
	 avgSpeech = averagePerSecond(averagePerSecond(speech));
	 avgSpeech.unshift("Speech");
	 avgChild = averagePerSecond(averagePerSecond(child));
	 avgChild.unshift("Child");
	 avgBike = averagePerSecond(averagePerSecond(bike));
	 avgBike.unshift("Bike");
	 avgScooter= averagePerSecond(averagePerSecond(scooter));
	 avgScooter.unshift("Scooter");
	 avgCar = averagePerSecond(averagePerSecond(car));
	 avgCar.unshift("Car");
	 avgHeavy = averagePerSecond(averagePerSecond(heavy));
	 avgHeavy.unshift("Heavy");

	 var chart = c3.generate({
			bindto: '#chart',
			data: {
				 columns: [avgFG, avgBirds, avgSpeech, avgChild, avgBike, avgScooter, avgCar, avgHeavy]
			}
	 });

	 // Now generate the pie chart
	 var pie = new d3pie("pieChart", {
			"header": {
				 "title": {
						"fontSize": 25,
						"font": "open sans"
				 },
				 "subtitle": {
						"color": "#999999",
						"fontSize": 12,
						"font": "open sans"
				 },
				 "location": "top-left",
				 "titleSubtitlePadding": 9
			},
			"size": {
				 "canvasWidth": 350,
				 "pieOuterRadius": "70%"
			},
			"data": {
				 "sortOrder": "value-asc",
				 "content": [
						{
							 "label": "Chaotic",
							 "value": chaotic,
							 "color": "#e700d2"
						},
						{
							 "label": "Calm",
							 "value": calm,
							 "color": "#228835"
						},
						{
							 "label": "Lively",
							 "value": lively,
							 "color": "#d9e98d"
						},
						{
							 "label": "Boring",
							 "value": boring,
							 "color": "#ff0000"
						}
				 ]
			},
			"labels": {
				 "outer": {
						"format": "label-percentage2",
						"pieDistance": 22
				 },
				 "inner": {
						"format": "none",
						"hideWhenLessThanPercentage": 3
				 },
				 "mainLabel": {
						"fontSize": 15
				 },
				 "percentage": {
						"color": "#ffffff",
						"fontSize": 15,
						"decimalPlaces": 0
				 },
				 "value": {
						"color": "#ffffff",
						"fontSize": 25
				 },
				 "lines": {
						"enabled": true
				 },
				 "truncation": {
						"enabled": true
				 }
			},
			"effects": {
				 "pullOutSegmentOnClick": {
						"speed": 400,
						"size": 10
				 }
			},
			"misc": {
				 "gradient": {
						"enabled": true,
						"percentage": 100
				 }
			}
	 });
}

