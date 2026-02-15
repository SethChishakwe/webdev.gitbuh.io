// ========== MENU TOGGLE ==========
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

navToggle.addEventListener('click', () => {
  navMenu.classList.toggle('open');
  navToggle.textContent = navMenu.classList.contains('open') ? 'CLOSE' : 'MENU';
  document.body.style.overflow = navMenu.classList.contains('open') ? 'hidden' : 'auto';
});

// Close menu when clicking on a link
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('open');
    navToggle.textContent = 'MENU';
    document.body.style.overflow = 'auto';
  });
});

// ========== SCROLL REVEAL ANIMATION ==========
const revealElements = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
    }
  });
}, {
  threshold: 0.15
});

revealElements.forEach(element => {
  observer.observe(element);
});

// ========== CONTACT FORM ==========
const contactForm = document.getElementById('contactForm');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const message = document.getElementById('message').value;

    // Show success message
    const formMessage = document.getElementById('formMessage');
    formMessage.style.display = 'block';

    // Reset form
    contactForm.reset();

    // Hide message after 3 seconds
    setTimeout(() => {
      formMessage.style.display = 'none';
    }, 3000);

    // Here you could add code to send the form data to a server
    console.log('Form submitted:', { name, email, phone, message });
  });
}
