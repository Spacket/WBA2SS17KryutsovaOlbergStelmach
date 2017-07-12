const express = require('express');
const users = require('./users');
const watchlists = require('./favorites')
const router = express.Router();

var dg = express();
var request = require('request');
var fs = require('fs');
var bodyparser = require('body-parser');

global.data = require("./data");
/*In Memory Datenmodul - Inhalt in data/index.js*/
/*Ist global damit man ist aus anderen Modulen erreichen kann*/
dg.use('/users', users);
//var genre = require('./endpoints/genres.json');

/*----------Settingsconst----------*/
const settings = {
    port: 3000
    //datafile: "./data.json"
};

/*----------Errorhandler----------*/
dg.use(function(err,req,res,next){
    console.error(err.stack);
    res.end(err.status + ' ' + err.messages);
});


/*----------Errorlog----------*/
dg.use(function (req,res,next){
    console.log('Time: %d' + 'Request-Pfad: ' + req.path, Date.now());
    next();
});

/*----------Serverlisten----------*/
dg.listen(settings.port, function(){
           console.log("Dienstgeber ist nun auf Port "+settings.port+" verfügbar.");
});


/*----------Funktion um die beliebtesten Genres des Users zu finden----------*/
/*dg.get("", function(req, res){
  for(var i=0; i< data.users.lengt; i++){
      if(parseInt(req.params.id) == data.users[i].id){
        //algo um favliste zu durchsuchen
      }
  }
});
*/
