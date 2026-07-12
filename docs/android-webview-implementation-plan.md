# 拼音练习 Android WebView App 实施计划（V1）

## 0. 执行原则

本计划只实施需求文档中确认的在线 WebView V1。Android 工程与现有 `pinyin-practice` 网页工程分开保存，避免把 Gradle 文件、签名信息或构建产物混入网页仓库。

建议目录：

```text
C:\Users\Wanguang\Desktop\pinyin\
├── pinyin-practice\          # 现有网站
└── pinyin-practice-android\  # 新建 Android 工程
```

## 1. 阶段与交付物

| 阶段 | 工作 | 完成标志 | 交付物 |
| --- | --- | --- | --- |
| P0 | 确认需求与准备环境 | Android Studio、SDK、JDK 和真机调试条件可用 | 环境检查结果 |
| P1 | 创建空 Android 工程 | Gradle 同步和默认空应用可运行 | `pinyin-practice-android` 工程 |
| P2 | WebView 最小壳 | 首页、JavaScript、存储、音频可用 | 首个 debug APK |
| P3 | 可靠性与安全 | 返回键、加载错误、外链策略、权限最小化完成 | 真机测试记录 |
| P4 | 品牌与打包 | 名称、图标、版本号和签名配置完成 | release APK 与密钥保管说明 |
| P5 | 验收与交付 | 逐项通过验收标准 | 安装包、测试清单 |

## 2. P0：环境准备

1. 从 Android 官方网站安装稳定版 Android Studio，并保留安装器推荐的 Android SDK、Platform Tools 与 Emulator 组件。
2. 首次启动时完成 SDK 下载；使用 Android Studio 内置 JDK，不单独安装 Java。
3. 准备一部 Android 8.0 或更高版本手机，开启“开发者选项”和“USB 调试”；或先创建 Android 模拟器。
4. 用 `adb devices` 确认设备连接。若设备未出现，先处理 USB 驱动或手机授权提示，暂不写业务代码。

## 3. P1：创建工程

在 Android Studio 选择 **New Project → Empty Views Activity**（不是 Compose 模板），设置：

| 字段 | 值 |
| --- | --- |
| Name | 拼音练习 |
| Package name | `io.github.splashcurry.pinyinpractice` |
| Language | Kotlin |
| Minimum SDK | API 26: Android 8.0 |
| Save location | `C:\Users\Wanguang\Desktop\pinyin\pinyin-practice-android` |

完成后先运行默认应用一次。这一步成功才进入 WebView 改造，以便区分环境问题与代码问题。

## 4. P2：实现最小 WebView 壳

1. 在 manifest 中仅添加 `INTERNET` 权限。
2. 主界面只保留一个全屏 WebView 和一个初始隐藏的加载/错误状态容器。
3. 初始化 WebView：
   - 开启 JavaScript；
   - 开启 DOM Storage；
   - 允许媒体播放；
   - 指向 `https://splashcurry.github.io/pinyin-practice/`；
   - 使用 `WebViewClient`，避免普通站内导航跳到外部浏览器。
4. 保留 WebView 实例以支持返回键处理和“重新加载”。
5. 在真机上依次检查主页、页面切换、音频与本地存储。

## 5. P3：补齐可靠性与安全

1. 仅在 WebView 内加载 `https` 且主机名为 `splashcurry.github.io` 的页面。
2. 对外部网站、电话和邮件等 scheme 使用系统 Intent；不能安全处理的链接则提示用户而不加载。
3. 禁止 file URL 访问、通用文件访问及混合 HTTP 内容。
4. 监听页面加载错误和网络不可用状态，显示带“重新加载”按钮的错误状态。
5. 使用 AndroidX 的返回键调度机制：可回退则 `goBack()`，否则让系统处理退出。
6. 不启用 WebView 调试开关于 release 版本。

## 6. P4：品牌、版本与签名

1. 修改 `app_name` 为「拼音练习」。
2. 将确认后的 512 × 512 PNG 通过 Image Asset 工具生成自适应图标；未确认图标不阻塞功能测试。
3. 初版版本号：`versionCode = 1`、`versionName = "1.0.0"`。
4. debug 阶段使用自动签名；release 阶段创建专用 keystore。
5. keystore 文件、别名和密码由应用所有者自行保存；密码不写入代码、仓库或聊天记录；将 `*.jks`、`*.keystore`、`key.properties` 加入 `.gitignore`。

## 7. P5：测试与交付

### 真机回归清单

- 冷启动、返回前台、旋转屏幕后页面可用。
- 首页与七类练习均能访问。
- 至少播放单个拼音、四声音频和拼读音频各一次。
- 本地练习状态在关闭再打开后符合网页自身行为。
- 内部页面返回、首页返回、外部链接三种情况符合需求。
- 飞行模式/断网启动有可理解的错误提示且可重试。
- debug APK 安装、卸载、重装均正常。
- release APK 安装后，应用名、图标与版本正确。

### 交付清单

- Android 工程源代码（不含 keystore 和本地密钥配置）。
- `app-debug.apk`（联调阶段）。
- `app-release.apk`（验收通过后）。
- 本文档与需求文档。

## 8. 风险与应对

| 风险 | 影响 | 应对 |
| --- | --- | --- |
| GitHub Pages 或网络不可达 | App 无法加载主内容 | V1 提供重试；V2 再评估离线 assets。 |
| WebView 与网页资源路径不兼容 | 某些页面或音频异常 | 先以线上 URL 联调；必要时修正站点资源路径后再打包。 |
| WebView 内存储与浏览器不同 | Web 与 App 的本地进度不共享 | 这是正常隔离行为，在首次使用说明中明确。 |
| 签名密钥丢失 | 后续无法覆盖升级同包名应用 | 交付前备份 keystore 至安全位置。 |
| 应用商店合规要求 | 无法直接上架 | V1 仅侧载 APK；上架另立需求和合规检查。 |

## 9. 开始实施前的确认点

开始 P0 前，只需确认三点：

1. V1 使用在线加载，不做离线包。
2. 使用包名 `io.github.splashcurry.pinyinpractice`。
3. 先以真机 USB 调试测试；没有真机则先使用模拟器。
