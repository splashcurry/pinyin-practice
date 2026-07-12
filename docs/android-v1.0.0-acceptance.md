# 拼音练习 Android V1.0.0 验收记录

验收日期：2026-07-12
验收结论：**通过**

## 交付信息

- 应用名称：拼音练习
- 包名：`io.github.splashcurry.pinyinpractice`
- 版本：`versionCode 1` / `versionName 1.0.0`
- 最低版本：Android 8.0（API 26）
- 目标版本：Android API 36
- 应用代码标签：`V1.0.0`
- 应用代码提交：`b046661b019b55c4fe168a09090f33e01d7c68a6`
- Release：<https://github.com/splashcurry/pinyin-practice/releases/tag/V1.0.0>
- 安装包：`pinyin-practice-v1.0.0.apk`
- APK 大小：6,292,498 字节
- APK SHA-256：`B69BB6B8EF0D065E06ED3BB4266DF4B215C35D1B4C8FD861C91FBB02FA3F2A2D`

## 自动验证

- 仓库内 `android/` 工程执行 `gradlew.bat assembleDebug`，结果为 `BUILD SUCCESSFUL`。
- `apksigner verify` 验证通过；APK 使用 Android APK Signature Scheme v2，签名者数量为 1。
- 签名证书 SHA-256：`DC73AD08A1EFFEAD16837EED39D0E91399F9362D711AD2E0C93977D998F40921`。
- `aapt dump badging` 验证应用名、包名、版本号、minSdk 和 targetSdk 均符合交付要求。
- Git 跟踪文件中不存在 keystore、`key.properties`、`local.properties`、构建缓存或 APK。
- Git 跟踪内容中未发现签名密码、私钥或本机 SDK 路径。
- 从 GitHub Release 重新下载的 APK 大小和 SHA-256 与本地签名 APK完全一致。
- `V1.0.0` 指向上述应用代码提交；`网页V1.0.0` 至 `网页V1.4.0` 五个历史标签均保持原提交指向。

## 真机回归

以下项目由应用所有者在 Android 真机上完成测试，并确认未发现问题：

- 冷启动、返回前台和旋转屏幕后页面可用。
- 首页以及单个拼音、四声、拼读、课程、每日、历史和随机练习均可访问。
- 单个拼音、四声和拼读三类音频均可播放。
- 关闭并重新打开应用后，网页本地状态符合原网站行为。
- Android 返回手势/返回键优先回退网页历史，首页返回时退出应用。
- 断网启动显示中文错误提示，恢复网络后可重新加载。
- 正式图标、中文应用名和版本显示正确。
- 签名 Release APK 可安装并正常启动。

## 密钥保管

Release keystore、别名及密码由应用所有者独立保管，不进入代码仓库、文档或聊天记录。后续所有 Android 更新必须继续使用同一个 keystore 签名，否则已安装版本无法直接升级。
