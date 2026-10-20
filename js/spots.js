/**
 * 壯遊據點地圖與圖鑑動態互動模組 (spots.js) - Supabase 連線版
 */

document.addEventListener('DOMContentLoaded', async () => {
    // 1. 初始化 Supabase 客戶端 (使用你的新專案資訊)
    const SUPABASE_URL = 'https://jgidphbpizkladzzamyz.supabase.co';
    const SUPABASE_ANON_KEY = 'sb_publishable_miYTEZasCg_uBNOd0wlwNw_dwcP-hJk';
    
    // DOM 元素選取
    const btnViewMap = document.getElementById('btnViewMap');
    const btnViewGrid = document.getElementById('btnViewGrid');
    const mapCanvas = document.getElementById('mapCanvas');
    const spotsGridView = document.getElementById('spotsGridView');
    const spotsCardsGrid = document.getElementById('spotsCardsGrid');
    const gridFilterTags = document.querySelectorAll('.grid-filter-tag');
    const mapFilterTags = document.querySelectorAll('.inline-cat-item');
    const filterTags = [...mapFilterTags, ...gridFilterTags];
    const loadStatus = document.querySelector('.map-sidebar-updating span:last-child');
    const mapArtworkContainer = document.querySelector('.map-artwork-container');

    const modalBackdrop = document.getElementById('spotModalBackdrop');
    const modalCloseBtn = document.getElementById('spotModalCloseBtn');
    const modalSpotCategory = document.getElementById('modalSpotCategory');
    const modalSpotLocation = document.getElementById('modalSpotLocation');
    const modalSpotTitle = document.getElementById('modalSpotTitle');
    const modalSpotDesc = document.getElementById('modalSpotDesc');
    const modalSpotFeatures = document.getElementById('modalSpotFeatures');
    const modalGmapLink = document.getElementById('modalGmapLink');
    const modalSpotMapIframe = document.getElementById('modalSpotMapIframe');

    // 從資料庫抓取所有據點資料
    let SPOTS_DATA = {};
    let selectedCategory = 'all';

    function selectCategory(category) {
        selectedCategory = category;
        filterTags.forEach(tag => {
            const selected = tag.dataset.cat === category;
            tag.classList.toggle('active', selected);
            tag.setAttribute('aria-pressed', String(selected));
        });
        mapArtworkContainer?.querySelectorAll('.map-spot-pin').forEach(pin => {
            pin.style.display = category === 'all' || pin.dataset.category === category ? 'flex' : 'none';
        });
        renderSpotsGrid(category);
    }

    async function loadSpotsFromSupabase() {
        let data;
        try {
            if (!window.supabase) throw new Error('Supabase SDK 未載入');
            const db = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
            const result = await db.from('spots').select('*').order('title', { ascending: true });
            if (result.error) throw result.error;
            data = result.data || [];
        } catch (error) {
            console.error('無法載入據點資料:', error.message);
            if (loadStatus) loadStatus.textContent = '據點載入失敗，請重新整理再試';
            return;
        }

        SPOTS_DATA = {};
        data.forEach(item => {
            SPOTS_DATA[item.id] = {
                town: item.town || '六腳鄉',
                title: item.title,
                category: item.category || '創新與社群',
                shortDesc: item.summary || '',
                desc: item.summary || '暫無詳細介紹...',
                features: item.features || '在地導覽 ‧ 風土體驗',
                // 由後台分別上傳到 Supabase 的代表圖片與地圖 icon。
                photos: [item.image_url || ''],
                illustration: item.icon_url || '',
                gmapQuery: `${item.title} 嘉義`,
                lat: item.lat || 50, // 儲存 X%
                lng: item.lng || 50  // 儲存 Y%
            };
        });

        // 資料載入後動態渲染地圖點位與圖鑑
        renderMapPins();
        selectCategory(selectedCategory);
        if (loadStatus) loadStatus.textContent = data.length ? `已載入 ${data.length} 個據點` : '目前尚無據點資料';
    }

    // 動態渲染地圖上的點位
    function renderMapPins() {
        if (!mapArtworkContainer) return;

        // 清除舊點位（保留底圖與篩選導覽）
        const existingPins = mapArtworkContainer.querySelectorAll('.map-spot-pin');
        existingPins.forEach(pin => pin.remove());

        Object.keys(SPOTS_DATA).forEach(spotKey => {
            const data = SPOTS_DATA[spotKey];
            const pinEl = document.createElement('div');
            pinEl.className = 'map-spot-pin pin-orange pop-down';
            // 使用後台點擊地圖存的 X% (lat) 與 Y% (lng) 進行精準定位
            pinEl.style.top = `${data.lng}%`; 
            pinEl.style.left = `${data.lat}%`;
            pinEl.dataset.spot = spotKey;
            pinEl.dataset.category = data.category;

            pinEl.innerHTML = `
                <div class="pin-marker-bubble"><span class="pin-dot-core"></span></div>
                <div class="pin-popout-preview">
                    ${data.illustration ? `<div class="popout-img-box"><img src="${data.illustration}" alt="${data.title}插畫"></div>` : ''}
                    <span class="popout-name">${data.title}</span>
                </div>
            `;

            // 點擊地圖上的點位時開啟詳細資訊彈窗
            pinEl.addEventListener('click', () => {
                openDetailModal(spotKey);
            });

            mapArtworkContainer.appendChild(pinEl);
        });
    }

    // 開啟詳細資訊互動彈窗
    function openDetailModal(spotKey) {
        const data = SPOTS_DATA[spotKey];
        if (!data || !modalBackdrop) return;

        modalSpotTitle.textContent = data.title;
        modalSpotCategory.textContent = data.category;
        modalSpotLocation.textContent = `📍 ${data.town}`;
        modalSpotDesc.textContent = data.desc;
        modalSpotFeatures.textContent = data.features;

        const searchQuery = encodeURIComponent(data.gmapQuery || `${data.title} 嘉義`);
        if (modalSpotMapIframe) {
            modalSpotMapIframe.src = `https://maps.google.com/maps?q=${searchQuery}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
        }

        modalGmapLink.href = `https://www.google.com/maps/search/?api=1&query=${searchQuery}`;

        modalBackdrop.classList.add('is-active');
        document.body.style.overflow = 'hidden';
    }

    function closeDetailModal() {
        if (!modalBackdrop) return;
        modalBackdrop.classList.remove('is-active');
        document.body.style.overflow = '';
    }

    if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeDetailModal);
    if (modalBackdrop) {
        modalBackdrop.addEventListener('click', (e) => {
            if (e.target === modalBackdrop) closeDetailModal();
        });
    }

    // 渲染圖鑑網格視圖
    function renderSpotsGrid(category = 'all') {
        if (!spotsCardsGrid) return;
        spotsCardsGrid.innerHTML = '';

        Object.keys(SPOTS_DATA).forEach(spotKey => {
            const data = SPOTS_DATA[spotKey];
            if (!data) return;

            if (category !== 'all' && data.category !== category) return;

            const card = document.createElement('div');
            card.className = 'spot-col-card';
            card.innerHTML = `
                <div class="spot-col-img">
                    ${data.photos[0] ? `<img src="${data.photos[0]}" alt="${data.title}">` : '<span>尚未提供代表圖片</span>'}
                </div>
                <div class="spot-col-body">
                    <div class="spot-col-meta">
                        <span class="spot-col-town">📍 ${data.town}</span>
                        <span class="spot-col-tag">${data.category}</span>
                    </div>
                    <h3 class="spot-col-title">${data.title}</h3>
                    <p class="spot-col-desc">${data.shortDesc}</p>
                    <div class="spot-col-foot">詳細內容 ＆ 地圖導航 ➔</div>
                </div>
            `;

            card.addEventListener('click', () => {
                openDetailModal(spotKey);
            });

            spotsCardsGrid.appendChild(card);
        });
    }

    // 視圖切換 (地圖導覽 ⇄ 據點圖鑑)
    if (btnViewMap && btnViewGrid) {
        btnViewMap.addEventListener('click', () => {
            btnViewMap.classList.add('active');
            btnViewGrid.classList.remove('active');
            mapCanvas.style.display = 'block';
            spotsGridView.style.display = 'none';
        });

        btnViewGrid.addEventListener('click', () => {
            btnViewGrid.classList.add('active');
            btnViewMap.classList.remove('active');
            mapCanvas.style.display = 'none';
            spotsGridView.style.display = 'block';
            renderSpotsGrid(selectedCategory);
        });
    }

    // 地圖與圖鑑共用分類狀態，切換視圖與資料載入後仍保留選擇。
    filterTags.forEach(tag => {
        tag.setAttribute('type', 'button');
        tag.setAttribute('aria-pressed', String(tag.dataset.cat === selectedCategory));
        tag.addEventListener('click', () => {
            selectCategory(tag.dataset.cat);
        });
    });

    // 初始化載入資料
    loadSpotsFromSupabase();
});
