const { test } = require('node:test');
const assert = require('node:assert/strict');
const vm = require('node:vm');
const fs = require('node:fs');
const path = require('node:path');

// Exercise timer lifecycle without network, fonts, or the translation service.
function setup(reduce = false) {
    function element(attrs = {}) {
        const listeners = {};
        const classes = new Set();
        return {
            attrs, listeners, style: { removeProperty() {} },
            classList: { add: value => classes.add(value), remove: value => classes.delete(value),
                contains: value => classes.has(value) },
            addEventListener: (name, callback) => { listeners[name] = callback; },
            setAttribute: (name, value) => { attrs[name] = value; },
            getAttribute: name => attrs[name],
            removeAttribute: name => { delete attrs[name]; },
            contains: () => false
        };
    }
    const ids = Object.fromEntries(['home', 'heroPrevBtn', 'heroNextBtn', 'heroPauseBtn',
        'heroSlideCount', 'heroTextOverlay', 'heroTextBox'].map(id => [id, element()]));
    const slides = ['right', 'right', 'left'].map(align => element({ 'data-align': align }));
    slides[0].classList.add('active');
    const playback = element({ hidden: '' });
    const media = { matches: reduce, addEventListener(name, fn) { this.change = fn; } };
    const timers = new Map();
    let timerId = 0;
    const documentEvents = {};
    const observers = [];
    const document = {
        hidden: false, activeElement: null,
        addEventListener: (name, fn) => { documentEvents[name] = fn; },
        querySelectorAll: selector => selector === '.hero-bg-slide' ? slides : [],
        querySelector: selector => selector === '.hero-playback' ? playback : null,
        getElementById: id => ids[id] || null
    };
    function Observer(callback) {
        observers.push(callback);
        this.observe = () => {};
        this.disconnect = () => {};
    }
    const context = vm.createContext({
        document, history: {}, window: {
            scrollTo() {}, matchMedia: () => media, addEventListener() {}, scrollY: 0,
            IntersectionObserver: Observer
        },
        IntersectionObserver: Observer,
        setInterval(fn) { timers.set(++timerId, fn); return timerId; },
        clearInterval(id) { timers.delete(id); },
        setTimeout(fn) { fn(); return 1; }, clearTimeout() {},
        requestAnimationFrame() { return 1; }
    });
    function run(file) {
        vm.runInContext(fs.readFileSync(path.join(__dirname, '..', 'js', file), 'utf8'), context);
        documentEvents.DOMContentLoaded();
    }
    run('index.js');
    return { ids, slides, media, timers, observers, document, documentEvents, run };
}

test('carousel wraps in either direction and keeps count in sync', () => {
    const s = setup();
    s.ids.heroPrevBtn.listeners.click();
    assert.equal(s.ids.heroSlideCount.textContent, '03 / 03');
    assert.ok(s.slides[2].classList.contains('active'));
    s.ids.heroNextBtn.listeners.click();
    assert.equal(s.ids.heroSlideCount.textContent, '01 / 03');
    assert.equal(s.slides.filter(slide => slide.classList.contains('active')).length, 1);
});

test('pause persists through manual slide changes and visibility changes', () => {
    const s = setup();
    assert.equal(s.timers.size, 1);
    s.ids.heroPauseBtn.listeners.click();
    s.ids.heroNextBtn.listeners.click();
    s.documentEvents.visibilitychange();
    assert.equal(s.timers.size, 0);
    assert.equal(s.ids.heroPauseBtn.attrs['aria-pressed'], 'true');
    s.ids.heroPauseBtn.listeners.click();
    assert.equal(s.timers.size, 1);
});

test('offscreen and hidden tabs stop timers; returning creates only one timer', () => {
    const s = setup();
    s.observers[0]([{ isIntersecting: false }]);
    assert.equal(s.timers.size, 0);
    s.observers[0]([{ isIntersecting: true }]);
    assert.equal(s.timers.size, 1);
    s.document.hidden = true;
    s.documentEvents.visibilitychange();
    assert.equal(s.timers.size, 0);
    s.document.hidden = false;
    s.documentEvents.visibilitychange();
    assert.equal(s.timers.size, 1);
});

test('reduced motion starts paused, allows manual navigation and reacts to preference', () => {
    const s = setup(true);
    assert.equal(s.timers.size, 0);
    s.ids.heroNextBtn.listeners.click();
    assert.equal(s.ids.heroSlideCount.textContent, '02 / 03');
    assert.equal(s.timers.size, 0);
    s.media.matches = false;
    s.media.change();
    assert.equal(s.timers.size, 1);
    s.media.matches = true;
    s.media.change();
    assert.equal(s.timers.size, 0);
    // Enhancement initializes safely even without animation-capable elements.
    s.run('home-motion.js');
    s.media.change();
});
