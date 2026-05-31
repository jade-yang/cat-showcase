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
let isDarkMode = false;      // 夜间模式状态
let backendDataLoaded = false;
let viewObserver = null;
let viewedCatsSession = new Set();
let adminSearch = '';
let adminSort = 'createdAt-desc';

// ===== Chart.js 实例 =====
let likesChartInstance = null;
let favoritesChartInstance = null;
let kpiPieChartInstance = null;
let trendChartInstance = null;
let levelDistChartInstance = null;

function syncGlobalState() {
    window.catsData = catsData;
    window.userFavorites = userFavorites;
    window.backendDataLoaded = backendDataLoaded;
}

function getGrowthEmoji(level) {
    const emojis = ['🌱', '🐾', '⭐', '🌟', '👑', '🚀'];
    return emojis[Math.max(0, Math.min(5, (level || 1) - 1))];
}

function normalizeClientCat(cat) {
    var expVal = Number(cat.exp || 0);
    var lvl = Number(cat.level || cat.growthLevel || 1);
    var titleVal = cat.title || cat.growthTitle || '新手萌猫';

    // 如果后端返回了 EXP 但没有 growthProgress，通过 growth.js 计算
    var progressVal = Number(cat.growthProgress || 0);
    if (expVal > 0 && progressVal === 0 && typeof getGrowthLevel === 'function' && typeof getGrowthProgress === 'function') {
        var lvlInfo = getGrowthLevel(expVal);
        progressVal = getGrowthProgress(expVal, lvlInfo);
    }

    var normalized = {
        id: cat.id,
        name: cat.name,
        breed: cat.breed || '',
        age: Number(cat.age || 0),
        traits: Array.isArray(cat.traits) ? cat.traits : [],
        favorite: cat.favorite || '神秘玩具',
        desc: cat.desc || '',
        img: cat.img || '',
        imgAlt: cat.imgAlt || cat.img || '',
        likes: Number(cat.likes || 0),
        favorites: Number(cat.favorites || 0),
        shares: Number(cat.shares || 0),
        views: Number(cat.views || 0),
        gameInteractions: Number(cat.gameInteractions || 0),
        exp: expVal,
        level: lvl,
        title: titleVal,
        growthLevel: lvl,
        growthTitle: titleVal,
        growthEmoji: cat.growthEmoji || getGrowthEmoji(lvl),
        growthProgress: progressVal,
        uploadedByUser: !!cat.uploadedByUser,
        uploaderId: cat.uploaderId || null,
        createdAt: cat.createdAt || null,
        updatedAt: cat.updatedAt || null
    };
    return normalized;
}

function replaceCatInState(updatedCat) {
    const normalized = normalizeClientCat(updatedCat);
    const index = catsData.findIndex(cat => cat.id === normalized.id);
    if (index > -1) {
        catsData[index] = normalized;
    } else {
        catsData.push(normalized);
    }
    syncGlobalState();
    return normalized;
}

function renderAllDynamicSections() {
    renderCats();
    renderDashboard();
    renderRanking();
    renderAdminTable();
    renderMyUploads();
    updateFooterStats();
}

// ===== 夜间模式功能 =====

var enableDarkMode, disableDarkMode, applyTheme, _themeToggleDebounce;

(function () {
    var THEME_STORAGE_KEY = 'darkMode';
    var DEBOUNCE_MS = 300;

    /**
     * 内部核心：应用主题状态到页面
     * @param {boolean} dark - 是否启用暗色模式
     * @param {boolean} save - 是否写入 localStorage（默认 true）
     */
    function _applyThemeState(dark, save) {
        isDarkMode = dark;

        if (dark) {
            document.body.classList.add('dark-mode');
            document.documentElement.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
            document.documentElement.classList.remove('dark-mode');
        }

        _updateThemeIcon();

        if (save !== false) {
            localStorage.setItem(THEME_STORAGE_KEY, dark ? 'true' : 'false');
        }

        // 重绘图表（Canvas 无法自动响应 CSS 变量，需重建）
        _refreshThemeSensitiveUI();
    }

    /**
     * 刷新对主题敏感的 UI 组件（Dashboard 图表 / 排行榜 / 管理表格）
     */
    function _refreshThemeSensitiveUI() {
        if (typeof renderDashboard === 'function') {
            renderDashboard();
        }
        // 排行榜和管理表格使用 CSS 变量，DOM 已自动响应；
        // 此处仅做额外保险：若任一包含绝对定位/JS 生成元素则强制刷新
        if (typeof renderRanking === 'function') {
            renderRanking();
        }
        if (typeof renderAdminTable === 'function') {
            renderAdminTable();
        }
    }

    /**
     * 更新按钮图标
     */
    function _updateThemeIcon() {
        var themeIcon = document.getElementById('themeIcon');
        if (themeIcon) {
            themeIcon.textContent = isDarkMode ? '\u2600\uFE0F' : '\uD83C\uDF19';
        }
    }

    /**
     * 切换主题（带防抖保护，防止快速点击导致图表反复销毁重建）
     */
    function _toggleTheme() {
        if (_themeToggleDebounce) return;
        _themeToggleDebounce = true;

        _applyThemeState(!isDarkMode, true);

        setTimeout(function () {
            _themeToggleDebounce = false;
        }, DEBOUNCE_MS);
    }

    /**
     * 绑定按钮事件（click + touchend，移动端兼容）
     */
    function _bindToggleButton() {
        var themeToggle = document.getElementById('themeToggle');
        if (!themeToggle) return;

        // 防止同一按钮多次绑定
        if (themeToggle.dataset.themeBound === 'true') return;
        themeToggle.dataset.themeBound = 'true';

        // click —— 桌面端主事件
        themeToggle.addEventListener('click', function (e) {
            e.preventDefault();
            _toggleTheme();
        });

        // touchend —— 移动端兼容，阻止触发两次
        themeToggle.addEventListener('touchend', function (e) {
            e.preventDefault();
            // 仅在 touch 设备上通过 touchend 触发（避免同时触发 click）
            if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
                _toggleTheme();
            }
        });

        // 全局键盘快捷键：Ctrl/Cmd + Shift + D 切换主题
        document.addEventListener('keydown', function (e) {
            if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'D') {
                e.preventDefault();
                _toggleTheme();
            }
        });
    }

    /**
     * 初始化夜间模式（页面加载时调用）
     */
    function initTheme() {
        // 1. 从 localStorage 读取持久化状态
        var savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
        var shouldBeDark = savedTheme === 'true';

        // 2. 也检测系统偏好（首次访问无 localStorage 记录时）
        if (savedTheme === null && window.matchMedia) {
            shouldBeDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        }

        // 3. 防御性清理：先移除所有可能残留的 dark-mode 类
        document.body.classList.remove('dark-mode');
        document.documentElement.classList.remove('dark-mode');

        // 4. 应用正确状态（不写 localStorage，因为我们已经读取了）
        _applyThemeState(shouldBeDark, false);

        // 5. 如果是从系统偏好推导的，写入 localStorage
        if (savedTheme === null) {
            localStorage.setItem(THEME_STORAGE_KEY, shouldBeDark ? 'true' : 'false');
        }

        // 6. 绑定切换按钮
        _bindToggleButton();

        // 7. 监听系统主题变化（当用户未手动设置时自动跟随）
        if (window.matchMedia) {
            var colorSchemeQuery = window.matchMedia('(prefers-color-scheme: dark)');
            colorSchemeQuery.addEventListener('change', function (e) {
                // 仅在用户未手动覆盖时跟随系统
                var manualOverride = localStorage.getItem(THEME_STORAGE_KEY);
                if (manualOverride === null) {
                    _applyThemeState(e.matches, false);
                }
            });
        }
    }

    // 暴露给外部调用（供其他模块切换）
    enableDarkMode = function () { _applyThemeState(true, true); };
    disableDarkMode = function () { _applyThemeState(false, true); };
    applyTheme = _applyThemeState;

    // 注册初始化入口
    window.initTheme = initTheme;
})();

// ===== 图表主题配置 =====
/**
 * 获取当前主题的图表颜色配置
 */
function getChartThemeColors() {
    const isDark = document.body.classList.contains('dark-mode');
    return {
        textColor: isDark ? '#E8E8E8' : '#4A4A4A',
        gridColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
        tickColor: isDark ? '#A0A0A0' : '#7A7A7A',
        legendColor: isDark ? '#E8E8E8' : '#4A4A4A'
    };
}

