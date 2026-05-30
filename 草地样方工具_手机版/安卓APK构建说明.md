# 草地样方调查 - 安卓 APK 构建说明

## 前置条件

要构建此项目，需要准备：

1. **Java Development Kit (JDK) 17 或更高版本**
2. **Android Studio** 或 **Android SDK**（最低 API 22 (Android 5.1) 或更高
3. **Gradle**（通常随 Android Studio 一起安装）
4. **环境变量配置**：
   - `JAVA_HOME` 指向 JDK 安装目录
   - `ANDROID_HOME` 或 `ANDROID_SDK_ROOT` 指向 Android SDK 目录

## 构建步骤

### 方法一：使用 Android Studio（推荐）

1. **打开项目**
   - 打开 Android Studio
   - 选择 "Open an Existing Project"
   - 选择项目中的 `android` 文件夹

2. **等待 Gradle 同步**
   - Android Studio 会自动检测到 Gradle 项目并开始同步
   - 等待同步完成（首次同步可能需要几分钟）

3. **构建 APK**
   - 在 Android Studio 顶部菜单：`Build` > `Build Bundle(s) / APK(s)` > `Build APK(s)`
   - 或使用快捷键：`Ctrl + F9` (Windows/Linux) 或 `Cmd + F9` (Mac)

4. **获取 APK 文件**
   - 构建完成后，点击通知中的 "locate" 或在以下位置找到：
     - `android/app/build/outputs/apk/debug/app-debug.apk`

### 方法二：使用命令行（Gradle）

1. **进入安卓目录**
   ```bash
   cd android
   ```

2. **清理旧构建**（可选）**
   ```bash
   ./gradlew clean
   ```

3. **构建 Debug APK**
   ```bash
   ./gradlew assembleDebug
   ```

4. **构建 Release APK（需要签名配置）**
   ```bash
   ./gradlew assembleRelease
   ```

## 更新应用代码

如果您修改了 React Web 应用的代码：

1. **重新构建 Web 应用**
   ```bash
   npm run build
   ```

2. **同步到安卓**
   ```bash
   npx cap sync
   ```

3. **再重新构建 APK（使用方法一或方法二）

## 安装到手机

1. **启用手机的开发者选项和 USB 调试
2. **用 USB 线连接手机到电脑**
3. **在 Android Studio 中点击 "Run" 按钮（绿色三角形）**
   - 选择你的设备
   - 或使用命令行安装：
   ```bash
   cd android
   ./gradlew installDebug
   ```

## 发布版签名（Release 版本）

要构建发布版本需要配置签名，简要步骤：

1. **创建密钥库（keystore）
2. 在 `android/app/build.gradle` 中配置签名
3. 运行 `./gradlew assembleRelease`

## 应用功能说明

- **应用名称：草地样方调查
- **包名**：com.example.grasssurvey
- **最低支持安卓版本**：Android 5.1 (API 22)
- **目标安卓版本**：推荐 Android 13 (API 33)
