const express = require('express');
const bodyParser = require('body-parser');
const resourceName = "watchlists";
const router = express.Router();

var watchlistId = 0;



/*----------------------Neue Watchlist hinzufügen und an User "binden"----------------------*/
/* Wahrscheinlich dicker Denkfehler
router.post('/users/:id', bodyParser.json(), function(req, res){
	if(validateUser(req.body.userName) == 0) {
        req.body.users.watchlist.watchlist_id = watchlistId++;
				req.body.users.id = parseInt(req.params.id);
				req.body.users.watchlist = [];
				console.log(req.body);
				data.users.watchlist.push(req.body);
				res.status(200).json({uri: req.protocol + "://" + req.headers.host + "/" + ressourceName + "/" + req.body.users.watchlist.watchlist_id})
		}else{
				res.status(400).type('text').send('User nicht vorhanden !');
		}
});
*/
/*----------------------Filme in Watchlist speichern----------------------*/
router.put('/:id/:movie', function(req,res){
console.log("bla");
    for(var i= 0; i < users.length  ; i++){
        if(parseInt(req.params.id) == data.users[i].watchlist) {
                console.log("user id:"+req.params.id);
                data.users[i].watchlist.push(req.params.movie); 
                res.status(200).send(data.users[i].watchlist);
                
            }
    };
      

      if (parseInt(req.params.id) >= data.count) {
        res.status(400).type('text').send('User nicht vorhanden !');
        i = 1;
      }

      if (parseInt(req.params.id_watchlist) >= watchlistId && i == 0) {
        res.status(400).type('text').send('Watchlist nicht vorhanden !');
      }

});



/*----------------------Watchlist ausgeben----------------------*/
router.get('/:id', function(req, res) {
    var id = parseInt(req.params.id);
    var watchlist = data.users.watchlist.watchlist_id.filter(function (w){
                                 return w.id == id
                                 });
    res.status(200).json(watchlist);
});


/* --------Bei Watchlist nicht sinnvoll---------
router.get('/', function(req, res) {
    var allUserNames = [];
	for(var i = data.watchlists.length -1; i >= 0; i--) {
        allUserNames.push(data.watchlists[i].watchlistID);
	}
	res.send("Anzahl der User " + data.watchlists.length + " -> " + allUserNames);
    console.log("Hat geklappt");
});
*/
module.exports = router;
