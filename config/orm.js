// Import MySQL connection.
var connection = require("../config/connection.js");

var burgerBuy = {
  selectAll: function (table, cb) {
    connection.query("SELECT * FROM " + table, function(err, res) {
      if (err) {
        throw err;
      }
      cb(res);
    });
  },
  insertOne: function (table, name, cb) {
    connection.query("INSERT INTO " + table + " SET ?", {
      burger_name: name,
      devoured: false
    }, function(err, res) {
      if (err) {
        throw err;
      }
      cb(res);
    });
  },
  updateOne: function(table, id, cb) {
    connection.query("UPDATE " + table + " SET ? WHERE ?", [{devoured: true},{id: id}],
    function(err, res) {
      if (err) {
        throw err;
      }
      cb(res);
    });
  }
};

// Export the orm object for the model.
module.exports = orm;
