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

// Function to get the max value per ten
function maxPerTen (input) {
   var output = [];
   for (var i = 0; i < input.length; i+=10) {
      output.push( Math.max(
               Number(input[i]  ) , 
               Number(input[i+1]) , 
               Number(input[i+2]) , 
               Number(input[i+3]) , 
               Number(input[i+4]) , 
               Number(input[i+5]) , 
               Number(input[i+6]) , 
               Number(input[i+7]) , 
               Number(input[i+8]) , 
               Number(input[i+9]) ) ) ; 
   }
   return output;
}

// Get the node data
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
      '<p><b>Location:<br></b>' +
      nodeData.description +
      '</p><p><b>Date:<br> </b>Friday, March 28 2014' +
      '</p><p><b>Time:<br> </b> 3:23 - 23 : 53' +
      '</p><div id="smallmap-canvas"></div><div id="smallstreetview-canvas"></div>';
   initializeOne(node);

   // Toggle menu for the appraisals
   $("#allMachineAppraisal").button('toggle');
   document.getElementById("nodeAppraisalPlot").innerHTML = 
      '<img alt="Human Appraisal Plot" src="img/appraisals/ESN_Appraisal_Density_node' + 
      zeroPad(node,3) + '.png">';

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

   //   avgFG = averagePerSecond(averagePerSecond(foreground));
   //   avgFG.unshift("Foreground");
   avgBirds = maxPerTen(maxPerTen(birds));
   avgBirds.unshift("Birds");
   avgSpeech = maxPerTen(maxPerTen(speech));
   avgSpeech.unshift("Speech");
   //   avgChild = maxPerTen(maxPerTen(child));
   //   avgChild.unshift("Child");
   //   avgBike = maxPerTen(maxPerTen(bike));
   //   avgBike.unshift("Bike");
   //   avgScooter= maxPerTen(maxPerTen(scooter));
   //   avgScooter.unshift("Scooter");
   avgCar = maxPerTen(maxPerTen(car));
   avgCar.unshift("Car");
   //   avgHeavy = averagePerSecond(averagePerSecond(heavy));
   //   avgHeavy.unshift("Heavy");

   var chart = c3.generate({
      bindto: '#chart',
       data: {
          columns: [avgBirds, avgSpeech, avgCar]
       },
       axis: {
          x: {
             label: 'Time',
       position: 'outer-center',
          }
       }
   });
   chart.axis.min(0);

   var chart = c3.generate({
      bindto: "#pieChart",
       data: {
          // iris data from R
          columns: [
      ['Chaotic', chaotic],
       ['Lively' , lively],
       ['Boring' , boring],
       ['Calm'   , calm],
       ],
       colors: {
          'Chaotic': '#dd0000',
       'Lively' : '#dddd00',
       'Boring' : '#0000dd',
       'Calm'   : '#00dd00'
       },
       type : 'pie',
       }
   });
}
