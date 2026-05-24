// ==================== INITIALIZATION ====================
document.addEventListener('DOMContentLoaded', () => {
    initPreloader();
    initLucideIcons();
    initNavigation();
    initTypingAnimation();
    initScrollAnimations();
    initParticles();
    initSkillBars();
    initProjectFilter();
    initTestimonialsSlider();
    initCountUp();
    initContactForm();
    initCustomCursor();
    initSmoothScroll();
    initLazyImages();
    initTouchTrail();
});

// ==================== PRELOADER ====================
function initPreloader() {
    const preloader = document.getElementById('preloader');
    if (!preloader) return;
    
    const hidePreloader = () => {
        preloader.classList.add('loaded');
        setTimeout(() => {
            if (preloader.parentNode) {
                preloader.remove();
            }
        }, 600);
    };

    if (document.readyState === 'complete') {
        hidePreloader();
    } else {
        window.addEventListener('load', hidePreloader);
    }
    
    // Fallback — remove after 4 seconds max
    setTimeout(() => {
        if (preloader && preloader.parentNode) {
            hidePreloader();
        }
    }, 4000);
}

// ==================== LUCIDE ICONS ====================
function initLucideIcons() {
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}

// ==================== NAVIGATION ====================
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    const navLinksAll = document.querySelectorAll('.nav-link');

    // Scroll effect
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        if (currentScroll > lastScroll && currentScroll > 200) {
            navbar.classList.add('nav-hidden');
        } else {
            navbar.classList.remove('nav-hidden');
        }
        lastScroll = currentScroll;
    });

    // Hamburger toggle
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    });

    // Close menu on link click
    navLinksAll.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.classList.remove('menu-open');
        });
    });

    // Close menu on click outside
    document.addEventListener('click', (e) => {
        if (document.body.classList.contains('menu-open')) {
            if (!navLinks.contains(e.target) && !hamburger.contains(e.target)) {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
        }
    });

    // Active link highlighting
    const sections = document.querySelectorAll('section[id]');
    window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset + 100;
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const link = document.querySelector(`.nav-link[href="#${sectionId}"]`);
            if (link) {
                if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                    link.classList.add('active');
                } else {
                    link.classList.remove('active');
                }
            }
        });
    });
}

// ==================== TYPING ANIMATION ====================
function initTypingAnimation() {
    const typingElement = document.getElementById('typingText');
    const phrases = [
        'Ethical Hacker',
        'Penetration Tester',
        'Bug Bounty Hunter',
        'Security Researcher',
        'Red Team Operator',
        'Cyber Defender'
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 80;

    function type() {
        const currentPhrase = phrases[phraseIndex];
        
        if (isDeleting) {
            typingElement.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 40;
        } else {
            typingElement.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 80;
        }

        if (!isDeleting && charIndex === currentPhrase.length) {
            typeSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typeSpeed = 500;
        }

        setTimeout(type, typeSpeed);
    }

    type();
}

// ==================== SCROLL REVEAL ANIMATIONS ====================
function initScrollAnimations() {
    const revealElements = document.querySelectorAll('.reveal');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => observer.observe(el));
}

