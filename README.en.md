# NiuNiu 1.5.6 · User guide

[Download for Windows](https://github.com/Tagraysl/NiuNiu-Downloads/releases/latest) · [Interactive website](https://tagraysl.github.io/NiuNiu-Downloads/) · [中文](README.zh-CN.md)

Monitor hardware readings and process activity in a full dashboard, compact panel or Windows taskbar widget.

## Hardware readings

| Module | Readings |
|---|---|
| CPU / GPU | Utilization, processor count or video memory, and available temperature, clock and power sensors |
| Memory | Usage, used/total/available memory, commit limit and temperature when supplied by the collector |
| Physical drives | Activity, read/write speed, associated volumes and available temperature |
| Volumes | Space usage, used/total/free capacity and file system |
| Motherboard | Board information and sensors supplied by the collector |
| Network | Adapter link utilization/speed, upload/download rates and transferred bytes; public IP, region, ASN, provider and latency |

Fields match each module type. Volumes and network modules do not inherit temperature fields. Unavailable readings are not reported as zero.

## Full dashboard

Arrange cards side by side or create custom groups and rows. Assign modules, reorder groups, hide modules and choose automatic or 1–4-slot widths.

Open a module's **⋯** menu to select and reorder **Module parameters**, or restore recommended choices. Three parameters are recommended initially; explicit existing selections are retained. Parameters use the actual available width and font size to form columns, always above charts. Chart starts align within each actual row; separate rows determine their height independently.

Long titles and values scroll only when they overflow and pause on hover. **Module charts** has a separate visibility switch and individual chart choices. Hiding charts retains the choices. Charts include names, units and a time axis, with different units drawn separately and up to 60 samples per module. Missing samples create gaps.

## Compact panel and taskbar

The resizable compact panel supports dragging, optional always-on-top, hardware/process views, automatic scrolling and carousel layouts. Scrolling stays still when everything fits. Hovering or opening a menu pauses automatic movement.

The taskbar widget displays text in the Windows taskbar with system colors. Drag horizontally in 8-logical-pixel steps, use the wheel to change groups, double-click to open the full window, or right-click for its menu. Click outside or press Esc to dismiss the menu. Group rotation, width, font and position are configurable.

Display choices are saved separately per mode. Module sampling intervals and widths are shared. Full and compact window dragging excludes interactive controls.

## Find busy processes

Identify processes by icon, name and PID. Search by name/PID; sort by name, CPU, GPU, memory, I/O, network traffic or estimated energy impact in either direction.

Each row represents a process, so one application can appear several times. **Open** targets that process's window or executable rather than searching for a different main process. **Close** ends the selected process, not its entire tree, and can lose unsaved work. Critical system processes and NiuNiu itself are protected.

Energy impact has five levels: very low, low, medium, high and very high. It is an estimate from resource activity, not measured watts.

## Appearance, sampling and alerts

Choose light/dark themes, preset palettes or custom background, card, text and accent colors. Full and compact modes share colors; mode-specific fonts, sizes and content are configurable. Chinese and English are available in General settings.

Hardware usage colors progress from green through blue to red in 10% bands. Temperature limits are shared across modes: CPU 85°C, GPU core 80°C and drives 60°C by default. Values turn red at the limit and return to normal 2°C below it. Limits are editable per module.

Optional Windows temperature notifications are off by default. General settings includes a test notification. Alerts occur once per overheating episode, at least five minutes apart per device; Windows notification and Do Not Disturb settings apply.

Module sampling intervals range from 1 to 60 seconds. Process sampling and public-IP information refresh have separate settings.

## Network information

Local adapter traffic is collected independently. Public IP, region, ASN and provider information comes from Ping0, by default at startup and every ten minutes. Change the interval, disable automatic lookup or refresh manually. Carousel changes do not trigger extra queries.

Advanced Ping0 information requires your own API key, encrypted for the current Windows user. Results describe the system's outbound route and may differ from a browser-specific proxy or VPN display name. Latency checks use ICMP with a configurable target.

## Install and update

Windows 10/11 x64; the installer includes the .NET runtime. Choose installation and data folders. Reuse them when upgrading to preserve settings; uninstalling keeps personal data. Monitoring requests administrator privileges. Some sensors require [PawnIO](https://pawnio.eu/); the installer does not install that driver automatically. The package currently has no publisher signature. This release is Windows-only.

Enable **Start with Windows** in General settings and save. The next sign-in restores the last display mode. The in-app updater checks official Windows releases on GitHub, downloads and verifies the installer, then runs it after confirmation. Optional automatic checks run at most once every six hours. Older versions without the updater need one manual upgrade.

## Definitions and data

- Capacity uses decimal units. CPU usage is normalized across logical processors.
- Process GPU usage uses the busiest engine; process memory is working set.
- Adapter utilization is relative to its advertised link speed, not your internet plan.
- Process I/O includes file, network and device I/O. ETW network accounting can attribute forwarded traffic to proxy processes; do not simply add all processes. Packet contents are not recorded.
- Settings and monitoring are handled locally. Enabled public-IP queries contact Ping0, latency checks contact the selected host, and update checks contact GitHub. Automatic queries/checks can be disabled.

Free for personal and internal organizational use under the [license](LICENSE). Core source is private. [Third-party notices](THIRD-PARTY-NOTICES.md) · [Validation](docs/VALIDATION.md) · [Changelog](CHANGELOG.zh-CN.md)
