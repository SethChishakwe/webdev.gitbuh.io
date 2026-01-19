// Finance Page Smooth Animations
document.addEventListener('DOMContentLoaded', function() {
    console.log('Finance page animations loaded');
    
    // ===== AOS ANIMATIONS =====
    // Include AOS library in your HTML head:
    // <link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet">
    // <script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>
    
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-out-cubic',
            once: true,
            offset: 100,
            delay: 100,
            disable: window.innerWidth < 768
        });
    }
    
    // ===== MOBILE MENU TOGGLE =====
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            this.classList.toggle('active');
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!navLinks.contains(event.target) && !menuToggle.contains(event.target)) {
                navLinks.classList.remove('active');
                menuToggle.classList.remove('active');
            }
        });
    }
    
    // ===== SMOOTH SCROLLING =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#' || href === '#0') return;
            
            e.preventDefault();
            const targetElement = document.querySelector(href);
            
            if (targetElement) {
                // Close mobile menu if open
                if (navLinks) navLinks.classList.remove('active');
                if (menuToggle) menuToggle.classList.remove('active');
                
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
    if (navbar) {
        let lastScroll = 0;
        
        window.addEventListener('scroll', function() {
            const currentScroll = window.pageYOffset;
            
            // Add/remove box shadow on scroll
            if (currentScroll > 50) {
                navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
            } else {
                navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.05)';
            }
            
            // Hide/show navbar on scroll direction
            if (currentScroll > lastScroll && currentScroll > 100) {
                navbar.style.transform = 'translateY(-100%)';
            } else {
                navbar.style.transform = 'translateY(0)';
            }
            
            lastScroll = currentScroll;
        });
    }
    
    // ===== FORM SUBMISSION =====
    const consultationForm = document.getElementById('consultationForm');
    if (consultationForm) {
        consultationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Show success message
            const submitBtn = this.querySelector('.form-btn');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Simulate form submission
            setTimeout(() => {
                submitBtn.textContent = 'Request Sent!';
                submitBtn.style.backgroundColor = '#28a745';
                
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.backgroundColor = '';
                    this.reset();
                    
                    // Show confirmation message
                    showNotification('Thank you for your consultation request. A representative will contact you within 24 hours.');
                }, 2000);
            }, 1500);
        });
    }
    
    // ===== ANIMATE STATS ON SCROLL =====
    function animateStats() {
        const statItems = document.querySelectorAll('.stat-item');
        
        statItems.forEach((item, index) => {
            const rect = item.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight && rect.bottom >= 0;
            
            if (isVisible && !item.classList.contains('animated')) {
                item.classList.add('animated');
                
                const statNumber = item.querySelector('.stat-number');
                if (statNumber) {
                    const value = statNumber.textContent;
                    const isMoney = value.includes('$');
                    const cleanValue = value.replace(/[^0-9.]/g, '');
                    const target = parseFloat(cleanValue);
                    
                    if (!isNaN(target)) {
                        animateCounter(statNumber, target, isMoney, index * 200);
                    }
                }
            }
        });
    }
    
    // ===== COUNTER ANIMATION =====
    function animateCounter(element, target, isMoney = false, delay = 0) {
        setTimeout(() => {
            let start = 0;
            const duration = 1500;
            const increment = target / (duration / 16);
            
            const timer = setInterval(() => {
                start += increment;
                if (start >= target) {
                    element.textContent = isMoney ? `$${target.toFixed(1)}+` : `${target}+`;
                    clearInterval(timer);
                } else {
                    element.textContent = isMoney ? `$${Math.floor(start).toLocaleString()}+` : `${Math.floor(start)}+`;
                }
            }, 16);
        }, delay);
    }
    
    // ===== HOVER ANIMATIONS =====
    function addHoverAnimations() {
        // Service cards
        const serviceCards = document.querySelectorAll('.service-card');
        serviceCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });
        
        // Buttons
        const buttons = document.querySelectorAll('.btn, .nav-cta, .form-btn');
        buttons.forEach(btn => {
            btn.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-2px)';
            });
            
            btn.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
            });
        });
        
        // Team members
        const teamMembers = document.querySelectorAll('.team-member');
        teamMembers.forEach(member => {
            member.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-5px)';
            });
            
            member.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
            });
        });
    }
    
    // ===== LAZY LOAD IMAGES =====
    function lazyLoadImages() {
        const images = document.querySelectorAll('img');
        
        images.forEach(img => {
            if (img.complete) {
                img.classList.add('loaded');
            } else {
                img.addEventListener('load', function() {
                    this.classList.add('loaded');
                });
            }
        });
    }
    
    // ===== NOTIFICATION FUNCTION =====
    function showNotification(message) {
        // Remove existing notification
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        // Create notification
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-check-circle"></i>
                <span>${message}</span>
                <button class="notification-close">&times;</button>
            </div>
        `;
        
        // Add styles
        const style = document.createElement('style');
        style.textContent = `
            .notification {
                position: fixed;
                top: 100px;
                right: 20px;
                background: white;
                border-left: 4px solid var(--gold);
                box-shadow: 0 5px 15px rgba(0,0,0,0.1);
                border-radius: 4px;
                padding: 15px 20px;
                z-index: 9999;
                animation: slideInRight 0.3s ease-out;
            }
            
            .notification-content {
                display: flex;
                align-items: center;
                gap: 10px;
            }
            
            .notification-content i {
                color: var(--gold);
                font-size: 1.2rem;
            }
            
            .notification-close {
                background: none;
                border: none;
                font-size: 1.5rem;
                cursor: pointer;
                color: var(--gray);
                margin-left: 10px;
            }
            
            @keyframes slideInRight {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
        `;
        
        document.head.appendChild(style);
        document.body.appendChild(notification);
        
        // Add close functionality
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', function() {
            notification.style.animation = 'slideOutRight 0.3s ease-out';
            setTimeout(() => notification.remove(), 300);
        });
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.animation = 'slideOutRight 0.3s ease-out';
                setTimeout(() => notification.remove(), 300);
            }
        }, 5000);
    }
    
    // ===== ADD CSS ANIMATIONS =====
    function addAnimationStyles() {
        const animationStyles = document.createElement('style');
        animationStyles.textContent = `
            /* Scroll animations */
            .fade-in {
                animation: fadeIn 0.8s ease-out forwards;
            }
            
            .slide-up {
                animation: slideUp 0.8s ease-out forwards;
            }
            
            /* Card hover animations */
            .service-card, .team-member {
                transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            }
            
            /* Button animations */
            .btn, .nav-cta, .form-btn {
                transition: all 0.3s ease;
                position: relative;
                overflow: hidden;
            }
            
            .btn::after, .nav-cta::after, .form-btn::after {
                content: '';
                position: absolute;
                top: 50%;
                left: 50%;
                width: 0;
                height: 0;
                background: rgba(255, 255, 255, 0.2);
                border-radius: 50%;
                transform: translate(-50%, -50%);
                transition: width 0.6s, height 0.6s;
            }
            
            .btn:hover::after, .nav-cta:hover::after, .form-btn:hover::after {
                width: 300px;
                height: 300px;
            }
            
            /* Image loading animation */
            img {
                opacity: 0;
                animation: fadeIn 0.8s ease-out forwards;
            }
            
            img.loaded {
                animation: none;
                opacity: 1;
            }
            
            /* Experience badge animation */
            .experience-badge {
                animation: pulse 2s infinite;
            }
            
            /* Keyframes */
            @keyframes fadeIn {
                from {
                    opacity: 0;
                }
                to {
                    opacity: 1;
                }
            }
            
            @keyframes slideUp {
                from {
                    opacity: 0;
                    transform: translateY(30px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            
            @keyframes pulse {
                0% {
                    transform: scale(1);
                    box-shadow: 0 10px 20px rgba(212, 175, 55, 0.3);
                }
                50% {
                    transform: scale(1.05);
                    box-shadow: 0 15px 30px rgba(212, 175, 55, 0.4);
                }
                100% {
                    transform: scale(1);
                    box-shadow: 0 10px 20px rgba(212, 175, 55, 0.3);
                }
            }
            
            /* Responsive animations */
            @media (max-width: 768px) {
                .experience-badge {
                    animation: none;
                }
                
                .service-card:hover {
                    transform: none !important;
                }
            }
        `;
        
        document.head.appendChild(animationStyles);
    }
    
    // ===== INITIALIZE EVERYTHING =====
    function initAnimations() {
        // Add animation styles
        addAnimationStyles();
        
        // Initialize hover animations
        addHoverAnimations();
        
        // Lazy load images
        lazyLoadImages();
        
        // Check stats on load and scroll
        animateStats();
        window.addEventListener('scroll', animateStats);
        
        // Add data-aos attributes if AOS is loaded
        if (typeof AOS !== 'undefined') {
            addAOSAttributes();
        }
    }
    
    // ===== ADD AOS ATTRIBUTES DYNAMICALLY =====
    function addAOSAttributes() {
        // Hero section
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) {
            heroContent.setAttribute('data-aos', 'fade-right');
            heroContent.setAttribute('data-aos-delay', '100');
        }
        
        // Stats
        const statItems = document.querySelectorAll('.stat-item');
        statItems.forEach((item, index) => {
            item.setAttribute('data-aos', 'fade-up');
            item.setAttribute('data-aos-delay', `${200 + (index * 100)}`);
        });
        
        // Section titles
        const sectionTitles = document.querySelectorAll('.section-title');
        sectionTitles.forEach(title => {
            title.setAttribute('data-aos', 'fade-up');
        });
        
        // Service cards
        const serviceCards = document.querySelectorAll('.service-card');
        serviceCards.forEach((card, index) => {
            card.setAttribute('data-aos', 'fade-up');
            card.setAttribute('data-aos-delay', `${100 + (index * 100)}`);
        });
        
        // About section
        const aboutText = document.querySelector('.about-text');
        if (aboutText) {
            aboutText.setAttribute('data-aos', 'fade-right');
        }
        
        const aboutImage = document.querySelector('.about-image');
        if (aboutImage) {
            aboutImage.setAttribute('data-aos', 'fade-left');
            aboutImage.setAttribute('data-aos-delay', '200');
        }
        
        // Team members
        const teamMembers = document.querySelectorAll('.team-member');
        teamMembers.forEach((member, index) => {
            member.setAttribute('data-aos', 'fade-up');
            member.setAttribute('data-aos-delay', `${100 + (index * 100)}`);
        });
        
        // Contact items
        const contactItems = document.querySelectorAll('.contact-item');
        contactItems.forEach((item, index) => {
            item.setAttribute('data-aos', 'fade-right');
            item.setAttribute('data-aos-delay', `${100 + (index * 100)}`);
        });
        
        // Contact form
        const contactForm = document.querySelector('.contact-form');
        if (contactForm) {
            contactForm.setAttribute('data-aos', 'fade-left');
            contactForm.setAttribute('data-aos-delay', '200');
        }
    }
    
    // Start animations
    initAnimations();
    
    // Update copyright year
    const yearElement = document.querySelector('.footer-bottom p');
    if (yearElement) {
        const currentYear = new Date().getFullYear();
        yearElement.innerHTML = yearElement.innerHTML.replace('2023', currentYear);
    }
    
    console.log('All animations initialized successfully');
});

// Handle page load errors
window.addEventListener('error', function(e) {
    console.error('Animation error:', e.message);
});