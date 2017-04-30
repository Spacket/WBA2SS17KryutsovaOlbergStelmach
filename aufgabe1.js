var fs = require('fs'); //Modul laden per require
var chalk = require('chalk')

fs.readFile(__dirname+"/staedte.json", function(err, data) {
    if (err) throw err;
    JSON.parse(data); //data = Inhalt der Datei

    var s = JSON.parse(data);

    for(var i = 0; i < s.cities.length; i++){
        console.log(chalk.red("name: "+s.cities[i].name));
        console.log(chalk.red("country: "+s.cities[i].country));
        console.log(chalk.red("population: "+s.cities[i].population));
        console.log("\n------------------------\n")
    }


      s.cities.sort(function(a, b){
        if(a.population>b.population){
          return -1;
        }
        else if(a.population<b.population){
          return 1;
        }
        else{
          return 0;
        }
      });

      for(var j=0; j<s.cities.length; j++){                                                   //Ausgabe von dem was in staedte_sortiert.json geschrieben wird (optional)
        console.log(chalk.green("name: "+s.cities[j].name));
        console.log(chalk.green("country: "+s.cities[j].country));
        console.log(chalk.green("population: "+s.cities[j].population));
        console.log("\n------------------------\n")
      };


      fs.writeFile(__dirname + "/staedte_sortiert.json", JSON.stringify(s), function(err){    //stringify wandelt die Daten in ein lesbaren String um
        if(err) {
            console.log(err);
        } else {
            console.log('Datei erfolgreich gespeichert');
        }
  });
});