// ===== KPI 计算 (统一委托到 growth.js 成长系统) =====
/**
 * 计算猫咪 EXP（统一入口，委托给 growth.js）
 * exp = likes*5 + favorites*10 + shares*15 + views*1 + gameInteractions*8
 */
function calculateCatScore(cat) {
    if (typeof calculateGrowth === 'function') {
        return calculateGrowth(cat);
    }
    // fallback 计算
    var likesScore = getLikesCount(cat) * 5;
    var favoritesScore = (cat.favorites || 0) * 10;
    var sharesScore = (cat.shares || 0) * 15;
    var viewsScore = (cat.views || 0) * 1;
    var gameScore = (cat.gameInteractions || 0) * 8;
    return Math.round(likesScore + favoritesScore + sharesScore + viewsScore + gameScore);
}

/**
 * 获取猫咪等级（统一入口，委托给 growth.js）
 */
function getCatLevel(exp) {
    if (typeof getGrowthLevel === 'function') {
        return getGrowthLevel(exp);
    }
    // fallback
    if (exp >= 1000) return { level: 6, title: '宇宙喵神', emoji: '🚀', minExp: 1000, maxExp: Infinity };
    if (exp >= 600)  return { level: 5, title: '传说猫王', emoji: '👑', minExp: 600, maxExp: 999 };
    if (exp >= 300)  return { level: 4, title: '明星喵喵', emoji: '🌟', minExp: 300, maxExp: 599 };
    if (exp >= 150)  return { level: 3, title: '人气猫咪', emoji: '⭐', minExp: 150, maxExp: 299 };
    if (exp >= 50)   return { level: 2, title: '活跃小猫', emoji: '🐾', minExp: 50, maxExp: 149 };
    return { level: 1, title: '新手萌猫', emoji: '🌱', minExp: 0, maxExp: 49 };
}

/**
 * 获取等级进度百分比（统一入口，委托给 growth.js）
 */
function getLevelProgress(exp) {
    if (typeof getGrowthProgress === 'function' && typeof getGrowthLevel === 'function') {
        var lvl = getGrowthLevel(exp);
        return getGrowthProgress(exp, lvl);
    }
    // fallback
    var level = getCatLevel(exp);
    var range = level.maxExp - level.minExp;
    var progress = exp - level.minExp;
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
 * 渲染成长进度条（回退版本，优先使用 growth.js 的 renderGrowthUI）
 */
function renderGrowthProgress(cat) {
    var exp = cat.exp || 0;
    var level = getCatLevel(exp);
    var progress = getLevelProgress(exp);
    var nextExp = level.level < 6 ? level.maxExp - exp + 1 : 0;

    return '' +
        '<div class="growth-section">' +
            '<div class="growth-header">' +
                '<span class="growth-label">' +
                    '<span>' + level.emoji + '</span> Lv.' + level.level +
                '</span>' +
                '<span class="growth-title-badge">' + level.title + '</span>' +
            '</div>' +
            '<div class="progress-bar">' +
                '<div class="progress-fill growth-fill" style="width: ' + progress + '%"></div>' +
            '</div>' +
            '<div class="growth-stats">' +
                '<span>' + exp + ' EXP</span>' +
                (level.level < 6
                    ? '<span>距下一级还需 ' + nextExp + ' EXP</span>'
                    : '<span>已满级 ' + level.emoji + '</span>') +
            '</div>' +
        '</div>';
}

/**
 * 初始化视图追踪 (IntersectionObserver)
 */
function initViewTracking() {
    if (viewObserver) {
        viewObserver.disconnect();
    }

    viewObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const card = entry.target;
                const catId = card.dataset.catId;
                if (viewedCatsSession.has(catId)) {
                    viewObserver.unobserve(card);
                    return;
                }
                viewedCatsSession.add(catId);
                viewObserver.unobserve(card);
                const cat = catsData.find(c => c.id === catId);
                if (cat) {
                    updateCatStats(cat.id, { views: 1 }, { silent: true }).then(updated => {
                        if (updated) {
                            renderDashboard();
                            renderRanking();
                            renderAdminTable();
                            updateFooterStats();
                        }
                    });
                }
            }
        });
    }, { threshold: 0.5 });

    // 观察所有猫咪卡片
    setTimeout(() => {
        document.querySelectorAll('.cat-card').forEach(card => {
            viewObserver.observe(card);
        });
    }, 100);
}

// ===== 初始化数据 =====
async function initData() {
    backendDataLoaded = false;

    // 加载旧版本地偏好。点赞核心计数改由后端保存，旧 userLikes 只保留兼容读取。
    const savedLikes = localStorage.getItem('userLikes');
    if (savedLikes) {
        try { userLikes = JSON.parse(savedLikes); } catch (e) { userLikes = {}; }
    }

    const savedFavorites = localStorage.getItem('userFavorites');
    if (savedFavorites) {
        try { userFavorites = JSON.parse(savedFavorites); } catch (e) { userFavorites = []; }
    }

    const savedClicks = localStorage.getItem('easterEggClicks');
    if (savedClicks) {
        try { clickCounts = JSON.parse(savedClicks); } catch (e) { clickCounts = {}; }
    }

    try {
        if (!window.CatApi) {
            throw new Error('API 模块未加载');
        }
        const apiCats = await window.CatApi.getCats();
        catsData = apiCats.map(normalizeClientCat);
        backendDataLoaded = true;
    } catch (error) {
        console.error('加载后端猫咪数据失败，已使用本地兜底数据：', error);
        showToast('后端数据加载失败，暂时显示本地数据', 'error');
        catsData = defaultCatsData.map(normalizeClientCat);

        const savedCats = localStorage.getItem('userUploadedCats');
        if (savedCats) {
            try {
                const userCats = JSON.parse(savedCats);
                catsData = [...catsData, ...userCats.map(normalizeClientCat)];
            } catch (e) {}
        }

        const savedKPI = localStorage.getItem('catsKPI');
        if (savedKPI) {
            try {
                const kpiData = JSON.parse(savedKPI);
                catsData = catsData.map(cat => normalizeClientCat({
                    ...cat,
                    shares: kpiData[cat.id]?.shares || 0,
                    views: kpiData[cat.id]?.views || 0,
                    gameInteractions: kpiData[cat.id]?.gameInteractions || 0
                }));
            } catch (e) {}
        }
    }

    syncGlobalState();
}

// ===== 工具函数 =====

/**
 * 刷新单张猫咪卡片（用于成长数据更新后局部刷新）
 */
function refreshCatCard(cat) {
    var card = document.getElementById(getCardId(cat.id));
    if (!card) return;

    // 更新成长区域 HTML
    var growthSection = card.querySelector('.growth-section');
    if (growthSection && typeof renderGrowthUI === 'function') {
        growthSection.outerHTML = renderGrowthUI(cat);
    }

    // 更新等级边框
    var growthLevel = cat.growthLevel || 1;
    card.classList.remove('level-4-card', 'level-5-card', 'level-6-card');
    if (growthLevel >= 6) {
        card.classList.add('level-6-card');
    } else if (growthLevel >= 5) {
        card.classList.add('level-5-card');
    } else if (growthLevel >= 4) {
        card.classList.add('level-4-card');
    }
}

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

function escapeHTML(value) {
    return String(value ?? '').replace(/[&<>"']/g, function (char) {
        return {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
        }[char];
    });
}

/**
 * 获取猫咪点赞数
 */
function getLikesCount(cat) {
    return cat.likes || 0;
}

/**
 * 检查猫咪是否被收藏
 */
function isFavorited(catId) {
    return userFavorites.includes(catId);
}

async function updateCatStats(catId, stats, options = {}) {
    const cat = catsData.find(c => c.id === catId);
    if (!cat) return null;
    const oldLevel = cat.growthLevel || cat.level || 1;

    if (!backendDataLoaded || !window.CatApi) {
        Object.entries(stats).forEach(([field, value]) => {
            cat[field] = Math.max(0, Number(cat[field] || 0) + Number(value || 0));
        });
        if (typeof updateCatGrowth === 'function') {
            updateCatGrowth(cat);
        }
        saveKPI();
        syncGlobalState();
        return cat;
    }

    try {
        const updated = await window.CatApi.updateStats(catId, stats);
        const normalized = replaceCatInState(updated);
        // 确保成长进度是最新计算的
        if (typeof updateCatGrowth === 'function') {
            updateCatGrowth(normalized);
            normalized.growthProgress = normalized.growthProgress || getLevelProgress(normalized.exp || 0);
        }
        if (typeof saveGrowthData === 'function') {
            saveGrowthData();
        }
        if (!options.silent && (normalized.growthLevel || normalized.level || 1) > oldLevel && typeof triggerLevelUpAnimation === 'function') {
            triggerLevelUpAnimation(normalized, oldLevel, normalized.growthLevel || normalized.level);
        }
        return normalized;
    } catch (error) {
        console.error('更新互动数据失败：', error);
        if (!options.silent) {
            showToast(error.message || '互动数据更新失败', 'error');
        }
        return null;
    }
}

