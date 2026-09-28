/**
 * 嘉義六腳青年壯遊 - 職人故事專屬控制 (journal.js)
 * 負責職人卡片分類篩選、網格/清單視圖切換與專訪詳情頁跳轉綁定
 */

document.addEventListener('DOMContentLoaded', () => {

    // ==================== 1. 分類標籤切換與即時篩選 ==================== -->
    const filterBtns = document.querySelectorAll('.filter-btn');
    const allCards = document.querySelectorAll('.journal-card');
    const tailRow = document.querySelector('.journal-tail-row');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // 切換按鈕 Active 樣式
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const selectedFilter = btn.getAttribute('data-filter');

            allCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');

                if (selectedFilter === 'ALL' || cardCategory === selectedFilter) {
                    card.style.display = 'flex';
                    card.style.opacity = '1';
                } else {
                    card.style.display = 'none';
                    card.style.opacity = '0';
                }
            });
        });
    });

    // ==================== 2. 網格 / 清單模式切換 ==================== -->
    const viewModeBtns = document.querySelectorAll('.btn-view-mode');
    const mainStage = document.querySelector('.journal-main-stage');

    viewModeBtns.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            viewModeBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            if (index === 1) {
                // 清單模式 (List View)
                mainStage.classList.add('is-list-view');
            } else {
                // 網格模式 (Grid View)
                mainStage.classList.remove('is-list-view');
            }
        });
    });

    // ==================== 3. 職人卡片動態綁定至專訪詳情頁 ==================== -->
    document.querySelectorAll('.journal-card').forEach((card) => {
        const numStamp = card.querySelector('.card-num-stamp');
        if (!numStamp) return;
        
        // 取出卡片編號並轉為對應的 ID (例如 '01' 轉為 '1')
        const artisanId = parseInt(numStamp.textContent.trim(), 10).toString();
        const detailUrl = `artisan-detail.html?id=${artisanId}`;

        // 綁定右下角圓形箭頭按鈕
        const arrowBtn = card.querySelector('.btn-round-arrow');
        if (arrowBtn) {
            arrowBtn.setAttribute('href', detailUrl);
        }

        // 綁定職人姓名標題點擊事件
        const nameHeading = card.querySelector('.card-artisan-name');
        if (nameHeading) {
            nameHeading.style.cursor = 'pointer';
            nameHeading.addEventListener('click', () => {
                window.location.href = detailUrl;
            });
        }
    });

});