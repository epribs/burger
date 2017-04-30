var express = require("express");
var router = express.router();

var burger = require("../models/burger");

router.get("/", function(req, res) {
  burger.all(function(data) {
    var hbsObj = {
      burgers: data
    };
    console.log(hbsObj);
    res.render("index", hbsObj);
  });
});

router.post("/create", function(req,res) {
  burger.create(["name", "devoured"],
    [req.body.burger_name, req.body.devoured], function(data) {
      res.redirect("/");
  });
});

router.put("/update", function(req, res) {
  var condition = "id = " + req.params.id;
  console.log("condition", condition);

  burger.update({
    devoured: req.body.devoured
  }, condition, function(data) {
    res.redirect("/");
  });
});

router.delete("/:id", function(req, res) {
  var condition = "id = " + req.params.id;

  burger.delete(condition, function (data) {
    res.redirect("/");
  });
});

module.exports = router;
