/**
 * Portfolio BTS SIO SISR - JavaScript
 */

document.addEventListener('DOMContentLoaded', function() {
    // =============================================
    // Navigation Mobile
    // =============================================
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    // Dropdown Entreprise
    const dropdownToggle = document.querySelector('.dropdown-toggle');
    const navDropdown = document.querySelector('.nav-dropdown');

    if (dropdownToggle && navDropdown) {
        dropdownToggle.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            navDropdown.classList.toggle('active');
        });

        // Fermer le dropdown quand on clique sur un lien du dropdown
        const dropdownLinks = document.querySelectorAll('.dropdown-link');
        dropdownLinks.forEach(link => {
            link.addEventListener('click', () => {
                navDropdown.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });

        // Fermer le dropdown quand on clique ailleurs
        document.addEventListener('click', (e) => {
            if (!navDropdown.contains(e.target)) {
                navDropdown.classList.remove('active');
            }
        });
    }

    // Fermer le menu quand on clique sur un lien
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });

    // =============================================
    // Navigation Active au Scroll
    // =============================================
    const sections = document.querySelectorAll('section[id]');

    function updateActiveNav() {
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

    window.addEventListener('scroll', updateActiveNav);

    // =============================================
    // Animation au Scroll (Intersection Observer)
    // =============================================
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observer les éléments à animer
    const animatedElements = document.querySelectorAll(
        '.info-card, .detail-block, .article-card, .cv-section, .contact-item'
    );

    animatedElements.forEach(el => {
        el.classList.add('animate-on-scroll');
        observer.observe(el);
    });

    // Ajouter les styles d'animation
    const style = document.createElement('style');
    style.textContent = `
        .animate-on-scroll {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        .animate-on-scroll.visible {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);

    // =============================================
    // Animation des barres de compétences
    // =============================================
    const skillBars = document.querySelectorAll('.skill-fill');

    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const width = entry.target.style.width;
                entry.target.style.width = '0';
                setTimeout(() => {
                    entry.target.style.width = width;
                }, 100);
                skillObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    skillBars.forEach(bar => skillObserver.observe(bar));

    // =============================================
    // Formulaire de Contact
    // =============================================
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Récupérer les données du formulaire
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);

            // Simulation d'envoi (remplacer par votre logique d'envoi)
            console.log('Données du formulaire:', data);

            // Afficher un message de confirmation
            const btn = this.querySelector('button[type="submit"]');
            const originalText = btn.innerHTML;
            btn.innerHTML = '<i class="fas fa-check"></i> Message envoyé !';
            btn.style.background = '#22c55e';

            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.style.background = '';
                this.reset();
            }, 3000);

            // Note: Pour un vrai envoi, vous pouvez utiliser:
            // - EmailJS (https://www.emailjs.com/)
            // - Formspree (https://formspree.io/)
            // - Un backend PHP/Node.js
        });
    }

    // =============================================
    // Effet de typing dans le terminal
    // =============================================
    function typeWriter(element, text, speed = 50) {
        let i = 0;
        element.textContent = '';

        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        type();
    }

    // Animation du terminal au chargement
    const typingElements = document.querySelectorAll('.terminal-body .typing');
    typingElements.forEach((el, index) => {
        const text = el.textContent;
        el.textContent = '';
        setTimeout(() => {
            typeWriter(el, text, 80);
        }, index * 1500);
    });

    // =============================================
    // Smooth Scroll pour les ancres
    // =============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 70; // Ajustement pour la navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // =============================================
    // Effet parallaxe léger sur le hero
    // =============================================
    const hero = document.querySelector('.hero');

    if (hero) {
        window.addEventListener('scroll', () => {
            const scrolled = window.scrollY;
            if (scrolled < window.innerHeight) {
                hero.style.backgroundPositionY = `${scrolled * 0.5}px`;
            }
        });
    }

    // =============================================
    // Navbar background on scroll
    // =============================================
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(10, 10, 15, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
        } else {
            navbar.style.background = 'rgba(10, 10, 15, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });

    // =============================================
    // Console Easter Egg
    // =============================================
    console.log('%c🎓 Portfolio BTS SIO SISR', 'font-size: 24px; font-weight: bold; color: #00d4aa;');
    console.log('%cBienvenue dans la console ! Curieux(se), n\'est-ce pas ? 😉', 'font-size: 14px; color: #0ea5e9;');
    console.log('%cN\'hésitez pas à me contacter si vous avez des questions.', 'font-size: 12px; color: #a1a1aa;');
});
