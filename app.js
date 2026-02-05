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
    initGallery();
    initLightbox();
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
 * Gallery Filter Functionality
 * - Filters gallery items by category
 * - Supports: All, Shampoos, Conditioners, Treatments
 * - Smooth fade animation on filter change
 */
function initGallery() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    if (!filterBtns.length || !galleryItems.length) return;
    
    // Add item count to filter buttons
    updateFilterCounts();
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const filter = btn.dataset.filter;
            
            // Filter items with animation
            galleryItems.forEach(item => {
                const category = item.dataset.category;
                
                if (filter === 'all' || category === filter) {
                    item.classList.remove('hidden');
                    item.style.animation = 'fadeIn 0.4s ease forwards';
                } else {
                    item.classList.add('hidden');
                }
            });
        });
    });
    
    // Add fadeIn animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from {
                opacity: 0;
                transform: scale(0.9);
            }
            to {
                opacity: 1;
                transform: scale(1);
            }
        }
        
        .filter-btn .count {
            display: inline-block;
            background: rgba(0, 0, 0, 0.1);
            padding: 0.1rem 0.5rem;
            border-radius: 10px;
            font-size: 0.75rem;
            margin-left: 0.25rem;
        }
        
        .filter-btn.active .count {
            background: rgba(255, 255, 255, 0.2);
        }
    `;
    document.head.appendChild(style);
    
    function updateFilterCounts() {
        filterBtns.forEach(btn => {
            const filter = btn.dataset.filter;
            let count;
            
            if (filter === 'all') {
                count = galleryItems.length;
            } else {
                count = Array.from(galleryItems).filter(item => item.dataset.category === filter).length;
            }
            
            // Add count badge if not exists
            if (!btn.querySelector('.count')) {
                btn.innerHTML += ` <span class="count">${count}</span>`;
            }
        });
    }
}

/**
 * Lightbox Functionality
 * - Opens on gallery image click
 * - Next/Prev navigation buttons
 * - Keyboard navigation (Left/Right arrows, Escape)
 */
function initLightbox() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    if (!galleryItems.length) return;
    
    let currentIndex = 0;
    const images = Array.from(galleryItems).map(item => {
        const img = item.querySelector('img');
        return {
            src: img.src,
            title: img.dataset.title || '',
            description: img.dataset.description || ''
        };
    });
    
    // Create lightbox HTML
    const lightboxHTML = `
        <div class="lightbox-overlay" id="lightbox">
            <button class="lightbox-close" aria-label="Close lightbox">&times;</button>
            <button class="lightbox-nav lightbox-prev" aria-label="Previous image">&#10094;</button>
            <button class="lightbox-nav lightbox-next" aria-label="Next image">&#10095;</button>
            <div class="lightbox-content">
                <img src="" alt="" class="lightbox-image">
                <div class="lightbox-info">
                    <h3 class="lightbox-title"></h3>
                    <p class="lightbox-description"></p>
                </div>
            </div>
            <div class="lightbox-counter">
                <span class="current">1</span> / <span class="total">${images.length}</span>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', lightboxHTML);
    
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = lightbox.querySelector('.lightbox-image');
    const lightboxTitle = lightbox.querySelector('.lightbox-title');
    const lightboxDescription = lightbox.querySelector('.lightbox-description');
    const lightboxCounter = lightbox.querySelector('.current');
    const closeBtn = lightbox.querySelector('.lightbox-close');
    const prevBtn = lightbox.querySelector('.lightbox-prev');
    const nextBtn = lightbox.querySelector('.lightbox-next');
    
    // Open lightbox
    function openLightbox(index) {
        currentIndex = index;
        updateLightbox();
        lightbox.classList.add('open');
        document.body.style.overflow = 'hidden';
    }
    
    // Close lightbox
    function closeLightbox() {
        lightbox.classList.remove('open');
        document.body.style.overflow = '';
    }
    
    // Update lightbox content
    function updateLightbox() {
        const visibleItems = Array.from(galleryItems).filter(item => !item.classList.contains('hidden'));
        const visibleImages = visibleItems.map(item => {
            const img = item.querySelector('img');
            return {
                src: img.src,
                title: img.dataset.title || '',
                description: img.dataset.description || ''
            };
        });
        
        // Adjust currentIndex if needed
        if (currentIndex >= visibleImages.length) currentIndex = 0;
        if (currentIndex < 0) currentIndex = visibleImages.length - 1;
        
        const image = visibleImages[currentIndex];
        lightboxImage.src = image.src;
        lightboxImage.alt = image.title;
        lightboxTitle.textContent = image.title;
        lightboxDescription.textContent = image.description;
        lightboxCounter.textContent = currentIndex + 1;
        lightbox.querySelector('.total').textContent = visibleImages.length;
    }
    
    // Navigate to previous image
    function prevImage() {
        const visibleItems = Array.from(galleryItems).filter(item => !item.classList.contains('hidden'));
        currentIndex = (currentIndex - 1 + visibleItems.length) % visibleItems.length;
        updateLightbox();
    }
    
    // Navigate to next image
    function nextImage() {
        const visibleItems = Array.from(galleryItems).filter(item => !item.classList.contains('hidden'));
        currentIndex = (currentIndex + 1) % visibleItems.length;
        updateLightbox();
    }
    
    // Event listeners for gallery items
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            // Get the index among visible items
            const visibleItems = Array.from(galleryItems).filter(i => !i.classList.contains('hidden'));
            const visibleIndex = visibleItems.indexOf(item);
            openLightbox(visibleIndex >= 0 ? visibleIndex : index);
        });
    });
    
    // Close button
    closeBtn.addEventListener('click', closeLightbox);
    
    // Navigation buttons
    prevBtn.addEventListener('click', prevImage);
    nextBtn.addEventListener('click', nextImage);
    
    // Click backdrop to close
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('open')) return;
        
        switch (e.key) {
            case 'Escape':
                closeLightbox();
                break;
            case 'ArrowLeft':
                prevImage();
                break;
            case 'ArrowRight':
                nextImage();
                break;
        }
    });
    
    // Add lightbox styles
    const style = document.createElement('style');
    style.textContent = `
        .lightbox-overlay {
            position: fixed;
            inset: 0;
            background: rgba(0, 0, 0, 0.95);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 3000;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
        }
        
        .lightbox-overlay.open {
            opacity: 1;
            visibility: visible;
        }
        
        .lightbox-content {
            max-width: 90%;
            max-height: 85vh;
            display: flex;
            flex-direction: column;
            align-items: center;
        }
        
        .lightbox-image {
            max-width: 100%;
            max-height: 70vh;
            object-fit: contain;
            border-radius: 8px;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
        }
        
        .lightbox-info {
            text-align: center;
            margin-top: 1.5rem;
            color: white;
        }
        
        .lightbox-title {
            font-family: var(--font-heading, Georgia, serif);
            font-size: 1.5rem;
            margin-bottom: 0.5rem;
        }
        
        .lightbox-description {
            color: rgba(255, 255, 255, 0.7);
            font-size: 0.95rem;
            max-width: 500px;
        }
        
        .lightbox-close {
            position: absolute;
            top: 1.5rem;
            right: 1.5rem;
            width: 50px;
            height: 50px;
            background: rgba(255, 255, 255, 0.1);
            border: none;
            border-radius: 50%;
            color: white;
            font-size: 2rem;
            cursor: pointer;
            transition: all 0.2s ease;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .lightbox-close:hover {
            background: rgba(255, 255, 255, 0.2);
            transform: scale(1.1);
        }
        
        .lightbox-nav {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            width: 50px;
            height: 50px;
            background: rgba(255, 255, 255, 0.1);
            border: none;
            border-radius: 50%;
            color: white;
            font-size: 1.25rem;
            cursor: pointer;
            transition: all 0.2s ease;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .lightbox-nav:hover {
            background: rgba(255, 255, 255, 0.2);
        }
        
        .lightbox-prev {
            left: 1.5rem;
        }
        
        .lightbox-next {
            right: 1.5rem;
        }
        
        .lightbox-counter {
            position: absolute;
            bottom: 1.5rem;
            left: 50%;
            transform: translateX(-50%);
            color: rgba(255, 255, 255, 0.7);
            font-size: 0.9rem;
        }
        
        @media (max-width: 768px) {
            .lightbox-nav {
                width: 40px;
                height: 40px;
                font-size: 1rem;
            }
            
            .lightbox-prev {
                left: 0.5rem;
            }
            
            .lightbox-next {
                right: 0.5rem;
            }
            
            .lightbox-title {
                font-size: 1.25rem;
            }
            
            .lightbox-description {
                font-size: 0.85rem;
                padding: 0 1rem;
            }
        }
    `;
    document.head.appendChild(style);
}
