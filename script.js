/**
 * 猫咪图鉴 - 超级互动版
 * 包含丰富的互动功能、趣味游戏和用户上传
 */

// ===== 猫咪数据结构 =====
const defaultCatsData = [
    {
        id: "cat-001",
        name: "奶茶",
        breed: "英短蓝白",
        age: 2,
        traits: ["粘人", "安静"],
        favorite: "逗猫棒",
        desc: "奶茶是一只温柔的小公主，喜欢在窗台上晒太阳，最爱被摸摸肚皮。它有着圆滚滚的脸蛋和一双会说话的大眼睛，总是静静地陪伴着主人。",
        img: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&h=300&fit=crop",
        imgAlt: "https://images.unsplash.com/photo-1574158622682-e40e69881006?w=400&h=300&fit=crop",
        likes: 12,
        uploadedByUser: false
    },
    {
        id: "cat-002",
        name: "橘子",
        breed: "橘猫",
        age: 1,
        traits: ["活泼", "爱睡觉"],
        favorite: "纸箱",
        desc: "橘子是个小吃货，每天最大的乐趣就是找吃的。不过它也超级爱睡觉，经常能找到最舒服的地方躺下，是只快乐的小肥猫。",
        img: "https://images.unsplash.com/photo-1495360010541-f48722b34f7d?w=400&h=300&fit=crop",
        imgAlt: "https://images.unsplash.com/photo-1571566882372-1598d88abd90?w=400&h=300&fit=crop",
        likes: 8,
        uploadedByUser: false
    },
    {
        id: "cat-003",
        name: "小白",
        breed: "波斯猫",
        age: 3,
        traits: ["安静", "粘人"],
        favorite: "毛绒球",
        desc: "小白拥有雪白的长毛和优雅的气质，像一位猫界贵族。它喜欢安静地陪伴主人，是个贴心的小棉袄，总是温柔地眨眨眼。",
        img: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?w=400&h=300&fit=crop",
        imgAlt: "https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=400&h=300&fit=crop",
        likes: 15,
        uploadedByUser: false
    },
    {
        id: "cat-004",
        name: "毛球",
        breed: "美国短毛猫",
        age: 2,
        traits: ["活泼", "爱睡觉"],
        favorite: "激光笔",
        desc: "毛球精力充沛又爱犯困，它会在家里疯狂跑酷，然后又突然倒在窝里呼呼大睡，反差萌满分！是家里的开心果。",
        img: "https://images.unsplash.com/photo-1533743983669-94fa5c4338ec?w=400&h=300&fit=crop",
        imgAlt: "https://images.unsplash.com/photo-1529778873920-4da4926a72c2?w=400&h=300&fit=crop",
        likes: 20,
        uploadedByUser: false
    },
    {
        id: "cat-005",
        name: "小橘",
        breed: "缅因猫",
        age: 4,
        traits: ["粘人", "安静"],
        favorite: "大号猫爬架",
        desc: "小橘虽然块头大，但内心是个温柔的小可爱。它喜欢靠在主人身边，用呼噜声表达自己的爱意，走路自带BGM。",
        img: "https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=400&h=300&fit=crop",
        imgAlt: "https://images.unsplash.com/photo-1506755855567-92ff770e8d00?w=400&h=300&fit=crop",
        likes: 25,
        uploadedByUser: false
    },
    {
        id: "cat-006",
        name: "黑豆",
        breed: "黑猫",
        age: 1.5,
        traits: ["活泼", "好奇"],
        favorite: "乒乓球",
        desc: "黑豆全身漆黑，眼睛像两颗宝石。它超级好奇，什么都想探一探，是个活泼开朗的小冒险家，夜里眼睛会发光哦！",
        img: "https://images.unsplash.com/photo-1511044568932-338cba0ad803?w=400&h=300&fit=crop",
        imgAlt: "https://images.unsplash.com/photo-1543852786-1cf6624b9987?w=400&h=300&fit=crop",
        likes: 18,
        uploadedByUser: false
    },
    {
        id: "cat-007",
        name: "咪咪",
        breed: "狸花猫",
        age: 3,
        traits: ["粘人", "活泼", "贪吃"],
        favorite: "逗猫绳",
        desc: "咪咪是只聪明的小狸花，特别会撒娇。它会用各种方式讨好主人，然后趁机骗小鱼干吃，是个精明的毛孩子。",
        img: "https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?w=400&h=300&fit=crop",
        imgAlt: "https://images.unsplash.com/photo-1555685812-4b943f1cb0eb?w=400&h=300&fit=crop",
        likes: 14,
        uploadedByUser: false
    },
    {
        id: "cat-008",
        name: "团子",
        breed: "布偶猫",
        age: 2.5,
        traits: ["安静", "粘人", "爱睡觉"],
        favorite: "软垫",
        desc: "团子毛色像糯米糍，性格也软绵绵的。它走路慢慢悠悠，睡觉安安静静，是治愈系小天使，让人看了就心生温暖。",
        img: "https://images.unsplash.com/photo-1568043210943-0e8c7b4c6b5e?w=400&h=300&fit=crop",
        imgAlt: "https://images.unsplash.com/photo-1540541338287-41700207dee6?w=400&h=300&fit=crop",
        likes: 22,
        uploadedByUser: false
    },
    {
        id: "cat-009",
        name: "雪球",
        breed: "英短银渐层",
        age: 1,
        traits: ["活泼", "好奇"],
        favorite: "电动老鼠",
        desc: "雪球毛色银白闪亮，像一个小雪球在房间里滚动。它精力充沛，喜欢追逐一切会动的东西，是个永动机小猫咪。",
        img: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=400&h=300&fit=crop",
        imgAlt: "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=400&h=300&fit=crop",
        likes: 16,
        uploadedByUser: false
    },
    {
        id: "cat-010",
        name: "阿花",
        breed: "三花猫",
        age: 2,
        traits: ["粘人", "活泼"],
        favorite: "羽毛棒",
        desc: "阿花拥有独特的三花毛色，是只超级有灵性的小猫咪。它会听懂自己的名字，还会对主人喵喵叫表达需求，非常通人性。",
        img: "https://images.unsplash.com/photo-1494256997604-768d1f608cac?w=400&h=300&fit=crop",
        imgAlt: "https://images.unsplash.com/photo-1548247416-ec66f4900b2e?w=400&h=300&fit=crop",
        likes: 19,
        uploadedByUser: false
    },
    {
        id: "cat-011",
        name: "年糕",
        breed: "苏格兰折耳猫",
        age: 3.5,
        traits: ["安静", "粘人", "爱睡觉"],
        favorite: "安静毛绒玩具",
        desc: "年糕有着可爱的折耳，像一块软糯的年糕。它性格温顺，不爱闹腾，最喜欢静静地躺在温暖的地方，是个安静的美男子。",
        img: "https://images.unsplash.com/photo-1519052537078-e6302a4968d4?w=400&h=300&fit=crop",
        imgAlt: "https://images.unsplash.com/photo-1516223725307-9f4a7c3d2c44?w=400&h=300&fit=crop",
        likes: 21,
        uploadedByUser: false
    },
    {
        id: "cat-012",
        name: "煤球",
        breed: "英短纯黑",
        age: 2,
        traits: ["活泼", "粘人"],
        favorite: "逗猫激光灯",
        desc: "煤球是个全黑的小精灵，眼睛像两颗绿宝石。它超级粘人，喜欢跳上主人的腿蹭来蹭去，据说还能辟邪呢！",
        img: "https://images.unsplash.com/photo-1548546738-8509cb246ed3?w=400&h=300&fit=crop",
        imgAlt: "https://images.unsplash.com/photo-1513379167753-1d3ddf5f3f1c?w=400&h=300&fit=crop",
        likes: 17,
        uploadedByUser: false
    }
];