/**
 * 渲染 KPI 数据面板
 */
function renderDashboard() {
    // 计算总览数据
    const totalCats = catsData.length;
    let totalLikes = 0;
    let totalFavorites = 0;
    let totalShares = 0;
    let totalViews = 0;
    let totalGameInteractions = 0;

    catsData.forEach(cat => {
        totalLikes += getLikesCount(cat);
        totalFavorites += cat.favorites || 0;
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

    if (typeof Chart === 'undefined') {
        return;
    }

    // 获取 TOP 10 数据
    const sortedByLikes = [...catsData].sort((a, b) => getLikesCount(b) - getLikesCount(a)).slice(0, 10);
    const sortedByFavorites = [...catsData].sort((a, b) => (b.favorites || 0) - (a.favorites || 0)).slice(0, 10);
    const sortedByScore = [...catsData].sort((a, b) => calculateCatScore(b) - calculateCatScore(a)).slice(0, 10);

    // 销毁旧图表
    if (likesChartInstance) likesChartInstance.destroy();
    if (favoritesChartInstance) favoritesChartInstance.destroy();
    if (kpiPieChartInstance) kpiPieChartInstance.destroy();
    if (trendChartInstance) trendChartInstance.destroy();
    if (levelDistChartInstance) levelDistChartInstance.destroy();

    // 获取主题颜色
    const themeColors = getChartThemeColors();

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
                x: {
                    ticks: { color: themeColors.tickColor },
                    grid: { color: themeColors.gridColor }
                },
                y: {
                    beginAtZero: true,
                    ticks: { color: themeColors.tickColor },
                    grid: { color: themeColors.gridColor }
                }
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
                data: sortedByFavorites.map(c => c.favorites || 0),
                backgroundColor: sortedByFavorites.map(c =>
                    (c.favorites || 0) > 0 ? 'rgba(255, 107, 138, 0.7)' : 'rgba(200, 200, 200, 0.5)'
                ),
                borderColor: sortedByFavorites.map(c =>
                    (c.favorites || 0) > 0 ? 'rgba(255, 107, 138, 1)' : 'rgba(200, 200, 200, 1)'
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
                x: {
                    ticks: { color: themeColors.tickColor },
                    grid: { color: themeColors.gridColor }
                },
                y: {
                    beginAtZero: true,
                    ticks: { color: themeColors.tickColor },
                    grid: { color: themeColors.gridColor }
                }
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
                    position: 'bottom',
                    labels: {
                        color: themeColors.legendColor
                    }
                }
            }
        }
    });

    // 热度趋势折线图 (EXP)
    var trendCtx = document.getElementById('trendChart').getContext('2d');
    var trendLabels = sortedByScore.map(function(c) { return c.name; });
    var trendData = sortedByScore.map(function(c) { return calculateCatScore(c); });
    trendChartInstance = new Chart(trendCtx, {
        type: 'line',
        data: {
            labels: trendLabels,
            datasets: [{
                label: 'EXP',
                data: trendData,
                borderColor: 'rgba(255, 155, 155, 1)',
                backgroundColor: 'rgba(255, 155, 155, 0.2)',
                fill: true,
                tension: 0.4,
                borderWidth: 2,
                pointBackgroundColor: 'rgba(255, 155, 155, 1)',
                pointBorderColor: document.body.classList.contains('dark-mode') ? '#2A2A2A' : '#fff',
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
                x: {
                    ticks: { color: themeColors.tickColor },
                    grid: { color: themeColors.gridColor }
                },
                y: {
                    beginAtZero: true,
                    ticks: { color: themeColors.tickColor },
                    grid: { color: themeColors.gridColor }
                }
            }
        }
    });

    // 猫咪等级分布饼图
    var levelLabels = ['新手萌猫', '活跃小猫', '人气猫咪', '明星喵喵', '传说猫王', '宇宙喵神'];
    var levelEmojis = ['🌱', '🐾', '⭐', '🌟', '👑', '🚀'];
    var levelColors = [
        'rgba(155, 200, 155, 0.8)',
        'rgba(255, 183, 77, 0.8)',
        'rgba(255, 155, 155, 0.8)',
        'rgba(255, 107, 138, 0.8)',
        'rgba(200, 100, 200, 0.8)',
        'rgba(255, 215, 0, 0.9)'
    ];
    var levelCounts = [0, 0, 0, 0, 0, 0];
    catsData.forEach(function (cat) {
        var lvl = cat.growthLevel || 1;
        var idx = Math.min(lvl - 1, 5);
        levelCounts[idx]++;
    });

    // 过滤掉数量为 0 的等级
    var filteredLabels = [];
    var filteredData = [];
    var filteredColors = [];
    levelCounts.forEach(function (count, i) {
        if (count > 0) {
            filteredLabels.push(levelEmojis[i] + ' ' + levelLabels[i]);
            filteredData.push(count);
            filteredColors.push(levelColors[i]);
        }
    });

    var levelDistCanvas = document.getElementById('levelDistChart');
    if (levelDistCanvas) {
        var levelDistCtx = levelDistCanvas.getContext('2d');
        levelDistChartInstance = new Chart(levelDistCtx, {
            type: 'doughnut',
            data: {
                labels: filteredLabels.length > 0 ? filteredLabels : ['暂无数据'],
                datasets: [{
                    data: filteredData.length > 0 ? filteredData : [1],
                    backgroundColor: filteredColors.length > 0 ? filteredColors : ['rgba(200,200,200,0.5)'],
                    borderWidth: 0,
                    hoverOffset: 8
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            color: themeColors.legendColor,
                            padding: 12,
                            font: { size: 12 }
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: function (ctx) {
                                var total = ctx.dataset.data.reduce(function (a, b) { return a + b; }, 0);
                                var pct = Math.round((ctx.parsed / total) * 100);
                                return ctx.label + ': ' + ctx.parsed + ' 只 (' + pct + '%)';
                            }
                        }
                    }
                }
            }
        });
    }
}

/**
 * 渲染排行榜
 */
function renderRanking() {
    var rankingList = document.getElementById('rankingList');
    // 确保每只猫的成长数据是最新的
    catsData.forEach(function(cat) {
        if (typeof updateCatGrowth === 'function') {
            updateCatGrowth(cat);
        }
    });
    var sortedCats = catsData.slice().sort(function(a, b) {
        return (b.exp || 0) - (a.exp || 0);
    });

    rankingList.innerHTML = sortedCats.map(function(cat, index) {
        var exp = cat.exp || 0;
        var level = getCatLevel(exp);
        var progress = getLevelProgress(exp);
        var topClass = index === 0 ? 'top-1' : index === 1 ? 'top-2' : index === 2 ? 'top-3' : '';
        var crown = index === 0 ? '<span class="ranking-crown">👑</span>' : '';
        var position = index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : '#' + (index + 1);

        return '' +
            '<div class="ranking-item ' + topClass + '" data-cat-id="' + cat.id + '">' +
                '<div class="ranking-position">' + position + crown + '</div>' +
                '<img class="ranking-image" src="' + cat.img + '" alt="' + cat.name + '"' +
                '     onerror="this.src=\'https://placehold.co/60x60/FFE8E8/FF9B9B?text=' + encodeURIComponent(cat.name) + '\'">' +
                '<div class="ranking-info">' +
                    '<div class="ranking-name">' + cat.name + '</div>' +
                    '<div class="ranking-breed">' + cat.breed + ' · ' + level.emoji + ' ' + level.title + '</div>' +
                '</div>' +
                '<div class="ranking-score">' +
                    '<div class="ranking-score-value">' + exp + '</div>' +
                    '<div class="ranking-score-label">EXP</div>' +
                '</div>' +
            '</div>';
    }).join('');

    // 排行榜点击事件
    rankingList.querySelectorAll('.ranking-item').forEach(function(item) {
        item.addEventListener('click', function() {
            var catId = item.dataset.catId;
            var cat = catsData.find(function(c) { return c.id === catId; });
            if (cat) openModal(cat);
        });
    });
}

/**
 * 随机事件系统
 */
