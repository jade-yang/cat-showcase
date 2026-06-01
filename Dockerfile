FROM node:22-alpine

WORKDIR /app

ENV NODE_ENV=production

# 安装依赖（分层缓存）
COPY package*.json ./
RUN npm ci --omit=dev

# 复制源码
COPY . .

# 确保数据/上传目录存在
RUN mkdir -p /app/server/data /app/server/uploads

EXPOSE 3000

CMD ["npm", "start"]
