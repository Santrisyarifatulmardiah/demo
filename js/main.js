// ========================================
// MAIN JAVASCRIPT
// ========================================

// DOM Elements
const navbar = document.getElementById('navbar');
const bottomNav = document.getElementById('bottomNav');
const bottomNavItems = document.querySelectorAll('.bottom-nav-item');
const faqItems = document.querySelectorAll('.faq-item');
const catalogToggleBtns = document.querySelectorAll('.catalog-toggle-btn');
const statNumbers = document.querySelectorAll('.stat-number');

// ========================================
// NAVBAR SCROLL EFFECT
// ========================================
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    // Add shadow on scroll
    if (currentScroll > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
});

// ========================================
// ACTIVE BOTTOM NAV LINK ON SCROLL
// ========================================
const sections = document.querySelectorAll('section[id]');

function activeBottomNavLink() {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const bottomNavItem = document.querySelector(`.bottom-nav-item[data-section="${sectionId}"]`);

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            bottomNavItems.forEach(item => item.classList.remove('active'));
            if (bottomNavItem) bottomNavItem.classList.add('active');
        }
    });
}

window.addEventListener('scroll', activeBottomNavLink);

// ========================================
// STATS COUNTER ANIMATION
// ========================================
let hasAnimated = false;

function animateStats() {
    if (hasAnimated) return;

    const statsSection = document.querySelector('.hero-stats');
    const rect = statsSection.getBoundingClientRect();
    const isVisible = rect.top < window.innerHeight && rect.bottom >= 0;

    if (isVisible) {
        hasAnimated = true;

        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target'));
            const duration = 2000; // 2 seconds
            const increment = target / (duration / 16); // 60fps
            let current = 0;

            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    stat.textContent = Math.floor(current).toLocaleString('id-ID');
                    requestAnimationFrame(updateCounter);
                } else {
                    stat.textContent = target.toLocaleString('id-ID');
                }
            };

            updateCounter();
        });
    }
}

window.addEventListener('scroll', animateStats);
window.addEventListener('load', animateStats);

// ========================================
// FAQ ACCORDION
// ========================================
faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');

    question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');

        // Close all FAQ items
        faqItems.forEach(faq => faq.classList.remove('active'));

        // Open clicked item if it wasn't active
        if (!isActive) {
            item.classList.add('active');
        }
    });
});

// ========================================
// CATALOG SYSTEM
// ========================================

// Current state
let currentCategory = 'wedding';
let currentSubcategory = {
    wedding: 'luxee',
    nonWedding: 'engagement'
};

// Initialize catalog
function initCatalog() {
    renderCatalog();
    setupCatalogToggles();
    setupCatalogTabs();
}

// Render catalog items
function renderCatalog() {
    const weddingGrid = document.getElementById('wedding-themes');
    const nonWeddingGrid = document.getElementById('non-wedding-themes');

    // Render wedding themes
    const weddingSubcat = currentSubcategory.wedding;
    const weddingThemes = catalogData.wedding[weddingSubcat];
    weddingGrid.innerHTML = renderThemes(weddingThemes);

    // Render non-wedding themes
    const nonWeddingSubcat = currentSubcategory.nonWedding;
    const nonWeddingThemes = catalogData.nonWedding[nonWeddingSubcat];
    nonWeddingGrid.innerHTML = renderThemes(nonWeddingThemes);
}

