/**
 * Luxe Hair - Landing Page JavaScript
 * Handles interactivity and animations
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    initSmoothScroll();
    initNewsletterForm();
    initScrollAnimations();
    initNavbarScroll();
    initActiveSectionHighlight();
    initCTAModal();
});

/**
 * Mobile Menu Toggle
 */
function initMobileMenu() {
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (!menuBtn || !navLinks) return;
    
    menuBtn.addEventListener('click', () => {
        menuBtn.classList.toggle('active');
        navLinks.classList.toggle('mobile-open');
        
        // Toggle aria-expanded for accessibility
        const isExpanded = navLinks.classList.contains('mobile-open');
        menuBtn.setAttribute('aria-expanded', isExpanded);
    });
    
    // Close menu when clicking on a link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            menuBtn.classList.remove('active');
            navLinks.classList.remove('mobile-open');
        });
    });
}

/**
 * Smooth Scroll for Anchor Links
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.offsetTop - navHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Newsletter Form Handler
 */
function initNewsletterForm() {
    const form = document.getElementById('newsletter-form');
    
    if (!form) return;
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const emailInput = form.querySelector('input[type="email"]');
        const email = emailInput.value.trim();
        
        if (validateEmail(email)) {
            // Simulate form submission
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Subscribing...';
            submitBtn.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                submitBtn.textContent = 'Subscribed! ✓';
                emailInput.value = '';
                
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                }, 2000);
            }, 1000);
        } else {
            // Show error state
            emailInput.classList.add('error');
            emailInput.focus();
            
            setTimeout(() => {
                emailInput.classList.remove('error');
            }, 2000);
        }
    });
}

/**
 * Email Validation Helper
 */
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Scroll-triggered Animations
 */
function initScrollAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Elements to animate on scroll
    const animateElements = document.querySelectorAll(
        '.product-card, .benefit-card, .testimonial-card, .pricing-card, .section-header'
    );
    
    animateElements.forEach(el => {
        el.classList.add('animate-on-scroll');
        observer.observe(el);
    });
    
    // Add CSS for scroll animations
    const style = document.createElement('style');
    style.textContent = `
        .animate-on-scroll {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .animate-on-scroll.animate-in {
            opacity: 1;
            transform: translateY(0);
        }
        
        /* Stagger animation for grid items */
        .products-grid .product-card:nth-child(1) { transition-delay: 0s; }
        .products-grid .product-card:nth-child(2) { transition-delay: 0.1s; }
        .products-grid .product-card:nth-child(3) { transition-delay: 0.2s; }
        .products-grid .product-card:nth-child(4) { transition-delay: 0.3s; }
        
        .benefits-grid .benefit-card:nth-child(1) { transition-delay: 0s; }
        .benefits-grid .benefit-card:nth-child(2) { transition-delay: 0.1s; }
        .benefits-grid .benefit-card:nth-child(3) { transition-delay: 0.2s; }
        .benefits-grid .benefit-card:nth-child(4) { transition-delay: 0.3s; }
        
        .testimonials-slider .testimonial-card:nth-child(1) { transition-delay: 0s; }
        .testimonials-slider .testimonial-card:nth-child(2) { transition-delay: 0.15s; }
        .testimonials-slider .testimonial-card:nth-child(3) { transition-delay: 0.3s; }
        
        .pricing-grid .pricing-card:nth-child(1) { transition-delay: 0s; }
        .pricing-grid .pricing-card:nth-child(2) { transition-delay: 0.15s; }
        .pricing-grid .pricing-card:nth-child(3) { transition-delay: 0.3s; }
        
        /* Newsletter form error state */
        .newsletter-form input.error {
            outline: 2px solid #e74c3c;
            animation: shake 0.4s ease;
        }
        
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            20%, 60% { transform: translateX(-5px); }
            40%, 80% { transform: translateX(5px); }
        }
        
        /* Mobile menu styles */
        @media (max-width: 768px) {
            .nav-links.mobile-open {
                display: flex;
                flex-direction: column;
                position: absolute;
                top: 100%;
                left: 0;
                right: 0;
                background: rgba(253, 251, 247, 0.98);
                padding: 1.5rem;
                gap: 1rem;
                border-bottom: 1px solid rgba(139, 105, 20, 0.1);
                animation: slideDown 0.3s ease;
            }
            
            @keyframes slideDown {
                from {
                    opacity: 0;
                    transform: translateY(-10px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            
            .mobile-menu-btn.active span:nth-child(1) {
                transform: rotate(45deg) translate(5px, 5px);
            }
            
            .mobile-menu-btn.active span:nth-child(2) {
                opacity: 0;
            }
            
            .mobile-menu-btn.active span:nth-child(3) {
                transform: rotate(-45deg) translate(5px, -5px);
            }
        }
    `;
    document.head.appendChild(style);
}