function startRandomEvents() {
    var eventTemplates = [
        { icon: '🎲', text: '好像有人在偷偷看猫咪们～' },
        { icon: '🌟', text: '突然走红！某只猫被疯狂浏览！' },
        { icon: '🎉', text: '神秘访客给猫咪们点了赞！' },
        { icon: '✨', text: '猫猫世界发生了奇妙的事情～' },
        { icon: '💫', text: '有人分享了猫咪照片到朋友圈！' },
        { icon: '🌈', text: '今天的猫咪们格外耀眼！' },
        { icon: '🎈', text: '爱心爆炸！猫咪收到了一波点赞！' },
        { icon: '🌸', text: '某只猫咪成为了今日之星！' },
        { icon: '🔥', text: '热度飙升！猫咪图鉴被疯狂浏览！' },
        { icon: '💖', text: '某只猫咪悄悄打动了所有人的心！' }
    ];

    async function showRandomEvent() {
        if (catsData.length === 0) return;
        var randomCat = catsData[Math.floor(Math.random() * catsData.length)];
        var event = eventTemplates[Math.floor(Math.random() * eventTemplates.length)];
        var toast = document.getElementById('randomEventToast');
        var icon = document.getElementById('eventIcon');
        var text = document.getElementById('eventText');

        icon.textContent = event.icon;
        text.textContent = randomCat.name + '：' + event.text;
        toast.classList.add('show');

        setTimeout(() => {
            toast.classList.remove('show');
        }, 4000);

        // 随机给这只猫增加浏览量
        var updated = await updateCatStats(randomCat.id, { views: Math.floor(Math.random() * 5) + 1 }, { silent: true });
        if (updated) {
            refreshCatCard(updated);
            renderDashboard();
            renderRanking();
            renderAdminTable();
            updateFooterStats();
        }
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
        case 'createdAt-desc':
            filtered.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
            break;
        case 'exp-desc':
            filtered.sort((a, b) => (b.exp || 0) - (a.exp || 0));
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

    initViewTracking();
}

/**
 * 创建单个猫咪卡片
 */
function createCatCard(cat, index) {
    var card = document.createElement('div');
    var growthLevel = cat.growthLevel || 1;
    var levelClass = growthLevel >= 6 ? 'level-6-card' :
                     growthLevel >= 5 ? 'level-5-card' :
                     growthLevel >= 4 ? 'level-4-card' : '';

    card.className = 'cat-card' + (levelClass ? ' ' + levelClass : '');
    card.id = getCardId(cat.id);
    card.style.animationDelay = (index * 0.08) + 's';
    card.dataset.catId = cat.id;

    var likesCount = getLikesCount(cat);
    var isFav = isFavorited(cat.id);
    var traitsHTML = cat.traits.map(function (trait) {
        return '<span class="cat-tag">' + trait + '</span>';
    }).join('');

    var badgeHTML = '';
    if (cat.uploadedByUser) {
        badgeHTML = '<div class="cat-user-badge">用户上传</div>';
    }

    // 使用新的成长 UI（如果 growth.js 已加载），否则回退到旧的
    var growthHTML = '';
    if (typeof renderGrowthUI === 'function') {
        growthHTML = renderGrowthUI(cat);
    } else if (typeof renderGrowthProgress === 'function') {
        growthHTML = renderGrowthProgress(cat);
    }

    card.innerHTML = '' +
        '<div class="cat-image-container">' +
            badgeHTML +
            '<img class="cat-image"' +
            '     src="' + cat.img + '"' +
            '     alt="' + cat.name + ' - ' + cat.breed + '"' +
            '     loading="lazy"' +
            '     onerror="this.src=\'https://placehold.co/400x300/FFE8E8/FF9B9B?text=' + encodeURIComponent(cat.name) + '\'">' +
            '<img class="cat-image-alt"' +
            '     src="' + (cat.imgAlt || cat.img) + '"' +
            '     alt="' + cat.name + '的另一种表情"' +
            '     loading="lazy">' +
            '<div class="cat-image-overlay"></div>' +
            '<div class="cat-like-count">' +
                '<span>❤️</span> ' + likesCount +
            '</div>' +
            '<div class="cat-actions">' +
                '<button class="action-btn like-btn"' +
                '        data-cat-id="' + cat.id + '"' +
                '        title="点赞">' +
                    '<span>👍</span>' +
                '</button>' +
                '<button class="action-btn favorite-btn' + (isFav ? ' favorited' : '') + '"' +
                '        data-cat-id="' + cat.id + '"' +
                '        title="' + (isFav ? '取消收藏' : '收藏') + '">' +
                    '<span>' + (isFav ? '❤️' : '🤍') + '</span>' +
                '</button>' +
                '<button class="action-btn share-btn"' +
                '        data-cat-id="' + cat.id + '"' +
                '        title="分享">' +
                    '<span>📤</span>' +
                '</button>' +
                '<button class="action-btn poster-btn"' +
                '        data-cat-id="' + cat.id + '"' +
                '        title="生成分享海报"' +
                '        style="font-size:0.9rem;">' +
                    '<span>🖼️</span>' +
                '</button>' +
                '<button class="action-btn edit-btn admin-only" data-display="inline-flex"' +
                '        data-cat-id="' + cat.id + '"' +
                '        title="编辑">' +
                    '<span>✏️</span>' +
                '</button>' +
                '<button class="action-btn delete-btn admin-only" data-display="inline-flex"' +
                '        data-cat-id="' + cat.id + '"' +
                '        title="删除">' +
                    '<span>🗑️</span>' +
                '</button>' +
            '</div>' +
            '<span class="cat-click-hint">点击查看详情</span>' +
            '<div class="card-shimmer"></div>' +
            '<div class="hover-paw">🐾</div>' +
        '</div>' +
        '<div class="cat-info">' +
            '<div class="cat-header">' +
                '<h3 class="cat-name">' + cat.name + '</h3>' +
            '</div>' +
            '<p class="cat-breed">' + cat.breed + '</p>' +
            '<p class="cat-age">🎂 ' + cat.age + '岁</p>' +
            '<div class="cat-tags">' + traitsHTML + '</div>' +
            '<div class="cat-favorites">' +
                '<span>🎾 ' + (cat.favorite || '未知') + '</span>' +
            '</div>' +
            growthHTML +
        '</div>';

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

    // 海报生成按钮
    const posterBtn = card.querySelector('.poster-btn');
    if (posterBtn && typeof openPosterModal === 'function') {
        posterBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            openPosterModal(cat);
        });
    }

    const editBtn = card.querySelector('.edit-btn');
    editBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        openEditModal(cat.id);
    });

    const deleteBtn = card.querySelector('.delete-btn');
    deleteBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        deleteCat(cat.id);
    });

    // 彩蛋：连续点击头像触发（5次连击）
    const imageContainer = card.querySelector('.cat-image-container');
    imageContainer.addEventListener('click', (e) => {
        if (e.target.closest('.action-btn')) return;
        e.stopPropagation();

        clickCounts[cat.id] = (clickCounts[cat.id] || 0) + 1;
        // 持久化彩蛋进度（即使未触发也保存）
        localStorage.setItem('easterEggClicks', JSON.stringify(clickCounts));

        if (clickCounts[cat.id] >= 5) {
            triggerEasterEgg(cat.name, card);
            clickCounts[cat.id] = 0;
            localStorage.setItem('easterEggClicks', JSON.stringify(clickCounts));
        }

        card.classList.add('playing');
        setTimeout(() => card.classList.remove('playing'), 1000);
    });
}

/**
 * 切换点赞状态
 */
async function toggleLike(catId, btn, card) {
    const cat = await updateCatStats(catId, { likes: 1 });
    if (!cat) return;

    btn.classList.add('liked');
    btn.querySelector('span').textContent = '❤️';

    const likeCount = card.querySelector('.cat-like-count');
    likeCount.innerHTML = '<span>❤️</span> ' + getLikesCount(cat);

    // 动画效果
    btn.style.transform = 'scale(1.3)';
    setTimeout(function () {
        btn.style.transform = '';
    }, 300);

    refreshCatCard(cat);
    renderDashboard();
    renderRanking();
    renderAdminTable();
    updateFooterStats();
}

/**
 * 切换收藏状态
 */
