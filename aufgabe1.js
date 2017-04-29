var fs = require('fs'); //Modul laden per require

fs.readFile(__dirname+"/staedte.json", function(err, data) { 
    if (err) throw err;
    JSON.parse(data); //data = Inhalt der Datei
    
    var s = JSON.parse(data); 
    
    for(var i = 0; i < s.cities.length; i++){
        console.log("name: "+s.cities[i].name);
        console.log("country: "+s.cities[i].country);
        console.log("population: "+s.cities[i].population)
        console.log("\n------------------------\n")
    }
    

});
                                                                                                         