const crypto = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');

const SALT_LEN = 16;
const KEY_LEN = 64;
const ITERATIONS = 100000;
const DIGEST = 'sha512';

class HttpError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

class UserService {
  constructor({ dataFile }) {
    this.dataFile = dataFile;
    this.ensureDataFile();
    this.ensureTokensFile();
  }

  ensureDataFile() {
    fs.mkdirSync(path.dirname(this.dataFile), { recursive: true });
    if (!fs.existsSync(this.dataFile)) {
      fs.writeFileSync(this.dataFile, '[]', 'utf8');
    }
  }

  readUsers() {
    try {
      const raw = fs.readFileSync(this.dataFile, 'utf8');
      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed)) throw new Error('not array');
      return parsed;
    } catch (error) {
      throw new HttpError(500, '读取用户数据失败');
    }
  }

  writeUsers(users) {
    const tempFile = `${this.dataFile}.${process.pid}.tmp`;
    fs.writeFileSync(tempFile, JSON.stringify(users, null, 2), 'utf8');
    fs.renameSync(tempFile, this.dataFile);
  }

  hashPassword(password) {
    const salt = crypto.randomBytes(SALT_LEN).toString('hex');
    const hash = crypto.pbkdf2Sync(password, salt, ITERATIONS, KEY_LEN, DIGEST).toString('hex');
    return `${salt}:${hash}`;
  }

  verifyPassword(password, stored) {
    const [salt, hash] = stored.split(':');
    if (!salt || !hash) return false;
    const verify = crypto.pbkdf2Sync(password, salt, ITERATIONS, KEY_LEN, DIGEST).toString('hex');
    return crypto.timingSafeEqual(Buffer.from(hash, 'hex'), Buffer.from(verify, 'hex'));
  }

  generateToken() {
    return crypto.randomBytes(32).toString('hex');
  }

  generateId() {
    return `user-${Date.now().toString(36)}-${crypto.randomBytes(3).toString('hex')}`;
  }

  register({ username, displayName, email, password }) {
    const users = this.readUsers();
    const emailLower = email.toLowerCase().trim();
    const userLower = username.toLowerCase().trim();

    if (users.some(u => u.email.toLowerCase() === emailLower)) {
      throw new HttpError(400, '该邮箱已被注册');
    }
    if (users.some(u => u.username.toLowerCase() === userLower)) {
      throw new HttpError(400, '该用户名已被使用');
    }

    const now = new Date().toISOString();
    const user = {
      id: this.generateId(),
      username: username.trim(),
      displayName: (displayName || '').trim() || username.trim(),
      email: emailLower,
      passwordHash: this.hashPassword(password),
      avatar: '',
      role: 'user',
      createdAt: now,
      updatedAt: now
    };

    users.push(user);
    this.writeUsers(users);

    const token = this.generateToken();
    this.storeToken(token, user.id);
    return { token, user: this.sanitizeUser(user) };
  }

  login({ email, username, password }) {
    const users = this.readUsers();
    const credential = (email || username || '').toLowerCase().trim();
    if (!credential) {
      throw new HttpError(400, '请输入邮箱或用户名');
    }
    // 按邮箱查找，未找到则按用户名查找
    let user = users.find(u => u.email.toLowerCase() === credential);
    if (!user) {
      user = users.find(u => u.username.toLowerCase() === credential);
    }
    if (!user) {
      throw new HttpError(401, '邮箱/用户名或密码不正确');
    }
    if (!this.verifyPassword(password, user.passwordHash)) {
      throw new HttpError(401, '邮箱/用户名或密码不正确');
    }

    const token = this.generateToken();
    this.storeToken(token, user.id);
    return { token, user: this.sanitizeUser(user) };
  }

  getUserByToken(token) {
    if (!token) return null;
    const tokens = this.readTokens();
    const entry = tokens.find(t => t.token === token);
    if (!entry) return null;
    const users = this.readUsers();
    return users.find(u => u.id === entry.userId) || null;
  }

  getTokenUser(tokenPath) {
    if (!fs.existsSync(tokenPath)) return null;
    try {
      const raw = fs.readFileSync(tokenPath, 'utf8');
      const parsed = JSON.parse(raw);
      return parsed;
    } catch (e) {
      return null;
    }
  }

  readTokens() {
    try {
      const raw = fs.readFileSync(this.tokenFile, 'utf8');
      return JSON.parse(raw);
    } catch (e) {
      return [];
    }
  }

  writeTokens(tokens) {
    fs.writeFileSync(this.tokenFile, JSON.stringify(tokens, null, 2), 'utf8');
  }

  storeToken(token, userId) {
    const tokens = this.readTokens();
    // Remove existing tokens for this user
    const filtered = tokens.filter(t => t.userId !== userId);
    filtered.push({ token, userId, createdAt: new Date().toISOString() });
    this.writeTokens(filtered);
  }

  removeToken(token) {
    const tokens = this.readTokens();
    this.writeTokens(tokens.filter(t => t.token !== token));
  }

  getUserById(id) {
    const user = this.readUsers().find(u => u.id === id);
    return user ? this.sanitizeUser(user) : null;
  }

  sanitizeUser(user) {
    if (!user) return null;
    const { passwordHash, ...safe } = user;
    return safe;
  }

  /**
   * 确保 admin 管理员账号存在且权限正确
   * - 查找 username === 'admin' 的用户
   * - 不存在 → 创建（密码 admin159，pbkdf2 哈希）
   * - 存在但 role !== 'admin' → 修正为 admin
   * - 存在且 role === 'admin' → 跳过
   */
  ensureAdminUser() {
    const users = this.readUsers();
    const username = process.env.ADMIN_USERNAME || 'admin';
    const existing = users.find(u => u.username === username);

    if (existing) {
      if (existing.role !== 'admin') {
        existing.role = 'admin';
        existing.updatedAt = new Date().toISOString();
        this.writeUsers(users);
        console.log(`[admin] 用户 ${username} 的 role 已修正为 admin`);
      } else {
        console.log(`[admin] 管理员 ${username} 已存在，跳过初始化`);
      }
      return;
    }

    const displayName = process.env.ADMIN_DISPLAY_NAME || '管理员';
    const email = process.env.ADMIN_EMAIL || 'admin@example.com';
    const password = process.env.ADMIN_PASSWORD || 'admin159';

    const now = new Date().toISOString();
    const adminUser = {
      id: `user-admin-${Date.now().toString(36)}`,
      username,
      displayName,
      email: email.toLowerCase().trim(),
      passwordHash: this.hashPassword(password),
      avatar: '',
      role: 'admin',
      createdAt: now,
      updatedAt: now
    };

    users.push(adminUser);
    this.writeUsers(users);

    const isDefaultPassword = !process.env.ADMIN_PASSWORD;
    console.log(`[admin] 管理员账号已创建: ${username} / ${email}`);
    if (isDefaultPassword) {
      console.warn('[admin] ⚠️  正在使用默认密码 admin159！请尽快通过管理后台修改密码');
      console.warn('[admin] ⚠️  设置环境变量 ADMIN_PASSWORD 后删除 data/users.json 并重启可更换初始密码');
    }
  }

  /**
   * 更新用户密码
   */
  updateUserPassword(userId, newHashedPassword) {
    const users = this.readUsers();
    const index = users.findIndex(u => u.id === userId);
    if (index === -1) {
      const err = new Error('用户不存在');
      err.status = 404;
      throw err;
    }
    users[index].passwordHash = newHashedPassword;
    users[index].updatedAt = new Date().toISOString();
    this.writeUsers(users);
  }

  /** @type {string} */
  get tokenFile() {
    return path.join(path.dirname(this.dataFile), 'tokens.json');
  }

  ensureTokensFile() {
    fs.mkdirSync(path.dirname(this.tokenFile), { recursive: true });
    if (!fs.existsSync(this.tokenFile)) {
      fs.writeFileSync(this.tokenFile, '[]', 'utf8');
    }
  }
}

module.exports = { UserService, HttpError };
