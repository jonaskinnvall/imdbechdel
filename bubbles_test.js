

function bubbles_test(data){

	var width = 600, height = 600;

  var color = d3.scaleOrdinal(d3.schemeCategory20);

  var bechdel0 = [], 
      bechdel1 = [], 
      bechdel2 = [], 
      bechdel3 = [],
      bechdelsorted = [];

	var svg = d3.select("#bubbles")
		.append("svg")
		.attr("width", width)
    	.attr("height", height)
    	.append("g");

    var format = d3.format(",d");


    data.forEach(function(d){
       if(d.bechdel_rating == 0){
        //console.log("0")
        bechdel0.push(d)
       }
       else if(d.bechdel_rating == 1){
        //console.log("1")
        bechdel1.push(d)
       }
       else if(d.bechdel_rating == 2){
        //console.log("2")
        bechdel2.push(d)
       }
       else{
        //console.log("3")
        bechdel3.push(d)
       }
    })

    bechdelsorted.push(bechdel0)
    bechdelsorted.push(bechdel1)
    bechdelsorted.push(bechdel2)
    bechdelsorted.push(bechdel3)
    


    var pack = d3.pack()
    .size([width - 2, height - 2])
    .padding(3);

    root = d3.hierarchy({children : bechdelsorted})
      .sum(function(d) { return d.length; })
      .sort(function(a, b) { return b.value - a.value; });

    var pack = pack(root);
    

    var node = svg.selectAll(".node")
      .data(pack.leaves())
      .enter().append("g")
      .attr("class", "node")
      .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; })
      .on("mouseover", hovered(true))
      .on("mouseout", hovered(false))
      .on("click", function(d,i){
        let keywordString = ""; 
        
        for(i = 0; i < d.data.length; i++){
            keywordString += d.data[i].plot_keywords;
        }
        sectionToSend(keywordString);
      })

      console.log(bechdelsorted)

      node.append("circle")
      .attr("id", function(d) { return d.value; })
      .attr("r", function(d) { return d.r; })
      .style("fill", function(d) { return color(d.value); });

      node.append("clipPath")
      .attr("id", function(d) { return "clip-" + d.value; });

      node.append("text")
        .attr("clipPath", function(d){return d.value;})
        .attr("dx", function(d){return -50})
        .text(function(d,i){return "Bechdel rating: " + d.data[i].bechdel_rating})

    node.append("title")
      .text(function(d) { return d.value + "\n" + format(d.value); });

      function sectionToSend(data){
    wc.chooseWords(data);
  }

function hovered(hover) {
  return function(d) {
    d3.selectAll(d.ancestors()
      .map(function(d) { return d.node; }))
      .classed("node--hover", hover);
  };
}

};



  



