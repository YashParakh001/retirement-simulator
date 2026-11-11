document.getElementById('retirement-form').addEventListener('submit', function (e) {
  e.preventDefault();

  const currentAge = +document.getElementById('currentAge').value;
  const retirementAge = +document.getElementById('retirementAge').value;
  const lifespan = +document.getElementById('lifespan').value;
  const savingsInput = +document.getElementById('savings').value;
  const monthlyContribution = +document.getElementById('monthly').value;
  const annualRate = +document.getElementById('rate').value / 100;
  const annualSpend = +document.getElementById('spend').value;

  let savings = savingsInput;
  let labels = [];
  let data = [];

  // Accumulation
  for (let year = 0; year <= retirementAge - currentAge; year++) {
    for (let month = 0; month < 12; month++) {
      savings *= 1 + (annualRate / 12);
      savings += monthlyContribution;
    }
    labels.push(currentAge + year);
    data.push(Math.round(savings));
  }

  // Decumulation
  for (let year = 1; year <= lifespan - retirementAge; year++) {
    savings *= 1 + annualRate;
    savings -= annualSpend;
    savings = Math.max(savings, 0);
    labels.push(retirementAge + year);
    data.push(Math.round(savings));
    if (savings === 0) break;
  }

  // Chart
  const ctx = document.getElementById('retirementChart').getContext('2d');
  if (window.retirementChart) window.retirementChart.destroy();
  window.retirementChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
        label: 'Savings Over Time',
        data: data,
        borderColor: 'green',
        backgroundColor: 'rgba(0, 128, 0, 0.1)',
        fill: true,
        tension: 0.2
      }]
    },
    options: {
      responsive: true,
      scales: {
        x: { title: { display: true, text: 'Age' } },
        y: { title: { display: true, text: 'Savings ($)' } }
      }
    }
  });
});
