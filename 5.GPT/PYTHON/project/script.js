const ctx = document.getElementById('chart-data');
const labels = JSON.parse(chartData.dataset.labels);
const values = JSON.parse(chartData.dataset.values);

    const budgetChart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: labels,
        datasets: [{
          label: '예상 경비 (단위: 원)',
          data: values,
          backgroundColor: [
            'rgb(115, 99, 255)',
            'rgb(6, 78, 126)',
            'rgb(114, 228, 213)',
            'rgb(170, 233, 233)'
          ],
          borderColor: [
            'rgb(115, 99, 255)',
            'rgb(6, 78, 126)',
            'rgb(114, 228, 213)',
            'rgb(170, 233, 233)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'bottom'
          },
          title: {
            display: true,
            text: '총 예산 여행 경비 분포'
          }
        }
      }
    });