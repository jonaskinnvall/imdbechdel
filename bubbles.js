


function bubbles(data){


	var width = 600, height = 600;
	var alphaTar = 5;
	var str = 0.001

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

    var forceX1 = d3.forceX(function(d){
    	if(d.bechdel_rating == 0){
    		return width/4
    	}
    	else if (d.bechdel_rating == 1){
    		return -width/4
    	}
    	else if (d.bechdel_rating == 2){
    		return width/4
    	}
    	else if (d.bechdel_rating ==3){
    		return -width/4
    	}
    	else{
    		return 0
    	}
    }).strength(str)

    var forceY1 = d3.forceY(function(d){
    	if(d.bechdel_rating == 0){
    		return height/4
    	}
    	else if (d.bechdel_rating == 1){
    		return height/4
    	}
    	else if (d.bechdel_rating == 2){
    		return -height/4
    	}
    	else if (d.bechdel_rating == 3){
    		return -height/4
    	}
    	else{
    		return 0
    	}
    }).strength(str)

    var forceCollide = d3.forceCollide(function(d){
    	return radiusScale(d.budget) + 1
     })

    var simulation = d3.forceSimulation()
    .force("x", d3.forceX().strength(str))
    .force("y", d3.forceY().strength(str))
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
			sectionToSend(d.plot_keywords);
    		console.log(d.plot_keywords);
    	})

    d3.select("#bechdel").on("click", function(){
    	simulation.force("x", forceX1)
    		.force("y", forceY1)
    		.alphaTarget(alphaTar)
    		.restart()

    	//console.log("you are stupid, this doesnt work yet")
    })

    d3.select("#normal").on("click", function(){
    	simulation
    		.force("x", d3.forceX().strength(str))
    		.force("y", d3.forceY().strength(str))
    		.alphaTarget(alphaTar)
    		.restart()

    	//console.log("you dick")
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



















