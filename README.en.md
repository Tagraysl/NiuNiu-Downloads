# NiuNiu — full feature guide

## New in Windows 1.5.2

- Optional start with Windows, A–Z/Z–A process sorting, and readable initial column headers.
- Ten hardware-usage color bands from green through blue to red in all three modes, adapted to light and dark themes.
- Adjustable per-device temperature limits in module ⋯ settings, shared by all modes. Defaults: CPU 85°C, GPU core 80°C, drives 60°C. Red at the limit; normal again 2°C below it.
- Optional Windows temperature notifications in General settings, off by default, with a test button. One alert per overheating episode, at least five minutes apart per device. Windows notification and Do Not Disturb settings apply.
- Fully quit the old version before updating. Reuse the installation and data folders to retain settings.

[简体中文](README.zh-CN.md) · [Visual overview](README.md) · [Downloads](https://github.com/Tagraysl/NiuNiu-Downloads/releases)

NiuNiu is a desktop monitoring tool with rounded cards, consistent spacing and alignment, and a choice of a detailed dashboard, compact panel or actual Windows taskbar display. Its interface supports Simplified Chinese and English.

This guide describes **Windows 1.5.2**. The independent macOS 0.1.0 preview has not been tested on a Mac and does not yet match the Windows feature set.

## 1. Hardware and processes

### Hardware

- **CPU:** whole-machine utilization, logical processor count, temperature, and available clock/power/other sensor readings.
- **GPU:** each adapter's utilization, used/total VRAM and supported temperature, clock and power readings. Available fields depend on the device.
- **Memory:** utilization, used/total and available physical memory. Unsupported temperature readings are explicitly unavailable.
- **Physical drives:** SSD/HDD activity, read/write rates and supported temperatures. **Volumes** show used/total space and file system, without inventing a separate partition temperature. The default DIY layout separates drives from volumes.
- **Adapters:** link utilization and speed, upload/download rates and cumulative totals. Physical and virtual adapters remain separate to avoid double-counting forwarded traffic.
- **Detailed sensors:** selectable device-specific readings. CPU and GPU cards do not have to expose identical fields.

![Hardware with sample data](docs/images/hardware-en.png)

### Per-process usage

Search by app name or PID. Sort by CPU, GPU, memory, I/O rate, network traffic or estimated energy impact. Clickable column headings show an affordance; the active sort is highlighted with a direction arrow and stays synchronized with the selector.

- **Open:** restore an existing window, or ask the desktop shell to open the executable where possible. A background service may have no visible interface.
- **End:** terminate the selected process, not the entire tree. Unsaved work can be lost. Critical processes and NiuNiu itself are protected; PID and start time are checked to guard against PID reuse.
- Compact mode keeps a top-to-bottom ranking. Rank, name and action buttons are enabled by default; metrics can be selected independently. Wider windows can add the sort metric, memory, CPU/GPU and other details on the same row without creating ambiguous ranking columns.
- Explicitly selected details remain visible and wrap below the name when necessary. Buttons and context menus are available; hover the name to see the PID.

![Process table with sample apps](docs/images/processes-en.png)

## 2. Three display modes

| Mode | Behavior |
|---|---|
| **Full** | Card grid or DIY groups, with minimize, maximize/restore and close controls; double-click the title to maximize |
| **Compact** | Freely resizable and draggable panel, optional always-on-top, Hardware/Processes tabs, Adaptive/Auto-scroll/Carousel presentation |
| **Windows taskbar** | Metrics attached to the actual system taskbar, using transparent text and the system's colors |

The compact panel defaults to 360×480, can shrink to 300×240 and remembers its size. Drag blank areas, card text or values to move it; interactive controls retain their usual actions. Long model names can scroll horizontally while CPU/GPU labels stay fixed. Hover pauses the marquee; it can be disabled.

**Adaptive** presentation uses the available space. **Auto-scroll** continuously joins the final item back to the first, with five speed levels. Hover, typing and open menus pause motion. Content that fits stays still; manual scrolling remains available, and hidden views stop animating.

The **hardware carousel** fits multiple slots according to the window, font and card content. Slots rotate different module queues. Choose Auto or a ceiling of 1–6 slots; actual capacity still depends on space. The **process carousel** advances a full page of ranked rows, shows the rank range and adds rows when resized taller. Search or sorting resets it to the first page.

![Two-slot carousel captured states](docs/images/compact-carousel.gif)

Taskbar groups rotate every 5 seconds by default. Disable rotation or choose 3/5/10/15/30 seconds. Hover and open menus pause it; the mouse wheel and menu navigate manually. **Right-click NiuNiu's taskbar area for its menu, or double-click to restore Full mode.** Set taskbar width, horizontal offset and font separately. Integration depends on Windows taskbar internals and may be affected by OS updates.

Closing offers **Hide to tray / Quit / Cancel**. The tray menu switches modes; Windows controls whether the notification icon is tucked into its overflow area.

## 3. DIY groups, rows and module widths

A group has an editable **title and one or more rows**. Add/remove rows, reorder groups, drag cards into rows or assign them using selectors, and hide modules. Deleting a group removes its title/rows and relocates modules to a remaining group without deleting monitoring data.

For example, place four drives together under one Drives heading, or create four rows with one drive each. Cards use **1–4 column spans** or automatic width. Wider cards wrap inside their assigned row without repeating the group heading. “Group by hardware type” restores Processor, Graphics, Memory, Drives, Volumes and Network groups.

![DIY group and row editor](docs/images/layout-en.png)

## 4. Sampling, fields and charts

The **⋯** on each card opens its settings. Select Full, Compact or Taskbar to edit that mode's content independently. Fields and curves are separate per mode; module sampling and width are shared.

- Sampling intervals: 1/2/3/5/10/15/30/60 seconds, controlling actual acquisition.
- Select utilization, capacity, temperature, clock/power/rate summaries, update time and individual available sensors. Network settings also offer location, public IP, ASN and provider.
- Enable the trend area and select its individual curves: usage, temperature and available clocks, power, capacity and transfer rates.
- Each chart has a metric name, labeled value axis/units and real sample timestamps. Utilization uses 0–100%; different units are plotted separately. Each module retains 60 real samples, leaving gaps where readings are missing.
- Configure process sampling and public-IP refresh independently under General settings.

![Chart axes with sample data](docs/images/charts-demo.png)

## 5. Network information

NiuNiu calls Ping0's official API for the current system egress IPv4/IPv6, location, ASN and provider. It also offers adapter details, a connection overview and ICMP latency to a configurable target. IPv6 lookup failures are reported independently from IPv4 and local traffic.

Advanced fields include risk score, native-IP and hosting attributes. They require your own Ping0 key and an explicit Advanced API setting. Unconfigured values are not guessed. The advanced integration has not been verified with a real user API key. Windows stores the key encrypted for the current user.

**Adapter rates are sampled in seconds; public information refreshes in minutes.** The default is a public lookup at startup and every 10 minutes. Select 1/5/10/30/60 minutes, disable automatic lookup, or refresh manually with a cooldown. Carousels and scrolling do not trigger extra public lookups.

Public results describe the current system route/proxy egress, not a distinct exit per adapter. A browser-only proxy or VPN client's node label may differ.

## 6. Appearance and languages

Light/dark themes and full palettes include sea blue, warm cream, mint, violet, rose and midnight blue. Generate a palette from a chosen color, then tune window/card backgrounds, text and accents individually. Full and Compact share colors; Taskbar follows Windows.

Fonts, sizes, alignment and content are configurable per mode. Form labels, input widths and padding follow consistent rules. Preview and reset options are available; Cancel discards changes.

Choose **Settings → General → Language → Save settings** to switch immediately. App-owned buttons, menus, fields, chart labels and status messages are translated. Process/hardware names, file paths, user-written titles and external location/provider names retain their original text.

## 7. Installation, upgrades and limitations

The Windows x64 EXE bundles the .NET runtime and supports custom installation/data folders. Data defaults to `Data` under the chosen installation directory. First-time migration from the older portable release copies settings and the encrypted key, preserves originals and never overwrites destination settings. Uninstall keeps personal data. Quit the previous version before updating.

Setup runs as an ordinary user; the monitor requests administrator privileges for hardware sensors and ETW network counters. Supported CPU/drive temperatures may require the separate [official signed PawnIO driver](https://pawnio.eu/). Setup offers an initially unchecked download-page option and never silently installs the driver.

The release is unsigned: Windows can show unknown-publisher or reputation warnings. NiuNiu does not install antivirus exclusions, disable memory integrity/security protection or configure automatic startup. Signing a future release will not by itself guarantee immediate SmartScreen reputation.

Mac archives target macOS 13+ on Apple Silicon or Intel. Move the whole `.app` to your preferred directory. The first launch offers a data-folder choice, defaulting to `~/Library/Application Support/NiuNiu/Data`. **There is no Mac hardware validation or signing/notarization yet. Temperatures, fans, measured power, per-process GPU/network metrics, inline menu-bar text and some DIY interactions are incomplete.** Read the [Mac preview scope](platforms/macos/README.en.md).

## 8. Metric definitions and privacy

- B/KB/MB/GB/TB use decimal steps of 1000. Binary sensor units are converted before display.
- CPU is normalized to the whole machine. Per-process GPU uses its busiest engine and may differ from Task Manager. Process memory is working set.
- Adapter utilization is the greater of upload/download relative to nominal link speed, not your internet plan's percentage.
- I/O includes file, network and device activity. Process network counters use ETW TCP/UDP IPv4/IPv6 events, including local traffic. Proxy forwarding may be attributed to the proxy; totals should not simply be summed. Only byte counters and process identity are collected, not payload content.
- Energy impact is a CPU 60% / GPU 35% / I/O 5% estimate mapped to levels. It is neither measured watts nor Windows' proprietary algorithm. Hardware sensor readings in W are device-reported power.
- Sampling, unsupported data, missing permissions and incomplete events are explicitly distinguished from valid zero activity.
- Monitoring and settings remain local apart from enabled public-IP/latency requests. Ping0 sees the request's public egress; automatic queries can be disabled.

[Validation scope](docs/VALIDATION.md) · [Chinese changelog](CHANGELOG.zh-CN.md) · [Third-party notices](THIRD-PARTY-NOTICES.md)



---

**许可 / License:** 本版本免费用于个人及组织内部使用，牛牛核心源码不公开；未经另行许可不得修改、再分发或售卖原创部分。 / This version is free for personal and internal organizational use. Core source remains private; modifying, redistributing or reselling original components requires separate permission. [完整条款 / Full terms](LICENSE)
