function generateProgram(level, mode, weapon) {

  const warmups = [
    "Könnyű lábmunka 6 perc",
    "Mobilitás labdával 8 perc",
    "Reflex gyakorlatok 5 perc"
  ];

  const drills = {
    beginner: [
      "Alap védekezés: 10 perc",
      "Támadás indítása: 10 perc"
    ],
    intermediate: [
      "Kontratámadás több variációban: 12 perc",
      "Összetett lábmunka: 15 perc"
    ],
    advanced: [
      "Versenytempós asszók 20 perc",
      "Gyors tempóváltás gyakorlása 15 perc",
      "Taktikai elemzés 10 perc"
    ]
  };

  const weaponDrills = {
    épée: ["Épée specifikus gyakorlat 10 perc"],
    foil: ["Foil specifikus gyakorlat 10 perc"],
    sabre: ["Kard specifikus gyakorlat 10 perc"]
  };

  const modes = {
    normal: ["Core edzés 8 perc", "Rövid intervall futás 4x30mp"],
    fatigued: ["Alacsony intenzitású erősítés", "Nyújtás 12 perc"],
    competition: ["Robbanékonysági gyakorlatok", "Gyors reakció edzés 10 perc"]
  };

  return {
    warmup: warmups[Math.floor(Math.random() * warmups.length)],
    drills: (drills[level] || drills.intermediate).concat(weaponDrills[weapon] || []),
    conditioning: modes[mode] || modes.normal,
    level,
    mode,
    weapon
  };
}

module.exports = { generateProgram };