// ===== 状态管理 =====
let catsData = [];
let currentFilter = 'all';
let currentSearch = '';
let currentSort = 'default';
let userLikes = {};         // 点赞数据 { catId: count }
let userFavorites = [];      // 收藏列表 [catId, ...]
let clickCounts = {};        // 彩蛋计数

// ===== Chart.js 实例 =====
let likesChartInstance = null;
let favoritesChartInstance = null;
let kpiPieChartInstance = null;
let trendChartInstance = null;

// ===== KPI 计算 =====
/**
 * 计算猫咪热度分数
 * score = likes*2 + favorites*3 + shares*4 + views*0.5 + gameInteractions*1.5
 */
function calculateCatScore(cat) {
    const likesScore = getLikesCount(cat) * 2;
    const favoritesScore = (isFavorited(cat.id) ? 1 : 0) * 3;
    const sharesScore = (cat.shares || 0) * 4;
    const viewsScore = (cat.views || 0) * 0.5;
    const gameScore = (cat.gameInteractions || 0) * 1.5;
    return Math.round(likesScore + favoritesScore + sharesScore + viewsScore + gameScore);
}

/**
 * 获取猫咪等级
 */
function getCatLevel(score) {
    if (score >= 200) return { level: 5, name: '宇宙猫王', emoji: '👑', minScore: 200, maxScore: Infinity };
    if (score >= 100) return { level: 4, name: '传奇猫皇', emoji: '🌟', minScore: 100, maxScore: 199 };
    if (score >= 50) return { level: 3, name: '人气明星', emoji: '🎖️', minScore: 50, maxScore: 99 };
    if (score >= 20) return { level: 2, name: '网红猫咪', emoji: '🔥', minScore: 20, maxScore: 49 };
    return { level: 1, name: '休息区萌猫', emoji: '🌱', minScore: 0, maxScore: 19 };
}

/**
 * 获取等级进度百分比
 */
function getLevelProgress(score) {
    const level = getCatLevel(score);
    const range = level.maxScore - level.minScore;
    const progress = score - level.minScore;
    return Math.min(Math.max((progress / range) * 100, 0), 100);
}

/**
 * 初始化猫咪KPI数据
 */
function initCatKPI(cat) {
    return {
        ...cat,
        shares: cat.shares || 0,
        views: cat.views || 0,
        gameInteractions: cat.gameInteractions || 0,
        score: calculateCatScore(cat)
    };
}

/**
 * 保存KPI数据到localStorage
 */
function saveKPI() {
    const kpiData = {};
    catsData.forEach(cat => {
        kpiData[cat.id] = {
            shares: cat.shares || 0,
            views: cat.views || 0,
            gameInteractions: cat.gameInteractions || 0
        };
    });
    localStorage.setItem('catsKPI', JSON.stringify(kpiData));
}

/**
 * 渲染成长进度条
 */
function renderGrowthProgress(cat) {
    const score = calculateCatScore(cat);
    const level = getCatLevel(score);
    const progress = getLevelProgress(score);

    return `
        <div class="growth-section">
            <div class="growth-header">
                <span class="growth-label">
                    <span>📊</span> 热度
                </span>
                <span class="growth-level-badge">
                    ${level.emoji} ${level.name}
                </span>
            </div>
            <div class="progress-bar">
                <div class="progress-fill" style="width: ${progress}%"></div>
            </div>
            <div class="growth-stats">
                <span>❤️ ${getLikesCount(cat)} · 👀 ${cat.views || 0} · 🎮 ${cat.gameInteractions || 0}</span>
                <span>${score} 热度值</span>
            </div>
        </div>
    `;
}

/**
 * 初始化视图追踪 (IntersectionObserver)
 */
function initViewTracking() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const card = entry.target;
                const catId = card.dataset.catId;
                const cat = catsData.find(c => c.id === catId);
                if (cat) {
                    cat.views = (cat.views || 0) + 1;
                    saveKPI();
                }
            }
        });
    }, { threshold: 0.5 });

    // 观察所有猫咪卡片
    setTimeout(() => {
        document.querySelectorAll('.cat-card').forEach(card => {
            observer.observe(card);
        });
    }, 500);
}

// ===== 初始化数据 =====
function initData() {
    // 加载默认数据
    catsData = [...defaultCatsData];

    // 加载用户数据
    const savedCats = localStorage.getItem('userUploadedCats');
    if (savedCats) {
        const userCats = JSON.parse(savedCats);
        catsData = [...catsData, ...userCats];
    }

    // 加载点赞数据
    const savedLikes = localStorage.getItem('userLikes');
    if (savedLikes) {
        userLikes = JSON.parse(savedLikes);
    }

    // 加载收藏数据
    const savedFavorites = localStorage.getItem('userFavorites');
    if (savedFavorites) {
        userFavorites = JSON.parse(savedFavorites);
    }

    // 加载猫咪KPI数据
    const savedKPI = localStorage.getItem('catsKPI');
    if (savedKPI) {
        const kpiData = JSON.parse(savedKPI);
        catsData = catsData.map(cat => ({
            ...cat,
            shares: kpiData[cat.id]?.shares || 0,
            views: kpiData[cat.id]?.views || 0,
            gameInteractions: kpiData[cat.id]?.gameInteractions || 0
        }));
    }

    // 初始化视图追踪
    initViewTracking();
}

// ===== 工具函数 =====

/**
 * 生成唯一ID
 */
function generateId() {
    return 'user-cat-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
}

/**
 * 生成卡片ID
 */
function getCardId(catId) {
    return 'cat-card-' + catId;
}

/**
 * 获取猫咪点赞数
 */
function getLikesCount(cat) {
    return (userLikes[cat.id] || 0) + (cat.likes || 0);
}

/**
 * 检查猫咪是否被收藏
 */
