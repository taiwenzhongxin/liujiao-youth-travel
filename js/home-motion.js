// Original motion inspired by split text, scroll reveals and organic contours.
// Elements remain readable when JS, IntersectionObserver or WAAPI is unavailable.
document.addEventListener('DOMContentLoaded', () => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
    const active = new Set();
    const observers = [];
    const ease = 'cubic-bezier(0.16, 1, 0.3, 1)';

    function animate(element, frames, options = {}) {
        if (!element || reduced.matches || !element.animate) return;
        const animation = element.animate(frames, { duration: 1000, easing: ease, ...options });
        active.add(animation);
        animation.finished.then(() => active.delete(animation), () => active.delete(animation));
    }

    document.querySelectorAll('.hero-title-line, .hero-desc-cn').forEach((element, index) => {
        animate(element, [
            { opacity: 0, transform: 'translateY(36px)', clipPath: 'inset(0 0 100% 0)' },
            { opacity: 1, transform: 'translateY(0)', clipPath: 'inset(0 0 0% 0)' }
        ], { delay: index * 130, fill: 'backwards' });
    });

    function onEnter(elements, callback) {
        if (reduced.matches || !('IntersectionObserver' in window)) return;
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                observer.unobserve(entry.target);
                callback(entry.target);
            });
        }, { threshold: 0.12 });
        elements.forEach(element => observer.observe(element));
        observers.push(observer);
    }

    const revealGroups = [
        ['.about-text-column > *', 75],
        ['.about-collage-column', 0],
        ['.journey-header-grid > *', 90],
        ['.journey-card', 110],
        ['.cta-center-action > *', 85]
    ];
    revealGroups.forEach(([selector, stagger]) => {
        const elements = [...document.querySelectorAll(selector)];
        onEnter(elements, element => {
            animate(element, [
                { opacity: 0, translate: '0 32px' },
                { opacity: 1, translate: '0 0' }
            ], { delay: elements.indexOf(element) * stagger, fill: 'backwards' });
        });
    });

    const route = document.querySelector('.stepper-svg path');
    if (route) {
        const ink = route.cloneNode();
        ink.classList.add('journey-route-ink');
        ink.setAttribute('pathLength', '1');
        ink.setAttribute('stroke-dasharray', '1');
        ink.setAttribute('aria-hidden', 'true');
        route.after(ink);
        onEnter([ink.ownerSVGElement], () => animate(ink, [
            { strokeDashoffset: 1 }, { strokeDashoffset: 0 }
        ], { duration: 1800 }));
    }

    const collage = document.querySelector('.about-collage-column');
    const cta = document.querySelector('.cta-bg-layer');
    const marquee = document.getElementById('heroMarquee');
    let frame = 0;
    function updateScroll() {
        frame = 0;
        if (reduced.matches) return;
        [collage, cta].forEach(element => {
            if (!element) return;
            const rect = element.parentElement.getBoundingClientRect();
            if (rect.bottom < 0 || rect.top > innerHeight) return;
            const offset = Math.max(-18, Math.min(18,
                (innerHeight / 2 - rect.top - rect.height / 2) * 0.045));
            element.style.translate = `0 ${offset}px`;
        });
        if (marquee && scrollY < innerHeight * 1.5) {
            marquee.style.transform = `translateX(${-scrollY * 0.25}px)`;
        }
    }
    function scheduleScroll() {
        if (!frame && !reduced.matches) frame = requestAnimationFrame(updateScroll);
    }
    window.addEventListener('scroll', scheduleScroll, { passive: true });
    window.addEventListener('resize', scheduleScroll);
    scheduleScroll();

    const cards = [...document.querySelectorAll('.journey-card')];
    const buttons = [...document.querySelectorAll('.btn-editorial-pill, .btn-cta-orange-pill')];
    function resetPointer() {
        [...cards, ...buttons].forEach(element => {
            ['--tilt-x', '--tilt-y', '--magnet-x', '--magnet-y'].forEach(name => element.style.removeProperty(name));
        });
    }
    [...cards, ...buttons].forEach(element => {
        element.addEventListener('pointermove', event => {
            if (reduced.matches || !finePointer.matches || event.pointerType === 'touch') return;
            const rect = element.getBoundingClientRect();
            const x = (event.clientX - rect.left) / rect.width - 0.5;
            const y = (event.clientY - rect.top) / rect.height - 0.5;
            if (element.classList.contains('journey-card')) {
                element.style.setProperty('--tilt-x', `${-y * 6}deg`);
                element.style.setProperty('--tilt-y', `${x * 8}deg`);
            } else {
                element.style.setProperty('--magnet-x', `${x * 10}px`);
                element.style.setProperty('--magnet-y', `${y * 8}px`);
            }
        });
        element.addEventListener('pointerleave', resetPointer);
        element.addEventListener('pointercancel', resetPointer);
        element.addEventListener('blur', resetPointer);
    });
    finePointer.addEventListener('change', resetPointer);
    reduced.addEventListener('change', () => {
        if (reduced.matches) {
            active.forEach(animation => animation.cancel());
            observers.forEach(observer => observer.disconnect());
            resetPointer();
            [collage, cta].forEach(element => element?.style.removeProperty('translate'));
            marquee?.style.removeProperty('transform');
        } else {
            scheduleScroll();
        }
    });
});
