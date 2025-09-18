// Website JavaScript functionality
document.addEventListener('DOMContentLoaded', function() {
    // Industry selection popup removed - no longer needed
    // showIndustrySelection();
    
    function showIndustrySelection() {
        // Create modal overlay
        const overlay = document.createElement('div');
        overlay.className = 'industry-overlay';
        
        // Create modal content
        const modal = document.createElement('div');
        modal.className = 'industry-modal';
        
        modal.innerHTML = `
            <div class="industry-header">
                <h3>Select Your Industry</h3>
            </div>
            <div class="industry-options">
                <button class="industry-btn" data-industry="automotive">
                    <span>Automotive</span>
                </button>
                <button class="industry-btn" data-industry="b2b">
                    <span>B2B</span>
                </button>
            </div>
        `;
        
        overlay.appendChild(modal);
        document.body.appendChild(overlay);
        
        // Add blur to background
        document.body.style.overflow = 'hidden';
        
        // No blur - keep background sharp
        // const elementsToBlur = document.querySelectorAll('nav, section, footer');
        // elementsToBlur.forEach(element => {
        //     element.style.filter = 'blur(2px)';
        //     element.style.transition = 'filter 0.3s ease';
        // });
        
        // Add event listeners
        const industryButtons = modal.querySelectorAll('.industry-btn');
        industryButtons.forEach(button => {
            button.addEventListener('click', function() {
                const industry = this.getAttribute('data-industry');
                console.log('Industry selected:', industry);
                
                // Remove modal and restore scroll
                document.body.style.overflow = '';
                
                // No blur cleanup needed since we're not blurring
                // const elementsToBlur = document.querySelectorAll('nav, section, footer');
                // elementsToBlur.forEach(element => {
                //     element.style.filter = '';
                // });
                
                if (overlay && overlay.parentNode) {
                    overlay.parentNode.removeChild(overlay);
                }
                
                // Store selection for future use
                localStorage.setItem('selectedIndustry', industry);
            });
        });
    }
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

    // Activate button handler - direct to lead form
    const activateButtons = document.querySelectorAll('.btn-primary.activate, .card-cta');
    activateButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Add click animation
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
            
            // Show lead capture form directly
            showLeadCaptureForm();
        });
    });

    // Other button click handlers
    const otherButtons = document.querySelectorAll('.btn-primary:not(.activate), .btn-secondary, .btn-nav-demo');
    otherButtons.forEach(button => {
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
            } else if (buttonText.includes('call')) {
                console.log('Book call button clicked');
                // In real implementation, open calendar booking
            }
        });
    });

    // Warning popup function
    function showActivationWarning() {
        // Create modal overlay
        const overlay = document.createElement('div');
        overlay.className = 'warning-overlay';
        
        // Create modal content
        const modal = document.createElement('div');
        modal.className = 'warning-modal';
        
        modal.innerHTML = `
            <div class="warning-header">
                <i class="fas fa-exclamation-triangle"></i>
                <h3>Warning</h3>
            </div>
            <div class="warning-content">
                <p>Deploy AI BDC swarm now?</p>
            </div>
            <div class="warning-actions">
                <button class="btn-warning-no">Cancel</button>
                <button class="btn-warning-yes">Activate</button>
            </div>
        `;
        
        overlay.appendChild(modal);
        document.body.appendChild(overlay);
        
        // Add event listeners
        const noBtn = modal.querySelector('.btn-warning-no');
        const yesBtn = modal.querySelector('.btn-warning-yes');
        
        noBtn.addEventListener('click', function() {
            closeWarningModal();
        });
        
        yesBtn.addEventListener('click', function() {
            // Transform the existing modal to show the form
            transformToLeadForm(modal);
        });
        
        // Close on overlay click
        overlay.addEventListener('click', function(e) {
            if (e.target === overlay) {
                closeWarningModal();
            }
        });
        
        // Close on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                closeWarningModal();
            }
        });
        
        function closeWarningModal() {
            if (overlay && overlay.parentNode) {
                overlay.parentNode.removeChild(overlay);
            }
        }

        // Transform modal to lead form
        function transformToLeadForm(modal) {
            modal.innerHTML = `
                <div class="form-header">
                    <h3>Activate Your AI BDC-Swarm</h3>
                    <p>Enter your details to get started</p>
                </div>
                <form class="lead-capture-form" id="leadForm">
                    <div class="form-field">
                        <label for="fullName">Full Name</label>
                        <input type="text" id="fullName" name="fullName" required>
                    </div>
                    <div class="form-field">
                        <label for="phone">Phone</label>
                        <input type="tel" id="phone" name="phone" required>
                    </div>
                    <div class="form-field">
                        <label for="title">Title</label>
                        <input type="text" id="title" name="title" required>
                    </div>
                    <div class="form-field">
                        <label for="website">Dealership Website</label>
                        <input type="url" id="website" name="website" required>
                    </div>
                    <div class="form-actions">
                        <button type="button" class="btn-form-cancel">Cancel</button>
                        <button type="submit" class="btn-form-submit">Activate Swarm</button>
                    </div>
                </form>
            `;
            
            // Update modal class for form styling
            modal.className = 'form-modal';
            
            // Add event listeners to new elements
            const cancelBtn = modal.querySelector('.btn-form-cancel');
            const form = modal.querySelector('#leadForm');
            
            cancelBtn.addEventListener('click', function() {
                closeWarningModal();
            });
            
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Collect form data
                const formData = new FormData(form);
                const leadData = {
                    fullName: formData.get('fullName'),
                    phone: formData.get('phone'),
                    title: formData.get('title'),
                    website: formData.get('website')
                };
                
                console.log('Lead captured:', leadData);
                
                // Transform to success message
                transformToSuccess(modal, leadData.fullName);
            });
            
            // Focus first field
            setTimeout(() => {
                const firstField = modal.querySelector('#fullName');
                if (firstField) firstField.focus();
            }, 50);
        }

        // Transform modal to success message
        function transformToSuccess(modal, name) {
            modal.innerHTML = `
                <div class="success-content">
                    <i class="fas fa-check-circle"></i>
                    <h3>Welcome to the Future, ${name}!</h3>
                    <p>Your AI BDC-swarm is being prepared.</p>
                    <p>We'll contact you within 24 hours to complete activation.</p>
                    <button class="btn-success-close">Continue</button>
                </div>
            `;
            
            // Update modal styling
            modal.className = 'success-modal';
            
            const closeBtn = modal.querySelector('.btn-success-close');
            closeBtn.addEventListener('click', function() {
                closeWarningModal();
            });
            
            // Auto-close after 5 seconds
            setTimeout(() => {
                closeWarningModal();
            }, 5000);
        }
    }

    // Lead capture form function
    function showLeadCaptureForm() {
        // Create modal overlay
        const overlay = document.createElement('div');
        overlay.className = 'form-overlay';
        
        // Create modal content
        const modal = document.createElement('div');
        modal.className = 'form-modal';
        
        modal.innerHTML = `
            <div class="form-header">
                <h3>Activate Your AI BDC-Swarm</h3>
                <p>Enter your details to get started</p>
            </div>
            <form class="lead-capture-form" id="leadForm">
                <div class="form-field">
                    <label for="fullName">Full Name</label>
                    <input type="text" id="fullName" name="fullName" required>
                </div>
                <div class="form-field">
                    <label for="phone">Phone</label>
                    <input type="tel" id="phone" name="phone" required>
                </div>
                <div class="form-field">
                    <label for="title">Title</label>
                    <input type="text" id="title" name="title" required>
                </div>
                <div class="form-field">
                    <label for="website">Dealership Website</label>
                    <input type="url" id="website" name="website" required>
                </div>
                <div class="form-actions">
                    <button type="button" class="btn-form-cancel">Cancel</button>
                    <button type="submit" class="btn-form-submit">Activate Swarm</button>
                </div>
            </form>
        `;
        
        overlay.appendChild(modal);
        document.body.appendChild(overlay);
        
        // Add event listeners
        const cancelBtn = modal.querySelector('.btn-form-cancel');
        const form = modal.querySelector('#leadForm');
        
        cancelBtn.addEventListener('click', function() {
            closeFormModal();
        });
        
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Collect form data
            const formData = new FormData(form);
            const leadData = {
                fullName: formData.get('fullName'),
                phone: formData.get('phone'),
                title: formData.get('title'),
                website: formData.get('website')
            };
            
            console.log('Lead captured:', leadData);
            
            // Show success message
            showSuccessMessage(leadData.fullName);
            closeFormModal();
        });
        
        // Close on overlay click
        overlay.addEventListener('click', function(e) {
            if (e.target === overlay) {
                closeFormModal();
            }
        });
        
        // Close on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                closeFormModal();
            }
        });
        
        function closeFormModal() {
            if (overlay && overlay.parentNode) {
                overlay.parentNode.removeChild(overlay);
            }
        }
        
        // Focus first field
        setTimeout(() => {
            const firstField = modal.querySelector('#fullName');
            if (firstField) firstField.focus();
        }, 100);
    }

    // Success message function
    function showSuccessMessage(name) {
        const overlay = document.createElement('div');
        overlay.className = 'success-overlay';
        
        const modal = document.createElement('div');
        modal.className = 'success-modal';
        
        modal.innerHTML = `
            <div class="success-content">
                <i class="fas fa-check-circle"></i>
                <h3>Welcome to the Future, ${name}!</h3>
                <p>Your AI BDC-swarm is being prepared.</p>
                <p>We'll contact you within 24 hours to complete activation.</p>
                <button class="btn-success-close">Continue</button>
            </div>
        `;
        
        overlay.appendChild(modal);
        document.body.appendChild(overlay);
        
        const closeBtn = modal.querySelector('.btn-success-close');
        closeBtn.addEventListener('click', function() {
            if (overlay && overlay.parentNode) {
                overlay.parentNode.removeChild(overlay);
            }
        });
        
        // Auto-close after 5 seconds
        setTimeout(() => {
            if (overlay && overlay.parentNode) {
                overlay.parentNode.removeChild(overlay);
            }
        }, 5000);
    }

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

