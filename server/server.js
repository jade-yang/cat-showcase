const path = require('node:path');
const cors = require('cors');
const express = require('express');

// 加载环境变量（优先 .env.local，其次 .env）
try { require('dotenv').config({ path: [path.resolve(__dirname, '..', '.env.local'), path.resolve(__dirname, '..', '.env')] }); } catch (e) {}

const createCatsRouter = require('./routes/cats');
const createUploadRouter = require('./routes/upload');
const createAuthRouter = require('./routes/auth');
const createCommentsRouter = require('./routes/comments');
const createAdminRouter = require('./routes/admin');
const { CatService, HttpError } = require('./services/catService');
const { UserService } = require('./services/userService');
const { CommentService } = require('./services/commentService');
const { createAuthMiddleware } = require('./middleware/auth');

const projectRoot = path.resolve(__dirname, '..');
const defaultDataFile = path.join(__dirname, 'data', 'cats.json');
const defaultUsersFile = path.join(__dirname, 'data', 'users.json');
const defaultCommentsFile = path.join(__dirname, 'data', 'comments.json');
const defaultUploadDir = path.join(__dirname, 'uploads');

function createApp(options = {}) {
  const app = express();
  const dataFile = options.dataFile || defaultDataFile;
  const uploadDir = options.uploadDir || defaultUploadDir;
  const staticDir = options.staticDir || projectRoot;
  const catService = new CatService({ dataFile, seedData: options.seedData || [] });
  const userService = new UserService({ dataFile: defaultUsersFile });
  const commentService = new CommentService({ dataFile: defaultCommentsFile });
  const bypassAuth = options.bypassAuth || false;
  const auth = createAuthMiddleware(userService, bypassAuth);

  app.locals.catService = catService;

  // 确保管理员账号存在
  userService.ensureAdminUser();

  app.use(cors());
  app.use(express.json({ limit: '7mb' }));
  app.use(express.urlencoded({ extended: true }));

  app.use('/api/auth', createAuthRouter(userService, auth));
  app.use('/api/cats', createCatsRouter(catService, auth));
  app.use('/api/upload', createUploadRouter(uploadDir, auth));
  app.use('/api/admin', createAdminRouter(catService, commentService, userService, auth));
  app.use('/api', createCommentsRouter(commentService, auth));
  app.use('/uploads', express.static(uploadDir, { fallthrough: false }));
  app.use(express.static(staticDir));

  app.get('/admin', (req, res) => {
    res.sendFile(path.join(staticDir, 'admin.html'));
  });

  app.get('/admin.html', (req, res) => {
    res.redirect('/admin');
  });
  app.get('/api/users/me/cats', auth.required, (req, res) => {
    const cats = catService.list().filter(c => c.uploaderId === req.user.id);
    res.json({ success: true, data: cats });
  });

  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api/')) {
      next(new HttpError(404, '接口不存在'));
      return;
    }
    res.sendFile(path.join(staticDir, 'index.html'));
  });

  app.use((req, res) => {
    res.status(404).json({ success: false, message: '资源不存在' });
  });

  app.use((error, req, res, next) => {
    const status = error.status || 500;
    const message = status >= 500 ? '服务器错误' : error.message;
    if (status >= 500) {
      console.error(error);
    }
    res.status(status).json({ success: false, message });
  });

  return app;
}

if (require.main === module) {
  const port = Number(process.env.PORT || 3000);
  const app = createApp();
  app.listen(port, () => {
    console.log(`Cat showcase server running at http://localhost:${port}`);
    console.log(`[admin] 管理员登录: ${process.env.ADMIN_USERNAME || 'admin'} / ${process.env.ADMIN_PASSWORD ? '(来自环境变量)' : 'admin159(默认)'}`);
    if (!process.env.ADMIN_PASSWORD) {
      console.warn('[admin] ⚠️  未设置 ADMIN_PASSWORD 环境变量，使用默认密码。');
    }
  });
}

module.exports = { createApp };