/**
 * Navbar Scroll Effect
 */
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        // Add shadow on scroll
        if (currentScroll > 50) {
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.08)';
        } else {
            navbar.style.boxShadow = 'none';
        }
        
        lastScroll = currentScroll;
    });
}

/**
 * Add to Cart Handler (placeholder)
 */
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function() {
        const originalText = this.textContent;
        this.textContent = 'Added! ✓';
        this.style.background = '#27ae60';
        
        setTimeout(() => {
            this.textContent = originalText;
            this.style.background = '';
        }, 1500);
    });
});

/**
 * Active Section Highlight in Navbar
 */
function initActiveSectionHighlight() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
    
    function highlightActiveSection() {
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', highlightActiveSection);
    highlightActiveSection(); // Run on load
    
    // Add active link styles
    const style = document.createElement('style');
    style.textContent = `
        .nav-links a.active {
            color: var(--color-primary);
            font-weight: 500;
        }
        
        .nav-links a.active::after {
            width: 100%;
        }
    `;
    document.head.appendChild(style);
}

/**
 * CTA Modal Functionality
 * - Opens on "Get Started" and "Shop Now" clicks
 * - Closes via: close button, backdrop click, Escape key
 * - Includes form with name and email fields
 */
function initCTAModal() {
    // Create modal HTML dynamically
    const modalHTML = `
        <div class="modal-overlay" id="cta-modal">
            <div class="modal-content">
                <button class="modal-close" aria-label="Close modal">&times;</button>
                <div class="modal-header">
                    <h2>Get Started Today</h2>
                    <p>Join thousands of happy customers with beautiful, healthy hair.</p>
                </div>
                <form class="modal-form" id="cta-form">
                    <div class="form-group">
                        <label for="modal-name">Full Name *</label>
                        <input type="text" id="modal-name" name="name" placeholder="Enter your name" required>
                        <span class="error-message"></span>
                    </div>
                    <div class="form-group">
                        <label for="modal-email">Email Address *</label>
                        <input type="email" id="modal-email" name="email" placeholder="Enter your email" required>
                        <span class="error-message"></span>
                    </div>
                    <button type="submit" class="btn btn-primary modal-submit">Start Your Journey</button>
                </form>
                <p class="modal-footer-text">No spam, ever. Unsubscribe anytime.</p>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    const modal = document.getElementById('cta-modal');
    const modalContent = modal.querySelector('.modal-content');
    const closeBtn = modal.querySelector('.modal-close');
    const form = document.getElementById('cta-form');
    
    // Open modal triggers (all "Get Started" and "Shop Now" buttons)
    const ctaTriggers = document.querySelectorAll('.nav-cta, .pricing-btn, .hero-buttons .btn-primary');
    
    ctaTriggers.forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            openModal();
        });
    });
    
    // Open modal function
    function openModal() {
        modal.classList.add('open');
        document.body.style.overflow = 'hidden';
        // Focus first input for accessibility
        setTimeout(() => {
            document.getElementById('modal-name').focus();
        }, 100);
    }
    
    // Close modal function
    function closeModal() {
        modal.classList.remove('open');
        document.body.style.overflow = '';
        form.reset();
        clearErrors();
    }
    
    // Close with close button
    closeBtn.addEventListener('click', closeModal);
    
    // Close when clicking backdrop
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Close with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('open')) {
            closeModal();
        }
    });
    
    // Form validation and submission
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const nameInput = document.getElementById('modal-name');
        const emailInput = document.getElementById('modal-email');
        let isValid = true;
        
        clearErrors();
        
        // Validate name
        if (nameInput.value.trim().length < 2) {
            showError(nameInput, 'Please enter a valid name (at least 2 characters)');
            isValid = false;
        }
        
        // Validate email
        if (!validateEmail(emailInput.value.trim())) {
            showError(emailInput, 'Please enter a valid email address');
            isValid = false;
        }
        
        if (isValid) {
            const submitBtn = form.querySelector('.modal-submit');
            submitBtn.textContent = 'Submitting...';
            submitBtn.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                submitBtn.textContent = 'Welcome! ✓';
                setTimeout(() => {
                    closeModal();
                    submitBtn.textContent = 'Start Your Journey';
                    submitBtn.disabled = false;
                }, 1500);
            }, 1000);
        }
    });
    
    // Helper functions
    function showError(input, message) {
        const formGroup = input.closest('.form-group');
        formGroup.classList.add('has-error');
        formGroup.querySelector('.error-message').textContent = message;
    }
    
    function clearErrors() {
        form.querySelectorAll('.form-group').forEach(group => {
            group.classList.remove('has-error');
            group.querySelector('.error-message').textContent = '';
        });
    }
    
    // Add modal styles
    const style = document.createElement('style');
    style.textContent = `
        .modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.6);
            backdrop-filter: blur(4px);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 2000;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            padding: 1rem;
        }
        
        .modal-overlay.open {
            opacity: 1;
            visibility: visible;
        }
        
        .modal-content {
            background: var(--color-white, #fff);
            border-radius: 16px;
            padding: 2.5rem;
            max-width: 450px;
            width: 100%;
            position: relative;
            transform: translateY(20px) scale(0.95);
            transition: transform 0.3s ease;
            box-shadow: 0 25px 50px rgba(0, 0, 0, 0.2);
        }
        
        .modal-overlay.open .modal-content {
            transform: translateY(0) scale(1);
        }
        
        .modal-close {
            position: absolute;
            top: 1rem;
            right: 1rem;
            width: 36px;
            height: 36px;
            border-radius: 50%;
            background: var(--color-background-alt, #f5f5f5);
            border: none;
            font-size: 1.5rem;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.2s ease;
            color: var(--color-text, #333);
        }
        
        .modal-close:hover {
            background: var(--color-secondary, #1a1a1a);
            color: white;
        }
        
        .modal-header {
            text-align: center;
            margin-bottom: 2rem;
        }
        
        .modal-header h2 {
            font-family: var(--font-heading, Georgia, serif);
            font-size: 1.75rem;
            color: var(--color-secondary, #1a1a1a);
            margin-bottom: 0.5rem;
        }
        
        .modal-header p {
            color: var(--color-text-light, #666);
            font-size: 0.95rem;
        }
        
        .modal-form {
            display: flex;
            flex-direction: column;
            gap: 1.25rem;
        }
        
        .form-group {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
        }
        
        .form-group label {
            font-size: 0.9rem;
            font-weight: 500;
            color: var(--color-text, #333);
        }
        
        .form-group input {
            padding: 0.875rem 1rem;
            border: 2px solid var(--color-background-alt, #e5e5e5);
            border-radius: 8px;
            font-size: 1rem;
            transition: all 0.2s ease;
            font-family: inherit;
        }
        
        .form-group input:focus {
            outline: none;
            border-color: var(--color-primary, #8B6914);
            box-shadow: 0 0 0 3px rgba(139, 105, 20, 0.1);
        }
        
        .form-group.has-error input {
            border-color: #e74c3c;
        }
        
        .error-message {
            font-size: 0.8rem;
            color: #e74c3c;
            min-height: 1rem;
        }
        
        .modal-submit {
            margin-top: 0.5rem;
            padding: 1rem;
            font-size: 1rem;
        }
        
        .modal-footer-text {
            text-align: center;
            font-size: 0.8rem;
            color: var(--color-text-light, #666);
            margin-top: 1rem;
        }
        
        @media (max-width: 480px) {
            .modal-content {
                padding: 1.5rem;
            }
            
            .modal-header h2 {
                font-size: 1.5rem;
            }
        }
    `;
    document.head.appendChild(style);
}
