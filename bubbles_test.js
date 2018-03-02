

function bubbles_test(data){

	var width = 600, height = 600;

	var svg = d3.select("#bubbles")
		.append("svg")
		.attr("width", width)
    	.attr("height", height)
    	.append("g");
    	//.attr("transform", "translate(" + width/2 + "," +height/2+")");

    var format = d3.format(",d");

    var pack = d3.pack()
    .size([width - 2, height - 2])
    .padding(3);

    var root = d3.hierarchy(data)
      .each(function(d) { if (/^other[0-9]+$/.test(d.data.name)) d.data.name = null; })
      .sum(function(d) { return d.budget; })
      .sort(function(a, b) { return b.value - a.value; });



}
