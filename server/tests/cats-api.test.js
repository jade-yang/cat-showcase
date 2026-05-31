const assert = require('node:assert/strict');
const { after, before, beforeEach, describe, it } = require('node:test');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { createApp } = require('../server');

describe('cats API', () => {
  let tempDir;
  let dataFile;
  let server;
  let baseUrl;

  const seedCats = [
    {
      id: 'cat-001',
      name: '小花',
      breed: '布偶猫',
      age: 2,
      traits: ['粘人', '活泼'],
      favorite: '毛线球',
      desc: '活泼好动的小花。',
      img: 'https://example.com/cat.jpg',
      likes: 3,
      favorites: 1,
      shares: 0,
      views: 2,
      gameInteractions: 0,
      uploadedByUser: false,
      createdAt: '2026-01-01T00:00:00.000Z',
      updatedAt: '2026-01-01T00:00:00.000Z'
    },
    {
      id: 'cat-002',
      name: '奶糖',
      breed: '橘猫',
      age: 1,
      traits: ['贪吃'],
      favorite: '冻干',
      desc: '快乐小猫。',
      img: 'https://example.com/orange.jpg',
      likes: 8,
      favorites: 0,
      shares: 1,
      views: 4,
      gameInteractions: 1,
      uploadedByUser: false,
      createdAt: '2026-02-01T00:00:00.000Z',
      updatedAt: '2026-02-01T00:00:00.000Z'
    }
  ];

  before(async () => {
    tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'cat-api-'));
    dataFile = path.join(tempDir, 'cats.json');
    const app = createApp({ dataFile, seedData: seedCats, staticDir: tempDir, uploadDir: path.join(tempDir, 'uploads'), bypassAuth: true });
    server = app.listen(0);
    await new Promise((resolve) => server.once('listening', resolve));
    baseUrl = `http://127.0.0.1:${server.address().port}`;
  });

  after(async () => {
    if (server) {
      await new Promise((resolve, reject) => server.close((err) => (err ? reject(err) : resolve())));
    }
    fs.rmSync(tempDir, { recursive: true, force: true });
  });

  beforeEach(() => {
    fs.writeFileSync(dataFile, JSON.stringify(seedCats, null, 2));
  });

  async function request(pathname, options = {}) {
    const response = await fetch(`${baseUrl}${pathname}`, {
      ...options,
      headers: {
        'content-type': 'application/json',
        ...(options.headers || {})
      }
    });
    const body = await response.json();
    return { response, body };
  }

  it('returns cats with keyword, trait, sort and order filters', async () => {
    const { response, body } = await request('/api/cats?keyword=%E7%8C%AB&sort=likes&order=desc');

    assert.equal(response.status, 200);
    assert.equal(body.success, true);
    assert.deepEqual(body.data.map((cat) => cat.id), ['cat-002', 'cat-001']);
    assert.equal(body.data[0].level >= 1, true);

    const filtered = await request('/api/cats?trait=%E7%B2%98%E4%BA%BA');
    assert.deepEqual(filtered.body.data.map((cat) => cat.id), ['cat-001']);
  });

  it('returns a single cat or 404 for missing cats', async () => {
    const found = await request('/api/cats/cat-001');
    assert.equal(found.response.status, 200);
    assert.equal(found.body.data.name, '小花');

    const missing = await request('/api/cats/nope');
    assert.equal(missing.response.status, 404);
    assert.equal(missing.body.success, false);
  });

  it('creates cats with generated metadata and rejects invalid input', async () => {
    const invalid = await request('/api/cats', {
      method: 'POST',
      body: JSON.stringify({ name: '', breed: '橘猫', age: -1, traits: [] })
    });
    assert.equal(invalid.response.status, 400);
    assert.equal(invalid.body.success, false);

    const created = await request('/api/cats', {
      method: 'POST',
      body: JSON.stringify({
        name: '团团',
        breed: '三花猫',
        age: 3,
        traits: ['安静'],
        favorite: '纸箱',
        desc: '喜欢在窗边睡觉。',
        img: 'https://example.com/tuan.jpg'
      })
    });

    assert.equal(created.response.status, 201);
    assert.match(created.body.data.id, /^cat-/);
    assert.equal(created.body.data.likes, 0);
    assert.equal(created.body.data.level, 1);
    assert.ok(created.body.data.createdAt);
    assert.ok(created.body.data.updatedAt);
  });

  it('updates editable fields without allowing id or createdAt overwrite', async () => {
    const updated = await request('/api/cats/cat-001', {
      method: 'PUT',
      body: JSON.stringify({
        id: 'hacked',
        createdAt: '1999-01-01T00:00:00.000Z',
        name: '小花花',
        breed: '布偶猫',
        age: 4,
        traits: ['粘人'],
        favorite: '羽毛棒',
        desc: '更新后的介绍。',
        img: '/uploads/cat.png'
      })
    });

    assert.equal(updated.response.status, 200);
    assert.equal(updated.body.data.id, 'cat-001');
    assert.equal(updated.body.data.createdAt, '2026-01-01T00:00:00.000Z');
    assert.equal(updated.body.data.name, '小花花');
    assert.notEqual(updated.body.data.updatedAt, '2026-01-01T00:00:00.000Z');
  });

  it('deletes cats and returns 404 when deleting missing cats', async () => {
    const deleted = await request('/api/cats/cat-001', { method: 'DELETE' });
    assert.equal(deleted.response.status, 200);
    assert.equal(deleted.body.success, true);

    const missing = await request('/api/cats/cat-001', { method: 'DELETE' });
    assert.equal(missing.response.status, 404);
    assert.equal(missing.body.success, false);
  });

  it('increments stats and recalculates growth fields', async () => {
    const patched = await request('/api/cats/cat-001/stats', {
      method: 'PATCH',
      body: JSON.stringify({ likes: 2, shares: 1, views: 3, gameInteractions: 1 })
    });

    assert.equal(patched.response.status, 200);
    assert.equal(patched.body.data.likes, 5);
    assert.equal(patched.body.data.shares, 1);
    assert.equal(patched.body.data.views, 5);
    assert.equal(patched.body.data.gameInteractions, 1);
    assert.equal(patched.body.data.exp, 5 * 5 + 1 * 10 + 1 * 15 + 5 + 1 * 8);
    assert.equal(patched.body.data.growthLevel, patched.body.data.level);

    const invalid = await request('/api/cats/cat-001/stats', {
      method: 'PATCH',
      body: JSON.stringify({ exp: 999 })
    });
    assert.equal(invalid.response.status, 400);
  });
});
