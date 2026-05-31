/**
 * 用户认证模块
 * 处理登录、注册、退出、状态管理
 */
(function () {
  let currentUser = null;
  let authToken = null;

  function initAuth() {
    const saved = localStorage.getItem('authUser');
    const savedToken = localStorage.getItem('authToken');
    if (saved && savedToken) {
      try {
        currentUser = JSON.parse(saved);
        authToken = savedToken;
      } catch (e) {
        currentUser = null;
        authToken = null;
        clearAuthStorage();
      }
    }
    updateAuthUI();
  }

  function clearAuthStorage() {
    localStorage.removeItem('authUser');
    localStorage.removeItem('authToken');
  }

  function saveAuthState(user, token) {
    currentUser = user;
    authToken = token;
    localStorage.setItem('authUser', JSON.stringify(user));
    localStorage.setItem('authToken', token);
  }

  function clearAuthState() {
    currentUser = null;
    authToken = null;
    clearAuthStorage();
  }

  function isLoggedIn() {
    return !!(currentUser && authToken);
  }

  function getCurrentUser() {
    return currentUser;
  }

  function getAuthToken() {
    return authToken;
  }

  function authHeaders() {
    if (!authToken) return {};
    return { 'Authorization': 'Bearer ' + authToken };
  }

  function updateAuthUI() {
    var navMenu = document.getElementById('navMenu');
    var authSection = document.getElementById('navAuthSection');
    updateAdminVisibility();

    if (authSection) {
      if (isLoggedIn()) {
        var isAdmin = currentUser.role === 'admin';
        authSection.innerHTML =
          '<span class="nav-user-info">' +
            '<span class="nav-user-avatar">' + (currentUser.avatar || '😺') + '</span>' +
            '<span class="nav-user-name">' + escapeHTML(currentUser.displayName || currentUser.username) + '</span>' +
          '</span>' +
          '<a href="#my-uploads-section" class="nav-link" data-section="my-uploads">我的上传</a>' +
          (isAdmin ? '<a href="/admin" class="nav-link nav-admin-link admin-only" data-display="inline-flex" style="background:linear-gradient(135deg,#FF9B9B,#FFB26B);color:white;font-weight:600;">🗂️ 管理后台</a>' : '') +
          '<button class="nav-logout-btn" id="navLogoutBtn">退出</button>';
        document.getElementById('navLogoutBtn').addEventListener('click', handleLogout);
      } else {
        authSection.innerHTML =
          '<button class="nav-login-btn" id="navLoginBtn">登录</button>' +
          '<button class="nav-register-btn" id="navRegisterBtn">注册</button>';
        document.getElementById('navLoginBtn').addEventListener('click', function () { openAuthModal('login'); });
        document.getElementById('navRegisterBtn').addEventListener('click', function () { openAuthModal('register'); });
      }
    }

    // Update comment sections visibility
    document.querySelectorAll('.comment-login-hint, .comment-input-area').forEach(function (el) {
      el.style.display = isLoggedIn() ? '' : '';
    });

    // Update upload form hint
    var uploadHint = document.getElementById('uploadLoginHint');
    if (uploadHint) {
      uploadHint.style.display = isLoggedIn() ? 'none' : 'block';
    }

    var uploadForm = document.getElementById('uploadForm');
    if (uploadForm) {
      var submitBtn = uploadForm.querySelector('.submit-btn');
      if (submitBtn && !isLoggedIn()) {
        submitBtn.disabled = true;
        submitBtn.title = '请先登录后再上传';
      } else if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.title = '';
      }
    }

    // Update "my uploads" nav link visibility
    var myUploadsLink = document.querySelector('a[data-section="my-uploads"]');
    if (myUploadsLink) {
      myUploadsLink.style.display = isLoggedIn() ? '' : 'none';
    }

    window.dispatchEvent(new CustomEvent('authStateChanged', { detail: { loggedIn: isLoggedIn(), user: currentUser } }));
  }

  function openAuthModal(mode) {
    removeExistingAuthModal();

    var overlay = document.createElement('div');
    overlay.className = 'modal-overlay active auth-modal-overlay';
    overlay.id = 'authModalOverlay';

    var content = document.createElement('div');
    content.className = 'modal-content auth-modal-content';

    var isLogin = mode === 'login';
    content.innerHTML =
      '<button class="modal-close auth-modal-close" id="authModalClose">✕</button>' +
      '<div class="modal-body auth-modal-body">' +
        '<h2 class="auth-modal-title">' + (isLogin ? '🐱 登录猫咪图鉴' : '🐱 注册新账号') + '</h2>' +
        (isLogin ? '' :
          '<div class="form-group">' +
            '<label for="regUsername">用户名 <span class="required">*</span></label>' +
            '<input type="text" id="regUsername" placeholder="给自己起个名字吧" maxlength="20">' +
          '</div>' +
          '<div class="form-group">' +
            '<label for="regDisplayName">显示昵称</label>' +
            '<input type="text" id="regDisplayName" placeholder="大家会看到这个名字" maxlength="20">' +
          '</div>') +
        '<div class="form-group">' +
          '<label for="authEmail">邮箱 <span class="required">*</span></label>' +
          '<input type="email" id="authEmail" placeholder="your@email.com">' +
        '</div>' +
        '<div class="form-group">' +
          '<label for="authPassword">密码 <span class="required">*</span></label>' +
          '<input type="password" id="authPassword" placeholder="' + (isLogin ? '输入密码' : '至少6位密码') + '" minlength="6">' +
        '</div>' +
        '<div class="auth-error" id="authError" style="display:none;"></div>' +
        '<button class="submit-btn auth-submit-btn" id="authSubmitBtn">' +
          (isLogin ? '登录' : '注册') +
        '</button>' +
        '<p class="auth-switch">' +
          (isLogin ? '还没有账号？<a href="#" id="authSwitchLink">立即注册</a>' : '已有账号？<a href="#" id="authSwitchLink">立即登录</a>') +
        '</p>' +
      '</div>';

    overlay.appendChild(content);
    document.body.appendChild(overlay);
    document.body.style.overflow = 'hidden';

    document.getElementById('authModalClose').addEventListener('click', closeAuthModal);
    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) closeAuthModal();
    });

    document.getElementById('authSwitchLink').addEventListener('click', function (e) {
      e.preventDefault();
      closeAuthModal();
      openAuthModal(isLogin ? 'register' : 'login');
    });

    document.getElementById('authSubmitBtn').addEventListener('click', function () {
      if (isLogin) {
        handleLogin();
      } else {
        handleRegister();
      }
    });

    // Allow Enter key submit
    document.getElementById('authPassword').addEventListener('keydown', function (e) {
      if (e.key === 'Enter') {
        document.getElementById('authSubmitBtn').click();
      }
    });
    if (!isLogin) {
      document.getElementById('regUsername')?.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') {
          document.getElementById('authSubmitBtn').click();
        }
      });
    }

    // Focus first input
    var firstInput = isLogin ? document.getElementById('authEmail') : document.getElementById('regUsername');
    if (firstInput) {
      setTimeout(function () { firstInput.focus(); }, 150);
    }
  }

  function closeAuthModal() {
    removeExistingAuthModal();
    document.body.style.overflow = '';
  }

  function removeExistingAuthModal() {
    var existing = document.getElementById('authModalOverlay');
    if (existing && existing.parentNode) {
      existing.parentNode.removeChild(existing);
    }
  }

  async function handleLogin() {
    var email = document.getElementById('authEmail').value.trim();
    var password = document.getElementById('authPassword').value;
    var errorEl = document.getElementById('authError');

    if (!email) { showAuthError('请输入邮箱', errorEl); return; }
    if (!password) { showAuthError('请输入密码', errorEl); return; }

    try {
      var data = await authApiRequest('/auth/login', { email: email, password: password });
      saveAuthState(data.user, data.token);
      closeAuthModal();
      updateAuthUI();
      showToastMsg('登录成功！欢迎回来，' + data.user.displayName, 'success');
      window.dispatchEvent(new CustomEvent('authLogin', { detail: data }));
    } catch (error) {
      showAuthError(error.message, errorEl);
    }
  }

  async function handleRegister() {
    var username = document.getElementById('regUsername')?.value.trim();
    var displayName = document.getElementById('regDisplayName')?.value.trim();
    var email = document.getElementById('authEmail').value.trim();
    var password = document.getElementById('authPassword').value;
    var errorEl = document.getElementById('authError');

    if (!username) { showAuthError('请输入用户名', errorEl); return; }
    if (!email) { showAuthError('请输入邮箱', errorEl); return; }
    if (!password || password.length < 6) { showAuthError('密码至少需要6位', errorEl); return; }

    try {
      var data = await authApiRequest('/auth/register', {
        username: username,
        displayName: displayName || username,
        email: email,
        password: password
      });
      saveAuthState(data.user, data.token);
      closeAuthModal();
      updateAuthUI();
      showToastMsg('注册成功！欢迎加入猫咪图鉴，' + data.user.displayName, 'success');
      window.dispatchEvent(new CustomEvent('authLogin', { detail: data }));
    } catch (error) {
      showAuthError(error.message, errorEl);
    }
  }

  async function handleLogout() {
    try {
      await authApiRequest('/auth/logout', {}, 'POST');
    } catch (e) {}
    clearAuthState();
    updateAuthUI();
    updateAdminVisibility();
    showToastMsg('已退出登录', 'info');
    window.dispatchEvent(new CustomEvent('authLogout'));
  }

  async function authApiRequest(path, body, method) {
    var headers = { 'Content-Type': 'application/json' };
    if (authToken) {
      headers['Authorization'] = 'Bearer ' + authToken;
    }
    var options = {
      method: method || (body ? 'POST' : 'GET'),
      headers: headers
    };
    if (body) {
      options.body = JSON.stringify(body);
    }
    var response = await fetch('/api' + path, options);
    var result = null;
    try { result = await response.json(); } catch (e) { result = { success: false, message: '请求失败' }; }

    if (!response.ok || !result.success) {
      throw new Error(result.message || '请求失败');
    }
    return result.data;
  }

  function showAuthError(msg, el) {
    el.textContent = msg;
    el.style.display = 'block';
    setTimeout(function () { el.style.display = 'none'; }, 4000);
  }

  function escapeHTML(value) {
    return String(value ?? '').replace(/[&<>"']/g, function (char) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }[char];
    });
  }

  function showToastMsg(message, type) {
    if (typeof showToast === 'function') {
      showToast(message, type);
    }
  }

  function isAdminUser() {
    return !!(currentUser && currentUser.role === 'admin');
  }

  function updateAdminVisibility() {
    var isAdmin = isAdminUser();
    document.body.classList.toggle('is-admin', isAdmin);
    document.querySelectorAll('.admin-only').forEach(function (el) {
      el.setAttribute('aria-hidden', isAdmin ? 'false' : 'true');
    });
  }

  // Expose to global
  window.Auth = {
    init: initAuth,
    isLoggedIn: isLoggedIn,
    isAdmin: isAdminUser,
    getCurrentUser: getCurrentUser,
    getAuthToken: getAuthToken,
    authHeaders: authHeaders,
    updateUI: updateAuthUI,
    updateAdminVisibility: updateAdminVisibility,
    openModal: openAuthModal,
    closeModal: closeAuthModal,
    logout: handleLogout
  };

  // Initialize on script load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAuth);
  } else {
    initAuth();
  }
})();
