/*
Author: Jonas Kinnvall & Gabriel Berthold
*/

function wc(data){

    let div = '#wc';

    let width = 600, height = 600;
    
    //Set colors
    let color = d3.scaleOrdinal(d3.schemeCategory20);

    //Create initial string of evere plot keyword in dataset
    let wordString = "";

    let tempData = data.forEach(function(d){
        
        let tempStr = d.plot_keywords;

        wordString = wordString + tempStr;

    })


    
    //Call function drawcloud
    drawcloud(wordString);


    function drawcloud(wordString){
        //Remove earlier elements from div
        d3.select(div).selectAll("*").remove();
        

        //Create wordcloud
        let wordCount = {};

        let words = wordString.split(/[ '\-\(\)\*":;\[\]|{},.!?]+/);

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
        }

        let wordEntries = d3.entries(wordCount);

        let fontScale = d3.scaleLinear()
            .domain([0, d3.max(wordEntries, function(d){return d.value;})])
            .range([1,50]);

        //Call lib-file to create wordcloud, call draw
        d3.layout.cloud().size([width, height])
        .timeInterval(20)
        .words(wordEntries)
        .fontSize(function(d) { return fontScale(+d.value); })
        .text(function(d) { return d.key; })
        .rotate(function() { return ~~(Math.random() * 2) * 90; })
        .font("Impact")
        .on("end", draw)
        .start();
        
        //Draw wordcloud onto div
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

    //Change data to choosen data in bubbles and call drawcloud again
    this.chooseWords = function(data){
            
            console.log(data)
        wordString = "";
        wordString += data;    
        drawcloud(wordString);
    }
}