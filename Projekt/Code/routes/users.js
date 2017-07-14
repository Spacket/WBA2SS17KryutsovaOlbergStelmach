var express = require('express');
var router = express.Router();
const ressourceName = "users";
var nextUserId = 2;

/*----------------------Neuen User hinzufügen----------------------*/
router.post('/',  function(req, res){
    console.log(req.body.userName);
    if(validateUser(req.body.userName)) {
        console.log(req.body);
        var newUser = {
            "userName" : req.body.userName,
            "user_id" : nextUserId++,
            "favorites" : []
        };

        data.users.push(newUser);

        console.log(data.users);
        res.status(200).send( { uri: req.protocol + "://" + req.headers.host + "/" + ressourceName + "/" + req.body.user_id });

        console.log("User " + req.body.userName + " hinzugefuegt! Neue Useranzahl: " + data.users.length);
    } else {
        res.status(400).send("Dieser Name wird schon verwendet / Es wurde kein Name angegeben");
    }
});



/*----------------------speziellen User ausgeben----------------------*/
router.get('/:user_id', function(req, res) {
    var id = parseInt(req.params.user_id);
    var user = data.users.filter(function (u){
        return u.user_id == id
    });
    console.log(user);
    res.status(200).json(user);
});

/*----------------------alle User ausgeben----------------------*/
router.get('/', function(req, res) {
    res.send(data.users);
    console.log("Hat geklappt");
});

/*----------------------Prüfe ob User vorhanden----------------------*/
var validateUser = function(userName) {
    if (userName == "") {
        console.log("userName ist leer! Oh nein!");
        return false;
    }

    var user = data.users.filter(function(usr) {return usr.userName === userName});

    if (user.length > 0) {
        console.log("userName wird schon verwendet!");
        return false;
    }

    return true;
};

module.exports = router;
