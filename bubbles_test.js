

function bubbles_test(data){

	var width = 600, height = 600;

	var svg = d3.select("#bubbles")
		.append("svg")
		.attr("width", width)
    	.attr("height", height)
    	.append("g");

    var format = d3.format(",d");

    var pack = d3.pack()
    .size([width - 2, height - 2])
    .padding(3);

    

    var root = d3.hierarchy(data)
      .each(function(d) { return d.data.movie_title})
      .sum(function(d) { return d.imdb_score; })
      .sort(function(a, b) { return b.bechdel_rating - a.bechdel_rating; });

    pack(root);

    var node = svg.select("g")
      .selectAll("g")
      .data(root.descendants())
      .enter().append("g")
      .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; })
      .attr("class", function(d) { return "node" + (!d.children ? " node--leaf" : d.depth ? "" : " node--root"); })
      .each(function(d) { d.node = this; })
      .on("mouseover", hovered(true))
      .on("mouseout", hovered(false));


    node.append("circle")
      .attr("id", function(d, i) { return "node-" + i; })
      .attr("r", function(d) { return d.imdb_score; });

    var leaf = node.select(function(d) { return !d.children ? this : null; })
      .classed("node--leaf", true)
    .select(function(d) { return d.data.movie_title ? this : null; });

    leaf.append("clipPath")
      .attr("id", function(d, i) { return "clip-" + i; })
    .append("use")
      .attr("xlink:href", function(d, i) { return "#node-" + i + ""; });

    leaf.append("text")
      .style("font-size", function(d) { return Math.sqrt(d.imdb_score) * 2 + "px"; })
      .attr("clip-path", function(d, i) { return "url(#clip-" + i + ")"; })
    .selectAll("tspan")
      .data(function(d) { return d.data.movie_title.split(/\s+/g); })
    .enter().append("tspan")
      .attr("x", 0)
      .attr("y", function(d, i, nodes) { return 1.3 + (i - nodes.length / 2 - 0.5) + "em"; })
      .text(function(d) { return d; });  

    node.append("title")
      .text(function(d) { return (d.data.movie_title || "N/A") + "\n" + (d.children ? "" : d.parent.data.name + "\n") + format(d.value); });
};

function hovered(hover) {
  return function(d) {
    d3.selectAll(d.ancestors()
      .map(function(d) { return d.node; }))
      .classed("node--hover", hover);
  };
}


