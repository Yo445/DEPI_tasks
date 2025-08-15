// Portfolio Filter
document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');

            const filterValue = this.getAttribute('data-filter');

            portfolioItems.forEach(item => {
                if (filterValue === 'all') {
                    item.style.display = 'block';
                } else {
                    const itemCategories = item.getAttribute('data-category');
                    if (itemCategories && itemCategories.includes(filterValue)) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                }
            });
        });
    });

    // Pricing Toggle
    const toggleButtons = document.querySelectorAll('.toggle-btn');

    toggleButtons.forEach(button => {
        button.addEventListener('click', function() {
            toggleButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Mobile menu toggle (basic functionality)
    const navToggle = document.createElement('button');
    navToggle.innerHTML = '<i class="fas fa-bars"></i>';
    navToggle.className = 'nav-toggle';
    navToggle.style.cssText = `
        display: none;
        background: none;
        border: none;
        font-size: 24px;
        color: #333;
        cursor: pointer;
        @media (max-width: 768px) {
            display: block;
        }
    `;

    const header = document.querySelector('.header .container');
    const nav = document.querySelector('.nav');

    header.insertBefore(navToggle, nav);

    navToggle.addEventListener('click', function() {
        nav.style.display = nav.style.display === 'none' ? 'block' : 'none';
    });

    // Add mobile styles
    const style = document.createElement('style');
    style.textContent = `
        @media (max-width: 768px) {
            .nav-toggle {
                display: block !important;
            }
            .nav {
                display: none;
                position: absolute;
                top: 100%;
                left: 0;
                right: 0;
                background: white;
                box-shadow: 0 2px 10px rgba(0,0,0,0.1);
                padding: 20px;
            }
            .nav.active {
                display: block;
            }
            .nav ul {
                flex-direction: column;
                gap: 15px;
            }
        }
    `;
    document.head.appendChild(style);

    // Counter animation (simple version)
    const counters = document.querySelectorAll('.stat-content h3');
    const animateCounters = () => {
        counters.forEach(counter => {
            const target = parseInt(counter.textContent);
            const increment = target / 100;
            let current = 0;

            const updateCounter = () => {
                if (current < target) {
                    current += increment;
                    counter.textContent = Math.ceil(current);
                    setTimeout(updateCounter, 20);
                } else {
                    counter.textContent = target;
                }
            };

            updateCounter();
        });
    };

    // Trigger counter animation when stats section is in view
    const statsSection = document.querySelector('.stats');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                observer.unobserve(statsSection);
            }
        });
    });

    if (statsSection) {
        observer.observe(statsSection);
    }

    // Hero slider functionality (basic)
    let currentSlide = 0;
    const heroNavItems = document.querySelectorAll('.hero-nav-item');
    const heroTitles = [
        "What You Do Today For Peoples?",
        "What You Do Today For Peoples1",
        "What You Do Today For Peoples2"
    ];

    heroNavItems.forEach((item, index) => {
        item.addEventListener('click', function() {
            heroNavItems.forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');

            const heroTitle = document.querySelector('.hero-content h1');
            if (heroTitle) {
                heroTitle.textContent = heroTitles[index];
            }
            currentSlide = index;
        });
    });

    // Auto-play hero slider
    setInterval(() => {
        currentSlide = (currentSlide + 1) % heroNavItems.length;
        heroNavItems.forEach(nav => nav.classList.remove('active'));
        heroNavItems[currentSlide].classList.add('active');

        const heroTitle = document.querySelector('.hero-content h1');
        if (heroTitle) {
            heroTitle.textContent = heroTitles[currentSlide];
        }
    }, 5000);

    // Testimonial navigation
    const testimonialNavBtns = document.querySelectorAll('.nav-btn');
    const testimonials = document.querySelectorAll('.testimonial');

    testimonialNavBtns.forEach((btn, index) => {
        btn.addEventListener('click', function() {
            testimonialNavBtns.forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');

            // You can add testimonial switching logic here
        });
    });

    // Newsletter form submission
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('.email-input').value;
            if (email) {
                alert('Thank you for subscribing!');
                this.querySelector('.email-input').value = '';
            }
        });
    }

    // Add click event to newsletter button
    const subscribeBtn = document.querySelector('.newsletter-form .btn');
    if (subscribeBtn) {
        subscribeBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const email = document.querySelector('.email-input').value;
            if (email) {
                alert('Thank you for subscribing!');
                document.querySelector('.email-input').value = '';
            } else {
                alert('Please enter your email address.');
            }
        });
    }
});
