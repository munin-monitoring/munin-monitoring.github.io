---
layout: markdown-page
title:  "Documentation"
permalink: /documentation/
---

* TOC
{:toc .pull-right}

Here are some important and/or interesting links to the [Munin Guide](http://guide.munin-monitoring.org/) or to external
resources. Don't hesitate to contribute to this guide ; if you do, please read [Reference/Nomenclature](https://munin.readthedocs.org/en/latest/reference/nomenclature.html)
and [Preface/Conventions](https://munin.readthedocs.org/en/latest/preface/conventions.html) first.

## Available documentation
[Steve Schnepp](/community/#steve-schnepp-developer-project-admin) held a short lecture about Munin at
[​DebConf13](http://debconf13.debconf.org/). Discover some hints about how to scale with 2.0, and the 2.2 roadmap in the
[​slides](http://snide.free.fr/munin/dc13/).

### Distribution and Installation
- [Installation on various flavours of Linux](http://munin-monitoring.org/wiki/MuninInstallationLinux)
- [Installation on MacOS X](http://munin-monitoring.org/wiki/MuninInstallationDarwin)
- [Installation of a munin node on Solaris](http://munin-monitoring.org/wiki/MuninInstallationSolaris)
- [How to enable TLS in Munin](http://munin-monitoring.org/wiki/MuninConfigurationNetworkTLS)
- [FAQ](http://munin-monitoring.org/wiki/faq)

#### Other Munin Distributions
- [Monitor Windows](http://munin-monitoring.org/wiki/HowToMonitorWindows)
- [Munin Drupal-Module](https://drupal.org/project/munin)

### Configuration
- [Configuration of Munin master](http://munin-monitoring.org/wiki/munin.conf)
- [Configuration of Munin node](http://munin-monitoring.org/wiki/munin-node.conf)
- [​Configuration of Munin node plugins](https://munin.readthedocs.org/en/latest/plugin/use.html#configuring")
- [munin-node-configure](http://munin-monitoring.org/wiki/munin-node-configure) and munin-node-configure --snmp
- [MuninConfigurationNetworkIPv6](http://munin-monitoring.org/wiki/MuninConfigurationNetworkIPv6) support status and configuration

#### Sending Alerts
- [Sending alerts from Munin](http://munin-monitoring.org/wiki/HowToContact) - alerts can be sent by e-mail or to other software, such as Nagios for example.
- [Contact Nagios via NSCA](http://munin-monitoring.org/wiki/HowToContactNagios)

#### Templates
- [Customizing Munin HTML pages](http://munin-monitoring.org/wiki/Munin_additional_templates)
- [Munin can make graphs just in time (CGI-graphing)](http://munin-monitoring.org/wiki/MuninConfigurationMasterCGI)
- [Notes on Munin page templates](http://munin-monitoring.org/wiki/MuninTemplates)

### Plugins
[Read on Munin Guide](http://munin-monitoring.org/wiki/plugins)

### Programs & Files

| Node   | Program       | [munin-node](http://munin-monitoring.org/wiki/munin-node), [munin-node-configure](http://munin-monitoring.org/wiki/munin-node-configure), [munin-run](http://munin-monitoring.org/wiki/munin-run) |
|        | Configuration | [munin-node.conf](http://munin-monitoring.org/wiki/munin-node.conf), [plugin-conf.d](http://munin-monitoring.org/wiki/plugin-conf.d) |
| Master | Program       | [munin-cron](http://munin-monitoring.org/wiki/munin-cron), [munin-update](http://munin-monitoring.org/wiki/munin-update), [munin-limits](http://munin-monitoring.org/wiki/munin-limits), [munin-graph](http://munin-monitoring.org/wiki/munin-graph), munin-html? |
|        | Configuration | [munin.conf](http://munin-monitoring.org/wiki/munin.conf) |

### Other
- [Notes on the Munin palette](http://munin-monitoring.org/wiki/MuninPalette)
- [Version numbers in Munin](http://munin-monitoring.org/wiki/MuninVersioning) (based on a mailing list post)
- [How to monitor Munin nodes on unreachable hosts](http://munin-monitoring.org/wiki/BouncingMunin)
- [Collected SNMP documentation index](http://munin-monitoring.org/wiki/SNMP)
- [Munin man page](http://munin-monitoring.org/wiki/munin-man)
- [Network protocol](http://munin-monitoring.org/wiki/network-protocol)
- Config files
- [Debugging Munin](http://munin-monitoring.org/wiki/Debugging_Munin) - a quick checklist when Munin does not seem to work.
- SNMP-plugin user guide
    - [HOWTO Monitor Windows](http://munin-monitoring.org/wiki/HowToMonitorWindows)
    - *[Advanced SNMP Monitoring with RRDTool](http://www.samag.com/documents/s=9368/sam0311h/0311h.htm)* - a Sys Admin
    Magazine article about how to monitor more things with Unix' snmpd - if you don't want to install munin-node on a host.
    Not that we have SNMP plugins for this - yet ;-)
- [HowTo run munin-node on OpenWRT](http://munin-monitoring.org/wiki/HowToOpenWRT)

## Needed Documentation
The following items aren't documented yet:

- SNMP-plugin user guide
    - [Writin SNMP plugins](http://munin-monitoring.org/wiki/Writing_SNMP-plugins)
    - Munin for MRTG users
- Catalog of included plugins
- Catalog of contributed plugins with download buttons
- HowTo make packages: How to build packages for RPM systems, Debian, AIX, Solaris, etc...

## Books

### General
![Munin - Graphisches Netzwerk- und System-Monitoring](/assets/img/documentation/munin-graphisches-netzwerk-und-system-monitoring.jpg){: .pull-right}
**Gabriele Pohl** and **Michael Renner** have published an entire, thoroughly written book on Munin in German: 
[Munin - Graphisches Netzwerk- und System-Monitoring](http://www.amazon.de/Munin-Graphisches-System-Monitoring-Gabriele-Pohl/dp/3937514481)
(ISBN 978-3-937514-48-2), published by [​Open Source Press](https://www.opensourcepress.de/) in cooperation with Linpro.

The ​TOC, in conjunction with Nikolai's and Jimmy's foreword, is available in ​PDF format, as is a ​sample chapter on the
configuration of the Munin master which covers, among others

- The configuration of contacts,
- Virtual hosts and plugins,
- How to write your own colour palette,
- How to generate Munin graphs using a CGI,
- How to protect your graphs using password.

### Focused Guides
![​Instant Munin Plugin Starter](/assets/img/documentation/instant-munin-plugin-starter.jpg){: .pull-right}
Bart ten Brinke has written a starter book dedicated mostly to plugin writing :
[​Instant Munin Plugin Starter](https://www.packtpub.com/networking-and-servers/instant-munin-plugin-starter-instant)
(ISBN 9781849696746), published by ​[Packt Publishing](https://www.packtpub.com/).

The book covers :

- Configure a Munin master
- Set up a Munin node
- Install plugins
- Monitoring hardware
- Setting up the Munin master webserver
- Writing a plugin in Bash and Perl
- Finding plugins to monitor specifics in your network

## Third Party Articles / Documents
- [Installing a munin node on Solaris 10 x86 the right way](http://bulldogdata.com/installing-a-munin-node-on-solaris-10-x86-the-right-way)
- [Linux Journal: Munin—the Raven Reports](http://www.linuxjournal.com/article/10248)
- [How to monitor Bind with Munin](http://blog.larsstrand.no/2008/02/how-to-monitor-bind-with-munin.html)
- [Today's Munin tip: Splitting out a noisy graph from munin](http://ingvar.blog.linpro.no/2008/04/07/todays-munin-tip-splitting-out-a-noisy-graph-from-munin/)
- [Today's Munin tip: Reading the future](http://ingvar.blog.linpro.no/2008/11/13/todays-munin-tip-reading-the-future/) - How to perform prediction based on Munin data
- [Munin](http://waste.mandragor.org/munin_tutorial/munin.html) - An in-depth tutorial about Munin: basic setup, alerting, templates, virtual nodes, usage with nagios, creating your own plugins...
- [How-To: Monitoring a Server with Munin](http://www.debuntu.org/how-to-monitoring-a-server-with-munin) - with some Apache2 configuration thrown in.
- [Step by Step Guide to install and configure Munin Monitoring system](http://www.debianhelp.co.uk/munin.htm)
- [Monitoring Your Ubuntu Servers and Clients with Munin Simple installation Guide](http://www.debianadmin.com/monitor-servers-and-clients-using-munin-in-ubuntu.html)
- [Debian Administration: Monitoring systems with munin](http://www.debian-administration.org/articles/229)
- [Howto simple setup Munin on Debian Sarge/Etch](http://helmschrott.de/blog/server-statistik-unter-debian-mit-munin/) - with 1 Server + 1 Client (German)
- [Servermonitoring with Munin](http://nitek.bloggt.es/2008/04/09/servermonitoring-mit-munin/) (German)
- [HowtoForge article, installation on Debian Sarge](http://howtoforge.com/server_monitoring_monit_munin)
- [How to Install and Setup Munin on SLES 10](http://www.novell.com/coolsolutions/feature/17913.html)
- [Security Enhanced Linux (SELinux) Reference Policy for Munin](http://oss.tresys.com/docs/refpolicy/api/services_munin.html)
- [SELinux policy for Munin](http://www.nsa.gov/selinux/list-archive/0509/12676.cfm)
- [A japanese article about installing Munin](http://gigazine.net/index.php?/news/comments/20060904_munin/)
- [A short diary like entry recommending Munin for monitoring](http://www.hackitlinux.com/50226711/monitoring_servers_using_munin.php)
- [A helpful article about setting up the MySQL and Apache plugins](http://www.felinae.co.uk/blog/blog4.php/munin/)
- [A short howto on removing spikes (metric counter wraps) from the RRD data file](http://munin-monitoring.org/wiki/SpikeRemoval)
- [Server Monitoring with munin And monit On Mandriva 2008.0](http://www.howtoforge.com/server-monitoring-with-munin-monit-mandriva2008.0)
- [Munin addon for IPCop](http://www.ban-solms.de/t/IPCop-munin.html)
- [Tuning RRD](http://oss.oetiker.ch/rrdtool-trac/wiki/TuningRRD) - tuning notes to make RRD go faster - this is for anyone that has Munin performance problems.
- [Linux Magazine: Monitoring with Munin](http://www.linux-mag.com/id/6292/)
- [Linux Magazine: Creating a custom Munin plugin](http://www.linux-magazine.com/Issues/2009/104/Building-a-Munin-Plugin)
- [How to configure MySQL plugins in RHEL/CentOS](http://www.mbrando.com/2007/08/06/how-to-get-your-mysql-munin-graphs-working/)
- [Improved Munin Graphs for MySQL](http://oierud.net/bliki/ImprovedMuninGraphsForMySQL.html)
- [making munin-graph take advantage of multiple cpus/cores](http://blog.apokalyptik.com/2009/01/23/making-munin-graph-take-advantage-of-multiple-cpuscores/)
- [Graphing Linux Disk I/O statistics with Munin](http://blogs.amd.co.at/robe/2008/12/graphing-linux-disk-io-statistics-with-munin.html)
- [PyMunin - Multigraph Munin Plugins in Python](http://aouyar.github.com/PyMunin/) - Python Module for developing Munin Multigraph Monitoring Plugins. Multigraph Plugins for Apache Web Server, Apache Tomcat, APC PHP Cache, PHP FPM (Fast Process Manager), Asterisk, Lighttpd, FreeSWITCH, Memcached, MySQL Database, Nginx, NTP, PostgreSQL Database, CPU Utilization, Memory Utilization, Disk Usage, Disk I/O, Network Interfaces, Processes and Threads, etc.

Wrote an article that could be listed here? [Join us on IRC](/community/#internet-relay-chat) to tell us about it!
