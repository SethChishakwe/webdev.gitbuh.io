// script.js - Clean version with smooth animations
document.addEventListener('DOMContentLoaded', function() {
    console.log('Portfolio loaded successfully');
    
    // ===== MOBILE MENU TOGGLE =====
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links a');

    // Toggle mobile menu
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            this.setAttribute('aria-expanded', navLinks.classList.contains('active'));
        });
    }

    // Close mobile menu when clicking a link
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                navLinks.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
            }
        });
    });

    // ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#' || href === '#0') return;

            e.preventDefault();
            const targetElement = document.querySelector(href);
            
            if (targetElement) {
                const targetPosition = targetElement.offsetTop - 80;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ===== NAVBAR SCROLL EFFECT =====
    const navbar = document.querySelector('.navbar');
    let lastScrollTop = 0;

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        // Add background when scrolled
        if (scrollTop > 100) {
            navbar.style.backgroundColor = 'rgba(0, 0, 0, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
        } else {
            navbar.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
            navbar.style.backdropFilter = 'blur(10px)';
        }

        // Hide/show navbar based on scroll direction
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down
            navbar.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            navbar.style.transform = 'translateY(0)';
        }

        lastScrollTop = scrollTop;
    });

    // ===== SIMPLE CURSOR ANIMATION =====
    const cursor = document.querySelector('.cursor');
    if (cursor) {
        let isVisible = true;
        setInterval(() => {
            isVisible = !isVisible;
            cursor.style.opacity = isVisible ? '1' : '0';
        }, 500);
    }

    // ===== INITIALIZE AOS ANIMATIONS =====
    // Only initialize if AOS is loaded
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 600,
            easing: 'ease-out-cubic',
            once: true,
            offset: 100,
            delay: 0,
            disable: window.innerWidth < 768 // Disable on mobile for performance
        });
    } else {
        console.log('AOS not loaded, falling back to basic animations');
        // Fallback basic animations
        fallbackAnimations();
    }

    // ===== FALLBACK ANIMATIONS (if AOS fails) =====
    function fallbackAnimations() {
        const animatedElements = document.querySelectorAll('[data-aos]');
        
        function checkAnimation() {
            animatedElements.forEach(element => {
                const elementTop = element.getBoundingClientRect().top;
                const elementVisible = 150;
                
                if (elementTop < window.innerHeight - elementVisible) {
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                }
            });
        }
        
        // Set initial state
        animatedElements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        });
        
        // Check on load
        checkAnimation();
        
        // Check on scroll
        window.addEventListener('scroll', checkAnimation);
    }

    // ===== HANDLE WINDOW RESIZE =====
    window.addEventListener('resize', function() {
        // Close mobile menu if resizing to desktop
        if (window.innerWidth > 768) {
            navLinks.classList.remove('active');
            if (menuToggle) {
                menuToggle.setAttribute('aria-expanded', 'false');
            }
        }
    });

    // ===== ENHANCED HOVER EFFECTS =====
    // Add hover effects to cards
    const cards = document.querySelectorAll('.article-card, .project-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // ===== BUTTON HOVER EFFECTS =====
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // ===== TERMINAL TYPEWRITER EFFECT =====
    const terminalLines = document.querySelectorAll('.terminal-line');
    if (terminalLines.length > 0) {
        // Simple typewriter effect for demo
        setTimeout(() => {
            const firstLine = terminalLines[0];
            const originalText = firstLine.textContent;
            
            if (originalText.includes('service')) {
                firstLine.innerHTML = '<span class="prompt">$</span> <span class="typing-text"></span>';
                typeText('.typing-text', 'service --list', 50);
            }
        }, 1000);
    }

    // ===== TYPEWRITER FUNCTION =====
    function typeText(selector, text, speed = 50) {
        const element = document.querySelector(selector);
        if (!element) return;
        
        let i = 0;
        element.textContent = '';
        
        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        
        type();
    }

    // ===== FOOTER CURRENT YEAR =====
    const yearElement = document.querySelector('.footer-copyright');
    if (yearElement) {
        const currentYear = new Date().getFullYear();
        yearElement.innerHTML = yearElement.innerHTML.replace('2023', currentYear);
    }

    // ===== CONSOLE LOG INITIALIZATION =====
    console.log(`
    ========================================
    DevWeb Portfolio Initialized Successfully
    ========================================
    Features loaded:
    ✓ Smooth scrolling
    ✓ Mobile navigation
    ✓ Scroll animations
    ✓ Hover effects
    ✓ Terminal animations
    ========================================
    `);
});

// ===== SIMPLE COUNTER ANIMATION (Optional) =====
// Only activate when stats are in viewport
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                if (!stat.classList.contains('animated')) {
                    const target = parseInt(stat.textContent);
                    if (!isNaN(target)) {
                        animateCounter(stat, target);
                        stat.classList.add('animated');
                    }
                }
            });
        }
    });
}, observerOptions);

// Observe stat elements
document.addEventListener('DOMContentLoaded', function() {
    const stats = document.querySelectorAll('.stat');
    stats.forEach(stat => observer.observe(stat));
});

function animateCounter(element, target) {
    let count = 0;
    const increment = target / 50; // Complete in ~1 second (50 frames)
    const timer = setInterval(() => {
        count += increment;
        if (count >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(count);
        }
    }, 20);
}

// ===== ADD STYLES FOR ACTIVE STATES =====
// Add active state styles to CSS via JavaScript
const activeStyles = document.createElement('style');
activeStyles.textContent = `
    /* Active navigation link */
    .nav-links.active {
        display: flex !important;
        flex-direction: column;
        position: absolute;
        top: 100%;
        left: 0;
        width: 100%;
        background-color: rgba(0, 0, 0, 0.95);
        backdrop-filter: blur(10px);
        padding: 2rem;
        gap: 1.5rem;
        border-top: 1px solid var(--gray-800);
    }
    
    /* Card hover transitions */
    .article-card, .project-card {
        transition: transform 0.3s ease, box-shadow 0.3s ease;
    }
    
    .btn {
        transition: transform 0.2s ease, background-color 0.3s ease, border-color 0.3s ease;
    }
    
    /* Smooth scroll padding fix */
    html {
        scroll-padding-top: 80px;
    }
    
    /* Terminal cursor */
    .cursor {
        animation: blink 1s infinite;
    }
    
    @keyframes blink {
        0%, 100% { opacity: 1; }
        50% { opacity: 0; }
    }
`;
document.head.appendChild(activeStyles);

// ===== ERROR HANDLING =====
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.message);
    // Graceful degradation - disable problematic features
    const menuToggle = document.querySelector('.menu-toggle');
    if (menuToggle) {
        menuToggle.style.display = 'none';
    }
});