async function toggleFavorite(catId, btn, card) {
    const index = userFavorites.indexOf(catId);
    const shouldFavorite = index === -1;
    const cat = await updateCatStats(catId, { favorites: shouldFavorite ? 1 : -1 });
    if (!cat) return;

    if (!shouldFavorite) {
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
    syncGlobalState();
    refreshCatCard(cat);

    // 如果当前在"只看收藏"筛选，更新显示
    if (currentFilter === 'favorited') {
        renderCats();
    }

    updateFooterStats();
    renderDashboard();
    renderRanking();
    renderAdminTable();
}

/**
 * 分享猫咪
 */
async function shareCat(cat, btn) {
    const shareUrl = `${window.location.origin}${window.location.pathname}?cat=${cat.id}`;
    var shareText = '我在猫咪图鉴发现了【' + cat.name + '】！它是 ' + cat.age + ' 岁的' + cat.breed + '，当前等级【' + (cat.growthTitle || cat.title || '新手萌猫') + '】。快来看看这只可爱猫咪吧 🐱';

    // Call backend share API
    let updatedCat = null;
    try {
        if (backendDataLoaded && window.CatApi && window.CatApi.shareCat) {
            updatedCat = await window.CatApi.shareCat(cat.id);
        } else {
            updatedCat = await updateCatStats(cat.id, { shares: 1 });
        }
    } catch (e) {
        updatedCat = await updateCatStats(cat.id, { shares: 1 });
    }

    if (updatedCat) {
        cat = updatedCat;
        refreshCatCard(cat);
        renderDashboard();
        renderRanking();
        renderAdminTable();
        renderMyUploads();
        updateFooterStats();
    }

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
                    var exp = cat.exp || 0;
                    var level = getCatLevel(exp);
                    var progress = getLevelProgress(exp);
                    return '<span class="level-badge">' + level.emoji + ' Lv.' + level.level + ' ' + level.title + '</span> · EXP: ' + exp + ' (进度 ' + progress + '%)';
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
            <button class="modal-share-btn copy" id="modalCopyTextBtn" style="background: linear-gradient(135deg, #7BC67B, #5FBF5F); color: white; border: none;">
                <span>📝</span> 复制分享文案
            </button>
            <button class="modal-share-btn copy" id="modalPosterBtn" style="background: linear-gradient(135deg, #FF9B9B, #FFB26B); color: white; border: none;">
                <span>🖼️</span> 生成分享海报
            </button>
        </div>

        <div id="modalCommentsSection" class="modal-section comments-section">
            <!-- 评论区由 comments.js 动态渲染 -->
        </div>
    `;

    // Modal 内的点赞按钮
    document.getElementById('modalLikeBtn').addEventListener('click', async function() {
        const updated = await updateCatStats(cat.id, { likes: 1 });
        if (!updated) return;
        cat = updated;
        this.innerHTML = `<span>❤️</span> 点赞 (${getLikesCount(cat)})`;
        this.style.background = '#FF6B8A';
        this.style.color = 'white';
        showToast('点赞成功！', 'success');
        renderAllDynamicSections();
    });

    // Modal 内的收藏按钮
    document.getElementById('modalFavoriteBtn').addEventListener('click', async function() {
        const index = userFavorites.indexOf(cat.id);
        const shouldFavorite = index === -1;
        const updated = await updateCatStats(cat.id, { favorites: shouldFavorite ? 1 : -1 });
        if (!updated) return;
        cat = updated;

        if (!shouldFavorite) {
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
        syncGlobalState();
        renderAllDynamicSections();
    });

    // 复制链接按钮
    document.getElementById('modalCopyBtn').addEventListener('click', async function() {
        const shareUrl = `${window.location.origin}${window.location.pathname}?cat=${cat.id}`;
        const updated = await updateCatStats(cat.id, { shares: 1 }, { silent: true });
        if (updated) {
            cat = updated;
            renderAllDynamicSections();
        }
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

    // Modal 内的海报按钮
    var modalPosterBtn = document.getElementById('modalPosterBtn');
    if (modalPosterBtn && typeof openPosterModal === 'function') {
        modalPosterBtn.addEventListener('click', function() {
            closeModal();
            setTimeout(function () { openPosterModal(cat); }, 350);
        });
    }

    // Modal 内的复制分享文案按钮
    var modalCopyTextBtn = document.getElementById('modalCopyTextBtn');
    if (modalCopyTextBtn) {
        modalCopyTextBtn.addEventListener('click', async function() {
            var shareText = '我在猫咪图鉴发现了【' + cat.name + '】！它是 ' + cat.age + ' 岁的' + cat.breed + '，称号是【' + (cat.growthTitle || cat.title || '人气猫咪') + '】。快来看看这只可爱猫咪吧 🐱';
            var shareUrl = window.location.origin + window.location.pathname + '?cat=' + cat.id;
            try {
                await updateCatStats(cat.id, { shares: 1 }, { silent: true });
                renderAllDynamicSections();
            } catch(e) {}
            navigator.clipboard.writeText(shareText + '\n' + shareUrl).then(function() {
                var btn = document.getElementById('modalCopyTextBtn');
                var origHTML = btn.innerHTML;
                btn.innerHTML = '<span>✅</span> 文案已复制!';
                showToast('分享文案已复制', 'success');
                setTimeout(function() {
                    btn.innerHTML = origHTML;
                }, 2000);
            });
        });
    }

    // Render comments
    if (window.Comments && window.Comments.renderSection) {
        window.Comments.renderSection(cat.id);
    }

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
                case 'dashboard':
                    targetId = 'dashboard-section';
                    break;
                case 'ranking':
                    targetId = 'ranking-section';
                    break;
                case 'upload':
                    targetId = 'upload-section';
                    break;
                case 'my-uploads':
                    targetId = 'my-uploads-section';
                    break;
                case 'admin':
                    targetId = 'admin-section';
                    break;
            }

            const target = document.getElementById(targetId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // 点击页面其他区域关闭移动端菜单
    document.addEventListener('click', (e) => {
        if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });

    // ESC 关闭移动端菜单
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });

    // 滚动时更新导航状态
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        const sections = [
            { id: 'hero', name: 'hero' },
            { id: 'cats-section', name: 'cats' },
            { id: 'dashboard-section', name: 'dashboard' },
            { id: 'ranking-section', name: 'ranking' },
            { id: 'upload-section', name: 'upload' },
            { id: 'my-uploads-section', name: 'my-uploads' },
            { id: 'admin-section', name: 'admin' }
        ];

        for (const section of sections) {
            const el = document.getElementById(section.id);
            if (el) {
                const offsetTop = el.offsetTop - 100;
                const offsetBottom = offsetTop + el.offsetHeight;
                if (scrollY >= offsetTop && scrollY < offsetBottom) {
                    navLinks.forEach(l => l.classList.remove('active'));
                    document.querySelector(`[data-section="${section.name}"]`)?.classList.add('active');
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

// ===== 猫咪管理后台 =====

function getAdminCats() {
    let rows = [...catsData];
    const keyword = adminSearch.trim().toLowerCase();

    if (keyword) {
        rows = rows.filter(cat =>
            cat.name.toLowerCase().includes(keyword) ||
            cat.breed.toLowerCase().includes(keyword)
        );
    }

    const [field, order] = adminSort.split('-');
    rows.sort((a, b) => {
        let result = 0;
        if (field === 'name') {
            result = a.name.localeCompare(b.name, 'zh-CN');
        } else if (field === 'createdAt') {
            result = new Date(a.createdAt || 0) - new Date(b.createdAt || 0);
        } else {
            result = Number(a[field] || 0) - Number(b[field] || 0);
        }
        return order === 'asc' ? result : -result;
    });

    return rows;
}

// ===== 我的上传 =====

function renderMyUploads() {
    var grid = document.getElementById('myUploadsGrid');
    var emptyEl = document.getElementById('myUploadsEmpty');
    var loginHint = document.getElementById('myUploadsLoginHint');
    if (!grid || !emptyEl || !loginHint) return;

    var isLoggedIn = window.Auth && window.Auth.isLoggedIn();
    if (!isLoggedIn) {
        loginHint.style.display = 'block';
        grid.style.display = 'none';
        emptyEl.style.display = 'none';
        return;
    }

    loginHint.style.display = 'none';
    var currentUser = window.Auth.getCurrentUser();
    var myCats = catsData.filter(function (c) {
        return c.uploaderId === currentUser.id;
    });

    if (myCats.length === 0) {
        grid.style.display = 'none';
        emptyEl.style.display = 'block';
    } else {
        grid.style.display = 'grid';
        emptyEl.style.display = 'none';
        grid.innerHTML = myCats.map(function (cat, index) {
            var likesCount = getLikesCount(cat);
            var traitsHTML = cat.traits.map(function (t) { return '<span class="cat-tag">' + t + '</span>'; }).join('');
            var growthHTML = typeof renderGrowthUI === 'function' ? renderGrowthUI(cat) : '';
            return '' +
              '<div class="my-cat-item" id="my-upload-' + cat.id + '">' +
                '<img class="my-cat-thumb" src="' + cat.img + '" alt="' + cat.name + '" onerror="this.src=\'https://placehold.co/150x100/FFE8E8/FF9B9B?text=' + encodeURIComponent(cat.name) + '\'">' +
                '<div class="my-cat-info">' +
                  '<h4 class="my-cat-name">' + cat.name + '</h4>' +
                  '<p class="my-cat-breed">' + cat.breed + ' · ' + cat.age + '岁</p>' +
                  '<div class="cat-tags">' + traitsHTML + '</div>' +
                  '<span class="my-cat-likes">❤️ ' + likesCount + '</span>' +
                '</div>' +
                '<div class="my-cat-actions">' +
                  '<button class="my-cat-edit-btn" data-cat-id="' + cat.id + '">编辑</button>' +
                  '<button class="my-cat-delete-btn" data-cat-id="' + cat.id + '">删除</button>' +
                '</div>' +
              '</div>';
        }).join('');

        // Bind events
        grid.querySelectorAll('.my-cat-edit-btn').forEach(function (btn) {
            btn.addEventListener('click', function () {
                openEditModal(btn.dataset.catId);
            });
        });
        grid.querySelectorAll('.my-cat-delete-btn').forEach(function (btn) {
            btn.addEventListener('click', function () {
                deleteCat(btn.dataset.catId);
            });
        });
    }
}

function renderAdminTable() {
    const tbody = document.getElementById('adminCatsTable');
    if (!tbody) return;

    const rows = getAdminCats();
    updateLegacyImportButton();

    if (rows.length === 0) {
        tbody.innerHTML = '<tr><td colspan="9" class="admin-empty">没有匹配的猫咪数据</td></tr>';
        return;
    }

    tbody.innerHTML = rows.map(cat => {
        const createdAt = cat.createdAt ? new Date(cat.createdAt).toLocaleString('zh-CN') : '-';
        return `
            <tr>
                <td>
                    <img class="admin-cat-thumb" src="${escapeHTML(cat.img)}" alt="${escapeHTML(cat.name)}"
                         onerror="this.src='https://placehold.co/72x54/FFE8E8/FF9B9B?text=${encodeURIComponent(cat.name)}'">
                </td>
                <td>${escapeHTML(cat.name)}</td>
                <td>${escapeHTML(cat.breed)}</td>
                <td>${escapeHTML(cat.age)}</td>
                <td><div class="admin-traits">${cat.traits.map(trait => `<span>${escapeHTML(trait)}</span>`).join('')}</div></td>
                <td>${cat.exp || 0}</td>
                <td>Lv.${cat.level || cat.growthLevel || 1} ${escapeHTML(cat.title || cat.growthTitle || '新手萌猫')}</td>
                <td>${escapeHTML(createdAt)}</td>
                <td>
                    <div class="admin-actions">
                        <button type="button" class="admin-edit-btn" data-cat-id="${escapeHTML(cat.id)}">编辑</button>
                        <button type="button" class="admin-delete-btn" data-cat-id="${escapeHTML(cat.id)}">删除</button>
                    </div>
                </td>
            </tr>
        `;
    }).join('');
}

function setupAdminPanel() {
    const searchInput = document.getElementById('adminSearchInput');
    const sortSelect = document.getElementById('adminSortSelect');
    const table = document.getElementById('adminCatsTable');
    const importBtn = document.getElementById('legacyImportBtn');

    if (searchInput) {
        let timer;
        searchInput.addEventListener('input', () => {
            clearTimeout(timer);
            timer = setTimeout(() => {
                adminSearch = searchInput.value.trim();
                renderAdminTable();
            }, 250);
        });
    }

    if (sortSelect) {
        sortSelect.addEventListener('change', () => {
            adminSort = sortSelect.value;
            renderAdminTable();
        });
    }

    if (table) {
        table.addEventListener('click', (event) => {
            const editBtn = event.target.closest('.admin-edit-btn');
            const deleteBtn = event.target.closest('.admin-delete-btn');
            if (editBtn) {
                openEditModal(editBtn.dataset.catId);
            }
            if (deleteBtn) {
                deleteCat(deleteBtn.dataset.catId);
            }
        });
    }

    if (importBtn) {
        importBtn.addEventListener('click', importLegacyCats);
        updateLegacyImportButton();
    }
}

function setupEditModal() {
    const overlay = document.getElementById('editModalOverlay');
    const closeBtn = document.getElementById('editModalClose');
    const cancelBtn = document.getElementById('editCancelBtn');
    const form = document.getElementById('editCatForm');

    if (!overlay || !form) return;

    closeBtn.addEventListener('click', closeEditModal);
    cancelBtn.addEventListener('click', closeEditModal);
    overlay.addEventListener('click', (event) => {
        if (event.target === overlay) closeEditModal();
    });

    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        const id = document.getElementById('editCatId').value;
        const traits = document.getElementById('editCatTraits').value
            .split(/[，,]/)
            .map(item => item.trim())
            .filter(Boolean);

        const payload = {
            name: document.getElementById('editCatName').value.trim(),
            breed: document.getElementById('editCatBreed').value.trim(),
            age: parseFloat(document.getElementById('editCatAge').value),
            traits,
            favorite: document.getElementById('editCatFavorite').value.trim(),
            desc: document.getElementById('editCatDesc').value.trim(),
            img: document.getElementById('editCatImg').value.trim()
        };

        if (!payload.name || !payload.breed || Number.isNaN(payload.age) || payload.age < 0 || traits.length === 0) {
            showToast('请填写有效的名字、品种、年龄和性格', 'error');
            return;
        }
        if (payload.desc.length > 300) {
            showToast('猫咪介绍不能超过 300 字', 'error');
            return;
        }

        try {
            let updated;
            if (backendDataLoaded && window.CatApi) {
                updated = await window.CatApi.updateCat(id, payload);
            } else {
                updated = { ...catsData.find(cat => cat.id === id), ...payload, updatedAt: new Date().toISOString() };
            }
            replaceCatInState(updated);
            closeEditModal();
            renderAllDynamicSections();
            showToast('猫咪资料已更新', 'success');
        } catch (error) {
            console.error('编辑猫咪失败：', error);
            showToast(error.message || '编辑猫咪失败', 'error');
        }
    });
}

function openEditModal(catId) {
    // Check auth for user-uploaded cats
    if (window.Auth) {
        var isLoggedIn = window.Auth.isLoggedIn();
        if (!isLoggedIn) {
            showToast('请先登录后再编辑猫咪', 'error');
            window.Auth.openModal('login');
            return;
        }
        var currentUser = window.Auth.getCurrentUser();
        var cat = catsData.find(function (c) { return c.id === catId; });
        if (cat && cat.uploadedByUser && cat.uploaderId && cat.uploaderId !== currentUser.id && currentUser.role !== 'admin') {
            showToast('只能编辑自己上传的猫咪', 'error');
            return;
        }
    }

    cat = catsData.find(function (item) { return item.id === catId; });
    var overlay = document.getElementById('editModalOverlay');
    if (!cat || !overlay) return;

    document.getElementById('editCatId').value = cat.id;
    document.getElementById('editCatName').value = cat.name || '';
    document.getElementById('editCatBreed').value = cat.breed || '';
    document.getElementById('editCatAge').value = cat.age || 0;
    document.getElementById('editCatFavorite').value = cat.favorite || '';
    document.getElementById('editCatTraits').value = (cat.traits || []).join(', ');
    document.getElementById('editCatDesc').value = cat.desc || '';
    document.getElementById('editCatImg').value = cat.img || '';

    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeEditModal() {
    const overlay = document.getElementById('editModalOverlay');
    if (!overlay) return;
    overlay.classList.remove('active');
    document.body.style.overflow = '';
}

async function deleteCat(catId) {
    const cat = catsData.find(item => item.id === catId);
    if (!cat) return;

    // Check auth for user-uploaded cats
    if (window.Auth) {
        var isLoggedIn = window.Auth.isLoggedIn();
        if (!isLoggedIn) {
            showToast('请先登录后再删除猫咪', 'error');
            window.Auth.openModal('login');
            return;
        }
        var currentUser = window.Auth.getCurrentUser();
        if (cat.uploadedByUser && cat.uploaderId && cat.uploaderId !== currentUser.id && currentUser.role !== 'admin') {
            showToast('只能删除自己上传的猫咪', 'error');
            return;
        }
    }

    const confirmed = await confirmCatDeletion(cat);
    if (!confirmed) return;

    try {
        if (backendDataLoaded && window.CatApi) {
            await window.CatApi.deleteCat(catId);
        }
        catsData = catsData.filter(item => item.id !== catId);
        userFavorites = userFavorites.filter(id => id !== catId);
        localStorage.setItem('userFavorites', JSON.stringify(userFavorites));
        syncGlobalState();
        renderAllDynamicSections();
        showToast('猫咪已删除', 'success');
    } catch (error) {
        console.error('删除猫咪失败：', error);
        showToast(error.message || '删除猫咪失败', 'error');
    }
}

function confirmCatDeletion(cat) {
    return new Promise((resolve) => {
        const overlay = document.createElement('div');
        overlay.className = 'modal-overlay active confirm-delete-overlay';
        overlay.innerHTML = `
            <div class="modal-content confirm-delete-content">
                <div class="modal-body">
                    <h2 class="modal-name">删除猫咪</h2>
                    <p class="confirm-delete-text">确定要删除「${escapeHTML(cat.name)}」吗？删除后 Dashboard 和排行榜会同步刷新。</p>
                    <div class="form-actions">
                        <button type="button" class="submit-btn confirm-delete-btn">
                            <span class="btn-icon">🗑️</span>
                            <span>确认删除</span>
                        </button>
                        <button type="button" class="reset-btn confirm-cancel-btn">取消</button>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(overlay);
        document.body.style.overflow = 'hidden';

        function close(result) {
            overlay.remove();
            if (!document.querySelector('.modal-overlay.active')) {
                document.body.style.overflow = '';
            }
            resolve(result);
        }

        overlay.querySelector('.confirm-delete-btn').addEventListener('click', () => close(true));
        overlay.querySelector('.confirm-cancel-btn').addEventListener('click', () => close(false));
        overlay.addEventListener('click', (event) => {
            if (event.target === overlay) close(false);
        });
    });
}

