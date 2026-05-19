// const texts = [
//     "Python Developer",
//     "Django Enthusiast",
//     "AI Explorer"
// ];

// let speed = 100;
// let textIndex = 0;
// let charIndex = 0;

// const typingText = document.getElementById("typing-text");

// function typeText(){

//     if(charIndex < texts[textIndex].length){

//         typingText.textContent += texts[textIndex].charAt(charIndex);

//         charIndex++;

//         setTimeout(typeText, speed);

//     }

//     else{

//         setTimeout(eraseText, 1500);

//     }
// }

// function eraseText(){

//     if(charIndex > 0){

//         typingText.textContent =
//             texts[textIndex].substring(0, charIndex-1);

//         charIndex--;

//         setTimeout(eraseText, 50);

//     }

//     else{

//         textIndex++;

//         if(textIndex >= texts.length){
//             textIndex = 0;
//         }

//         setTimeout(typeText, 500);
//     }
// }

// document.addEventListener("DOMContentLoaded", function(){

//     if(texts.length){
//         setTimeout(typeText, 500);
//     }

// });


// const codeText = `
// class Developer:
//     def __init__(self):
//         self.name = "Hema Madhuri"
//         self.skills = ["Python", "Django", "AI"]

//     def build(self):
//         return "Impactful Web Applications"
// `;

// let i = 0;
// const speed = 30;

// const codeElement = document.getElementById("typing-code");

// function typeCode(){
//     if(i < codeText.length){
//         codeElement.textContent += codeText.charAt(i);
//         i++;
//         setTimeout(typeCode, speed);
//     }
// }

