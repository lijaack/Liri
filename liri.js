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
    searchObject = searchObject + " " + nodeArgs[i];
}

// check command and function
function checkCommand(command, searchObject){
    switch(command){
        case "concert-this":    if(searchObject){
                                        concertThis(searchObject);
                                    } else { 
                                        concertThis("ariana grande");
                                    }
                                break;

        case "spotify-this-song":  if(searchObject){
                                        spotifyThis(searchObject);
                                    } else{
                                        spotifyThis("The Sign Ace of Base");
                                    }
                                break;

        case "movie-this":      if(searchObject){
                                        movieThis(searchObject);
                                    } else{
                                        movieThis("Mr. Nobody");    
                                    }
                                break;

        case "do-what-it-says": doThis();
                                break;

        default: console.log("sorry, I couldn't understand your request")
                                break;                
    }
}


//spotify

function spotifyThis(songName){
        spotify
            .search({ type: 'track', query: songName, limit: 1})
            .then(function(response) {
                console.log("==================Song Info==================");
                console.log("");
                console.log("Artist Name: " + response.tracks.items[0].artists[0].name);
                console.log("Song Name: " + response.tracks.items[0].name);
                console.log("Spotify Link: " + response.tracks.items[0].external_urls.spotify);
                console.log("Album Name: " + response.tracks.items[0].album.name);
                console.log("")
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
            console.log("==================Concert Info==================");
            console.log("");
            console.log("Venue: " + response.data[0].venue.name);
            console.log("Location: " + response.data[0].venue.city);
            console.log("Date: " + response.data[0].datetime);
            console.log("");
        }
    );
}


//movies

function movieThis(movieName){
        var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
        axios.get(queryUrl).then(
            function(response) {
            console.log("==================Movie Info==================");
            console.log("");
            console.log("Title: " + response.data.Title);
            console.log("Year: " + response.data.Year);
            console.log("imdbRating: " + response.data.imdbRating);
            console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
            console.log("Country: " + response.data.Country);
            console.log("Language: " + response.data.Language);
            console.log("Plot: " + response.data.Plot);
            console.log("Actors: " + response.data.Actors);
            console.log("");

            }
        );
  
}

// do random text
function doThis(){
    fs.readFile("random.txt", "utf8", function(error, data) {
        if (error) {
          return console.log(error);
        }
        var dataCommand = [];
        var dataObject = [];
        var dataArr = data.split(",");


        for (var i = 0; i < dataArr.length; i++){
            if(i % 2 === 0){
                dataCommand.push(dataArr[i].trim());
            } else { 
                dataObject.push(dataArr[i].trim());
            }   
        }
        for (var j = 0; j < dataCommand.length; j++){
            checkCommand(dataCommand[j], dataObject[j])
        }

    });
 
}

checkCommand(command, searchObject);