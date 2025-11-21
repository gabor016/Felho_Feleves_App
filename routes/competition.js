const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');

let competitors = [];
let generatedPairs = [];

// Round-robin páros generálás
function generatePairs(list) {
  const pairs = [];
  for (let i = 0; i < list.length; i++) {
    for (let j = i + 1; j < list.length; j++) {
      pairs.push({
        id: uuidv4(),
        a: list[i],
        b: list[j],
        time: `${Math.floor(Math.random() * 5) + 12}:00`,
        scoreA: 0,
        scoreB: 0,
        winner: null,
        status: "pending",
        duration: null
      });
    }
  }
  return pairs;
}

router.get('/', (req, res) => {
  res.render('competition', { competitors, generatedPairs });
});

router.post('/add', (req, res) => {
  const { name } = req.body;
  if (name.trim() !== "") {
    competitors.push(name);
  }
  res.redirect('/competition');
});

router.post('/generate', (req, res) => {
  generatedPairs = generatePairs(competitors);
  res.redirect('/competition');
});

// PONT FRISSÍTÉSE
router.post('/update-score', (req, res) => {
  const { id, scoreA, scoreB } = req.body;
  const match = generatedPairs.find(m => m.id === id);
  if (match) {
    match.scoreA = parseInt(scoreA);
    match.scoreB = parseInt(scoreB);
  }
  res.redirect('/competition');
});

// GYŐZTES BEÁLLÍTÁSA
router.post('/set-winner', (req, res) => {
  const { id, winner } = req.body;
  const match = generatedPairs.find(m => m.id === id);

  if (match) {
    match.winner = winner;
    match.status = "finished";
  }
  res.redirect('/competition');
});

// IDŐTARTAM MENTÉSE
router.post('/set-duration', (req, res) => {
  const { id, duration } = req.body;
  const match = generatedPairs.find(m => m.id === id);
  if (match) match.duration = duration;
  res.redirect('/competition');
});

// Teljes törlés
router.post('/clear', (req, res) => {
  competitors = [];
  generatedPairs = [];
  res.redirect('/competition');
});

module.exports = router;
