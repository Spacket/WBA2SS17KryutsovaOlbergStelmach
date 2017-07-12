const express = require ('express')
const bodyParser = require('body-parser');
const ressourceName = "users";
const router = express.Router();

var nextUserId = 2;
var newUserId;

/*----------------------Neuen User hinzufügen----------------------*/
router.post('/', bodyParser.json(), function(req, res){
    console.log(req.body.userName);
	   if(validateUser(req.body.userName)) {
        req.body.id = getNewUserId();
		      console.log(req.body);
		        res.status(200).json( { uri: req.protocol + "://" + req.headers.host + "/" + ressourceName + "/" + req.body.id });
            data.users.push(req.body);
		          console.log("User " + req.body.userName + " hinzugefuegt! Neue Useranzahl: " + data.users.length);
	           } else {
		             res.status(400).send("Dieser Name wird schon verwendet / Es wurde kein Name angegeben");
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
};

/*----------------------speziellen User ausgeben----------------------*/
router.get('/:id', function(req, res) {
    var id = parseInt(req.params.id);
    var user = data.users.filter(function (u){
                                 return u.id == id
                                 });
    res.status(200).json(user);
});

module.exports = router;
