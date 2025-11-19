var express = require('express');
var router = express.Router();
var { read } = require('../utils/db');

// Render stats page
router.get('/', function(req, res) {
  const athletes = read('athletes.json');
  const trainings = read('trainings.json');

  // Példa: pontok és edzés szám összesítés
  const data = athletes.map(a => {
    const t = trainings.filter(tr => tr.athleteId === a.id);
    return {
      name: a.name,
      rating: a.rating,
      trainings: t.length,
      trainingDates: t.map(tr => tr.createdAt)
    };
  });

  res.render('stats', { data });
});

module.exports = router;