async function importLegacyCats() {
    if (!backendDataLoaded || !window.CatApi) {
        showToast('后端连接后才能导入本地数据', 'error');
        return;
    }

    const raw = localStorage.getItem('userUploadedCats');
    let legacyCats = [];
    let importedIds = [];
    try {
        legacyCats = raw ? JSON.parse(raw) : [];
        importedIds = JSON.parse(localStorage.getItem('legacyImportedCatIds') || '[]');
    } catch (error) {
        showToast('本地旧数据格式异常，无法导入', 'error');
        return;
    }
    const candidates = legacyCats.filter(cat => cat && cat.id && !importedIds.includes(cat.id));

    if (candidates.length === 0) {
        localStorage.setItem('legacyCatsMigrated', 'true');
        updateLegacyImportButton();
        showToast('没有需要导入的本地猫咪数据', 'info');
        return;
    }

    let importedCount = 0;
    try {
        for (const legacyCat of candidates) {
            const created = await window.CatApi.createCat({
                name: legacyCat.name,
                breed: legacyCat.breed,
                age: legacyCat.age,
                traits: legacyCat.traits,
                favorite: legacyCat.favorite,
                desc: legacyCat.desc,
                img: legacyCat.img
            });
            replaceCatInState(created);
            importedIds.push(legacyCat.id);
            importedCount += 1;
        }
        localStorage.setItem('legacyImportedCatIds', JSON.stringify(importedIds));
        localStorage.setItem('legacyCatsMigrated', 'true');
        renderAllDynamicSections();
        showToast(`已导入 ${importedCount} 只本地猫咪`, 'success');
    } catch (error) {
        localStorage.setItem('legacyImportedCatIds', JSON.stringify(importedIds));
        console.error('导入本地猫咪失败：', error);
        showToast(error.message || '导入失败，请稍后再试', 'error');
    }
}

