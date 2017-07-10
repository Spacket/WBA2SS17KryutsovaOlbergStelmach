const express = require('express');
const bodyParser = require('body-parser');
const resourceName = "watchlists";
const router = express.Router();

var watchlistId = 0;



/*----------------------Neue Watchlist hinzufügen und an User "binden"----------------------*/
router.post('/:user_id', bodyParser.json(), function(req, res){
	if(validateUser(req.body.userName) == 0) {
        req.body.watchlist_id = watchlistId++;
				req.body.user_id = parseInt(req.params.user_id);
				req.body.movie = [];
				console.log(req.body);
				data.watchlist.push(req.body);
				res.status(200).json({uri: req.protocol + "://" + req.headers.host + "/" + ressourceName + "/" + req.body.watchlist_id})
		}else{
				res.status(400).type('text').send('User nicht vorhanden !');
		}
});

/*----------------------Filme in Watchlist speichern----------------------*/
router.put('/:id/:id_watchlist/:movie', function(req,res){
var i = 0;

    for(var i= 0; i < watchlistId  ; i++){
        if(parseInt(req.params.id) == data.watchlists[i].user_id && parseInt(req.params.id_watchlist) == data.watchlists[i].watchlist_id){
                console.log("user id:"+req.params.id+"watchlist_id:"+req.params.id_watchlist);
                data.watchlists[i].movies.push(req.params.movie);  // Film über API holen
                res.status(200).send(data.watch4[i].movie);
                i = watchlistId - 1;
            }
      }

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
    var watchlist = data.watchlistID.filter(function (w){
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
