const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const ressourceName = "users";

var nextUserId = 2;
var newUserId;

/*----------------------User Login----------------------*/


/*----------------------Neue User ID erstellen Passwort feht noch----------------------*/
var getNewUserId = function() {
    newUserId = nextUserId;
    nextUserId ++;
    return newUserId;
    console.log("Aktuell neue User ID: " + newUserId);
    console.log("Naechste User ID: " + nextUserId);
}

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


/*----------------------Neuen User hinzufügen----------------------*/
router.post('/', bodyParser.json(), function(req, res){
    console.log(req.body.userName);
	if(validateUser(req.body.userName)) {
        req.body.id = getNewUserId();
		console.log(req.body);
		res.status(200).json( { uri: req.protocol + "://" + req.headers.host + "/" + resourceName + "/" + req.body.id });
        data.users.push(req.body);
		console.log("User " + req.body.userName + " hinzugefuegt! Neue Useranzahl: " + data.users.length);
	} else {
		res.status(400).send("Dieser Name wird schon verwendet / Es wurde kein Name angegeben");
	}
});


/*----------------------speziellen User ausgeben----------------------*/
router.get('/:id', function(req, res) {
    var id = parseInt(req.params.id);
    var user = data.users.filter(function (u){
                                 return u.id == id
                                 });
    res.status(200).json(user);
});



router.get('/', function(req, res) {
    var allUserNames = [];
	for(var i = data.users.length -1; i >= 0; i--) {
        allUserNames.push(data.users[i].userName);
	}
	res.send("Anzahl der User " + data.users.length + " -> " + allUserNames);
    console.log("Hat geklappt");
});

module.exports = router;
