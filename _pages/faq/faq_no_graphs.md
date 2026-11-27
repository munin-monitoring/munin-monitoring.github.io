---
layout: markdown-page
title:  "FAQ: No Graphs"
permalink: /faq/no_graphs
redirect_from:
- /wiki/FAQ_no_graphs
---

These FAQs have a separate page to make it easy to put links in error messages in Munin.

See also [Debugging\_Munin](https://guide.munin-monitoring.org/en/latest/tutorial/troubleshooting.html)

# On one host there are no graphs at all!

This could be due to a number of problems.

## No plugins installed on the munin node

Plugins that munin-node uses are usually to be found in /etc/munin/plugins (or /etc/opt/munin/plugins). If the directory is empty you will need to fill it. The directory **should** have been filled by the package installation script or by you when you read the INSTALL instructions.

You can fill it manually by symlinking to files in /usr/share/munin/plugins (or /opt/munin/lib/plugins). Or automatically by running `munin-node-configure --shell | sh -x`.  This will which plugins it thinks are suitable on your system and make the symlinks.

After making all the symlinks restart munin-node.

Then wait 5 to 10 minutes before re-loading the munin web pages to see graphs.

## Did you restart munin-node?

Restarting munin-node is a rather heavy operation requiring running all the plugins as part of the startup. Therefore munin-node does not restart itself when the contents of the plugin directory changes. So after making a change in the plugin directory you need to restart munin-node.

There is a bug in a good number of versions of the Debian (and Ubuntu) munin package that did not restart munin-node after running munin-node-configure. A manual restart is needed in this case.

Then wait 5 to 10 minutes before re-loading the munin web pages to see graphs.

## Inconsistent names for the node on the master and on the node

If your node has plugins and is restarted the next possibility is: it is likely because the server and the node have inconsistent name information for the node. Munin wants the host names to match between its configuration and what the munin-node calls itself.

If you telnet to the node you'll be told the node name:

```
$ telnet lorbanery 4949
Trying 10.1.0.2
Connected to lorbanery.
Escape character is '^]'.
# munin node at lorbanery.langfeldt.net
quit
Connection closed by foreign host.
```

This means that this machine knows itself to be named *lorbanery.langfeldt.net*. If the name shown is not what you
expected, you need to configure the correct name in [munin-node.conf](https://guide.munin-monitoring.org/en/latest/reference/munin-node.conf.html):

```
host_name lorbanery.langfeldt.net
```

On the master you configure lorbanery like this:

```
[lorbanery.langfeldt.net]
	address 10.1.0.2
```

This makes the names identical. If you had put *lorbanery* in the square brackets the result would be no graphs because munin expects the whole name to be the same, and the whole name isn't *lorbanery*.

Restart munin-node, then wait 5 to 10 minutes before re-loading the munin web pages to see graphs.

## I just read the above answer and there still aren't any graphs

Then it's time to get more advanced. Consider the following protocol exchange for *lorbanery* aka *lorbanery.langfeldt.net*. You should of course use the host name of your host, as configured in the *munin.conf* file. Please make very sure that you use the whole and exactly the same filename as configured in *munin.conf*.

```
$ > telnet lorbanery.langfeldt.net 4949
Trying 10.1.0.2...
Connected to lorbanery.langfeldt.net.
Escape character is '^]'.
# munin node at lorbanery.langfeldt.net
> nodes
lorbanery.langfeldt.net
wifi.langfeldt.net
.
> list lorbanery.langfeldt.net
open_inodes http_loadtime irqstats apache_accesses df swap uptime load ntp_offset cpu df_inode open_files ntp_kernel_err forks iostat memory vmstat apache_processes entropy ntp_kernel_pll_freq postfix_mailqueue processes apache_volume users interrupts netstat iostat_ios if_err_eth1 if_eth1 postfix_mailvolume proc_pri surfboard threads ntp_kernel_pll_off
> fetch df
_dev_hda1.value 66
tmpfs.value 0
udev.value 1
tmpfs.value 1
.
> quit
Connection closed by foreign host.
```

The user input is marked with ">"s.

This is the actual exchange used with munin-nodes that understands the *nodes* command. The *nodes* command asks the munin-node? which hosts it has information for, then asks it to list the plugins that represent *lorbanery.langfeldt.net*. Lastly it fetches the *df* results from *lorbanery.langfeldt.net*.

If the output of the *list* command with the host name behind is empty, there are no plugins installed for that host. And that's the reason there are no graphs.

If there are plugins listed by the *list* command then you have some other problem. Please contact the users mailing-list.

## Node does not "allow" master to telnet

You have not added allow <master IP address> to node's munin-node.conf file. See [munin-node.conf](https://guide.munin-monitoring.org/en/latest/reference/munin-node.conf.html). Ensure you use the reg ex syntax as prescribed there.

## listed no services for localhost on Debian

when your run

```
# su - munin --shell=/bin/bash
$ /usr/share/munin/munin-update --nofork --debug

2011/03/12 12:57:33 [DEBUG] Creating new lock file /var/run/munin/munin-update.lock
2011/03/12 12:57:33 [DEBUG] Creating lock : /var/run/munin/munin-update.lock succeeded
2011/03/12 12:57:33 [INFO]: Starting munin-update
2011/03/12 12:57:33 [DEBUG] Creating new lock file /var/run/munin/munin-localdomain-localhost.localdomain.lock
2011/03/12 12:57:33 [DEBUG] Creating lock : /var/run/munin/munin-localdomain-localhost.localdomain.lock succeeded
2011/03/12 12:57:33 [DEBUG] Reading from socket to localhost.localdomain: "# munin node at G406".
2011/03/12 12:57:33 TLS set to "disabled".
2011/03/12 12:57:33 [DEBUG] Negotiating capabilities
2011/03/12 12:57:33 [DEBUG] Writing to socket: "cap multigraph
".
2011/03/12 12:57:33 [DEBUG] Reading from socket to localhost.localdomain: "cap multigraph dirtyconfig".
2011/03/12 12:57:33 [DEBUG] Node says /cap multigraph dirtyconfig/
2011/03/12 12:57:33 [DEBUG] Writing to socket: "list G406
".
2011/03/12 12:57:33 [DEBUG] Reading from socket to localhost.localdomain: "".
2011/03/12 12:57:33 [WARNING] Config node localhost.localdomain listed no services for G406.  Please see http://munin-monitoring.org/wiki/FAQ_no_graphs for further information.
2011/03/12 12:57:33 [DEBUG] Creating new lock file /var/run/munin/munin-datafile.lock
2011/03/12 12:57:33 [DEBUG] Creating lock : /var/run/munin/munin-datafile.lock succeeded
2011/03/12 12:57:33 [INFO]: Munin-update finished (0.01 sec)
[WARNING] Config node localhost.localdomain listed no services for G406.  Please see http://munin-monitoring.org/wiki/FAQ_no_graphs for further information.
```

check */etc/hosts*

Original file:

```
127.0.0.1 localhost
127.0.1.1 G406
# The following lines are desirable for IPv6 capable hosts
::1 localhost ip6-localhost ip6-loopback
fe00::0 ip6-localnet
ff00::0 ip6-mcastprefix
ff02::1 ip6-allnodes
ff02::2 ip6-allrouters
ff02::3 ip6-allhosts
```

changed to:

```
127.0.0.1       localhost.localdomain   localhost G406
#127.0.1.1 G406
# The following lines are desirable for IPv6 capable hosts
#::1 localhost ip6-localhost ip6-loopback
#fe00::0 ip6-localnet
#ff00::0 ip6-mcastprefix
#ff02::1 ip6-allnodes
#ff02::2 ip6-allrouters
#ff02::3 ip6-allhosts
```

reboot and run:

```
# su - munin --shell=/bin/bash
$ /usr/share/munin/munin-update --nofork --debug

2011/03/13 16:06:05 [DEBUG] Updating /var/lib/munin/G406/G406-vmstat-sleep-g.rrd with N:0
2011/03/13 16:06:05 [DEBUG] Creating new lock file /tmp/munin-datafile.lock
2011/03/13 16:06:05 [DEBUG] Creating lock : /tmp/munin-datafile.lock succeeded
2011/03/13 16:06:05 [INFO]: Munin-update finished (32.80 sec)
```

See also [Troubleshooting](https://guide.munin-monitoring.org/en/latest/tutorial/troubleshooting.html)