function isFavorited(catId) {
    return userFavorites.includes(catId);
}

/**
 * 渲染 KPI 数据面板
 */
function renderDashboard() {
    // 计算总览数据
    const totalCats = catsData.length;
    let totalLikes = 0;
    let totalFavorites = userFavorites.length;
    let totalShares = 0;
    let totalViews = 0;
    let totalGameInteractions = 0;

    catsData.forEach(cat => {
        totalLikes += getLikesCount(cat);
        totalShares += cat.shares || 0;
        totalViews += cat.views || 0;
        totalGameInteractions += cat.gameInteractions || 0;
    });

    // 更新 KPI 卡片
    document.getElementById('totalCats').textContent = totalCats;
    document.getElementById('totalLikes').textContent = totalLikes;
    document.getElementById('totalFavorites').textContent = totalFavorites;
    document.getElementById('totalShares').textContent = totalShares;
    document.getElementById('totalViews').textContent = totalViews;
    document.getElementById('totalGameInteractions').textContent = totalGameInteractions;

    // 获取 TOP 10 数据
    const sortedByLikes = [...catsData].sort((a, b) => getLikesCount(b) - getLikesCount(a)).slice(0, 10);
    const sortedByFavorites = [...catsData].sort((a, b) => (isFavorited(b.id) ? 1 : 0) - (isFavorited(a.id) ? 1 : 0)).slice(0, 10);
    const sortedByScore = [...catsData].sort((a, b) => calculateCatScore(b) - calculateCatScore(a)).slice(0, 10);

    // 销毁旧图表
    if (likesChartInstance) likesChartInstance.destroy();
    if (favoritesChartInstance) favoritesChartInstance.destroy();
    if (kpiPieChartInstance) kpiPieChartInstance.destroy();
    if (trendChartInstance) trendChartInstance.destroy();

    // 点赞排行榜图表
    const likesCtx = document.getElementById('likesChart').getContext('2d');
    likesChartInstance = new Chart(likesCtx, {
        type: 'bar',
        data: {
            labels: sortedByLikes.map(c => c.name),
            datasets: [{
                label: '点赞数',
                data: sortedByLikes.map(c => getLikesCount(c)),
                backgroundColor: 'rgba(255, 107, 138, 0.7)',
                borderColor: 'rgba(255, 107, 138, 1)',
                borderWidth: 1,
                borderRadius: 5
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false }
            },
            scales: {
                y: { beginAtZero: true }
            }
        }
    });

    // 收藏排行榜图表
    const favCtx = document.getElementById('favoritesChart').getContext('2d');
    favoritesChartInstance = new Chart(favCtx, {
        type: 'bar',
        data: {
            labels: sortedByFavorites.map(c => c.name),
            datasets: [{
                label: '收藏状态',
                data: sortedByFavorites.map(c => isFavorited(c.id) ? 1 : 0),
                backgroundColor: sortedByFavorites.map(c =>
                    isFavorited(c.id) ? 'rgba(255, 107, 138, 0.7)' : 'rgba(200, 200, 200, 0.5)'
                ),
                borderColor: sortedByFavorites.map(c =>
                    isFavorited(c.id) ? 'rgba(255, 107, 138, 1)' : 'rgba(200, 200, 200, 1)'
                ),
                borderWidth: 1,
                borderRadius: 5
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false }
            },
            scales: {
                y: { beginAtZero: true, max: 1 }
            }
        }
    });

    // KPI 分布饼图
    const kpiCtx = document.getElementById('kpiPieChart').getContext('2d');
    kpiPieChartInstance = new Chart(kpiCtx, {
        type: 'doughnut',
        data: {
            labels: ['点赞', '浏览', '分享', '互动'],
            datasets: [{
                data: [totalLikes, totalViews, totalShares, totalGameInteractions],
                backgroundColor: [
                    'rgba(255, 107, 138, 0.8)',
                    'rgba(255, 183, 77, 0.8)',
                    'rgba(123, 198, 123, 0.8)',
                    'rgba(155, 155, 255, 0.8)'
                ],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });

    // 热度趋势折线图
    const trendCtx = document.getElementById('trendChart').getContext('2d');
    const trendLabels = sortedByScore.map(c => c.name);
    const trendData = sortedByScore.map(c => calculateCatScore(c));
    trendChartInstance = new Chart(trendCtx, {
        type: 'line',
        data: {
            labels: trendLabels,
            datasets: [{
                label: '热度值',
                data: trendData,
                borderColor: 'rgba(255, 155, 155, 1)',
                backgroundColor: 'rgba(255, 155, 155, 0.2)',
                fill: true,
                tension: 0.4,
                borderWidth: 2,
                pointBackgroundColor: 'rgba(255, 155, 155, 1)',
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
                pointRadius: 5
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false }
            },
            scales: {
                y: { beginAtZero: true }
            }
        }
    });
}

/**
 * 渲染排行榜
 */
function renderRanking() {
    const rankingList = document.getElementById('rankingList');
    const sortedCats = [...catsData].sort((a, b) => calculateCatScore(b) - calculateCatScore(a));

    rankingList.innerHTML = sortedCats.map((cat, index) => {
        const score = calculateCatScore(cat);
        const level = getCatLevel(score);
        const topClass = index === 0 ? 'top-1' : index === 1 ? 'top-2' : index === 2 ? 'top-3' : '';
        const crown = index === 0 ? '<span class="ranking-crown">👑</span>' : '';
        const position = index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `#${index + 1}`;

        return `
            <div class="ranking-item ${topClass}" data-cat-id="${cat.id}">
                <div class="ranking-position">${position}${crown}</div>
                <img class="ranking-image" src="${cat.img}" alt="${cat.name}"
                     onerror="this.src='https://placehold.co/60x60/FFE8E8/FF9B9B?text=${encodeURIComponent(cat.name)}'">
                <div class="ranking-info">
                    <div class="ranking-name">${cat.name} ${level.emoji}</div>
                    <div class="ranking-breed">${cat.breed}</div>
                </div>
                <div class="ranking-score">
                    <div class="ranking-score-value">${score}</div>
                    <div class="ranking-score-label">热度值</div>
                </div>
            </div>
        `;
    }).join('');

    // 排行榜点击事件
    rankingList.querySelectorAll('.ranking-item').forEach(item => {
        item.addEventListener('click', () => {
            const catId = item.dataset.catId;
            const cat = catsData.find(c => c.id === catId);
            if (cat) openModal(cat);
        });
    });
}

/**
 * 随机事件系统
 */
function startRandomEvents() {
    const events = [
        { icon: '🎲', text: '奶茶今天心情很好，被点赞了！' },
        { icon: '🌟', text: '橘子意外走红了！' },
        { icon: '🎉', text: '小白的照片被疯狂浏览！' },
        { icon: '✨', text: '毛球获得了神秘访客的互动！' },
        { icon: '💫', text: '团子被分享到了朋友圈！' },
        { icon: '🌈', text: '雪球今天超有人气！' },
        { icon: '🎈', text: '阿花收到了爱心点赞！' },
        { icon: '🌸', text: '年糕意外成为了网红！' },
        { icon: '🔥', text: '煤球正在被疯狂浏览！' },
        { icon: '💖', text: '黑豆收到了热情的互动！' }
    ];

    function showRandomEvent() {
        const event = events[Math.floor(Math.random() * events.length)];
        const toast = document.getElementById('randomEventToast');
        const icon = document.getElementById('eventIcon');
        const text = document.getElementById('eventText');

        icon.textContent = event.icon;
        text.textContent = event.text;
        toast.classList.add('show');

        setTimeout(() => {
            toast.classList.remove('show');
        }, 4000);

        // 随机给某只猫增加浏览
        const randomCat = catsData[Math.floor(Math.random() * catsData.length)];
        randomCat.views = (randomCat.views || 0) + Math.floor(Math.random() * 5) + 1;
        saveKPI();
        renderDashboard();
        renderRanking();
    }

    // 随机间隔 20-40 秒
    function scheduleNext() {
        const delay = 20000 + Math.random() * 20000;
        setTimeout(() => {
            showRandomEvent();
            scheduleNext();
        }, delay);
    }

    scheduleNext();
}

// ===== 核心功能 =====

/**
 * 筛选、搜索、排序猫咪数据
 */
function getFilteredCats() {
    let filtered = [...catsData];

    // 筛选
    if (currentFilter === 'favorited') {
        filtered = filtered.filter(cat => isFavorited(cat.id));
    } else if (currentFilter !== 'all') {
        filtered = filtered.filter(cat => cat.traits.includes(currentFilter));
    }

    // 搜索
    if (currentSearch) {
        const search = currentSearch.toLowerCase();
        filtered = filtered.filter(cat =>
            cat.name.toLowerCase().includes(search) ||
            cat.breed.toLowerCase().includes(search)
        );
    }

    // 排序
    switch (currentSort) {
        case 'name':
            filtered.sort((a, b) => a.name.localeCompare(b.name, 'zh-CN'));
            break;
        case 'name-desc':
            filtered.sort((a, b) => b.name.localeCompare(a.name, 'zh-CN'));
            break;
        case 'age':
            filtered.sort((a, b) => (a.age || 0) - (b.age || 0));
            break;
        case 'age-desc':
            filtered.sort((a, b) => (b.age || 0) - (a.age || 0));
            break;
        case 'likes':
            filtered.sort((a, b) => getLikesCount(b) - getLikesCount(a));
            break;
        case 'score':
            filtered.sort((a, b) => calculateCatScore(b) - calculateCatScore(a));
            break;
    }

    return filtered;
}

/**
 * 渲染猫咪卡片
 */
function renderCats() {
    const grid = document.getElementById('catsGrid');
    const emptyMessage = document.getElementById('emptyMessage');
    const catCount = document.getElementById('catCount');
    const filteredCats = getFilteredCats();

    catCount.textContent = `共 ${filteredCats.length} 只猫咪`;

    grid.innerHTML = '';

    if (filteredCats.length === 0) {
        grid.style.display = 'none';
        emptyMessage.style.display = 'block';
        return;
    }

    grid.style.display = 'grid';
    emptyMessage.style.display = 'none';

    filteredCats.forEach((cat, index) => {
        const card = createCatCard(cat, index);
        grid.appendChild(card);
    });
}

/**
 * 创建单个猫咪卡片
 */
function createCatCard(cat, index) {
    const card = document.createElement('div');
    card.className = 'cat-card';
    card.id = getCardId(cat.id);
    card.style.animationDelay = `${index * 0.08}s`;
    card.dataset.catId = cat.id;

    const likesCount = getLikesCount(cat);
    const isFav = isFavorited(cat.id);
    const traitsHTML = cat.traits.map(trait =>
        `<span class="cat-tag">${trait}</span>`
    ).join('');

    let badgeHTML = '';
    if (cat.uploadedByUser) {
        badgeHTML = '<div class="cat-user-badge">用户上传</div>';
    }

    card.innerHTML = `
        <div class="cat-image-container">
            ${badgeHTML}
            <img class="cat-image"
                 src="${cat.img}"
                 alt="${cat.name} - ${cat.breed}，${cat.desc?.slice(0, 30) || ''}..."
                 loading="lazy"
                 onerror="this.src='https://placehold.co/400x300/FFE8E8/FF9B9B?text=${encodeURIComponent(cat.name)}'">
            <img class="cat-image-alt"
                 src="${cat.imgAlt || cat.img}"
                 alt="${cat.name}的另一种表情"
                 loading="lazy">
            <div class="cat-image-overlay"></div>
            <div class="cat-like-count">
                <span>❤️</span> ${likesCount}
            </div>
            <div class="cat-actions">
                <button class="action-btn like-btn"
                        data-cat-id="${cat.id}"
                        title="点赞">
                    <span>👍</span>
                </button>
                <button class="action-btn favorite-btn ${isFav ? 'favorited' : ''}"
                        data-cat-id="${cat.id}"
                        title="${isFav ? '取消收藏' : '收藏'}">
                    <span>${isFav ? '❤️' : '🤍'}</span>
                </button>
                <button class="action-btn share-btn"
                        data-cat-id="${cat.id}"
                        title="分享">
                    <span>📤</span>
                </button>
            </div>
            <span class="cat-click-hint">点击查看详情</span>
        </div>
        <div class="cat-info">
            <div class="cat-header">
                <h3 class="cat-name">${cat.name}</h3>
            </div>
            <p class="cat-breed">${cat.breed}</p>
            <p class="cat-age">🎂 ${cat.age}岁</p>
            <div class="cat-tags">${traitsHTML}</div>
            <div class="cat-favorites">
                <span>🎾 ${cat.favorite || '未知'}</span>
            </div>
            ${renderGrowthProgress(cat)}
        </div>
    `;

    setupCardEvents(card, cat);

    return card;
}

/**
 * 设置卡片事件
 */
function setupCardEvents(card, cat) {
    // 点击打开 Modal
    card.addEventListener('click', (e) => {
        if (e.target.closest('.action-btn')) return;
        openModal(cat);
    });

    // 点赞按钮
    const likeBtn = card.querySelector('.like-btn');
    likeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleLike(cat.id, likeBtn, card);
    });

    // 收藏按钮
    const favBtn = card.querySelector('.favorite-btn');
    favBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleFavorite(cat.id, favBtn, card);
    });

    // 分享按钮
    const shareBtn = card.querySelector('.share-btn');
    shareBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        shareCat(cat, shareBtn);
    });

    // 彩蛋：连续点击头像触发
    const imageContainer = card.querySelector('.cat-image-container');
    imageContainer.addEventListener('click', (e) => {
        if (e.target.closest('.action-btn')) return;

        clickCounts[cat.id] = (clickCounts[cat.id] || 0) + 1;

        if (clickCounts[cat.id] >= 5) {
            triggerEasterEgg(cat.name, card);
            clickCounts[cat.id] = 0;
        }

        card.classList.add('playing');
        setTimeout(() => card.classList.remove('playing'), 1000);
    });
}

