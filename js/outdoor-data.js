/**
 * 嘉義六腳青年壯遊 - 戶外教育專案 (嘉禮有糖高中職 A~D 方案) 資料庫 (outdoor-data.js)
 * 針對 108 課綱探究與實作、多元選修與校外教學設計
 */
const OUTDOOR_ROUTES = {
    "A": {
        id: "A",
        eyebrow: "ROUTE A",
        tabTitle: "糖鐵偶戲傳承線",
        tabSub: "非遺力學 · 糖業工業史",
        mainTitle: "A 糖鐵偶戲傳承線",
        keywords: "STEAM力學 × 糖鐵歷史 × 青銀共榮",
        summary: "走讀蒜頭糖廠五分車歷史，進入立青工作室動手調校小偶平衡，並與平均80歲長輩進行跨世代對話。",
        thumbImg: "assets/笑咪咪懸絲偶劇團.png",
        archive: {
            trail: "蒜頭糖廠 ➔ 工廠村聚落 ➔ 立青工坊",
            pacing: "高中職 ‧ 大專院校（約 6.5 小時）",
            highlight: "STEAM 力學懸絲偶 ＆ 青銀跨代共學"
        },
        timeline: [
            {
                time: "09:00 - 10:40",
                num: 1,
                title: "蒜頭糖廠五分車與工業遺產調研",
                desc: "搭上懷舊五分車穿過林蔭鐵道，走進製糖工廠踏查百年糖業演進。",
                img: "assets/水道頭文創聚落.png"
            },
            {
                time: "10:50 - 12:20",
                num: 2,
                title: "立青木偶工作室：提線木偶力學實作",
                desc: "跟著國寶黃憲章老師動手組裝懸絲機關，體驗力學平衡與多點拉線技巧。",
                img: "assets/笑咪咪懸絲偶劇團.png"
            },
            {
                time: "12:20 - 13:40",
                num: 3,
                title: "工廠村聚落探訪與在地風味午餐",
                desc: "漫步日式木造聚落享用特色便當，在老樹下聽長輩聊老糖廠歲月。",
                img: "assets/水道頭文創聚落.png"
            },
            {
                time: "13:40 - 16:00",
                num: 4,
                title: "笑瞇瞇長者劇團操偶與青銀共學發表",
                desc: "向平均 80 歲阿嬤學操偶，分組自編短劇登台演出，跨代互動笑聲不斷！",
                img: "assets/笑咪咪懸絲偶劇團.png"
            }
        ]
    },
    "B": {
        id: "B",
        eyebrow: "ROUTE B",
        tabTitle: "公衛與刺繡走讀線",
        tabSub: "水道公衛 · 常民刺繡美學",
        mainTitle: "B 公衛與刺繡走讀線",
        keywords: "公衛歷史 × 傳統刺繡 × 獨立書店",
        summary: "聚焦日治自來水公衛史與常民刺繡記憶，漫步開元老街並於朴子好書室體驗天然木藍染。",
        thumbImg: "assets/水道頭文創聚落.png",
        archive: {
            trail: "水道頭配水塔 ➔ 刺繡館 ➔ 朴子好書室",
            pacing: "高中職 ‧ 大專院校（約 6.5 小時）",
            highlight: "八仙彩工藝田調 ＆ 百年天然木藍染"
        },
        timeline: [
            {
                time: "09:00 - 10:30",
                num: 1,
                title: "朴子水道頭：日治公衛現代化踏查",
                desc: "走訪 1933 年給水塔與日式官舍群，探討現代公衛建設對小鎮的改變。",
                img: "assets/水道頭文創聚落.png"
            },
            {
                time: "10:40 - 12:00",
                num: 2,
                title: "刺繡文化館：針線間的女性常民經濟",
                desc: "走進日式木造官舍，親眼看見老匠人一針一線繡出的華麗八仙彩。",
                img: "assets/水道頭文創聚落.png"
            },
            {
                time: "12:00 - 13:30",
                num: 3,
                title: "開元老街與第一市場風土田調採集",
                desc: "鑽進熱鬧的市場老街，吃在地特色小吃並記錄常民生活風貌。",
                img: "assets/水道頭文創聚落.png"
            },
            {
                time: "13:30 - 15:30",
                num: 4,
                title: "朴子好書室：百年木藍復育植物染",
                desc: "在獨立老屋書店動手染一條天然藍染布，感受風土植物的溫暖手感。",
                img: "assets/藍染體驗.png"
            }
        ]
    },
    "C": {
        id: "C",
        eyebrow: "ROUTE C",
        tabTitle: "農村低碳永續線",
        tabSub: "交趾陶美學 · SDGs循環實踐",
        mainTitle: "C 農村低碳永續線",
        keywords: "SDGs 11&12 × 柴燒陶藝 × 甘蔗循環經濟",
        summary: "對接 SDGs 永續指標，走入農村體驗交趾陶壁畫美學，並動手體驗古法炒糖與農業廢棄物再利用。",
        thumbImg: "assets/藍染體驗.png",
        archive: {
            trail: "潭墘交趾陶村 ➔ 成豐講堂 ➔ 糖廠好食作",
            pacing: "高中職 ‧ 大專院校（約 6.5 小時）",
            highlight: "柴燒低碳哲學 ＆ 蔗渣循環手工皂"
        },
        timeline: [
            {
                time: "09:00 - 10:30",
                num: 1,
                title: "潭墘村交趾陶壁畫與社區營造調研",
                desc: "走訪用九柑仔店拍攝聚落，觀察傳統交趾陶如何融入現代農村防洪牆。",
                img: "assets/藍染體驗.png"
            },
            {
                time: "10:45 - 12:00",
                num: 2,
                title: "柴燒陶藝觀察與低碳柴燒生活哲學",
                desc: "了解柴燒落灰自然成釉的物理化學變化，探討傳統技藝與低碳永續。",
                img: "assets/藍染體驗.png"
            },
            {
                time: "12:15 - 13:45",
                num: 3,
                title: "成豐社區講堂：碾米老建築與節氣午餐",
                desc: "在 90 年老碾米廠檜木樑柱下享用時令便當，聊聊歷史空間的活化再生。",
                img: "assets/水道頭文創聚落.png"
            },
            {
                time: "14:00 - 16:00",
                num: 4,
                title: "好食作：古法炒糖與農業廢棄物手作",
                desc: "在大鐵鍋前翻炒天然甘蔗汁，並用甘蔗渣動手做天然手工皂帶回家。",
                img: "assets/水道頭文創聚落.png"
            }
        ]
    },
    "D": {
        id: "D",
        eyebrow: "ROUTE D",
        tabTitle: "藝術策展科技線",
        tabSub: "故宮策展視野 · AR數位轉譯",
        mainTitle: "D 藝術策展科技線",
        keywords: "跨文化策展 × 文化資產數位化 × AR虛擬轉譯",
        summary: "走讀故宮南院國家級策展動線與鑽石級綠建築，並在文化創新基地實作 AR 科技與偶藝結合。",
        thumbImg: "assets/水道頭文創聚落.png",
        archive: {
            trail: "故宮南院 ➔ 立青工作室 ➔ 文化科技基地",
            pacing: "高中職 ‧ 大專院校（約 6.5 小時）",
            highlight: "國家級策展視角 ＆ 5G XR 偶戲沉浸互動"
        },
        timeline: [
            {
                time: "09:00 - 11:30",
                num: 1,
                title: "國立故宮南院：亞洲藝術策展解讀",
                desc: "漫步亞洲織品與陶瓷展廳，分析國家級展覽的動線規劃與光影設計。",
                img: "assets/水道頭文創聚落.png"
            },
            {
                time: "11:30 - 13:00",
                num: 2,
                title: "水岸園區綠色建築與滯洪生態調研",
                desc: "踏查雙湖綠建築主體，認識現代公共建設如何與嘉南平原水文共存。",
                img: "assets/水道頭文創聚落.png"
            },
            {
                time: "13:15 - 14:30",
                num: 3,
                title: "立青木偶工坊：非遺偶藝的數位轉譯",
                desc: "向工藝師請益偶頭雕刻結構，討論傳統偶戲在 3D 建模與動畫的轉譯潛力。",
                img: "assets/笑咪咪懸絲偶劇團.png"
            },
            {
                time: "14:45 - 16:30",
                num: 4,
                title: "文化科技創新基地：AR/VR 沉浸體驗",
                desc: "戴上擴增實境眼鏡操作虛擬互動平台，發表屬於青年的文化數位提案！",
                img: "assets/笑咪咪懸絲偶劇團.png"
            }
        ]
    }
};