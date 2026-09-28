/**
 * 壯遊據點地圖與圖鑑互動模組 (spots.js) - 完整精簡版
 */

const SPOTS_INFO = {
    "qianyao": {
        town: "六腳鄉",
        title: "墘窯休閒陶坊",
        category: "傳統手工藝",
        tags: ["傳統手工藝", "臺灣工藝之家"],
        shortDesc: "隱身綠意田野間的交趾陶與自然柴燒陶藝聚落。",
        desc: "隱身六腳綠意田野間的工藝聚落，致力傳承交趾陶捏塑與柴燒技藝，在烈火淬鍊中重現大地與泥土渾厚質樸的生命力。現場提供手拉坏、交趾陶捏塑與柴燒工藝體驗。",
        features: "交趾陶製作 ‧ 柴燒陶藝體驗 ‧ 聚落文化導覽",
        photos: ["assets/墘窯休閒陶坊.png"],
        gmapQuery: "墘窯休閒陶坊 嘉義縣六腳鄉"
    },
    "liqing": {
        town: "六腳鄉",
        title: "立青工作室",
        category: "傳統手工藝",
        tags: ["傳統手工藝", "木偶雕刻"],
        shortDesc: "國寶級木偶大師黃憲章工坊，典藏近 300 尊精湛懸絲偶。",
        desc: "國寶級木偶大師黃憲章老師的創作工坊，保存了近 300 尊精緻的提線木偶結構與研發技術，展現傳統偶戲工藝的精湛造詣，是笑瞇瞇懸絲偶劇團強大的後盾。",
        features: "黃憲章木偶專利展示 ‧ 近 300 尊懸絲偶陳列 ‧ 操偶體驗",
        photos: ["assets/craft-main.png"],
        gmapQuery: "立青工作室 嘉義縣六腳鄉"
    },
    "xiaomimi": {
        town: "六腳鄉",
        title: "笑咪咪懸絲偶劇團",
        category: "傳統手工藝",
        tags: ["傳統手工藝", "偶藝薪傳"],
        shortDesc: "平均 80 歲阿嬤組成的全國知名劇團，笑語傳承偶藝心跳。",
        desc: "由平均 80 歲在地農村阿嬤與長輩自組的全國知名劇團，運用靈巧十指賦予木偶詼諧生命，把最純粹的鄉土歡笑與生活記憶傳遞給每一位旅人。",
        features: "平均 80 歲長輩熱情操演 ‧ 零距離親身懸絲偶操作 ‧ 青銀共創",
        photos: ["assets/笑瞇瞇.png"],
        gmapQuery: "蒜頭糖廠 工廠村 笑咪咪懸絲偶劇團"
    },
    "embroidery": {
        town: "朴子市",
        title: "刺繡文化館",
        category: "傳統手工藝",
        tags: ["傳統手工藝", "常民生活史"],
        shortDesc: "見證朴子作為刺繡外銷重鎮的歷史，木造日式官舍的針線故事。",
        desc: "見證朴子曾作為全台刺繡外銷重鎮的歷史記憶，館內珍藏華麗神明衣、八仙彩與精密針法，展示針線交織出的女性生活智慧與文化風華。",
        features: "日式木造官舍活化 ‧ 傳統金蔥線刺繡 ‧ 八仙彩工藝典藏",
        photos: ["assets/刺繡文化館.png"],
        gmapQuery: "朴子刺繡文化館"
    },
    "yongjiu": {
        town: "六腳鄉",
        title: "用九柑仔店",
        category: "常民與市井",
        tags: ["常民與市井", "影視文化 IP"],
        shortDesc: "同名影視取景地，老水圳旁的木造柑仔店與滿滿人情味。",
        desc: "知名漫畫與金鐘戲劇的原型取景地，百年水圳旁的木造柑仔店凝聚了濃厚鄉里溫情，也是青年走入農村聚落認識老村落生活風景的暖心座標。",
        features: "電視劇經典原汁原味復古現場 ‧ 潭墘長輩熱情奉茶 ‧ 懷舊冷飲",
        photos: ["assets/用久柑仔店.png"],
        gmapQuery: "用九柑仔店 嘉義縣六腳鄉"
    },
    "suantou-market": {
        town: "六腳鄉",
        title: "六腳公有零售市場",
        category: "常民與市井",
        tags: ["常民與市井", "在地飲食"],
        shortDesc: "蒜頭村百年生活樞紐，品嚐晨間古早味熟食與樸實人情。",
        desc: "蒜頭村村民最熱絡的生活樞紐，百年來滋養著周邊村落的飲食習慣。市場內保有現切古藝肉品與鄉村時令蔬果，能最直接體會傳統真實日常。",
        features: "晨間傳統手作小吃 ‧ 保留日式木桁架結構 ‧ 庶民人情味",
        photos: ["assets/六腳傳統市場.png"],
        gmapQuery: "六腳公有零售市場"
    },
    "oldstreet": {
        town: "朴子市",
        title: "配天宮",
        category: "常民與市井",
        tags: ["常民與市井", "廟口常民美食"],
        shortDesc: "媽祖廟香火環繞的蜈蚣陣老街，品味飄香三代的廟口風味。",
        desc: "以開元路蜈蚣陣街廓與配天宮媽祖廟為核心，巷弄間飄散著傳承三代的鴨肉羹、麻糬與菜鴨香氣，是感受地方信仰與生活脈搏的最佳起點。",
        features: "百年開元閩南長型街屋 ‧ 配天宮四季蘭求子 ‧ 廟口美食巡禮",
        photos: ["assets/配天宮.png"],
        gmapQuery: "朴子配天宮"
    },
    "sugar": {
        town: "六腳鄉",
        title: "蒜頭糖廠",
        category: "產業與歷史",
        tags: ["產業與歷史", "糖鐵文化遺產"],
        shortDesc: "百年全台第三大製糖工場，搭乘復古五分車漫遊日式木屋聚落。",
        desc: "日治時期曾名列全台第三大製糖工場，如今轉型為糖鐵文化休閒園區，搭乘五分車穿梭在日式官舍群與老雀榕林蔭下，回望甜蜜產業記憶。",
        features: "搭乘懷舊復古五分車 ‧ 全台完整日式黑瓦宿舍群 ‧ 蔗糖冰棒",
        photos: ["assets/蒜頭糖廠3.png"],
        gmapQuery: "蒜頭糖廠蔗埕文化園區"
    },
    "npm-south": {
        town: "太保市",
        title: "故宮南院",
        category: "產業與歷史",
        tags: ["產業與歷史", "亞洲藝術殿堂"],
        shortDesc: "雙湖環抱的現代書法流線展館，常態展出珍貴亞洲文物典藏。",
        desc: "結合現代書法意象與綠建築構思的亞洲文化巨擘，人工雙湖環抱典雅流線展館，常態展出亞洲織品、陶瓷與茶文化珍稀藏品。",
        features: "至善湖至德湖湖畔步道 ‧ 綠建築景觀 ‧ 亞洲文化特展",
        photos: ["assets/故宮南院.png"],
        gmapQuery: "國立故宮博物院南部院區"
    },
    "dexing-dean": {
        town: "六腳鄉",
        title: "德興里德安宮",
        category: "產業與歷史",
        tags: ["產業與歷史", "信仰聚落中心"],
        shortDesc: "雙溪口農耕聚落信仰樞紐，殿內保存珍貴木雕與泥塑彩繪。",
        desc: "雙溪口與德興聚落的守護公廟，主祀朱府千歲，廟宇殿堂內保存匠師精緻的傳統彩繪與泥塑剪黏，靜謐守望著嘉南平原的稻浪田園。",
        features: "傳統木構廟宇彩繪 ‧ 古樸石雕工藝 ‧ 雙溪口農耕拓墾史",
        photos: ["assets/德興里.png"],
        gmapQuery: "德安宮 嘉義縣六腳鄉德興村"
    },
    "shuidiaotou": {
        town: "朴子市",
        title: "嘉藝點水道頭文創聚落",
        category: "產業與歷史",
        tags: ["產業與歷史", "日式文創空間"],
        shortDesc: "朴子地標十角水塔與官舍群，化身青年陶藝、金工悠閒手作聚落。",
        desc: "前身為日治時期朴子水道配水塔（水道頭）與自來水廠官舍群，現進駐多家手作工坊與獨立咖啡，化為悠閒愜意的漫步聚落。",
        features: "歷史地標十角水塔 ‧ 日式木造官舍聚落 ‧ 青年陶藝與金工體驗",
        photos: ["assets/水道頭文創聚落.png"],
        gmapQuery: "嘉藝點水道頭文創聚落"
    },
    "chengfeng": {
        town: "六腳鄉",
        title: "成豐社區講堂",
        category: "創新與社群",
        tags: ["創新與社群", "地方青銀共創"],
        shortDesc: "老宅活化農村共學基地，串接長輩智慧與青年青銀沙龍。",
        desc: "以地方老宅改造成的農村共學基地，串聯青年返鄉力量與社區長輩的人生智慧，開辦風土講堂、草編手作與地方記憶採集行動。",
        features: "地方青銀共創沙龍 ‧ 農村口述歷史展覽 ‧ 友善農食推廣",
        photos: ["assets/成豐社區講堂2.png"],
        gmapQuery: "成豐社區講堂 嘉義縣朴子市"
    },
    "culx-hub": {
        town: "六腳鄉",
        title: "嘉義文化科技創新基地",
        category: "創新與社群",
        tags: ["創新與社群", "文化科技轉譯"],
        shortDesc: "老糖廠西倉庫裡的 5G XR 創新聚落，數位轉譯在地傳統風土。",
        desc: "座落於蒜頭糖廠老倉庫的 5G XR 創新聚落，運用新媒體、虛擬動捕與數位轉譯技術，帶領傳統風土記憶跨步邁向元宇宙。",
        features: "5G XR 沉浸式科技展演 ‧ 青年創業育成 ‧ 數位創作者共創空間",
        photos: ["assets/文化創新基地.png"],
        gmapQuery: "嘉義文化科技創新基地"
    },
    "bookstore": {
        town: "朴子市",
        title: "朴子好書室",
        category: "創新與社群",
        tags: ["創新與社群", "獨立文化基地"],
        shortDesc: "巷弄獨立文化客廳，實踐百年天然木藍復育與植物染手作生活。",
        desc: "老街巷弄中的青年獨立基地，推動失落百年的天然木藍生態種植與手作染布生活，也是地方讀書會與文史講座的聚集地。",
        features: "天然木藍生態復育 ‧ 手作草木染課程 ‧ 地方文史選書共讀",
        photos: ["assets/朴子好書室.png"],
        gmapQuery: "朴子好書室"
    }
};

