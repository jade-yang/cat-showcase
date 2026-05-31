const express = require('express');
const { applyGrowth } = require('../utils/growth');

function createCatsRouter(catService, auth) {
  const router = express.Router();

  router.get('/', (req, res) => {
    res.json({ success: true, data: catService.list(req.query) });
  });

  router.get('/:id', (req, res) => {
    res.json({ success: true, data: catService.getById(req.params.id) });
  });

  // POST - create cat (requires login)
  router.post('/', auth.required, (req, res) => {
    const payload = {
      ...req.body,
      uploaderId: req.user.id,
      uploaderName: req.user.displayName
    };
    const cat = catService.create(payload);
    res.status(201).json({ success: true, data: cat });
  });

  // PUT - update cat (uploader or admin only)
  router.put('/:id', auth.required, (req, res) => {
    const existing = catService.getById(req.params.id);
    if (existing.uploadedByUser && existing.uploaderId && existing.uploaderId !== req.user.id && req.user.role !== 'admin') {
      res.status(403).json({ success: false, message: '只能编辑自己上传的猫咪' });
      return;
    }
    const cat = catService.update(req.params.id, req.body);
    res.json({ success: true, data: cat });
  });

  // DELETE - delete cat (uploader or admin only)
  router.delete('/:id', auth.required, (req, res) => {
    const existing = catService.getById(req.params.id);
    if (existing.uploadedByUser && existing.uploaderId && existing.uploaderId !== req.user.id && req.user.role !== 'admin') {
      res.status(403).json({ success: false, message: '只能删除自己上传的猫咪' });
      return;
    }
    catService.delete(req.params.id);
    res.json({ success: true });
  });

  router.patch('/:id/stats', (req, res) => {
    const cat = catService.patchStats(req.params.id, req.body);
    res.json({ success: true, data: cat });
  });

  // PATCH /:id/share - increment shares and update growth
  router.patch('/:id/share', (req, res) => {
    const cat = catService.patchStats(req.params.id, { shares: 1 });
    res.json({ success: true, data: cat });
  });

  return router;
}

module.exports = createCatsRouter;