// ==================== HERO PARTICLES ====================
function initParticles() {
    const canvas = document.getElementById('heroParticles');
    if (!canvas) return;
    
    const container = canvas.parentElement;
    const cvs = document.createElement('canvas');
    cvs.style.position = 'absolute';
    cvs.style.top = '0';
    cvs.style.left = '0';
    cvs.style.width = '100%';
    cvs.style.height = '100%';
    cvs.style.pointerEvents = 'none';
    canvas.appendChild(cvs);
    
    const ctx = cvs.getContext('2d');
    let particles = [];
    let animFrameId;

    function resize() {
        cvs.width = container.offsetWidth;
        cvs.height = container.offsetHeight;
    }

    function createParticle() {
        return {
            x: Math.random() * cvs.width,
            y: Math.random() * cvs.height,
            size: Math.random() * 2 + 0.5,
            speedX: (Math.random() - 0.5) * 0.5,
            speedY: (Math.random() - 0.5) * 0.5,
            opacity: Math.random() * 0.5 + 0.1,
            color: Math.random() > 0.7 ? '#d4a017' : '#ffffff'
        };
    }

    function init() {
        resize();
        particles = [];
        const count = Math.min(80, Math.floor(cvs.width * cvs.height / 15000));
        for (let i = 0; i < count; i++) {
            particles.push(createParticle());
        }
    }

    function drawParticles() {
        ctx.clearRect(0, 0, cvs.width, cvs.height);
        
        particles.forEach((p, i) => {
            p.x += p.speedX;
            p.y += p.speedY;

            if (p.x < 0 || p.x > cvs.width) p.speedX *= -1;
            if (p.y < 0 || p.y > cvs.height) p.speedY *= -1;

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.globalAlpha = p.opacity;
            ctx.fill();

            // Draw connections
            for (let j = i + 1; j < particles.length; j++) {
                const dx = p.x - particles[j].x;
                const dy = p.y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                
                if (dist < 120) {
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = '#d4a017';
                    ctx.globalAlpha = (1 - dist / 120) * 0.15;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }
        });
        
        ctx.globalAlpha = 1;
        animFrameId = requestAnimationFrame(drawParticles);
    }

    window.addEventListener('resize', () => {
        cancelAnimationFrame(animFrameId);
        init();
        drawParticles();
    });

    init();
    drawParticles();
}

// ==================== SKILL BARS ANIMATION ====================
function initSkillBars() {
    const skillFills = document.querySelectorAll('.skill-fill');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const width = entry.target.getAttribute('data-width');
                entry.target.style.width = width + '%';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    skillFills.forEach(fill => observer.observe(fill));
}

// ==================== PROJECT FILTER ====================
function initProjectFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    card.style.display = '';
                    card.style.animation = 'fade-in 0.5s ease forwards';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

// ==================== TESTIMONIALS SLIDER ====================
function initTestimonialsSlider() {
    const track = document.getElementById('testimonialsTrack');
    const prevBtn = document.getElementById('sliderPrev');
    const nextBtn = document.getElementById('sliderNext');
    const dotsContainer = document.getElementById('sliderDots');
    
    if (!track) return;

    const cards = track.querySelectorAll('.testimonial-card');
    let currentIndex = 0;
    let cardsPerView = getCardsPerView();

    function getCardsPerView() {
        if (window.innerWidth <= 768) return 1;
        if (window.innerWidth <= 1024) return 2;
        return 2;
    }

    function getTotalSlides() {
        return Math.max(1, cards.length - cardsPerView + 1);
    }

    function createDots() {
        dotsContainer.innerHTML = '';
        const totalSlides = getTotalSlides();
        for (let i = 0; i < totalSlides; i++) {
            const dot = document.createElement('button');
            dot.classList.add('slider-dot');
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(i));
            dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
            dotsContainer.appendChild(dot);
        }
    }

    function updateSlider() {
        const cardWidth = cards[0].offsetWidth;
        const gap = 32;
        const offset = currentIndex * (cardWidth + gap);
        track.style.transform = `translateX(-${offset}px)`;

        document.querySelectorAll('.slider-dot').forEach((dot, i) => {
            dot.classList.toggle('active', i === currentIndex);
        });
    }

    function goToSlide(index) {
        currentIndex = Math.max(0, Math.min(index, getTotalSlides() - 1));
        updateSlider();
    }

    prevBtn.addEventListener('click', () => goToSlide(currentIndex - 1));
    nextBtn.addEventListener('click', () => goToSlide(currentIndex + 1));

    // Auto-slide
    let autoSlide = setInterval(() => {
        currentIndex = (currentIndex + 1) % getTotalSlides();
        updateSlider();
    }, 5000);

    track.parentElement.addEventListener('mouseenter', () => clearInterval(autoSlide));
    track.parentElement.addEventListener('mouseleave', () => {
        autoSlide = setInterval(() => {
            currentIndex = (currentIndex + 1) % getTotalSlides();
            updateSlider();
        }, 5000);
    });

    // Touch/swipe support
    let touchStartX = 0;
    let touchEndX = 0;
    track.addEventListener('touchstart', (e) => { touchStartX = e.changedTouches[0].screenX; }, { passive: true });
    track.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        const diff = touchStartX - touchEndX;
        if (Math.abs(diff) > 50) {
            diff > 0 ? goToSlide(currentIndex + 1) : goToSlide(currentIndex - 1);
        }
    });

    window.addEventListener('resize', () => {
        cardsPerView = getCardsPerView();
        createDots();
        goToSlide(Math.min(currentIndex, getTotalSlides() - 1));
    });

    createDots();
    updateSlider();
}

