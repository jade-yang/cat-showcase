/**
 * 猫咪图鉴 - 管理后台
 * 独立的管理员页面 JS
 */
(function () {
  'use strict';

  // ===== 状态 =====
  var isDarkMode = false;
  var allCats = [];
  var currentSearch = '';
  var currentLevel = '';
  var currentSort = 'createdAt-desc';
  var editingCatId = null;
  var deletingCatId = null;

  // ===== API 辅助 =====
  function getAuthToken() {
    return localStorage.getItem('authToken');
  }

  function authHeaders() {
    var token = getAuthToken();
    return token ? { 'Authorization': 'Bearer ' + token } : {};
  }

  async function apiRequest(path, options) {
    var opts = options || {};
    opts.headers = Object.assign({}, authHeaders(), opts.headers || {});
    if (opts.body && typeof opts.body === 'object' && !(opts.body instanceof FormData)) {
      opts.headers['Content-Type'] = 'application/json';
      opts.body = JSON.stringify(opts.body);
    }
    var resp = await fetch(path, opts);
    var data;
    try { data = await resp.json(); } catch (e) { data = { success: false, message: '响应格式错误' }; }
    if (!resp.ok || !data.success) {
      throw new Error(data.message || '请求失败 (' + resp.status + ')');
    }
    return data;
  }

  // ===== Toast =====
  function showToast(message, type) {
    type = type || 'info';
    var toast = document.createElement('div');
    toast.className = 'toast-item ' + type;
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(function () { toast.classList.add('show'); }, 10);
    setTimeout(function () {
      toast.classList.remove('show');
      setTimeout(function () { toast.remove(); }, 400);
    }, 2500);
  }

  // ===== 认证检查 =====
  function checkAuth() {
    var token = getAuthToken();
    var userStr = localStorage.getItem('authUser');
    if (!token || !userStr) {
      redirectToHome('请先登录');
      return false;
    }
    try {
      var user = JSON.parse(userStr);
      if (user.role !== 'admin') {
        redirectToHome('需要管理员权限');
        return false;
      }
      document.getElementById('navUserName').textContent = user.displayName || user.username || 'Admin';
      return true;
    } catch (e) {
      redirectToHome('用户数据异常');
      return false;
    }
  }

  function redirectToHome(msg) {
    showToast(msg || '权限不足', 'error');
    setTimeout(function () {
      window.location.href = '/';
    }, 1500);
  }

  // ===== 加载猫咪数据 =====
  async function loadCats() {
    try {
      var resp = await apiRequest('/api/admin/cats');
      allCats = resp.data || [];
      renderStats();
      renderTable();
    } catch (error) {
      showToast('加载数据失败: ' + error.message, 'error');
      allCats = [];
      renderTable();
    }
  }

  // ===== 加载统计数据 =====
  async function loadStats() {
    try {
      var resp = await apiRequest('/api/admin/stats');
      var s = resp.data || {};
      document.getElementById('statTotalCats').textContent = s.totalCats || 0;
      document.getElementById('statTotalLikes').textContent = s.totalLikes || 0;
      document.getElementById('statTotalFavorites').textContent = s.totalFavorites || 0;
      document.getElementById('statTotalShares').textContent = s.totalShares || 0;
      document.getElementById('statTotalViews').textContent = s.totalViews || 0;
      document.getElementById('statTotalGame').textContent = s.totalGameInteractions || 0;
    } catch (e) { /* 统计加载失败不阻塞 */ }
  }

  function renderStats() {
    var totalLikes = 0, totalFavs = 0, totalShares = 0, totalViews = 0, totalGame = 0;
    allCats.forEach(function (c) {
      totalLikes += c.likes || 0;
      totalFavs += c.favorites || 0;
      totalShares += c.shares || 0;
      totalViews += c.views || 0;
      totalGame += c.gameInteractions || 0;
    });
    document.getElementById('statTotalCats').textContent = allCats.length;
    document.getElementById('statTotalLikes').textContent = totalLikes;
    document.getElementById('statTotalFavorites').textContent = totalFavs;
    document.getElementById('statTotalShares').textContent = totalShares;
    document.getElementById('statTotalViews').textContent = totalViews;
    document.getElementById('statTotalGame').textContent = totalGame;
  }

  // ===== 获取显示数据 =====
  function getDisplayCats() {
    var cats = allCats.slice();

    // 搜索过滤
    if (currentSearch) {
      var kw = currentSearch.toLowerCase();
      cats = cats.filter(function (c) {
        return c.name.toLowerCase().indexOf(kw) > -1 || c.breed.toLowerCase().indexOf(kw) > -1;
      });
    }

    // 等级过滤
    if (currentLevel) {
      var lvl = parseInt(currentLevel, 10);
      cats = cats.filter(function (c) { return (c.level || 1) === lvl; });
    }

    // 排序
    var parts = currentSort.split('-');
    var field = parts[0];
    var order = parts[1] || 'desc';
    cats.sort(function (a, b) {
      var result = 0;
      if (field === 'name') {
        result = a.name.localeCompare(b.name, 'zh-CN');
      } else if (field === 'createdAt') {
        result = new Date(a.createdAt || 0).getTime() - new Date(b.createdAt || 0).getTime();
      } else if (field === 'age') {
        result = (a.age || 0) - (b.age || 0);
      } else {
        result = (a[field] || 0) - (b[field] || 0);
      }
      return order === 'asc' ? result : -result;
    });

    return cats;
  }

  // ===== 渲染表格 =====
  function renderTable() {
    var tbody = document.getElementById('catsTableBody');
    var cats = getDisplayCats();

    if (cats.length === 0) {
      tbody.innerHTML = '<tr class="table-empty-row"><td colspan="10">没有匹配的猫咪数据 🐱</td></tr>';
      return;
    }

    tbody.innerHTML = cats.map(function (cat) {
      var lvl = cat.level || 1;
      var title = cat.title || '新手萌猫';
      var lvlEmoji = ['🌱', '🐾', '⭐', '🌟', '👑', '🚀'][Math.min(lvl - 1, 5)];
      var timeStr = cat.createdAt ? new Date(cat.createdAt).toLocaleString('zh-CN') : '-';
      var traitsHTML = (cat.traits || []).map(function (t) {
        return '<span class="trait-badge">' + esc(t) + '</span>';
      }).join('');
      var sourceHTML = cat.uploadedByUser
        ? '<span class="source-tag source-user">用户</span>'
        : '<span class="source-tag source-system">系统</span>';
      var imgHTML = cat.img
        ? '<img class="cat-thumb" src="' + esc(cat.img) + '" alt="' + esc(cat.name) + '" onerror="this.style.display=\'none\';this.nextElementSibling.style.display=\'flex\'">' +
          '<div class="cat-thumb-placeholder" style="display:none">🐱</div>'
        : '<div class="cat-thumb-placeholder">🐱</div>';

      return '' +
        '<tr data-cat-id="' + esc(cat.id) + '">' +
          '<td>' + imgHTML + '</td>' +
          '<td><strong>' + esc(cat.name) + '</strong></td>' +
          '<td>' + esc(cat.breed) + '</td>' +
          '<td>' + cat.age + '岁</td>' +
          '<td><div class="traits-badges">' + traitsHTML + '</div></td>' +
          '<td>' + (cat.exp || 0) + '</td>' +
          '<td><span class="level-badge">' + lvlEmoji + ' Lv.' + lvl + ' ' + esc(title) + '</span></td>' +
          '<td>' + esc(timeStr) + '</td>' +
          '<td>' + sourceHTML + '</td>' +
          '<td>' +
            '<div class="action-btns">' +
              '<button class="action-btn edit" data-action="edit" data-cat-id="' + esc(cat.id) + '" title="编辑">✏️</button>' +
              '<button class="action-btn delete" data-action="delete" data-cat-id="' + esc(cat.id) + '" title="删除">🗑️</button>' +
            '</div>' +
          '</td>' +
        '</tr>';
    }).join('');
  }

  function esc(text) {
    return String(text || '').replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }[c];
    });
  }

  // ===== 搜索/筛选/排序事件 =====
  function setupFilters() {
    var searchTimer;
    document.getElementById('searchInput').addEventListener('input', function () {
      clearTimeout(searchTimer);
      searchTimer = setTimeout(function () {
        currentSearch = document.getElementById('searchInput').value.trim();
        renderTable();
      }, 250);
    });

    document.getElementById('levelFilter').addEventListener('change', function () {
      currentLevel = this.value;
      renderTable();
    });

    document.getElementById('sortSelect').addEventListener('change', function () {
      currentSort = this.value;
      renderTable();
    });
  }

  // ===== 表单弹窗 =====
  function openCatForm(cat) {
    editingCatId = cat ? cat.id : null;
    document.getElementById('catFormTitle').textContent = cat ? '编辑猫咪' : '新增猫咪';
    document.getElementById('editCatId').value = cat ? cat.id : '';
    document.getElementById('catName').value = cat ? cat.name : '';
    document.getElementById('catBreed').value = cat ? cat.breed : '';
    document.getElementById('catAge').value = cat ? cat.age : '';
    document.getElementById('catFavorite').value = cat ? (cat.favorite || '') : '';
    document.getElementById('catDesc').value = cat ? (cat.desc || '') : '';
    document.getElementById('catImg').value = cat ? (cat.img || '') : '';
    document.getElementById('isSystemCat').checked = cat ? !cat.uploadedByUser : false;
    document.getElementById('formError').style.display = 'none';
    document.getElementById('traitsValidation').classList.remove('show');

    // 设置性格标签
    var checkboxes = document.querySelectorAll('input[name="traits"]');
    checkboxes.forEach(function (cb) { cb.checked = false; });
    if (cat && cat.traits) {
      cat.traits.forEach(function (trait) {
        checkboxes.forEach(function (cb) {
          if (cb.value === trait) cb.checked = true;
        });
      });
    }

    document.getElementById('catFormModal').classList.add('active');
  }

  function closeCatForm() {
    document.getElementById('catFormModal').classList.remove('active');
    editingCatId = null;
    document.getElementById('catForm').reset();
    document.getElementById('isSystemCat').checked = false;
  }

  async function submitCatForm(e) {
    e.preventDefault();

    var name = document.getElementById('catName').value.trim();
    var breed = document.getElementById('catBreed').value.trim();
    var ageVal = document.getElementById('catAge').value;
    var favorite = document.getElementById('catFavorite').value.trim();
    var desc = document.getElementById('catDesc').value.trim();
    var img = document.getElementById('catImg').value.trim();
    var isSystem = document.getElementById('isSystemCat').checked;

    var traits = [];
    document.querySelectorAll('input[name="traits"]:checked').forEach(function (cb) {
      traits.push(cb.value);
    });

    // 校验
    if (!name) { showFormError('请输入猫咪名字'); return; }
    if (!breed) { showFormError('请输入猫咪品种'); return; }
    var age = parseFloat(ageVal);
    if (isNaN(age) || age < 0) { showFormError('请输入有效的年龄（数字）'); return; }
    if (traits.length === 0) {
      document.getElementById('traitsValidation').classList.add('show');
      showFormError('请至少选择一个性格标签');
      return;
    }
    document.getElementById('traitsValidation').classList.remove('show');
    if (desc.length > 300) { showFormError('简介不能超过 300 字'); return; }

    var payload = {
      name: name, breed: breed, age: age,
      traits: traits, favorite: favorite || '神秘玩具',
      desc: desc || (name + '是一只可爱的小猫咪。'), img: img
    };

    if (!editingCatId) {
      payload.isSystemCat = isSystem;
    }

    var submitBtn = document.getElementById('catFormSubmitBtn');
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span>⏳</span> 保存中...';

    try {
      if (editingCatId) {
        await apiRequest('/api/admin/cats/' + encodeURIComponent(editingCatId), { method: 'PUT', body: payload });
        showToast('猫咪已更新！', 'success');
      } else {
        await apiRequest('/api/admin/cats', { method: 'POST', body: payload });
        showToast('猫咪已添加！', 'success');
      }
      closeCatForm();
      await loadCats();
    } catch (error) {
      showFormError(error.message);
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = '<span>💾</span> 保存';
    }
  }

  function showFormError(msg) {
    var el = document.getElementById('formError');
    el.textContent = msg;
    el.style.display = 'block';
    setTimeout(function () { el.style.display = 'none'; }, 4000);
  }

  // ===== 删除确认 =====
  function openConfirmDelete(catId, catName) {
    deletingCatId = catId;
    document.getElementById('confirmText').textContent =
      '确定要删除「' + catName + '」吗？关联评论将被一并删除。此操作不可撤销。';
    document.getElementById('confirmModal').classList.add('active');
  }

  function closeConfirmModal() {
    document.getElementById('confirmModal').classList.remove('active');
    deletingCatId = null;
  }

  async function confirmDelete() {
    if (!deletingCatId) return;
    var btn = document.getElementById('confirmDeleteBtn');
    btn.disabled = true;
    btn.innerHTML = '<span>⏳</span> 删除中...';
    try {
      await apiRequest('/api/admin/cats/' + encodeURIComponent(deletingCatId), { method: 'DELETE' });
      showToast('猫咪及关联数据已删除', 'success');
      closeConfirmModal();
      await loadCats();
    } catch (error) {
      showToast('删除失败: ' + error.message, 'error');
    } finally {
      btn.disabled = false;
      btn.innerHTML = '<span>🗑️</span> 确认删除';
    }
  }

  // ===== 事件代理（表格操作按钮） =====
  function setupTableEvents() {
    var tbody = document.getElementById('catsTableBody');
    tbody.addEventListener('click', function (e) {
      var btn = e.target.closest('[data-action]');
      if (!btn) return;
      var catId = btn.dataset.catId;
      var cat = allCats.find(function (c) { return c.id === catId; });
      if (!cat) return;

      if (btn.dataset.action === 'edit') {
        openCatForm(cat);
      } else if (btn.dataset.action === 'delete') {
        openConfirmDelete(cat.id, cat.name);
      }
    });
  }

  // ===== 修改密码 =====
  function openPasswordModal() {
    document.getElementById('passwordModal').classList.add('active');
    document.getElementById('oldPassword').value = '';
    document.getElementById('newPassword').value = '';
    document.getElementById('confirmPassword').value = '';
    document.getElementById('pwFormError').style.display = 'none';
    document.getElementById('pwMatchMsg').style.display = 'none';
  }

  function closePasswordModal() {
    document.getElementById('passwordModal').classList.remove('active');
  }

  async function submitPasswordChange(e) {
    e.preventDefault();
    var oldPwd = document.getElementById('oldPassword').value.trim();
    var newPwd = document.getElementById('newPassword').value.trim();
    var confirmPwd = document.getElementById('confirmPassword').value.trim();
    var matchMsg = document.getElementById('pwMatchMsg');
    var errEl = document.getElementById('pwFormError');
    matchMsg.style.display = 'none';
    errEl.style.display = 'none';

    if (!oldPwd || !newPwd || !confirmPwd) {
      errEl.textContent = '请填写完整密码信息';
      errEl.style.display = 'block';
      return;
    }
    if (newPwd.length < 6) {
      errEl.textContent = '新密码至少 6 位';
      errEl.style.display = 'block';
      return;
    }
    if (newPwd !== confirmPwd) {
      matchMsg.textContent = '两次输入的新密码不一致';
      matchMsg.style.display = 'block';
      return;
    }

    var btn = document.getElementById('pwSubmitBtn');
    btn.disabled = true;
    btn.innerHTML = '<span>⏳</span> 保存中...';

    try {
      var resp = await fetch('/api/admin/change-password', {
        method: 'PUT',
        headers: Object.assign({ 'Content-Type': 'application/json' }, authHeaders()),
        body: JSON.stringify({ oldPassword: oldPwd, newPassword: newPwd, confirmPassword: confirmPwd })
      });
      var data = await resp.json();
      if (!resp.ok || !data.success) {
        errEl.textContent = data.message || '密码修改失败';
        errEl.style.display = 'block';
        return;
      }
      showToast('密码修改成功，请重新登录', 'success');
      closePasswordModal();
      // 清除登录态，跳转首页
      setTimeout(function () {
        localStorage.removeItem('authToken');
        localStorage.removeItem('authUser');
        window.location.href = '/';
      }, 1500);
    } catch (error) {
      errEl.textContent = '网络错误，请重试';
      errEl.style.display = 'block';
    } finally {
      btn.disabled = false;
      btn.innerHTML = '<span>💾</span> 保存修改';
    }
  }

  // ===== 用户管理 =====
  var allUsers = [];
  var userSearch = '';
  var userSort = 'createdAt-desc';
  var editingUserId = null;
  var resettingUserId = null;
  var deletingUserId = null;

  async function loadUsers() {
    try {
      var q = userSearch ? '?keyword=' + encodeURIComponent(userSearch) + '&sort=' + userSort : '?sort=' + userSort;
      var resp = await apiRequest('/api/admin/users' + q);
      allUsers = resp.data || [];
      renderUserTable();
    } catch (e) {
      showToast('加载用户失败', 'error');
    }
  }

  function renderUserTable() {
    var tbody = document.getElementById('usersTableBody');
    if (allUsers.length === 0) {
      tbody.innerHTML = '<tr class="table-empty-row"><td colspan="6">没有匹配的用户 👤</td></tr>';
      return;
    }
    tbody.innerHTML = allUsers.map(function (u) {
      var timeStr = u.createdAt ? new Date(u.createdAt).toLocaleString('zh-CN') : '-';
      var roleClass = u.role === 'admin' ? 'source-system' : 'source-user';
      var roleLabel = u.role === 'admin' ? '管理员' : '普通用户';
      var isAdmin = u.role === 'admin';
      return '<tr data-user-id="' + esc(u.id) + '">' +
        '<td><strong>' + esc(u.username) + '</strong></td>' +
        '<td>' + esc(u.displayName || '') + '</td>' +
        '<td>' + esc(u.email) + '</td>' +
        '<td><span class="source-tag ' + roleClass + '">' + roleLabel + '</span></td>' +
        '<td>' + esc(timeStr) + '</td>' +
        '<td><div class="action-btns">' +
          (isAdmin ? '' :
            '<button class="action-btn edit" data-uaction="edit" data-user-id="' + esc(u.id) + '" title="编辑">✏️</button>' +
            '<button class="action-btn edit" data-uaction="resetpwd" data-user-id="' + esc(u.id) + '" title="重置密码">🔑</button>' +
            '<button class="action-btn delete" data-uaction="delete" data-user-id="' + esc(u.id) + '" title="删除">🗑️</button>'
          ) +
        '</div></td>' +
      '</tr>';
    }).join('');
  }

  // 编辑用户弹窗
  function openEditUserModal(userId) {
    var u = allUsers.find(function (x) { return x.id === userId; });
    if (!u || u.role === 'admin') return;
    editingUserId = userId;
    document.getElementById('editUserId').value = u.id;
    document.getElementById('editUserUsername').value = u.username;
    document.getElementById('editUserDisplayName').value = u.displayName || '';
    document.getElementById('editUserEmail').value = u.email || '';
    document.getElementById('editUserError').style.display = 'none';
    document.getElementById('editUserModal').classList.add('active');
  }
  function closeEditUserModal() {
    document.getElementById('editUserModal').classList.remove('active');
    editingUserId = null;
  }
  async function submitEditUser(e) {
    e.preventDefault();
    var dname = document.getElementById('editUserDisplayName').value.trim();
    var email = document.getElementById('editUserEmail').value.trim();
    if (!dname) { showEditUserErr('请填写显示名'); return; }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { showEditUserErr('请填写有效邮箱'); return; }
    var btn = document.getElementById('editUserSubmitBtn');
    btn.disabled = true; btn.innerHTML = '<span>⏳</span> 保存中...';
    try {
      await apiRequest('/api/admin/users/' + editingUserId, { method: 'PUT', body: { displayName: dname, email: email } });
      showToast('用户信息已更新', 'success');
      closeEditUserModal();
      loadUsers();
    } catch (e) { showEditUserErr(e.message); }
    finally { btn.disabled = false; btn.innerHTML = '<span>💾</span> 保存'; }
  }
  function showEditUserErr(msg) {
    var el = document.getElementById('editUserError');
    el.textContent = msg; el.style.display = 'block';
    setTimeout(function () { el.style.display = 'none'; }, 4000);
  }

  // 重置密码弹窗
  function openResetPwdModal(userId) {
    var u = allUsers.find(function (x) { return x.id === userId; });
    if (!u || u.role === 'admin') return;
    resettingUserId = userId;
    document.getElementById('resetPwdTarget').textContent = '为 ' + u.username + ' 重置密码';
    document.getElementById('resetNewPwd').value = '';
    document.getElementById('resetConfirmPwd').value = '';
    document.getElementById('resetPwdError').style.display = 'none';
    document.getElementById('resetPwdMatch').style.display = 'none';
    document.getElementById('resetPwdModal').classList.add('active');
  }
  function closeResetPwdModal() {
    document.getElementById('resetPwdModal').classList.remove('active');
    resettingUserId = null;
  }
  async function submitResetPwd(e) {
    e.preventDefault();
    var np = document.getElementById('resetNewPwd').value.trim();
    var cp = document.getElementById('resetConfirmPwd').value.trim();
    var errEl = document.getElementById('resetPwdError');
    var matchEl = document.getElementById('resetPwdMatch');
    matchEl.style.display = 'none'; errEl.style.display = 'none';
    if (!np) { errEl.textContent = '请输入新密码'; errEl.style.display = 'block'; return; }
    if (np.length < 6) { errEl.textContent = '新密码至少 6 位'; errEl.style.display = 'block'; return; }
    if (np !== cp) { matchEl.textContent = '两次密码不一致'; matchEl.style.display = 'block'; return; }
    var btn = document.getElementById('resetPwdSubmitBtn');
    btn.disabled = true; btn.innerHTML = '<span>⏳</span> 重置中...';
    try {
      await apiRequest('/api/admin/users/' + resettingUserId + '/reset-password', { method: 'PATCH', body: { newPassword: np, confirmPassword: cp } });
      showToast('密码已重置', 'success');
      closeResetPwdModal();
    } catch (e) { errEl.textContent = e.message; errEl.style.display = 'block'; }
    finally { btn.disabled = false; btn.innerHTML = '<span>💾</span> 重置'; }
  }

  // 删除用户
  function openConfirmDeleteUser(userId) {
    var u = allUsers.find(function (x) { return x.id === userId; });
    if (!u || u.role === 'admin') return;
    deletingUserId = userId;
    document.getElementById('confirmUserText').textContent = '确定删除用户「' + u.username + '」吗？该用户上传的猫咪及相关数据将被一并删除，不可撤销。';
    document.getElementById('confirmUserModal').classList.add('active');
  }
  function closeConfirmUserModal() {
    document.getElementById('confirmUserModal').classList.remove('active');
    deletingUserId = null;
  }
  async function confirmDeleteUser() {
    if (!deletingUserId) return;
    var btn = document.getElementById('confirmUserDeleteBtn');
    btn.disabled = true; btn.innerHTML = '<span>⏳</span> 删除中...';
    try {
      var resp = await apiRequest('/api/admin/users/' + deletingUserId, { method: 'DELETE' });
      showToast(resp.message || '用户已删除', 'success');
      closeConfirmUserModal();
      loadUsers();
      loadCats();
    } catch (e) { showToast(e.message, 'error'); }
    finally { btn.disabled = false; btn.innerHTML = '<span>🗑️</span> 确认删除'; }
  }

  // ===== 事件绑定 =====
  function setupEvents() {
    // 返回首页
    document.getElementById('navBackBtn').addEventListener('click', function () {
      window.location.href = '/';
    });

    // 退出登录
    document.getElementById('navLogoutBtn').addEventListener('click', function () {
      localStorage.removeItem('authToken');
      localStorage.removeItem('authUser');
      window.location.href = '/';
    });

    // 新增猫咪
    document.getElementById('addCatBtn').addEventListener('click', function () {
      openCatForm(null);
    });

    // 表单提交
    document.getElementById('catForm').addEventListener('submit', submitCatForm);

    // 表单关闭
    document.getElementById('catFormClose').addEventListener('click', closeCatForm);
    document.getElementById('catFormCancelBtn').addEventListener('click', closeCatForm);
    document.getElementById('catFormModal').addEventListener('click', function (e) {
      if (e.target.id === 'catFormModal') closeCatForm();
    });

    // 删除确认
    document.getElementById('confirmDeleteBtn').addEventListener('click', confirmDelete);
    document.getElementById('confirmCancelBtn').addEventListener('click', closeConfirmModal);
    document.getElementById('confirmModal').addEventListener('click', function (e) {
      if (e.target.id === 'confirmModal') closeConfirmModal();
    });

    // ESC 关闭弹窗
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        if (document.getElementById('catFormModal').classList.contains('active')) closeCatForm();
        if (document.getElementById('confirmModal').classList.contains('active')) closeConfirmModal();
        if (document.getElementById('passwordModal').classList.contains('active')) closePasswordModal();
        if (document.getElementById('editUserModal').classList.contains('active')) closeEditUserModal();
        if (document.getElementById('resetPwdModal').classList.contains('active')) closeResetPwdModal();
        if (document.getElementById('confirmUserModal').classList.contains('active')) closeConfirmUserModal();
      }
    });

    // 修改密码
    document.getElementById('navChangePwdBtn').addEventListener('click', openPasswordModal);
    document.getElementById('passwordForm').addEventListener('submit', submitPasswordChange);
    document.getElementById('passwordModalClose').addEventListener('click', closePasswordModal);
    document.getElementById('pwCancelBtn').addEventListener('click', closePasswordModal);
    document.getElementById('passwordModal').addEventListener('click', function (e) {
      if (e.target.id === 'passwordModal') closePasswordModal();
    });

    // 实时密码一致性检查
    document.getElementById('confirmPassword').addEventListener('input', function () {
      var newPwd = document.getElementById('newPassword').value;
      var confirmPwd = this.value;
      var matchMsg = document.getElementById('pwMatchMsg');
      if (confirmPwd.length > 0 && newPwd !== confirmPwd) {
        matchMsg.textContent = '两次输入的新密码不一致';
        matchMsg.style.display = 'block';
      } else {
        matchMsg.style.display = 'none';
      }
    });

    setupFilters();
    setupTableEvents();
    setupUserEvents();
  }

  // ===== 用户管理事件 =====
  function setupUserEvents() {
    // 标签切换
    document.querySelectorAll('.tab-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var tab = this.dataset.tab;
        document.querySelectorAll('.tab-btn').forEach(function (b) { b.classList.remove('active'); });
        this.classList.add('active');
        document.querySelectorAll('.tab-panel').forEach(function (p) { p.style.display = 'none'; });
        var panel = document.getElementById(tab === 'cats' ? 'tabCats' : 'tabUsers');
        if (panel) panel.style.display = '';
        if (tab === 'users') loadUsers();
      });
    });

    // 用户搜索
    var usTimer;
    document.getElementById('userSearchInput').addEventListener('input', function () {
      clearTimeout(usTimer);
      usTimer = setTimeout(function () { userSearch = document.getElementById('userSearchInput').value.trim(); loadUsers(); }, 250);
    });

    // 用户排序
    document.getElementById('userSortSelect').addEventListener('change', function () {
      userSort = this.value; loadUsers();
    });

    // 用户表格事件代理
    var utbody = document.getElementById('usersTableBody');
    utbody.addEventListener('click', function (e) {
      var btn = e.target.closest('[data-uaction]');
      if (!btn) return;
      var uid = btn.dataset.userId;
      if (btn.dataset.uaction === 'edit') openEditUserModal(uid);
      else if (btn.dataset.uaction === 'resetpwd') openResetPwdModal(uid);
      else if (btn.dataset.uaction === 'delete') openConfirmDeleteUser(uid);
    });

    // 编辑用户弹窗
    document.getElementById('editUserForm').addEventListener('submit', submitEditUser);
    document.getElementById('editUserClose').addEventListener('click', closeEditUserModal);
    document.getElementById('editUserCancelBtn').addEventListener('click', closeEditUserModal);
    document.getElementById('editUserModal').addEventListener('click', function (e) { if (e.target.id === 'editUserModal') closeEditUserModal(); });

    // 重置密码弹窗
    document.getElementById('resetPwdForm').addEventListener('submit', submitResetPwd);
    document.getElementById('resetPwdClose').addEventListener('click', closeResetPwdModal);
    document.getElementById('resetPwdCancelBtn').addEventListener('click', closeResetPwdModal);
    document.getElementById('resetPwdModal').addEventListener('click', function (e) { if (e.target.id === 'resetPwdModal') closeResetPwdModal(); });
    document.getElementById('resetConfirmPwd').addEventListener('input', function () {
      var np = document.getElementById('resetNewPwd').value;
      var cp = this.value;
      var m = document.getElementById('resetPwdMatch');
      m.style.display = (cp.length > 0 && np !== cp) ? 'block' : 'none';
    });

    // 删除用户弹窗
    document.getElementById('confirmUserDeleteBtn').addEventListener('click', confirmDeleteUser);
    document.getElementById('confirmUserCancelBtn').addEventListener('click', closeConfirmUserModal);
    document.getElementById('confirmUserModal').addEventListener('click', function (e) { if (e.target.id === 'confirmUserModal') closeConfirmUserModal(); });
  }

  // ===== 夜间模式 =====
  function initTheme() {
    var saved = localStorage.getItem('darkMode');
    if (saved === 'true') {
      enableDarkMode();
    } else {
      updateThemeIcon();
    }

    var toggle = document.getElementById('themeToggle');
    if (toggle) {
      toggle.addEventListener('click', function () {
        if (isDarkMode) { disableDarkMode(); } else { enableDarkMode(); }
      });
      // 移动端 touchend
      toggle.addEventListener('touchend', function (e) {
        e.preventDefault();
        if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
          if (isDarkMode) { disableDarkMode(); } else { enableDarkMode(); }
        }
      });
    }
  }

  function enableDarkMode() {
    document.body.classList.add('dark-mode');
    document.documentElement.classList.add('dark-mode');
    isDarkMode = true;
    localStorage.setItem('darkMode', 'true');
    document.getElementById('themeIcon').textContent = '☀️';
  }

  function disableDarkMode() {
    document.body.classList.remove('dark-mode');
    document.documentElement.classList.remove('dark-mode');
    isDarkMode = false;
    localStorage.setItem('darkMode', 'false');
    document.getElementById('themeIcon').textContent = '🌙';
  }

  function updateThemeIcon() {
    document.getElementById('themeIcon').textContent = isDarkMode ? '☀️' : '🌙';
  }

  // ===== 初始化 =====
  async function init() {
    initTheme();

    if (!checkAuth()) return;

    setupEvents();
    await loadCats();
  }

  document.addEventListener('DOMContentLoaded', init);
})();
