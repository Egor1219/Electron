// var sqlite3 = require('sqlite3').verbose();
// var db = new sqlite3.Database('hunchly.db');
var fs = require('fs');
var sql = require('sql.js');
var path = require('path')
var bfr = fs.readFileSync(path.resolve(__dirname,'hunchly.db'))
var db = new sql.Database(bfr);

// db.serialize(function() {
//     db.run("CREATE TABLE lorem (info TEXT)");
//
//       var stmt = db.prepare("INSERT INTO lorem VALUES (?)");
//         for (var i = 0; i < 10; i++) {
//                 stmt.run("Ipsum " + i);
//                   }
//           stmt.finalize();
//
//
// });
