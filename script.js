(function() {
    // Countdown to April 22, 2026
    const countdownEl = document.getElementById('countdown');
    if (countdownEl) {
        function updateCountdown() {
            const now = new Date();
            const target = new Date(2026, 3, 22); // April 22, 2026
            const diff = target - now;

            if (diff <= 0) {
                countdownEl.innerHTML = "🎉 It's your birthday, Jica! Let's celebrate! 🎉";
                return;
            }

            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff % (86400000)) / (3600000));
            const minutes = Math.floor((diff % 3600000) / 60000);
            const seconds = Math.floor((diff % 60000) / 1000);

            countdownEl.innerHTML = `🎂 ${days}d ${hours}h ${minutes}m ${seconds}s until your big day! 🎂`;
        }
        updateCountdown();
        setInterval(updateCountdown, 1000);
    }

    // Floating message on photo click
    function showFloatingMessage(msg, x, y) {
        const bubble = document.createElement('div');
        bubble.className = 'floating-message';
        bubble.textContent = msg;
        bubble.style.left = (x + 15) + 'px';
        bubble.style.top = (y - 40) + 'px';
        document.body.appendChild(bubble);

        setTimeout(() => {
            bubble.remove();
        }, 8000); // 8 seconds
    }

    // Target all photos in fierce grid and wish photos
    const allPhotos = document.querySelectorAll('.fierce-grid img, .wish-photo img');
    allPhotos.forEach(img => {
        img.addEventListener('click', function(e) {
            let message = this.dataset.message;
            if (!message) message = this.alt || 'Happy birthday, Jica! 🔥🌙';
            showFloatingMessage(message, e.clientX, e.clientY);
        });
    });
})();


// ================= NAVBAR ACTIVE LINK & SMOOTH SCROLL =================
function initNavbar() {
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    function setActiveLink() {
        let current = '';
        const scrollPos = window.scrollY + 100; // offset for navbar
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', setActiveLink);
    setActiveLink(); // initial
    
    // Smooth scroll on click
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}