# 📚 背单词 PWA

游戏化背单词应用，支持离线使用！

## 部署到 GitHub Pages

### 方式一：手动部署（推荐新手）

1. 打开 https://github.com 并登录
2. 点击右上角 **+** → **New repository**
3. 仓库名填写 `vocab-app`，选 Public
4. 点击 **Create repository**
5. 在仓库页面，点击 **uploading an existing file**
6. 把 `index.html`、`manifest.json`、`sw.js` 三个文件拖进去
7. 点击 **Commit changes**
8. 进入 **Settings** → **Pages**
9. Source 选择 **Deploy from a branch**，Branch 选择 **main**，点击 Save
10. 等待 1-2 分钟，你的 App 就上线了！地址：`https://你的用户名.github.io/vocab-app/`

### 方式二：命令行部署

```bash
# 1. 进入项目目录
cd ~/WorkBuddy/20260417172206/vocab-app

# 2. 初始化 Git 仓库
git init

# 3. 添加所有文件
git add .

# 4. 提交
git commit -m "Initial commit"

# 5. 添加远程仓库（把下面的 URL 换成你创建的仓库地址）
git remote add origin https://github.com/你的用户名/vocab-app.git

# 6. 推送
git branch -M main
git push -u origin main
```

然后在 GitHub 仓库 Settings → Pages 启用即可。

---

## PWA 功能

- ✅ 添加到主屏幕
- ✅ 离线使用
- ✅ 自动更新
- ✅ 推送通知提醒

## 技术栈

- 纯 HTML/CSS/JavaScript，无依赖
- 有道词典 TTS 语音合成
- Service Worker 离线缓存
