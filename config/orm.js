// Import MySQL connection.
var connection = require("../config/connection.js");

// Helper function for SQL syntax.
function printQuestionMarks(num) {
  var arr = [];

  for (var i = 0; i < num; i++) {
    arr.push("?");
  }

  return arr.toString();
}

// Helper function for SQL syntax.
function objToSql(ob) {
  var arr = [];

  for (var key in ob) {
    if (Object.hasOwnProperty.call(ob, key)) {
      arr.push(key + "=" + ob[key]);
    }
  }

  return arr.toString();
}

var burgerBuy = {
  selectAll: function (table, cb) {
    connection.query("SELECT * FROM " + table, function(err, res) {
      if (err) {
        throw err;
      }
      cb(res);
    });
  },
  insertOne: function(table, cols, vals, cb) {
    var queryString = "INSERT INTO " + table;

    queryString += " (";
    queryString += cols.toString();
    queryString += ") ";
    queryString += "VALUES (";
    queryString += printQuestionMarks(vals.length);
    queryString += ") ";

    console.log(queryString);

    connection.query(queryString, vals, function(err, res) {
      if (err) {
        throw err;
      }
      console.log(res);
      cb(res);
    });
  },
  updateOne: function(table, id, cb) {
    var queryString = "UPDATE " + table;

    queryString += " SET ";
    queryString += objToSql({devoured: true});
    queryString += " WHERE ";
    queryString += id;

    console.log(queryString);
    connection.query(queryString, function(err, res) {
      if (err) {
        throw err;
      }
      cb(res);
    });
  }
};

// Export the orm object for the model.
module.exports = burgerBuy;
