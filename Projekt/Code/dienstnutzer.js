const express = require('express');
var dn = express();
var request = require('request');
var fs = require('fs');
var http = require ('http');
var bodyparser = require('body-parser');
const router = express.Router();

/*----------Dienstgeber Ziel definieren---------*/

var dgHost ='http://localhost';
var dgPort =3000;
var dgURL = dgHost + ':' +dgPort;


const settings = {
    port: 8080
};

/*---------Funktionen Dienstgeber---------*/

//get Users
dn.get('/users',function(req, res){
    var url = dgURL+ '/users';
    request(url, function(err, response, body){
        body = JSON.parse(body);
        res.json(body)
    });
});

//get User by ID
dn.get('/users/:user_id',function(req, res){
    var userID = req.params.user_id;
    var url = dgURL+ '/users/' + userID;
    request.get(url, function(err, response, body){
        body = JSON.parse(body);
        res.json(body)
    });
});

//post User
dn.post('/users', bodyparser.json(), function(req, res){
    var url = dgURL+ '/users';
    var userData = req.body;
    console.log(req.body);

    var options = {
        uri: url,
        method: 'POST',
        headers: {
            'Content-Type':'application/json'
        },
        json: userData
    };
    request(options, function(err, response, body){
        res.json(body);
    });
});

//put Favorites
dn.put('/favorites/:user_id', bodyparser.json(),function(req,res){
    var type = "search/movie";
    var url2 = main + type + api_key_v3 + lang + q + req.body.movie + pages + adult_f;
    request(url2, function(err, response, body){
        if(err) return res.status(400).send(response);

        var apiJSON = JSON.parse(body);

        var datas = {
            "name": apiJSON.results[0].title,
            "genres": apiJSON.results[0].genre_ids
        };

        console.log(datas);
        var url = dgURL +'/favorites/'+req.params.user_id;

        var options = {
            uri:url,
            method: 'PUT',
            headers: {
                'Content-Type':'application/json'
            },
            json : datas
        };

        request(options,function(err,response,body){
            res.json(body)
        });
    });
});

// get favorite genre)
dn.get('/discover_movie/:user_id', function(req, res){
    request.get(dgURL +'/favorites/genre/'+req.params.user_id, function (error, response, body) {
        if(error) return res.status(400).send(error);

        var genre = JSON.parse(response.body).genre;

        var discover_movie = main +'discover/movie'+api_key_v3+'&language=en-US&with_genres=' + genre + '&sort_by=popularity.desc&include_adult=false&include_video=false&page=1';
        request(discover_movie, function(error2, response2, body2){
            if(!error2 && response2.statusCode==200){
                var data2 = JSON.parse(body2);
                var newData = [];
                for(var i = 0; i < 10; i++) newData[i] = data2.results[i];
                res.send({"movies":newData});
            }
        });

    });
});

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

//+++++++++++++++++++++++++GET Funktionen API++++++++++++++++++++++++++


//----------------//Find specific movie [EXTERNAL via ID]
dn.get('/:movie_id', function(req, res){
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
dn.get('/search/movie/:movie_title', function(req, res){
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
dn.get('/movie/:movie_id', function(req, res){
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
dn.get('/movie/similar/:movie_id', function(req, res){
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
dn.get('/search/person/:person', function(req, res){
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
dn.get('/search/keyword/:keyword', function(req, res){
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
dn.get('/discover/movie/genre/:genre', function(req, res){
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
dn.get('/movie/release/:r_movie_id', function(req, res){
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



dn.listen(settings.port, function(){
    console.log("Dienstnutzer ist nun auf Port "+settings.port+" verfügbar.");
});
