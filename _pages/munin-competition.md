---
layout: markdown-page
title: 	"Competitors to Munin"
permalink: /munin-competition/
redirect_from:
  - /wiki/MuninCompetition
---

On this page, we list software or packages that may serve as alternatives to Munin. This is not to gather intelligence or
encourage industrial espionage, but to present pointers to other solutions if Munin was not quite what you had in mind.

- [​Other RRDtool front-ends](http://people.ee.ethz.ch/~oetiker/webtools/rrdtool/rrdworld/) - probably the most comprehensive list of this type of software.
- [Cacti](http://www.cacti.net/) - Great graph interface including zoom, great web gui with features like LDAP integration
	for authentication. Breaks easily if you start updating dependencies. Cacti may be able to graph Munin rrd files
	- A Howto would be nice. Can you help?
- [Orca](http://www.orcaware.com/orca/) - geared at parsing text files rather than SNMP
- [Ganglia](http://ganglia.sourceforge.net/) - Geared at clusters and grids
- [​NISCA](http://nisca.sourceforge.net/) - Network Interface Statistics Collection Agent - An MRTG replacement
- [MRTG](http://people.ee.ethz.ch/~oetiker/webtools/mrtg/) - The original.

If you were looking for the sort of enterprise-class monitoring system that notifies you of outages, rather than the sort
that keeps track of things over time and makes pretty graphs, here are some options. Note that most of these provide a
mechanism for tracking history of service checks, and may use RRDtool as a back-end for this.

- ​[Nagios](http://www.nagios.org/) - Long-standing heavyweight
- [Icinga](http://www.icinga.org/) - A fork of Nagios with more dependencies but a much prettier UI
- [Zabbix](http://www.zabbix.org/) - Full-featured, better web gui than Nagios, but a smaller base of plugins
- [​Groundwork OS](http://www.groundworkopensource.com/) - Yet another.
