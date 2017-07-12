const express = require('express');
var app = express();
var request = require('request');
var fs = require('fs');
//var genre = require('./endpoints/genres.json');
global.data = require("./data");
var bodyparser = require('body-parser');
const users = require('./users');
const watchlists = require('./watchlists')
const router = express.Router();

app.use('/users', users);


//const movie = require('./p_filminfo');




const settings = {

    port: 3000
};

//+++++++++++++++++++++++++Request URL+++++++++++++++++++++++++

var main = 'https://api.themoviedb.org/3/';
var api_key_v3 = '?api_key=8e0b27a52deab0516e45b95a931a11fa';
var api_key_v4 = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ZTBiMjdhNTJkZWFiMDUxNmU0NWI5NWE5MzFhMTFmYSIsInN1YiI6IjU5NDc5ZjFmYzNhMzY4MTZjNTAzY2QxZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.TokALfhXEbRIxLWJer78yYscW4T5b7MGt4QxEgBcJKQ';
var adult_f = "&include_adult=false";
var adult_t = "&include_adult=true";
var pages = "&page=1";
var lang = "&language=en-US";
var q ="&query=";
var sort_pop = "&sort_by=popularity.desc";

//+++++++++++++++++++++++++ User Account ++++++++++++++++++++++++++





//+++++++++++++++++++++++++GET Funktionen++++++++++++++++++++++++++

// get random movie (Discover by best rating)
app.get('/discover_movie', function(req, res){

    var discover_movie = main +'discover/movie'+api_key_v3+'&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1';

    request(discover_movie, function(error, response, body){
        if(!error && response.statusCode==200){
            var data = JSON.parse(body);
            var obj = JSON.stringify(data);


        fs.writeFile(__dirname+"/input_data.json",obj, function(err){
            if (err)throw err;
          });
        }
        fs.readFile("input_data.json", 'UTF8', function(err, rep){
            if(rep){
                res.type('json').send(rep);
            }
            else {
                res.status(404).type("text").send("Keine Filme verfügbar!");
            }
        });
});
});

//----------------//Find specific movie [EXTERNAL via ID]
app.get('/:movie_id', function(req, res){
    var movie_id = req.params.movie_id;
    var type = "find/";
    var type_2 = "&external_source=imdb_id";
    var url = main + type + movie_id + api_key_v3 + lang + type_2;

   request(url, function(error, response, body){
        if(!error && response.statusCode==200){
            var data = JSON.parse(body);
            var obj = JSON.stringify(data);


        fs.writeFile(__dirname+"/input_data.json",obj, function(err){
            if (err)throw err;
          });
        }
        fs.readFile("input_data.json", 'UTF8', function(err, rep){
            if(rep){
                res.type('json').send(rep);
            }
            else {
                res.status(404).type("text").send("Film kann nicht gefunden werden!");
            }
        });
});
});

//Find specific movie [INTERNAL]
app.get('/search/movie/:movie_title', function(req, res){
    var movie_title = req.params.movie_title;
    var type = "search/movie";
    var url = main + type + api_key_v3 + lang + q + movie_title + pages + adult_f;

    request(url, function(error, response, body){
        if(!error && response.statusCode==200){
            var data = JSON.parse(body);
            var obj = JSON.stringify(data);


        fs.writeFile(__dirname+"/input_data.json",obj, function(err){
            if (err)throw err;
          });
        }
        fs.readFile("input_data.json", 'UTF8', function(err, rep){
            if(rep){
                res.type('json').send(rep);
            }
            else {
                res.status(404).type("text").send("Film kann nicht gefunden werden!");
            }
        });
      });
});

//Movie Info
app.get('/movie/:movie_id', function(req, res){
   var movie_id = req.params.movie_id;
    var type = "movie/";
    var url = main + type + movie_id + api_key_v3 + lang;

request(url, function(error, response, body){
        if(!error && response.statusCode==200){
            var data = JSON.parse(body);
            var obj = JSON.stringify(data);


        fs.writeFile(__dirname+"/input_data.json",obj, function(err){
            if (err)throw err;
          });
        }
        fs.readFile("input_data.json", 'UTF8', function(err, rep){
            if(rep){
                res.type('json').send(rep);
            }
            else {
                res.status(404).type("text").send("Film kann nicht gefunden werden!");
            }
        });
});
});

// Get similar movies
app.get('/movie/similar/:movie_id', function(req, res){
   var movie_id = req.params.movie_id;
    var type = "movie/";
    var type_2 = ":movie_id"
    var type_3 = "/similar"
    var url = main + type + type_2 + type_3 + movie_id + api_key_v3 + lang + pages + adult_f;

request(url, function(error, response, body){
        if(!error && response.statusCode==200){
            var data = JSON.parse(body);
            var obj = JSON.stringify(data);


        fs.writeFile(__dirname+"/input_data.json",obj, function(err){
            if (err)throw err;
          });
        }
        fs.readFile("input_data.json", 'UTF8', function(err, rep){
            if(rep){
                res.type('json').send(rep);
            }
            else {
                res.status(404).type("text").send("Keine ähnlichen Filme gefunden!");
            }
        });
});
});

