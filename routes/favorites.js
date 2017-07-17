var express = require('express');
var router = express.Router();
const ressourceName = "favorites";

/*----------------------Filme in Favorites speichern----------------------*/
router.put('/:user_id', function(req,res){
    console.log(req.body);
    var x = 0; 
    if(parseInt(req.params.user_id) >= data.users.length || parseInt(req.params.user_id) < 0){
        res.status(400).type('text').send('Fehler!!! Favorites existieren nicht');
    }

    for(var i=0; i<data.users.length ; i++){
        if(parseInt(req.params.user_id) === parseInt(data.users[i].user_id)){
             for(var c=0; c<data.users[i].favorites.length; c++){
                if(data.users[i].favorites[c].name == req.body.name){
                    res.status(400).type('text').send('Fehler! Film schon vorhanden!');
                    x = 1;
                } 
             } if(x==0){
            
                    data.users[i].favorites.push({"name":req.body.name, "genres":req.body.genres});
                            console.log(data.users);
                                res.status(200).send(data.users[i].favorites);
        
    }
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

        var counter = [];
        genres.map(function(p) {counter.push(0)});

        movies.map(function(d) {
            d.genres.map(function(g) {
                counter[genres.indexOf(g)]++;
            })
        });

        var favorite = 0;
        counter.reduce(function(b, d, i) {
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
};

module.exports = router;