document.addEventListener('DOMContentLoaded', () => {
    // 1. 抓取地圖點位與視圖元件
    const pins = document.querySelectorAll('.map-spot-pin');
    const catButtons = document.querySelectorAll('.inline-cat-item');
    const btnViewMap = document.getElementById('btnViewMap');
    const btnViewGrid = document.getElementById('btnViewGrid');
    const mapCanvas = document.getElementById('mapCanvas');
    const spotsGridView = document.getElementById('spotsGridView');
    const spotsCardsGrid = document.getElementById('spotsCardsGrid');
    const gridFilterTags = document.querySelectorAll('.grid-filter-tag');

    // 2. 抓取詳細大彈窗 (Modal) 元件
    const modalBackdrop = document.getElementById('spotModalBackdrop');
    const modalCloseBtn = document.getElementById('spotModalCloseBtn');
    const modalSpotCategory = document.getElementById('modalSpotCategory');
    const modalSpotLocation = document.getElementById('modalSpotLocation');
    const modalSpotTitle = document.getElementById('modalSpotTitle');
    const modalSpotDesc = document.getElementById('modalSpotDesc');
    const modalSpotFeatures = document.getElementById('modalSpotFeatures');
    const modalGmapLink = document.getElementById('modalGmapLink');
    const modalSpotMapIframe = document.getElementById('modalSpotMapIframe');

    // 3. 打開 Modal 詳情彈窗
    function openDetailModal(spotKey) {
        const data = SPOTS_INFO[spotKey];
        if (!data || !modalBackdrop) return;

        // 填入文字資訊
        modalSpotTitle.textContent = data.title;
        modalSpotCategory.textContent = data.category || data.tags[0] || '壯遊據點';
        modalSpotLocation.textContent = `📍 ${data.town}`;
        modalSpotDesc.textContent = data.desc;
        modalSpotFeatures.textContent = data.features;

        // 設定左側嵌入式 Google Maps
        const searchQuery = encodeURIComponent(data.gmapQuery || `${data.title} 嘉義`);
        if (modalSpotMapIframe) {
            modalSpotMapIframe.src = `https://maps.google.com/maps?q=${searchQuery}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
        }

        // 設定導航按鈕連結
        modalGmapLink.href = `https://www.google.com/maps/search/?api=1&query=${searchQuery}`;

        modalBackdrop.classList.add('is-active');
        document.body.style.overflow = 'hidden';
    }

    // 4. 關閉 Modal 彈窗
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
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalBackdrop.classList.contains('is-active')) {
            closeDetailModal();
        }
    });

    // 5. 地圖模式下：點擊 Pin 標點直接打開大彈窗
    pins.forEach((pin) => {
        pin.addEventListener('click', (e) => {
            e.stopPropagation();
            pins.forEach(p => p.classList.remove('active'));
            pin.classList.add('active');
            openDetailModal(pin.dataset.spot);
        });
    });

    // 6. 地圖左側分類過濾
    catButtons.forEach((btn) => {
        btn.addEventListener('click', () => {
            catButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const targetCat = btn.dataset.cat;
            pins.forEach((pin) => {
                const pinCat = pin.dataset.category;
                if (targetCat === 'all' || pinCat === targetCat) {
                    pin.style.opacity = '1';
                    pin.style.pointerEvents = 'auto';
                    pin.style.transform = 'translate(-50%, -50%) scale(1)';
                } else {
                    pin.style.opacity = '0.15';
                    pin.style.pointerEvents = 'none';
                    pin.style.transform = 'translate(-50%, -50%) scale(0.78)';
                }
            });
        });
    });

    // 7. 據點圖鑑網格渲染與點擊彈窗
    function renderSpotsGrid(category = 'all') {
        if (!spotsCardsGrid) return;
        spotsCardsGrid.innerHTML = '';

        Object.keys(SPOTS_INFO).forEach(spotKey => {
            const data = SPOTS_INFO[spotKey];
            if (!data) return;

            const pinEl = document.querySelector(`.map-spot-pin[data-spot="${spotKey}"]`);
            const spotCat = pinEl ? pinEl.dataset.category : 'all';

            if (category !== 'all' && spotCat !== category) return;

            const card = document.createElement('div');
            card.className = 'spot-col-card';
            card.innerHTML = `
                <div class="spot-col-img">
                    <img src="${data.photos[0] || 'assets/水道頭文創聚落.png'}" alt="${data.title}">
                </div>
                <div class="spot-col-body">
                    <div class="spot-col-meta">
                        <span class="spot-col-town">📍 ${data.town}</span>
                        <span class="spot-col-tag">${data.tags[0] || ''}</span>
                    </div>
                    <h3 class="spot-col-title">${data.title}</h3>
                    <p class="spot-col-desc">${data.shortDesc || data.desc}</p>
                    <div class="spot-col-foot">詳細內容 ＆ 地圖導航 ➔</div>
                </div>
            `;

            card.addEventListener('click', () => {
                openDetailModal(spotKey);
            });

            spotsCardsGrid.appendChild(card);
        });

        // 於網格下方自動附加「田調更新中」提示
        const existingNote = document.getElementById('spotsGridUpdatingNote');
        if (existingNote) existingNote.remove();

        const updatingNote = document.createElement('div');
        updatingNote.id = 'spotsGridUpdatingNote';
        updatingNote.className = 'spots-updating-note';
        updatingNote.innerHTML = `
            <div class="updating-dot-pulse"></div>
            <div class="updating-text-group">
                <span class="updating-en">FIELD ARCHIVE IN PROGRESS</span>
                <p class="updating-desc">更多在地文化座標與職人故事持續田野踏查、更新建構中 ──</p>
            </div>
        `;
        spotsCardsGrid.parentNode.appendChild(updatingNote);
    }

    // 8. 模式切換按鈕 (地圖導覽 ⇄ 據點圖鑑)
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
            renderSpotsGrid('all');
        });
    }

    // 9. 圖鑑分類過濾切換
    gridFilterTags.forEach(tag => {
        tag.addEventListener('click', () => {
            gridFilterTags.forEach(t => t.classList.remove('active'));
            tag.classList.add('active');
            renderSpotsGrid(tag.dataset.cat);
        });
    });
});