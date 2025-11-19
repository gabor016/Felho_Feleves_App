const athleteId = window.location.pathname.split('/').pop();

async function loadTrainings() {
  const res = await fetch('/api/trainings');
  const all = await res.json();
  const list = all.filter(x => x.athleteId === athleteId);

  const container = document.getElementById('trainings');
  container.innerHTML = "";

  list.reverse().forEach(t => {
    const el = document.createElement('div');
    el.className = "card mb-3";
    el.innerHTML = `
      <div class="card-body">
        <h5>${new Date(t.createdAt).toLocaleString()}</h5>
        <p><b>Bemelegítés:</b> ${t.program.warmup}</p>
        <b>Fő gyakorlatok:</b>
        <ul>${t.program.drills.map(d => `<li>${d}</li>`).join("")}</ul>
        <p><b>Erősítés:</b> ${t.program.conditioning.join(", ")}</p>
      </div>
    `;
    container.appendChild(el);
  });
}

document.getElementById('gen-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const level = document.getElementById('level').value;
  const mode = document.getElementById('mode').value;

  await fetch(`/api/trainings/generate/${athleteId}`, {
    method: 'POST',
    headers: { 'Content-Type':'application/json' },
    body: JSON.stringify({ level, mode })
  });

  loadTrainings();
});

document.getElementById('delete-athlete').addEventListener('click', async () => {
  if (!confirm("Biztosan törlöd a sportolót?")) return;
  await fetch(`/api/athletes/${athleteId}`, { method: 'DELETE' });
  window.location.href = '/';
});

loadTrainings();
