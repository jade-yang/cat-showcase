# 🐳 Docker 部署指南 — 猫咪图鉴

## 前置要求

- 服务器已安装 [Docker](https://docs.docker.com/engine/install/)（20.10+）
- 已安装 [Docker Compose](https://docs.docker.com/compose/install/)（v2+）
- 防火墙已开放配置的端口（默认 3000）

## 快速开始

```bash
# 1. 克隆项目（如果还没有）
cd cat-showcase

# 2. 复制并编辑环境变量
cp .env.example .env
nano .env    # 修改 ADMIN_PASSWORD 和 JWT_SECRET！

# 3. 构建并启动
docker compose up -d --build

# 4. 查看日志确认启动
docker compose logs -f

# 5. 访问 http://服务器IP:3000
```

## 默认管理员

| 字段 | 值 |
|------|-----|
| 用户名 | `admin` |
| 密码 | `admin159`（见 `.env` 中的 `ADMIN_PASSWORD`） |

> ⚠️ **首次登录后请立即修改管理员密码！** 在管理员后台点击「🔒 修改密码」。

## 常用命令

```bash
docker compose up -d --build   # 构建并启动
docker compose logs -f         # 查看日志
docker compose ps              # 查看状态
docker compose restart         # 重启
docker compose down            # 停止并删除容器
docker compose down -v         # 停止并删除容器+数据卷（⚠️数据会丢失）
```

## 数据持久化

项目使用 JSON 文件存储数据，通过 Docker volume 挂载到宿主机：

| 挂载路径 | 内容 | 说明 |
|---------|------|------|
| `./server/data` | `cats.json` `users.json` `comments.json` `tokens.json` | 核心数据 |
| `./server/uploads` | 用户上传的图片 | 媒体文件 |

重启或重建容器后数据**不会丢失**。

## 备份数据

```bash
# 备份
tar -czf cat-backup-$(date +%Y%m%d).tar.gz server/data server/uploads

# 恢复
tar -xzf cat-backup-20240601.tar.gz
docker compose restart
```

建议设置 cron 定时备份：
```bash
# 每天凌晨 3 点备份
0 3 * * * cd /path/to/cat-showcase && tar -czf backups/cat-$(date +\%Y\%m\%d).tar.gz server/data server/uploads
```

## Nginx 反向代理（推荐）

```nginx
server {
    listen 80;
    server_name your-domain.com;

    # 上传大小限制
    client_max_body_size 10m;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

配置 HTTPS：
```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

## 生产安全建议

1. **必须修改 `ADMIN_PASSWORD`** — 不要使用默认 `admin159`
2. **必须修改 `JWT_SECRET`** — 生成方式：
   ```bash
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```
3. **不要提交 `.env`** — 已在 `.gitignore` 中排除
4. **启用 HTTPS** — 使用 Let's Encrypt + Certbot
5. **定期备份** — `server/data` 和 `server/uploads`
6. **限制管理后台访问** — 可通过 Nginx IP 白名单：
   ```nginx
   location /admin {
       allow 你的IP;
       deny all;
   }
   ```

## 常见问题

### 端口被占用
```bash
# 修改 .env 中的 APP_PORT 为其他端口，如 8080
APP_PORT=8080
docker compose up -d --build
```

### 数据丢失
确认 `docker-compose.yml` 中 volumes 配置正确：
```bash
docker compose config | grep -A2 volumes
```

### 管理员无法登录
检查数据目录权限，确保容器有读写权限：
```bash
chmod -R 755 server/data server/uploads
```

### 容器启动失败
```bash
# 查看完整日志
docker compose logs cat-app

# 常见原因：端口冲突、目录权限不足、.env 格式错误
```

## 更新部署

```bash
git pull
docker compose up -d --build
# 数据由 volume 保留，不会丢失
```
