const express = require('express');

function createCommentsRouter(commentService, auth) {
  const router = express.Router();

  // GET /api/cats/:catId/comments
  router.get('/cats/:catId/comments', (req, res) => {
    const comments = commentService.getByCatId(req.params.catId);
    res.json({ success: true, data: comments });
  });

  // POST /api/cats/:catId/comments
  router.post('/cats/:catId/comments', auth.required, (req, res) => {
    const { content } = req.body || {};

    if (!content || !content.trim()) {
      res.status(400).json({ success: false, message: '评论内容不能为空' });
      return;
    }
    if (content.trim().length > 300) {
      res.status(400).json({ success: false, message: '评论内容不能超过300字' });
      return;
    }

    const comment = commentService.create({
      catId: req.params.catId,
      userId: req.user.id,
      username: req.user.username,
      displayName: req.user.displayName,
      content: content.trim()
    });

    res.status(201).json({ success: true, data: comment });
  });

  // DELETE /api/comments/:commentId
  router.delete('/comments/:commentId', auth.required, (req, res) => {
    try {
      commentService.delete(req.params.commentId, req.user.id, req.user.role);
      res.json({ success: true });
    } catch (error) {
      const status = error.status || 500;
      res.status(status).json({ success: false, message: error.message });
    }
  });

  return router;
}

module.exports = createCommentsRouter;
