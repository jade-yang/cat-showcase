const express = require('express');

function createAuthRouter(userService, auth) {
  const router = express.Router();

  router.post('/register', (req, res) => {
    const { username, displayName, email, password } = req.body || {};

    if (!username || !username.trim()) {
      res.status(400).json({ success: false, message: '用户名不能为空' });
      return;
    }
    if (!email || !email.trim()) {
      res.status(400).json({ success: false, message: '邮箱不能为空' });
      return;
    }
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRe.test(email.trim())) {
      res.status(400).json({ success: false, message: '邮箱格式不正确' });
      return;
    }
    if (!password || password.length < 6) {
      res.status(400).json({ success: false, message: '密码至少需要6位' });
      return;
    }

    try {
      const result = userService.register({ username, displayName, email, password });
      res.status(201).json({ success: true, data: result });
    } catch (error) {
      if (error.status) {
        res.status(error.status).json({ success: false, message: error.message });
      } else {
        console.error(error);
        res.status(500).json({ success: false, message: '注册失败' });
      }
    }
  });

  router.post('/login', (req, res) => {
    const { email, username, password } = req.body || {};

    const credential = (email || username || '').trim();
    if (!credential) {
      res.status(400).json({ success: false, message: '请提供邮箱或用户名' });
      return;
    }
    if (!password) {
      res.status(400).json({ success: false, message: '密码不能为空' });
      return;
    }

    try {
      const result = userService.login({ email: credential, username: credential, password });
      res.json({ success: true, data: result });
    } catch (error) {
      if (error.status) {
        res.status(error.status).json({ success: false, message: error.message });
      } else {
        console.error(error);
        res.status(500).json({ success: false, message: '登录失败' });
      }
    }
  });

  router.get('/me', auth.required, (req, res) => {
    res.json({ success: true, data: { user: userService.sanitizeUser(req.user) } });
  });

  router.post('/logout', auth.required, (req, res) => {
    userService.removeToken(req.token);
    res.json({ success: true, message: '已退出登录' });
  });

  return router;
}

module.exports = createAuthRouter;
