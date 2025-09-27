// Funcionalidad del menú hamburguesa
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMobile = document.querySelector('.nav-mobile');
    
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMobile.classList.toggle('active');
    });

    // Cerrar menú móvil al hacer clic en un enlace
    const navMobileLinks = document.querySelectorAll('.nav-mobile-link');
    navMobileLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMobile.classList.remove('active');
        });
    });

    // Funcionalidad de la galería de testimonios (carrusel)
    const testimonials = document.querySelectorAll('.testimonial');
    const paginationContainer = document.querySelector('.swiper-pagination');
    let currentTestimonial = 0;

    // Crear puntos de paginación
    function createPagination() {
        paginationContainer.innerHTML = '';
        for (let i = 0; i < testimonials.length; i++) {
            const dot = document.createElement('span');
            dot.classList.add('swiper-pagination-bullet');
            if (i === 0) dot.classList.add('swiper-pagination-bullet-active');
            dot.addEventListener('click', () => goToTestimonial(i));
            paginationContainer.appendChild(dot);
        }
    }

    // Ir a un testimonio específico
    function goToTestimonial(index) {
        testimonials[currentTestimonial].classList.remove('active');
        document.querySelectorAll('.swiper-pagination-bullet')[currentTestimonial].classList.remove('swiper-pagination-bullet-active');
        
        currentTestimonial = index;
        
        testimonials[currentTestimonial].classList.add('active');
        document.querySelectorAll('.swiper-pagination-bullet')[currentTestimonial].classList.add('swiper-pagination-bullet-active');
    }

    // Navegación automática con teclado
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') {
            const prevIndex = currentTestimonial > 0 ? currentTestimonial - 1 : testimonials.length - 1;
            goToTestimonial(prevIndex);
        } else if (e.key === 'ArrowRight') {
            const nextIndex = currentTestimonial < testimonials.length - 1 ? currentTestimonial + 1 : 0;
            goToTestimonial(nextIndex);
        }
    });

    // Inicializar paginación
    createPagination();

    // Funcionalidad de los elementos de la lista de servicios (acordeón)
    const serviceItems = document.querySelectorAll('.service-list-item');
    
    serviceItems.forEach(item => {
        const serviceName = item.querySelector('.service-list-name');
        
        serviceName.addEventListener('click', function() {
            // Cerrar todos los otros elementos
            serviceItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle del elemento actual
            item.classList.toggle('active');
        });
    });

    // Smooth scroll para enlaces internos
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Funcionalidad del formulario (validación básica)
    const form = document.querySelector('.contact-form');
    const whatsappButton = form.querySelector('.cta-button');
    
    whatsappButton.addEventListener('click', function(e) {
        e.preventDefault();
        
        const nombre = document.getElementById('nombre').value;
        const correo = document.getElementById('correo').value;
        const tipo = document.getElementById('tipo').value;
        const detalles = document.getElementById('detalles').value;
        const masNecesitas = document.getElementById('mas_necesitas').value;
        
        if (!nombre || !correo || !detalles) {
            alert('Por favor, completa los campos obligatorios: nombre, correo y detalles de la mascota.');
            return;
        }
        
        // Crear mensaje para WhatsApp
        let mensaje = `¡Hola! Me interesa crear una mascota para mi ${tipo}.\n\n`;
        mensaje += `*Mis datos:*\n`;
        mensaje += `Nombre: ${nombre}\n`;
        mensaje += `Correo: ${correo}\n\n`;
        mensaje += `*Detalles de la mascota:*\n${detalles}\n\n`;
        if (masNecesitas) {
            mensaje += `*Necesidades adicionales:*\n${masNecesitas}\n\n`;
        }
        mensaje += `¡Espero su respuesta!`;
        
        // Codificar el mensaje para URL
        const mensajeCodificado = encodeURIComponent(mensaje);
        const urlWhatsapp = `https://wa.me/528134765503?text=${mensajeCodificado}`;
        
        // Abrir WhatsApp
        window.open(urlWhatsapp, '_blank');
    });
});

// Funcionalidad adicional para mejorar la experiencia de usuario
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(0, 0, 0, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
    } else {
        navbar.style.background = 'var(--black)';
        navbar.style.backdropFilter = 'none';
    }
});

// Animación de entrada para elementos cuando aparecen en viewport
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Aplicar animación a elementos específicos
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.about-content, .service-list-item, .testimonial-card, .contact-form, .impact-card');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

