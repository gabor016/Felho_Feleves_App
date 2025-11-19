async function loadAthletes() {
  const res = await fetch('/api/athletes');
  const list = await res.json();
  const ul = document.getElementById('athlete-list');
  ul.innerHTML = "";

  list.forEach(a => {
    const li = document.createElement('li');
    li.className = 'list-group-item d-flex justify-content-between align-items-center';
    li.innerHTML = `
      <span>${a.name} — <span class="text-muted">${a.weapon}</span></span>
      <a href="/athlete/${a.id}" class="btn btn-sm btn-outline-primary">Profil</a>
    `;
    ul.appendChild(li);
  });
}

document.getElementById('add-athlete').addEventListener('click', async () => {
  const name = document.getElementById('athlete-name').value;
  const weapon = document.getElementById('athlete-weapon').value;
  const age = document.getElementById('athlete-age').value;
  const style = document.getElementById('athlete-style').value;
  const notes = document.getElementById('athlete-notes').value;

  if (!name) return alert("Adj meg egy nevet!");

  await fetch('/api/athletes', {
    method: 'POST',
    headers: { 'Content-Type':'application/json' },
    body: JSON.stringify({ name, weapon, age, style, notes })
  });

  document.getElementById('athlete-name').value = '';
  document.getElementById('athlete-age').value = '';
  document.getElementById('athlete-style').value = '';
  document.getElementById('athlete-notes').value = '';

  loadAthletes();
});

loadAthletes();