/**
 * 切换点赞状态
 */
function toggleLike(catId, btn, card) {
    userLikes[catId] = (userLikes[catId] || 0) + 1;
    localStorage.setItem('userLikes', JSON.stringify(userLikes));

    btn.classList.add('liked');
    btn.querySelector('span').textContent = '❤️';

    const likeCount = card.querySelector('.cat-like-count');
    likeCount.innerHTML = `<span>❤️</span> ${getLikesCount({ id: catId, likes: 0 })}`;

    // 动画效果
    btn.style.transform = 'scale(1.3)';
    setTimeout(() => {
        btn.style.transform = '';
    }, 300);

    updateFooterStats();
}

/**
 * 切换收藏状态
 */
function toggleFavorite(catId, btn, card) {
    const index = userFavorites.indexOf(catId);
    if (index > -1) {
        userFavorites.splice(index, 1);
        btn.classList.remove('favorited');
        btn.querySelector('span').textContent = '🤍';
    } else {
        userFavorites.push(catId);
        btn.classList.add('favorited');
        btn.querySelector('span').textContent = '❤️';

        // 动画效果
        btn.style.transform = 'scale(1.3) rotate(-15deg)';
        setTimeout(() => {
            btn.style.transform = '';
        }, 300);
    }
    localStorage.setItem('userFavorites', JSON.stringify(userFavorites));

    // 如果当前在"只看收藏"筛选，更新显示
    if (currentFilter === 'favorited') {
        renderCats();
    }

    updateFooterStats();
    renderFavoritesSection();
}

