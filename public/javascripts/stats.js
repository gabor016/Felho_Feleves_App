const ratingCtx = document.getElementById('ratingChart').getContext('2d');
const trainingCtx = document.getElementById('trainingChart').getContext('2d');

const ratingChart = new Chart(ratingCtx, {
  type: 'bar',
  data: {
    labels: data.map(d => d.name),
    datasets: [{
      label: 'Ranglista pont',
      data: data.map(d => d.rating),
      backgroundColor: '#0ea5a4'
    }]
  },
  options: { responsive: true }
});

const trainingChart = new Chart(trainingCtx, {
  type: 'line',
  data: {
    labels: data.flatMap(d => d.trainingDates.map(dt => new Date(dt).toLocaleDateString())),
    datasets: data.map((d, i) => ({
      label: d.name,
      data: d.trainingDates.map(() => 1),
      borderColor: `hsl(${i*60},70%,50%)`,
      fill: false
    }))
  },
  options: { responsive: true }
});
