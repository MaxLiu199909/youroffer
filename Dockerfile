# 基础镜像选择 Node.js 18
FROM node:18-alpine

# 设置工作目录
WORKDIR /app

# 安装依赖
COPY package.json package-lock.json ./
RUN npm ci

# 生产环境构建
FROM node:18-alpine AS builder
WORKDIR /app
COPY --from=0 /app/node_modules ./node_modules
COPY . .
RUN npm run build

# 使用nginx托管静态文件
FROM nginx:alpine AS production
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

# 开发环境
FROM node:18-alpine AS development
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
EXPOSE 5173
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
