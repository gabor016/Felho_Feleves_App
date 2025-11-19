var express = require('express');
var { v4: uuid } = require('uuid');
var { read, write } = require('../utils/db');
var { generateProgram } = require('../utils/trainingGenerator');
var router = express.Router();

// GET all trainings
router.get('/', function(req, res) {
  res.json(read('trainings.json'));
});

// POST generate new training for athlete
router.post('/generate/:athleteId', function(req, res) {
  const athleteId = req.params.athleteId;
  const level = req.body.level || 'intermediate';
  const mode = req.body.mode || 'normal';

  const athletes = read('athletes.json');
  const athlete = athletes.find(a => a.id === athleteId);
  if (!athlete) return res.status(404).json({ error: "Athlete not found" });

  const trainings = read('trainings.json');

  const t = {
    id: uuid(),
    athleteId,
    createdAt: Date.now(),
    program: generateProgram(level, mode, athlete.weapon)
  };

  trainings.push(t);
  write('trainings.json', trainings);

  res.status(201).json(t);
});

module.exports = router;
