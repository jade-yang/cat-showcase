/**
 * 分享海报生成模块
 * 使用 Canvas 绘制猫咪专属海报，支持下载 PNG 和复制分享链接
 */

// ===== 海报配置 =====
var POSTER_WIDTH = 600;
var POSTER_HEIGHT = 900;
var POSTER_BG_START = '#FFF5F0';
var POSTER_BG_END = '#FFE8E0';
var POSTER_PRIMARY = '#FF9B9B';
var POSTER_ACCENT = '#FFB26B';
var POSTER_TEXT = '#4A4A4A';
var POSTER_TEXT_LIGHT = '#7A7A7A';
var POSTER_WHITE = '#FFFFFF';
var POSTER_CARD_BG = 'rgba(255, 255, 255, 0.85)';

// ===== 弹窗控制 =====

/**
 * 打开海报预览弹窗
 */
function openPosterModal(cat) {
    // 确保成长数据是最新的
    if (typeof updateCatGrowth === 'function') {
        updateCatGrowth(cat);
    }

    var overlay = document.getElementById('posterModalOverlay');
    var loadingEl = document.getElementById('posterLoading');
    var canvas = document.getElementById('posterCanvas');
    var downloadBtn = document.getElementById('posterDownloadBtn');
    var copyBtn = document.getElementById('posterCopyBtn');

    // 显示弹窗和 loading
    overlay.classList.add('active');
    loadingEl.style.display = 'flex';
    canvas.style.display = 'none';
    document.body.style.overflow = 'hidden';

    // 异步生成海报
    setTimeout(function () {
        generatePosterCanvas(cat, function (success) {
            loadingEl.style.display = 'none';
            if (success) {
                canvas.style.display = 'block';
            } else {
                // 即使部分失败也显示 canvas（可能用了占位图）
                canvas.style.display = 'block';
            }
        });
    }, 100);
}

/**
 * 关闭海报预览弹窗
 */
function closePosterModal() {
    var overlay = document.getElementById('posterModalOverlay');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
}

// ===== Canvas 海报绘制 =====

/**
 * 绘制海报主函数
 */
function generatePosterCanvas(cat, callback) {
    var canvas = document.getElementById('posterCanvas');
    var ctx = canvas.getContext('2d');

    // 设置 Canvas 物理尺寸
    canvas.width = POSTER_WIDTH;
    canvas.height = POSTER_HEIGHT;

    // 绘制背景
    drawPosterBackground(ctx);

    // 绘制装饰
    drawPosterDecorations(ctx);

    // 绘制头部
    drawPosterHeader(ctx);

    // 加载并绘制猫咪图片
    loadAndDrawCatImage(ctx, cat, function () {
        // 绘制信息区域
        drawPosterCatInfo(ctx, cat);

        // 绘制成长信息
        drawPosterGrowth(ctx, cat);

        // 绘制页脚
        drawPosterFooter(ctx);

        if (typeof callback === 'function') {
            callback(true);
        }
    });
}

/**
 * 绘制海报背景
 */
function drawPosterBackground(ctx) {
    var gradient = ctx.createLinearGradient(0, 0, 0, POSTER_HEIGHT);
    gradient.addColorStop(0, POSTER_BG_START);
    gradient.addColorStop(0.5, '#FFF8F5');
    gradient.addColorStop(1, POSTER_BG_END);
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, POSTER_WIDTH, POSTER_HEIGHT);
}

/**
 * 绘制装饰元素（猫爪、耳朵轮廓）
 */
function drawPosterDecorations(ctx) {
    // 四角猫爪装饰
    var paws = [
        { x: 30, y: 30, r: 0 },
        { x: POSTER_WIDTH - 30, y: 30, r: 0.3 },
        { x: 30, y: POSTER_HEIGHT - 30, r: -0.3 },
        { x: POSTER_WIDTH - 30, y: POSTER_HEIGHT - 30, r: 0.5 }
    ];

    ctx.save();
    ctx.globalAlpha = 0.12;
    ctx.fillStyle = POSTER_PRIMARY;
    ctx.font = '28px serif';

    paws.forEach(function (p) {
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.r);
        ctx.fillText('🐾', -16, 10);
        ctx.restore();
    });

    // 底部装饰小鱼
    ctx.globalAlpha = 0.08;
    ctx.font = '20px serif';
    for (var i = 0; i < 8; i++) {
        var fx = 60 + i * 70;
        var fy = POSTER_HEIGHT - 25 + Math.sin(i * 0.8) * 8;
        ctx.fillText('🐟', fx, fy);
    }

    ctx.restore();
}

