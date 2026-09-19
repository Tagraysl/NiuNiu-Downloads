# NiuNiu for macOS — 0.1.0 preview

This is an unsigned, unnotarized preview. It was cross-compiled on Windows for Apple Silicon and Intel. Shared logic and the desktop renderer were tested on Windows. **It has not been launched or tested on a Mac and is not a feature-complete replacement for the Windows release.**

## Installation and data

1. Choose the `osx-arm64` archive for an Apple Silicon Mac or `osx-x64` for an Intel Mac. The current build targets macOS 13 or later.
2. Extract the archive and move `NiuNiu.app` to Applications, `~/Applications`, or another folder you choose. Keep the whole app bundle together.
3. On the first launch, choose a data folder. The default is `~/Library/Application Support/NiuNiu/Data`. Settings and the data-folder pointer live outside the signed app bundle. Choose a different folder in Settings later.
4. Quit before updating. Replace the app bundle, keeping the data folder. Removing the app does not delete settings.

macOS may block this preview because it is not Developer ID signed or notarized. No script here disables Gatekeeper or removes quarantine. A signed, notarized public release requires a developer account and testing on actual Macs. `sign-and-package.sh` is provided for that future release process, not as a claim that this archive is certified.

## Implemented but awaiting Mac verification

- Chinese/English interface; Full/Compact views; menu icon with restore/settings/close menu.
- CPU load from Mach tick deltas, active+wired+compressed memory, mounted volume space, physical disk identity and SMART status, adapter upload/download totals and rates.
- Process CPU normalized to the whole machine, resident memory, sorting, app-bundle opening and guarded process termination. Energy impact is an estimate, not watts.
- Per-module selections and sampling for CPU/memory/volumes/network, selectable curves, modular widths, editable groups/rows, compact auto-scroll/carousel, theme/font settings and a data-folder picker.
- Ping0 public IP details, ICMP latency and TCP connection listing where macOS exposes it. External names and Ping0 place/provider names may retain the source language.

## Known gaps

- Temperature, fan, actual power, per-process GPU and network rates, disk activity/read/write rates and dedicated GPU memory are not implemented in this preview. They show unavailable, not fabricated readings.
- GPU utilization is a best-effort IOAccelerator field only. Hardware identity and GPU discovery currently refresh every 30 seconds; they do not yet honor every individual module interval.
- Advanced Ping0 keys, the color wheel, drag-and-drop layout editing, moving compact windows from every blank area, and horizontal model-name scrolling still need porting.
- The menu icon provides metrics in its menu/tooltip. Inline menu-bar text, rotation and all Windows taskbar-specific interactions are not yet ported. macOS does not have the Windows taskbar.
- The compact layout is independently implemented and still needs resize, carousel seam, large-font and accessibility testing on both Mac architectures.

## Before a public release

Run CPU/RAM/disk/network comparisons with Activity Monitor, adapter/VPN and sleep/wake tests, process action tests on a temporary owned test app, window/tray restore tests, writable-folder/upgrade/uninstall tests and complete hardware temperature support on a real Intel Mac and Apple Silicon Mac. Then sign all native binaries and the app with Developer ID, notarize, staple and assess the downloaded artifact using normal Gatekeeper rules.

