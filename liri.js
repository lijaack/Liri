require("dotenv").config();

var fs = require("fs");
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var axios = require("axios");
var nodeArgs = process.argv
var command = nodeArgs[2]
var searchObject = "";

for (var i = 3; i < nodeArgs.length; i++){
    searchObject += nodeArgs[i];
}

// check command and function


//change to switch statement later
if (command === "concert-this"){
    
    if(searchObject){
        concertThis(searchObject);
    } else { 
        concertThis("ariana grande");
    }
} else if (command === "spotify-this-song"){
    if(searchObject){
        spotifyThis(searchObject);
    } else{
        spotifyThis("Ace of Base");
    }

}else if (command === "movie-this"){
    if(searchObject){
        movieThis(searchObject);
    } else{
        movieThis("Mr. Nobody");    
    }
    
}else if (command === "do-what-it-says"){
    doThis();
}else{
    console.log("sorry, I couldn't understand your request")
}



//spotify

function spotifyThis(songName){
        spotify
            .search({ type: 'track', query: songName, limit: 1})
            .then(function(response) {
                console.log(response.tracks.items[0].artists[0].name);
            })
            .catch(function(err) {
                console.log(err);
            });
}

//concert
function concertThis(artist){
    var queryUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"
    axios.get(queryUrl).then(
        function(response) {
            console.log("Venue: " + response.data[0].venue.name);
            console.log("Location: " + response.data[0].venue.city);
            console.log("Date: " + response.data[0].datetime);

        }
    );
}


//movies

function movieThis(movieName){
        var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
        axios.get(queryUrl).then(
            function(response) {
            console.log("Title: " + response.data.Title);
            console.log("Year: " + response.data.Year);
            console.log("imdbRating: " + response.data.imdbRating);
            console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
            console.log("Country: " + response.data.Country);
            console.log("Language: " + response.data.Language);
            console.log("Plot: " + response.data.Plot);
            console.log("Actors: " + response.data.Actors);

            }
        );
  
}

function doThis(){
    fs.readFile("random.txt", "utf8", function(error, data) {

        if (error) {
          return console.log(error);
        }
      
        console.log(data);
      
        var dataArr = data.split(",");
      
        console.log(dataArr[0]);
        console.log(dataArr[1]);

      
    });
      
}