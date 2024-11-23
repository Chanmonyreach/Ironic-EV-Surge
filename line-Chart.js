document.addEventListener('DOMContentLoaded', function(){
    // Function to generate a random integer between min and max (inclusive)
    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    // Function to create and update the line chart with point styling
    function createLineChart() {
        const lineChartCanvas = document.getElementById('line-Chart');
        const lineCtx = lineChartCanvas.getContext('2d');

        // Generating random data for demonstration (replace with actual data)
        const data = {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            datasets: [{
                label: 'Monthly Usage',
                data: Array.from({ length: 12 }, () => getRandomInt(1, 100)), // Generates random data for 12 months
                borderColor: '#ffff00',
                backgroundColor: 'transparent',
                pointBackgroundColor: 'green', // Point color
                pointRadius: 5, // Point radius
                pointHoverRadius: 8, // Point hover radius
                borderWidth: 2
            }]
        };

        const options = {
            responsive: true,
            plugins: {
                tooltip: {
                    enabled: true,
                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                    titleColor: '#fff',
                    bodyColor: '#fff',
                    borderColor: '#fff',
                    borderWidth: 1
                },
                legend: {
                    labels: {
                        color: '#fff' // Color of the legend labels
                    }
                }
            },
            scales: {
                y: {
                    suggestedMin: 0,
                    suggestedMax: 100,
                    ticks: {
                        color: '#fff' // Color of the y-axis labels
                    },
                    grid: {
                        color: '#fff' // Color of the y-axis grid lines
                    }
                },
                x: {
                    ticks: {
                        color: '#fff' // Color of the x-axis labels
                    },
                    grid: {
                        color: '#fff' // Color of the x-axis grid lines
                    }
                }
            }
        };

        new Chart(lineCtx, {
            type: 'line',
            data: data,
            options: options
        });
    }

    // Call the createLineChart function to generate the chart
    createLineChart();
});