// ==================== COUNT UP ANIMATION ====================
function initCountUp() {
    const counters = document.querySelectorAll('[data-count]');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-count'));
                const duration = 2000;
                const start = performance.now();

                function update(currentTime) {
                    const elapsed = currentTime - start;
                    const progress = Math.min(elapsed / duration, 1);
                    const eased = 1 - Math.pow(1 - progress, 3);
                    const current = Math.floor(eased * target);
                    entry.target.textContent = current;

                    if (progress < 1) {
                        requestAnimationFrame(update);
                    } else {
                        entry.target.textContent = target;
                    }
                }

                requestAnimationFrame(update);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));
}

// ==================== CONTACT FORM ====================
function initContactForm() {
    const form = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const btnText = submitBtn.querySelector('span');
        const originalText = btnText.textContent;
        
        // Gather form data
        const formData = {
            name: form.querySelector('#name').value.trim(),
            email: form.querySelector('#email').value.trim(),
            subject: form.querySelector('#subject').value.trim(),
            message: form.querySelector('#message').value.trim(),
        };

        // Basic client-side validation
        if (!formData.name || !formData.email || !formData.subject || !formData.message) {
            showToast('Please fill in all fields.', 'error');
            return;
        }

        // Update button state
        submitBtn.disabled = true;
        btnText.textContent = 'Sending...';
        submitBtn.classList.add('sending');

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (data.success) {
                btnText.textContent = 'Sent Successfully! ✓';
                submitBtn.classList.remove('sending');
                submitBtn.classList.add('sent');
                showToast(data.message, 'success');
                form.reset();

                // Reset button after delay
                setTimeout(() => {
                    btnText.textContent = originalText;
                    submitBtn.disabled = false;
                    submitBtn.classList.remove('sent');
                }, 4000);
            } else {
                throw new Error(data.message || 'Failed to send message.');
            }
        } catch (error) {
            btnText.textContent = originalText;
            submitBtn.disabled = false;
            submitBtn.classList.remove('sending');
            showToast(error.message || 'Something went wrong. Please try again.', 'error');
        }
    });

    // Input focus animations
    const inputs = form.querySelectorAll('.form-input');
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });
        input.addEventListener('blur', () => {
            if (!input.value) {
                input.parentElement.classList.remove('focused');
            }
        });
    });

    // Newsletter form
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const input = newsletterForm.querySelector('.newsletter-input');
            const email = input.value.trim();

            if (!email) return;

            try {
                const response = await fetch('/api/newsletter', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email }),
                });

                const data = await response.json();

                if (data.success) {
                    input.value = '';
                    input.placeholder = 'Subscribed! ✓';
                    showToast(data.message, 'success');
                } else {
                    throw new Error(data.message);
                }
            } catch (error) {
                showToast(error.message || 'Subscription failed. Please try again.', 'error');
            }

            setTimeout(() => {
                input.placeholder = 'Your email';
            }, 4000);
        });
    }
}

// ==================== TOAST NOTIFICATION ====================
function showToast(message, type = 'info') {
    // Remove existing toasts
    const existing = document.querySelector('.toast-notification');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = `toast-notification toast-${type}`;
    toast.innerHTML = `
        <span class="toast-icon">${type === 'success' ? '✅' : type === 'error' ? '❌' : 'ℹ️'}</span>
        <span class="toast-message">${message}</span>
    `;

    // Style the toast
    Object.assign(toast.style, {
        position: 'fixed',
        bottom: '2rem',
        right: '2rem',
        padding: '1rem 1.5rem',
        background: type === 'success' ? 'rgba(74, 222, 128, 0.15)' : 
                     type === 'error' ? 'rgba(239, 68, 68, 0.15)' : 'rgba(212, 160, 23, 0.15)',
        border: `1px solid ${type === 'success' ? 'rgba(74, 222, 128, 0.3)' : 
                              type === 'error' ? 'rgba(239, 68, 68, 0.3)' : 'rgba(212, 160, 23, 0.3)'}`,
        borderRadius: '12px',
        color: '#e0e0e0',
        fontSize: '0.9rem',
        fontFamily: "'Inter', sans-serif",
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        zIndex: '10000',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
        transform: 'translateY(20px)',
        opacity: '0',
        transition: 'transform 0.4s cubic-bezier(0.22, 0.61, 0.36, 1), opacity 0.4s ease',
        maxWidth: '400px',
    });

    document.body.appendChild(toast);

    // Animate in
    requestAnimationFrame(() => {
        toast.style.transform = 'translateY(0)';
        toast.style.opacity = '1';
    });

    // Auto-remove
    setTimeout(() => {
        toast.style.transform = 'translateY(20px)';
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 400);
    }, 5000);
}

