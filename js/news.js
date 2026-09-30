/**
 * 最新消息頁面專屬控制腳本 (news.js)
 * 負責最新消息動態渲染後的分類過濾與載入更多互動
 */
document.addEventListener('DOMContentLoaded', () => {

    // 1. 監聽分類篩選按鈕點擊事件 (使用事件委派以適應動態載入的元素)
    const filterBar = document.querySelector('.news-filter-bar');
    
    if (filterBar) {
        filterBar.addEventListener('click', (e) => {
            const btn = e.target.closest('.news-pill-btn');
            if (!btn) return;

            // 切換按鈕的 active 狀態
            document.querySelectorAll('.news-pill-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            // 取得所有動態產生的精選大卡與列表橫列文章
            const featuredCard = document.querySelector('.news-featured-card');
            const listRows = document.querySelectorAll('.news-list-row');

            // 過濾置頂焦點大卡
            if (featuredCard) {
                const featuredCategory = featuredCard.getAttribute('data-category');
                if (filter === 'ALL' || featuredCategory === filter) {
                    featuredCard.style.display = 'grid';
                } else {
                    featuredCard.style.display = 'none';
                }
            }

            // 過濾下方橫列清單文章
            listRows.forEach(row => {
                const rowCategory = row.getAttribute('data-category');
                if (filter === 'ALL' || rowCategory === filter) {
                    row.style.display = 'grid';
                } else {
                    row.style.display = 'none';
                }
            });
        });
    }

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