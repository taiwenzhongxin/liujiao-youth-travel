// ==================================================
// 嘉義六腳青年壯遊點 - 首頁專屬控制 (index.js)
// ==================================================

// 網頁重新整理時強制回到最頂部
if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}
window.scrollTo(0, 0);

document.addEventListener('DOMContentLoaded', () => {
    // 1. 點擊側邊抽屜導覽連結時自動收起選單
    const sidebarLinks = document.querySelectorAll('.sidebar-tabs .tab-item a');
    sidebarLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (typeof window.closeSidebar === 'function') {
                window.closeSidebar();
            }
        });
    });

    // 2. 全景電影感主視覺 (Hero Carousel) 輪播控制
    const slides = document.querySelectorAll('.hero-bg-slide');
    const prevBtn = document.getElementById('heroPrevBtn');
    const nextBtn = document.getElementById('heroNextBtn');
    const textOverlay = document.getElementById('heroTextOverlay');
    const textBox = document.getElementById('heroTextBox');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const pauseBtn = document.getElementById('heroPauseBtn');
    const counter = document.getElementById('heroSlideCount');

    if (slides.length > 0) {
        let currentIndex = 0;
        const slideDuration = 20000; // 每 20 秒自動切換一次
        let slideTimer = null;
        let userPaused = reducedMotion.matches;
        let heroVisible = true;
        let alignTimer = null;
        const hero = document.getElementById('home');
        document.querySelector('.hero-playback')?.removeAttribute('hidden');

        function updatePlayback() {
            if (!pauseBtn) return;
            pauseBtn.textContent = userPaused ? '播放輪播' : '暫停輪播';
            pauseBtn.setAttribute('aria-label', userPaused ? '播放自動輪播' : '暫停自動輪播');
            pauseBtn.setAttribute('aria-pressed', String(userPaused));
        }

        function goToSlide(index) {
            const nextIndex = (index + slides.length) % slides.length;
            const currentSlide = slides[currentIndex];
            const targetSlide = slides[nextIndex];

            // 讀取當前與目標對齊方向
            const currentAlign = currentSlide.getAttribute('data-align') || 'right';
            const targetAlign = targetSlide.getAttribute('data-align') || 'right';

            // 切換背景投影片狀態
            currentSlide.classList.remove('active');
            targetSlide.classList.add('active');
            currentIndex = nextIndex;
            if (counter) counter.textContent = `${String(currentIndex + 1).padStart(2, '0')} / ${String(slides.length).padStart(2, '0')}`;

            // 若對齊方向改變（例如右側切換至左側水道頭），觸發淡入淡出換邊
            if (textOverlay && textBox) {
                clearTimeout(alignTimer);
                if (currentAlign !== targetAlign && !reducedMotion.matches) {
                    textBox.classList.add('text-switching');
                }
                alignTimer = setTimeout(() => {
                    if (targetAlign === 'left') {
                        textOverlay.classList.add('align-left');
                    } else {
                        textOverlay.classList.remove('align-left');
                    }
                    textBox.classList.remove('text-switching');
                }, reducedMotion.matches ? 0 : 350);
            }
        }

        function startAutoSlide() {
            if (slideTimer) clearInterval(slideTimer);
            if (userPaused || document.hidden || !heroVisible || hero?.contains(document.activeElement)) return;
            slideTimer = setInterval(() => {
                goToSlide(currentIndex + 1);
            }, slideDuration);
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                goToSlide(currentIndex + 1);
                startAutoSlide();
            });
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                goToSlide(currentIndex - 1);
                startAutoSlide();
            });
        }

        pauseBtn?.addEventListener('click', () => {
            userPaused = !userPaused;
            updatePlayback();
            startAutoSlide();
        });
        document.addEventListener('visibilitychange', startAutoSlide);
        hero?.addEventListener('focusin', startAutoSlide);
        hero?.addEventListener('focusout', () => setTimeout(startAutoSlide, 0));
        reducedMotion.addEventListener('change', () => {
            userPaused = reducedMotion.matches;
            updatePlayback();
            startAutoSlide();
        });
        if ('IntersectionObserver' in window && hero) {
            new IntersectionObserver(([entry]) => {
                heroVisible = entry.isIntersecting;
                startAutoSlide();
            }).observe(hero);
        }
        updatePlayback();
        startAutoSlide();
    }

    // 捲動視差由 home-motion.js 統一管理，支援減少動態效果。

    // 4. 頂部導覽列：滾動透明/毛玻璃切換監聽
    const siteHeader = document.getElementById('siteHeader');

    function updateHeaderBackground() {
        if (!siteHeader) return;
        if (window.scrollY > 40) {
            siteHeader.classList.add('scrolled');
        } else {
            siteHeader.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', updateHeaderBackground, { passive: true });
    updateHeaderBackground(); // 頁面載入時即時檢查一次
});
