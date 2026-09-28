/**
 * 最新消息詳情頁 - 動態資料渲染腳本 (news-detail.js)
 */
document.addEventListener('DOMContentLoaded', () => {
    // 1. 取得網址參數 ?id=X，預設為 1
    const urlParams = new URLSearchParams(window.location.search);
    const newsId = parseInt(urlParams.get('id'), 10) || 1;
    const data = NEWS_DATA[newsId] || NEWS_DATA[1];

    // 2. 更新網頁標題與麵包屑
    document.title = `${data.title} ｜ 最新消息 ｜ 嘉義青年壯遊`;
    const crumbCurrent = document.getElementById('newsCrumbCurrent');
    if (crumbCurrent) crumbCurrent.textContent = data.category;

    // 3. 更新 Hero 橫幅
    const heroBg = document.getElementById('newsHeroBg');
    if (heroBg) heroBg.src = data.heroImg;

    const badgeTag = document.getElementById('newsBadgeTag');
    if (badgeTag) badgeTag.textContent = data.badgeTag;

    const dateNote = document.getElementById('newsDateNote');
    if (dateNote) dateNote.textContent = `${data.date} 發布`;

    const mainTitle = document.getElementById('newsMainTitle');
    if (mainTitle) mainTitle.textContent = data.title;

    const subSlogan = document.getElementById('newsSubSlogan');
    if (subSlogan) subSlogan.textContent = data.subSlogan;

    // 4. 更新左側文章主內文
    const leadPara = document.getElementById('newsLeadPara');
    if (leadPara) leadPara.textContent = data.lead;

    const sectionsContainer = document.getElementById('newsSectionsContainer');
    if (sectionsContainer && data.sections) {
        sectionsContainer.innerHTML = data.sections.map(sec => {
            let html = `<h2 class="article-section-heading">${sec.heading}</h2>`;
            if (sec.text) {
                html += `<p class="article-text-body">${sec.text}</p>`;
            }
            if (sec.photo) {
                html += `
                    <div class="article-photo-card">
                        <img src="${sec.photo}" alt="${sec.heading}">
                        ${sec.caption ? `<span class="photo-caption">${sec.caption}</span>` : ''}
                    </div>
                `;
            }
            if (sec.bullets) {
                html += `
                    <ul class="article-bullet-list">
                        ${sec.bullets.map(b => `<li>${b}</li>`).join('')}
                    </ul>
                `;
            }
            return html;
        }).join('');
    }

    // 5. 更新右側側邊欄 (規格卡)
    const sidebarContainer = document.getElementById('newsSidebarContent');
    if (sidebarContainer && data.sidebar) {
        const sb = data.sidebar;
        if (sb.showSpec) {
            sidebarContainer.innerHTML = `
                <div class="event-info-card">
                    <span class="event-card-eyebrow">EVENT SPECIFICATIONS</span>
                    <h3 class="event-card-title">${sb.title}</h3>
                    <div class="event-meta-list">
                        <div class="meta-row"><span class="meta-icon">📅</span><div><strong>活動日期</strong><span>${sb.date}</span></div></div>
                        <div class="meta-row"><span class="meta-icon">⏰</span><div><strong>活動時間</strong><span>${sb.time}</span></div></div>
                        <div class="meta-row"><span class="meta-icon">📍</span><div><strong>活動地點</strong><span>${sb.location}</span></div></div>
                        <div class="meta-row"><span class="meta-icon">👥</span><div><strong>名額限制</strong><span>${sb.quota}</span></div></div>
                        <div class="meta-row"><span class="meta-icon">💰</span><div><strong>費用說明</strong><span>${sb.fee}</span></div></div>
                    </div>
                    <div class="sidebar-cursive-note">Same Land, New Voices.</div>
                    <a href="${sb.btnLink}" class="btn-event-apply">${sb.btnText}</a>
                </div>
            `;
        } else {
            sidebarContainer.innerHTML = `
                <div class="event-info-card">
                    <span class="event-card-eyebrow">NEWS INFO</span>
                    <h3 class="event-card-title">${sb.title}</h3>
                    <div class="event-meta-list">
                        <div class="meta-row"><span class="meta-icon">🏢</span><div><strong>主辦單位</strong><span>${sb.organizer}</span></div></div>
                        <div class="meta-row"><span class="meta-icon">🤝</span><div><strong>合作指導</strong><span>${sb.support}</span></div></div>
                        <div class="meta-row"><span class="meta-icon">📌</span><div><strong>備註說明</strong><span>${sb.contact}</span></div></div>
                    </div>
                    <div class="sidebar-cursive-note">Explore Together.</div>
                    <a href="${sb.btnLink}" class="btn-event-apply">${sb.btnText}</a>
                </div>
            `;
        }
    }

    // 6. 更新底部其他推薦（排除當前這篇）
    const relatedContainer = document.getElementById('newsRelatedGrid');
    if (relatedContainer) {
        const otherIds = Object.keys(NEWS_DATA).filter(id => parseInt(id, 10) !== newsId).slice(0, 2);
        relatedContainer.innerHTML = otherIds.map(oId => {
            const item = NEWS_DATA[oId];
            return `
                <article class="related-card" onclick="window.location.href='news-detail.html?id=${item.id}'">
                    <div class="related-thumb"><img src="${item.heroImg}" alt="${item.title}"></div>
                    <div class="related-info">
                        <span class="related-date">${item.date}</span>
                        <strong>${item.title}</strong>
                        <span class="related-arrow">➔</span>
                    </div>
                </article>
            `;
        }).join('');
    }
});