/**
 * 分享猫咪
 */
function shareCat(cat, btn) {
    const shareUrl = `${window.location.origin}${window.location.pathname}?cat=${cat.id}`;
    const shareText = `来看看这只可爱的${cat.name}！${cat.breed}，${cat.age}岁，${cat.desc?.slice(0, 50) || ''}...`;

    // 分享成功，增加分享计数
    if (!cat.shares) cat.shares = 0;
    cat.shares++;
    saveKPI();

    if (navigator.share) {
        navigator.share({
            title: `${cat.name} - 猫咪图鉴`,
            text: shareText,
            url: shareUrl
        }).catch(() => {});
    } else {
        navigator.clipboard.writeText(`${shareText}\n${shareUrl}`).then(() => {
            const originalHTML = btn.innerHTML;
            btn.innerHTML = '<span>✅</span>';
            btn.style.background = '#7BC67B';
            showToast('分享链接已复制', 'success');
            setTimeout(() => {
                btn.innerHTML = originalHTML;
                btn.style.background = '';
            }, 1500);
        });
    }
}

/**
 * 打开 Modal
 */
function openModal(cat) {
    const overlay = document.getElementById('modalOverlay');
    const content = document.getElementById('modalContent');
    const likesCount = getLikesCount(cat);
    const isFav = isFavorited(cat.id);

    const traitsHTML = cat.traits.map(trait =>
        `<span class="modal-tag">${trait}</span>`
    ).join('');

    content.querySelector('.modal-body').innerHTML = `
        <img class="modal-image"
             src="${cat.img}"
             alt="${cat.name}的特写照片"
             onerror="this.src='https://placehold.co/500x300/FFE8E8/FF9B9B?text=${encodeURIComponent(cat.name)}'">
        <h2 class="modal-name">${cat.name}</h2>
        <p class="modal-breed">${cat.breed}</p>
        <p class="modal-age">🎂 ${cat.age}岁 · ❤️ ${likesCount} 次点赞</p>
        <div class="modal-tags">${traitsHTML}</div>

        <div class="modal-section">
            <h3 class="modal-section-title">📖 关于 ${cat.name}</h3>
            <p class="modal-description">${cat.desc || '暂无描述'}</p>
        </div>

        <div class="modal-section">
            <h3 class="modal-section-title">💝 ${cat.name}的最爱</h3>
            <div class="modal-favorites-grid">
                <div class="modal-favorite-item">
                    <span>🎾</span>
                    <span>${cat.favorite || '未知'}</span>
                </div>
            </div>
        </div>

        <div class="modal-section">
            <h3 class="modal-section-title">📊 ${cat.name}的数据</h3>
            <div class="modal-kpi-grid">
                <div class="modal-kpi-item">
                    <span class="modal-kpi-icon">❤️</span>
                    <span class="modal-kpi-value">${likesCount}</span>
                    <span class="modal-kpi-label">点赞</span>
                </div>
                <div class="modal-kpi-item">
                    <span class="modal-kpi-icon">👀</span>
                    <span class="modal-kpi-value">${cat.views || 0}</span>
                    <span class="modal-kpi-label">浏览</span>
                </div>
                <div class="modal-kpi-item">
                    <span class="modal-kpi-icon">📤</span>
                    <span class="modal-kpi-value">${cat.shares || 0}</span>
                    <span class="modal-kpi-label">分享</span>
                </div>
                <div class="modal-kpi-item">
                    <span class="modal-kpi-icon">🎮</span>
                    <span class="modal-kpi-value">${cat.gameInteractions || 0}</span>
                    <span class="modal-kpi-label">互动</span>
                </div>
            </div>
            <div class="modal-level-info">
                ${(() => {
                    const score = calculateCatScore(cat);
                    const level = getCatLevel(score);
                    return `<span class="level-badge">${level.emoji} ${level.name}</span> · 热度值: ${score}`;
                })()}
            </div>
        </div>

        <div style="display: flex; gap: 10px; margin-top: 20px;">
            <button class="modal-share-btn copy" id="modalLikeBtn">
                <span>👍</span> 点赞 (${likesCount})
            </button>
            <button class="modal-share-btn copy ${isFav ? 'favorited' : ''}" id="modalFavoriteBtn" style="${isFav ? 'background: #FF6B8A; color: white;' : ''}">
                <span>${isFav ? '❤️' : '🤍'}</span> ${isFav ? '已收藏' : '收藏'}
            </button>
        </div>

        <div class="modal-share-btns">
            <button class="modal-share-btn copy" id="modalCopyBtn">
                <span>📋</span> 复制链接
            </button>
        </div>
    `;

    // Modal 内的点赞按钮
    document.getElementById('modalLikeBtn').addEventListener('click', function() {
        userLikes[cat.id] = (userLikes[cat.id] || 0) + 1;
        localStorage.setItem('userLikes', JSON.stringify(userLikes));
        this.innerHTML = `<span>❤️</span> 点赞 (${getLikesCount(cat)})`;
        this.style.background = '#FF6B8A';
        this.style.color = 'white';
        showToast('点赞成功！', 'success');
        updateFooterStats();
    });

    // Modal 内的收藏按钮
    document.getElementById('modalFavoriteBtn').addEventListener('click', function() {
        const index = userFavorites.indexOf(cat.id);
        if (index > -1) {
            userFavorites.splice(index, 1);
            this.classList.remove('favorited');
            this.style.background = '';
            this.style.color = '';
            this.innerHTML = '<span>🤍</span> 收藏';
        } else {
            userFavorites.push(cat.id);
            this.classList.add('favorited');
            this.style.background = '#FF6B8A';
            this.style.color = 'white';
            this.innerHTML = '<span>❤️</span> 已收藏';
        }
        localStorage.setItem('userFavorites', JSON.stringify(userFavorites));
        renderCats();
        renderFavoritesSection();
        updateFooterStats();
    });

    // 复制链接按钮
    document.getElementById('modalCopyBtn').addEventListener('click', function() {
        const shareUrl = `${window.location.origin}${window.location.pathname}?cat=${cat.id}`;
        navigator.clipboard.writeText(shareUrl).then(() => {
            this.innerHTML = '<span>✅</span> 已复制!';
            this.classList.add('success');
            showToast('分享链接已复制', 'success');
            setTimeout(() => {
                this.innerHTML = '<span>📋</span> 复制链接';
                this.classList.remove('success');
            }, 2000);
        });
    });

    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

/**
 * 关闭 Modal
 */
function closeModal() {
    const overlay = document.getElementById('modalOverlay');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
}

// ===== 筛选、搜索、排序 =====

function setupFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentFilter = btn.dataset.filter;
            renderCats();
        });
    });
}

