document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('Powers-Gauge-Chart');
    const ctx = canvas.getContext('2d');
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = 130;  // Radius of the circle
    const lineWidth = 20; // Line width for the gauge

    // Function to draw the circular gauge
    function drawGauge(value) {
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear previous drawing
        
        // Draw the background circle
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
        ctx.lineWidth = lineWidth;
        ctx.strokeStyle = '#eee';  // Light gray background
        ctx.stroke();
        
        // Draw the filled portion (dynamic arc)
        const endAngle = (value / 100) * 2 * Math.PI - Math.PI / 2; // Percentage converted to angle
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, -Math.PI / 2, endAngle); // Start from top of circle
        ctx.lineWidth = lineWidth;
        ctx.strokeStyle = value <= 30 ? '#32cd32' : (value <= 70 ? '#ffd700' : '#ff4500'); // Color change based on value
        ctx.stroke();

        // // Draw the center circle
        // ctx.beginPath();
        // ctx.arc(centerX, centerY, 10, 0, 2 * Math.PI);
        // ctx.fillStyle = '#fff';
        // ctx.fill();

        // Draw the value text in the center
        ctx.font = '30px Arial';
        ctx.fillStyle = '#fff';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('Process '+value + '%', centerX, centerY);

        // Optionally draw text labels below the gauge
        ctx.font = '14px Arial';
        ctx.fillStyle = '#333';
        ctx.fillText('Battery Status', centerX, centerY + 90);
    }

    // Function to generate a random value between 0 and 100
    function generateRandomValue() {
        return Math.floor(Math.random() * 101);
    }

    // Update the gauge with a random value every 2 seconds
    setInterval(function() {
        const randomValue = generateRandomValue();
        drawGauge(randomValue);
    }, 2000); // Update every 2 seconds

    // Initial drawing with random value
    const initialValue = generateRandomValue();
    drawGauge(initialValue);
});