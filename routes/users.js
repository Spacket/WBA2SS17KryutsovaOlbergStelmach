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
        res.status(200).send( { uri: req.protocol + "://" + req.headers.host + "/" + ressourceName + "/" + --nextUserId});

        

        console.log("User " + req.body.userName + " hinzugefuegt!");
        console.log("Neue Useranzahl: " + data.users.length);
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

/*---------------------- Film von Favourites löschen ----------*/ 
router.delete('/:user_id/:movie', function(req,res){
    
    var p=0;

    for(var i= 0; i<data.users.length; i++ ){
        if(parseInt(req.params.user_id) === parseInt(data.users[i].user_id)){
            for(var j=0; j<data.users[i].favorites.length; j++){
              if((data.users[i].favorites[j].name).toLowerCase() == (req.params.movie).toLowerCase()){
                  data.users[i].favorites[j] = {};
                  res.status(200).type('text').send('Film gelöscht');
                  p=1;
              } 
                                                               }
            
        }}
    if (p==0){
        res.status(400).type('text').send('Film/User nicht vorhanden ')
    }
    
});


/*----------------------Prüfe ob User vorhanden----------------------*/
var validateUser = function(userName) {
    if (userName == "") {
        console.log("userName ist leer!");
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
