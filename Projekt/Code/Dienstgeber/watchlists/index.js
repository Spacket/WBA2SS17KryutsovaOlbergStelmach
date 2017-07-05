const express = require('express');
const bodyParser = require('body-parser');
const resourceName = "watchlists";
const router = express.Router();

var nextWatchlistId = 2;
var newWatchlistId;



/*----------------------Neue Watchlist ID erstellen----------------------*/
var getWatchlistId = function() {
    newWatchlistId = nextWatchlistId;
    nextWatchlistId ++;
    return newWatchlistId;
    console.log("Aktuell neue Watchlist ID: " + newWatchlistId);
    console.log("Naechste Watchlist ID: " + nextWatchlistId);
}

/*----------------------Prüfe ob Watchlist Id schon vorhanden----------------------*/
var validateWatchlist = function(watchlistID) {
  if (watchlist == "") {
	  console.log("Watchlist ID ist leer! Oh nein!");
	  return false;
  }
  for(var i = 0; i < data.watchlists.length; i++) {
	  if (watchlistID === data.watchlists[i].watchlistID) {
		  console.log("watchlistID ist schon belegt!");
		  return false;
	  }
  }
  return true;
}


/*----------------------Neue Watchlist hinzufügen----------------------*/
router.post('/', bodyParser.json(), function(req, res){
    console.log(req.body.watchlistID);
	if(validateWatchlist(req.body.watchlistID)) {
        req.body.id = getWatchlistId();
		console.log(req.body);
		res.status(200).json( { uri: req.protocol + "://" + req.headers.host + "/" + resourceName + "/" + req.body.id });
        data.users.push(req.body);
		console.log("Watchlist angelegt!");
	} else {
		res.status(400).send("ID belegt / nicht angegeben");
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
