document.addEventListener('DOMContentLoaded', () => {

    // ============================================================
    // 0. ENTRY ANIMATION PRELOADER DISMISSAL
    // ============================================================
    const preloader = document.getElementById('entry-preloader');
    if (preloader) {
        setTimeout(() => {
            preloader.classList.add('loaded');
        }, 1200);
    }

    // ============================================================
    // 1. CUSTOM DESKTOP CURSOR INTERACTION
    // ============================================================
    const cursor = document.getElementById('custom-cursor');

    if (cursor && window.innerWidth > 1024) {
        window.addEventListener('mousemove', (e) => {
            cursor.style.left = `${e.clientX}px`;
            cursor.style.top = `${e.clientY}px`;
        });

        const hoverables = document.querySelectorAll('a, button, .btn, .radial-menu-btn, .radial-item, input, select, textarea');
        hoverables.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.classList.add('hovered');
            });
            el.addEventListener('mouseleave', () => {
                cursor.classList.remove('hovered');
            });
        });

        const serviceCards = document.querySelectorAll('.service-card-2d, .service-item-card');
        serviceCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                cursor.classList.add('service-hover');
                cursor.textContent = 'VIEW';
            });
            card.addEventListener('mouseleave', () => {
                cursor.classList.remove('service-hover');
                cursor.textContent = '';
            });
        });
    }

    // ============================================================
    // 2. RADIAL INTERACTIVE NAVIGATION CONTROLLER
    // ============================================================
    const navHeader = document.getElementById('radial-nav-header');
    const menuBtn = document.getElementById('radial-menu-btn');
    const menuOverlay = document.getElementById('radial-menu-overlay');
    const menuBackdrop = document.getElementById('radial-menu-backdrop');
    let isMenuOpen = false;
    let isHoverPreviewing = false;

    // Scroll Behavior: shrink button on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            if (navHeader) navHeader.classList.add('scrolled');
        } else {
            if (navHeader) navHeader.classList.remove('scrolled');
        }
    });

    function openRadialMenu() {
        isMenuOpen = true;
        if (menuBtn) {
            menuBtn.classList.add('active');
            menuBtn.setAttribute('aria-expanded', 'true');
        }
        if (menuOverlay) {
            menuOverlay.classList.add('active');
            menuOverlay.setAttribute('aria-hidden', 'false');
        }
    }

    function closeRadialMenu() {
        isMenuOpen = false;
        isHoverPreviewing = false;
        if (menuBtn) {
            menuBtn.classList.remove('active');
            menuBtn.setAttribute('aria-expanded', 'false');
        }
        if (menuOverlay) {
            menuOverlay.classList.remove('active');
            menuOverlay.setAttribute('aria-hidden', 'true');
        }
    }

    function toggleRadialMenu() {
        if (isMenuOpen) {
            closeRadialMenu();
        } else {
            openRadialMenu();
        }
    }

    if (menuBtn) {
        // Click to lock open/close
        menuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleRadialMenu();
        });

        // Hover preview on desktop
        if (window.innerWidth > 1024) {
            menuBtn.addEventListener('mouseenter', () => {
                if (!isMenuOpen) {
                    isHoverPreviewing = true;
                    openRadialMenu();
                }
            });
        }
    }

    // Close menu when mouse leaves overlay during hover preview
    if (menuOverlay && window.innerWidth > 1024) {
        menuOverlay.addEventListener('mouseleave', () => {
            if (isHoverPreviewing && !isMenuOpen) {
                closeRadialMenu();
            }
        });
    }

    if (menuBackdrop) {
        menuBackdrop.addEventListener('click', closeRadialMenu);
    }

    // Keyboard Accessibility — Escape key closes menu
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && isMenuOpen) {
            closeRadialMenu();
        }
    });

    // ============================================================
    // 3. SCROLL REVEAL & STAGGER ENGINE (INTERSECTION OBSERVER)
    // ============================================================

    // About Section Masked Reveal
    const aboutHeading = document.getElementById('about-heading');
    if (aboutHeading) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        }, { threshold: 0.3 });
        observer.observe(aboutHeading);
    }

    // Service Cards Sequential Staggered Entrance
    const serviceCards = document.querySelectorAll('.service-card-2d');
    if (serviceCards.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, idx) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('reveal-active');
                    }, idx * 120);
                }
            });
        }, { threshold: 0.15 });

        serviceCards.forEach(card => observer.observe(card));
    }

    // Vision Section Signature Animation: Dark to Light Transition
    const visionSection = document.getElementById('vision-signature-section');
    if (visionSection) {
        window.addEventListener('scroll', () => {
            const rect = visionSection.getBoundingClientRect();
            const viewHeight = window.innerHeight;

            if (rect.top <= viewHeight * 0.7 && rect.bottom >= viewHeight * 0.2) {
                visionSection.style.backgroundColor = '#1F2229';
            } else if (rect.bottom < viewHeight * 0.2) {
                visionSection.style.backgroundColor = '#F8F8F6';
            }
        });
    }

    // Core Values Sequential Vertical Highlight
    const valueItems = document.querySelectorAll('.value-sequence-item');
    if (valueItems.length > 0) {
        window.addEventListener('scroll', () => {
            valueItems.forEach(item => {
                const rect = item.getBoundingClientRect();
                if (rect.top <= window.innerHeight * 0.65 && rect.bottom >= window.innerHeight * 0.25) {
                    item.classList.add('active');
                } else {
                    item.classList.remove('active');
                }
            });
        });
    }

    // Process Timeline Horizontal Line Progress & Node Activation
    const timelineProgress = document.getElementById('timeline-progress');
    const processNodes = document.querySelectorAll('.process-step-node');
    const processSection = document.getElementById('process-section');

    if (processSection && timelineProgress) {
        window.addEventListener('scroll', () => {
            const rect = processSection.getBoundingClientRect();
            const totalHeight = rect.height;
            const scrollPos = window.innerHeight - rect.top;

            if (rect.top <= window.innerHeight && rect.bottom >= 0) {
                let percentage = Math.min(Math.max((scrollPos / totalHeight) * 100, 0), 100);
                timelineProgress.style.width = `${percentage}%`;

                processNodes.forEach((node, idx) => {
                    const threshold = (idx + 1) * (100 / processNodes.length);
                    if (percentage >= threshold - 15) {
                        node.classList.add('active');
                    } else {
                        node.classList.remove('active');
                    }
                });
            }
        });
    }

    // ============================================================
    // 4. CONSULTATION MODAL POPUP & FORM HANDLERS
    // ============================================================
    const modal = document.getElementById('consultation-modal');
    const openModalBtns = document.querySelectorAll('.open-consultation-modal');
    const closeModalBtn = document.getElementById('close-modal');
    const modalForm = document.getElementById('modal-contact-form');
    const modalStatus = document.getElementById('modal-form-status');

    openModalBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            closeRadialMenu(); // Close radial menu if open
            if (modal) modal.classList.add('active');
        });
    });

    if (closeModalBtn && modal) {
        closeModalBtn.addEventListener('click', () => {
            modal.classList.remove('active');
        });
        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.classList.remove('active');
        });
    }

    if (modalForm && modalStatus) {
        modalForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const submitBtn = modalForm.querySelector('button[type="submit"]');
            const origText = submitBtn.textContent;
            submitBtn.disabled = true;
            submitBtn.textContent = 'Submitting Request...';

            setTimeout(() => {
                modalStatus.style.display = 'block';
                modalStatus.style.padding = '0.8rem';
                modalStatus.style.marginTop = '1rem';
                modalStatus.style.backgroundColor = '#E2F0D9';
                modalStatus.style.color = '#385723';
                modalStatus.style.borderRadius = '4px';
                modalStatus.innerHTML = '<strong>Request Submitted!</strong> Thank you for contacting J D AHYA & CO. We will reach out to you within 24 business hours.';

                modalForm.reset();
                submitBtn.disabled = false;
                submitBtn.textContent = origText;
            }, 1200);
        });
    }

    // Main Contact Form
    const mainForm = document.getElementById('main-contact-form');
    const mainStatus = document.getElementById('main-form-status');

    if (mainForm && mainStatus) {
        mainForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const submitBtn = mainForm.querySelector('button[type="submit"]');
            const origText = submitBtn.textContent;
            submitBtn.disabled = true;
            submitBtn.textContent = 'Submitting Enquiry...';

            setTimeout(() => {
                mainStatus.style.display = 'block';
                mainStatus.style.padding = '0.8rem';
                mainStatus.style.marginTop = '1rem';
                mainStatus.style.backgroundColor = '#E2F0D9';
                mainStatus.style.color = '#385723';
                mainStatus.style.borderRadius = '4px';
                mainStatus.innerHTML = '<strong>Enquiry Submitted!</strong> Our team will contact you back shortly.';

                mainForm.reset();
                submitBtn.disabled = false;
                submitBtn.textContent = origText;
            }, 1200);
        });
    }
});
