# NiuNiu 1.5.0 for Windows

Run `NiuNiu-1.5.0-Windows-x64-Setup.exe`. Choose English or Simplified Chinese, then the installation folder and data folder. The installer includes the .NET desktop runtime and works offline.

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

