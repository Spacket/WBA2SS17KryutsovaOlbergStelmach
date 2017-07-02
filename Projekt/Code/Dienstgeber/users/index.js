const express = require('express');
const bodyParser = require('body-parser');
const resourceName = "users";
const router = express.Router();

var nextUserId = 2;
var newUserId;

var getNewUserId = function() {
    newUserId = nextUserId;
    nextUserId ++;
    return newUserId;
    console.log("aktuell neue ID: " + newUserId);
    console.log("naechste ID: " + nextUserId);
}

var validateUser = function(userName) {
  if (userName == "") {
	  console.log("userName ist leer! Oh nein!");
	  return false;
  }
  for(var i = 0; i < data.users.length; i++) {
	  if (userName === data.users[i].userName) {
		  console.log("userName Wird schon verwendet! Oh nein!");
		  return false;
	  }
  }
  return true;
}
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

router.get('/', function(req, res) {
    var allUserNames = [];
	for(var i = data.users.length -1; i >= 0; i--) {
        allUserNames.push(data.users[i].userName);
	}
	res.send("Anzahl der User " + data.users.length + " -> " + allUserNames);
    console.log("Hat geklappt");
});

module.exports = router;