---
layout: markdown-page
title:  "HOWTO Monitor Windows"
permalink: /wiki/HowToMonitorWindows
---

There is a munin-node for Windows called "munin-node-win32" and another project called "munin-nude-win32" (nude... funny...).

Alternatively, here are two other ways to monitor Windows. One uses SNMP, the other an agent specific to Munin.

## Using munin-node-win32

This can get you more info than SNMP will supply (namely system temperatures). You can get it here, <https://github.com/munin-monitoring/munin-node-win32> it works the same as the native munin-node program.

Just run the munin-node-win32 program on each Windows system and on the monitoring server add each Windows box as if it was a Linux box.

You may need to place msvcr71.dll and msvcp71.dll (part of the Microsoft C++ runtime) in the same directory as munin-node.exe to get it to run (it depends if they're already in the system library path). If you do need them, search your system, as another application has probably already installed them elsewhere (and you can just copy them over). Otherwise, a quick google should get you a site offering them for download.

If you are using plugins written in Python (or any other language), and you want them to interact with a UNIX Munin server, you need to take care of the way newlines are written to **stdout**. By default, Windows will automatically convert any '\n' character into '\r\n', and Munin doesn't seem to like it. To solve this issue, you need to write in binary mode. For Python, add the following lines (taken from <http://code.activestate.com/recipes/65443/>):

```
import sys

if sys.platform == "win32":
    import os, msvcrt
    msvcrt.setmode(sys.stdout.fileno(), os.O_BINARY)

sys.stdout.write("some text\n")
```

Fred Chu forked the munin node win32 client, fixed some bug and added some functions. Last relase in April 2010 (<http://code.google.com/p/munin-nude-win32/>)

## Using SNMAgent

SNMAgent is a native Win32 NT service that combines Nagios and Munin nodes. SNMAgent can monitor all statistics from Windows Perf Monitor as well as disk usage etc. See
plugin-SNMAgent for more information.

## Using SNMP

The below is a contributed text that's Debian Linux specific, but it should be easy to see how it applies to other Linuxes and Unixes.

Suppose, your shiny Debian Sarge linux server, which runs munin (i.e., /usr/bin/munin-cron from cron), is called vesta.astrohk.cz and your WinXP node (the so called SNMP agent), you would like to monitor, is library.astrohk.cz.

At first, we have to configure the **client part** in Windows XP SP2 (both Home and Professional probably work, I tested the former):

* Install SNMP service:

Start, Control Panel, Add or Remove Programs, Add/Remove Windows Components, Management and Monitoring Tools, Details, Simple Network Management Protocol, OK, Next, insert CD or supply a directory with WinXP installation files.

* Configure SNMP service:

Start, Control Panel, Administrative Tools, Services, look for SNMP Service in the list, Properties, Security, Send authentication trap, Accept SNMP packets from any host (or specify vesta host here), Apply.

* Configure Firewall (SNMP uses port no. 161 and UDP packets):

Start, Control Panel, Firewall, Port, write SNMP and 161, click UDP and OK.

You can also consult these two URLs, regarding SNMP:

<http://manageengine.adventnet.com/products/opmanager/help/user_guide/snmp_installation/install_snmp_win.html>
<http://manageengine.adventnet.com/products/opmanager/help/user_guide/snmp_installation/conf_snmp_agents.html>

Notice we need no "munin-node" running on the WinXP side.

Second, lets configure the **server part** - open /etc/munin/munin.conf and add the following two lines:

```
# this is a SNMP monitored WinXP box... (the SNMP queries are running from vesta)
[library.astrohk.cz]
    address vesta.astrohk.cz
```

This is necessary, because snmp\_\* plugins change the host\_name (at the time of munin-run snmp\_\* config), and the vesta server has to create additional plots && HTMLs for the library node.

Symlink required munin plugins (and supply the hostname in the link name):

```
cd /etc/munin
ln -s /usr/share/munin/plugins/snmp__df /etc/munin/plugins/snmp_library.astrohk.cz_df
ln -s /usr/share/munin/plugins/snmp__if_ /etc/munin/plugins/snmp_library.astrohk.cz_if_2
ln -s /usr/share/munin/plugins/snmp__if_err_ /etc/munin/plugins/snmp_library.astrohk.cz_if_err_2
ln -s /usr/share/munin/plugins/snmp__processes /etc/munin/plugins/snmp_library.astrohk.cz_processes
ln -s /usr/share/munin/plugins/snmp__users /etc/munin/plugins/snmp_library.astrohk.cz_users
```

You can run "munin-node-configure-snmp library" or "munin-node-configure-snmp --debug library" to discover, which plugins will probably work and what are your network interface identifiers ("2" in our case). (Note the missing domain ".astrohk.cz" in the last two commands.)

Remember to restart munin-node on your server.

The are many available things to monitor, you can sniff them using "mbrowse" (perform apt-get install mbrowse, in case it is not yet installed). Simply supply "Host Name" library.astrohk.cz in the dialog box and click "Walk". There is a lot of identifiers (the so called MIBs - Management Information Base), which correspond to services/options/etc on the Windows XP node. Some of them do not have a symbolic identifier, only a numeric one, but you can probably guess, what they stand for, or download some MIB's from <http://www.snmplink.org/MIBs.html> .
