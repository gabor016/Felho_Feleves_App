var express = require('express');
var { v4: uuid } = require('uuid');
var { read, write } = require('../utils/db');
var router = express.Router();

// GET all athletes
router.get('/', function(req, res) {
  res.json(read('athletes.json'));
});

// POST new athlete
router.post('/', function(req, res) {
  const athletes = read('athletes.json');

  const a = {
    id: uuid(),
    name: req.body.name,
    weapon: req.body.weapon,
    age: req.body.age,
    style: req.body.style,
    rating: req.body.rating || 1000,
    notes: req.body.notes || "",
    createdAt: Date.now()
  };

  athletes.push(a);
  write('athletes.json', athletes);

  res.status(201).json(a);
});

// GET athlete by ID
router.get('/:id', function(req, res) {
  const athletes = read('athletes.json');
  const a = athletes.find(x => x.id === req.params.id);
  if (!a) return res.status(404).json({ error: "Not found" });
  res.json(a);
});

// PUT update athlete
router.put('/:id', function(req, res) {
  const athletes = read('athletes.json');
  const idx = athletes.findIndex(x => x.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: "Not found" });

  athletes[idx] = { ...athletes[idx], ...req.body };
  write('athletes.json', athletes);

  res.json(athletes[idx]);
});

// DELETE athlete
router.delete('/:id', function(req, res) {
  let athletes = read('athletes.json');
  athletes = athletes.filter(a => a.id !== req.params.id);
  write('athletes.json', athletes);
  res.json({ ok: true });
});

module.exports = router;