// Format price to Rupiah format (e.g., 150000 -> Rp 150.000)
function formatPrice(price) {
    return 'Rp ' + price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

// Render themes HTML
function renderThemes(themes) {
    return themes.map(theme => `
        <div class="catalog-item">
            <div class="catalog-item-image">
                <img src="${theme.image}" alt="${theme.name}" loading="lazy">
                <div class="catalog-item-overlay">
                    <a href="${theme.demo}" target="_blank" rel="noopener noreferrer">Lihat Demo</a>
                </div>
            </div>
            <div class="catalog-item-info">
                <h3 class="catalog-item-name">${theme.name}</h3>
                <div class="catalog-item-price">
                    <span class="catalog-item-price-original">${formatPrice(theme.priceOriginal)}</span>
                    <span class="catalog-item-price-current">${formatPrice(theme.priceCurrent)}</span>
                </div>
                <div class="catalog-item-buttons">
                    <a href="${theme.demo}" target="_blank" rel="noopener noreferrer" class="catalog-btn catalog-btn-demo">Demo</a>
                    <a href="https://wa.me/6281211114522?text=Halo,%20saya%20tertarik%20dengan%20tema%20${encodeURIComponent(theme.name)}" target="_blank" class="catalog-btn catalog-btn-order">Order</a>
                </div>
            </div>
        </div>
    `).join('');
}

// Setup catalog toggle buttons (Wedding / Non-Wedding)
function setupCatalogToggles() {
    catalogToggleBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const category = btn.getAttribute('data-category');

            // Update active state
            catalogToggleBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Show/hide catalog content
            document.querySelectorAll('.catalog-content').forEach(content => {
                content.classList.remove('active');
            });

            const targetContent = document.getElementById(`catalog-${category}`);
            if (targetContent) {
                targetContent.classList.add('active');
            }

            currentCategory = category;
        });
    });
}

// Setup catalog tabs (Luxee, Adat, Floral, etc.)
function setupCatalogTabs() {
    const allTabs = document.querySelectorAll('.catalog-tab');

    allTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const subcategory = tab.getAttribute('data-subcategory');
            const parentContent = tab.closest('.catalog-content');
            const isWedding = parentContent.id === 'catalog-wedding';

            // Update active tab within this catalog section
            const siblings = parentContent.querySelectorAll('.catalog-tab');
            siblings.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            // Update current subcategory
            if (isWedding) {
                currentSubcategory.wedding = subcategory;
                const themes = catalogData.wedding[subcategory];
                const grid = document.getElementById('wedding-themes');
                grid.innerHTML = renderThemes(themes);
            } else {
                currentSubcategory.nonWedding = subcategory;
                const themes = catalogData.nonWedding[subcategory];
                const grid = document.getElementById('non-wedding-themes');
                grid.innerHTML = renderThemes(themes);
            }

            // Smooth scroll animation
            const grid = isWedding ?
                document.getElementById('wedding-themes') :
                document.getElementById('non-wedding-themes');

            grid.style.opacity = '0';
            grid.style.transform = 'translateY(20px)';

            setTimeout(() => {
                grid.style.transition = 'all 0.5s ease';
                grid.style.opacity = '1';
                grid.style.transform = 'translateY(0)';
            }, 50);
        });
    });
}

// ========================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');

        // Ignore empty hash or javascript:void(0)
        if (href === '#' || href === '#!') return;

        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            const offsetTop = target.offsetTop - 80; // Account for fixed navbar

            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ========================================
// LAZY LOADING IMAGES
// ========================================
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                observer.unobserve(img);
            }
        });
    });

    // Observe all images with data-src attribute
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ========================================
// PREVENT LAYOUT SHIFT
// ========================================
window.addEventListener('load', () => {
    // Force layout recalculation after all resources loaded
    document.body.style.visibility = 'visible';
});

// ========================================
// PERFORMANCE: Debounce scroll events
// ========================================
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounce to scroll-heavy functions
const debouncedActiveBottomNavLink = debounce(activeBottomNavLink, 100);
const debouncedAnimateStats = debounce(animateStats, 100);

window.removeEventListener('scroll', activeBottomNavLink);
window.removeEventListener('scroll', animateStats);
window.addEventListener('scroll', debouncedActiveBottomNavLink);
window.addEventListener('scroll', debouncedAnimateStats);

// ========================================
// ACCESSIBILITY: Keyboard navigation
// ========================================
document.addEventListener('keydown', (e) => {
    // Close active FAQ on Escape
    if (e.key === 'Escape') {
        faqItems.forEach(item => item.classList.remove('active'));
    }
});

// ========================================
// FORM VALIDATION (if needed in future)
// ========================================
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePhone(phone) {
    const re = /^[\d\s\-\+\(\)]+$/;
    return re.test(phone);
}

// ========================================
// TESTIMONIALS SLIDER
// ========================================
let currentTestimonial = 0;
const testimonials = document.querySelectorAll('.testimonial-slide');
const testimonialsTrack = document.querySelector('.testimonials-track');
const testimonialsPrev = document.querySelector('.testimonials-nav-prev');
const testimonialsNext = document.querySelector('.testimonials-nav-next');
const testimonialsDotsContainer = document.querySelector('.testimonials-dots');

