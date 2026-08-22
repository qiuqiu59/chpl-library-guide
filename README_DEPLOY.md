# 🚀 CHPL Full-Stack Deployment Guide (云端部署指南)

本项目为基于 **Python (Flask + Plotly) + Gunicorn + Docker** 的动态全栈 Web 应用，提供 3 种极速一键云端部署方案，均可免费上线并获得专属公开 Live URL：

---

## 方案 1: Render 免费一键部署 (推荐 - 1分钟上线)
1. 将当前文件夹代码推送到 GitHub 仓库（或使用当前本地 Git 仓库）。
2. 打开 [Render Dashboard](https://dashboard.render.com/)，点击 **New +** ➔ **Web Service**。
3. 选择关联您的 GitHub 仓库。
4. Render 会自动读取 `render.yaml` 与 `requirements.txt`：
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `gunicorn --bind 0.0.0.0:$PORT server:app`
5. 点击 **Deploy**，部署完成后即可获得免费的公开访问域名：
   - `https://chpl-library-guide.onrender.com`

---

## 方案 2: Google Cloud Run 部署 (企业级无服务器)
1. 安装并初始化 Google Cloud SDK：
   ```bash
   gcloud auth login
   gcloud config set project YOUR_PROJECT_ID
   ```
2. 运行一键部署脚本：
   - **PowerShell (Windows)**:
     ```powershell
     .\deploy_cloud_run.ps1
     ```
   - **Bash (Linux/Mac)**:
     ```bash
     bash deploy_cloud_run.sh
     ```
3. 部署成功后，Google Cloud 会直接输出专属 Live URL：
   - `https://chpl-guide-xxxx-uc.a.run.app`

---

## 方案 3: Railway 免费一键部署
1. 打开 [Railway.app](https://railway.app/)，点击 **New Project** ➔ **Deploy from GitHub repo**。
2. Railway 会自动根据 `Dockerfile` 构建容器并在数秒内生成公网访问域名：
   - `https://chpl-guide.up.railway.app`

---

## 🛠️ 本地启动与测试 (Local Run)
```bash
# 1. 安装依赖
pip install -r requirements.txt

# 2. 启动服务
python server.py
# 浏览器访问: http://localhost:8080
```
