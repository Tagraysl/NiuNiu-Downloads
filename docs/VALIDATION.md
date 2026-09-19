# 验证范围 / Validation scope

## Windows 1.5.0

| Check / 检查 | Result / 结果 |
|---|---|
| Existing UI/logic regression / 既有界面与逻辑回归 | 356 / 356 |
| Language and data-directory checks / 语言与数据目录 | 32 / 32 |
| Installation, upgrade, uninstall / 安装、升级、卸载 | 13 / 13 |
| Icon sizes / 图标尺寸 | All 9 decoded / 9 种均可读取 |

Checks cover settings compatibility, sorting, module selections, themes, compact presentation, continuous scrolling, guarded operations on temporary test processes, language switching, configurable storage, migration and data preservation. Screenshots were inspected for layout and English text. Deployment files matched the tested candidate by SHA-256; existing personal settings remained unchanged.

覆盖旧配置兼容、排序、模块字段、主题、紧凑布局、连续滚动、临时测试进程的受保护操作、中英文切换、数据目录、迁移和保留数据。已检查截图中的布局与英文文本；本地部署文件逐一与测试候选核对 SHA-256，原个人配置保持不变。

**Not repeated for this release:** elevated CPU/SSD temperature acquisition, native pointer dragging and native taskbar timer/hover scenarios. Earlier local tests exist, but are not counted as fresh evidence. Hardware/driver variation and future Windows taskbar changes remain compatibility constraints. Advanced Ping0 has no real-key validation.

**本版未重新验证：**管理员 CPU/SSD 温度读取、真实鼠标拖动及原生任务栏计时/悬停场景。既有版本做过的验证不当作本轮证据；硬件/驱动差异及 Windows 任务栏变动仍影响兼容性，高级 Ping0 未用真实密钥验证。

## macOS 0.1.0 preview

| Check / 检查 | Result / 结果 |
|---|---|
| Shared logic on Windows / Windows 上的共享逻辑 | 10 / 10 |
| Avalonia renderer on Windows / Windows 上的界面渲染 | 2 / 2 |
| ARM64/x64 package structure, runtime and permissions / 架构、运行库和权限 | 22 / 22 |
| Actual Mac launch, sensors and operations / Mac 实际启动与采集操作 | **Not tested / 未测** |

No Mac was available. Cross-compilation and package checks do not establish that the app launches or sensors work on macOS. Read the [implemented scope, missing features and Mac acceptance checklist](../platforms/macos/README.en.md).

当前没有 Mac，交叉编译与打包成功不等于实机启动和采集正常。详见 [Mac 已实现范围、缺项及验收清单](../platforms/macos/README.en.md)。

## Signing, media and release integrity

- Windows downloads are unsigned. Mac previews lack Developer ID signing and notarization. The supplied future signing scripts do not imply any certification. Downloaded-file SmartScreen/Gatekeeper behavior has not been independently verified.
- Windows 未签名；Mac 没有 Developer ID 签名和公证。后续签名脚本不代表已经认证，未独立验证联网下载后系统拦截体验。
- Images use actual application UI and sample data. GIFs are sequences of captured UI states, not live performance recordings. No personal configuration, keys, logs or local network reports are published.
- 图片使用真实界面与示例数据，GIF 为截图序列；不上传个人配置、密钥、日志或本机网络报告。
- Release assets include SHA-256 manifests. Compare the downloaded file's SHA-256 with the corresponding manifest to detect corruption or mismatch.
- 发行包附 SHA-256 清单，可核对下载内容的一致性。

