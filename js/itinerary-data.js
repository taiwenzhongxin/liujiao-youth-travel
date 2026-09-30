/**
 * 嘉義六腳青年壯遊 - 一日遊 A~F 方案完整資料庫 (itinerary-data.js)
 * 內容嚴格依據 115 年度教育部青年壯遊點計畫書設定[cite: 37]
 */
const ITINERARY_ROUTES = {
    "A": {
        id: "A",
        eyebrow: "ROUTE A",
        tabTitle: "工藝文化線",
        tabSub: "傳統技藝 · 職人精神",
        mainTitle: "A 工藝文化線",
        keywords: "工藝 × 傳統 × 職人精神",
        summary: "走進六腳的日常！捏捏陶、逛逛老柑仔店，中午去市場吃在地小吃，下午到糖廠染一塊布、看阿嬤們靈巧操偶。",
        thumbImg: "assets/笑咪咪懸絲偶劇團.png",
        specs: {
            track: "潭墘社區 ➔ 蒜頭老街 ➔ 蒜頭糖廠",
            transport: "慢活散步 ＋ 糖鐵五分車",
            highlight: "黃憲章懸絲偶操演 ＆ 藍染手作",
            mapUrl: "https://www.google.com/maps/d/viewer?mid=1fiyu30w39XwWRmjdmNjsqvd2hQgE8ks"
        },
        mapMarkers: [
            { num: 1, title: "潭墘社區 / 墘窯", x: 60, y: 50 },
            { num: 2, title: "成豐講堂 / 立青製偶", x: 130, y: 95 },
            { num: 3, title: "六腳公有零售市場", x: 160, y: 140 },
            { num: 4, title: "蒜頭糖廠 (藍染/導覽)", x: 205, y: 185 },
            { num: 5, title: "笑瞇瞇懸絲偶劇團", x: 235, y: 220 }
        ],
        timeline: [
            {
                time: "09:00 - 10:00",
                num: 1,
                title: "潭墘社區導覽與墘窯交趾陶",
                pill: "傳統工藝",
                location: "📍 六腳鄉潭墘村",
                desc: "打卡《用九柑仔店》老木屋，走進田野邊的窯坊，親手摸摸溫潤的交趾陶。",
                img: "assets/藍染體驗.png"
            },
            {
                time: "10:10 - 12:00",
                num: 2,
                title: "成豐社區講堂與立青製偶體驗",
                pill: "工藝體驗",
                location: "📍 六腳鄉蒜頭老街",
                desc: "在近百年老碾米廠裡喝杯茶，跟著國寶黃憲章老師動手做屬於自己的懸絲偶。",
                img: "assets/笑咪咪懸絲偶劇團.png"
            },
            {
                time: "12:00 - 13:30",
                num: 3,
                title: "六腳公有市場走讀與在地午餐",
                pill: "在地飲食",
                location: "📍 六腳公有零售市場",
                desc: "鑽進蒜頭村最熱鬧的早市，吃現切肉圓、在地切仔麵，感受滿滿鄉土人情味。",
                img: "assets/水道頭文創聚落.png"
            },
            {
                time: "13:30 - 15:30",
                num: 4,
                title: "好食作藍染體驗與糖廠文史走讀",
                pill: "產業歷史",
                location: "📍 蒜頭糖廠蔗埕文化園區",
                desc: "用天然植物染一條屬於自己的方巾，接著漫步日式木屋群，回味老糖廠時光。",
                img: "assets/藍染體驗.png"
            },
            {
                time: "15:30 - 16:50",
                num: 5,
                title: "文化科技基地與笑瞇瞇操偶演出",
                pill: "表演藝術",
                location: "📍 蒜頭糖廠工廠村",
                desc: "戴上 AR 眼鏡玩新科技，再看平均 80 歲阿嬤們幽默操偶，笑著跟木偶握握手！",
                img: "assets/笑咪咪懸絲偶劇團.png"
            }
        ]
    },
    "B": {
        id: "B",
        eyebrow: "ROUTE B",
        tabTitle: "老街巡禮線",
        tabSub: "歷史街區 · 在地生活",
        mainTitle: "B 老街巡禮線",
        keywords: "街區歷史 × 刺繡工藝 × 蔗香生活",
        summary: "走進朴子的老時光！摸摸天然藍染植物、散步洋樓老街與刺繡館，下午再晃到糖廠，聞著蔗香親手炒一包古早味黑糖。",
        thumbImg: "assets/水道頭文創聚落.png",
        specs: {
            track: "開元老街 ➔ 水道頭文創 ➔ 蒜頭糖廠",
            transport: "開元街區漫步 ＋ 單車騎行",
            highlight: "百年木藍復育體驗 ＆ 傳統古法炒糖",
            mapUrl: "https://www.google.com/maps/d/viewer?mid=1fiyu30w39XwWRmjdmNjsqvd2hQgE8ks"
        },
        mapMarkers: [
            { num: 1, title: "朴子老街 / 好書室", x: 70, y: 40 },
            { num: 2, title: "水道頭文創 / 刺繡館", x: 120, y: 90 },
            { num: 3, title: "大槺榔掃帚工作室", x: 165, y: 135 },
            { num: 4, title: "蒜頭糖廠文史走讀", x: 210, y: 180 },
            { num: 5, title: "炒糖體驗與偶戲欣賞", x: 240, y: 225 }
        ],
        timeline: [
            {
                time: "09:00 - 10:30",
                num: 1,
                title: "朴子開元老街走讀與木藍復育活動",
                pill: "老街文化",
                location: "📍 朴子好書室 / 開元老街",
                desc: "走進好書室摸摸綠意盎然的木藍草，漫步開元老街與第一市場，聽返鄉青年聊老街新生。。",
                img: "assets/水道頭文創聚落.png"
            },
            {
                time: "10:30 - 12:30",
                num: 2,
                title: "嘉藝點水道頭文創聚落與刺繡文化館",
                pill: "工藝資產",
                location: "📍 水道頭文創聚落",
                desc: "在十角水塔下吹風散步，走進日式木造官舍，親眼看見老匠人一針一線繡出的華麗八仙彩。",
                img: "assets/水道頭文創聚落.png"
            },
            {
                time: "13:00 - 14:10",
                num: 3,
                title: "大槺榔掃帚工藝參觀與老厝巡禮",
                pill: "在地技藝",
                location: "📍 朴子德興里老厝群",
                desc: "穿梭在紅磚三合院巷弄間，跟著地方長輩動手學紮全台少見的傳統「槺榔掃帚」。",
                img: "assets/藍染體驗.png"
            },
            {
                time: "14:30 - 15:30",
                num: 4,
                title: "蒜頭糖廠歷史聚落文史導覽",
                pill: "產業歷史",
                location: "📍 蒜頭糖廠蔗埕園區",
                desc: "搭上緩緩行駛的復古五分車，跟著文史老師穿過老樹林蔭，走訪黑瓦木屋與防空洞故事。",
                img: "assets/水道頭文創聚落.png"
            },
            {
                time: "15:30 - 17:00",
                num: 5,
                title: "甘蔗古法炒糖與工廠村偶戲表演",
                pill: "風土手作",
                location: "📍 糖廠駐點站 / 工廠村",
                desc: "在大鐵鍋前親手翻炒香濃的天然甘蔗糖，再和笑瞇瞇阿嬤們同台，體驗靈巧拉線操偶！",
                img: "assets/笑咪咪懸絲偶劇團.png"
            }
        ]
    },
    "C": {
        id: "C",
        eyebrow: "ROUTE C",
        tabTitle: "在地創新線",
        tabSub: "故宮南院 · 科技轉譯",
        mainTitle: "C 在地創新線",
        keywords: "國際策展 × 數位轉譯 × 價值鏈學習",
        summary: "從故宮的世界國寶出發，親手做一尊傳統懸絲偶，再到老糖廠戴上 AR 眼鏡玩新科技，看老文化如何變潮！",
        thumbImg: "assets/水道頭文創聚落.png",
        specs: {
            track: "故宮南院 ➔ 立青工作室 ➔ 文化科技基地",
            transport: "園區專車接駁 ＋ 徒步探究",
            highlight: "立青木偶平衡組裝 ＆ 5G XR 數位轉譯",
            mapUrl: "https://www.google.com/maps/d/viewer?mid=1fiyu30w39XwWRmjdmNjsqvd2hQgE8ks"
        },
        mapMarkers: [
            { num: 1, title: "故宮南院國際策展", x: 60, y: 45 },
            { num: 2, title: "立青工作室懸絲偶", x: 130, y: 105 },
            { num: 3, title: "蒜頭糖廠製糖工場", x: 190, y: 165 },
            { num: 4, title: "文化科技創新基地", x: 235, y: 220 }
        ],
        timeline: [
            {
                time: "09:00 - 12:00",
                num: 1,
                title: "國立故宮博物院南部院區深度導覽",
                pill: "國際策展",
                location: "📍 故宮博物院南部院區",
                desc: "漫步雙湖畔的流線綠建築，在清涼展廳裡近距離欣賞亞洲織品、陶瓷與珍貴宮廷古物。",
                img: "assets/水道頭文創聚落.png"
            },
            {
                time: "13:20 - 14:10",
                num: 2,
                title: "立青工作室提線木偶技藝實作",
                pill: "工藝創作",
                location: "📍 六腳鄉蒜頭村",
                desc: "走進藏有數百尊木偶的大師工坊，動手組裝懸絲結構，摸摸木頭質地與精巧機關。",
                img: "assets/笑咪咪懸絲偶劇團.png"
            },
            {
                time: "14:20 - 15:20",
                num: 3,
                title: "蒜頭糖廠製糖工場文史導覽",
                pill: "工業遺產",
                location: "📍 蒜頭糖廠中央廠區",
                desc: "走進全台少數完整保留的巨大百年製糖工廠，仰望龐大蒸餾器與齒輪，聞著空氣中淡淡的蔗香。",
                img: "assets/水道頭文創聚落.png"
            },
            {
                time: "15:20 - 16:50",
                num: 4,
                title: "文化科技創新基地 AR 與偶戲展演",
                pill: "數位轉譯",
                location: "📍 糖廠倉庫基地 / 工廠村",
                desc: "在老倉庫裡戴上 AR 眼鏡體驗元宇宙互動，再看笑瞇瞇阿嬤登台操偶，傳統與未來一次滿足！",
                img: "assets/笑咪咪懸絲偶劇團.png"
            }
        ]
    },
    "D": {
        id: "D",
        eyebrow: "ROUTE D",
        tabTitle: "自然生活線",
        tabSub: "柴燒陶藝 · 節氣茶席",
        mainTitle: "D 自然生活線",
        keywords: "柴燒陶藝 × 節氣茶席 × 田園慢活",
        summary: "躲進六腳綠油油的稻田間！摸摸質樸的柴燒陶器、坐在老屋裡喝杯溫潤好茶，再來一顆手作黑糖，享受鄉村慢步調。",
        thumbImg: "assets/藍染體驗.png",
        specs: {
            track: "潭墘村 ➔ 東窯柴燒空間 ➔ 成豐社區講堂",
            transport: "田園漫活步行 / 自行開車",
            highlight: "柴燒陶器節氣茶席 ＆ 黑糖手工皂",
            mapUrl: "https://www.google.com/maps/d/viewer?mid=1fiyu30w39XwWRmjdmNjsqvd2hQgE8ks"
        },
        mapMarkers: [
            { num: 1, title: "潭墘社區 / 墘窯參觀", x: 70, y: 40 },
            { num: 2, title: "東窯茶空間節氣午餐", x: 125, y: 95 },
            { num: 3, title: "成豐社區講堂巡禮", x: 175, y: 155 },
            { num: 4, title: "黑糖手工皂與偶劇", x: 230, y: 220 }
        ],
        timeline: [
            {
                time: "09:00 - 10:00",
                num: 1,
                title: "潭墘村交趾陶藝坊與聚落導覽",
                pill: "農村美學",
                location: "📍 六腳鄉潭墘村",
                desc: "跟著工藝老師漫步寧靜的潭墘聚落，聽老村落的故事，親手觸碰屋牆上精緻彩釉的交趾陶。",
                img: "assets/藍染體驗.png"
            },
            {
                time: "10:20 - 12:00",
                num: 2,
                title: "東窯茶空間陶藝對話與節氣茶席",
                pill: "茶陶生活",
                location: "📍 六腳鄉田園聚落",
                desc: "捧一只柴燒陶杯，品嚐甘醇的高山熱茶與在地小點，在溫潤土香中靜下心來聊聊天。",
                img: "assets/水道頭文創聚落.png"
            },
            {
                time: "12:30 - 14:00",
                num: 3,
                title: "成豐社區講堂與蒜頭老街漫步",
                pill: "老屋再生",
                location: "📍 六腳鄉蒜頭村老街",
                desc: "穿過蒜頭老街吃在地午餐，走進 90 年歷史的日式碾米老廠房，聽在地長輩說老村故事。",
                img: "assets/水道頭文創聚落.png"
            },
            {
                time: "14:20 - 16:30",
                num: 4,
                title: "黑糖手工皂手作與糖廠偶戲觀賞",
                pill: "生活工藝",
                location: "📍 蒜頭糖廠駐點站",
                desc: "用天然蔗糖親手打一塊溫和的手工皂帶回家，下午坐在樹下看老阿嬤們幽默開朗地拉線演偶戲。",
                img: "assets/笑咪咪懸絲偶劇團.png"
            }
        ]
    },
    "E": {
        id: "E",
        eyebrow: "ROUTE E",
        tabTitle: "醫藥人文線",
        tabSub: "老醫館 · 雙偶藝術",
        mainTitle: "E 醫藥人文線",
        keywords: "醫療空間 × 雙偶對話 × 宗教信仰",
        summary: "探訪嘉義老醫生們的百年故事！走進充滿檜木香的日式老診所，下午再看懸絲偶與華麗布袋戲同台競演，一飽眼福。",
        thumbImg: "assets/水道頭文創聚落.png",
        specs: {
            track: "朴子老街 ➔ 清木屋老診所 ➔ 新港培桂堂",
            transport: "跨區文化專車接駁",
            highlight: "日洋醫館文史走讀 ＆ 懸絲偶／布袋戲雙偶操演",
            mapUrl: "https://www.google.com/maps/d/viewer?mid=1fiyu30w39XwWRmjdmNjsqvd2hQgE8ks"
        },
        mapMarkers: [
            { num: 1, title: "朴子老街走讀", x: 55, y: 40 },
            { num: 2, title: "清木屋外科老診所", x: 105, y: 80 },
            { num: 3, title: "蒜頭糖廠懸絲偶體驗", x: 150, y: 130 },
            { num: 4, title: "新港培桂堂", x: 195, y: 175 },
            { num: 5, title: "民雄三昧堂布袋戲", x: 240, y: 225 }
        ],
        timeline: [
            {
                time: "09:00 - 10:40",
                num: 1,
                title: "朴子中正老街與好書室走讀",
                pill: "街區文史",
                location: "📍 朴子市開元老街",
                desc: "漫步巴洛克洋樓林立的街區，走進青年好書室喝杯涼茶，認識朴子昔日「醫生之鄉」的繁榮過往。",
                img: "assets/水道頭文創聚落.png"
            },
            {
                time: "10:40 - 11:40",
                num: 2,
                title: "清木屋せいもくや老外科診所導覽",
                pill: "醫療文化",
                location: "📍 朴子市東路40號",
                desc: "走進保留完整手術燈與藥櫃的檜木老醫院，聞著濃濃木頭香，彷彿走入電視劇裡的復古場景。",
                img: "assets/水道頭文創聚落.png"
            },
            {
                time: "12:00 - 14:00",
                num: 3,
                title: "蒜頭糖廠駐點午餐與笑瞇瞇偶戲體驗",
                pill: "非遺偶戲",
                location: "📍 蒜頭糖廠工廠村",
                desc: "在糖廠林蔭下品嚐特色便當，跟著笑瞇瞇劇團阿嬤們學指尖拉線，親自體驗操偶的小技巧。",
                img: "assets/笑咪咪懸絲偶劇團.png"
            },
            {
                time: "14:30 - 15:40",
                num: 4,
                title: "新港培桂堂（林開泰診療所舊宅）",
                pill: "名人故居",
                location: "📍 新港鄉老街區",
                desc: "走入雲門舞集創辦人林懷民的祖厝，欣賞典雅的閩日混種合院庭園，感受仁醫家族的奉獻歲月。",
                img: "assets/水道頭文創聚落.png"
            },
            {
                time: "16:00 - 17:00",
                num: 5,
                title: "民雄三昧堂精緻布袋戲偶工藝與操偶",
                pill: "偶藝傳承",
                location: "📍 民雄三昧堂",
                desc: "親手抱起重達數公斤、鑲嵌水鑽與刺繡的華麗現代布袋戲偶，感受精雕細琢的台灣偶戲魅力。",
                img: "assets/笑咪咪懸絲偶劇團.png"
            }
        ]
    },
    "F": {
        id: "F",
        eyebrow: "ROUTE F",
        tabTitle: "剪黏科技線",
        tabSub: "板陶窯 · 數位跨域",
        mainTitle: "F 剪黏科技線",
        keywords: "交趾剪黏 × 當代創作 × 數位轉譯",
        summary: "傳統廟宇工藝變有趣了！去看超壯觀的剪黏大壁畫、親手做小木偶，再玩 AR 科技與糖鐵五分車，有玩又有料。",
        thumbImg: "assets/水道頭文創聚落.png",
        specs: {
            track: "新港板陶窯 ➔ 蒜頭糖廠 ➔ 文化科技創新基地",
            transport: "專車接駁 / 自行開車",
            highlight: "苦楝樹剪黏工藝 ＆ AR 虛擬實境轉譯",
            mapUrl: "https://www.google.com/maps/d/viewer?mid=1fiyu30w39XwWRmjdmNjsqvd2hQgE8ks"
        },
        mapMarkers: [
            { num: 1, title: "新港板陶窯園區", x: 60, y: 40 },
            { num: 2, title: "立青工作室小偶製作", x: 125, y: 100 },
            { num: 3, title: "文化科技創新基地", x: 185, y: 160 },
            { num: 4, title: "糖廠導覽與吃冰", x: 235, y: 220 }
        ],
        timeline: [
            {
                time: "09:00 - 10:30",
                num: 1,
                title: "新港板陶窯交趾剪黏工藝園區導覽",
                pill: "傳統工藝",
                location: "📍 新港鄉板頭村",
                desc: "站在全台最大的苦楝樹立體剪黏壁畫前拍美照，欣賞老師傅把破碗磁片化作花鳥神獸的神奇手藝。",
                img: "assets/水道頭文創聚落.png"
            },
            {
                time: "10:50 - 12:00",
                num: 2,
                title: "立青工作室小木偶製作體驗",
                pill: "工藝體驗",
                location: "📍 六腳鄉蒜頭村",
                desc: "在黃憲章老師親自指導下，動手打磨彩繪一尊屬於自己的掌上小木偶，帶回家當旅行紀念。",
                img: "assets/笑咪咪懸絲偶劇團.png"
            },
            {
                time: "13:00 - 14:50",
                num: 3,
                title: "文化科技基地笑瞇瞇偶戲與 AR 體驗",
                pill: "數位轉譯",
                location: "📍 蒜頭糖廠倉庫區",
                desc: "看 80 歲老阿嬤操演鄉土偶戲，再戴上科技眼鏡體驗虛擬互動，感受文化穿越時空的奇妙樂趣！",
                img: "assets/笑咪咪懸絲偶劇團.png"
            },
            {
                time: "15:00 - 16:50",
                num: 4,
                title: "蒜頭糖廠鐵道解說與五分車吃冰時光",
                pill: "糖業歷史",
                location: "📍 蒜頭糖廠販賣部",
                desc: "搭上嘟嘟叫的懷舊五分車穿過林蔭鐵道，最後來一碗招牌紅豆酵母冰，為行程畫下清涼句點。",
                img: "assets/水道頭文創聚落.png"
            }
        ]
    }
};