<div align="center">
<img src="docs/images/icon.png" width="72" alt="牛牛" />
<h1>牛牛 · 电脑状态，一眼有数。</h1>
<p>查找高占用程序，查看硬件负载与温度，把关注的指标留在桌面或任务栏。</p>
<p>A Windows monitor for hardware readings, busy processes and a desktop that fits your workflow.</p>

<a href="https://github.com/Tagraysl/NiuNiu-Downloads/releases/download/v1.5.6/NiuNiu-1.5.6-Windows-x64-Setup.exe">下载 Windows 1.5.6</a> · <a href="https://tagraysl.github.io/NiuNiu-Downloads/">官网与交互演示</a> · <a href="README.zh-CN.md">详细中文说明</a> · <a href="README.en.md">English guide</a>
</div>

## 可以用来做什么？

| 你想了解 | 牛牛提供 |
|---|---|
| 电脑突然变慢，谁在忙？ | 进程图标、名称/PID 搜索，按 CPU、GPU、内存、读写、网络及估算能耗排序 |
| 长时间工作时，硬件状态如何？ | 负载、支持的温度、频率与功耗，带单位和时间轴的趋势曲线 |
| 不想一直打开大窗口？ | 完整、紧凑、Windows 任务栏三种模式；各自保存显示内容 |
| 只想看自己关心的信息？ | 自选参数和曲线、DIY 分组、自定义行、模块宽度、字体和配色 |
| 想及时留意温度变化？ | 自定义温度阈值、超温变红、可选 Windows 通知 |

## 1.5.6 更新

完整模式的参数会根据实际可用宽度自动排成多列，统一放在图表上方。同一行卡片的图表对齐，长内容按需滚动。参数和曲线分区设置，支持参数排序和恢复推荐。

同时优化控件复用与布局开销；安装包约 **52.0 MB**，保留传感器依赖及功能运行库。

## 下载与使用

1. 下载并安装 **Windows 10/11 x64** 版本，安装包内置运行环境。
2. 在“电脑参数”查看硬件，在“占用”查找程序；点击模块 **⋯** 自选指标。
3. 选择完整、紧凑或任务栏模式。在通用设置中按需开启自启、温度通知和自动更新检查。

已有软件内更新功能的版本，可以直接在软件内检查、下载并安装更新。手动升级时沿用安装及数据目录即可保留配置。本次仅提供 Windows 版本。

## 更多功能

- 物理硬盘活动率、温度及读写速度；分区容量、可用空间与文件系统。
- 网卡实时速度、累计流量；公网 IP、地区、ASN、运营商及延迟查询。
- 独立模块采样间隔；三种模式的显示选择分别保存。
- 紧凑模式滚动与轮播；任务栏分组轮播、滚轮切换及按格左右拖动。
- 浅色、深色、多套配色和 DIY 配色；中文与英文界面。
- 进程打开/关闭操作，五档估算能耗影响：很低、低、中等、高、很高。

详细操作与指标口径见 [中文指南](README.zh-CN.md) / [English guide](README.en.md)。

## 安装与许可

温度与传感器项目取决于硬件及驱动。监控程序请求管理员权限，部分传感器需要 PawnIO；安装包目前未取得发布者签名。

当前版本可免费用于个人及组织内部。此仓库提供安装包与说明，牛牛核心源码不公开。详见 [使用许可](LICENSE)、[第三方声明](THIRD-PARTY-NOTICES.md)。

[更新记录](CHANGELOG.zh-CN.md) · [验证范围](docs/VALIDATION.md) · [反馈建议](https://github.com/Tagraysl/NiuNiu-Downloads/issues)
