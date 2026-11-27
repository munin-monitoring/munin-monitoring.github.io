---
layout: markdown-page
title:  "Munin Relay"
permalink: /wiki/munin-relay
---

Munin relays are not implemented yet.

## Objective

The object of this utility is to help with one issue:

Sometimes you want to retrieve information from non directly reachable networks. You have to proxy them through another host that acts as a gateway.

Today, for each unreachable host, you have to setup a TCP tunneling. Solutions to to that are mutiples:

* TCP proxy
* SSH Tunnel
* Direct SSH Command since 2.0 with the `ssh://` scheme.

The issue is that the configuration is quite painful, since usually you have to edit the proxy for each remote host.

It would be quite useful to have an external utility that is able to directly multiplex via the `hosts` protocol command.
The relay is only a real time proxy, it doesn't have any scheduling on its own.

In the future, it would be nice to have :

* Automatically discovery of hosts on a network (via a portscan on configured subnets for example)
* Be able to spool to cope with weakly connected remote datacenters (working in synergy with munin-async would be perfect)

## API

The protocol used is very simple, since it's based on the `hosts` protocol command from the network-protocol.
It's very much like the regular SNMP plugins in the `munin-node`.

There are 3 hosts, all identical, with the same 2 plugins each.

Protocol directly with host1 :

```plain
> nodes
< host1.dmz
< .
> list host1.dmz
< plugin1 plugin2 plugin3
> config plugin1
...
```

Protocol with the munin-relay : it prepends the $HOSTNAME with `.` (dot) replaced with `_` underscores, and separated from the real plugin name with a `__`(double underscore).
It does handle then the plugin names mapping so that each plugin is unique and adds `host_name` as a configuration variable to each plugin to override the host name for which this plugin is run.

```plain
> nodes
< host1.dmz
< host2.dmz
< host3.dmz
< .
> list host1.dmz
< host1_dmz__plugin1 host1_dmz__plugin2 host1_dmz__plugin3
> config host1_dmz__plugin1
...
< host_name host1.dmz

```
