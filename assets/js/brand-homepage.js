/*
 * Novus Brand Homepage JavaScript
 * Interactive elements and animations
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS animations
    AOS.init({
        duration: 1000,
        easing: 'ease-in-out',
        once: true,
        mirror: false
    });

    // Preloader
    setTimeout(function() {
        const preloader = document.querySelector('.preloader');
        preloader.classList.add('fade-out');
    }, 1500);

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    
    // Check scroll position on page load
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    }
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Dropdown hover functionality for desktop
    const dropdowns = document.querySelectorAll('.dropdown');
    
    function handleDropdownHover() {
        if (window.innerWidth >= 992) { // Only on desktop
            dropdowns.forEach(dropdown => {
                dropdown.addEventListener('mouseenter', function() {
                    this.querySelector('.dropdown-toggle').click();
                });
                
                dropdown.addEventListener('mouseleave', function() {
                    this.querySelector('.dropdown-toggle').click();
                });
            });
        }
    }
    
    // Initialize dropdown hover
    handleDropdownHover();
    
    // Reinitialize on window resize
    window.addEventListener('resize', handleDropdownHover);
    
    // Initialize Services Tabs
    initServicesTabs();

// Initialize Services Tabs
function initServicesTabs() {
    // Set the first tab as active by default
    const firstTab = document.querySelector('.service-tab');
    const firstContent = document.querySelector('.service-content');
    if (firstTab) firstTab.classList.add('active');
    if (firstContent) firstContent.classList.add('active');
    
    // Tab click event
    document.querySelectorAll('.service-tab').forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs and contents
            document.querySelectorAll('.service-tab').forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.service-content').forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Get the target content ID
            const targetContent = this.dataset.target;
            
            // Show the corresponding content
            const content = document.getElementById(targetContent);
            if (content) {
                content.classList.add('active');
                // Add animation to images
                animateServiceImages('#' + targetContent);
            }
        });
    });
    
    // Animate images of the first active tab on page load
    animateServiceImages('.service-content.active');
}

// Animate service images with staggered effect
function animateServiceImages(container) {
    const images = document.querySelectorAll(container + ' .stack-image');
    
    // Reset all animations first
    images.forEach(img => {
        img.style.opacity = '0';
        img.style.transform = 'translateY(30px)';
    });
    
    // Animate each image with delay
    images.forEach((img, index) => {
        const delay = 200 * (index + 1);
        
        setTimeout(() => {
            img.style.opacity = '1';
            img.style.transform = index === 0 ? 'rotate(3deg)' : 
                                 index === 1 ? 'rotate(-5deg)' : 'rotate(8deg)';
        }, delay);
    });
}

    // Back to top button
    const backToTopButton = document.querySelector('.back-to-top');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopButton.classList.add('active');
        } else {
            backToTopButton.classList.remove('active');
        }
    });

    backToTopButton.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            e.preventDefault();
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Portfolio filtering
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
                if (filterValue === 'all' || item.classList.contains(filterValue)) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // Testimonials slider (simple implementation)
    const testimonialItems = document.querySelectorAll('.testimonial-item');
    let currentIndex = 0;

    // Auto-scroll testimonials on mobile
    if (window.innerWidth < 768) {
        setInterval(() => {
            const slider = document.querySelector('.testimonials-slider');
            currentIndex = (currentIndex + 1) % testimonialItems.length;
            const scrollPosition = testimonialItems[currentIndex].offsetLeft;
            slider.scrollTo({
                left: scrollPosition,
                behavior: 'smooth'
            });
        }, 5000);
    }

    // Publishing platforms slider functionality
    const platformsSlider = document.querySelector('.platforms-slider');
    const sliderDots = document.querySelector('.slider-dots');
    const prevArrow = document.querySelector('.prev-arrow');
    const nextArrow = document.querySelector('.next-arrow');
    const platformItems = document.querySelectorAll('.platform-item');
    
    // Create dots based on number of visible items
    const itemWidth = 280 + 25; // item width + gap
    const visibleItems = Math.floor(platformsSlider.offsetWidth / itemWidth);
    const totalSlides = Math.ceil(platformItems.length / visibleItems);
    
    // Create dots
    for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('div');
        dot.classList.add('slider-dot');
        if (i === 0) dot.classList.add('active');
        dot.dataset.index = i;
        sliderDots.appendChild(dot);
        
        // Add click event to dots
        dot.addEventListener('click', () => {
            const scrollPosition = i * visibleItems * itemWidth;
            platformsSlider.scrollTo({
                left: scrollPosition,
                behavior: 'smooth'
            });
            
            // Update active dot
            document.querySelectorAll('.slider-dot').forEach(d => d.classList.remove('active'));
            dot.classList.add('active');
        });
    }
    
    // Arrow navigation
    let currentSlide = 0;
    
    prevArrow.addEventListener('click', () => {
        if (currentSlide > 0) {
            currentSlide--;
            scrollToSlide(currentSlide);
        }
    });
    
    nextArrow.addEventListener('click', () => {
        if (currentSlide < totalSlides - 1) {
            currentSlide++;
            scrollToSlide(currentSlide);
        }
    });
    
    function scrollToSlide(index) {
        const scrollPosition = index * visibleItems * itemWidth;
        platformsSlider.scrollTo({
            left: scrollPosition,
            behavior: 'smooth'
        });
        
        // Update active dot
        document.querySelectorAll('.slider-dot').forEach(d => d.classList.remove('active'));
        document.querySelector(`.slider-dot[data-index="${index}"]`).classList.add('active');
    }
    
    // Update active dot on scroll
    platformsSlider.addEventListener('scroll', () => {
        const scrollPosition = platformsSlider.scrollLeft;
        const activeIndex = Math.round(scrollPosition / (visibleItems * itemWidth));
        
        if (activeIndex !== currentSlide) {
            currentSlide = activeIndex;
            document.querySelectorAll('.slider-dot').forEach(d => d.classList.remove('active'));
            const activeDot = document.querySelector(`.slider-dot[data-index="${activeIndex}"]`);
            if (activeDot) activeDot.classList.add('active');
        }
    });
    
    // Add hover animations to platform items
    platformItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.1}s`;
        item.classList.add('animate__fadeIn');
    });

    // Navbar mobile menu toggle
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');

    navbarToggler.addEventListener('click', function() {
        if (navbarCollapse.classList.contains('show')) {
            navbarCollapse.style.height = navbarCollapse.offsetHeight + 'px';
            setTimeout(() => {
                navbarCollapse.style.height = '0px';
                setTimeout(() => {
                    navbarCollapse.classList.remove('show');
                    navbarCollapse.style.height = '';
                }, 300);
            }, 10);
        } else {
            navbarCollapse.classList.add('show');
            const height = navbarCollapse.offsetHeight;
            navbarCollapse.style.height = '0px';
            setTimeout(() => {
                navbarCollapse.style.height = height + 'px';
                setTimeout(() => {
                    navbarCollapse.style.height = '';
                }, 300);
            }, 10);
        }
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navbarCollapse.contains(e.target) && !navbarToggler.contains(e.target) && navbarCollapse.classList.contains('show')) {
            navbarToggler.click();
        }
    });

    // Add hover effect to service cards
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        const heroSection = document.querySelector('.hero-section');
        const heroShape = document.querySelector('.hero-shape');
        
        if (heroShape && scrollPosition < heroSection.offsetHeight) {
            heroShape.style.transform = `translateY(${scrollPosition * 0.2}px)`;
        }
    });

    // Counter animation for stats
    const statItems = document.querySelectorAll('.stat-item h3');
    const animateCounter = (element, target) => {
        let current = 0;
        const increment = target / 100;
        const timer = setInterval(() => {
            current += increment;
            element.textContent = Math.floor(current) + (element.textContent.includes('%') ? '%' : '+');
            if (current >= target) {
                element.textContent = target + (element.textContent.includes('%') ? '%' : '+');
                clearInterval(timer);
            }
        }, 10);
    };

    // Intersection Observer for counter animation
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.textContent);
                animateCounter(entry.target, target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    statItems.forEach(item => {
        const value = parseInt(item.textContent);
        item.textContent = '0' + (item.textContent.includes('%') ? '%' : '+');
        observer.observe(item);
    });
});