/* ==========================================
   SCRIPT PRINCIPAL - PORTFOLIO LUXURY
   ========================================== */
document.addEventListener('DOMContentLoaded', function() {
    initSmoothScroll();
    initMobileMenu();
    initFormInteractions();
});

/**
 * Scroll suave entre secciones al pulsar enlaces con ancla (#)
 */
function initSmoothScroll() {
    const anchors = document.querySelectorAll('a[href^="#"]');
    
    anchors.forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#' || !targetId) return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const header = document.querySelector('.header');
                const headerOffset = header ? header.offsetHeight : 0;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Manejo del menú desplegable en dispositivos móviles
 */
function initMobileMenu() {
    const nav = document.querySelector('.nav');
    const navMenu = document.querySelector('.nav__menu');
    const navLinks = document.querySelectorAll('.nav__link');
    
    if (!nav || !navMenu) return;

    // Crear botón hamburguesa si no existe en el HTML
    let menuBtn = document.querySelector('.nav__menu-btn');
    if (!menuBtn && window.innerWidth <= 900) {
        menuBtn = document.createElement('button');
        menuBtn.className = 'nav__menu-btn';
        menuBtn.setAttribute('aria-label', 'Abrir menú de navegación');
        menuBtn.innerHTML = '<span style="display:block;width:22px;height:2px;background:#FFF;margin:4px 0;"></span>'.repeat(3);
        menuBtn.style.cssText = 'background:none;border:none;cursor:pointer;padding:10px;z-index:1001;';
        nav.appendChild(menuBtn);
    }

    if (menuBtn) {
        menuBtn.addEventListener('click', function() {
            const isOpen = navMenu.classList.toggle('nav__menu--open');
            if (isOpen) {
                navMenu.style.display = 'flex';
                navMenu.style.flexDirection = 'column';
                navMenu.style.position = 'absolute';
                navMenu.style.top = '80px';
                navMenu.style.left = '0';
                navMenu.style.width = '100%';
                navMenu.style.background = 'var(--bg-secondary)';
                navMenu.style.padding = '20px';
                navMenu.style.borderBottom = '1px solid var(--border-color)';
            } else {
                navMenu.style.display = '';
            }
        });
    }

    // Cierra el menú al hacer clic en cualquier enlace
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('nav__menu--open')) {
                navMenu.classList.remove('nav__menu--open');
                navMenu.style.display = '';
            }
        });
    });
}

/**
 * Feedback visual al enviar el formulario de contacto
 */
function initFormInteractions() {
    const form = document.querySelector('.contact__form');
    if (!form) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const submitBtn = this.querySelector('button[type="submit"]');
        
        if (submitBtn) {
            const originalText = submitBtn.textContent;
            submitBtn.textContent = '¡Mensaje enviado!';
            submitBtn.style.background = 'var(--accent-violet)';
            submitBtn.style.color = '#FFFFFF';
            
            form.reset();

            // Restaura el texto original del botón después de 4 segundos
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.style.background = '';
                submitBtn.style.color = '';
            }, 4000);
        }
    });
}