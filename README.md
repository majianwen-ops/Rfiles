# 草地样方调查应用

🌿 草地样方调查工具 - 用于草地生态调查的移动应用

## 功能特点

- 📷 相机拍照 + 1m×1m样方框
- 🌱 草种识别 + 盖度计算
- 📍 GPS定位记录
- 🔲 网格切换 + 打点功能
- 📜 历史记录管理
- 📱 完整Android APK支持

## 技术栈

- React 18 + TypeScript
- Vite 构建工具
- Tailwind CSS 样式
- Capacitor 跨平台支持
- Zustand 状态管理
- Lucide React 图标

## 开发

```bash
# 安装依赖
npm install

# 开发模式
npm run dev

# 构建
npm run build

# 同步到Android
npx cap sync android

# Android构建
npx cap open android
```

## 项目结构

```
├── src/              # React源代码
│   ├── pages/        # 页面组件
│   ├── components/   # 公共组件
│   ├── store/       # 状态管理
│   └── utils/       # 工具函数
├── android/         # Android原生项目
└── public/          # 静态资源
```

## 许可证

MIT License
