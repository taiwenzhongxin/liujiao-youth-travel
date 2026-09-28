/**
 * 戶外教育專案 (outdoor-detail.js) - A~D 方案動態渲染與互動切換腳本
 */
document.addEventListener('DOMContentLoaded', () => {
    // 1. 取得網址列參數 ?route=X，預設為 A
    const urlParams = new URLSearchParams(window.location.search);
    let currentRoute = urlParams.get('route') || 'A';
    currentRoute = currentRoute.toUpperCase();
    if (!OUTDOOR_ROUTES[currentRoute]) {
        currentRoute = 'A';
    }

    // 2. 方案內容渲染函式
    function renderOutdoorRoute(routeId) {
        const data = OUTDOOR_ROUTES[routeId];
        if (!data) return;

        // 更新上方標題與文案
        const elEyebrow = document.getElementById('activeRouteEyebrow');
        const elName = document.getElementById('activeRouteName');
        const elKeywords = document.getElementById('activeRouteKeywords');
        const elSummary = document.getElementById('activeRouteSummary');

        if (elEyebrow) elEyebrow.textContent = data.eyebrow;
        if (elName) elName.textContent = data.mainTitle;
        if (elKeywords) elKeywords.textContent = data.keywords;
        if (elSummary) elSummary.textContent = data.summary;

        // 更新右側「走讀歷程檔案」卡片資料
        if (data.archive) {
            const elTrail = document.getElementById('archiveTrail');
            const elPacing = document.getElementById('archivePacing');
            const elHighlight = document.getElementById('archiveHighlight');

            if (elTrail) elTrail.textContent = data.archive.trail;
            if (elPacing) elPacing.textContent = data.archive.pacing;
            if (elHighlight) elHighlight.textContent = data.archive.highlight;
        }

        // 更新時間軸清單 (Timeline)
        const timelineCol = document.getElementById('timelineItineraryCol');
        if (timelineCol && data.timeline) {
            timelineCol.innerHTML = data.timeline.map(step => `
                <article class="timeline-step-item">
                    <div class="step-time-badge">
                        <span class="time-range">${step.time.replace(' - ', '<br>')}</span>
                        <div class="step-circle-num">${step.num}</div>
                    </div>
                    <div class="step-content-card">
                        <div class="step-thumb">
                            <img src="${step.img}" alt="${step.title}">
                        </div>
                        <div class="step-text-detail">
                            <h3 class="step-heading">${step.title}</h3>
                            <p class="step-desc">${step.desc}</p>
                        </div>
                    </div>
                </article>
            `).join('');
        }

        // 更新上方 A~D 方案按鈕的 Active 狀態
        document.querySelectorAll('.scheme-tab-card').forEach(tab => {
            const tid = tab.getAttribute('data-route');
            if (tid === routeId) {
                tab.classList.add('active');
            } else {
                tab.classList.remove('active');
            }
        });
    }

    // 3. 綁定上方 A~D Tabs 點擊切換
    document.querySelectorAll('.scheme-tab-card').forEach(tab => {
        tab.addEventListener('click', (e) => {
            e.preventDefault();
            const targetRoute = tab.getAttribute('data-route');
            history.pushState(null, '', `?route=${targetRoute}`);
            renderOutdoorRoute(targetRoute);
            document.getElementById('outdoorDetailAnchor').scrollIntoView({ behavior: 'smooth' });
        });
    });

    // 4. 初次載入渲染
    renderOutdoorRoute(currentRoute);

    // 支援上一頁/下一頁瀏覽歷程切換
    window.addEventListener('popstate', () => {
        const p = new URLSearchParams(window.location.search);
        const r = p.get('route') || 'A';
        renderOutdoorRoute(r.toUpperCase());
    });
});