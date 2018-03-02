/*
Author: Jonas Kinnvall & Gabriel Berthold
*/

function wc(data){

    let div = '#wc';

    // let parentWidth = $(div).parent().width();
    // let margin = {top: 0, right: 0, bottom: 0, left: 0},
    //     width = parentWidth - margin.left - margin.right,
    //     height = 500 - margin.top - margin.bottom;
    let width = 600, height = 600;
    //Set colors
    // let colors = colorbrewer.Set3[5];
    let color = d3.scaleOrdinal(d3.schemeCategory20);

    //Split string of words into array of strings and keep track of the word count
   // let wordString = data[62].plot_keywords;
    
     let wordString = "";

    let tempData = data.forEach(function(d){
        
         let tempStr = d.plot_keywords;

         wordString = wordString + tempStr;

     })


    
    //onsole.log(wordString);
    //console.log(data);
    drawcloud(wordString);
    
    function drawcloud(wordString){
    let wordCount = {};

    let words = wordString.split(/[ '\-\(\)\*":;\[\]|{},.!?]+/);
    // console.log(words)
    // console.log(wordCount)
    // console.log(data);
    // console.log(wordString);
    // console.log(words);
    if(words.length == 1){
        wordCount[words[0]] = 1;
    }
    else{
        words.forEach(function(word){
            if(word != "" && word.length > 1)
                if(wordCount[word]){
                    wordCount[word]++;
                }
                else{
                    wordCount[word] = 1;
                }
        })
        // console.log(wordCount)
    }

    let wordEntries = d3.entries(wordCount);

    let fontScale = d3.scaleLinear()
        .domain([0, d3.max(wordEntries, function(d){return d.value;})])
        .range([1,50]);


    d3.layout.cloud().size([width, height])
    .timeInterval(20)
    .words(wordEntries)
    .fontSize(function(d) { return fontScale(+d.value); })
    .text(function(d) { return d.key; })
    .rotate(function() { return ~~(Math.random() * 2) * 90; })
    .font("Impact")
    .on("end", draw)
    .start();
    

        function draw(words){
            d3.select(div).append("svg")
            .attr("width", width)
            .attr("height", height)
            .append("g")
            .attr("transform", "translate(" + [width >> 1, height >> 1] + ")")
            .selectAll("text")
            .data(words)
            .enter().append("text")
            .style("font-size", function(d) { return fontScale(d.value) + "px"; })
            .style("font-family", "Impact")
            .style("fill", function(d, i) { return color(i); })
            .attr("text-anchor", "middle")
            .attr("transform", function(d) {
            return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
            })
            .text(function(d) { return d.key; });
        }
         d3.layout.cloud().stop();
    }    

    this.chooseWords = function(data){
            wordString = "";

            wordString += data;
            console.log(wordString);
             
            drawcloud(wordString);


    }

}