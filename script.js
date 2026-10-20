/* script.js - JavaScript estructurado para Portfolio Luxury */
document.addEventListener('DOMContentLoaded', function() {
    initAnimations();
    initSmoothScroll();
    initMobileMenu();
    initButtonHover();
    initProjectCards();
    initFormInteractions();
});

/* Inicializar animaciones de entrada */
function initAnimations() {
    // Observador de intersección para animaciones fade-in-up
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Aplicar clase hidden inicialmente y animar al entrar en vista
    document.querySelectorAll('.fade-in-up').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(el);
    });

    // Animación de texto hero title letters
    const heroTitle = document.querySelector('.hero__title');
    if (heroTitle) {
        const letters = heroTitle.textContent.split('');
        heroTitle.innerHTML = letters.map((letter, index) => 
            `<span style="transition: transform 0.3s ease ${index * 0.05}s;" transform-origin="center bottom">${letter === '<' ? letter : letter}</span>`
        ).join('');
    }
}

/* Scroll suave entre secciones */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/* Menú responsivo */
function initMobileMenu() {
    const navMenu = document.querySelector('.nav__menu');
    const navLinks = document.querySelectorAll('.nav__link');
    const header = document.querySelector('.header');
    
    // Crear botón menú para móviles
    const createMenuButton = () => {
        const button = document.createElement('button');
        button.className = 'nav__menu-btn';
        button.innerHTML = '<span></span><span></span><span></span>';
        button.setAttribute('aria-label', 'Abrir menú de navegación');
        return button;
    };
    
    // Insertar botón solo en móviles (se oculta con CSS)
    if (window.innerWidth <= 900) {
        const nav = document.querySelector('.nav');
        if (nav && !document.querySelector('.nav__menu-btn')) {
            nav.appendChild(createMenuButton());
        }
    }
    
    // Toggle menú
    const menuBtn = document.querySelector('.nav__menu-btn');
    if (menuBtn) {
        menuBtn.addEventListener('click', function() {
            const isExpanded = menuBtn.getAttribute('aria-expanded') === 'true';
            menuBtn.setAttribute('aria-expanded', !isExpanded);
            if (navMenu) {
                navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
            }
        });
    }
    
    // Cerrar menú al hacer clic en un enlace
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu) {
                navMenu.style.display = 'none';
                if (menuBtn) {
                    menuBtn.setAttribute('aria-expanded', 'false');
                }
            }
        });
    });
    
    // Re-insertar menú normal al redimensionar a desktop
    window.addEventListener('resize', () => {
        if (window.innerWidth > 900) {
            if (navMenu) {
                navMenu.style.display = 'flex';
            }
            if (menuBtn) {
                menuBtn.style.display = 'none';
            }
        }
    });
}

/* Microinteracciones en botones */
function initButtonHover() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
            this.style.transition = 'transform 0.2s ease, box-shadow 0.2s ease';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

/* Efectos en tarjetas de proyectos */
function initProjectCards() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        // Efecto hover elevación
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 15px 40px rgba(0, 0, 0, 0.4)';
            this.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'var(--shadow-card)';
        });
        
        // Efecto click más profundo
        card.addEventListener('mousedown', function() {
            this.style.transform = 'translateY(2px)';
        });
        
        card.addEventListener('mouseup', function() {
            this.style.transform = 'translateY(-5px)';
        });
    });
}

/* Interacciones del formulario */
function initFormInteractions() {
    const formInputs = document.querySelectorAll('.form__input, .form__textarea');
    
    formInputs.forEach(input => {
        // Efecto focus placeholder
        input.addEventListener('focus', function() {
            this.placeholder = this.placeholder;
        });
        
        input.addEventListener('blur', function() {
            // No hacer nada, el placeholder vuelve automáticamente
        });
    });
    
    // Prevenir envío de formulario y mostrar mensaje
    const forms = document.querySelectorAll('.contact__form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const button = this.querySelector('button[type="submit"]');
            if (button) {
                button.textContent = 'Mensaje enviado';
                button.style.background = '#4A0E4E';
                button.style.color = '#FFFFFF';
            }
        });
    });
}

// Exportar funciones para pruebas si es necesario
window.Portfolio = {
    initAnimations,
    initSmoothScroll,
    initMobileMenu,
    initButtonHover,
    initProjectCards,
    initFormInteractions
};