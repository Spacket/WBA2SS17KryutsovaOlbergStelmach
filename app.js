var express = require('express');
var app = express();
var request = require('request');
var fs = require('fs');
//var endpoints = require('endpoints/endpoints_methods.json');
//const movie = require('./p_filminfo');




const settings = {
    
    port: 3000
};

//+++++++++++++++++++++++++Request URL+++++++++++++++++++++++++

//Discover Movie


https://api.themoviedb.org/3/discover/movie?api_key=<<api_key>>&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1


var main = 'https://api.themoviedb.org/3/';
var api_key_v3 = '?api_key=8e0b27a52deab0516e45b95a931a11fa';
var api_key_v4 = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ZTBiMjdhNTJkZWFiMDUxNmU0NWI5NWE5MzFhMTFmYSIsInN1YiI6IjU5NDc5ZjFmYzNhMzY4MTZjNTAzY2QxZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.TokALfhXEbRIxLWJer78yYscW4T5b7MGt4QxEgBcJKQ';

           
//+++++++++++++++++++++++++GET Funktionen++++++++++++++++++++++++++

// get random movie
app.get('/discover_movie', function(req, res){
    
    var discover_movie = main +'discover/movie'+api_key_v3+'&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1';

    request(discover_movie, function(error, response, body){
        if(!error && response.statusCode==200){
            var data = JSON.parse(body);
            var obj = JSON.stringify(data);
        
        
        fs.writeFile(__dirname+"/data.json",obj, function(err){
            if (err)throw err;
          });
        }
        fs.readFile("data.json", 'UTF8', function(err, rep){
            if(rep){
                res.type('json').send(rep);
            }
            else {
                res.status(404).type("text").send("Keine Filme verfügbar");
            }
        });
});
});

https://api.themoviedb.org/3/find/tt2345759?api_key=8e0b27a52deab0516e45b95a931a11fa&language=en-US&external_source=imdb_id

//Find specific movie
app.get('/:movie_id', function(req, res){
    var movie_id = req.params.movie_id;
    var type = "find/";
    var type_2 = "&language=en-US&external_source=imdb_id";
    var url = main + type + movie_id + api_key_v3 + type_2;
    
   request(url, function(error, response, body){
        if(!error && response.statusCode==200){
            var data = JSON.parse(body);
            var obj = JSON.stringify(data);
        
        
        fs.writeFile(__dirname+"/data.json",obj, function(err){
            if (err)throw err;
          });
        }
        fs.readFile("data.json", 'UTF8', function(err, rep){
            if(rep){
                res.type('json').send(rep);
            }
            else {
                res.status(404).type("text").send("Keine Filme verfügbar");
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