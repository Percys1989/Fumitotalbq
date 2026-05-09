document.addEventListener('DOMContentLoaded', () => {

    // ─── WHATSAPP ICON HELPER ───
    // Fuente única del SVG de WhatsApp. Todos los íconos del sitio
    // se generan desde aquí para evitar duplicación en el HTML.
    function whatsappIconSVG({ size = 20, fill = 'white' } = {}) {
        return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"
                     width="${size}" height="${size}" fill="${fill}"
                     style="flex-shrink:0" aria-hidden="true">
                  <path d="M24 4C13 4 4 13 4 24c0 3.6 1 7 2.7 10L4 44l10.3-2.7C17.1 43
                           20.5 44 24 44c11 0 20-9 20-20S35 4 24 4zm0 36c-3.1 0-6.1-.8-8.7-2.4l-.6-.4-6.1
                           1.6 1.6-5.9-.4-.6C8.8 30.1 8 27.1 8 24 8 15.2 15.2 8 24 8s16 7.2 16
                           16-7.2 16-16 16zm8.7-11.8c-.5-.2-2.8-1.4-3.2-1.5-.4-.2-.7-.2-1
                           .2-.3.5-1.2 1.5-1.5 1.8-.3.3-.5.3-1 .1-.5-.2-2-.7-3.8-2.3-1.4-1.2-2.3-2.8-2.6-3.2-.3-.5
                           0-.7.2-.9.2-.2.5-.5.7-.7.2-.2.3-.5.4-.8.1-.3 0-.6-.1-.8-.1-.2-1-2.5-1.4-3.4-.4-.9-.8-.8-1-.8h-.9c-.3
                           0-.8.1-1.2.6-.4.5-1.6 1.6-1.6 3.8s1.7 4.4 1.9 4.7c.2.3 3.3 5.1 8 7.1 1.1.5 2 .8
                           2.7 1 1.1.3 2.2.3 3 .2.9-.1 2.8-1.1 3.2-2.2.4-1.1.4-2 .3-2.2-.2-.2-.5-.3-1-.5z"/>
                </svg>`;
    }

    // Inyectar el SVG en todos los elementos marcados con data-wa-icon
    // Uso en HTML: <span data-wa-icon data-size="20" data-fill="white"></span>
    document.querySelectorAll('[data-wa-icon]').forEach(el => {
        const size = el.dataset.size || 20;
        const fill = el.dataset.fill || 'white';
        el.innerHTML = whatsappIconSVG({ size: Number(size), fill });
    });

    // ─── FAQ TOGGLE ───
    function toggleFaq(btn) {
        const item = btn.closest('.faq-item');
        const isOpen = item.classList.contains('open');
        document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
        if (!isOpen) item.classList.add('open');
    }

    // ─── MOBILE MENU ───
    function toggleMenu() {
        document.getElementById('mobileNav').classList.toggle('show');
    }

    function closeMenu() {
        document.getElementById('mobileNav').classList.remove('show');
    }

    // ─── BANNER + HEADER POSICIONAMIENTO ───
    const banner = document.querySelector('.descuento-banner');
    const header = document.getElementById('header');
    const mobileNav = document.getElementById('mobileNav');

    function posicionarHeader() {
        if (!header) return;
        const bannerH = (banner && !banner.classList.contains('hidden'))
            ? banner.offsetHeight
            : 0;
        header.style.top = bannerH + 'px';
        if (mobileNav) {
            mobileNav.style.top = (bannerH + header.offsetHeight) + 'px';
        }
    }

    // Ejecutar después de que el DOM esté pintado
    setTimeout(posicionarHeader, 0);
    window.addEventListener('resize', posicionarHeader);

    // ─── SCROLL: ocultar banner y subir header ───
    window.addEventListener('scroll', () => {
        if (banner) {
            if (window.scrollY > 80) {
                if (!banner.classList.contains('hidden')) {
                    banner.classList.add('hidden');
                    header.style.top = '0px';
                    if (mobileNav) mobileNav.style.top = (header.offsetHeight) + 'px';
                }
            } else {
                if (banner.classList.contains('hidden')) {
                    banner.classList.remove('hidden');
                    // Dar tiempo a que el banner recupere su altura antes de leer
                    setTimeout(posicionarHeader, 350);
                }
            }
        }

        if (header) {
            header.style.boxShadow = window.scrollY > 10
                ? '0 4px 24px rgba(26,175,230,0.18)'
                : '0 2px 20px rgba(26,175,230,0.1)';
        }
    });

    // ─── WHATSAPP FORM ───
    function sendWhatsApp() {
        const nombre = document.getElementById('f-nombre')?.value || '';
        const tel = document.getElementById('f-tel')?.value || '';
        const direccion = document.getElementById('f-direccion')?.value || '';
        const barrio = document.getElementById('f-barrio')?.value || '';
        const tipoEl = document.querySelector('input[name="tipo"]:checked');
        const tipo = tipoEl ? tipoEl.value : '';
        const servicio = document.getElementById('f-servicio')?.value || '';
        const msg = document.getElementById('f-mensaje')?.value || '';

        if (!nombre) {
            alert('Por favor ingresa tu nombre completo.');
            document.getElementById('f-nombre').focus();
            return;
        }

        if (!tel || tel.length < 7) {
            alert('Por favor ingresa un teléfono válido.');
            document.getElementById('f-tel').focus();
            return;
        }

        let text = `Hola, quiero solicitar una cotización con *FumiTotal Servicios BQ*.`;
        if (nombre) text += `\n\n👤 *Nombre:* ${nombre}`;
        if (tel) text += `\n📱 *Teléfono:* ${tel}`;
        if (tipo) text += `\n🏠 *Tipo de inmueble:* ${tipo}`;
        if (direccion) text += `\n📍 *Dirección:* ${direccion}`;
        if (barrio) text += `\n🗺️ *Barrio:* ${barrio}`;
        if (servicio) text += `\n🔧 *Servicio:* ${servicio}`;
        if (msg) text += `\n💬 *Mensaje:* ${msg}`;

        window.open(`https://wa.me/573002945139?text=${encodeURIComponent(text)}`, '_blank');
    }

    // ─── SCROLL REVEAL ───
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                e.target.style.opacity = '1';
                e.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.ventaja-item, .precio-card, .testimonio-card, .sector-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(el);
    });

    // ─── CAROUSEL PERFORMANCE ───
    const carousel = document.querySelector('.services-track');
    if (carousel) {
        const observerCarousel = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                carousel.style.animationPlayState = entry.isIntersecting ? 'running' : 'paused';
            });
        });
        observerCarousel.observe(carousel);
    }

    // ─── PARALLAX HERO ───
    const hero = document.querySelector('.hero');
    const heroSlider = document.getElementById('heroSlider');
    const heroContent = document.getElementById('heroContent');
    let ticking = false;

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                const scrollY = window.scrollY;
                if (hero && scrollY < hero.offsetHeight) {
                    if (heroSlider) heroSlider.style.transform = `translateY(${scrollY * 0.4}px) scale(1.05)`;
                    if (heroContent) heroContent.style.transform = `translateY(${scrollY * 0.15}px)`;
                }
                ticking = false;
            });
            ticking = true;
        }
    });

    // ─── HERO SLIDER ───
    const slides = document.querySelectorAll('.hero-slide');
    const dots = document.querySelectorAll('.dot');
    let currentSlide = 0;
    let interval;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.remove('active');
            dots[i] && dots[i].classList.remove('active');
        });
        slides[index].classList.add('active');
        dots[index] && dots[index].classList.add('active');
        currentSlide = index;
    }

    function nextSlide() {
        showSlide((currentSlide + 1) % slides.length);
    }

    function startSlider() {
        interval = setInterval(nextSlide, 5000);
    }

    function resetSlider() {
        clearInterval(interval);
        startSlider();
    }

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
            resetSlider();
        });
    });

    if (slides.length > 0) {
        showSlide(0);
        startSlider();
    }

    // ─── EXPONER FUNCIONES AL SCOPE GLOBAL ───
    // Necesario para que los onclick="" en el HTML funcionen correctamente
    window.toggleFaq = toggleFaq;
    window.toggleMenu = toggleMenu;
    window.closeMenu = closeMenu;
    window.sendWhatsApp = sendWhatsApp;

    // ─── SCROLL TO TOP ───
    const scrollTopBtn = document.getElementById('scrollTop');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});