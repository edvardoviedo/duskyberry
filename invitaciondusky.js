

// Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navMobile = document.querySelector('.nav-mobile');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMobile.classList.toggle('active');
});

// Countdown Timer
const countdown = document.getElementById('countdown');
const eventDate = new Date('Dec 31, 2025 20:00:00').getTime();

const updateCountdown = () => {
    const now = new Date().getTime();
    const distance = eventDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    if (countdown) {
        countdown.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;
    }

    if (distance < 0) {
        clearInterval(countdownInterval);
        if (countdown) {
            countdown.innerHTML = '¡El evento ha comenzado!';
        }
    }
};

const countdownInterval = setInterval(updateCountdown, 1000);

// Add to Calendar
const addToCalendarButton = document.getElementById('add-to-calendar');

if (addToCalendarButton) {
    addToCalendarButton.addEventListener('click', () => {
        const event = {
            title: 'Mi Evento Especial',
            start: '20251231T200000',
            end: '20260101T020000',
            description: '¡No te pierdas mi increíble evento!',
            location: 'Salón de Eventos Central'
        };

        const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
DTSTART:${event.start}
DTEND:${event.end}
SUMMARY:${event.title}
DESCRIPTION:${event.description}
LOCATION:${event.location}
END:VEVENT
END:VCALENDAR`;

        const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'evento.ics';
        link.click();
    });
}

// Gallery
const galleryGrid = document.querySelector('.gallery-grid');
const prevGalleryButton = document.getElementById('prev-gallery');
const nextGalleryButton = document.getElementById('next-gallery');

const images = [
    "Tu foto 1",
    "Tu foto 2",
    "Tu foto 3",
    "Tu foto 4",
    "Tu foto 5",
    "Tu foto 6"
];

let currentImageIndex = 0;

const renderGallery = () => {
    if (galleryGrid) {
        galleryGrid.innerHTML = "";
        for (let i = currentImageIndex; i < currentImageIndex + 3 && i < images.length; i++) {
            const galleryItem = document.createElement("div");
            galleryItem.classList.add("gallery-item");
            galleryItem.innerHTML = `<div class="gallery-placeholder">${images[i]}</div>`;
            galleryGrid.appendChild(galleryItem);
        }
    }
};

if (prevGalleryButton) {
    prevGalleryButton.addEventListener('click', () => {
        currentImageIndex = Math.max(0, currentImageIndex - 3);
        renderGallery();
    });
}

if (nextGalleryButton) {
    nextGalleryButton.addEventListener('click', () => {
        currentImageIndex = Math.min(images.length - 3, currentImageIndex + 3);
        renderGallery();
    });
}

renderGallery();

// Confetti
const form = document.querySelector('.contact-form');

if (form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        // Aquí iría la lógica para enviar el formulario

        // Confetti animation
        const canvas = document.createElement('canvas');
        document.body.appendChild(canvas);
        canvas.style.position = 'fixed';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.style.zIndex = '10000';

        const confetti = window.confetti.create(canvas, {
            resize: true,
            useWorker: true
        });

        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
        });

        setTimeout(() => {
            document.body.removeChild(canvas);
        }, 3000);
    });
}

// Intersection Observer for animations
const sections = document.querySelectorAll('section');

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = `fadeInUp 1s ease-out forwards`;
        }
    });
}, { threshold: 0.1 });

sections.forEach(section => {
    observer.observe(section);
});

const keyframes = `
@keyframes fadeInUp {
    0% {
        opacity: 0;
        transform: translateY(20px);
    }
    100% {
        opacity: 1;
        transform: translateY(0);
    }
}
`;

const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = keyframes;
document.head.appendChild(styleSheet);


