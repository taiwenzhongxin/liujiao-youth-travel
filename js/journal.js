/**
 * 嘉義六腳青年壯遊 - 職人故事專屬控制 (journal.js)
 * 負責職人卡片分類篩選、網格/清單視圖切換與專訪詳情頁跳轉綁定
 */

document.addEventListener('DOMContentLoaded', () => {

    // ==================== 1. 分類標籤切換與即時篩選 ==================== -->
    const filterBtns = document.querySelectorAll('.filter-btn');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // 切換按鈕 Active 樣式
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const selectedFilter = btn.getAttribute('data-filter');
            const allCards = document.querySelectorAll('.journal-card');

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

});