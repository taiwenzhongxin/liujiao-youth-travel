// Shared front-page motion. Content stays visible without animation support.
(() => {
    function init() {
        if (!document.body.classList.contains('site-motion-page')) return;
        const reduced = matchMedia('(prefers-reduced-motion: reduce)');
        if (!Element.prototype.animate || !('IntersectionObserver' in window)) return;
        const seen = new WeakSet();
        const pending = new Set();
        const running = new Map();
        const selector = [
            '.hero-heading-block > *', '.compact-hero-text > *',
            '.who-left-col', '.who-right-col', '.belief-left-col', '.belief-right-col',
            '.way-left-col', '.pillar-item-card', '.silver-left-col', '.silver-right-col',
            '.topics-header-wrap', '.topic-compact-card', '.cta-left-text', '.cta-right-actions',
            '.routes-header-editorial', '.route-deck-card',
            '.journal-controls-bar', '.journal-card', '.news-filter-bar',
            '.news-featured-card', '.news-list-row', '.spot-col-card',
            '.view-switch-control', '.grid-filter-bar',
            '.scheme-tab-card', '.route-header-block', '.timeline-step-item',
            '.route-specs-box', '.route-archive-card', '.other-route-card',
            '.day-header-box', '.timeline-node-card', '.twoday-archive-card',
            '.profile-photo-box', '.profile-meta-block', '.profile-quote-callout', '.qa-item-card',
            '.news-article-content > p', '.news-article-content > h2',
            '.news-article-content > h3', '.news-article-content > figure',
            '.news-article-content > img', '.news-article-content > blockquote',
            '#newsSectionsContainer > *', '.news-sidebar-col > *', '.article-share-bar',
            '.form-header-line', '.info-widget-card',
            '.legal-title', '.legal-section-title', '.legal-text'
        ].join(',');

        function cancelWithin(target) {
            running.forEach((animation, element) => {
                if (element === target || element.contains(target)) animation.cancel();
            });
        }
        const observer = new IntersectionObserver(entries => {
            // Stagger only elements entering together, so long lists never wait seconds.
            let order = 0;
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                const element = entry.target;
                observer.unobserve(element);
                pending.delete(element);
                if (reduced.matches || element.contains(document.activeElement)) return;
                const animation = element.animate([
                    { opacity: 0, translate: '0 24px' },
                    { opacity: 1, translate: '0 0' }
                ], {
                    duration: 760, delay: Math.min(order++ * 65, 260),
                    easing: 'cubic-bezier(0.16, 1, 0.3, 1)', fill: 'backwards'
                });
                running.set(element, animation);
                const cleanup = () => {
                    if (running.get(element) === animation) running.delete(element);
                };
                animation.finished.then(cleanup, cleanup);
            });
        }, { threshold: 0.08 });

        function register(root) {
            if (reduced.matches) return;
            const elements = [];
            if (root.matches?.(selector)) elements.push(root);
            elements.push(...root.querySelectorAll(selector));
            elements.forEach(element => {
                if (seen.has(element)) return;
                seen.add(element);
                pending.add(element);
                observer.observe(element);
            });
        }
        register(document);
        // Supabase results and itinerary switches insert new nodes after page load.
        const mutations = new MutationObserver(records => {
            records.forEach(record => {
                record.removedNodes.forEach(node => {
                    if (node.nodeType !== 1) return;
                    [node, ...node.querySelectorAll(selector)].forEach(element => {
                        observer.unobserve(element);
                        if (pending.delete(element)) seen.delete(element);
                    });
                });
                record.addedNodes.forEach(node => {
                    if (node.nodeType === 1) register(node);
                });
            });
            running.forEach((animation, element) => {
                if (!element.isConnected) animation.cancel();
            });
        });
        mutations.observe(document.body, { childList: true, subtree: true });
        // Never leave focused links/controls fading while a keyboard user interacts.
        document.addEventListener('focusin', event => cancelWithin(event.target));
        document.addEventListener('pointerdown', event => cancelWithin(event.target), { passive: true });
        reduced.addEventListener('change', () => {
            if (reduced.matches) {
                running.forEach(animation => animation.cancel());
                observer.disconnect();
                pending.forEach(element => seen.delete(element));
                pending.clear();
            } else {
                // Resume registration cleanly for content added while motion was off.
                register(document);
            }
        });
    }
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init, { once: true });
    } else {
        init();
    }
})();
