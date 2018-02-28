queue()
.defer(d3.csv,'IMDB_movies/merged_all_imdb_bechdel.csv')
.await(draw);

var wordCount;

function draw(error, data){
    if (error) throw error;

wordCount = new wc(data);