function setupSearch() {
    const searchInput = document.getElementById('searchInput');
    const clearBtn = document.getElementById('clearSearch');

    let debounceTimer;
    searchInput.addEventListener('input', () => {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
            currentSearch = searchInput.value.trim();
            clearBtn.style.display = currentSearch ? 'block' : 'none';
            renderCats();
        }, 300);
    });

    clearBtn.addEventListener('click', () => {
        searchInput.value = '';
        currentSearch = '';
        clearBtn.style.display = 'none';
        renderCats();
    });
}

function setupSort() {
    const sortSelect = document.getElementById('sortSelect');

    sortSelect.addEventListener('change', () => {
        currentSort = sortSelect.value;
        renderCats();
    });
}

// ===== 导航 =====

function setupNavigation() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    // 移动端菜单切换
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // 点击导航链接
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const section = link.dataset.section;
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');

            // 关闭移动端菜单
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');

            // 平滑滚动
            let targetId;
            switch (section) {
                case 'hero':
                    targetId = 'hero';
                    break;
                case 'cats':
                    targetId = 'cats-section';
                    break;
                case 'upload':
                    targetId = 'upload-section';
                    break;
                case 'favorites':
                    targetId = 'favorites-section';
                    break;
            }

            const target = document.getElementById(targetId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // 滚动时更新导航状态
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        const sections = ['hero', 'cats-section', 'upload-section', 'favorites-section'];

        for (const sectionId of sections) {
            const section = document.getElementById(sectionId);
            if (section) {
                const offsetTop = section.offsetTop - 100;
                const offsetBottom = offsetTop + section.offsetHeight;
                if (scrollY >= offsetTop && scrollY < offsetBottom) {
                    navLinks.forEach(l => l.classList.remove('active'));
                    document.querySelector(`[data-section="${sectionId === 'cats-section' ? 'cats' : sectionId === 'upload-section' ? 'upload' : sectionId === 'favorites-section' ? 'favorites' : 'hero'}"]`)?.classList.add('active');
                    break;
                }
            }
        }
    });
}

// ===== 随机猫咪推荐 =====

function highlightRandomCat() {
    const filteredCats = getFilteredCats();
    if (filteredCats.length === 0) return;

    const randomCat = filteredCats[Math.floor(Math.random() * filteredCats.length)];
    const cardId = getCardId(randomCat.id);
    const card = document.getElementById(cardId);

    if (!card) return;

    card.scrollIntoView({ behavior: 'smooth', block: 'center' });

    card.classList.add('highlight');
    setTimeout(() => card.classList.remove('highlight'), 3000);

    // 显示推荐提示
    showToast(`今天推荐你看看：${randomCat.name}`, 'info');
}

// ===== 彩蛋功能 =====

function triggerEasterEgg(catName, card) {
    // 卡片摇晃
    card.classList.add('shaking');
    setTimeout(() => card.classList.remove('shaking'), 500);

    // 创建粒子动画
    createEasterEggParticles(card);

    // 显示彩蛋提示
    const toast = document.getElementById('easterEggToast');
    const messages = [
        `喵～${catName}好喜欢你！`,
        `${catName}打了个哈欠~ 😽`,
        `哇！你是${catName}的超级粉丝！`,
        `${catName}想跟你玩！`,
        `🎉 隐藏猫咪魅力已解锁！`,
        `${catName}撒了一地猫粮~ 🌟`
    ];
    toast.querySelector('.toast-text').textContent = messages[Math.floor(Math.random() * messages.length)];

    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3000);
}

function createEasterEggParticles(card) {
    const container = document.getElementById('easterEggParticles');
    const rect = card.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const particles = ['🐾', '💖', '✨', '🌟', '💕', '🐱'];
    const emojis = ['喵~', '喵!', '😺', '💗'];

    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.textContent = particles[Math.floor(Math.random() * particles.length)];

        const angle = (Math.PI * 2 * i) / 20;
        const distance = 100 + Math.random() * 100;
        const tx = Math.cos(angle) * distance;
        const ty = Math.sin(angle) * distance;

        particle.style.left = centerX + 'px';
        particle.style.top = centerY + 'px';
        particle.style.setProperty('--tx', tx + 'px');
        particle.style.setProperty('--ty', ty + 'px');
        particle.style.animationDelay = (i * 0.05) + 's';

        container.appendChild(particle);

        setTimeout(() => particle.remove(), 2500);
    }

    // 显示文字飘出
    setTimeout(() => {
        const textParticle = document.createElement('div');
        textParticle.className = 'particle';
        textParticle.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        textParticle.style.left = centerX + 'px';
        textParticle.style.top = (centerY - 50) + 'px';
        textParticle.style.setProperty('--tx', '0px');
        textParticle.style.setProperty('--ty', '-100px');
        textParticle.style.fontSize = '2.5rem';
        textParticle.style.animationDelay = '0s';

        container.appendChild(textParticle);
        setTimeout(() => textParticle.remove(), 2500);
    }, 500);
}

