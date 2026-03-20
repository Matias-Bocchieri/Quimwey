/**
 * main.js - Quimwey Website interactions
 */

document.addEventListener('DOMContentLoaded', () => {

    // 1. Mobile & Sticky Navigation
    const header = document.querySelector('.header');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-link');

    // Sticky Header Effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.boxShadow = 'var(--shadow-md)';
            header.style.padding = '0';
        } else {
            header.style.boxShadow = 'var(--shadow-sm)';
            header.style.padding = '5px 0';
        }
    });

    // Mobile Menu Toggle
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const spans = mobileMenuBtn.querySelectorAll('span');
        
        if (navLinks.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            spans.forEach(span => {
                span.style.transform = 'none';
                span.style.opacity = '1';
            });
        }
    });

    // Close mobile menu on link click
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                mobileMenuBtn.click();
            }
        });
    });

    // Active Navigation Highlight on Scroll
    const sections = document.querySelectorAll('section');
    
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href').includes(current)) {
                item.classList.add('active');
            }
        });
    });

    // 2. Scroll Fade-in Animations (Intersection Observer)
    const fadeElements = document.querySelectorAll('.fade-in-section');
    
    const appearOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const appearOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, appearOptions);

    fadeElements.forEach(element => {
        appearOnScroll.observe(element);
    });

    // 3. Contact Form Submission (Mock)
    const contactForm = document.getElementById('contact-form');
    const formMsg = document.getElementById('form-msg');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Simple validation and mock submit
            const btn = contactForm.querySelector('button[type="submit"]');
            const originalText = btn.querySelector('.btn-text').innerText;
            
            btn.querySelector('.btn-text').innerText = 'Enviando...';
            btn.disabled = true;

            setTimeout(() => {
                contactForm.reset();
                btn.querySelector('.btn-text').innerText = originalText;
                btn.disabled = false;
                
                formMsg.style.color = 'var(--accent-green)';
                formMsg.style.marginTop = '1rem';
                formMsg.style.fontWeight = '600';
                formMsg.innerText = '¡Gracias! Tu mensaje ha sido enviado correctamente. Nos comunicaremos a la brevedad.';
                
                setTimeout(() => {
                    formMsg.innerText = '';
                }, 5000);
            }, 1500);
        });
    }
});
