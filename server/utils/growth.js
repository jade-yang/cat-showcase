const GROWTH_LEVELS = [
  { level: 1, title: '新手萌猫', minExp: 0, maxExp: 49, emoji: '🌱' },
  { level: 2, title: '活跃小猫', minExp: 50, maxExp: 149, emoji: '🐾' },
  { level: 3, title: '人气猫咪', minExp: 150, maxExp: 299, emoji: '⭐' },
  { level: 4, title: '明星喵喵', minExp: 300, maxExp: 599, emoji: '🌟' },
  { level: 5, title: '传说猫王', minExp: 600, maxExp: 999, emoji: '👑' },
  { level: 6, title: '宇宙喵神', minExp: 1000, maxExp: Infinity, emoji: '🚀' }
];

function toNonNegativeNumber(value) {
  const number = Number(value);
  return Number.isFinite(number) && number > 0 ? number : 0;
}

function calculateExp(cat) {
  return Math.round(
    toNonNegativeNumber(cat.likes) * 5 +
    toNonNegativeNumber(cat.favorites) * 10 +
    toNonNegativeNumber(cat.shares) * 15 +
    toNonNegativeNumber(cat.views) * 1 +
    toNonNegativeNumber(cat.gameInteractions) * 8
  );
}

function getGrowthLevel(exp) {
  for (let i = GROWTH_LEVELS.length - 1; i >= 0; i -= 1) {
    if (exp >= GROWTH_LEVELS[i].minExp) {
      return GROWTH_LEVELS[i];
    }
  }
  return GROWTH_LEVELS[0];
}

function getGrowthProgress(exp, levelInfo) {
  if (levelInfo.level >= 6) return 100;
  const range = levelInfo.maxExp - levelInfo.minExp;
  const current = exp - levelInfo.minExp;
  return Math.min(100, Math.max(0, Math.round((current / range) * 100)));
}

function applyGrowth(cat) {
  const exp = calculateExp(cat);
  const levelInfo = getGrowthLevel(exp);
  const growthProgress = getGrowthProgress(exp, levelInfo);

  return {
    ...cat,
    exp,
    level: levelInfo.level,
    title: levelInfo.title,
    growthProgress,
    growthLevel: levelInfo.level,
    growthTitle: levelInfo.title,
    growthEmoji: levelInfo.emoji
  };
}

module.exports = {
  GROWTH_LEVELS,
  applyGrowth,
  calculateExp,
  getGrowthLevel,
  getGrowthProgress
};