// ===== 上传新猫咪 =====

function setupUploadForm() {
    const form = document.getElementById('uploadForm');
    const imageMethodRadios = document.querySelectorAll('input[name="imageMethod"]');
    const imageUrlInput = document.getElementById('imageUrlInput');
    const imageFileInput = document.getElementById('imageFileInput');
    const fileInput = document.getElementById('catImageFile');
    const uploadArea = document.getElementById('fileUploadArea');
    const uploadPlaceholder = document.getElementById('uploadPlaceholder');
    const imagePreview = document.getElementById('imagePreview');
    const removeImageBtn = document.getElementById('removeImage');
    const traitsValidation = document.getElementById('traitsValidation');

    let uploadedImageData = null;

    // 图片方式切换
    imageMethodRadios.forEach(radio => {
        radio.addEventListener('change', () => {
            if (radio.value === 'url') {
                imageUrlInput.style.display = 'block';
                imageFileInput.style.display = 'none';
            } else {
                imageUrlInput.style.display = 'none';
                imageFileInput.style.display = 'block';
            }
        });
    });

    // 文件上传点击
    uploadArea.addEventListener('click', () => {
        fileInput.click();
    });

    // 文件选择
    fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                uploadedImageData = event.target.result;
                imagePreview.src = uploadedImageData;
                imagePreview.style.display = 'block';
                uploadPlaceholder.style.display = 'none';
                removeImageBtn.style.display = 'block';
            };
            reader.readAsDataURL(file);
        }
    });

    // 拖拽上传
    uploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadArea.classList.add('dragover');
    });

    uploadArea.addEventListener('dragleave', () => {
        uploadArea.classList.remove('dragover');
    });

    uploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadArea.classList.remove('dragover');

        const file = e.dataTransfer.files[0];
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (event) => {
                uploadedImageData = event.target.result;
                imagePreview.src = uploadedImageData;
                imagePreview.style.display = 'block';
                uploadPlaceholder.style.display = 'none';
                removeImageBtn.style.display = 'block';
            };
            reader.readAsDataURL(file);
        }
    });

    // 移除图片
    removeImageBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        uploadedImageData = null;
        imagePreview.src = '';
        imagePreview.style.display = 'none';
        uploadPlaceholder.style.display = 'flex';
        removeImageBtn.style.display = 'none';
        fileInput.value = '';
    });

    // 表单提交
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // 获取性格标签
        const traits = [];
        document.querySelectorAll('input[name="traits"]:checked').forEach(cb => {
            traits.push(cb.value);
        });

        // 验证
        const name = document.getElementById('catName').value.trim();
        const breed = document.getElementById('catBreed').value.trim();
        const age = document.getElementById('catAge').value;
        const favorite = document.getElementById('catFavorite').value.trim();
        const desc = document.getElementById('catDesc').value.trim();
        const imageMethod = document.querySelector('input[name="imageMethod"]:checked').value;

        if (!name) {
            showToast('请输入猫咪名字', 'error');
            return;
        }

        if (!breed) {
            showToast('请输入猫咪品种', 'error');
            return;
        }

        if (!age || isNaN(parseFloat(age)) || parseFloat(age) < 0) {
            showToast('请输入有效的年龄（数字）', 'error');
            return;
        }

        if (traits.length === 0) {
            traitsValidation.classList.add('show');
            showToast('请至少选择一个性格标签', 'error');
            return;
        } else {
            traitsValidation.classList.remove('show');
        }

        // 获取图片
        let imgUrl = '';
        if (imageMethod === 'url') {
            imgUrl = document.getElementById('catImageUrl').value.trim();
        } else {
            imgUrl = uploadedImageData || '';
        }

        // 如果没有图片，使用占位图
        if (!imgUrl) {
            imgUrl = `https://placehold.co/400x300/FFE8E8/FF9B9B?text=${encodeURIComponent(name)}`;
        }

        // 创建新猫咪对象
        const newCat = {
            id: generateId(),
            name,
            breed,
            age: parseFloat(age),
            traits,
            favorite: favorite || '神秘玩具',
            desc: desc || `${name}是一只可爱的小猫咪，性格${traits.join('、')}。`,
            img: imgUrl,
            imgAlt: imgUrl,
            likes: 0,
            shares: 0,
            views: 0,
            gameInteractions: 0,
            uploadedByUser: true
        };

        // 保存到localStorage
        const savedCats = JSON.parse(localStorage.getItem('userUploadedCats') || '[]');
        savedCats.push(newCat);
        localStorage.setItem('userUploadedCats', JSON.stringify(savedCats));

        // 添加到数据
        catsData.push(newCat);

        // 重新渲染
        renderCats();

        // 显示成功提示
        const successToast = document.getElementById('uploadSuccessToast');
        successToast.classList.add('show');
        setTimeout(() => successToast.classList.remove('show'), 3000);

        // 重置表单
        form.reset();
        uploadedImageData = null;
        imagePreview.style.display = 'none';
        uploadPlaceholder.style.display = 'flex';
        removeImageBtn.style.display = 'none';
        traitsValidation.classList.remove('show');

        // 滚动到猫咪展示区
        document.getElementById('cats-section').scrollIntoView({ behavior: 'smooth' });

        // 更新导航高亮
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        document.querySelector('[data-section="cats"]').classList.add('active');
    });
}

// ===== 收藏区域 =====

function renderFavoritesSection() {
    const favoritesSection = document.getElementById('favorites-section');
    const favoritesGrid = document.getElementById('favoritesGrid');
    const emptyFavorites = document.getElementById('emptyFavorites');

    const favoriteCats = catsData.filter(cat => isFavorited(cat.id));

    if (favoriteCats.length === 0) {
        favoritesGrid.innerHTML = '';
        emptyFavorites.style.display = 'block';
    } else {
        emptyFavorites.style.display = 'none';
        favoritesGrid.innerHTML = '';
        favoriteCats.forEach((cat, index) => {
            const card = createCatCard(cat, index);
            favoritesGrid.appendChild(card);
        });
    }
}

// ===== 提示信息 =====

