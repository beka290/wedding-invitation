document.addEventListener('DOMContentLoaded', function() {
    // YouTube API Setup
    var tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    let player;
    let isPlaying = false;

    window.onYouTubeIframeAPIReady = function() {
        player = new YT.Player('player', {
            height: '0',
            width: '0',
            videoId: '10unE1mT07w',
            playerVars: {
                'autoplay': 0,
                'controls': 0,
                'showinfo': 0,
                'modestbranding': 1,
                'loop': 1,
                'playlist': '10unE1mT07w',
                'fs': 0,
                'cc_load_policy': 0,
                'iv_load_policy': 3,
                'autohide': 0
            },
            events: {
                'onReady': onPlayerReady,
                'onStateChange': onPlayerStateChange
            }
        });
    }

    function onPlayerReady(event) {
        const musicToggle = document.getElementById('musicToggle');
        const playText = musicToggle.querySelector('.play-text');
        
        musicToggle.addEventListener('click', function() {
            if (!isPlaying) {
                event.target.playVideo();
                playText.textContent = 'Музыканы өшіру';
                musicToggle.classList.add('playing');
                isPlaying = true;
            } else {
                event.target.pauseVideo();
                playText.textContent = 'Музыканы қосу';
                musicToggle.classList.remove('playing');
                isPlaying = false;
            }
        });
    }

    function onPlayerStateChange(event) {
        if (event.data === YT.PlayerState.ENDED) {
            player.playVideo();
        }
    }

    // Countdown Timer
    const weddingDate = new Date('2024-07-15T17:00:00').getTime();

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = weddingDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById('days').textContent = String(days).padStart(2, '0');
        document.getElementById('hours').textContent = String(hours).padStart(2, '0');
        document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
        document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');

        if (distance < 0) {
            clearInterval(countdownInterval);
            document.getElementById('countdown').innerHTML = '<h2>Той басталды!</h2>';
        }
    }

    const countdownInterval = setInterval(updateCountdown, 1000);
    updateCountdown();

    // Form Handling
    const rsvpForm = document.getElementById('rsvpForm');
    
    rsvpForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = {
            name: document.getElementById('name').value,
            phone: document.getElementById('phone').value,
            attendance: document.getElementById('attendance').value,
            guests: document.getElementById('guests').value
        };

        // Here you would typically send the form data to a server
        console.log('Form submitted:', formData);
        
        // Show success message
        alert('Рахмет! Сіздің жауабыңыз қабылданды.');
        rsvpForm.reset();
    });

    // Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Animation on Scroll
    function revealOnScroll() {
        const elements = document.querySelectorAll('.detail-card, .countdown-item, .wish-text');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                element.classList.add('visible');
            }
        });
    }

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll();
}); 