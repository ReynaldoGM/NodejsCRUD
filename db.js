var mysql =require('mysql');

var con = mysql.createConnection({
    host:"localhost",
    user: "root",
    password: "root",
    database: "prueba1"

});

con.connect(function(err){
  if(err) throw err;
  console.log("Coneción con API exitosa");

})

module.exports = con;
