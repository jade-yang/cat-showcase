(function () {
    const API_BASE = '';

    function getAuthHeaders() {
        var token = window.Auth ? window.Auth.getAuthToken() : null;
        return token ? { 'Authorization': 'Bearer ' + token } : {};
    }

    async function request(path, options) {
        var authHeaders = getAuthHeaders();
        var mergedOptions = { ...options, headers: { ...authHeaders, ...(options && options.headers || {}) } };
        const response = await fetch(API_BASE + path, mergedOptions);
        let body = null;
        try {
            body = await response.json();
        } catch (error) {
            body = { success: false, message: '接口返回格式错误' };
        }

        if (!response.ok || !body.success) {
            const message = body && body.message ? body.message : '请求失败';
            throw new Error(message);
        }

        return body.data;
    }

    function buildQuery(params) {
        const query = new URLSearchParams();
        Object.entries(params || {}).forEach(([key, value]) => {
            if (value !== undefined && value !== null && value !== '') {
                query.set(key, value);
            }
        });
        const text = query.toString();
        return text ? '?' + text : '';
    }

    window.CatApi = {
        getCats(params) {
            return request('/api/cats' + buildQuery(params));
        },
        getCat(id) {
            return request('/api/cats/' + encodeURIComponent(id));
        },
        createCat(data) {
            return request('/api/cats', {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(data)
            });
        },
        updateCat(id, data) {
            return request('/api/cats/' + encodeURIComponent(id), {
                method: 'PUT',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(data)
            });
        },
        deleteCat(id) {
            return request('/api/cats/' + encodeURIComponent(id), {
                method: 'DELETE'
            });
        },
        updateStats(id, stats) {
            return request('/api/cats/' + encodeURIComponent(id) + '/stats', {
                method: 'PATCH',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(stats)
            });
        },
        async uploadImage(file) {
            const formData = new FormData();
            formData.append('image', file);
            return request('/api/upload', {
                method: 'POST',
                body: formData
            });
        },
        shareCat(id) {
            return request('/api/cats/' + encodeURIComponent(id) + '/share', { method: 'PATCH' });
        },
        getComments(catId) {
            return request('/api/cats/' + encodeURIComponent(catId) + '/comments');
        },
        createComment(catId, content) {
            return request('/api/cats/' + encodeURIComponent(catId) + '/comments', {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify({ content: content })
            });
        },
        deleteComment(commentId) {
            return request('/api/comments/' + encodeURIComponent(commentId), { method: 'DELETE' });
        },
        getMyCats() {
            return request('/api/users/me/cats');
        }
    };
})();
