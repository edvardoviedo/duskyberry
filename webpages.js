// Funcionalidad del menú hamburguesa
document.addEventListener("DOMContentLoaded", function () {
    const hamburger = document.querySelector(".hamburger");
    const navMobile = document.querySelector(".nav-mobile");
  
    hamburger.addEventListener("click", function () {
      hamburger.classList.toggle("active");
      navMobile.classList.toggle("active");
    });
  
    // Cerrar menú móvil al hacer clic en un enlace
    const navMobileLinks = document.querySelectorAll(".nav-mobile-link");
    navMobileLinks.forEach((link) => {
      link.addEventListener("click", function () {
        hamburger.classList.remove("active");
        navMobile.classList.remove("active");
      });
    });
  
    // Funcionalidad de la galería de testimonios (carrusel)
    const testimonials = document.querySelectorAll(".testimonial");
    const paginationContainer = document.querySelector(".swiper-pagination");
    let currentTestimonial = 0;
  
    // Crear puntos de paginación
    function createPagination() {
      paginationContainer.innerHTML = "";
      for (let i = 0; i < testimonials.length; i++) {
        const dot = document.createElement("span");
        dot.classList.add("swiper-pagination-bullet");
        if (i === 0) dot.classList.add("swiper-pagination-bullet-active");
        dot.addEventListener("click", () => goToTestimonial(i));
        paginationContainer.appendChild(dot);
      }
    }
  
    // Ir a un testimonio específico
    function goToTestimonial(index) {
      testimonials[currentTestimonial].classList.remove("active");
      document
        .querySelectorAll(".swiper-pagination-bullet")
        [currentTestimonial].classList.remove("swiper-pagination-bullet-active");
  
      currentTestimonial = index;
  
      testimonials[currentTestimonial].classList.add("active");
      document
        .querySelectorAll(".swiper-pagination-bullet")
        [currentTestimonial].classList.add("swiper-pagination-bullet-active");
    }
  
    // Navegación automática con teclado
    document.addEventListener("keydown", function (e) {
      if (e.key === "ArrowLeft") {
        const prevIndex =
          currentTestimonial > 0
            ? currentTestimonial - 1
            : testimonials.length - 1;
        goToTestimonial(prevIndex);
      } else if (e.key === "ArrowRight") {
        const nextIndex =
          currentTestimonial < testimonials.length - 1
            ? currentTestimonial + 1
            : 0;
        goToTestimonial(nextIndex);
      }
    });
  
    // Inicializar paginación
    createPagination();
  
    // Funcionalidad de los elementos de la lista de servicios (acordeón)
    const serviceItems = document.querySelectorAll(".service-list-item");
  
    serviceItems.forEach((item) => {
      const serviceName = item.querySelector(".service-list-name");
  
      serviceName.addEventListener("click", function () {
        // Cerrar todos los otros elementos
        serviceItems.forEach((otherItem) => {
          if (otherItem !== item) {
            otherItem.classList.remove("active");
          }
        });
  
        // Toggle del elemento actual
        item.classList.toggle("active");
      });
    });
  
    // Smooth scroll para enlaces internos
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach((link) => {
      link.addEventListener("click", function (e) {
        e.preventDefault();
        const targetId = this.getAttribute("href");
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: "smooth",
          });
        }
      });
    });
  
    // Funcionalidad del formulario (validación básica)
    const form = document.querySelector(".contact-form");
    const whatsappButton = form.querySelector(".cta-button");
  
    whatsappButton.addEventListener("click", function (e) {
      e.preventDefault();
  
      const nombre = document.getElementById("nombre").value;
      const correo = document.getElementById("correo").value;
      const tipo = document.getElementById("tipo").value;
      const detalles = document.getElementById("detalles").value;
      const masNecesitas = document.getElementById("mas_necesitas").value;
  
      if (!nombre || !correo || !detalles) {
        alert(
          "Por favor, completa los campos obligatorios: nombre, correo y detalles de la mascota."
        );
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
      window.open(urlWhatsapp, "_blank");
    });
  });
  
  // Funcionalidad adicional para mejorar la experiencia de usuario
  window.addEventListener("scroll", function () {
    const navbar = document.querySelector(".navbar");
    if (window.scrollY > 100) {
      navbar.style.background = "rgba(0, 0, 0, 0.95)";
      navbar.style.backdropFilter = "blur(10px)";
    } else {
      navbar.style.background = "var(--black)";
      navbar.style.backdropFilter = "none";
    }
  });
  
  // Animación de entrada para elementos cuando aparecen en viewport
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };
  
  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, observerOptions);
  
  // Aplicar animación a elementos específicos
  document.addEventListener("DOMContentLoaded", function () {
    const animatedElements = document.querySelectorAll(
      ".about-content, .service-list-item, .testimonial-card, .contact-form, .impact-card"
    );
  
    animatedElements.forEach((el) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(30px)";
      el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
      observer.observe(el);
    });
  });
  document.getElementById("btn-confeti").addEventListener("click", () => {
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
    });
  });
  function crearPetalo() {
    const petalo = document.createElement("div");
    petalo.classList.add("petal");
    petalo.style.left = Math.random() * window.innerWidth + "px";
  
    // Animación más lenta: entre 8 y 14 segundos
    const duracion = 8 + Math.random() * 6;
    petalo.style.animationDuration = `${duracion}s, 3s`;
  
    // Retardo aleatorio
    petalo.style.animationDelay = Math.random() * 5 + "s";
  
    // Rotación aleatoria inicial
    petalo.style.transform = `rotate(${Math.random() * 360}deg)`;
  
    // Tamaño variable
    const size = 10 + Math.random() * 10;
    petalo.style.width = size + "px";
    petalo.style.height = size + "px";
  
    document.body.appendChild(petalo);
  
    setTimeout(() => {
      petalo.remove();
    }, duracion * 1000);
  }
  
  document.getElementById("btn-petalos").addEventListener("click", () => {
    for (let i = 0; i < 30; i++) {
      setTimeout(crearPetalo, i * 150);
    }
  });
  const containerWidth = window.innerWidth;
  const containerHeight = window.innerHeight;
  const hearts = [];
  const maxHearts = 20;
  
  function randomVelocity() {
    const speed = 1 + Math.random() * 2;
    const angle = Math.random() * 2 * Math.PI;
    return {
      x: Math.cos(angle) * speed,
      y: Math.sin(angle) * speed,
    };
  }
  
  function crearCorazon() {
    const heart = document.createElement("div");
    heart.classList.add("heart");
    heart.textContent = "💖";
  
    // Posición inicial aleatoria en bordes (arriba, abajo, izquierda, derecha)
    const side = Math.floor(Math.random() * 4);
    let x, y;
    switch (side) {
      case 0: // izquierda
        x = -30;
        y = Math.random() * containerHeight;
        break;
      case 1: // arriba
        x = Math.random() * containerWidth;
        y = -30;
        break;
      case 2: // derecha
        x = containerWidth + 30;
        y = Math.random() * containerHeight;
        break;
      case 3: // abajo
        x = Math.random() * containerWidth;
        y = containerHeight + 30;
        break;
    }
  
    heart.style.left = x + "px";
    heart.style.top = y + "px";
  
    const velocity = randomVelocity();
  
    hearts.push({ element: heart, x, y, vx: velocity.x, vy: velocity.y });
    document.body.appendChild(heart);
  }
  
  function updateHearts() {
    for (let i = 0; i < hearts.length; i++) {
      let h = hearts[i];
      h.x += h.vx;
      h.y += h.vy;
  
      // Rebotes en los bordes
      if (h.x < 0) {
        h.x = 0;
        h.vx *= -1;
      }
      if (h.x > containerWidth - 30) {
        h.x = containerWidth - 30;
        h.vx *= -1;
      }
      if (h.y < 0) {
        h.y = 0;
        h.vy *= -1;
      }
      if (h.y > containerHeight - 30) {
        h.y = containerHeight - 30;
        h.vy *= -1;
      }
  
      // Rebotes entre corazones
      for (let j = i + 1; j < hearts.length; j++) {
        const h2 = hearts[j];
        const dx = h2.x - h.x;
        const dy = h2.y - h.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 30) {
          // choque
          // Intercambiar velocidades (simple rebote elástico)
          const tempVx = h.vx;
          const tempVy = h.vy;
          h.vx = h2.vx;
          h.vy = h2.vy;
          h2.vx = tempVx;
          h2.vy = tempVy;
        }
      }
  
      h.element.style.left = h.x + "px";
      h.element.style.top = h.y + "px";
    }
    requestAnimationFrame(updateHearts);
  }
  
  // Función para remover corazones aleatoriamente después de un tiempo
  function fadeOutAndRemove(heartObj) {
    const el = heartObj.element;
    el.style.transition = "opacity 1.5s ease";
    el.style.opacity = "0";
    setTimeout(() => {
      el.remove();
      const index = hearts.indexOf(heartObj);
      if (index > -1) hearts.splice(index, 1);
    }, 1500);
  }
  
  function startHearts() {
    // Crear corazones hasta el máximo
    const interval = setInterval(() => {
      if (hearts.length < maxHearts) {
        crearCorazon();
      } else {
        clearInterval(interval);
      }
    }, 300);
  
    updateHearts();
  
    // Cada 3 segundos hacer desaparecer un corazón al azar
    setInterval(() => {
      if (hearts.length > 0) {
        const idx = Math.floor(Math.random() * hearts.length);
        fadeOutAndRemove(hearts[idx]);
      }
    }, 3000);
  }
  
  document.getElementById("btn-corazones").addEventListener("click", startHearts);
  const bubbles = [];
  const maxBubbles = 20;
  
  function randomVelocityBubble() {
    const speed = 0.5 + Math.random() * 1.5; // velocidad moderada
    const angle = Math.random() * 2 * Math.PI;
    return {
      x: Math.cos(angle) * speed,
      y: Math.sin(angle) * speed,
    };
  }
  
  function crearBurbuja() {
    const bubble = document.createElement("div");
    bubble.classList.add("bubble");
  
    // Tamaño variable
    const size = 40 + Math.random() * 40;
    bubble.style.width = size + "px";
    bubble.style.height = size + "px";
  
    // Posición inicial aleatoria en pantalla
    const x = Math.random() * (window.innerWidth - size);
    const y = Math.random() * (window.innerHeight - size);
    bubble.style.left = x + "px";
    bubble.style.top = y + "px";
  
    // Velocidad aleatoria
    const velocity = randomVelocityBubble();
  
    bubbles.push({ element: bubble, x, y, vx: velocity.x, vy: velocity.y, size });
  
    // Ponchar burbuja al click/touch
    bubble.addEventListener("click", () => {
      bubble.style.animation = "popBubble 0.5s forwards";
      bubble.style.pointerEvents = "none";
      setTimeout(() => {
        bubble.remove();
        const index = bubbles.findIndex((b) => b.element === bubble);
        if (index > -1) bubbles.splice(index, 1);
      }, 500);
    });
  
    document.body.appendChild(bubble);
  }
  
  function updateBubbles() {
    for (let i = 0; i < bubbles.length; i++) {
      const b = bubbles[i];
      b.x += b.vx;
      b.y += b.vy;
  
      // Rebote en bordes
      if (b.x < 0) {
        b.x = 0;
        b.vx *= -1;
      }
      if (b.x > window.innerWidth - b.size) {
        b.x = window.innerWidth - b.size;
        b.vx *= -1;
      }
      if (b.y < 0) {
        b.y = 0;
        b.vy *= -1;
      }
      if (b.y > window.innerHeight - b.size) {
        b.y = window.innerHeight - b.size;
        b.vy *= -1;
      }
  
      // Rebotes simples entre burbujas
      for (let j = i + 1; j < bubbles.length; j++) {
        const b2 = bubbles[j];
        const dx = b2.x - b.x;
        const dy = b2.y - b.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < (b.size + b2.size) / 2) {
          // Intercambio simple de velocidades
          const tempVx = b.vx;
          const tempVy = b.vy;
          b.vx = b2.vx;
          b.vy = b2.vy;
          b2.vx = tempVx;
          b2.vy = tempVy;
        }
      }
  
      b.element.style.left = b.x + "px";
      b.element.style.top = b.y + "px";
    }
    requestAnimationFrame(updateBubbles);
  }
  
  document.getElementById("btn-burbujas").addEventListener("click", () => {
    // Crear burbujas hasta máximo
    const interval = setInterval(() => {
      if (bubbles.length < maxBubbles) {
        crearBurbuja();
      } else {
        clearInterval(interval);
      }
    }, 300);
  
    updateBubbles();
  });
  // Después de 15 segundos inicia el ponchado automático
  setTimeout(() => {
    const intervaloPonchar = setInterval(() => {
      if (bubbles.length === 0) {
        clearInterval(intervaloPonchar); // Si ya no quedan burbujas, para el intervalo
        return;
      }
      // Elige una burbuja aleatoria y la hace reventar
      const idx = Math.floor(Math.random() * bubbles.length);
      const burbuja = bubbles[idx];
      if (burbuja) {
        burbuja.element.style.animation = "popBubble 0.5s forwards";
        burbuja.element.style.pointerEvents = "none";
        setTimeout(() => {
          burbuja.element.remove();
          bubbles.splice(idx, 1);
        }, 500);
      }
    }, 800); // cada 0.8 segundos poncha una burbuja
  }, 15000); // espera 15 segundos para empezar
  (() => {
    const gradients = [
      "radial-gradient(circle, #00f9ff, #0066ff)", // azul aqua a azul neón
      "radial-gradient(circle, #ff00cc, #660099)", // rosa magenta a púrpura
      "radial-gradient(circle, #ffeb3b, #ff9800)", // amarillo a naranja
      "radial-gradient(circle, #c6ff00, #00c853)", // lima a verde neón
    ];
  
    function crearFirework(x, y, isBig) {
      const particlesCount = 50;
      for (let i = 0; i < particlesCount; i++) {
        const particle = document.createElement("div");
        particle.classList.add("firework-particle");
  
        // Tamaño base aleatorio entre 4 y 10 px
        let size = 4 + Math.random() * 6;
  
        // Si es grande, multiplica tamaño por 1.5 a 2
        if (isBig) size *= 1.5 + Math.random() * 0.5;
  
        particle.style.width = size + "px";
        particle.style.height = size + "px";
  
        // Fondo con gradiente aleatorio
        const gradient = gradients[Math.floor(Math.random() * gradients.length)];
        particle.style.background = gradient;
  
        // Posición inicial
        particle.style.left = x + "px";
        particle.style.top = y + "px";
  
        // Ángulo y distancia aleatoria para la explosión
        const angle = (Math.PI * 2 * i) / particlesCount;
        const distance = 50 + Math.random() * 70;
  
        // Desplazamiento en X y Y usando variables CSS
        const dx = Math.cos(angle) * distance + "px";
        const dy = Math.sin(angle) * distance + "px";
  
        particle.style.setProperty("--dx", dx);
        particle.style.setProperty("--dy", dy);
  
        // Duración animación extendida a 2.3s
        particle.style.animationDuration = "2.3s";
  
        document.body.appendChild(particle);
  
        // Eliminar después de la animación
        particle.addEventListener("animationend", () => {
          particle.remove();
        });
      }
    }
  
    function lanzarFireworks() {
      const totalFireworks = 9;
      const bigFireworksCount = 3;
      for (let i = 0; i < totalFireworks; i++) {
        setTimeout(() => {
          const x = window.innerWidth * Math.random();
          const y = window.innerHeight * Math.random() * 0.7;
          // Los primeros 3 son grandes
          const isBig = i < bigFireworksCount;
          crearFirework(x, y, isBig);
        }, i * 300); // retraso de 300ms entre cada firework
      }
    }
  
    // --------- LLUVIA sin relámpagos ---------
    (() => {
      const raindrops = [];
      const maxRaindrops = 150;
      const containerWidth = window.innerWidth;
      const containerHeight = window.innerHeight;
      let rainInterval = null;
      let animationFrameId = null;
  
      function randomVelocityRain() {
        const speed = 4 + Math.random() * 4;
        const sway = 1 + Math.random() * 1.5;
        return { speed, sway };
      }
  
      function crearRaindrop() {
        const drop = document.createElement("div");
        drop.classList.add("raindrop");
  
        const x = Math.random() * containerWidth;
        drop.style.left = x + "px";
  
        const width = 1 + Math.random() * 2;
        const height = 10 + Math.random() * 10;
        drop.style.width = width + "px";
        drop.style.height = height + "px";
  
        drop.style.top = "-20px";
  
        const { speed, sway } = randomVelocityRain();
  
        raindrops.push({
          element: drop,
          x,
          y: -20,
          speed,
          sway,
          swayDirection: Math.random() > 0.5 ? 1 : -1,
          swayAmount: 0,
        });
  
        document.body.appendChild(drop);
      }
  
      function updateRaindrops() {
        for (let i = raindrops.length - 1; i >= 0; i--) {
          const drop = raindrops[i];
          drop.y += drop.speed;
          drop.swayAmount += 0.1 * drop.swayDirection;
  
          if (Math.abs(drop.swayAmount) > drop.sway) {
            drop.swayDirection *= -1;
          }
  
          drop.element.style.top = drop.y + "px";
          drop.element.style.left = drop.x + drop.swayAmount + "px";
  
          if (drop.y > containerHeight) {
            drop.element.remove();
            raindrops.splice(i, 1);
          }
        }
        animationFrameId = requestAnimationFrame(updateRaindrops);
      }
  
      function startRain() {
        if (rainInterval) return;
  
        rainInterval = setInterval(() => {
          if (raindrops.length < maxRaindrops) {
            crearRaindrop();
          } else {
            clearInterval(rainInterval);
            rainInterval = null;
          }
        }, 30);
  
        updateRaindrops();
  
        setTimeout(() => {
          clearInterval(rainInterval);
          rainInterval = null;
        }, 8000);
      }
  
      const btnLluvia = document.getElementById("btn-lluvia");
      if (btnLluvia) {
        btnLluvia.addEventListener("click", startRain);
      } else {
        console.warn("No se encontró el botón con id 'btn-lluvia'");
      }
    })();
  
    // --------- EVENTO BOTÓN fuegos artificiales ---------
    const btnFuegos = document.getElementById("btn-fuegos");
    if (btnFuegos) {
      btnFuegos.addEventListener("click", lanzarFireworks);
    } else {
      console.warn("No se encontró el botón con id 'btn-fuegos'");
    }
  })();
  (() => {
    function crearDestello() {
      const sparkle = document.createElement("div");
      sparkle.classList.add("candle-sparkle");
  
      sparkle.style.left = Math.random() * window.innerWidth + "px";
  
      // Tamaño mayor 8 a 14 px
      const size = 8 + Math.random() * 6;
      sparkle.style.width = size + "px";
      sparkle.style.height = size + "px";
  
      document.body.appendChild(sparkle);
  
      setTimeout(() => {
        sparkle.remove();
      }, 5000); // coincide con duración de animación
    }
  
    function startDestellos() {
      let count = 0;
      const maxCount = 40;
  
      const interval = setInterval(() => {
        if (count >= maxCount) {
          clearInterval(interval);
          return;
        }
        crearDestello();
        count++;
      }, 150);
    }
  
    const btnDestellos = document.getElementById("btn-destellos");
    if (btnDestellos) {
      btnDestellos.addEventListener("click", startDestellos);
    } else {
      console.warn("No se encontró el botón con id 'btn-destellos'");
    }
  })();
  (() => {
    function crearPolvoDesde(x, y, colorClass) {
      const dust = document.createElement("div");
      dust.classList.add("fairy-dust", colorClass);
  
      dust.style.left = x + "px";
      dust.style.top = y + "px";
  
      const maxDistance = 150;
      const angle = Math.random() * 2 * Math.PI;
      const distance = Math.random() * maxDistance;
  
      const dx = Math.cos(angle) * distance + "px";
      const dy = Math.sin(angle) * distance + "px";
  
      dust.style.setProperty("--dx", dx);
      dust.style.setProperty("--dy", dy);
  
      document.body.appendChild(dust);
  
      setTimeout(() => {
        dust.remove();
      }, 6000);
    }
  
    function startPolvoHadaRadial(event) {
      const rect = event.target.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
  
      let count = 0;
      const maxCount = 80;
  
      const interval = setInterval(() => {
        if (count >= maxCount) {
          clearInterval(interval);
          return;
        }
        if (count < maxCount / 2) {
          crearPolvoDesde(centerX, centerY, "purple");
        } else {
          crearPolvoDesde(centerX, centerY, "blue");
        }
        count++;
      }, 100);
    }
  
    const btnPolvo = document.getElementById("btn-polvohada");
    if (btnPolvo) {
      btnPolvo.addEventListener("click", startPolvoHadaRadial);
    } else {
      console.warn("No se encontró el botón con id 'btn-polvohada'");
    }
  })();
  (() => {
    function startLucesDiscoteca() {
      const colors = [
        "rgba(255,0,150,0.9)", // rosa
        "rgba(0,200,255,0.9)", // azul aqua
        "rgba(255,255,0,0.9)", // amarillo
        "rgba(0,255,100,0.9)", // verde
        "rgba(255,100,0,0.9)", // naranja
      ];
  
      const rays = [];
  
      for (let i = 0; i < 20; i++) {
        const ray = document.createElement("div");
        ray.classList.add("disco-ray");
  
        const color = colors[Math.floor(Math.random() * colors.length)];
  
        // Gradiente que simula un cono: arriba delgado y abajo ancho
        ray.style.setProperty(
          "--ray-gradient",
          `linear-gradient(to bottom, transparent 0%, ${color} 30%, transparent 100%)`
        );
  
        const startRot = Math.random() * 360 + "deg";
        const endRot = Math.random() * 360 + "deg";
        ray.style.setProperty("--start-rot", startRot);
        ray.style.setProperty("--end-rot", endRot);
  
        ray.style.animationDuration = 1.8 + Math.random() * 1.5 + "s";
  
        document.body.appendChild(ray);
        rays.push(ray);
      }
  
      // Durar más tiempo
      setTimeout(() => {
        rays.forEach((r) => r.remove());
      }, 11000); // 11 segundos
    }
  
    const btnLuces = document.getElementById("btn-lucesdiscoteca");
    if (btnLuces) {
      btnLuces.addEventListener("click", startLucesDiscoteca);
    }
  })();
  (() => {
    let ground;
    let coposActivos = 0;
  
    function crearCapaNieve() {
      if (!ground) {
        ground = document.createElement("div");
        ground.classList.add("snow-ground");
        document.body.appendChild(ground);
  
        // Crear capa inicial de 12px
        ground.style.height = "12px";
      }
    }
  
    function agregarNieveAlSuelo(x) {
      const pedazo = document.createElement("div");
      pedazo.classList.add("snow-chunk");
  
      // Anchura aleatoria entre 10 y 25px
      const width = Math.random() * 15 + 10;
      pedazo.style.width = `${width}px`;
  
      // Altura aleatoria para dar sensación de montículo
      const height = Math.random() * 10 + 5;
      pedazo.style.height = `${height}px`;
  
      // Posición horizontal
      pedazo.style.left = `${x}px`;
  
      // Ajuste vertical para superponer y dar efecto de cúmulo
      const offset = Math.random() * 5;
      pedazo.style.bottom = `${offset}px`;
  
      // Rotación ligera para que no todos sean simétricos
      pedazo.style.transform = `rotate(${Math.random() * 15 - 7.5}deg)`;
  
      ground.appendChild(pedazo);
    }
  
    function crearCopo() {
      const copo = document.createElement("div");
      copo.classList.add("snowflake");
  
      const startX = Math.random() * window.innerWidth;
      copo.style.left = startX + "px";
  
      const size = Math.random() * 8 + 4;
      copo.style.width = `${size}px`;
      copo.style.height = `${size}px`;
  
      copo.style.opacity = Math.random() * 0.5 + 0.5;
  
      const duration = Math.random() * 5 + 5;
      copo.style.animationDuration = `${duration}s`;
  
      document.body.appendChild(copo);
      coposActivos++;
  
      copo.addEventListener("animationend", () => {
        agregarNieveAlSuelo(startX);
        copo.remove();
        coposActivos--;
  
        // eliminar capa si ya no quedan copos
        if (coposActivos === 0 && ground) {
          ground.remove();
          ground = null;
        }
      });
    }
  
    function iniciarNieve() {
      crearCapaNieve();
      const intervalo = setInterval(crearCopo, 100);
  
      setTimeout(() => {
        clearInterval(intervalo);
      }, 10000);
    }
  
    const btnNieve = document.getElementById("btn-nieve");
    if (btnNieve) {
      btnNieve.addEventListener("click", iniciarNieve);
    }
  })();
  (() => {
    function lanzarEstrellas() {
      const total = 7;
      for (let i = 0; i < total; i++) {
        setTimeout(() => {
          const star = document.createElement("div");
          star.classList.add("shooting-star");
          star.textContent = "🌟";
  
          // Posición inicial aleatoria arriba a la derecha
          const startY = Math.random() * window.innerHeight * 0.5;
          star.style.top = startY + "px";
          star.style.right = "0px";
  
          // Duración aleatoria para efecto más natural
          const duration = 2000 + Math.random() * 1000;
          star.style.animation = `shootingStarMove ${duration}ms linear forwards`;
  
          document.body.appendChild(star);
  
          star.addEventListener("animationend", () => star.remove());
        }, i * 300); // retraso entre cada estrella
      }
    }
  
    const btnEstrellas = document.getElementById("btn-estrellas");
    if (btnEstrellas) btnEstrellas.addEventListener("click", lanzarEstrellas);
  })();
  (() => {
    const colors = [
      "red",
      "blue",
      "yellow",
      "pink",
      "orange",
      "purple",
      "green",
      "cyan",
      "magenta",
      "lime",
      "aqua",
      "violet",
    ];
  
    function crearGlobo() {
      const balloon = document.createElement("div");
      balloon.classList.add("balloon");
  
      // Color aleatorio
      const color = colors[Math.floor(Math.random() * colors.length)];
      balloon.style.background = color;
  
      // Posición horizontal aleatoria
      balloon.style.left = Math.random() * window.innerWidth + "px";
  
      // Tamaño aleatorio
      const size = 20 + Math.random() * 30;
      balloon.style.width = `${size}px`;
      balloon.style.height = `${size}px`;
  
      // Sway y rotación aleatoria
      const sway = Math.random() * 100 - 50 + "px";
      const rotate = Math.random() * 40 - 20 + "deg";
      balloon.style.setProperty("--sway", sway);
      balloon.style.setProperty("--rotate", rotate);
  
      // Duración aleatoria
      const duration = 6 + Math.random() * 4;
      balloon.style.animationDuration = `${duration}s`;
      balloon.style.setProperty("--duration", `${duration}s`);
  
      document.body.appendChild(balloon);
  
      balloon.addEventListener("animationend", () => {
        balloon.remove();
      });
    }
  
    function lanzarGlobos() {
      for (let i = 0; i < 50; i++) {
        // más globos para llenar la pantalla
        setTimeout(crearGlobo, i * 100);
      }
    }
  
    const btnGlobos = document.getElementById("btn-globos");
    if (btnGlobos) {
      btnGlobos.addEventListener("click", lanzarGlobos);
    }
  })();
  (() => {
    function startBubbleLife(bubble) {
      // Morir después de 7 segundos
      setTimeout(() => {
        bubble.remove();
      }, 7000);
    }
  
    // Iniciar con burbujas que ya existan en el DOM
    document.querySelectorAll(".bubble").forEach(startBubbleLife);
  
    // Si las burbujas se crean dinámicamente, escuchar el DOM
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((m) => {
        m.addedNodes.forEach((node) => {
          if (node.classList && node.classList.contains("bubble")) {
            startBubbleLife(node);
          }
        });
      });
    });
  
    observer.observe(document.body, { childList: true, subtree: true });
  
    // Detección de colisiones
    function checkCollisions() {
      const bubbleArray = Array.from(document.querySelectorAll(".bubble"));
  
      for (let i = 0; i < bubbleArray.length; i++) {
        for (let j = i + 1; j < bubbleArray.length; j++) {
          const b1 = bubbleArray[i].getBoundingClientRect();
          const b2 = bubbleArray[j].getBoundingClientRect();
  
          const dx = b1.left + b1.width / 2 - (b2.left + b2.width / 2);
          const dy = b1.top + b1.height / 2 - (b2.top + b2.height / 2);
          const distance = Math.sqrt(dx * dx + dy * dy);
  
          if (distance < b1.width / 2 + b2.width / 2) {
            bubbleArray[i].remove();
            bubbleArray[j].remove();
          }
        }
      }
  
      if (document.querySelectorAll(".bubble").length > 0) {
        requestAnimationFrame(checkCollisions);
      }
    }
  
    requestAnimationFrame(checkCollisions);
  })();
  
