/**
 * 最新消息頁面專屬控制腳本 (news.js)
 * 負責最新消息分類過濾與載入更多按鈕互動
 */
document.addEventListener('DOMContentLoaded', () => {
    // 1. 最新消息分類過濾控制
    const filterBtns = document.querySelectorAll('.news-pill-btn');
    const featuredCard = document.querySelector('.news-featured-card');
    const listRows = document.querySelectorAll('.news-list-row');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // 切換按鈕的 active 狀態
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            // 根據分類過濾置頂焦點大卡
            if (featuredCard) {
                const featuredCategory = featuredCard.getAttribute('data-category');
                if (filter === 'ALL' || featuredCategory === filter) {
                    featuredCard.style.display = 'grid';
                } else {
                    featuredCard.style.display = 'none';
                }
            }

            // 根據分類過濾下方橫列清單文章
            listRows.forEach(row => {
                const rowCategory = row.getAttribute('data-category');
                if (filter === 'ALL' || rowCategory === filter) {
                    row.style.display = 'grid';
                } else {
                    row.style.display = 'none';
                }
            });
        });
    });

    // 2. 載入更多文章按鈕互動回饋
    const loadMoreBtn = document.getElementById('btnLoadMoreNews');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', () => {
            loadMoreBtn.innerHTML = '已載入全部最新消息';
            loadMoreBtn.style.cursor = 'default';
            loadMoreBtn.style.opacity = '0.7';
        });
    }
});