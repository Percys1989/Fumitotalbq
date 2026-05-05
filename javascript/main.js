document.addEventListener('DOMContentLoaded', () => {

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
    const banner    = document.querySelector('.descuento-banner');
    const header    = document.getElementById('header');
    const mobileNav = document.getElementById('mobileNav');

    function posicionarHeader() {
        if (!header) return;
        const bannerH = (banner && !banner.classList.contains('hidden'))
            ? banner.offsetHeight
            : 0;
        header.style.top = bannerH + 'px';
        if (mobileNav) {
            mobileNav.style.top = (bannerH + 70) + 'px';
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
                    if (mobileNav) mobileNav.style.top = '70px';
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
        const nombre    = document.getElementById('f-nombre')?.value || '';
        const tel       = document.getElementById('f-tel')?.value || '';
        const direccion = document.getElementById('f-direccion')?.value || '';
        const barrio    = document.getElementById('f-barrio')?.value || '';
        const tipoEl    = document.querySelector('input[name="tipo"]:checked');
        const tipo      = tipoEl ? tipoEl.value : '';
        const servicio  = document.getElementById('f-servicio')?.value || '';
        const msg       = document.getElementById('f-mensaje')?.value || '';

        let text = `Hola, quiero solicitar una cotización con *FumiTotal Servicios BQ*.`;
        if (nombre)    text += `\n\n👤 *Nombre:* ${nombre}`;
        if (tel)       text += `\n📱 *Teléfono:* ${tel}`;
        if (tipo)      text += `\n🏠 *Tipo de inmueble:* ${tipo}`;
        if (direccion) text += `\n📍 *Dirección:* ${direccion}`;
        if (barrio)    text += `\n🗺️ *Barrio:* ${barrio}`;
        if (servicio)  text += `\n🔧 *Servicio:* ${servicio}`;
        if (msg)       text += `\n💬 *Mensaje:* ${msg}`;

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
    const hero        = document.querySelector('.hero');
    const heroSlider  = document.getElementById('heroSlider');
    const heroContent = document.getElementById('heroContent');
    let ticking = false;

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                const scrollY = window.scrollY;
                if (hero && scrollY < hero.offsetHeight) {
                    if (heroSlider)  heroSlider.style.transform  = `translateY(${scrollY * 0.4}px) scale(1.05)`;
                    if (heroContent) heroContent.style.transform = `translateY(${scrollY * 0.15}px)`;
                }
                ticking = false;
            });
            ticking = true;
        }
    });

    // ─── HERO SLIDER ───
    const slides = document.querySelectorAll('.hero-slide');
    const dots   = document.querySelectorAll('.dot');
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
    window.toggleFaq    = toggleFaq;
    window.toggleMenu   = toggleMenu;
    window.closeMenu    = closeMenu;
    window.sendWhatsApp = sendWhatsApp;

});