// document.addEventListener("DOMContentLoaded", function(){
//     typeCode();
// });
document.addEventListener("DOMContentLoaded", function(){

    /* ==================== PREMIUM NEURAL NETWORK BACKGROUND ==================== */
    const canvas = document.getElementById('neural-canvas');
    const ctx = canvas.getContext('2d');

    if (canvas) {
        let particles = [];
        let mouse = { x: null, y: null, radius: 150 };
        let animationId;

        // Set canvas size
        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }

        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        // Mouse interaction
        window.addEventListener('mousemove', (event) => {
            mouse.x = event.x;
            mouse.y = event.y;
        });

        window.addEventListener('mouseout', () => {
            mouse.x = null;
            mouse.y = null;
        });

        // Particle class
        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 2 + 1;
                this.speedX = (Math.random() * 0.5 - 0.25);
                this.speedY = (Math.random() * 0.5 - 0.25);
                this.opacity = Math.random() * 0.5 + 0.2;
            }

            update() {
                // Move particle
                this.x += this.speedX;
                this.y += this.speedY;

                // Bounce off edges
                if (this.x > canvas.width || this.x < 0) {
                    this.speedX = -this.speedX;
                }
                if (this.y > canvas.height || this.y < 0) {
                    this.speedY = -this.speedY;
                }

                // Mouse interaction
                if (mouse.x != null) {
                    const dx = mouse.x - this.x;
                    const dy = mouse.y - this.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < mouse.radius) {
                        const forceDirectionX = dx / distance;
                        const forceDirectionY = dy / distance;
                        const force = (mouse.radius - distance) / mouse.radius;
                        const directionX = forceDirectionX * force * 0.5;
                        const directionY = forceDirectionY * force * 0.5;

                        this.x -= directionX;
                        this.y -= directionY;
                    }
                }
            }

            draw() {
                const isDarkMode = document.documentElement.getAttribute('data-theme') === 'dark';
                const color = isDarkMode ? '56, 189, 248' : '2, 132, 199';

                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(${color}, ${this.opacity})`;
                ctx.fill();
            }
        }

        // Initialize particles
        function initParticles() {
            particles = [];
            const numberOfParticles = Math.min(100, (canvas.width * canvas.height) / 15000);

            for (let i = 0; i < numberOfParticles; i++) {
                particles.push(new Particle());
            }
        }

        initParticles();

        // Reinitialize particles on resize
        window.addEventListener('resize', () => {
            setTimeout(initParticles, 100);
        });

        // Draw connecting lines
        function connectParticles() {
            const isDarkMode = document.documentElement.getAttribute('data-theme') === 'dark';
            const color = isDarkMode ? '56, 189, 248' : '2, 132, 199';
            const maxDistance = 150;

            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < maxDistance) {
                        const opacity = 1 - (distance / maxDistance);
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(${color}, ${opacity * 0.3})`;
                        ctx.lineWidth = 0.5;
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }

                // Connect to mouse
                if (mouse.x != null) {
                    const dx = particles[i].x - mouse.x;
                    const dy = particles[i].y - mouse.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < mouse.radius) {
                        const opacity = 1 - (distance / mouse.radius);
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(${color}, ${opacity * 0.5})`;
                        ctx.lineWidth = 0.8;
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(mouse.x, mouse.y);
                        ctx.stroke();
                    }
                }
            }
        }

        // Animation loop
        function animate() {
            const isDarkMode = document.documentElement.getAttribute('data-theme') === 'dark';
            
            // Clear canvas with gradient background
            const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
            if (isDarkMode) {
                gradient.addColorStop(0, '#000000');
                gradient.addColorStop(1, '#0F172A');
            } else {
                gradient.addColorStop(0, '#f8fafc');
                gradient.addColorStop(1, '#ffffff');
            }
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Update and draw particles
            particles.forEach(particle => {
                particle.update();
                particle.draw();
            });

            // Draw connecting lines
            connectParticles();

            animationId = requestAnimationFrame(animate);
        }

        animate();

        // Update animation when theme changes
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.attributeName === 'data-theme') {
                    // Animation will automatically pick up new theme in next frame
                }
            });
        });

        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['data-theme']
        });
    }

    /* ==================== THEME TOGGLE ==================== */
    const themeToggle = document.getElementById('theme-toggle');
    const html = document.documentElement;

    // Check for saved theme preference or default to dark mode
    const savedTheme = localStorage.getItem('theme') || 'dark';
    html.setAttribute('data-theme', savedTheme);

    // Toggle theme on button click
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = html.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            html.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
        });
    }

    /* ==================== SCROLL REVEAL ANIMATION ==================== */
    const scrollRevealElements = document.querySelectorAll('.scroll-reveal');

    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const elementVisible = 150;

        scrollRevealElements.forEach((element) => {
            const elementTop = element.getBoundingClientRect().top;
            
            if (elementTop < windowHeight - elementVisible) {
                element.classList.add('revealed');
            }
        });
    };

    // Initial check
    revealOnScroll();

    // Check on scroll
    window.addEventListener('scroll', revealOnScroll);

    /* ==================== NAVBAR GLASS EFFECT ON SCROLL ==================== */
    const navbar = document.querySelector('nav');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    /* ==================== HERO TEXT TYPING ==================== */
    const texts = [
        "Python Developer",
        "Django Enthusiast",
        "AI Explorer"
    ];

    let textIndex = 0;
    let charIndex = 0;

    const typingText = document.getElementById("typing-text");

    function typeHero(){
        if(!typingText) return;

        if(charIndex < texts[textIndex].length){
            typingText.textContent += texts[textIndex].charAt(charIndex);
            charIndex++;
            setTimeout(typeHero, 100);
        } else {
            setTimeout(eraseHero, 1500);
        }
    }

    function eraseHero(){
        if(charIndex > 0){
            typingText.textContent =
                texts[textIndex].substring(0, charIndex - 1);
            charIndex--;
            setTimeout(eraseHero, 50);
        } else {
            textIndex = (textIndex + 1) % texts.length;
            setTimeout(typeHero, 500);
        }
    }

    /* ==================== CODE BLOCK TYPING ==================== */
    const codeText = `
class Developer:
    def __init__(self):
        self.name = "Hema Madhuri"
        self.skills = ["Python", "Django", "AI"]

    def build(self):
        return "Impactful Web Applications"
`;

    let i = 0;
    let isDeleting = false;

    const codeElement = document.getElementById("typing-code");

    function typeCode(){
        if(!codeElement) return;

        if(!isDeleting){
            // TYPE
            if(i < codeText.length){
                codeElement.textContent += codeText.charAt(i);
                i++;
                setTimeout(typeCode, 30);
            } else {
                isDeleting = true;
                setTimeout(typeCode, 1500); // pause before deleting
            }
        } else {
            // DELETE
            if(i > 0){
                codeElement.textContent = codeText.substring(0, i - 1);
                i--;
                setTimeout(typeCode, 15);
            } else {
                isDeleting = false;
                setTimeout(typeCode, 500); // restart typing
            }
        }
    }

    /* ==================== HAMBURGER MENU TOGGLE ==================== */
    const hamburgerMenu = document.getElementById('hamburger-menu');
    const navLinks = document.getElementById('nav-links');

    if (hamburgerMenu) {
        hamburgerMenu.addEventListener('click', function() {
            hamburgerMenu.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Close menu when a link is clicked
        const navItems = navLinks.querySelectorAll('a');
        navItems.forEach(link => {
            link.addEventListener('click', function() {
                hamburgerMenu.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }

    /* ==================== START ALL ANIMATIONS ==================== */
    typeHero();
    typeCode();
});