function updateLegacyImportButton() {
    const importBtn = document.getElementById('legacyImportBtn');
    if (!importBtn) return;

    const raw = localStorage.getItem('userUploadedCats');
    let legacyCount = 0;
    try {
        const legacyCats = raw ? JSON.parse(raw) : [];
        const importedIds = JSON.parse(localStorage.getItem('legacyImportedCatIds') || '[]');
        legacyCount = legacyCats.filter(cat => cat && cat.id && !importedIds.includes(cat.id)).length;
    } catch (e) {
        legacyCount = 0;
    }

    importBtn.disabled = !backendDataLoaded || legacyCount === 0;
    importBtn.textContent = legacyCount > 0 ? `导入本地猫咪数据 (${legacyCount})` : '无本地数据可导入';
}

// ===== 彩蛋功能 =====

function triggerEasterEgg(catName, card) {
    // 随机选择动画效果
    var effects = ['shaking', 'shaking', 'shaking', 'bounce-card'];
    var chosenEffect = effects[Math.floor(Math.random() * effects.length)];

    if (chosenEffect === 'bounce-card') {
        card.classList.add('bounce-card');
        setTimeout(function () { card.classList.remove('bounce-card'); }, 800);
    } else {
        card.classList.add('shaking');
        setTimeout(function () { card.classList.remove('shaking'); }, 500);
    }

    // 创建粒子动画
    createEasterEggParticles(card);

    // 显示彩蛋提示（更多随机消息）
    var toast = document.getElementById('easterEggToast');
    var messages = [
        '喵～' + catName + '好喜欢你！',
        catName + '打了个哈欠~ 😽',
        '哇！你是' + catName + '的超级粉丝！',
        catName + '想跟你玩！',
        '🎉 隐藏猫咪魅力已解锁！',
        catName + '撒了一地猫粮~ 🌟',
        '✨ ' + catName + '变成了魔法猫咪！',
        '🐟 ' + catName + '送你一条小鱼干！',
        '💫 ' + catName + '今天心情超好！',
        '🎀 ' + catName + '戴上了蝴蝶结！',
        '🌈 ' + catName + '召唤了彩虹！',
        '🦋 蝴蝶围着' + catName + '飞舞！'
    ];
    toast.querySelector('.toast-text').textContent = messages[Math.floor(Math.random() * messages.length)];

    toast.classList.add('show');
    setTimeout(function () { toast.classList.remove('show'); }, 3000);

    // 记录彩蛋发现总次数
    var totalDiscoveries = parseInt(localStorage.getItem('easterEggDiscoveries') || '0', 10) + 1;
    localStorage.setItem('easterEggDiscoveries', totalDiscoveries.toString());
}

