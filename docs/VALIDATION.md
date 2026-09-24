# Windows 1.5.6 · 验证记录 / Validation

2026-09-21：用户已人工确认候选安装包并批准发布。

- 完整模式响应式布局与参数：114 项；720–6000 逻辑像素，中英文与两档字号。
- 参数适用性及旧配置兼容：291 项；真实窗口滚动与保存/取消交互：16 项。
- 综合回归：356 项；温度提醒 99 项，自启/排序 51 项，语言 32 项。
- 更新逻辑与双语配色：75 项；更新窗口交互：34 项。
- 三种模式启动：各 5 项；发布依赖清单核对：5 项。

以上为本地验证范围，不代表所有硬件与系统组合均经过实测。新增内存传感器显示使用合成数据验证；本轮未重新进行真实全屏游戏测试。传感器依赖和功能运行库保留，仅精简不提供的其他界面语言资源。

The accepted Windows candidate passed the checks above. These are local checks, not certification of every hardware/OS combination. DIMM display cases used synthetic readings; this round did not repeat fullscreen-game testing. Sensor dependencies and functional runtimes are retained.

---
# 验证范围 / Validation scope

## Windows 1.5.2

2026-09-19: 540 checks passed / 共 540 项检查通过。

| Scope / 范围 | Passed / 通过 |
|---|---|
| Usage colors, thresholds, notification preferences and UI / 配色、阈值、通知开关与界面 | 99/99 |
| Startup, sorting and default headers / 自启、排序和默认表头 | 51/51 |
| Language and data directory / 语言与数据目录 | 32/32 |
| Existing regression / 既有功能回归 | 356/356 |
| Native notification request and shown event / 实际系统通知请求与显示事件 | 2/2 |

Checked Chinese/English, light/dark rendering, three modes, 13/18-point module settings, contrast across eight palettes, threshold hysteresis, alert cooldown and settings save/cancel. Windows reported the explicitly labelled test notification as shown. The user reviewed and accepted the candidate.
已检查中英文、明暗主题、三种模式、13/18 号模块设置、八种配色对比度、温度恢复逻辑、通知间隔及保存/取消。Windows 确认测试通知显示，用户已查看并确认候选版。

No hardware overheating was induced. Reboot/logon startup, elevated sensor acquisition, native pointer/taskbar hover scenarios and installation/uninstallation were not repeated for 1.5.2. macOS remains the unchanged, untested-on-Mac preview.
未人为加热硬件。本版未重做重启/登录自启、管理员传感器、原生鼠标/任务栏悬停及安装/卸载实测。macOS 保持原预览版，尚未 Mac 实机验证。

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



## 1.5.8 发布范围（2026-09-24）

Windows 编译与打包完成。此前候选的 192 项检查通过；最终紧凑布局复原、悬停提示及卸载流程未完成真实交互复测，部分应用的窗口恢复兼容性仍需进一步验证。192 项不代表最终变更全部经过复测。性能优化未提供量化基准。NuGet 漏洞信息查询出现 NU1900 网络警告，依赖版本未改变。没有发布 macOS 安装包。
