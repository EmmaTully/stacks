// Website JavaScript functionality
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Navbar background on scroll - disabled for dark mode
    // const navbar = document.querySelector('.navbar');
    // window.addEventListener('scroll', function() {
    //     // Disabled - using CSS !important for consistent dark background
    // });

    // Dashboard preview interaction
    const dashboardPreview = document.querySelector('.dashboard-preview');
    if (dashboardPreview) {
        dashboardPreview.addEventListener('mouseenter', function() {
            this.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg) scale(1.02)';
        });

        dashboardPreview.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateY(-5deg) rotateX(5deg) scale(1)';
        });
    }

    // Demo overlay click handler
    const demoOverlay = document.querySelector('.demo-overlay');
    if (demoOverlay) {
        demoOverlay.addEventListener('click', function() {
            // Hide overlay and show iframe
            this.style.opacity = '0';
            setTimeout(() => {
                this.style.display = 'none';
            }, 300);
            
            console.log('Demo video would start playing');
            // In a real implementation, you'd start the video here
        });
    }

    // Animated counters for stats
    const animateCounter = (element, target, duration = 2000) => {
        const start = 0;
        const increment = target / (duration / 16);
        let current = start;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            
            if (element.textContent.includes('K')) {
                element.textContent = Math.floor(current) + 'K+';
            } else if (element.textContent.includes('x')) {
                element.textContent = Math.floor(current) + 'x';
            } else if (element.textContent.includes('%')) {
                element.textContent = Math.floor(current) + '%';
            } else if (element.textContent.includes('/')) {
                element.textContent = '24/7';
            } else {
                element.textContent = Math.floor(current);
            }
        }, 16);
    };

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                
                // Animate stat numbers
                if (element.classList.contains('stat-number')) {
                    const text = element.textContent;
                    if (text.includes('50K')) {
                        animateCounter(element, 50);
                    } else if (text.includes('3x')) {
                        animateCounter(element, 3);
                    } else if (text.includes('85%')) {
                        animateCounter(element, 85);
                    } else if (text.includes('75K')) {
                        animateCounter(element, 75);
                    }
                }
                
                // Add animation classes
                if (element.classList.contains('solution-feature')) {
                    element.style.opacity = '0';
                    element.style.transform = 'translateY(30px)';
                    element.style.transition = 'all 0.6s ease';
                    
                    setTimeout(() => {
                        element.style.opacity = '1';
                        element.style.transform = 'translateY(0)';
                    }, 100);
                }
                
                if (element.classList.contains('testimonial')) {
                    element.style.opacity = '0';
                    element.style.transform = 'translateX(-30px)';
                    element.style.transition = 'all 0.6s ease';
                    
                    setTimeout(() => {
                        element.style.opacity = '1';
                        element.style.transform = 'translateX(0)';
                    }, 100);
                }
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.stat-number, .solution-feature, .testimonial').forEach(el => {
        observer.observe(el);
    });

    // Button click handlers
    const primaryButtons = document.querySelectorAll('.btn-primary');
    primaryButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Add click animation
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
            
            const buttonText = this.textContent.toLowerCase();
            
            if (buttonText.includes('demo')) {
                console.log('Demo button clicked');
                // In real implementation, open demo modal or redirect
            } else if (buttonText.includes('trial') || buttonText.includes('started')) {
                console.log('Start trial button clicked');
                // In real implementation, redirect to signup
            } else if (buttonText.includes('call')) {
                console.log('Book call button clicked');
                // In real implementation, open calendar booking
            }
        });
    });

    // Pricing card hover effects
    const pricingCards = document.querySelectorAll('.pricing-card');
    pricingCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            if (!this.classList.contains('featured')) {
                this.style.transform = 'translateY(-8px)';
                this.style.boxShadow = '0 20px 60px rgba(0, 0, 0, 0.15)';
            }
        });

        card.addEventListener('mouseleave', function() {
            if (!this.classList.contains('featured')) {
                this.style.transform = 'translateY(0)';
                this.style.boxShadow = 'none';
            }
        });
    });

    // Conversation preview interactions
    const conversationPreviews = document.querySelectorAll('.conversation-preview');
    conversationPreviews.forEach(preview => {
        preview.addEventListener('click', function() {
            // Remove active class from all previews
            conversationPreviews.forEach(p => p.classList.remove('active'));
            // Add active class to clicked preview
            this.classList.add('active');
            
            console.log('Conversation selected:', this.querySelector('.name').textContent);
        });
    });

    // Add floating animation to hero elements
    const floatingElements = document.querySelectorAll('.hero-badge, .dashboard-preview');
    floatingElements.forEach(element => {
        element.style.animation = 'float 6s ease-in-out infinite';
    });

    // Add CSS for floating animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
        }
        
        .solution-feature:hover .feature-icon {
            transform: scale(1.1) rotate(5deg);
            transition: transform 0.3s ease;
        }
        
        .testimonial:hover {
            transform: translateY(-4px);
            box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
        }
        
        .btn-primary:active {
            transform: scale(0.95);
        }
        
        .btn-secondary:active {
            transform: scale(0.95);
        }
    `;
    document.head.appendChild(style);

    // Form handling (placeholder for actual implementation)
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            console.log('Form submitted:', new FormData(this));
            // In real implementation, handle form submission
        });
    });

    // Mobile menu toggle (if needed)
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            const navLinks = document.querySelector('.nav-links');
            navLinks.classList.toggle('mobile-open');
        });
    }

    // Keyboard navigation support
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            // Close any open modals or overlays
            const overlay = document.querySelector('.demo-overlay');
            if (overlay && overlay.style.display !== 'none') {
                overlay.click();
            }
        }
    });

    // Performance optimization: Lazy load images
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));

    console.log('Take-Next website loaded successfully!');
});
