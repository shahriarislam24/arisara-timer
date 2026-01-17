// Timer start dates
const loveStartDate = new Date('2025-06-28T22:18:00');
const yoursStartDate = new Date('2025-07-18T18:17:00');

function showTimers() {
    const openingPage = document.getElementById('openingPage');
    const timerPage = document.getElementById('timerPage');

    openingPage.className = 'opening-page fade-out';

    setTimeout(() => {
        openingPage.classList.add('hidden');
        timerPage.className = 'timer-page active fade-in-from-bottom';

        setTimeout(() => {
            timerPage.classList.remove('fade-in-from-bottom');
            timerPage.classList.add('fade-in');
        }, 50);
    }, 800);
}

function goBackHome() {
    const openingPage = document.getElementById('openingPage');
    const timerPage = document.getElementById('timerPage');

    timerPage.className = 'timer-page active fade-out';

    setTimeout(() => {
        timerPage.classList.add('hidden');
        timerPage.classList.remove('active');

        openingPage.className = 'opening-page fade-in-from-bottom';
        openingPage.classList.remove('hidden');

        setTimeout(() => {
            openingPage.classList.remove('fade-in-from-bottom');
            openingPage.classList.add('fade-in');

            setTimeout(() => {
                openingPage.className = 'opening-page';
                timerPage.className = 'timer-page';
            }, 100);
        }, 50);
    }, 800);
}

function updateTimer(startDate, timerNumber) {
    const now = new Date();
    const start = new Date(startDate);
    
    // Calculate total difference in milliseconds
    const difference = now - start;
    
    // Calculate years and months for display text
    let years = now.getFullYear() - start.getFullYear();
    let months = now.getMonth() - start.getMonth();
    if (months < 0) {
        years--;
        months += 12;
    }
    
    // If the current day is before the start day in the month, subtract a month
    if (now.getDate() < start.getDate()) {
        months--;
        if (months < 0) {
            years--;
            months += 12;
        }
    }
    
    // Calculate TOTAL days, hours, minutes, seconds from start
    const totalDays = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    // Update summary text (years and months)
    const summary = document.getElementById(`summary${timerNumber}`);
    if (summary) {
        summary.querySelector('.years-display').textContent = years;
        summary.querySelector('.months-display').textContent = months;
    }

    // Update counter (total days, hours, minutes, seconds)
    animateNumber(`days${timerNumber}`, totalDays);
    animateNumber(`hours${timerNumber}`, hours);
    animateNumber(`minutes${timerNumber}`, minutes);
    animateNumber(`seconds${timerNumber}`, seconds);
}

function animateNumber(elementId, newValue) {
    const element = document.getElementById(elementId);
    if (!element) return;

    const currentValue = parseInt(element.textContent) || 0;

    if (currentValue !== newValue) {
        element.style.transform = 'scale(1.1)';
        element.style.color = 'var(--accent-red)';

        setTimeout(() => {
            element.textContent = newValue;
            element.style.transform = 'scale(1)';
            element.style.color = 'var(--accent-pink)';
        }, 100);
    }
}

function updateAllTimers() {
    updateTimer(loveStartDate, 1);
    updateTimer(yoursStartDate, 2);
}

function createSparkle(x, y) {
    const sparkle = document.createElement('div');
    sparkle.innerHTML = '💕';
    sparkle.style.position = 'fixed';
    sparkle.style.left = x + 'px';
    sparkle.style.top = y + 'px';
    sparkle.style.pointerEvents = 'none';
    sparkle.style.fontSize = '20px';
    sparkle.style.zIndex = '1000';
    sparkle.style.animation = 'sparkleFloat 2s ease-out forwards';

    document.body.appendChild(sparkle);
    setTimeout(() => {
        if (document.body.contains(sparkle)) {
            document.body.removeChild(sparkle);
        }
    }, 2000);
}

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Event listeners
    document.getElementById('continueBtn').addEventListener('click', showTimers);
    document.getElementById('backBtn').addEventListener('click', goBackHome);

    // Start the timers
    updateAllTimers();
    setInterval(updateAllTimers, 1000);

    // Sparkle effects
    document.addEventListener('mousemove', (e) => {
        if (Math.random() > 0.95) {
            createSparkle(e.clientX, e.clientY);
        }
    });
});