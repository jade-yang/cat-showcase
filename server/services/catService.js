const crypto = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');
const { applyGrowth } = require('../utils/growth');

const EDITABLE_FIELDS = ['name', 'breed', 'age', 'traits', 'favorite', 'desc', 'img'];
const STAT_FIELDS = ['likes', 'favorites', 'shares', 'views', 'gameInteractions'];
const SORT_FIELDS = new Set(['name', 'age', 'likes', 'createdAt', 'exp']);

class HttpError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

class CatService {
  constructor({ dataFile, seedData = [] }) {
    this.dataFile = dataFile;
    this.seedData = seedData;
    this.ensureDataFile();
  }

  ensureDataFile() {
    fs.mkdirSync(path.dirname(this.dataFile), { recursive: true });
    if (!fs.existsSync(this.dataFile)) {
      this.writeCats(this.seedData.map((cat) => this.normalizeCat(cat)));
    }
  }

  readCats() {
    try {
      const raw = fs.readFileSync(this.dataFile, 'utf8');
      const parsed = raw.trim() ? JSON.parse(raw) : [];
      if (!Array.isArray(parsed)) {
        throw new HttpError(500, '猫咪数据文件格式错误');
      }
      return parsed.map((cat) => this.normalizeCat(cat));
    } catch (error) {
      if (error instanceof HttpError) throw error;
      throw new HttpError(500, '读取猫咪数据失败');
    }
  }

  writeCats(cats) {
    const normalized = cats.map((cat) => this.normalizeCat(cat));
    const tempFile = `${this.dataFile}.${process.pid}.tmp`;
    fs.writeFileSync(tempFile, JSON.stringify(normalized, null, 2), 'utf8');
    fs.renameSync(tempFile, this.dataFile);
    return normalized;
  }

  list(query = {}) {
    let cats = this.readCats();
    const keyword = typeof query.keyword === 'string' ? query.keyword.trim().toLowerCase() : '';
    const trait = typeof query.trait === 'string' ? query.trait.trim() : '';
    const sort = SORT_FIELDS.has(query.sort) ? query.sort : '';
    const order = query.order === 'asc' ? 'asc' : 'desc';

    if (keyword) {
      cats = cats.filter((cat) =>
        cat.name.toLowerCase().includes(keyword) ||
        cat.breed.toLowerCase().includes(keyword)
      );
    }

    if (trait) {
      cats = cats.filter((cat) => cat.traits.includes(trait));
    }

    if (sort) {
      cats.sort((a, b) => {
        let result = 0;
        if (sort === 'name') {
          result = a.name.localeCompare(b.name, 'zh-CN');
        } else if (sort === 'createdAt') {
          result = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        } else {
          result = Number(a[sort] || 0) - Number(b[sort] || 0);
        }
        return order === 'asc' ? result : -result;
      });
    }

    return cats;
  }

  getById(id) {
    const cat = this.readCats().find((item) => item.id === id);
    if (!cat) {
      throw new HttpError(404, '猫咪不存在');
    }
    return cat;
  }

  create(payload) {
    const cats = this.readCats();
    const now = new Date().toISOString();
    const data = this.validatePayload(payload, { partial: false });
    const cat = this.normalizeCat({
      id: this.generateId(),
      ...data,
      likes: 0,
      favorites: 0,
      shares: 0,
      views: 0,
      gameInteractions: 0,
      uploadedByUser: true,
      uploaderId: payload.uploaderId || undefined,
      uploaderName: payload.uploaderName || undefined,
      createdAt: now,
      updatedAt: now
    });

    cats.push(cat);
    this.writeCats(cats);
    return cat;
  }

  update(id, payload) {
    const cats = this.readCats();
    const index = cats.findIndex((cat) => cat.id === id);
    if (index === -1) {
      throw new HttpError(404, '猫咪不存在');
    }

    const data = this.validatePayload(payload, { partial: true });
    const updated = this.normalizeCat({
      ...cats[index],
      ...data,
      id: cats[index].id,
      createdAt: cats[index].createdAt,
      updatedAt: new Date().toISOString()
    });

    cats[index] = updated;
    this.writeCats(cats);
    return updated;
  }

  delete(id) {
    const cats = this.readCats();
    const index = cats.findIndex((cat) => cat.id === id);
    if (index === -1) {
      throw new HttpError(404, '猫咪不存在');
    }
    cats.splice(index, 1);
    this.writeCats(cats);
  }

  patchStats(id, payload) {
    const increments = {};
    Object.keys(payload || {}).forEach((field) => {
      if (STAT_FIELDS.includes(field)) {
        const value = Number(payload[field]);
        if (!Number.isFinite(value)) {
          throw new HttpError(400, `${field} 必须是数字`);
        }
        increments[field] = value;
      }
    });

    if (Object.keys(increments).length === 0) {
      throw new HttpError(400, '没有可更新的互动数据');
    }

    const cats = this.readCats();
    const index = cats.findIndex((cat) => cat.id === id);
    if (index === -1) {
      throw new HttpError(404, '猫咪不存在');
    }

    const next = { ...cats[index] };
    Object.entries(increments).forEach(([field, value]) => {
      next[field] = Math.max(0, Number(next[field] || 0) + value);
    });
    next.updatedAt = new Date().toISOString();
    cats[index] = this.normalizeCat(next);
    this.writeCats(cats);
    return cats[index];
  }

