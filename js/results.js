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
var nodeData = citymap[node]

// Read in a csv
$.ajax({
    url: "data/data_concat/node006.csv",
    success: function (csvd) {
        data = $.csv2Array(csvd);
    },
    dataType: "text",
    complete: function () {
        // call a function on complete 
			 console.log(data);
			 doStuff(data);
    }
});

function doStuff (data) {

	 document.getElementById("nodeDescription").innerHTML = 
			nodeData.description;
	 document.getElementById("nodeAppraisalPlot").innerHTML = 
			'<img alt="Human Appraisal Plot" src="img/human_appraisals/Human_Appraisal_node' 
			+ zeroPad(node,3) + '.png">';

	 // Create a nice dropdown menu to switch nodes 
	 var dropdownHTML = '<button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-expanded="false">' +
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
}