function initTestimonialsSlider() {
    // Create dots
    testimonials.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('testimonial-dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToTestimonial(index));
        testimonialsDotsContainer.appendChild(dot);
    });

    // Add event listeners
    testimonialsPrev.addEventListener('click', previousTestimonial);
    testimonialsNext.addEventListener('click', nextTestimonial);

    // Auto play
    setInterval(nextTestimonial, 5000);
}

function updateTestimonialSlider() {
    testimonialsTrack.style.transform = `translateX(-${currentTestimonial * 100}%)`;

    // Update dots
    document.querySelectorAll('.testimonial-dot').forEach((dot, index) => {
        dot.classList.toggle('active', index === currentTestimonial);
    });
}

function nextTestimonial() {
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    updateTestimonialSlider();
}

function previousTestimonial() {
    currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
    updateTestimonialSlider();
}

function goToTestimonial(index) {
    currentTestimonial = index;
    updateTestimonialSlider();
}

// ========================================
// INITIALIZE ON DOM READY
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    initCatalog();
    initTestimonialsSlider();
    console.log('S2Moments - Landing Page Loaded Successfully! 🎉');
});

// ========================================
// UTILITY FUNCTIONS
// ========================================

// Format number with thousands separator
function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

// Get current year for footer
function updateYear() {
    const yearElements = document.querySelectorAll('.current-year');
    const currentYear = new Date().getFullYear();
    yearElements.forEach(el => {
        el.textContent = currentYear;
    });
}

// Check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// ========================================
// ANALYTICS & TRACKING (Optional)
// ========================================

// Track button clicks
function trackButtonClick(buttonName) {
    console.log(`Button clicked: ${buttonName}`);
    // Add your analytics code here (Google Analytics, Facebook Pixel, etc.)
}

// Track catalog item views
function trackCatalogView(themeName) {
    console.log(`Catalog viewed: ${themeName}`);
    // Add your analytics code here
}

// Add click tracking to CTA buttons
document.querySelectorAll('.btn-primary, .btn-whatsapp').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const btnText = e.target.textContent.trim();
        trackButtonClick(btnText);
    });
});

// ========================================
// ERROR HANDLING
// ========================================
window.addEventListener('error', (e) => {
    console.error('Error occurred:', e.error);
    // You can add error reporting service here (Sentry, LogRocket, etc.)
});

// ========================================
// OFFLINE DETECTION
// ========================================
window.addEventListener('online', () => {
    console.log('Connection restored');
});

window.addEventListener('offline', () => {
    console.log('Connection lost');
    // You can show a notification to the user
});

// ========================================
// PRELOAD CRITICAL RESOURCES
// ========================================
function preloadImage(url) {
    const img = new Image();
    img.src = url;
}

// Preload hero image and logo
window.addEventListener('load', () => {
    // Preload critical images for better performance
    const criticalImages = [
        'https://s2moments.id/wp-content/uploads/2025/11/logo.png',
        'https://s2moments.id/wp-content/uploads/2025/11/Momenta-1.png'
    ];

    criticalImages.forEach(url => preloadImage(url));
});

// ========================================
// PROGRESSIVE WEB APP SUPPORT (Optional)
// ========================================
if ('serviceWorker' in navigator) {
    // Uncomment below to enable service worker
    // window.addEventListener('load', () => {
    //     navigator.serviceWorker.register('/sw.js')
    //         .then(registration => console.log('SW registered:', registration))
    //         .catch(error => console.log('SW registration failed:', error));
    // });
}

// ========================================
// iOS SAFARI FIXES
// ========================================
// Fix for iOS Safari viewport height issue
function setVHProperty() {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}

setVHProperty();
window.addEventListener('resize', debounce(setVHProperty, 100));

// Prevent zoom on iOS double tap
let lastTouchEnd = 0;
document.addEventListener('touchend', (e) => {
    const now = Date.now();
    if (now - lastTouchEnd <= 300) {
        e.preventDefault();
    }
    lastTouchEnd = now;
}, false);

// ========================================
// EXPORT FOR TESTING (Optional)
// ========================================
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        validateEmail,
        validatePhone,
        formatNumber,
        isInViewport
    };
}
