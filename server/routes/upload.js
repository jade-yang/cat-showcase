const crypto = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');
const express = require('express');
const multer = require('multer');

const ALLOWED_MIME_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp']);
const EXTENSION_BY_MIME = {
  'image/jpeg': '.jpg',
  'image/png': '.png',
  'image/webp': '.webp'
};

function createUploadRouter(uploadDir, auth) {
  fs.mkdirSync(uploadDir, { recursive: true });

  const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, uploadDir),
    filename: (req, file, cb) => {
      const ext = EXTENSION_BY_MIME[file.mimetype] || path.extname(file.originalname).toLowerCase();
      cb(null, `${Date.now()}-${crypto.randomBytes(6).toString('hex')}${ext}`);
    }
  });

  const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
      if (!ALLOWED_MIME_TYPES.has(file.mimetype)) {
        cb(new Error('仅支持 jpg、jpeg、png、webp 图片'));
        return;
      }
      cb(null, true);
    }
  });

  const router = express.Router();

  router.post('/', auth.required, (req, res, next) => {
    upload.single('image')(req, res, (error) => {
      if (error) {
        error.status = 400;
        next(error);
        return;
      }
      if (!req.file) {
        res.status(400).json({ success: false, message: '请选择要上传的图片' });
        return;
      }
      const publicPath = `/uploads/${req.file.filename}`;
      res.status(201).json({ success: true, data: { path: publicPath }, path: publicPath });
    });
  });

  return router;
}

module.exports = createUploadRouter;
