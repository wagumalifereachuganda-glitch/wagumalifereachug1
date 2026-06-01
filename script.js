/* ===== HAMBURGER MENU FUNCTIONALITY ===== */
// Get hamburger button and navigation links from DOM
const hamburgerBtn = document.getElementById('hamburgerBtn');
const navLinks = document.getElementById('navLinks');

// Add click handler to hamburger button
if (hamburgerBtn) {
  hamburgerBtn.addEventListener('click', () => {
    // Toggle 'open' class on nav-links to show/hide menu
    navLinks.classList.toggle('open');
    // Update ARIA attribute for accessibility
    hamburgerBtn.setAttribute('aria-expanded', navLinks.classList.contains('open'));
  });
  
  // Close menu when a link is clicked
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      hamburgerBtn.setAttribute('aria-expanded', false);
    });
  });
}

/* ===== HERO CAROUSEL FUNCTIONALITY ===== */
// Get all carousel elements
const heroSlides = document.querySelectorAll('.hero-slide');
const heroDots = document.querySelectorAll('.hero-dot');
const heroPrevBtn = document.getElementById('heroPrev');
const heroNextBtn = document.getElementById('heroNext');

// Initialize carousel variables
let heroIndex = 0;
let heroInterval;

// Function to show a specific slide
function showHeroSlide(n) {
  // Remove 'active' class from all slides and dots
  heroSlides.forEach(slide => slide.classList.remove('active'));
  heroDots.forEach(dot => dot.classList.remove('active'));
  // Add 'active' class to current slide and dot
  heroSlides[n].classList.add('active');
  heroDots[n].classList.add('active');
}

// Function to move to next slide
function nextHeroSlide() {
  heroIndex = (heroIndex + 1) % heroSlides.length;
  showHeroSlide(heroIndex);
  resetHeroInterval();
}

// Function to move to previous slide
function prevHeroSlide() {
  heroIndex = (heroIndex - 1 + heroSlides.length) % heroSlides.length;
  showHeroSlide(heroIndex);
  resetHeroInterval();
}

// Function to reset the auto-rotate interval
function resetHeroInterval() {
  clearInterval(heroInterval);
  heroInterval = setInterval(nextHeroSlide, 5000);
}

// Add event listeners to carousel controls
if (heroPrevBtn && heroNextBtn) {
  heroPrevBtn.addEventListener('click', prevHeroSlide);
  heroNextBtn.addEventListener('click', nextHeroSlide);
  // Add click handlers to dots for direct slide selection
  heroDots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      heroIndex = i;
      showHeroSlide(i);
      resetHeroInterval();
    });
  });
  // Start auto-rotation (5 second interval)
  heroInterval = setInterval(nextHeroSlide, 5000);
}

/* ===== STATISTICS COUNTER ANIMATION ===== */
// Function to animate numbers when stats section comes into view
function animateCounter() {
  const statNums = document.querySelectorAll('.stat-num');
  statNums.forEach(num => {
    const target = parseInt(num.dataset.count);
    const duration = 2000; // Animation duration in milliseconds
    const start = 0;
    const increment = target / (duration / 16); // Calculate increment per frame
    let current = start;

    // Animation function using requestAnimationFrame
    const update = () => {
      current += increment;
      if (current >= target) {
        // Stop at target value
        num.textContent = target.toLocaleString();
      } else {
        // Update display with current value
        num.textContent = Math.floor(current).toLocaleString();
        // Continue animation
        requestAnimationFrame(update);
      }
    };
    update();
  });
}

// Intersection Observer to trigger counter when stats section is visible
const statsStrip = document.querySelector('.stats-strip');
if (statsStrip) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter();
        // Unobserve after animation starts
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  observer.observe(statsStrip);
}

/* ===== READ MORE FUNCTIONALITY ===== */
// Get read more button and hidden content
const readMoreBtn = document.getElementById('readMoreBtn');
const aboutMore = document.getElementById('aboutMore');
const readMoreText = document.getElementById('readMoreText');
const readMoreIcon = document.getElementById('readMoreIcon');

// Toggle read more/less content
if (readMoreBtn) {
  readMoreBtn.addEventListener('click', () => {
    const isShown = aboutMore.style.display === 'block';
    // Toggle display
    aboutMore.style.display = isShown ? 'none' : 'block';
    // Update button text
    readMoreText.textContent = isShown ? 'Read More' : 'Read Less';
    // Rotate arrow icon
    readMoreIcon.style.transform = isShown ? 'rotate(0deg)' : 'rotate(180deg)';
    readMoreIcon.style.transition = 'transform 0.3s ease';
  });
}

/* ===== SCROLL REVEAL ANIMATIONS ===== */
// Get all elements that should reveal on scroll
const revealElements = document.querySelectorAll('[data-reveal]');

// Intersection Observer for scroll animations
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Add 'revealed' class to trigger animation
      entry.target.classList.add('revealed');
      // Stop observing this element
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

// Start observing all reveal elements
revealElements.forEach(el => revealObserver.observe(el));

/* ===== BACK TO TOP BUTTON ===== */
const backTopBtn = document.getElementById('backTop');

if (backTopBtn) {
  // Show/hide button based on scroll position
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      backTopBtn.classList.add('visible');
    } else {
      backTopBtn.classList.remove('visible');
    }
  });

  // Smooth scroll to top when clicked
  backTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ===== ACTIVE NAVIGATION LINK ON SCROLL ===== */
// Get all navigation links
const navLinks_ = document.querySelectorAll('.nav-links a');

// Update active link as user scrolls
window.addEventListener('scroll', () => {
  let current = '';
  // Get all sections with IDs
  const sections = document.querySelectorAll('section, [id]');
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    // If section is in viewport, mark as current
    if (pageYOffset >= sectionTop - 200) {
      current = section.getAttribute('id');
    }
  });

  // Update active link styling
  navLinks_.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href').slice(1) === current) {
      link.classList.add('active');
    }
  });
});

/* ===== SMOOTH SCROLL FOR ANCHOR LINKS ===== */
// Add smooth scroll behavior to all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    // Only smooth scroll if target exists
    if (href !== '#' && document.querySelector(href)) {
      e.preventDefault();
      document.querySelector(href).scrollIntoView({
        behavior: 'smooth'
      });
    }
  });
});

/* ===== CONTACT FORM SUBMISSION HANDLING ===== */
// Get contact form element
const contactForm = document.getElementById('contactForm');

// Handle form submission (FormSubmit.co handles email automatically)
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    // Form will be submitted to FormSubmit.co
    // They handle sending emails to the configured recipients
    // This is handled automatically by the form action attribute
  });
}
