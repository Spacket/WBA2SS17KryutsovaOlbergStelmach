const express = require("express");
const router = express.Router();
const BodyParser = require ('body-parser');

const ressourceName = "movie";

router.get('/', function (req,res){
    res.send("Film")
});

module.exports = router;