function showToast(message, type = 'info') {
    // 创建临时toast
    const toast = document.createElement('div');
    toast.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) scale(0);
        background: ${type === 'success' ? 'linear-gradient(135deg, #7BC67B, #5FBF5F)' : type === 'error' ? 'linear-gradient(135deg, #FF6B6B, #E55555)' : 'linear-gradient(135deg, #FF9B9B, #FFB26B)'};
        color: white;
        padding: 18px 35px;
        border-radius: 25px;
        font-size: 1.1rem;
        font-weight: 500;
        z-index: 5000;
        opacity: 0;
        transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        box-shadow: 0 10px 40px rgba(0,0,0,0.2);
    `;
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => toast.style.opacity = '1', 10);
    toast.style.transform = 'translate(-50%, -50%) scale(1)';

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translate(-50%, -50%) scale(0)';
        setTimeout(() => toast.remove(), 400);
    }, 2500);
}

// ===== 毛线球游戏 =====

function initYarnGame() {
    const yarnBall = document.getElementById('yarnBall');
    const scoreEl = document.getElementById('yarnScore');
    const comboDisplay = document.getElementById('comboDisplay');
    const comboCount = document.getElementById('comboCount');
    const gameToast = document.getElementById('gameToast');
    const gameToastText = document.getElementById('gameToastText');

    let score = parseInt(localStorage.getItem('yarnScore') || '0');
    let combo = 0;
    let lastCatchTime = 0;
    scoreEl.textContent = score;

    let isDragging = false;
    let startX, startY, initialX, initialY;
    let ballX = window.innerWidth - 100;
    let ballY = window.innerHeight - 150;

    yarnBall.style.right = 'auto';
    yarnBall.style.bottom = 'auto';
    yarnBall.style.left = ballX + 'px';
    yarnBall.style.top = ballY + 'px';

    yarnBall.addEventListener('mousedown', startDrag);
    yarnBall.addEventListener('touchstart', startDrag, { passive: false });

    document.addEventListener('mousemove', drag);
    document.addEventListener('touchmove', drag, { passive: false });

    document.addEventListener('mouseup', endDrag);
    document.addEventListener('touchend', endDrag);

    function startDrag(e) {
        e.preventDefault();
        isDragging = true;
        const clientX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
        const clientY = e.type.includes('touch') ? e.touches[0].clientY : e.clientY;
        startX = clientX;
        startY = clientY;
        initialX = yarnBall.offsetLeft;
        initialY = yarnBall.offsetTop;
        yarnBall.style.cursor = 'grabbing';
    }

    function drag(e) {
        if (!isDragging) return;
        e.preventDefault();

        const clientX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
        const clientY = e.type.includes('touch') ? e.touches[0].clientY : e.clientY;

        ballX = initialX + (clientX - startX);
        ballY = initialY + (clientY - startY);

        ballX = Math.max(0, Math.min(ballX, window.innerWidth - 70));
        ballY = Math.max(0, Math.min(ballY, window.innerHeight - 70));

        yarnBall.style.left = ballX + 'px';
        yarnBall.style.top = ballY + 'px';
    }

    function catchBall() {
        const now = Date.now();
        const timeDiff = now - lastCatchTime;

        // 如果在2秒内再次抓到，增加连击
        if (timeDiff < 2000) {
            combo++;
            if (combo >= 2) {
                comboCount.textContent = combo;
                comboDisplay.style.display = 'block';
            }
        } else {
            combo = 1;
            comboDisplay.style.display = 'none';
        }

        lastCatchTime = now;

        score++;
        scoreEl.textContent = score;
        localStorage.setItem('yarnScore', score.toString());

        // 随机给一只猫增加互动（每3次抓取触发一次）
        if (score % 3 === 0) {
            const randomCat = catsData[Math.floor(Math.random() * catsData.length)];
            randomCat.gameInteractions = (randomCat.gameInteractions || 0) + 1;
            saveKPI();

            // 显示游戏提示
            gameToastText.textContent = `${randomCat.name} 获得 +1 互动！${combo > 1 ? `连击 x${combo}！` : ''}`;
            gameToast.classList.add('show');
            setTimeout(() => gameToast.classList.remove('show'), 2500);

            // 更新面板
            renderDashboard();
            renderRanking();
            renderCats();
        }

        yarnBall.classList.add('caught');
        setTimeout(() => yarnBall.classList.remove('caught'), 500);

        // 重置连击显示
        setTimeout(() => {
            if (Date.now() - lastCatchTime >= 2000) {
                comboDisplay.style.display = 'none';
                combo = 0;
            }
        }, 2000);
    }

    function endDrag() {
        if (!isDragging) return;
        isDragging = false;
        yarnBall.style.cursor = 'grab';
        catchBall();
    }

    yarnBall.addEventListener('dblclick', () => {
        catchBall();
    });
}

// ===== 页脚统计 =====

function updateFooterStats() {
    const statsEl = document.getElementById('footerStats');
    const favCount = userFavorites.length;
    const totalLikes = Object.values(userLikes).reduce((a, b) => a + b, 0);
    const yarnScore = localStorage.getItem('yarnScore') || '0';
    const userCatsCount = catsData.filter(c => c.uploadedByUser).length;

    statsEl.innerHTML = `
        ❤️ 收藏 ${favCount} 只 · 👍 点赞 ${totalLikes} 次 · 🧶 毛线球 ${yarnScore} 分 · 📷 上传 ${userCatsCount} 只
    `;
}

// ===== 平滑滚动 =====

function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href').substring(1);
            const target = document.getElementById(targetId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

// ===== 检查URL参数 =====

function checkUrlParams() {
    const params = new URLSearchParams(window.location.search);
    const catId = params.get('cat');
    if (catId) {
        setTimeout(() => {
            const card = document.getElementById(getCardId(catId));
            if (card) {
                card.scrollIntoView({ behavior: 'smooth', block: 'center' });
                card.classList.add('highlight');
                setTimeout(() => card.classList.remove('highlight'), 3000);
            }
        }, 500);
    }
}

// ===== 初始化 =====

document.addEventListener('DOMContentLoaded', () => {
    // 初始化数据
    initData();

    // 渲染猫咪卡片
    renderCats();

    // 设置筛选
    setupFilters();

    // 设置搜索
    setupSearch();

    // 设置排序
    setupSort();

    // 设置导航
    setupNavigation();

    // 设置上传表单
    setupUploadForm();

    // 设置平滑滚动
    setupSmoothScroll();

    // 随机猫咪按钮
    document.getElementById('randomBtn').addEventListener('click', highlightRandomCat);

    // Modal 关闭
    document.getElementById('modalClose').addEventListener('click', closeModal);
    document.getElementById('modalOverlay').addEventListener('click', (e) => {
        if (e.target.id === 'modalOverlay') closeModal();
    });

    // ESC 关闭 Modal
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeModal();
    });

    // 初始化毛线球游戏
    initYarnGame();

    // 初始化 KPI 面板
    renderDashboard();
    renderRanking();

    // 启动随机事件系统
    startRandomEvents();

    // 更新统计
    updateFooterStats();

    // 检查URL参数
    checkUrlParams();

    // 键盘快捷键
    document.addEventListener('keydown', (e) => {
        if (e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
            if (e.key === 'r') highlightRandomCat();
        }
    });
});

// ===== 导出函数供测试用 =====
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { catsData, getFilteredCats, renderCats, initData };
}