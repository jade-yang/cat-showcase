function createAuthMiddleware(userService, bypassAuth = false) {
  function required(req, res, next) {
    if (bypassAuth) {
      // In bypass mode, create a default admin user
      req.user = { id: 'bypass-admin', username: 'admin', displayName: 'Admin', role: 'admin' };
      req.token = 'bypass-token';
      return next();
    }

    const header = req.headers.authorization || '';
    const token = header.startsWith('Bearer ') ? header.slice(7).trim() : '';

    if (!token) {
      res.status(401).json({ success: false, message: '请先登录' });
      return;
    }

    const user = userService.getUserByToken(token);
    if (!user) {
      res.status(401).json({ success: false, message: '登录已过期，请重新登录' });
      return;
    }

    req.user = user;
    req.token = token;
    next();
  }

  function optional(req, res, next) {
    const header = req.headers.authorization || '';
    const token = header.startsWith('Bearer ') ? header.slice(7).trim() : '';
    if (token) {
      const user = userService.getUserByToken(token);
      if (user) {
        req.user = user;
        req.token = token;
      }
    }
    next();
  }

  return { required, optional };
}

module.exports = { createAuthMiddleware };
