


function bubbles(data){


	var width = 600, height = 600;

	data.forEach(function(d) {
    d.budget = +d.budget;
 	});

	var maxbudget = d3.max(data, function(d) { 
		//console.log(d.budget)
		return d.budget; }); 
	


	var svg = d3.select("#bubbles")
		.append("svg")
		.attr("width", width)
    	.attr("height", height)
    	.append("g")
    	.attr("transform", "translate(" + width/2 + "," +height/2+")");

    var radiusScale = d3.scaleSqrt().domain([1, maxbudget])
    .range([1,30]);

    console.log(maxbudget)

    var simulation = d3.forceSimulation()
    .force("x", d3.forceX().strength(0.01))
    .force("y", d3.forceY().strength(0.01))
    .force("collide", d3.forceCollide(function(d){return radiusScale(d.budget) + 1}))


    var circles = svg.selectAll(".budget")
    	.data(data)
    	.enter().append("circle")
    	.attr("class", "budget")
    	.attr("r", function (d){
    		return radiusScale(d.budget)
    	})
    	.attr("fill", "lightblue")
    	.on("click", function(d){
    		console.log(d);
    	})

    	simulation.nodes(data)
    	.on('tick', tick)

    function tick(){
    	circles
    		.attr("cx", function (d){
    			return d.x;
    		})
    		.attr("cy", function (d){
    			return d.y;
    		})
    }


    
}



















