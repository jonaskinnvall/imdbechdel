


function bubbles(data){


	var div = "#bubbles";

	var parentWidth = $(div).parent().width();
  	var margin = {top: 10, right: 10, bottom: 80, left: 40},
      margin2 = {top: 500 - 50, right: 40, bottom: 20, left: 40},

      width = parentWidth - margin.left - margin.right;
      height = 500 - margin.top - margin.bottom;
      height2 = 500 - margin2.top - margin2.bottom;

    var svg =d3.select(div).append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)

    var format = d3.format(",d");

	var pack = d3.pack()
    	.size([width - 2, height - 2])
    	.padding(3);


    var root = d3.hierarchy(data)
      .each(function(d) { if (/^other[0-9]+$/.test(d.data.movie_title)) d.data.movie_title = null; })
      .sum(function(d) { return d.size; })
      .sort(function(a, b) { return b.value - a.value; });

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
      .attr("r", function(d) { return d.r; });

    var leaf = node.select(function(d) { return !d.children ? this : null; })
      .classed("node--leaf", true)
    .select(function(d) { return d.data.movie_title ? this : null; });

  leaf.append("clipPath")
      .attr("id", function(d, i) { return "clip-" + i; })
    .append("use")
      .attr("xlink:href", function(d, i) { return "#node-" + i + ""; });

  leaf.append("text")
      .style("font-size", function(d) { return Math.sqrt(d.r) * 2 + "px"; })
      .attr("clip-path", function(d, i) { return "url(#clip-" + i + ")"; })
    .selectAll("tspan")
      .data(function(d) { return d.data.name.split(/\s+/g); })
    .enter().append("tspan")
      .attr("x", 0)
      .attr("y", function(d, i, nodes) { return 1.3 + (i - nodes.length / 2 - 0.5) + "em"; })
      .text(function(d) { return d; });

  node.append("title")
      .text(function(d) { return (d.data.name || "N/A") + "\n" + (d.children ? "" : d.parent.data.movie_title + "\n") + format(d.value); });
	

	function hovered(hover) {
  	return function(d) {
    d3.selectAll(d.ancestors()
        .map(function(d) { return d.node; }))
      .classed("node--hover", hover);
 	};
	}
}



