// Features section interactivity - REMOVED (using grid layout now)
/*
const featureCards = document.querySelectorAll('.feature-card');
const featureContents = document.querySelectorAll('.feature-content');
    
    console.log('Features JavaScript loaded!');
    console.log('Found feature cards:', featureCards.length);
    console.log('Found feature contents:', featureContents.length);

    if (featureCards.length > 0 && featureContents.length > 0) {
        featureCards.forEach((card, index) => {
            console.log(`Card ${index}:`, card.getAttribute('data-feature'));
            
            card.addEventListener('click', function(e) {
                e.preventDefault();
                const featureId = this.getAttribute('data-feature');
                console.log('Clicked card with data-feature:', featureId);
                
                // Remove active from all cards and contents
                featureCards.forEach(c => c.classList.remove('active'));
                featureContents.forEach(c => c.classList.remove('active'));
                
                // Add active to clicked card
                this.classList.add('active');
                
                // Find and activate corresponding content
                const targetContent = document.getElementById(featureId);
                if (targetContent) {
                    targetContent.classList.add('active');
                    console.log('Activated content:', featureId);
                } else {
                    console.error('Could not find content with ID:', featureId);
                }
            });
            
            // Also add hover functionality
            card.addEventListener('mouseenter', function() {
                const featureId = this.getAttribute('data-feature');
                
                // Remove active from all cards and contents
                featureCards.forEach(c => c.classList.remove('active'));
                featureContents.forEach(c => c.classList.remove('active'));
                
                // Add active to hovered card
                this.classList.add('active');
                
                // Find and activate corresponding content
                const targetContent = document.getElementById(featureId);
                if (targetContent) {
                    targetContent.classList.add('active');
                }
            });
        });
    } else {
        console.error('Feature cards or contents not found!');
    }
*/

    console.log('Take-Next website loaded successfully!');
});
