// Music player functionality
const musicToggle = document.getElementById('musicToggle');
const bgMusic = document.getElementById('bgMusic');
const playIcon = document.querySelector('.play-icon');
const pauseIcon = document.querySelector('.pause-icon');

function toggleMusic() {
    if (bgMusic.paused) {
        bgMusic.play();
        playIcon.classList.add('hidden');
        pauseIcon.classList.remove('hidden');
    } else {
        bgMusic.pause();
        playIcon.classList.remove('hidden');
        pauseIcon.classList.add('hidden');
    }
}

// Form submission handling
function handleSubmit(event) {
    event.preventDefault();
    
    const submitBtn = document.querySelector('.submit-btn');
    const originalBtnText = submitBtn.textContent;
    submitBtn.textContent = 'Жіберілуде...';
    submitBtn.disabled = true;

    const name = document.getElementById('name').value;
    const attendance = document.querySelector('input[name="attendance"]:checked').value;
    
    // Show success message
    showNotification('Рахмет! Жауабыңыз сәтті жіберілді.', 'success');
    event.target.reset();
    
    // Send notification to Telegram (optional)
    const message = `Новый ответ:\nИмя: ${name}\nПрисутствие: ${attendance}`;
    const telegramBotToken = 'YOUR_BOT_TOKEN'; // Замените на ваш токен
    const chatId = 'YOUR_CHAT_ID'; // Замените на ваш ID чата
    
    fetch(`https://api.telegram.org/bot${telegramBotToken}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(message)}`)
        .catch(error => console.error('Error:', error));
    
    submitBtn.textContent = originalBtnText;
    submitBtn.disabled = false;
}

// Notification system
function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Trigger animation
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Smooth scroll for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Add animation on scroll
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.date-time, .venue, .hosts, .rsvp-form');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight - 100) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
};

// Initial styles for animation
document.querySelectorAll('.date-time, .venue, .hosts, .rsvp-form').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
});

// Listen for scroll events
window.addEventListener('scroll', animateOnScroll);
// Initial check for elements in view
window.addEventListener('load', animateOnScroll); 