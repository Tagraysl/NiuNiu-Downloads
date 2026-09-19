# NiuNiu 1.5.2 for Windows

- **Usage colors:** hardware percentages use ten 10% bands from green through blue to red in Full, Compact and Taskbar. Colors adapt to the theme for readability; missing readings stay neutral.
- **Temperature limits:** open a module's ⋯ settings. The threshold beside Temperature is shared by all modes. Defaults: CPU 85°C, GPU core 80°C, drives 60°C. Enter 20–120°C or Reset. Red at the threshold; normal again 2°C below it.
- **Optional Windows alerts:** Settings > General settings > Send Windows notifications for high temperatures. Off by default. Enable and Save settings; Send test notification lets you check delivery. Alerts use the primary hardware temperature even when its field or page is hidden. One alert per overheating episode, at least five minutes apart per device; simultaneous devices are grouped. Windows notification and Do Not Disturb settings apply.

Run `NiuNiu-1.5.2-Windows-x64-Setup.exe`. Choose English or Simplified Chinese, then the installation folder and data folder. The installer includes the .NET desktop runtime and works offline.

- **Start with Windows:** Settings > General settings > Start NiuNiu when I sign in to Windows > Save settings. This is off by default. Only saving changes the current user's logon task; Cancel leaves it unchanged. The last display mode is restored and no Windows password is stored. After moving a portable copy, turn this off and on again to update its path. Turn it off before uninstalling.
- **Alphabetical order:** select Name in Processes for A–Z. Use the direction button or App column header for Z–A. English letter case is ignored; identical names are ordered by PID. Search, Full and Compact modes remain available.
- **Readable initial columns:** the full window and column widths account for font size and translated headers. On small screens or after manually narrowing the window, scroll horizontally to reach remaining columns.

The default installation is in your user profile's Programs folder. Data defaults to `Data` inside the chosen installation folder. You can choose a separate data folder. Re-run Setup to move to another data location: NiuNiu copies the previous settings and encrypted Ping0 key on its next launch, preserving the originals and any settings already present in the destination. Uninstall removes program files and keeps personal data.

On the first upgrade from the older portable version, NiuNiu copies settings and the encrypted Ping0 key from `%LOCALAPPDATA%\ShilinMonitor` if the selected data folder has no settings yet. Existing layouts, palettes, sampling intervals and per-mode selections remain compatible.

Choose **Settings > General > Language**, then **Save settings**, to change the interface immediately. Full, Compact and Taskbar share the language. Settings, menus, chart captions, tooltips, missing-data messages and process actions are translated. App/hardware/adapter names, user-written group titles, file paths and external service data (including Ping0's geographic/provider names) retain their original text.

- **Hardware**: CPU, GPU, memory, physical drives, volumes, adapters, node details and selectable history charts. Supported sensors depend on the hardware, firmware, drivers and available permissions. Missing readings show unavailable.
- **Processes**: sortable CPU, GPU, memory, I/O, network traffic and estimated energy impact, plus Open/End controls. Energy impact is an estimate, not watts. Ending a process loses its unsaved work.
- **Compact**: adaptive view, continuous auto-scroll or carousel; hover pauses motion. Resize the window or configure its own content and process actions.
- **Taskbar**: transparent metrics in the actual Windows taskbar. Right-click NiuNiu's area to restore the full window or open its menu; double-click also restores. The menu and wheel navigate metric groups.
- Closing a window asks whether to hide to the notification area or quit the monitor completely.

Setup itself runs without administrator rights in a writable per-user location. The monitor still requests administrator rights to preserve privileged sensor and ETW process-network collection. Denying that request does not install a hidden privilege bypass.

**Temperature sensors on a new PC:** supported CPU and drive sensors may require the separately installed **PawnIO** driver. Setup offers an optional, initially unchecked link to [the official download page](https://pawnio.eu/). Choose the digitally signed Official edition; no driver is installed automatically or bundled here. The local Windows test machine already has PawnIO 2.2.0. Driver installation requires administrator permission; it does not make unsupported hardware expose a sensor. Basic monitoring can run without this driver, with unavailable sensor values left blank. The optional driver download requires internet access.

This release is **unsigned**. Windows may show SmartScreen, Smart App Control or an unknown-publisher prompt. A custom installer cannot promise to remove these checks. No Defender exclusions, system security changes, self-trusted certificates or misleading publisher claims are installed. A public trusted release needs a real publisher certificate or a supported Microsoft signing/distribution service. Signing also does not guarantee immediate SmartScreen reputation.

The SHA-256 manifest and third-party license notices are supplied with the release. The old portable version and its original configuration are retained separately in the project.
