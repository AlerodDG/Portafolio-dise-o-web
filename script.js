/* script.js - JavaScript estructurado para Portfolio Luxury */
document.addEventListener('DOMContentLoaded', function() {
    initSmoothScroll();
    initMobileMenu();
    initButtonHover();
    initProjectCards();
    initFormInteractions();
});

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
    
    // Crear botón menú para móviles si no existe
    const createMenuButton = () => {
        let button = document.querySelector('.nav__menu-btn');
        if (!button) {
            button = document.createElement('button');
            button.className = 'nav__menu-btn';
            button.innerHTML = '<span></span><span></span><span></span>';
            button.setAttribute('aria-label', 'Abrir menú de navegación');
            const nav = document.querySelector('.nav');
            if (nav) nav.appendChild(button);
        }
        return button;
    };
    
    if (window.innerWidth <= 900) {
        createMenuButton();
    }
    
    const menuBtn = document.querySelector('.nav__menu-btn');
    if (menuBtn && navMenu) {
        menuBtn.addEventListener('click', function() {
            const isFlex = navMenu.style.display === 'flex';
            navMenu.style.display = isFlex ? 'none' : 'flex';
            if (!isFlex) {
                navMenu.style.flexDirection = 'column';
                navMenu.style.position = 'absolute';
                navMenu.style.top = '80px';
                navMenu.style.left = '0';
                navMenu.style.width = '100%';
                navMenu.style.background = 'var(--bg-secondary)';
                navMenu.style.padding = '20px';
                navMenu.style.borderBottom = '1px solid var(--border-color)';
            }
        });
    }
    
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 900 && navMenu) {
                navMenu.style.display = 'none';
            }
        });
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth > 900 && navMenu) {
            navMenu.style.display = 'flex';
            navMenu.style.position = 'static';
            navMenu.style.flexDirection = 'row';
            navMenu.style.padding = '0';
            navMenu.style.border = 'none';
        }
    });
}

/* Microinteracciones en botones */
function initButtonHover() {
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
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
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 15px 40px rgba(0, 0, 0, 0.4)';
        });
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
    });
}

/* Interacciones del formulario */
function initFormInteractions() {
    const forms = document.querySelectorAll('.contact__form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const button = this.querySelector('button[type="submit"]');
            if (button) {
                button.textContent = '¡Mensaje enviado!';
                button.style.background = '#4A0E4E';
                button.style.color = '#FFFFFF';
                this.reset();
            }
        });
    });
}