function createEasterEggParticles(card) {
    const container = document.getElementById('easterEggParticles');
    const rect = card.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const particles = ['🐾', '💖', '✨', '🌟', '💕', '🐱', '🧶', '🐟', '🎀', '🦋', '🌈', '💫', '🎪', '💝'];
    const emojis = ['喵~', '喵!', '😺', '💗', '喵呜~', '😻', '🎉', '💖'];

    var particleCount = 25;
    for (var i = 0; i < particleCount; i++) {
        var particle = document.createElement('div');
        particle.className = 'particle';
        particle.textContent = particles[Math.floor(Math.random() * particles.length)];

        var angle = (Math.PI * 2 * i) / particleCount;
        var distance = 80 + Math.random() * 140;
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
    let selectedImageFile = null;

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
            selectedImageFile = file;
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
            selectedImageFile = file;
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
        selectedImageFile = null;
        imagePreview.src = '';
        imagePreview.style.display = 'none';
        uploadPlaceholder.style.display = 'flex';
        removeImageBtn.style.display = 'none';
        fileInput.value = '';
    });

    // 表单提交
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // 检查登录状态
        if (window.Auth && !window.Auth.isLoggedIn()) {
            showToast('请先登录后再上传猫咪', 'error');
            window.Auth.openModal('login');
            return;
        }

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

        if (desc.length > 300) {
            showToast('猫咪介绍不能超过 300 字', 'error');
            return;
        }

        // 获取图片
        let imgUrl = '';
        if (imageMethod === 'url') {
            imgUrl = document.getElementById('catImageUrl').value.trim();
        } else {
            if (selectedImageFile && backendDataLoaded && window.CatApi) {
                try {
                    const uploadResult = await window.CatApi.uploadImage(selectedImageFile);
                    imgUrl = uploadResult.path;
                } catch (error) {
                    console.error('图片上传失败：', error);
                    showToast(error.message || '图片上传失败', 'error');
                    return;
                }
            } else {
                imgUrl = uploadedImageData || '';
            }
        }

        // 如果没有图片，使用占位图
        if (!imgUrl) {
            imgUrl = `https://placehold.co/400x300/FFE8E8/FF9B9B?text=${encodeURIComponent(name)}`;
        }

        const newCatPayload = {
            name,
            breed,
            age: parseFloat(age),
            traits,
            favorite: favorite || '神秘玩具',
            desc: desc || `${name}是一只可爱的小猫咪，性格${traits.join('、')}。`,
            img: imgUrl
        };

        let newCat;
        try {
            if (backendDataLoaded && window.CatApi) {
                newCat = await window.CatApi.createCat(newCatPayload);
            } else {
                newCat = {
                    id: generateId(),
                    ...newCatPayload,
                    likes: 0,
                    favorites: 0,
                    shares: 0,
                    views: 0,
                    gameInteractions: 0,
                    uploadedByUser: true,
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString()
                };
            }
        } catch (error) {
            console.error('新增猫咪失败：', error);
            showToast(error.message || '新增猫咪失败', 'error');
            return;
        }

        const normalizedCat = replaceCatInState(newCat);
        if (!backendDataLoaded) {
            const savedCats = JSON.parse(localStorage.getItem('userUploadedCats') || '[]');
            savedCats.push(normalizedCat);
            localStorage.setItem('userUploadedCats', JSON.stringify(savedCats));
            if (typeof updateCatGrowth === 'function') {
                updateCatGrowth(normalizedCat);
            }
            if (typeof saveGrowthData === 'function') {
                saveGrowthData();
            }
        }

        // 重新渲染
        renderAllDynamicSections();

        // 显示成功提示
        const successToast = document.getElementById('uploadSuccessToast');
        successToast.classList.add('show');
        setTimeout(() => successToast.classList.remove('show'), 3000);

        // 重置表单
        form.reset();
        uploadedImageData = null;
        selectedImageFile = null;
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

    if (!favoritesSection || !favoritesGrid || !emptyFavorites) {
        return;
    }

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
    const isMobile = window.innerWidth < 600;
    // 创建临时toast
    const toast = document.createElement('div');
    toast.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) scale(0);
        background: ${type === 'success' ? 'linear-gradient(135deg, #7BC67B, #5FBF5F)' : type === 'error' ? 'linear-gradient(135deg, #FF6B6B, #E55555)' : 'linear-gradient(135deg, #FF9B9B, #FFB26B)'};
        color: white;
        padding: ${isMobile ? '14px 22px' : '18px 35px'};
        border-radius: 25px;
        font-size: ${isMobile ? '0.95rem' : '1.1rem'};
        font-weight: 500;
        z-index: 5000;
        opacity: 0;
        max-width: ${isMobile ? '85vw' : 'none'};
        text-align: center;
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
    const BALL_SIZE = 70;
    let ballX, ballY;

    function positionBall() {
        ballX = Math.min(window.innerWidth - BALL_SIZE - 15, Math.max(0, window.innerWidth - 100));
        ballY = Math.min(window.innerHeight - BALL_SIZE - 15, Math.max(0, window.innerHeight - 150));
        yarnBall.style.right = 'auto';
        yarnBall.style.bottom = 'auto';
        yarnBall.style.left = ballX + 'px';
        yarnBall.style.top = ballY + 'px';
    }
    positionBall();

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

    async function catchBall() {
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
        if (score % 3 === 0 && catsData.length > 0) {
            const randomCat = catsData[Math.floor(Math.random() * catsData.length)];
            const updated = await updateCatStats(randomCat.id, { gameInteractions: 1 }, { silent: true });
            const activeCat = updated || randomCat;
            if (updated) {
                refreshCatCard(updated);
            }

            // 显示游戏提示
            gameToastText.textContent = `${activeCat.name} 获得 +1 互动！${combo > 1 ? `连击 x${combo}！` : ''}`;
            gameToast.classList.add('show');
            setTimeout(() => gameToast.classList.remove('show'), 2500);

            // 更新面板
            renderDashboard();
            renderRanking();
            renderAdminTable();
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
    const totalLikes = catsData.reduce((sum, cat) => sum + getLikesCount(cat), 0);
    const yarnScore = localStorage.getItem('yarnScore') || '0';
    const userCatsCount = catsData.filter(c => c.uploadedByUser).length;

    // 找到最高等级的猫咪
    var highestCat = null;
    catsData.forEach(function (c) {
        if (!highestCat || (c.growthLevel || 1) > (highestCat.growthLevel || 1)) {
            highestCat = c;
        }
    });
    var topCatInfo = '';
    if (highestCat && highestCat.growthLevel && highestCat.growthLevel >= 3) {
        var lvl = highestCat.growthLevel || 1;
        var emoji = highestCat.growthEmoji || '⭐';
        topCatInfo = ' · ' + emoji + ' 最高等级: ' + highestCat.name + ' Lv.' + lvl;
    }

    statsEl.innerHTML =
        '❤️ 收藏 ' + favCount + ' 只 · 👍 点赞 ' + totalLikes + ' 次 · 🧶 毛线球 ' + yarnScore + ' 分 · 📷 上传 ' + userCatsCount + ' 只' + topCatInfo;
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

document.addEventListener('DOMContentLoaded', async () => {
    // 初始化主题（必须在其他渲染之前）
    initTheme();

    // 初始化数据
    await initData();

    // 初始化成长数据（必须在 initData 之后）
    if (typeof initGrowthData === 'function') {
        initGrowthData();
        if (window.catsData) {
            catsData = window.catsData.map(normalizeClientCat);
            syncGlobalState();
        }
    }

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

    // 设置管理后台和编辑弹窗
    setupAdminPanel();
    setupEditModal();

    // 设置平滑滚动
    setupSmoothScroll();

    // 随机猫咪按钮
    document.getElementById('randomBtn').addEventListener('click', highlightRandomCat);

    // Modal 关闭
    document.getElementById('modalClose').addEventListener('click', closeModal);
    document.getElementById('modalOverlay').addEventListener('click', (e) => {
        if (e.target.id === 'modalOverlay') closeModal();
    });

    // ESC 关闭 Modal（海报弹窗打开时不关闭猫咪详情弹窗）
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            var posterOverlay = document.getElementById('posterModalOverlay');
            if (posterOverlay && posterOverlay.classList.contains('active')) {
                return; // poster.js 自己处理
            }
            var editOverlay = document.getElementById('editModalOverlay');
            if (editOverlay && editOverlay.classList.contains('active')) {
                closeEditModal();
                return;
            }
            closeModal();
        }
    });

    // 初始化海报弹窗
    if (typeof initPosterModal === 'function') {
        initPosterModal();
    }

    // 初始化毛线球游戏
    initYarnGame();

    // 初始化 KPI 面板
    renderDashboard();
    renderRanking();
    renderAdminTable();
    renderMyUploads();

    // Listen for auth state changes
    window.addEventListener('authStateChanged', function () {
        renderCats();
        renderMyUploads();
        updateFooterStats();
        if (window.Auth && window.Auth.updateAdminVisibility) {
            window.Auth.updateAdminVisibility();
        }
    });

    // 启动随机事件系统
    startRandomEvents();

    // 更新统计
    updateFooterStats();

    // 检查URL参数
    checkUrlParams();

    // 应用管理员可见性
    if (window.Auth && window.Auth.updateAdminVisibility) {
        window.Auth.updateAdminVisibility();
    }

    // 键盘快捷键
    document.addEventListener('keydown', (e) => {
        if (e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
            if (e.key === 'r') highlightRandomCat();
        }
    });

    // 窗口大小改变时的处理（防抖）
    let resizeDebounce;
    window.addEventListener('resize', () => {
        clearTimeout(resizeDebounce);
        resizeDebounce = setTimeout(() => {
            // 重新渲染图表以适配新尺寸
            renderDashboard();
            // 确保毛线球在可视区域内
            const yarnBallEl = document.getElementById('yarnBall');
            if (yarnBallEl) {
                const rect = yarnBallEl.getBoundingClientRect();
                if (rect.left < 0 || rect.top < 0 ||
                    rect.right > window.innerWidth || rect.bottom > window.innerHeight) {
                    yarnBallEl.style.left = Math.min(window.innerWidth - 85, Math.max(0, window.innerWidth - 100)) + 'px';
                    yarnBallEl.style.top = Math.min(window.innerHeight - 85, Math.max(0, window.innerHeight - 150)) + 'px';
                }
            }
        }, 250);
    });
});

// ===== 导出函数供测试用 =====
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { catsData, getFilteredCats, renderCats, initData };
}
