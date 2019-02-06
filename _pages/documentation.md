---
layout: markdown-page
title:  "Documentation"
permalink: /documentation/
redirect_from:
  - /wiki/Documentation
---

* TOC
{:toc .pull-right}

On this page we only point to some important and/or interesting external resources. 

To learn about installing and using Munin -> Go to the [Munin Guide](http://guide.munin-monitoring.org/).
There we collect info and instruction about all the functionality that the current version of Munin officially supports.
We highly appreciate contributions from Munin users to this guide ; if you do, please read [Reference/Nomenclature](https://munin.readthedocs.org/en/latest/reference/nomenclature.html)
and [Preface/Conventions](https://munin.readthedocs.org/en/latest/preface/conventions.html) first.

## Lectures /Presentations
[Steve Schnepp](/community/#steve-schnepp-developer-project-admin) held a short lecture about Munin at
[​DebConf13](http://debconf13.debconf.org/). Discover some hints about how to scale with 2.0, and the 2.2 roadmap in the
[​slides](http://snide.free.fr/munin/dc13/).

## Books

### English
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

### German
![Munin - Graphisches Netzwerk- und System-Monitoring](/assets/img/documentation/munin-graphisches-netzwerk-und-system-monitoring.jpg){: .pull-right}
Gabriele Pohl and Michael Renner have published an entire, thoroughly written book on Munin in German:
[Munin - Graphisches Netzwerk- und System-Monitoring](http://www.amazon.de/Munin-Graphisches-System-Monitoring-Gabriele-Pohl/dp/3937514481)
(ISBN 978-3-937514-48-2), published by ​Open Source Press in cooperation with Linpro.

[The ​TOC, in conjunction with Nikolai’s and Jimmy’s foreword and the books index pages](http://www.blickinsbuch.de/item/f1911b3f696f957f0612d3bd0c0930a1) are available online.

## Third Party Articles / Documents

### Installation / Configuration

- [HowtoForge article, installation on Debian Jessie](https://www.howtoforge.com/tutorial/server-monitoring-with-munin-and-monit-on-debian/)
- [Server Monitoring with munin And monit On Mandriva 2010.0](https://www.howtoforge.com/server-monitoring-with-munin-and-monit-on-mandriva-2010.0)
- [Munin addon for IPCop](http://www.ban-solms.de/t/IPCop-munin.html)
- [Munin](http://waste.mandragor.org/munin_tutorial/munin.html) - An in-depth tutorial about Munin: basic setup, alerting, templates, virtual nodes, usage with nagios, creating your own plugins...
- [Today's Munin tip: Splitting out a noisy graph from munin](http://ingvar.blog.linpro.no/2008/04/07/todays-munin-tip-splitting-out-a-noisy-graph-from-munin/)
- [Security Enhanced Linux (SELinux) Reference Policy for Munin](http://oss.tresys.com/docs/refpolicy/api/services_munin.html)

### Plugins

- [PyMunin - Multigraph Munin Plugins in Python](http://aouyar.github.com/PyMunin/) - Python Module for developing Munin Multigraph Monitoring Plugins. Multigraph Plugins for Apache Web Server, Apache Tomcat, APC PHP Cache, PHP FPM (Fast Process Manager), Asterisk, Lighttpd, FreeSWITCH, Memcached, MySQL Database, Nginx, NTP, PostgreSQL Database, CPU Utilization, Memory Utilization, Disk Usage, Disk I/O, Network Interfaces, Processes and Threads, etc.
- [Improved Munin Graphs for MySQL](http://oierud.net/bliki/ImprovedMuninGraphsForMySQL.html)
- [Graphing Linux Disk I/O statistics with Munin](http://blogs.amd.co.at/robe/2008/12/graphing-linux-disk-io-statistics-with-munin.html)
- [Linux Journal: Munin—the Raven Reports](http://www.linuxjournal.com/article/10248) - The cool thing about the Munin long-term monitoring suite is that it's not restricted to supervising only typical system and network parameters. In her article Patricia shows how to monitor the departures at Munich Airport with a self-written plugin.
- [How to monitor Bind with Munin](http://blog.larsstrand.no/2008/02/how-to-monitor-bind-with-munin.html)
- [How to configure MySQL plugins in RHEL/CentOS](http://www.mbrando.com/2007/08/06/how-to-get-your-mysql-munin-graphs-working/)

### RRD

- [Tuning RRD](http://oss.oetiker.ch/rrdtool-trac/wiki/TuningRRD) - tuning notes to make RRD go faster - this is for anyone that has Munin performance problems.
- [Today's Munin tip: Reading the future](http://ingvar.blog.linpro.no/2008/11/13/todays-munin-tip-reading-the-future/) - How to perform prediction based on Munin data


Wrote an article that could be listed here? [Join us on IRC](/community/#internet-relay-chat) to tell us about it!
