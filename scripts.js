// Loading Screen
window.addEventListener('load', () => {
    setTimeout(() => {
        const loadingScreen = document.querySelector('.loading-screen');
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 1000);
    }, 2000);
});

// Countdown Timer
function updateCountdown() {
    const birthday = new Date('2024-12-31 00:00:00'); // Ganti dengan tanggal ulang tahun yang sebenarnya
    const now = new Date();
    const diff = birthday - now;

    if (diff > 0) {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        document.getElementById('countdown').innerHTML = `
            <div class="countdown-item">
                <div class="countdown-number">${days}</div>
                <div class="countdown-label">Hari</div>
            </div>
            <div class="countdown-item">
                <div class="countdown-number">${hours}</div>
                <div class="countdown-label">Jam</div>
            </div>
            <div class="countdown-item">
                <div class="countdown-number">${minutes}</div>
                <div class="countdown-label">Menit</div>
            </div>
            <div class="countdown-item">
                <div class="countdown-number">${seconds}</div>
                <div class="countdown-label">Detik</div>
            </div>
        `;
    } else {
        document.getElementById('countdown').innerHTML = '<h2>Hari Ulang Tahun Telah Tiba!</h2>';
    }
}

setInterval(updateCountdown, 1000);
updateCountdown();

// Confetti Animation
const confettiCanvas = document.getElementById('confetti-canvas');
const ctx = confettiCanvas.getContext('2d');
let confettiParticles = [];

confettiCanvas.width = window.innerWidth;
confettiCanvas.height = window.innerHeight;

class ConfettiParticle {
    constructor() {
        this.x = Math.random() * confettiCanvas.width;
        this.y = Math.random() * confettiCanvas.height - confettiCanvas.height;
        this.r = Math.random() * 6 + 2;
        this.d = Math.random() * 10;
        this.color = `hsl(${Math.random() * 360}, 100%, 50%)`;
        this.tilt = Math.random() * 10 - 10;
        this.tiltAngleIncrement = Math.random() * 0.07 + 0.05;
        this.tiltAngle = 0;
    }

    draw() {
        ctx.beginPath();
        ctx.lineWidth = this.r / 2;
        ctx.strokeStyle = this.color;
        ctx.moveTo(this.x + this.tilt + this.r / 4, this.y);
        ctx.lineTo(this.x + this.tilt, this.y + this.tilt + this.r / 4);
        ctx.stroke();
    }

    update() {
        this.tiltAngle += this.tiltAngleIncrement;
        this.y += (Math.cos(this.d) + 3 + this.r / 2) / 2;
        this.x += Math.sin(this.d);
        this.tilt = Math.sin(this.tiltAngle) * 15;

        if (this.y > confettiCanvas.height) {
            this.x = Math.random() * confettiCanvas.width;
            this.y = -10;
            this.tilt = Math.random() * 10 - 10;
        }
    }
}

function createConfetti() {
    confettiParticles = [];
    for (let i = 0; i < 150; i++) {
        confettiParticles.push(new ConfettiParticle());
    }
}

function drawConfetti() {
    ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
    
    confettiParticles.forEach(particle => {
        particle.update();
        particle.draw();
    });
    
    requestAnimationFrame(drawConfetti);
}

// Start Celebration
function startCelebration() {
    createConfetti();
    drawConfetti();
    
    // Play background music
    const music = document.getElementById('backgroundMusic');
    music.play();
    document.getElementById('musicToggle').classList.add('playing');
    
    // Scroll to video section
    document.getElementById('videoSection').scrollIntoView({ 
        behavior: 'smooth' 
    });
    
    // Trigger birthday video
    setTimeout(() => {
        document.getElementById('birthdayVideo').play();
    }, 1000);
}

// Music Toggle
let musicPlaying = false;
function toggleMusic() {
    const music = document.getElementById('backgroundMusic');
    const button = document.getElementById('musicToggle');
    
    if (musicPlaying) {
        music.pause();
        button.classList.remove('playing');
    } else {
        music.play();
        button.classList.add('playing');
    }
    
    musicPlaying = !musicPlaying;
}

// Gallery Modal
function openModal(element) {
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const img = element.querySelector('img');
    
    modal.style.display = 'block';
    modalImg.src = img.src;
}

function closeModal() {
    document.getElementById('imageModal').style.display = 'none';
}

// Particle Background (menggunakan particles.js library)
// Jika ingin menggunakan particles.js, tambahkan script berikut:
/*
particlesJS('particles-js', {
    particles: {
        number: {
            value: 80,
            density: {
                enable: true,
                value_area: 800
            }
        },
        color: {
            value: '#ffffff'
        },
        shape: {
            type: 'circle'
        },
        opacity: {
            value: 0.5,
            random: false
        },
        size: {
            value: 3,
            random: true
        },
        line_linked: {
            enable: true,
            distance: 150,
            color: '#ffffff',
            opacity: 0.4,
            width: 1
        },
        move: {
            enable: true,
            speed: 6,
            direction: 'none',
            random: false,
            straight: false,
            out_mode: 'out',
            bounce: false
        }
    },
    interactivity: {
        detect_on: 'canvas',
        events: {
            onhover: {
                enable: true,
                mode: 'repulse'
            },
            onclick: {
                enable: true,
                mode: 'push'
            },
            resize: true
        }
    },
    retina_detect: true
});
*/

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Window Resize
window.addEventListener('resize', () => {
    confettiCanvas.width = window.innerWidth;
    confettiCanvas.height = window.innerHeight;
});

// Parallax Effect
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.hero');
    const speed = 0.5;
    
    if (parallax) {
        parallax.style.transform = `translateY(${scrolled * speed}px)`;
    }
});

// Animate on Scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    updateCountdown();
    
    // Add animation classes
    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach(el => {
        el.classList.add('animate-ready');
    });
});