/**
 * 绘制海报头部标题
 */
function drawPosterHeader(ctx) {
    // 标题背景条
    ctx.fillStyle = 'rgba(255, 155, 155, 0.1)';
    ctx.fillRect(0, 0, POSTER_WIDTH, 80);

    // 标题文字
    ctx.fillStyle = POSTER_TEXT;
    ctx.font = 'bold 28px "Noto Sans SC", "Microsoft YaHei", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('🐱  猫咪图鉴', POSTER_WIDTH / 2, 52);

    // 标题下方细线
    ctx.strokeStyle = POSTER_PRIMARY;
    ctx.lineWidth = 2;
    ctx.globalAlpha = 0.4;
    ctx.beginPath();
    ctx.moveTo(POSTER_WIDTH / 2 - 80, 68);
    ctx.lineTo(POSTER_WIDTH / 2 + 80, 68);
    ctx.stroke();
    ctx.globalAlpha = 1;
}

/**
 * 加载猫咪图片并绘制到 Canvas
 */
function loadAndDrawCatImage(ctx, cat, callback) {
    var img = new Image();
    img.crossOrigin = 'anonymous';

    var imgX = 80;
    var imgY = 100;
    var imgW = POSTER_WIDTH - 160;
    var imgH = 340;
    var imgRadius = 20;

    img.onload = function () {
        try {
            // 绘制圆角图片
            ctx.save();
            roundRect(ctx, imgX, imgY, imgW, imgH, imgRadius);
            ctx.clip();
            ctx.drawImage(img, imgX, imgY, imgW, imgH);
            ctx.restore();

            // 图片底部渐变叠加
            var overlayGrad = ctx.createLinearGradient(0, imgY + imgH - 60, 0, imgY + imgH);
            overlayGrad.addColorStop(0, 'rgba(255, 255, 255, 0)');
            overlayGrad.addColorStop(1, 'rgba(255, 245, 240, 0.85)');
            ctx.fillStyle = overlayGrad;
            ctx.fillRect(imgX, imgY + imgH - 60, imgW, 60);

            callback();
        } catch (e) {
            drawPlaceholderImage(ctx, imgX, imgY, imgW, imgH, imgRadius, cat);
            callback();
        }
    };

    img.onerror = function () {
        drawPlaceholderImage(ctx, imgX, imgY, imgW, imgH, imgRadius, cat);
        callback();
    };

    // 设置超时，避免长时间等待
    var timeout = setTimeout(function () {
        if (!img.complete) {
            img.src = '';
            drawPlaceholderImage(ctx, imgX, imgY, imgW, imgH, imgRadius, cat);
            callback();
        }
    }, 5000);

    var originalCallback = callback;
    callback = function () {
        clearTimeout(timeout);
        originalCallback();
    };

    img.src = cat.img || '';
}

/**
 * 绘制占位图片（当猫咪图片加载失败时）
 */
function drawPlaceholderImage(ctx, x, y, w, h, radius, cat) {
    // 占位背景
    var grad = ctx.createLinearGradient(x, y, x + w, y + h);
    grad.addColorStop(0, '#FFD4D4');
    grad.addColorStop(1, '#FFE0D0');
    ctx.fillStyle = grad;
    ctx.save();
    roundRect(ctx, x, y, w, h, radius);
    ctx.fill();
    ctx.restore();

    // 占位图标
    ctx.fillStyle = '#FF9B9B';
    ctx.font = '60px serif';
    ctx.textAlign = 'center';
    ctx.fillText('🐱', x + w / 2, y + h / 2 - 10);

    // 占位文字
    ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
    ctx.font = 'bold 22px "Noto Sans SC", "Microsoft YaHei", sans-serif';
    ctx.fillText(cat.name || '猫咪', x + w / 2, y + h / 2 + 50);
}

/**
 * 绘制猫咪信息区域
 */
