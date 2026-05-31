const express = require('express');
const { checkAdmin } = require('../middleware/checkAdmin');

/**
 * 创建管理员路由
 * 所有路由需要 auth.required + checkAdmin 双重保护
 */
function createAdminRouter(catService, commentService, userService, auth) {
  const router = express.Router();

  // 所有管理员路由先验证登录 + 管理员权限
  router.use(auth.required);
  router.use(checkAdmin);

  // GET /api/admin/cats - 列出所有猫咪（管理员视角，返回完整数据）
  router.get('/cats', (req, res) => {
    const cats = catService.list(req.query);
    res.json({ success: true, data: cats });
  });

  // POST /api/admin/cats - 管理员新增猫咪
  router.post('/cats', (req, res) => {
    const { isSystemCat, uploaderId, uploaderName } = req.body;

    // 管理员可选择设置为系统猫咪（非用户上传）
    const payload = { ...req.body };
    if (isSystemCat) {
      payload.uploadedByUser = false;
      delete payload.uploaderId;
      delete payload.uploaderName;
    } else {
      payload.uploaderId = uploaderId || req.user.id;
      payload.uploaderName = uploaderName || req.user.displayName;
    }

    const cat = catService.create(payload);
    res.status(201).json({ success: true, data: cat });
  });

  // PUT /api/admin/cats/:id - 管理员编辑任意猫咪
  router.put('/cats/:id', (req, res) => {
    const cat = catService.update(req.params.id, req.body);
    res.json({ success: true, data: cat });
  });

  // DELETE /api/admin/cats/:id - 管理员删除任意猫咪
  router.delete('/cats/:id', async (req, res) => {
    const catId = req.params.id;

    // 先删除关联评论
    try {
      if (commentService) {
        commentService.deleteByCatId(catId);
      }
    } catch (e) {
      // 评论删除失败不阻塞猫咪删除
    }

    catService.delete(catId);
    res.json({ success: true, message: '猫咪及关联数据已删除' });
  });

  // GET /api/admin/stats - 管理面板统计数据
  router.get('/stats', (req, res) => {
    const cats = catService.list();
    const totalCats = cats.length;
    let totalLikes = 0;
    let totalFavorites = 0;
    let totalShares = 0;
    let totalViews = 0;
    let totalGameInteractions = 0;

    // 等级分布统计
    const levelCounts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 };

    cats.forEach((cat) => {
      totalLikes += cat.likes || 0;
      totalFavorites += cat.favorites || 0;
      totalShares += cat.shares || 0;
      totalViews += cat.views || 0;
      totalGameInteractions += cat.gameInteractions || 0;

      const lvl = Math.min(Math.max(cat.level || 1, 1), 6);
      levelCounts[lvl] = (levelCounts[lvl] || 0) + 1;
    });

    res.json({
      success: true,
      data: {
        totalCats,
        totalLikes,
        totalFavorites,
        totalShares,
        totalViews,
        totalGameInteractions,
        levelCounts
      }
    });
  });

  // PUT /api/admin/change-password - 管理员修改密码
  router.put('/change-password', (req, res) => {
    const { oldPassword, newPassword, confirmPassword } = req.body || {};

    // 校验
    if (!oldPassword || !newPassword || !confirmPassword) {
      res.status(400).json({ success: false, message: '请填写完整密码信息' });
      return;
    }
    if (newPassword.length < 6) {
      res.status(400).json({ success: false, message: '新密码至少 6 位' });
      return;
    }
    if (newPassword !== confirmPassword) {
      res.status(400).json({ success: false, message: '两次输入的新密码不一致' });
      return;
    }
    if (oldPassword === newPassword) {
      res.status(400).json({ success: false, message: '新密码不能和旧密码相同' });
      return;
    }

    try {
      const users = userService.readUsers();
      const user = users.find(u => u.id === req.user.id);
      if (!user) {
        res.status(404).json({ success: false, message: '用户不存在' });
        return;
      }

      // 校验旧密码
      if (!userService.verifyPassword(oldPassword, user.passwordHash)) {
        res.status(400).json({ success: false, message: '旧密码错误' });
        return;
      }

      // 哈希新密码并更新
      const newHash = userService.hashPassword(newPassword);
      userService.updateUserPassword(req.user.id, newHash);

      // 使当前 token 失效
      userService.removeToken(req.token);

      res.json({ success: true, message: '密码修改成功，请重新登录' });
    } catch (error) {
      if (error.status) {
        res.status(error.status).json({ success: false, message: error.message });
      } else {
        console.error(error);
        res.status(500).json({ success: false, message: '密码修改失败' });
      }
    }
  });

  // ==================== 用户管理 ====================

  // GET /api/admin/users - 列出所有用户（不含 passwordHash）
  router.get('/users', (req, res) => {
    const users = userService.readUsers().map(u => userService.sanitizeUser(u));
    const keyword = (req.query.keyword || '').toLowerCase().trim();
    const sort = req.query.sort || 'createdAt-desc';

    let list = users;
    if (keyword) {
      list = list.filter(u =>
        u.username.toLowerCase().includes(keyword) ||
        u.email.toLowerCase().includes(keyword) ||
        (u.displayName || '').toLowerCase().includes(keyword)
      );
    }

    const [field, order] = sort.split('-');
    list.sort((a, b) => {
      let r = 0;
      if (field === 'username') r = a.username.localeCompare(b.username, 'zh-CN');
      else if (field === 'createdAt') r = new Date(a.createdAt || 0) - new Date(b.createdAt || 0);
      else r = 0;
      return order === 'asc' ? r : -r;
    });

    res.json({ success: true, data: list });
  });

  // GET /api/admin/users/:id - 单个用户详情
  router.get('/users/:id', (req, res) => {
    const user = userService.sanitizeUser(
      userService.readUsers().find(u => u.id === req.params.id)
    );
    if (!user) {
      res.status(404).json({ success: false, message: '用户不存在' });
      return;
    }
    res.json({ success: true, data: user });
  });

  // PUT /api/admin/users/:id - 编辑用户信息
  router.put('/users/:id', (req, res) => {
    const users = userService.readUsers();
    const index = users.findIndex(u => u.id === req.params.id);
    if (index === -1) {
      res.status(404).json({ success: false, message: '用户不存在' });
      return;
    }
    const target = users[index];

    // 不允许修改其他管理员
    if (target.role === 'admin' && target.id !== req.user.id) {
      res.status(403).json({ success: false, message: '不能修改其他管理员账号' });
      return;
    }

    const { displayName, email } = req.body || {};
    if (displayName !== undefined) target.displayName = (displayName || '').trim().slice(0, 40);
    if (email !== undefined) {
      const newEmail = (email || '').toLowerCase().trim();
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newEmail)) {
        res.status(400).json({ success: false, message: '邮箱格式不正确' });
        return;
      }
      if (users.some(u => u.email.toLowerCase() === newEmail && u.id !== target.id)) {
        res.status(400).json({ success: false, message: '该邮箱已被使用' });
        return;
      }
      target.email = newEmail;
    }
    target.updatedAt = new Date().toISOString();

    userService.writeUsers(users);
    res.json({ success: true, data: userService.sanitizeUser(target) });
  });

  // PATCH /api/admin/users/:id/reset-password - 重置用户密码
  router.patch('/users/:id/reset-password', (req, res) => {
    const users = userService.readUsers();
    const target = users.find(u => u.id === req.params.id);
    if (!target) {
      res.status(404).json({ success: false, message: '用户不存在' });
      return;
    }
    if (target.role === 'admin') {
      res.status(403).json({ success: false, message: '不能重置其他管理员的密码' });
      return;
    }

    const { newPassword, confirmPassword } = req.body || {};
    if (!newPassword || !confirmPassword) {
      res.status(400).json({ success: false, message: '请填写新密码' });
      return;
    }
    if (newPassword.length < 6) {
      res.status(400).json({ success: false, message: '新密码至少 6 位' });
      return;
    }
    if (newPassword !== confirmPassword) {
      res.status(400).json({ success: false, message: '两次输入的密码不一致' });
      return;
    }

    userService.updateUserPassword(target.id, userService.hashPassword(newPassword));
    res.json({ success: true, message: '密码已重置' });
  });

  // DELETE /api/admin/users/:id - 删除用户及其猫咪
  router.delete('/users/:id', (req, res) => {
    const users = userService.readUsers();
    const target = users.find(u => u.id === req.params.id);
    if (!target) {
      res.status(404).json({ success: false, message: '用户不存在' });
      return;
    }
    if (target.role === 'admin') {
      res.status(403).json({ success: false, message: '不能删除管理员账号' });
      return;
    }

    // 删除该用户上传的猫咪及关联评论
    const cats = catService.list();
    const userCats = cats.filter(c => c.uploaderId === target.id);
    userCats.forEach(c => {
      try { if (commentService) commentService.deleteByCatId(c.id); } catch (e) {}
      catService.delete(c.id);
    });

    // 删除用户
    const filtered = users.filter(u => u.id !== target.id);
    userService.writeUsers(filtered);

    res.json({
      success: true,
      message: `已删除用户 ${target.username} 及其 ${userCats.length} 只猫咪`
    });
  });

  return router;
}

module.exports = createAdminRouter;
