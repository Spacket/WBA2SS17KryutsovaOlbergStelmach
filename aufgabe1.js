var fs = require('fs'); //Modul laden per require
var chalk = require('chalk')

fs.readFile(__dirname+"/staedte.json", function(err, data) {
    if (err) throw err;
    JSON.parse(data); //data = Inhalt der Datei

    var s = JSON.parse(data);

    for(var i = 0; i < s.cities.length; i++){
        console.log(chalk.blue("name: "+s.cities[i].name));
        console.log(chalk.red("country: "+s.cities[i].country));
        console.log(chalk.yellow("population: "+s.cities[i].population));
        console.log("\n------------------------\n")
    }


});