function drawPosterCatInfo(ctx, cat) {
    var startY = 465;
    var paddingX = 60;

    // 半透明白色卡片背景
    ctx.fillStyle = POSTER_CARD_BG;
    ctx.save();
    roundRect(ctx, paddingX - 20, startY - 20, POSTER_WIDTH - (paddingX - 20) * 2, 180, 16);
    ctx.fill();
    ctx.restore();

    // 猫咪名字
    ctx.fillStyle = POSTER_TEXT;
    ctx.font = 'bold 30px "Noto Sans SC", "Microsoft YaHei", sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText(cat.name, paddingX, startY + 20);

    // 品种和年龄
    ctx.fillStyle = POSTER_ACCENT;
    ctx.font = '18px "Noto Sans SC", "Microsoft YaHei", sans-serif';
    ctx.fillText(cat.breed + '  ·  ' + cat.age + '岁', paddingX, startY + 52);

    // 喜欢的玩具/食物
    ctx.fillStyle = POSTER_TEXT_LIGHT;
    ctx.font = '16px "Noto Sans SC", "Microsoft YaHei", sans-serif';
    ctx.fillText('🎾 最爱：' + (cat.favorite || '神秘玩具'), paddingX, startY + 80);

    // 性格标签
    var tags = cat.traits || [];
    var tagX = paddingX;
    var tagY = startY + 110;
    tags.forEach(function (trait) {
        var tagW = ctx.measureText(trait).width + 28;
        if (tagX + tagW > POSTER_WIDTH - paddingX) {
            tagX = paddingX;
            tagY += 36;
        }
        // 标签背景
        ctx.fillStyle = '#FFF0EC';
        ctx.save();
        roundRect(ctx, tagX, tagY - 18, tagW, 30, 15);
        ctx.fill();
        ctx.restore();
        // 标签文字
        ctx.fillStyle = POSTER_PRIMARY;
        ctx.font = '15px "Noto Sans SC", "Microsoft YaHei", sans-serif';
        ctx.fillText(trait, tagX + 14, tagY + 3);
        tagX += tagW + 10;
    });
}

/**
 * 绘制成长信息区域
 */
function drawPosterGrowth(ctx, cat) {
    var startY = 690;
    var paddingX = 60;
    var cardW = POSTER_WIDTH - (paddingX - 20) * 2;

    // 确保成长数据最新
    if (typeof updateCatGrowth === 'function') {
        updateCatGrowth(cat);
    }

    var exp = cat.exp || 0;
    var levelInfo = typeof getGrowthLevel === 'function' ? getGrowthLevel(exp) : { level: 1, title: '新手萌猫', emoji: '🌱' };
    var progress = typeof getGrowthProgress === 'function' ? getGrowthProgress(exp, levelInfo) : 0;

    // 成长卡片背景
    ctx.fillStyle = POSTER_CARD_BG;
    ctx.save();
    roundRect(ctx, paddingX - 20, startY - 15, cardW, 115, 16);
    ctx.fill();
    ctx.restore();

    // 标题
    ctx.fillStyle = POSTER_TEXT;
    ctx.font = 'bold 18px "Noto Sans SC", "Microsoft YaHei", sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText('📊 成长状态', paddingX, startY + 12);

    // 等级徽章
    var badgeX = paddingX;
    var badgeY = startY + 32;
    var badgeW = 130;
    var badgeH = 32;

    var badgeGrad = ctx.createLinearGradient(badgeX, badgeY, badgeX + badgeW, badgeY);
    badgeGrad.addColorStop(0, POSTER_PRIMARY);
    badgeGrad.addColorStop(1, POSTER_ACCENT);
    ctx.fillStyle = badgeGrad;
    ctx.save();
    roundRect(ctx, badgeX, badgeY, badgeW, badgeH, 16);
    ctx.fill();
    ctx.restore();

    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 15px "Noto Sans SC", "Microsoft YaHei", sans-serif';
    ctx.fillText(levelInfo.emoji + ' Lv.' + levelInfo.level + ' ' + levelInfo.title, badgeX + 12, badgeY + 22);

    // EXP 文字
    ctx.fillStyle = POSTER_TEXT;
    ctx.font = '16px "Noto Sans SC", "Microsoft YaHei", sans-serif';
    ctx.textAlign = 'right';
    var nextExpHint = levelInfo.level < 6 ? '  |  距下一级 ' + (levelInfo.maxExp - exp + 1) + ' EXP' : '  |  已满级';
    ctx.fillText(exp + ' EXP' + nextExpHint, POSTER_WIDTH - paddingX, badgeY + 22);

    // 进度条
    var barX = paddingX;
    var barY = badgeY + badgeH + 14;
    var barW = cardW - 40;
    var barH = 14;

    // 进度条背景
    ctx.fillStyle = 'rgba(255, 155, 155, 0.2)';
    ctx.save();
    roundRect(ctx, barX, barY, barW, barH, 7);
    ctx.fill();
    ctx.restore();

    // 进度条填充
    var fillGrad = ctx.createLinearGradient(barX, 0, barX + barW, 0);
    fillGrad.addColorStop(0, POSTER_PRIMARY);
    fillGrad.addColorStop(1, POSTER_ACCENT);
    ctx.fillStyle = fillGrad;
    ctx.save();
    roundRect(ctx, barX, barY, Math.max(barH, barW * progress / 100), barH, 7);
    ctx.fill();
    ctx.restore();

    // 进度百分比
    ctx.fillStyle = POSTER_TEXT_LIGHT;
    ctx.font = '13px "Noto Sans SC", "Microsoft YaHei", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(progress + '%', POSTER_WIDTH / 2, barY + barH + 16);
}

