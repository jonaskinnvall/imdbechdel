queue()
.defer(d3.csv,'IMDB_movies/merged_all_imdb_bechdel.csv')
.await(draw);

var wc;
var bubbles;

function draw(error, data){
    if (error) throw error;

bubbles = new bubbles(data);
wc = new wc(data);

}