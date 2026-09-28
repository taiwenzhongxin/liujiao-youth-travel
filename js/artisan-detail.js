/**
 * 職人專訪問答詳情頁 - 動態渲染與互動切換腳本 (artisan-detail.js)
 */
document.addEventListener('DOMContentLoaded', () => {
    // 1. 取得網址列參數 ?id=X，預設為 1
    const urlParams = new URLSearchParams(window.location.search);
    let currentId = parseInt(urlParams.get('id'), 10) || 1;
    if (!ARTISANS_DATA[currentId]) {
        currentId = 1;
    }

    const totalArtisans = Object.keys(ARTISANS_DATA).length;

    // 2. 渲染指定職人詳情函式
    function renderArtisan(id) {
        const data = ARTISANS_DATA[id];
        if (!data) return;

        // 更新網頁標題
        document.title = `${data.name} ｜ 訪談問答 ｜ 職人故事 ｜ 嘉義青年壯遊`;

        // 同步更新頂部麵包屑文字
        const crumbEl = document.getElementById('crumbArtisanName');
        if (crumbEl) {
            crumbEl.textContent = `${data.name} 老師專訪`;
        }

        // 更新頂部子導覽列分頁計數
        const counterEl = document.getElementById('artisanCounter');
        if (counterEl) {
            counterEl.textContent = `${data.index} / ${totalArtisans < 10 ? '0' + totalArtisans : totalArtisans}`;
        }

        // 更新上一位 / 下一位按鈕連結與點擊事件
        const prevId = id > 1 ? id - 1 : totalArtisans;
        const nextId = id < totalArtisans ? id + 1 : 1;

        const prevBtn = document.getElementById('prevArtisanBtn');
        const nextBtn = document.getElementById('nextArtisanBtn');
        
        if (prevBtn) {
            prevBtn.href = `?id=${prevId}`;
            prevBtn.onclick = (e) => {
                e.preventDefault();
                switchArtisan(prevId);
            };
        }
        if (nextBtn) {
            nextBtn.href = `?id=${nextId}`;
            nextBtn.onclick = (e) => {
                e.preventDefault();
                switchArtisan(nextId);
            };
        }

        // 更新左欄：職人肖像、姓名、稱號、標籤、簡介
        const photoBox = document.querySelector('.profile-photo-box img');
        if (photoBox) {
            photoBox.src = data.heroImg;
            photoBox.alt = data.name;
        }

        const nameEl = document.querySelector('.profile-name');
        if (nameEl) nameEl.textContent = data.name;

        const titleRoleEl = document.querySelector('.profile-title-role');
        if (titleRoleEl) titleRoleEl.innerHTML = data.role.replace(' ｜ ', '<br>');

        const locPill = document.querySelector('.profile-tag-pill.loc-pill');
        if (locPill) locPill.textContent = `📍 ${data.town}`;

        const craftPill = document.querySelector('.profile-tag-pill.craft-pill');
        if (craftPill) craftPill.textContent = `⭘ ${data.category}`;

        const bioEl = document.querySelector('.profile-biography-p');
        if (bioEl) bioEl.textContent = data.bio;

        const quoteEl = document.querySelector('.slanted-quote-text');
        if (quoteEl) quoteEl.innerHTML = data.quote;

        // 更新右欄：Q&A 卡片列表
        const qaContainer = document.querySelector('.qa-cards-list');
        if (qaContainer && data.qaList) {
            qaContainer.innerHTML = data.qaList.map(qa => `
                <article class="qa-card-box" data-topic="${qa.topicId}">
                    <div class="card-num-col">${qa.num}</div>
                    <div class="card-content-col">
                        <h4 class="qa-question-text">${qa.question}</h4>
                        <blockquote class="qa-answer-quote">${qa.answer}</blockquote>
                    </div>
                </article>
            `).join('');
        }
    }

    // 3. 切換職人事件
    function switchArtisan(newId) {
        history.pushState(null, '', `?id=${newId}`);
        renderArtisan(newId);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // 4. 初次載入渲染
    renderArtisan(currentId);

    // 5. 監聽瀏覽器上一頁 / 下一頁切換
    window.addEventListener('popstate', () => {
        const p = new URLSearchParams(window.location.search);
        const rId = parseInt(p.get('id'), 10) || 1;
        renderArtisan(rId);
    });
});