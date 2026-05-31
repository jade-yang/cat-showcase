/**
 * checkAdmin 中间件
 * 必须在 auth.required 之后使用，确保 req.user 已存在
 * 仅允许 role === 'admin' 的用户继续
 */
function checkAdmin(req, res, next) {
  if (!req.user) {
    return res.status(401).json({ success: false, message: '请先登录' });
  }
  if (req.user.role !== 'admin') {
    return res.status(403).json({ success: false, message: '需要管理员权限' });
  }
  next();
}

module.exports = { checkAdmin };
