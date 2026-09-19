# Third-party notices

These applications use unmodified NuGet libraries and bundled .NET 8 runtimes. Dependency source links and licenses are provided with the packages.

- LibreHardwareMonitorLib 0.9.6 — Mozilla Public License 2.0. Source and notices: https://github.com/LibreHardwareMonitor/LibreHardwareMonitor ; https://github.com/LibreHardwareMonitor/LibreHardwareMonitor/blob/master/LICENSE ; https://github.com/LibreHardwareMonitor/LibreHardwareMonitor/blob/master/THIRD-PARTY-LICENSES . The DLL is distributed separately and can be replaced/rebuilt from the upstream source under its license.
- System.Diagnostics.PerformanceCounter and Microsoft System.* runtime packages — MIT, https://github.com/dotnet/runtime/blob/main/LICENSE.TXT .
- Microsoft.Diagnostics.Tracing.TraceEvent 3.2.6 — MIT, https://github.com/microsoft/perfview ; https://github.com/microsoft/perfview/blob/main/LICENSE.TXT . Used for per-process TCP/UDP byte counts from Windows ETW.
- Microsoft.Diagnostics.NETCore.Client 0.2.510501 — MIT, https://github.com/dotnet/diagnostics/blob/main/LICENSE.TXT . Microsoft.Extensions.* dependencies — MIT, https://github.com/dotnet/runtime/blob/main/LICENSE.TXT .
- Additional transitive libraries are listed with exact versions in ShilinMonitor/packages.lock.json. Their NuGet packages carry the corresponding license and source metadata. These include DiskInfoToolkit, RAMSPDToolkit-NDD, HidSharp, and Mono.Posix.NETStandard.

Package license metadata, included notices and the new tracing library license are collected in the installed version's ThirdPartyLicenses directory. Exact dependency versions are included there in packages.lock.json.

- PawnIO 2.2.0 is installed separately as a signed system dependency, not incorporated into the application source. Official distribution: https://pawnio.eu/ ; source/license: https://github.com/namazso/PawnIO .
- Ping0 API documentation: https://ping0.cc/ip/api .

The macOS preview additionally uses Avalonia 12.1.2 and its native/rendering dependencies, MicroCom.Runtime and Tmds.DBus.Protocol. These use the MIT license. Their exact versions, source metadata, original license text and runtime notices are in the preview's `NiuNiu.app/Contents/Resources/ThirdPartyLicenses` folder. See https://github.com/AvaloniaUI/Avalonia , https://github.com/kekekeks/MicroCom and https://github.com/tmds/Tmds.DBus .

Windows and macOS distributions include Microsoft .NET 8 runtime license and third-party notices. Exact NuGet dependencies are recorded separately in `ShilinMonitor/packages.lock.json` and `NiuNiu.Mac/packages.lock.json`, with copies in the respective packaged notices folders.

The Windows installer is generated with Inno Setup (https://jrsoftware.org/isinfo.php); its copyright and redistribution license are supplied in the Windows package. The installer only links to the optional official PawnIO download; it does not redistribute or silently install the driver.

