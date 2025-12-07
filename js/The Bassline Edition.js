// Icons
lucide.createIcons({
    attrs: { strokeWidth: 1.5 }
});

// Mouse Follower Effect
const mouseFollower = document.createElement('div');
mouseFollower.className = 'fixed w-6 h-6 bg-pink-400 rounded-full pointer-events-none z-10 opacity-30 blur-sm transition-all duration-300';
mouseFollower.style.mixBlendMode = 'screen';
document.body.appendChild(mouseFollower);

let mouseX = 0, mouseY = 0;
let followerX = 0, followerY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function updateMouseFollower() {
    const dx = mouseX - followerX;
    const dy = mouseY - followerY;

    followerX += dx * 0.1; // Smooth following
    followerY += dy * 0.1;

    mouseFollower.style.left = `${followerX - 12}px`; // Center the 24px element
    mouseFollower.style.top = `${followerY - 12}px`;

    requestAnimationFrame(updateMouseFollower);
}
updateMouseFollower();

// Clock Function
function updateTime() {
    const now = new Date();
    const timeString = new Intl.DateTimeFormat('en-US', {
        timeZone: 'Europe/London',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    }).format(now);
    document.getElementById('clock').textContent = timeString + " GMT";
}
setInterval(updateTime, 1000);
updateTime();

// Dynamic Background Effect
document.addEventListener('mousemove', (e) => {
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;

    const hue = (x * 60) + 280; // Pink to purple range
    const saturation = 5 + (y * 10); // Subtle saturation change
    const lightness = 8 + (y * 4); // Subtle lightness change

    document.body.style.background = `linear-gradient(135deg,
        hsl(${hue}, ${saturation}%, ${lightness}%),
        hsl(${hue + 30}, ${saturation + 5}%, ${lightness + 2}%)`;
});

// Scroll-based Parallax Effect
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;

    // Move background elements
    const glowPoints = document.querySelectorAll('.glow-point');
    glowPoints.forEach(point => {
        point.style.transform = `translateY(${rate * 0.3}px)`;
    });

    // Fade in/out navigation based on scroll
    const nav = document.querySelector('nav');
    if (nav) {
        const opacity = Math.max(0.3, 1 - (scrolled * 0.002));
        nav.style.opacity = opacity;
    }
});

// Click Shrink Effect
document.addEventListener('click', (e) => {
    // Find the clicked element
    const clickedElement = e.target;

    // Add shrink effect class
    clickedElement.classList.add('click-shrink');

    // Remove the class after animation completes
    setTimeout(() => {
        clickedElement.classList.remove('click-shrink');
    }, 300);
});

// Mobile Menu Toggle
function toggleMobileMenu() {
    const nav = document.querySelector('nav');
    if (nav) {
        nav.classList.toggle('hidden');
        nav.classList.toggle('flex');
    }
}

// Interactive Social Icons
const socialIcons = document.querySelectorAll('footer a[href*="instagram"], footer a[href*="tiktok"], footer a[href*="youtube"], footer a[href*="twitter"]');
socialIcons.forEach(icon => {
    icon.addEventListener('mouseenter', () => {
        icon.style.transform = 'scale(1.2) rotate(5deg)';
        icon.style.filter = 'drop-shadow(0 0 10px rgba(142, 142, 142, 0.8))';
    });

    icon.addEventListener('mouseleave', () => {
        icon.style.transform = 'scale(1) rotate(0deg)';
        icon.style.filter = 'none';
    });
});