// Find people
app.get('/search/person/:person', function(req, res){
    var person = req.params.person;
    var type = "search/person/";
    var url = main + type + api_key_v3 + lang + q + person + pages + adult_f;

    request(url, function(error, response, body){
        if(!error && response.statusCode==200){
            var data = JSON.parse(body);
            var obj = JSON.stringify(data);


        fs.writeFile(__dirname+"/input_data.json",obj, function(err){
            if (err)throw err;
          });
        }
        fs.readFile("/input_data.json", 'UTF8', function(err, rep){
            if(rep){
                res.type('json').send(rep);
            }
            else {
                res.status(404).type("text").send("Person konnte nicht gefunden werden!");
            }
        });
});
});

// Search by keywords
app.get('/search/keyword/:keyword', function(req, res){
    var keyword = req.params.keyword;
    var type = "search/keyword/";
    var url = main + type + api_key_v3 + q + keyword + pages;

    request(url, function(error, response, body){
        if(!error && response.statusCode==200){
            var data = JSON.parse(body);
            var obj = JSON.stringify(data);


        fs.writeFile(__dirname+"/input_data.json",obj, function(err){
            if (err)throw err;
          });
        }
        fs.readFile("input_data.json", 'UTF8', function(err, rep){
            if(rep){
                res.type('json').send(rep);
            }
            else {
                res.status(404).type("text").send("Keine passende Suchanfrage");
            }
        });
});
});

// Discover movies by Genre
app.get('/discover/movie/genre/:genre', function(req, res){
    var genre = req.params.genre;

        if(genre == "action"){
        genre = 28;
  }
        if(genre == "adventure"){
        genre = 12;
  }
        if(genre == "animation"){
        genre = 16;
  }
        if(genre == "comedy"){
        genre = 35;
  }
        if(genre == "crime"){
        genre = 80;
  }
        if(genre == "documentary"){
        genre = 99;
  }
        if(genre == "drama"){
        genre = 18;
  }
        if(genre == "family"){
        genre = 10751;
  }
        if(genre == "fantasy"){
        genre = 14;
  }
        if(genre == "history"){
        genre = 36;
  }
        if(genre == "horror"){
        genre = 27;
  }
        if(genre == "music"){
        genre = 10402;
  }
        if(genre == "mystery"){
        genre = 9648;
  }
        if(genre == "romance"){
        genre = 10749;
  }
        if(genre == "science fiction"){
        genre = 878;
  }
        if(genre == "tv movie"){
        genre = 10770;
  }
        if(genre == "thriller"){
        genre = 53;
  }
        if(genre == "war"){
        genre = 10752;
  }
        if(genre == "western"){
        genre = 37;
  }

    var type = "discover/movie";
    var url = main + type + api_key_v3 + lang + sort_pop+"&with_genres="+genre;

    request(url, function(error, response, body){
        if(!error && response.statusCode==200){
            var data = JSON.parse(body);
            var obj = JSON.stringify(data);


        fs.writeFile(__dirname+"/input_data.json",obj, function(err){
            if (err)throw err;
          });
        }
        fs.readFile("input_data.json", 'UTF8', function(err, rep){
            if(rep){
                res.type('json').send(rep);
            }
            else {
                res.status(404).type("text").send("Keine passenden Filme gefunden!");
            }
        });
});
});

// GET Release Date by ID
app.get('/movie/release/:r_movie_id', function(req, res){
    var r_movie_id = req.params.r_movie_id;
    var type = "movie/";
    var url = main + type + r_movie_id+"/release_dates"+api_key_v3;

    request(url, function(error, response, body){
        if(!error && response.statusCode==200){
            var data = JSON.parse(body);
            var obj = JSON.stringify(data);


        fs.writeFile(__dirname+"/input_data.json",obj, function(err){
            if (err)throw err;
          });
        }
        fs.readFile("input_data.json", 'UTF8', function(err, rep){
            if(rep){
                res.type('json').send(rep);
            }
            else {
                res.status(404).type("text").send("Keine passende Suchanfrage");
            }
        });
});
});


//+++++++++++++++++++++++++POST Funktionen+++++++++++++++++++++++++++
app.post('/', function(req, res){
});

//++++++++++++++++++++++++++PUT Funktionen++++++++++++++++++++++++++
app.put('/', function(req, res){
});

//++++++++++++++++++++++++++DEL Funktionen+++++++++++++++++++++++++++
app.delete('/', function(req, res){
});


//Errorhandler
app.use(function(err,req,res,next){
    console.error(err.stack);
    res.end(err.status + ' ' + err.messages);
});


//Errorlog mit Zeitangabe
app.use(function (req,res,next){
    console.log('Time: %d' + 'Request-Pfad: ' + req.path, Date.now());
    next();
});

//app.use("/p_filminfo", movie)


app.listen(settings.port, function(){
           console.log("Dienstgeber ist nun auf Port "+settings.port+" verfügbar.");
});
