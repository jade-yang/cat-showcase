const crypto = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');

class CommentService {
  constructor({ dataFile }) {
    this.dataFile = dataFile;
    this.ensureDataFile();
  }

  ensureDataFile() {
    fs.mkdirSync(path.dirname(this.dataFile), { recursive: true });
    if (!fs.existsSync(this.dataFile)) {
      fs.writeFileSync(this.dataFile, '[]', 'utf8');
    }
  }

  readComments() {
    try {
      const raw = fs.readFileSync(this.dataFile, 'utf8');
      return JSON.parse(raw);
    } catch (e) {
      return [];
    }
  }

  writeComments(comments) {
    const tempFile = `${this.dataFile}.${process.pid}.tmp`;
    fs.writeFileSync(tempFile, JSON.stringify(comments, null, 2), 'utf8');
    fs.renameSync(tempFile, this.dataFile);
  }

  generateId() {
    return `comment-${Date.now().toString(36)}-${crypto.randomBytes(4).toString('hex')}`;
  }

  getByCatId(catId) {
    return this.readComments()
      .filter(c => c.catId === catId)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }

  create({ catId, userId, username, displayName, content }) {
    const comments = this.readComments();
    const now = new Date().toISOString();
    const comment = {
      id: this.generateId(),
      catId,
      userId,
      username,
      displayName,
      content: content.trim().slice(0, 300),
      createdAt: now,
      updatedAt: now
    };
    comments.push(comment);
    this.writeComments(comments);
    return comment;
  }

  delete(commentId, userId, userRole) {
    const comments = this.readComments();
    const index = comments.findIndex(c => c.id === commentId);
    if (index === -1) {
      const err = new Error('评论不存在');
      err.status = 404;
      throw err;
    }
    const comment = comments[index];
    if (comment.userId !== userId && userRole !== 'admin') {
      const err = new Error('只能删除自己的评论');
      err.status = 403;
      throw err;
    }
    comments.splice(index, 1);
    this.writeComments(comments);
  }

  deleteByCatId(catId) {
    const comments = this.readComments().filter(c => c.catId !== catId);
    this.writeComments(comments);
  }
}

module.exports = { CommentService };