  validatePayload(payload, { partial }) {
    const source = payload && typeof payload === 'object' ? payload : {};
    const data = {};

    EDITABLE_FIELDS.forEach((field) => {
      if (Object.prototype.hasOwnProperty.call(source, field)) {
        data[field] = source[field];
      }
    });

    if (!partial || Object.prototype.hasOwnProperty.call(data, 'name')) {
      data.name = this.requireText(data.name, 'name');
    }
    if (!partial || Object.prototype.hasOwnProperty.call(data, 'breed')) {
      data.breed = this.requireText(data.breed, 'breed');
    }
    if (!partial || Object.prototype.hasOwnProperty.call(data, 'age')) {
      const age = Number(data.age);
      if (!Number.isFinite(age) || age < 0) {
        throw new HttpError(400, 'age 必须是不能小于 0 的数字');
      }
      data.age = age;
    }
    if (!partial || Object.prototype.hasOwnProperty.call(data, 'traits')) {
      if (!Array.isArray(data.traits)) {
        throw new HttpError(400, 'traits 必须是数组');
      }
      data.traits = [...new Set(data.traits.map((trait) => String(trait).trim()).filter(Boolean))];
      if (data.traits.length === 0) {
        throw new HttpError(400, 'traits 至少需要一个');
      }
    }

    if (Object.prototype.hasOwnProperty.call(data, 'favorite')) {
      data.favorite = String(data.favorite || '').trim().slice(0, 80);
    }

    if (Object.prototype.hasOwnProperty.call(data, 'desc')) {
      data.desc = String(data.desc || '').trim();
      if (data.desc.length > 300) {
        throw new HttpError(400, 'desc 不能超过 300 字');
      }
    }

    if (Object.prototype.hasOwnProperty.call(data, 'img')) {
      data.img = String(data.img || '').trim();
      if (data.img && !isValidImageReference(data.img)) {
        throw new HttpError(400, 'img 必须是 http(s) 图片地址、/uploads 路径或 data:image 图片');
      }
    }

    return data;
  }

  normalizeCat(cat) {
    const now = new Date().toISOString();
    const base = {
      id: String(cat.id || this.generateId()),
      name: String(cat.name || '').trim(),
      breed: String(cat.breed || '').trim(),
      age: Number.isFinite(Number(cat.age)) ? Number(cat.age) : 0,
      traits: Array.isArray(cat.traits) ? cat.traits.map((trait) => String(trait).trim()).filter(Boolean) : [],
      favorite: String(cat.favorite || '神秘玩具').trim(),
      desc: String(cat.desc || '').trim(),
      img: String(cat.img || '').trim(),
      imgAlt: String(cat.imgAlt || cat.img || '').trim(),
      likes: clampStat(cat.likes),
      favorites: clampStat(cat.favorites),
      shares: clampStat(cat.shares),
      views: clampStat(cat.views),
      gameInteractions: clampStat(cat.gameInteractions),
      uploadedByUser: Boolean(cat.uploadedByUser),
      uploaderId: String(cat.uploaderId || '').trim() || undefined,
      uploaderName: String(cat.uploaderName || '').trim() || undefined,
      createdAt: isIsoLike(cat.createdAt) ? cat.createdAt : now,
      updatedAt: isIsoLike(cat.updatedAt) ? cat.updatedAt : now
    };

    if (!base.img) {
      base.img = `https://placehold.co/400x300/FFE8E8/FF9B9B?text=${encodeURIComponent(base.name || 'Cat')}`;
    }
    if (!base.imgAlt) {
      base.imgAlt = base.img;
    }

    return applyGrowth(base);
  }

  requireText(value, field) {
    const text = String(value || '').trim();
    if (!text) {
      throw new HttpError(400, `${field} 必填`);
    }
    return text.slice(0, 80);
  }

  generateId() {
    return `cat-${Date.now().toString(36)}-${crypto.randomBytes(4).toString('hex')}`;
  }
}

function clampStat(value) {
  const number = Number(value);
  if (!Number.isFinite(number)) return 0;
  return Math.max(0, Math.round(number));
}

function isIsoLike(value) {
  return typeof value === 'string' && !Number.isNaN(Date.parse(value));
}

function isValidImageReference(value) {
  if (/^https?:\/\/[^\s]+$/i.test(value)) return true;
  if (/^\/uploads\/[A-Za-z0-9._-]+$/i.test(value)) return true;
  if (/^data:image\/(png|jpe?g|webp);base64,[A-Za-z0-9+/=]+$/i.test(value) && value.length <= 7 * 1024 * 1024) return true;
  return false;
}

module.exports = {
  CatService,
  HttpError,
  isValidImageReference
};
