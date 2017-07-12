const express = require('express');
const bodyParser = require('body-parser');
const ressourceName = "favorites";
const router = express.Router();

var favID = 0;

/*----------------------Neue Favorites hinzufügen und an User "binden"----------------------*/
router.post('/users/:user_id', bodyParser.json(), function(req, res){
  if(validateUser(req.params.user_id)==0){
    req.body.favorites_id = favID++;
    req.body.user_id = parseInt(req.params.user_id);
    req.body.favorites.movies = [];
    console.log(req.body);
    data.favorites.push(req.body);
    res.status(200).json({/*uri zeugs*/})
  }else {
      res.status(400).type('text').send('Fehler!!! User nicht vorhanden');
    }
});


/*----------------------Filme in Favorites speichern----------------------*/
router.put('/:user_id/:favorites_id/:movie',function(req,res){
  for(var i=0; i<data.favorites.length ; i++){
    if(parseInt(req.params.user_id)== data.favorites[i].user_id && parseInt(req.params.favorites_id) == data.favorites[i].favorites_id){
        data.favorites[i].movies.push(req.params.movie);
        res.status(200).send(data.favorites[i].movies);
        //break;?
    }
  }
  if(parseInt(req.params.favorites_id) >= data.favorites.length){
    res.status(400).type('text').send('Fehler!!! Favorites existieren nicht');
  }
  if(parseInt(req.params.user_id) >= data.users.length){
    res.status(400).type('text').send('Fehler!!! User nicht vorhanden');
  }
});


/*----------Funktion um die beliebtesten Genres des Users zu finden----------*/
router.get("/:user_id/:favorites_id", function(req, res){
  for(var i=0; i< data.favorites.length; i++){
      if(parseInt(req.params.id) == data.users[i].id){

      }
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
