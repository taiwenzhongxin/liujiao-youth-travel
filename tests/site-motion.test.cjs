const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

function setup(reduced = false) {
    const animations = [];
    function element() {
        return {
            nodeType: 1, isConnected: true,
            matches: () => true, querySelectorAll: () => [],
            contains(target) { return target === this; },
            animate(frames, options) {
                const animation = {
                    frames, options, cancelled: false,
                    finished: new Promise(() => {}),
                    cancel() { this.cancelled = true; }
                };
                animations.push(animation);
                return animation;
            }
        };
    }
    const first = element();
    const all = [first];
    const observed = new Set();
    const events = {};
    const media = {
        matches: reduced, addEventListener(name, callback) { this.change = callback; }
    };
    let intersection, mutation;
    const document = {
        readyState: 'complete', activeElement: null,
        body: { classList: { contains: () => true } },
        querySelectorAll: () => all,
        addEventListener: (name, callback) => { events[name] = callback; }
    };
    function IntersectionObserver(callback) {
        intersection = callback;
        this.observe = target => observed.add(target);
        this.unobserve = target => observed.delete(target);
        this.disconnect = () => observed.clear();
    }
    const context = {
        document, matchMedia: () => media, Element: { prototype: { animate() {} } },
        window: { IntersectionObserver }, IntersectionObserver,
        MutationObserver: function(callback) { mutation = callback; this.observe = () => {}; }
    };
    vm.runInNewContext(fs.readFileSync(path.join(__dirname, '../js/site-motion.js'), 'utf8'), context);
    return {
        first, all, element, observed, animations, events, media, document,
        enter: nodes => intersection(nodes.map(target => ({ target, isIntersecting: true }))),
        add(node) { all.push(node); mutation([{ addedNodes: [node], removedNodes: [] }]); },
        remove(node) { node.isConnected = false; mutation([{ addedNodes: [], removedNodes: [node] }]); }
    };
}

test('late database cards are observed and animated with bounded stagger', () => {
    const s = setup();
    const cards = Array.from({ length: 10 }, s.element);
    cards.forEach(card => s.add(card));
    cards.forEach(card => assert.ok(s.observed.has(card)));
    s.enter(cards);
    assert.equal(s.animations.length, 10);
    assert.ok(s.animations.every(animation => animation.options.delay <= 260));
    cards.forEach(card => assert.ok(!s.observed.has(card)));
});

test('reduced motion disables animations and resumes pending content safely', () => {
    const s = setup();
    s.media.matches = true;
    s.media.change();
    assert.equal(s.observed.size, 0);
    const card = s.element();
    s.add(card);
    assert.equal(s.observed.size, 0);
    s.media.matches = false;
    s.media.change();
    assert.ok(s.observed.has(s.first));
    assert.ok(s.observed.has(card));
    s.enter([card]);
    s.media.matches = true;
    s.media.change();
    assert.ok(s.animations[0].cancelled);
});

test('keyboard focus cancels entrance animation and focused content never fades', () => {
    const s = setup();
    s.enter([s.first]);
    s.events.focusin({ target: s.first });
    assert.ok(s.animations[0].cancelled);
    const card = s.element();
    s.add(card);
    s.document.activeElement = card;
    s.enter([card]);
    assert.equal(s.animations.length, 1);
});

test('removed route nodes are unobserved and running animations cancelled', () => {
    const s = setup();
    const card = s.element();
    s.add(card);
    s.remove(card);
    assert.ok(!s.observed.has(card));
    s.enter([s.first]);
    s.remove(s.first);
    assert.ok(s.animations[0].cancelled);
});

test('all 13 interior pages load motion once and preserve the homepage separation', () => {
    const pages = ['about', 'spots', 'itinerary', 'journal', 'news', 'contact', 'privacy',
        'artisan-detail', 'news-detail', 'itinerary-detail', 'twoday-detail', 'outdoor-detail', 'global-detail'];
    pages.forEach(page => {
        const html = fs.readFileSync(path.join(__dirname, '..', `${page}.html`), 'utf8');
        assert.equal((html.match(/src="js\/site-motion.js"/g) || []).length, 1, page);
        assert.equal((html.match(/href="css\/site-motion.css"/g) || []).length, 1, page);
        assert.match(html, /<body class="site-motion-page /);
    });
    const home = fs.readFileSync(path.join(__dirname, '../index.html'), 'utf8');
    assert.ok(!home.includes('js/site-motion.js'));
});