// ==================== CUSTOM CURSOR ====================
function initCustomCursor() {
    const cursor = document.getElementById('cursor');
    const follower = document.getElementById('cursorFollower');
    
    if (!cursor || !follower) return;
    
    // Only show custom cursor on desktop
    if (window.innerWidth < 1024) {
        cursor.style.display = 'none';
        follower.style.display = 'none';
        return;
    }

    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursor.style.left = mouseX + 'px';
        cursor.style.top = mouseY + 'px';
    });

    function animateFollower() {
        followerX += (mouseX - followerX) * 0.1;
        followerY += (mouseY - followerY) * 0.1;
        follower.style.left = followerX + 'px';
        follower.style.top = followerY + 'px';
        requestAnimationFrame(animateFollower);
    }
    animateFollower();

    // Hover effects
    const hoverElements = document.querySelectorAll('a, button, .project-card, .skill-category, .blog-card');
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('cursor-hover');
            follower.classList.add('cursor-hover');
        });
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('cursor-hover');
            follower.classList.remove('cursor-hover');
        });
    });
}

// ==================== SMOOTH SCROLL ====================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                const navHeight = document.getElementById('navbar').offsetHeight;
                const targetPosition = target.offsetTop - navHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Back to top
    const backToTop = document.getElementById('backToTop');
    if (backToTop) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 500) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        });
    }
}

// ==================== MATRIX RAIN EFFECT (SUBTLE BG) ====================
(function initMatrixRain() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    const matrixCanvas = document.createElement('canvas');
    matrixCanvas.style.position = 'absolute';
    matrixCanvas.style.top = '0';
    matrixCanvas.style.left = '0';
    matrixCanvas.style.width = '100%';
    matrixCanvas.style.height = '100%';
    matrixCanvas.style.opacity = '0.03';
    matrixCanvas.style.pointerEvents = 'none';
    matrixCanvas.style.zIndex = '0';
    hero.insertBefore(matrixCanvas, hero.firstChild);

    const mCtx = matrixCanvas.getContext('2d');
    const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    let columns;
    let drops;

    function resizeMatrix() {
        matrixCanvas.width = hero.offsetWidth;
        matrixCanvas.height = hero.offsetHeight;
        const fontSize = 14;
        columns = Math.floor(matrixCanvas.width / fontSize);
        drops = new Array(columns).fill(1);
    }

    function drawMatrix() {
        mCtx.fillStyle = 'rgba(10, 10, 15, 0.05)';
        mCtx.fillRect(0, 0, matrixCanvas.width, matrixCanvas.height);
        mCtx.fillStyle = '#d4a017';
        mCtx.font = '14px JetBrains Mono, monospace';

        for (let i = 0; i < drops.length; i++) {
            const text = chars[Math.floor(Math.random() * chars.length)];
            mCtx.fillText(text, i * 14, drops[i] * 14);
            if (drops[i] * 14 > matrixCanvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
        requestAnimationFrame(drawMatrix);
    }

    resizeMatrix();
    drawMatrix();
    window.addEventListener('resize', resizeMatrix);
})();

// ==================== LAZY IMAGE LOADING ====================
function initLazyImages() {
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    lazyImages.forEach(img => {
        if (img.complete) {
            img.classList.add('loaded');
        } else {
            img.addEventListener('load', () => img.classList.add('loaded'));
            img.addEventListener('error', () => img.classList.add('loaded'));
        }
    });
}

// ==================== TOUCH TRAIL ANIMATION ====================
function initTouchTrail() {
    // Only run on touch devices
    if (!('ontouchstart' in window) && !navigator.maxTouchPoints) return;

    let lastSparkTime = 0;

    function createSpark(x, y) {
        const now = Date.now();
        if (now - lastSparkTime < 30) return; // limit spark creation
        lastSparkTime = now;

        const spark = document.createElement('div');
        spark.className = 'touch-spark';
        spark.style.left = x + 'px';
        spark.style.top = y + 'px';
        document.body.appendChild(spark);

        setTimeout(() => {
            spark.remove();
        }, 500);
    }

    document.addEventListener('touchmove', (e) => {
        for(let i=0; i<e.touches.length; i++) {
            createSpark(e.touches[i].clientX, e.touches[i].clientY);
        }
    }, { passive: true });

    document.addEventListener('touchstart', (e) => {
        for(let i=0; i<e.touches.length; i++) {
            createSpark(e.touches[i].clientX, e.touches[i].clientY);
        }
    }, { passive: true });
}