/**
 * 绘制页脚
 */
function drawPosterFooter(ctx) {
    var footerY = POSTER_HEIGHT - 65;

    // 页脚背景
    ctx.fillStyle = 'rgba(255, 155, 155, 0.08)';
    ctx.fillRect(0, footerY, POSTER_WIDTH, 65);

    // 宣传语
    ctx.fillStyle = POSTER_PRIMARY;
    ctx.font = 'bold 17px "Noto Sans SC", "Microsoft YaHei", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('🐾  发现每一只猫的独特可爱  🐾', POSTER_WIDTH / 2, footerY + 28);

    // 网站名
    ctx.fillStyle = POSTER_TEXT_LIGHT;
    ctx.font = '13px "Noto Sans SC", "Microsoft YaHei", sans-serif';
    ctx.fillText('猫咪图鉴  ·  cat-showcase', POSTER_WIDTH / 2, footerY + 50);
}

// ===== 工具函数 =====

/**
 * 绘制圆角矩形路径
 */
function roundRect(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.arcTo(x + w, y, x + w, y + r, r);
    ctx.lineTo(x + w, y + h - r);
    ctx.arcTo(x + w, y + h, x + w - r, y + h, r);
    ctx.lineTo(x + r, y + h);
    ctx.arcTo(x, y + h, x, y + h - r, r);
    ctx.lineTo(x, y + r);
    ctx.arcTo(x, y, x + r, y, r);
    ctx.closePath();
}

// ===== 下载和分享 =====

/**
 * 下载海报为 PNG
 */
function downloadPoster() {
    var canvas = document.getElementById('posterCanvas');
    if (!canvas) return;

    try {
        var link = document.createElement('a');
        link.download = '猫咪海报_' + new Date().toISOString().slice(0, 10) + '.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
        if (typeof showToast === 'function') {
            showToast('海报已下载！🐱', 'success');
        }
    } catch (e) {
        if (typeof showToast === 'function') {
            showToast('下载失败，请重试', 'error');
        }
    }
}

/**
 * 复制分享链接
 */
function copyPosterShareLink() {
    var shareUrl = window.location.origin + window.location.pathname;

    // 尝试复制海报图片到剪贴板
    var canvas = document.getElementById('posterCanvas');
    if (canvas && canvas.toBlob && navigator.clipboard && typeof ClipboardItem !== 'undefined') {
        canvas.toBlob(function (blob) {
            try {
                var item = new ClipboardItem({ 'image/png': blob });
                navigator.clipboard.write([item]).then(function () {
                    if (typeof showToast === 'function') {
                        showToast('海报图片已复制到剪贴板！📋', 'success');
                    }
                }).catch(function () {
                    fallbackCopyLink(shareUrl);
                });
            } catch (e) {
                fallbackCopyLink(shareUrl);
            }
        }, 'image/png');
    } else {
        fallbackCopyLink(shareUrl);
    }
}

/**
 * 降级方案：复制文字链接
 */
function fallbackCopyLink(shareUrl) {
    navigator.clipboard.writeText('来看看猫咪图鉴！🐱 ' + shareUrl).then(function () {
        if (typeof showToast === 'function') {
            showToast('分享链接已复制！📋', 'success');
        }
    }).catch(function () {
        if (typeof showToast === 'function') {
            showToast('复制失败，请手动分享', 'error');
        }
    });
}

// ===== 初始化海报弹窗事件 =====

function initPosterModal() {
    var overlay = document.getElementById('posterModalOverlay');
    var closeBtn = document.getElementById('posterModalClose');
    var downloadBtn = document.getElementById('posterDownloadBtn');
    var copyBtn = document.getElementById('posterCopyBtn');

    if (closeBtn) {
        closeBtn.addEventListener('click', closePosterModal);
    }

    if (overlay) {
        overlay.addEventListener('click', function (e) {
            if (e.target.id === 'posterModalOverlay') {
                closePosterModal();
            }
        });
    }

    if (downloadBtn) {
        downloadBtn.addEventListener('click', downloadPoster);
    }

    if (copyBtn) {
        copyBtn.addEventListener('click', copyPosterShareLink);
    }

    // ESC 关闭
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && overlay && overlay.classList.contains('active')) {
            closePosterModal();
        }
    });
}
