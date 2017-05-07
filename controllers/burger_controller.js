var express = require("express");
var router = express.Router();

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
  burger.create(["name"],
    [req.body.name], function(data) {
      res.redirect("/");
  });
});

router.put("/update", function(req, res) {
  var condition = "id = " + req.body.id;
  console.log("condition", condition);
  console.log("devoured " + req.body.devoured);
  burger.update({
    id: req.body.id
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
