/**
 * 猫咪成长系统
 * 根据用户互动数据自动计算成长值、等级、称号和进度
 */

// ===== 成长等级定义 =====
const GROWTH_LEVELS = [
    { level: 1, title: '新手萌猫', minExp: 0,   maxExp: 49,  emoji: '🌱' },
    { level: 2, title: '活跃小猫', minExp: 50,  maxExp: 149, emoji: '🐾' },
    { level: 3, title: '人气猫咪', minExp: 150, maxExp: 299, emoji: '⭐' },
    { level: 4, title: '明星喵喵', minExp: 300, maxExp: 599, emoji: '🌟' },
    { level: 5, title: '传说猫王', minExp: 600, maxExp: 999, emoji: '👑' },
    { level: 6, title: '宇宙喵神', minExp: 1000, maxExp: Infinity, emoji: '🚀' }
];

// ===== 成长值计算 =====

/**
 * 计算猫咪成长经验值
 * exp = likes*5 + favorites*10 + shares*15 + views*1 + gameInteractions*8
 */
function calculateGrowth(cat) {
    const likes = (window.userLikes && window.userLikes[cat.id]) ? window.userLikes[cat.id] : 0;
    const favorites = (window.userFavorites && window.userFavorites.includes(cat.id)) ? 1 : 0;
    const shares = cat.shares || 0;
    const views = cat.views || 0;
    const gameInteractions = cat.gameInteractions || 0;
    return likes * 5 + favorites * 10 + shares * 15 + views * 1 + gameInteractions * 8;
}

/**
 * 根据经验值获取成长等级信息
 */
function getGrowthLevel(exp) {
    for (let i = GROWTH_LEVELS.length - 1; i >= 0; i--) {
        if (exp >= GROWTH_LEVELS[i].minExp) {
            return GROWTH_LEVELS[i];
        }
    }
    return GROWTH_LEVELS[0];
}

/**
 * 获取当前等级的成长进度百分比
 */
function getGrowthProgress(exp, levelInfo) {
    if (levelInfo.level >= 6) return 100;
    const range = levelInfo.maxExp - levelInfo.minExp;
    const progress = exp - levelInfo.minExp;
    return Math.min(100, Math.max(0, Math.round((progress / range) * 100)));
}

// ===== 成长数据更新 =====

/**
 * 更新猫咪成长数据，返回 { cat, didLevelUp, oldLevel, newLevel }
 */
function updateCatGrowth(cat) {
    const oldLevel = cat.growthLevel || 1;
    const exp = calculateGrowth(cat);
    const levelInfo = getGrowthLevel(exp);
    const progress = getGrowthProgress(exp, levelInfo);

    cat.exp = exp;
    cat.growthLevel = levelInfo.level;
    cat.growthTitle = levelInfo.title;
    cat.growthEmoji = levelInfo.emoji;
    cat.growthProgress = progress;

    const didLevelUp = levelInfo.level > oldLevel;
    return { cat, didLevelUp, oldLevel, newLevel: levelInfo.level };
}

/**
 * 检查并触发等级提升（供交互事件调用）
 */
function checkAndTriggerLevelUp(cat) {
    const oldLevel = cat.growthLevel || 1;
    const result = updateCatGrowth(cat);
    saveGrowthData();

    if (result.didLevelUp) {
        triggerLevelUpAnimation(cat, result.oldLevel, result.newLevel);
    }

    return result;
}

// ===== 等级提升动画 =====

/**
 * 显示升级 Toast 并触发卡片发光 + 粒子动画
 */
function triggerLevelUpAnimation(cat, oldLevel, newLevel) {
    const levelInfo = getGrowthLevel(cat.exp);
    if (typeof showToast === 'function') {
        showToast(cat.name + ' 升级为 Lv.' + newLevel + ' ' + levelInfo.title + '！' + levelInfo.emoji, 'success');
    }

    var cardId = 'cat-card-' + cat.id;
    var card = document.getElementById(cardId);
    if (card) {
        card.classList.add('level-up-glow');
        setTimeout(function () { card.classList.remove('level-up-glow'); }, 2000);
        createLevelUpParticles(card);
    }
}

/**
 * 等级提升粒子动画
 */
