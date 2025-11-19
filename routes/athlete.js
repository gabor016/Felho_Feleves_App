var express = require('express');
var router = express.Router();
var { read } = require('../utils/db');

// GET athlete profile page
router.get('/:id', function(req, res) {
  const athletes = read('athletes.json');
  const athlete = athletes.find(a => a.id === req.params.id);
  if (!athlete) return res.status(404).send("Sportoló nem található");

  res.render('athlete', { athlete });
});

module.exports = router;
