document.addEventListener("DOMContentLoaded", function () {
  // ==========================================================================
  // 1. Lógica del Loader (5 segundos)
  // ==========================================================================
  const loader = document.getElementById("loader");
  const mainContent = document.getElementById("main-content");

  // Ocultar el loader y mostrar el contenido después de 5 segundos
  setTimeout(() => {
    loader.style.opacity = "0";
    loader.addEventListener("transitionend", () => {
      loader.classList.add("hidden");
      mainContent.classList.remove("hidden");
      // Forzar al navegador a reconocer el cambio antes de la siguiente transición
      requestAnimationFrame(() => {
        mainContent.style.opacity = "1";
      });
    });
  }, 1300); // 5000 milisegundos = 5 segundos

  // ==========================================================================
  // 2. Navegación Hamburguesa Funcional
  // ==========================================================================
  const hamburgerBtn = document.getElementById("hamburgerBtn");
  const mobileNav = document.getElementById("mobileNav");
  const mobileNavLinks = document.querySelectorAll(".nav-mobile-link");

  // Toggle del menú hamburguesa
  hamburgerBtn.addEventListener("click", () => {
    hamburgerBtn.classList.toggle("active");
    mobileNav.classList.toggle("active");

    // Prevenir scroll del body cuando el menú está abierto
    if (mobileNav.classList.contains("active")) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  });

  // Cerrar menú al hacer clic en un enlace
  mobileNavLinks.forEach((link) => {
    link.addEventListener("click", () => {
      hamburgerBtn.classList.remove("active");
      mobileNav.classList.remove("active");
      document.body.style.overflow = "auto";
    });
  });

  // Cerrar menú al hacer clic fuera de él
  mobileNav.addEventListener("click", (e) => {
    if (e.target === mobileNav) {
      hamburgerBtn.classList.remove("active");
      mobileNav.classList.remove("active");
      document.body.style.overflow = "auto";
    }
  });

  // ==========================================================================
  // 3. Inicialización de Swiper para el carrusel de servicios
  // ==========================================================================
  if (typeof Swiper !== "undefined") {
    const servicesSwiper = new Swiper(".servicesSwiper", {
      slidesPerView: 1,
      spaceBetween: 30,
      loop: true,
      // autoplay: {
      //   delay: 4000,
      //   disableOnInteraction: false,
      // },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      breakpoints: {
        768: {
          slidesPerView: 2,
        },
        1024: {
          slidesPerView: 3,
        },
      },
    });
  }

  // ==========================================================================
  // 4. Lógica para la sección de servicios desplegables
  // ==========================================================================
  const serviceListItems = document.querySelectorAll(".service-list-item");

  serviceListItems.forEach((item) => {
    const serviceName = item.querySelector(".service-list-name");
    const serviceDetails = item.querySelector(".service-list-details");

    serviceName.addEventListener("click", () => {
      // Comprobar si el item actual ya está activo
      const isActive = item.classList.contains("active");

      // Cerrar todos los demás items
      serviceListItems.forEach((otherItem) => {
        otherItem.classList.remove("active");
        const otherDetails = otherItem.querySelector(".service-list-details");
        otherDetails.style.maxHeight = "0";
        otherItem.style.opacity = "0.77";
      });

      // Si el item actual no estaba activo, ábrelo
      if (!isActive) {
        item.classList.add("active");
        serviceDetails.style.maxHeight = serviceDetails.scrollHeight + "px";
        item.style.opacity = "1";
      } else {
        // Si ya estaba activo, solo lo cerramos (y todos ya están cerrados)
        item.style.opacity = "0.77";
      }
    });
  });

  // ==========================================================================
  // 5. Carrusel de Testimonios
  // ==========================================================================
  // const testimonials = document.querySelectorAll(".testimonial");
  // let currentTestimonial = 0;

  // function showTestimonial(index) {
  //   testimonials.forEach((testimonial, i) => {
  //     testimonial.classList.toggle("active", i === index);
  //   });
  // }

  // function nextTestimonial() {
  //   currentTestimonial = (currentTestimonial + 1) % testimonials.length;
  //   showTestimonial(currentTestimonial);
  // }

  // // if (testimonials.length > 1) {
  // //   setInterval(nextTestimonial, 6000);
  // // }

  // showTestimonial(0);

  // ==========================================================================
  // 6. Formulario de Contacto - Envío a WhatsApp
  // ==========================================================================
  const contactForm = document.getElementById("contactForm");

  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Obtener los valores del formulario
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const projectType = document.getElementById("project-type").value;
    const details = document.getElementById("details").value.trim();

    // Validar que todos los campos requeridos estén llenos
    if (!name || !email || !projectType) {
      alert("Por favor, completa todos los campos requeridos.");
      return;
    }

    // Crear el mensaje para WhatsApp
    let message = `¡Hola! Me interesa trabajar con Duskyberry.\n\n`;
    message += `📝 *Información de contacto:*\n`;
    message += `• Nombre: ${name}\n`;
    message += `• Email: ${email}\n\n`;
    message += `🎯 *Proyecto solicitado:* ${getProjectTypeName(
      projectType
    )}\n\n`;

    if (details) {
      message += `📋 *Detalles del proyecto:*\n${details}\n\n`;
    }

    message += `¡Espero su respuesta! 😊`;

    // Codificar el mensaje para URL
    const encodedMessage = encodeURIComponent(message);

    // Crear la URL de WhatsApp
    const whatsappURL = `https://wa.me/528134765503?text=${encodedMessage}`;

    // Abrir WhatsApp en una nueva ventana
    window.open(whatsappURL, "_blank");

    // Opcional: Limpiar el formulario después del envío
    contactForm.reset();

    // Mostrar mensaje de confirmación
    showNotification("¡Mensaje enviado! Te redirigimos a WhatsApp.");
  });

  // Función auxiliar para obtener el nombre completo del tipo de proyecto
  function getProjectTypeName(value) {
    const projectTypes = {
      invitacion: "Invitación Digital",
      "sitio-web": "Sitio/Página Web",
      mascota: "Mascota/Personaje",
      otro: "Otro",
    };
    return projectTypes[value] || value;
  }

  // Función para mostrar notificaciones
  function showNotification(message) {
    // Crear elemento de notificación
    const notification = document.createElement("div");
    notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(135deg, #85a840, #0cc0df);
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 10px;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
            z-index: 10000;
            font-family: 'Poppins', sans-serif;
            font-weight: 500;
            transform: translateX(100%);
            transition: transform 0.3s ease;
        `;
    notification.textContent = message;

    // Añadir al DOM
    document.body.appendChild(notification);

    // Animar entrada
    setTimeout(() => {
      notification.style.transform = "translateX(0)";
    }, 100);

    // Remover después de 4 segundos
    setTimeout(() => {
      notification.style.transform = "translateX(100%)";
      setTimeout(() => {
        if (notification.parentNode) {
          notification.parentNode.removeChild(notification);
        }
      }, 300);
    }, 4000);
  }

  // ==========================================================================
  // 7. Smooth Scrolling para enlaces de navegación
  // ==========================================================================
  const navLinks = document.querySelectorAll('a[href^="#"]');

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        const offsetTop = targetSection.offsetTop - 80; // Ajuste para navbar fija

        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        });
      }
    });
  });

  // ==========================================================================
  // 8. Animaciones al hacer scroll (Intersection Observer)
  // ==========================================================================
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, observerOptions);

  // Observar secciones para animaciones
  const sectionsToAnimate = document.querySelectorAll(
    ".about-section, .services-section-cards, .quote-section, .services-list-section, .testimonials-section, .impact-section, .contact-section"
  );

  sectionsToAnimate.forEach((section) => {
    section.style.opacity = "0";
    section.style.transform = "translateY(30px)";
    section.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(section);
  });

  // ==========================================================================
  // 9. Efectos adicionales y optimizaciones
  // ==========================================================================

  // Optimizar el rendimiento del scroll
  let ticking = false;

  function updateScrollEffects() {
    // Aquí se pueden añadir efectos adicionales basados en scroll
    ticking = false;
  }

  window.addEventListener("scroll", () => {
    if (!ticking) {
      requestAnimationFrame(updateScrollEffects);
      ticking = true;
    }
  });

  // Precargar imágenes importantes
  const imagesToPreload = [
    "https://raw.githubusercontent.com/duskyberry/recursos_gr-ficos/refs/heads/main/duskyberry_logo.png",
    "https://raw.githubusercontent.com/duskyberry/recursos_gr-ficos/refs/heads/main/oficial_logo_opt2.png",
  ];

  imagesToPreload.forEach((src) => {
    const img = new Image();
    img.src = src;
  });

  // ==========================================================================
  // 10. Manejo de errores y fallbacks
  // ==========================================================================

  // Fallback para el video del hero
  const heroVideo = document.querySelector(".hero-video");
  if (heroVideo) {
    heroVideo.addEventListener("error", function () {
      console.warn("Error al cargar el video del hero. Aplicando fallback.");
      this.style.display = "none";
      // Se podría añadir una imagen de fallback aquí
    });
  }

  // Manejo de errores para Swiper
  window.addEventListener("error", function (e) {
    if (e.message && e.message.includes("Swiper")) {
      console.warn("Error con Swiper, continuando sin carrusel automático.");
    }
  });

  console.log("🎉 Duskyberry website loaded successfully!");
});
let startX = 0;
let endX = 0;