function createLevelUpParticles(card) {
    var container = document.getElementById('easterEggParticles');
    if (!container) return;

    var rect = card.getBoundingClientRect();
    var centerX = rect.left + rect.width / 2;
    var centerY = rect.top + rect.height / 2;

    var particles = ['⭐', '🐾', '💖', '✨', '🌟', '🎉', '💫'];

    for (var i = 0; i < 15; i++) {
        var particle = document.createElement('div');
        particle.className = 'particle';
        particle.textContent = particles[Math.floor(Math.random() * particles.length)];

        var angle = (Math.PI * 2 * i) / 15;
        var distance = 80 + Math.random() * 120;
        var tx = Math.cos(angle) * distance;
        var ty = Math.sin(angle) * distance;

        particle.style.left = centerX + 'px';
        particle.style.top = centerY + 'px';
        particle.style.setProperty('--tx', tx + 'px');
        particle.style.setProperty('--ty', ty + 'px');
        particle.style.animationDelay = (i * 0.06) + 's';
        particle.style.fontSize = '2rem';

        container.appendChild(particle);
        setTimeout(function () { particle.remove(); }, 2500);
    }
}

// ===== 成长 UI 渲染 =====

/**
 * 渲染猫咪卡片中的成长信息 HTML
 */
function renderGrowthUI(cat) {
    var exp = cat.exp || 0;
    var levelInfo = getGrowthLevel(exp);
    var progress = getGrowthProgress(exp, levelInfo);
    var nextLevelExp = levelInfo.level < 6 ? levelInfo.maxExp - exp + 1 : 0;
    var levelClass = 'growth-level-' + levelInfo.level;

    return '' +
        '<div class="growth-section ' + levelClass + '">' +
            '<div class="growth-header">' +
                '<span class="growth-label">' +
                    '<span>' + levelInfo.emoji + '</span> Lv.' + levelInfo.level +
                '</span>' +
                '<span class="growth-title-badge">' + levelInfo.title + '</span>' +
            '</div>' +
            '<div class="progress-bar">' +
                '<div class="progress-fill growth-fill" style="width: ' + progress + '%"></div>' +
            '</div>' +
            '<div class="growth-stats">' +
                '<span>' + exp + ' EXP</span>' +
                (levelInfo.level < 6
                    ? '<span>距下一级还需 ' + nextLevelExp + ' EXP</span>'
                    : '<span>已满级 ' + levelInfo.emoji + '</span>') +
            '</div>' +
        '</div>';
}

// ===== localStorage 持久化 =====

/**
 * 保存成长数据到 localStorage
 */
function saveGrowthData() {
    var growthData = {};
    if (window.catsData) {
        window.catsData.forEach(function (cat) {
            growthData[cat.id] = {
                exp: cat.exp || 0,
                growthLevel: cat.growthLevel || 1,
                growthTitle: cat.growthTitle || '新手萌猫',
                growthEmoji: cat.growthEmoji || '🌱',
                growthProgress: cat.growthProgress || 0
            };
        });
    }
    localStorage.setItem('catsGrowth', JSON.stringify(growthData));
}

/**
 * 从 localStorage 加载成长数据
 */
function loadGrowthData() {
    var saved = localStorage.getItem('catsGrowth');
    if (saved) {
        try { return JSON.parse(saved); } catch (e) { return {}; }
    }
    return {};
}

/**
 * 初始化所有猫咪的成长数据（在 initData 之后调用）
 */
function initGrowthData() {
    if (!window.catsData) return;
    var savedGrowth = loadGrowthData();

    window.catsData = window.catsData.map(function (cat) {
        if (savedGrowth[cat.id]) {
            cat.exp = savedGrowth[cat.id].exp || 0;
            cat.growthLevel = savedGrowth[cat.id].growthLevel || 1;
            cat.growthTitle = savedGrowth[cat.id].growthTitle || '新手萌猫';
            cat.growthEmoji = savedGrowth[cat.id].growthEmoji || '🌱';
            cat.growthProgress = savedGrowth[cat.id].growthProgress || 0;
        } else {
            updateCatGrowth(cat);
        }
        return cat;
    });

    saveGrowthData();
}
