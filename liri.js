require("dotenv").config();

var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var axios = require("axios");
var nodeArgs = process.argv
var command = nodeArgs[2]
var searchObject = nodeArgs[3]
// check command and function


//change to switch statement later
if (command === "concert-this"){
    
    if(searchObject){
        concertThis(searchObject);
    } else { 
        concertThis();
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
    if(searchObject){
        doThis(searchObject);
    } else{
        doThis();   
    }
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





//movies

function movieThis(movieName){
        var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

        axios.get(queryUrl).then(

            function(response) {
            console.log("Title: " + response.data.Title);
            console.log("Year: " + response.data.Year);
            console.log("imdbRating: " + response.data.imdbRating);
            // console.log("Release Year: " + response.data.   rotten tomato rating here);
            console.log("Country: " + response.data.Country);
            console.log("Language: " + response.data.Language);
            console.log("Plot: " + response.data.Plot);
            console.log("Actors: " + response.data.Actors);

            }
        );
  
}