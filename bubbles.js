


function bubbles(data){


	var width = 600, height = 600;

	data.forEach(function(d) {
    d.budget = +d.budget;
    d.bechdel_rating = +d.bechdel_rating;

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
    .range([2,30]);

    console.log(maxbudget)

    var forceX = d3.forceX(function(d){
    	if(d.bechdel_rating == 0){
    		return width/4
    	}
    	else if (d.bechdel_rating == 1){
    		return -width/4
    	}
    	else if (d.bechdel_rating == 2){
    		return width/4
    	}
    	else {
    		return -width/4
    	}
    }).strength(0.1)

    var forceY = d3.forceY(function(d){
    	if(d.bechdel_rating == 0){
    		return height/4
    	}
    	else if (d.bechdel_rating == 1){
    		return height/4
    	}
    	else if (d.bechdel_rating == 2){
    		return -height/4
    	}
    	else {
    		return -height/4
    	}
    }).strength(0.1)

    var forceCollide = d3.forceCollide(function(d){
    	return radiusScale(d.budget) + 1
     })

    var simulation = d3.forceSimulation()
    .force("x", forceX)
    .force("y", forceY)
    .force("collide", forceCollide)


    var circles = svg.selectAll(".budget")
    	.data(data)
    	.enter().append("circle")
    	.attr("class", "budget")
    	.attr("r", function (d){
    		return radiusScale(d.budget)
    	})
    	.attr("fill", "lightblue")
    	.on("click", function(d){
			sectionToSend(d);
    		console.log(d);
    	})

    	d3.select("#bechdel").on("click", function(){
    		console.log("you are stupid, this doesnt work yet")
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

	function sectionToSend(data){
		wc.chooseWords(data);
	}

    
}



















