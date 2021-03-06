const express = require('express');
const bodyParser = require('body-parser');
const ressourceName = "favorites";
const router = express.Router();

var favID = 0;

/*----------------------Neue Favorites hinzufügen und an User "binden"----------------------*/
/*
router.post('/users/:user_id', bodyParser.json(), function(req, res){
  if(validateUser(req.params.user_id)==0){
    req.body.favorites_id = favID++;
    req.body.user_id = parseInt(req.params.user_id);
    req.body.favorites.movies = [];
    console.log(req.body);
    data.favorites.push(req.body);
    res.status(200).json()
  }else {
      res.status(400).type('text').send('Fehler!!! User nicht vorhanden');
    }
});
*/

/*----------------------Filme in Favorites speichern----------------------*/
router.put('/:user_id', bodyParser.json(),function(req,res){
  console.log(req.body);
  if(parseInt(req.params.user_id) >= data.users.length || parseInt(req.params.user_id) < 0){
    res.status(400).type('text').send('Fehler!!! Favorites existieren nicht');
  }

  for(var i=0; i<data.users.length ; i++){
    if(parseInt(req.params.user_id) === parseInt(data.users[i].user_id)){
        data.users[i].favorites.push({"name":req.body.name, "genres":req.body.genres});
        console.log(data.users);
        res.status(200).send(data.users[i].favorites);
    }
  }
});


/*----------Funktion um die beliebtesten Genres des Users zu finden----------*/
router.get("/genre/:user_id", function(req, res){
  var user = data.users.filter(function(d) {return d.user_id === parseInt(req.params.user_id)});
  if(user.length > 0) {
      var movies = user[0].favorites;
      var genres = movies.reduce(function(a, b) {
        b.genres.map(function(c) {
          if(a.indexOf(c) < 0) a.push(c);
        });
        return a;
      }, []);

      var anzahlen = [];
      genres.map(function(p) {anzahlen.push(0)});

      movies.map(function(d) {
          d.genres.map(function(g) {
            anzahlen[genres.indexOf(g)]++;
          })
      });

      var favorite = 0;
      anzahlen.reduce(function(b, d, i) {
        if(b < d) {
          favorite = i;
          return d;
        }
        return b;
      }, 0);

      res.status(200).json({"genre":genres[favorite]});
  }
});

/*----------------------Prüfe ob User vorhanden----------------------*/

var validateUser = function(userName) {
  if (userName == "") {
	  console.log("userName ist leer! Oh nein!");
	  return false;
  }
  for(var i = 0; i < data.users.length; i++) {
	  if (userName === data.users[i].userName) {
		  console.log("userName wird schon verwendet!");
		  return false;
	  }
  }
  return true;
}
module.exports = router;
