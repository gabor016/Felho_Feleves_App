var express = require('express');
var router = express.Router();
var { read, write } = require('../utils/db');

// GET tournament page
router.get('/', function(req, res) {
  const athletes = read('athletes.json') || [];
  res.render('tournament', { athletes });
});

// POST: pont frissítés AJAX-sal
router.post('/update-rating', function(req, res) {
  const athletes = read('athletes.json') || [];
  const { id, delta } = req.body;
  const athlete = athletes.find(a => a.id === id);
  if (athlete) {
    athlete.rating += parseInt(delta);
    write('athletes.json', athletes);
    res.json({ success: true, rating: athlete.rating });
  } else {
    res.json({ success: false });
  }
});

module.exports = router;
