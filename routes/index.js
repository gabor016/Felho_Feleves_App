var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  res.render('index', { title: "Vívó Edzéstervező Dashboard" });
});

module.exports = router;
