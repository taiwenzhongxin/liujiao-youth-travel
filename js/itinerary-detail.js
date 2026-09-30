/**
 * 一日遊規劃詳情頁動態渲染與方案切換腳本 (itinerary-detail.js)
 */
document.addEventListener('DOMContentLoaded', () => {
    // 1. 取得網址列參數 ?route=X 或 hash #routeX，預設為 A
    const urlParams = new URLSearchParams(window.location.search);
    let currentRoute = urlParams.get('route') || window.location.hash.replace('#route', '') || 'A';
    currentRoute = currentRoute.toUpperCase();
    if (!ITINERARY_ROUTES[currentRoute]) {
        currentRoute = 'A';
    }

    // 2. 核心渲染函式
    function renderRoute(routeId) {
        const data = ITINERARY_ROUTES[routeId];
        if (!data) return;

        // 更新上方標題與文案
        document.getElementById('activeRouteEyebrow').textContent = data.eyebrow;
        document.getElementById('activeRouteName').textContent = data.mainTitle;
        document.getElementById('activeRouteKeywords').textContent = data.keywords;
        document.getElementById('activeRouteSummary').textContent = data.summary;

        // 更新路線指南規格卡
        const specTrack = document.getElementById('specTrack');
        const specTransport = document.getElementById('specTransport');
        const specHighlight = document.getElementById('specHighlight');
        const btnRouteGmap = document.getElementById('btnRouteGmap');

        if (specTrack) specTrack.textContent = data.specs.track || '六腳與朴子地方據點巡禮';
        if (specTransport) specTransport.textContent = data.specs.transport || '適合步行與自行騎乘';
        if (specHighlight) specHighlight.textContent = data.specs.highlight || '在地文史走讀與工藝體驗';
        
        if (btnRouteGmap && data.specs.mapUrl) {
            btnRouteGmap.href = data.specs.mapUrl;
        }

        // 更新時間軸清單 (Timeline)
        const timelineCol = document.getElementById('timelineItineraryCol');
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
                        <div class="step-title-line">
                            <h3 class="step-heading">${step.title}</h3>
                            <span class="step-type-pill">${step.pill}</span>
                        </div>
                        <div class="step-location-tag">${step.location}</div>
                        <p class="step-desc">${step.desc}</p>
                    </div>
                </div>
            </article>
        `).join('');

        // 更新手繪路線地圖 SVG 標記點
        const svgMap = document.getElementById('routeVectorMap');
        if (svgMap) {
            let pathD = "M 200,40 Q 140,110 180,160 T 220,220";
            let circlesHtml = data.mapMarkers.map(m => `
                <circle cx="${m.x}" cy="${m.y}" r="10" fill="#D96328" />
                <text x="${m.x}" y="${m.y + 4}" fill="#FFF" font-size="10" font-weight="bold" text-anchor="middle">${m.num}</text>
                <text x="${m.x < 150 ? m.x + 16 : m.x - 16}" y="${m.y + 4}" fill="#333" font-size="9" text-anchor="${m.x < 150 ? 'start' : 'end'}">${m.title}</text>
            `).join('');

            svgMap.innerHTML = `
                <rect x="10" y="10" width="260" height="240" rx="12" fill="#F8F6F0"/>
                <path d="${pathD}" stroke="#D96328" stroke-width="2" stroke-dasharray="4 4" opacity="0.8"/>
                ${circlesHtml}
            `;
        }

        // 更新上方 A~F Tabs 的 active 狀態
        document.querySelectorAll('.scheme-tab-card').forEach(tab => {
            const tid = tab.getAttribute('data-route');
            if (tid === routeId) {
                tab.classList.add('active');
            } else {
                tab.classList.remove('active');
            }
        });

        // 更新底部「其他路線推薦」網格
        const otherGrid = document.getElementById('otherRoutesGrid');
        if (otherGrid) {
            const others = Object.keys(ITINERARY_ROUTES).filter(k => k !== routeId);
            otherGrid.innerHTML = others.map(k => {
                const r = ITINERARY_ROUTES[k];
                return `
                    <a href="javascript:void(0);" class="other-route-card" data-route="${r.id}">
                        <div class="other-thumb">
                            <img src="${r.thumbImg}" alt="${r.mainTitle}">
                        </div>
                        <div class="other-info">
                            <strong>${r.id} ${r.tabTitle}</strong>
                            <span class="arrow">➔</span>
                        </div>
                    </a>
                `;
            }).join('');

            // 綁定底部推薦卡片點擊切換
            otherGrid.querySelectorAll('.other-route-card').forEach(card => {
                card.addEventListener('click', () => {
                    const targetRoute = card.getAttribute('data-route');
                    history.pushState(null, '', `?route=${targetRoute}`);
                    renderRoute(targetRoute);
                    document.getElementById('routeDetailAnchor').scrollIntoView({ behavior: 'smooth' });
                });
            });
        }
    }

    // 3. 綁定上方 A~F Tabs 點擊事件
    document.querySelectorAll('.scheme-tab-card').forEach(tab => {
        tab.addEventListener('click', (e) => {
            e.preventDefault();
            const targetRoute = tab.getAttribute('data-route');
            history.pushState(null, '', `?route=${targetRoute}`);
            renderRoute(targetRoute);
            document.getElementById('routeDetailAnchor').scrollIntoView({ behavior: 'smooth' });
        });
    });

    // 4. 初次載入渲染
    renderRoute(currentRoute);

    // 支援瀏覽器上一頁/下一頁切換
    window.addEventListener('popstate', () => {
        const p = new URLSearchParams(window.location.search);
        const r = p.get('route') || 'A';
        renderRoute(r.toUpperCase());
    });
});