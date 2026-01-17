// Timer start dates
const loveStartDate = new Date('2025-06-28T22:18:00').getTime();
const yoursStartDate = new Date('2025-07-18T18:17:00').getTime();

function showTimers() {
    const openingPage = document.getElementById('openingPage');
    const timerPage = document.getElementById('timerPage');
    
    // Reset any classes and inline styles
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
    
    // Reset timer page classes and start fade out
    timerPage.className = 'timer-page active fade-out';
    
    setTimeout(() => {
        timerPage.classList.add('hidden');
        timerPage.classList.remove('active');
        
        // Reset opening page and show it
        openingPage.className = 'opening-page fade-in-from-bottom';
        openingPage.classList.remove('hidden');
        
        setTimeout(() => {
            openingPage.classList.remove('fade-in-from-bottom');
            openingPage.classList.add('fade-in');
            
            // Clean up classes after animation
            setTimeout(() => {
                openingPage.className = 'opening-page';
                timerPage.className = 'timer-page';
            }, 100);
        }, 50);
    }, 800);
}

function updateTimer(startDate, timerNumber) {
    const now = new Date().getTime();
    const difference = now - startDate;

    const totalDays = Math.floor(difference / (1000 * 60 * 60 * 24));
    const years = Math.floor(totalDays / 365.25);
    const daysAfterYears = totalDays - years * 365.25;
    const months = Math.floor(daysAfterYears / 30.44);
    const days = Math.floor(daysAfterYears - months * 30.44);
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    // Update the display with smooth number animation
    animateNumber(`years${timerNumber}`, years);
    animateNumber(`months${timerNumber}`, months);
    animateNumber(`days${timerNumber}`, days);
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

// Update timers every second
function updateAllTimers() {
    updateTimer(loveStartDate, 1);
    updateTimer(yoursStartDate, 2);
}

// Start the timers
updateAllTimers();
setInterval(updateAllTimers, 1000);

// Add some interactive sparkle effects
document.addEventListener('mousemove', (e) => {
    if (Math.random() > 0.95) {
        createSparkle(e.clientX, e.clientY);
    }
});

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