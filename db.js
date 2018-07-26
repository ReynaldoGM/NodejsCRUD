var mysql =require('mysql');

var con = mysql.createConnection({
    host: 'sql3.freemysqlhosting.net',
    user: 'sql3249228',
    password: 'y4jGizYnfn',
    database: 'sql3249228',
    port: 3306

//    host:"localhost",
//    user: "root",
//    password: "root",
//    database: "prueba1"

});

con.connect(function(err){
  if(err) throw err;
  console.log("Coneción con API exitosa");

})

var query = con.query('CREATE TABLE if not exists `producto` (  `productId` smallint(5) NOT NULL AUTO_INCREMENT,  `nombre` varchar(30) NOT NULL,  `precio` int(5) NOT NULL,  PRIMARY KEY (`productId`))',
function(error,result){
  if(error){

    throw error
  }

});
var query1 = con.query('CREATE TABLE if not exists `orders` (  `ordenId` int(11) NOT NULL AUTO_INCREMENT,  `cantidad` int(11) NOT NULL,  `productId` smallint(6) NOT NULL,  PRIMARY KEY (`ordenId`),  KEY `productId` (`productId`),  CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`productId`) REFERENCES `producto` (`productid`))',
function(error,result){
  if(error){

    throw error
  }

});

module.exports = con;
