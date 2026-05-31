/**
 * 评论功能模块
 * 处理猫咪评论的展示、发表和删除
 */
(function () {

  function renderCommentsSection(catId) {
    if (!window.CatApi) return;

    var container = document.getElementById('modalCommentsSection');
    if (!container) {
      // Create container if modal is active
      var modalBody = document.querySelector('#modalContent .modal-body');
      if (!modalBody) return;
      container = document.createElement('div');
      container.id = 'modalCommentsSection';
      container.className = 'modal-section comments-section';
    }

    var authSection = container.closest('.modal-body') || container;
    var existing = authSection.querySelector('#modalCommentsSection');
    if (existing && existing !== container) {
      container = existing;
    }

    // Don't re-render if already showing for this cat
    if (container.dataset.catId === catId) return;
    container.dataset.catId = catId;

    var isLoggedIn = window.Auth && window.Auth.isLoggedIn();
    var currentUser = window.Auth ? window.Auth.getCurrentUser() : null;

    container.innerHTML =
      '<h3 class="modal-section-title">💬 评论</h3>' +
      '<div class="comments-list" id="commentsList">' +
        '<div class="comments-loading">加载评论中...</div>' +
      '</div>' +
      (isLoggedIn ?
        '<div class="comment-input-area">' +
          '<textarea id="commentInput" class="comment-input" placeholder="留下你的评论吧...（最多300字）" maxlength="300" rows="2"></textarea>' +
          '<button class="comment-submit-btn" id="commentSubmitBtn">发表评论</button>' +
        '</div>' :
        '<div class="comment-login-hint">' +
          '<p>🔒 登录后可以发表评论</p>' +
          '<button class="comment-login-btn" id="commentLoginBtn">立即登录</button>' +
        '</div>') +
      '</div>';

    // If this is a new container in the modal body
    if (!document.getElementById('modalCommentsSection')) {
      var modalBody = document.querySelector('#modalContent .modal-body');
      if (modalBody && !modalBody.querySelector('#modalCommentsSection')) {
        modalBody.appendChild(container);
      }
    }

    // Bind events
    if (isLoggedIn) {
      document.getElementById('commentSubmitBtn').addEventListener('click', function () {
        submitComment(catId);
      });
      document.getElementById('commentInput').addEventListener('keydown', function (e) {
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          submitComment(catId);
        }
      });
    } else {
      var loginBtn = document.getElementById('commentLoginBtn');
      if (loginBtn && window.Auth) {
        loginBtn.addEventListener('click', function () {
          window.Auth.openModal('login');
        });
      }
    }

    // Load comments
    loadComments(catId, currentUser);
  }

  async function loadComments(catId, currentUser) {
    var listEl = document.getElementById('commentsList');
    if (!listEl) return;

    try {
      var comments = await window.CatApi.getComments(catId);
      if (comments.length === 0) {
        listEl.innerHTML = '<div class="comments-empty">还没有评论，快来抢沙发吧 🐱</div>';
        return;
      }

      var userId = currentUser ? currentUser.id : '';
      var userRole = currentUser ? currentUser.role : '';
      listEl.innerHTML = comments.map(function (c) {
        var timeStr = formatTime(c.createdAt);
        var canDelete = userId === c.userId || userRole === 'admin';
        return '' +
          '<div class="comment-item" id="comment-' + c.id + '">' +
            '<div class="comment-avatar">😺</div>' +
            '<div class="comment-body">' +
              '<div class="comment-header">' +
                '<span class="comment-username">' + escapeHTML(c.displayName || c.username) + '</span>' +
                '<span class="comment-time">' + timeStr + '</span>' +
              '</div>' +
              '<div class="comment-content">' + escapeHTML(c.content) + '</div>' +
            '</div>' +
            (canDelete ? '<button class="comment-delete-btn" data-comment-id="' + c.id + '" title="删除评论">✕</button>' : '') +
          '</div>';
      }).join('');

      // Bind delete buttons
      listEl.querySelectorAll('.comment-delete-btn').forEach(function (btn) {
        btn.addEventListener('click', function (e) {
          e.stopPropagation();
          deleteComment(btn.dataset.commentId, catId);
        });
      });
    } catch (error) {
      listEl.innerHTML = '<div class="comments-error">加载评论失败：' + escapeHTML(error.message) + '</div>';
    }
  }

  async function submitComment(catId) {
    var input = document.getElementById('commentInput');
    var submitBtn = document.getElementById('commentSubmitBtn');
    if (!input) return;

    var content = input.value.trim();
    if (!content) {
      showMsg('请输入评论内容', 'error');
      return;
    }
    if (content.length > 300) {
      showMsg('评论内容不能超过300字', 'error');
      return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = '发表中...';
    try {
      await window.CatApi.createComment(catId, content);
      input.value = '';
      showMsg('评论发表成功！🐱', 'success');

      // Reload comments
      var currentUser = window.Auth ? window.Auth.getCurrentUser() : null;
      loadComments(catId, currentUser);
    } catch (error) {
      showMsg(error.message || '评论发表失败', 'error');
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = '发表评论';
    }
  }

  async function deleteComment(commentId, catId) {
    try {
      await window.CatApi.deleteComment(commentId);
      showMsg('评论已删除', 'success');
      var currentUser = window.Auth ? window.Auth.getCurrentUser() : null;
      loadComments(catId, currentUser);
    } catch (error) {
      showMsg(error.message || '删除失败', 'error');
    }
  }

  function renderCardComments(catId) {
    // Render inline comments on cat cards (lightweight version)
    if (!window.CatApi) return;
    var container = document.getElementById('cardComments-' + catId);
    if (!container) return;

    window.CatApi.getComments(catId).then(function (comments) {
      var count = comments.length;
      container.innerHTML = count > 0
        ? '<span class="card-comment-count">💬 ' + count + ' 条评论</span>'
        : '';
    }).catch(function () {
      container.innerHTML = '';
    });
  }

  function formatTime(isoString) {
    if (!isoString) return '';
    var date = new Date(isoString);
    var now = new Date();
    var diff = now - date;
    if (diff < 60000) return '刚刚';
    if (diff < 3600000) return Math.floor(diff / 60000) + '分钟前';
    if (diff < 86400000) return Math.floor(diff / 3600000) + '小时前';
    if (diff < 604800000) return Math.floor(diff / 86400000) + '天前';
    return date.toLocaleDateString('zh-CN');
  }

  function escapeHTML(value) {
    return String(value ?? '').replace(/[&<>"']/g, function (char) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }[char];
    });
  }

  function showMsg(message, type) {
    if (typeof showToast === 'function') {
      showToast(message, type);
    }
  }

  window.Comments = {
    renderSection: renderCommentsSection,
    renderCardComments: renderCardComments,
    loadComments: loadComments,
    submit: submitComment,
    delete: deleteComment
  };
})();
