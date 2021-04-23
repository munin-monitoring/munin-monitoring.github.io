---
layout: markdown-page
title:  "Munin FAQ"
permalink: /faq
redirect_from:
  - /wiki/faq
---

## Installation

### Q: What architectures are supported? What operating systems?

Munin is programmed in Perl, which can be installed on most operating systems.
In addition, it needs some perl modules, which you can fetch from [CPAN](https://www.cpan.org).

However, the plugins used by the client are often OS or application specific. 
E.g., many of the Linux-plugins use /proc to gather the data. 
There are some plugins that should work on most architectures. 
The architectures which have their own plugins as well, are

* Linux
* FreeBSD
* NetBSD
* Solaris
* AIX
* OS X / Darwin supported in trunk
* HP-UX

It is quite easy to make plugins for new OSes and we're happy to accept contributions

If you port/create/improve plugins, please [contribute them to the project](https://github.com/munin-monitoring/contrib).

### Q: What is required to install munin?

More or less this:

* A reasonable Perl5, both on the server and nodes
* RRD with perl support
* Perl modules for server: Time::HiRes, Storable, Digest::MD5, HTML::Template, Text::Balanced
* Perl modules for node: Net::Server
* Perl modules for plugins: Depends on the plugins you want to use, but probably none.
* Gnu Make

Please see the INSTALL file for complete and updated requirements.

### Q: My munin-node stops every day at midnight on FreeBSD

The last message in munin-node.log is: "Insecure dependency in exec while running with `-T` switch".

This is a bug in recent versions of the Perl module Net::Server, 
see http://rt.cpan.org/Public/Bug/Display.html?id=17090. 
Apply the mentioned patch to Server.pm.

###  Q: munin-node doesn't start and /var/log/munin/munin.log contains: 'Couldn't chown "/var/run/munin/munin-node.pid"'

This problem occurs when you try to run `munin-node` as the `munin` user. Run `munin-node` as `root` instead.

(Note that the munin master should run as `munin`, but `munin-nod` as `root`).

## Configuration

A guide to server configuration is in the wiki page `munin.conf`. 
Some interesting things that are not covered in that page is shown in this FAQ.

###  Q: What should a minimal server configuration look like?

    dbdir     /var/lib/munin
    htmldir   /var/www/munin
    logdir    /var/log/munin
    rundir    /var/run/munin

    [bing.foo.bar]
          address 10.232.33.259

The server will query the node and show all the services(plugins) it offers.

###  Q: Can I set or override the critical and warning levels, or other parameters, for a plugin?

Of course you can. Everything you define in `munin.conf` overrides the plugin's value.

Example: On the host foo.example.com, I want to set the df plugin's warning level 
for the `/home` mount point to 98%, instead of the default. 
Then, your `munin.conf` will include something like this:

    [foo.example.com]
      address 10.20.30.40
      df._home.warning 98
  
This also applies to almost all other parameters in the plugins, even if overriding those might not make much sense.

The syntax in the entry is `[plugin_name].[fieldname].(warning|critical) [value]`.
On the Munin page for the individual plugin, the fieldnames are listed as "Internal name" below the graphs.

Note

Plugin override is very different of plugin configuration.

We can resume by that plugin configuration is done when plugin cooperates and plugin "override" is done otherwise.

Here is a table with the main differences :

   |  Plugin Configuration	| Plugin Override
-------- | ------------------------ | -------------------
needs special plugin code	|  yes	|  no
configured on               | 	node	| master
configured in	            | /etc/munin/plugin-conf.d/ | 	/etc/munin/munin-conf.d/

Directly editing the plugin to change some config is really discouraged,
better enhance the plugin for it to support plugin configuration and submit it upstream.
This will save you lots of work on future maintenance when you will upgrade the plugins packages.

###  Q: How do I use the fieldname.cdef-thingie?

The cdef is fed to rrdtool graph so the man-page for rrdgraph should give you a bit more info. 
I'll try to explain it briefly here, though;

The cdef is defined using Reverse Polish Notation (RPN),
which means that you would say `4,5,+` instead of `4+5`. 
When you create a cdef-field, be sure to use the fieldname at least once in the definition,
or rrdgraph will croak with an error.

For a more thorough definition of RPN, take a look at the man-page for rrdgraph.

###  Q: Can I make a graph show values per minute instead of per second?

In your `munin.conf`, for the host and plugin, set:

    graph_period minute

Like this:

    [server.example.com]
      address 10.0.0.1
      postfix_mailstats.graph_period minute
    See graph_period? for details.

###  Q: Can I get a graph to show percentages instead of regular values?

You can modify a graph with two data fields to a percentage view with the 
following cdef (gotten from Nicolai Langfeldt). 
It uses two field names, hit and all with hit being the field you want in percentages of all.

    hit,all,1,all,0,EQ,IF,/,100,*,UNKN,all,0,EQ,IF,UNKN,all,UNKN,EQ,IF

###  Q: How do I define aliases ?

It's the same as borrowing data from another graph that is answered just below.

###  Q: How do I borrow data from another graph ?

See also LoaningData

Normally, graph_order looks something like this:

    graph_order apps buffers cache unused swap

It can, however, be used to define alises from other graphs.
E.g. if you want to incorporate the number of http-connections in the processes-graph 
(i.e. together with the number of processes on the machine), you'd say:

    graph_order processes connections=port_http.count

This would first draw the processes data-source (as normal),
then draw the count data-source from the port_http-graph.
connections would then be a field-name in the same way as processes,
so you could give it a cdef, draw, negative, etc.

Example graph_orders:

    graph_order bing bofh	Will draw two normal values
    graph_order bing bang=bing	Will draw two normal values, the second an alias to the first
    graph_order bing bang=graph.bing	Loan a data-source from another graph
    graph_order bing bang=host:graph.bing	Loan a data-source from another host's graph
    graph_order bing bang=domain;host:graph.bing	Loan a data-source from another domain's graph
    
### Q: How do I use fieldname.stack?

The format of stack is the same as the graph_order-arguments above.
You cannot, however, specify extra arguments for the fields.
If you want to specify a cdef for the 'whole stack', you can use the fieldname defining the special stack. E.g.

    [some.machine.boo]
        total_mail.graph_order total_received
            total_mail.graph_title Mail received by machine1 and machine2
            total_mail.graph_vlabel mails/min
            total_mail.total_received.label not_used
            total_mail.total_received.stack \
                machine1=machine1.your.dom:exim_mailstats.received \
                machine2=machine2.your.dom:exim_mailstats.received
            total_mail.total_received.cdef total_received,60,*

###  Q: How do I use fieldname.sum?

Same as stack, with one exception: drop the alias-bit in the field definition.
I.e., the above would become:

    [some.machine.boo]
        total_mail.graph_order total_received
            total_mail.graph_title Mail received by machine1 and machine2
            total_mail.graph_vlabel mails/min
            total_mail.total_received.label mails per minute # Now used
            total_mail.total_received.sum \
                machine1.your.dom:exim_mailstats:received \
                machine2.your.dom:exim_mailstats:received
            total_mail.total_received.cdef total_received,60,*

Also see this detailed example on how to aggregate graphs.

###  Q: Can I combine different built-in mechanisms, like loaning, sum and cdef?

Yes indeed. See this page? for examples.

###  Q: Can I change the order of the domains?

Yes, use the domain_order option at the topmost level.
To specify that you want the topmost level, either put the option before any host/domain definitions,
or reset the host/domain definition with `[]`. Note that in munin 1.4.3, this is an either-or situation;
You can't reset the host definition with `[]` unless a previous group has been declared.
if you want to declare the domain order first in munin.conf, do not precede it with `[]`. ref: http://munin-monitoring.org/ticket/960

    []
            domain_order foo.bar goo.bar alpha.bar

The default domain order is alphabetically.

###  Q: Can I change the order of the nodes under a domain?

Yes, use the node_order option under a domain.
To specify that we want to modify a variable under the domain, supply an empty host:

    [bing.foo.bar]
            address 10.232.33.259

    [fii.foo.bar]
            address 10.232.33.259

    [goo.foo.bar]
            address 10.232.33.259

    [foo.bar;]
            node_order fii.foo.bar bing.foo.bar goo.foo.bar

The default node order is alphabetically.

### Q: When do I use ':', ';' and '.' in the config files?

The following rules of thumb apply:

* Always use ';' between group and host
* Always use ':' between host and plugin
* For everything else, use '.'

Additionally, the following rules apply:

* You may omit the parts of a definition that are already within the context
* You may anchor the definition with a prefixed '.'

The following simple examples illustrate this:

    [Internal;foo.example.com]
        df.warning 80
    
equals

    [Internal;]
        foo.example.com:df.warning 80

equals

    # Before any [] context definitions
    Internal;foo.example.com:df.warning 80

equals

    [Internal;foo.example.com] # ...with anything at all in the brackets
        .Internal;foo.example.com:df.warning 80
    
Another example shows how to aggregate graph data from different sources:

    [foo.example.com]
        total_mail.graph_order total_received
        total_mail.graph_title Mail received
        total_mail.graph_vlabel mails/min
        total_mail.total_received.label mails per minute
        total_mail.total_received.sum \
            exim_mailstats.received \                      # Collects from itself (foo)
            bar.example.com:exim_mailstats.received \      # Collects from bar
            Customer;baz.test.com:exim_mailstats.received  # Collects from a different domain ('Customer') and host ('baz.test.com')
        
When referencing fields with graph_order, sum, stack, et al, you can include or omit the common elements -- both will work.
E.g., in the above example, the sum definition

    total_mail.total_received.sum \
        exim_mailstats.received \                      # Collects from itself (foo)
        bar.example.com:exim_mailstats.received \      # Collects from bar
        Customer;baz.test.com:exim_mailstats.received  # Collects from a different domain ('Customer') and host ('baz.test.com')
        
...can just as well be written as

    total_mail.total_received.sum \
        example.com;foo.example.com:exim_mailstats.received \ # Collects from itself
        example.com;bar.example.com:exim_mailstats.received \ # Collects from bar
        Customer;baz.test.com:exim_mailstats.received         # Collects from a different domain ('Customer') and host ('baz.test.com')

### Q: How do I refer to my service if it has a dot (".") in the field name?

Since the dot (".") delimits service name from attribute name, you can't use it in a service name directly in munin.conf.
If your service name has a dot in it (as the ip_ plugin often does), replace the dot with an underscore ("_"). For example:

    uakari_net.graph_title uakari Network Traffic
    uakari_net.graph_order in=uakari.example.org:ip_192_168_199_23.in out=uakari.example.org:ip_192_168_199_23.out

###  Q: How can I use an SSH tunnel to connect to a node?

This FAQ entry was developed by Lupe Christoph, with the help of Jim Cheetham.

You have to configure the node thusly:

    [ssh-node]
          address 127.0.0.1
          port 5050
          
Then use ssh to establish the tunnel: `ssh -L 5050:localhost:4949 -f -N -i keyfile user@ssh-node`

This will establish a tunnel between TCP ports 5050 on the calling machine to 4949 on the called machine.
It will also send ssh in the background after possibly asking for a passphrase, a password or something like that.
Since we are using a key made for this purpose, we have to specify that file with this key.

You should protect against misuse of ssh by creating a special key (and possibly also a special user).
On the node, put something like this in `~user/.ssh/authorized_keys`:

    from="192.168.1.35",command="/bin/false",no-pty,no-X11-forwarding,no-agent-forwarding,no-port-forwarding,permitopen="localhost:4949"
    ssh-dss AAAAB3......

Thus, we are restricting the key to a forced command "/bin/false" that is run independent of
the request from the calling side.
We are also restricting a few options:

    from="192.168.1.35"	accept the key only from this IP address
    command="/bin/false"	always run this command
    no-pty	never allocate a PTY for interactivity
    no-X11-forwarding	do not forward X11 client connections
    no-agent-forwarding	prevent ssh-agent usage
    no-port-forwarding	prevent ssh -R ...
    permitopen="localhost:4949"	only allow this for ssh -L ...

### Q: I don't like the bandwith usage graph, how to make it look like MRTG or Cricket graphs?

For interface `eth0` on host `foo.bar.example`,

    if_eth0.graph no

    my_ifeth0.graph_args --base 1000 --lower-limit 0
    my_ifeth0.graph_title Traffic on interface eth0
    my_ifeth0.graph_order received=foo.bar.example:if_eth0.down sent=foo.bar.example:if_eth0.up
    my_ifeth0.graph_vlabel Bits per second
    my_ifeth0.received.cdef received,8,*
    my_ifeth0.received.draw AREA
    my_ifeth0.sent.cdef sent,8,*
    my_ifeth0.sent.draw LINE1
    
Answer supplied by Jacques Caruso.

See also #1158.

###  Q: I added the graph_sums? option, but I only get one new graph (instead of two).

The `graph_sums` option require that rrdtool version 1.0.39 or above is installed.

###  Q: I have removed a plugin, but it still shows up in the HTML file(s).

Check that the plugin has no references in munin.conf.
Also, restart munin-node if you haven't done so since removing the plugin.

###  Q: Is there any way to increase the default size of the munin graphs?

Yes, use the `graph_width` and `graph_height` params.

## Node plugins

###  Q: How do you install a plugin?

For an average Linux, on a munin-node:

1. Download the plugin file
1. Place it in /etc/munin/plugins
1. Ensure it has appropriate execute permissions (e.g. chmod 755 myplugin)
1. Optionally set plugin-specific options in /etc/munin/plugin-conf.d/munin-node
1. Restart munin-node: /etc/init.d/munin-node restart
1. Wait for a few minutes for the new stats start appearing in the server report

If you are installing a wildcard plugin (e.g. it looks like `myplugin_` with an underscore suffix), refer to wildcard plugins.

### Q: Why does a plugin work with munin-run but not in munin-node?

This indicates that the plugins only works when launched from a TTY.

The usual suspects are then any hardening tool :

* SELinux
* AppArmor
* GRSecurity

So, try to temporarily disable completely the hardening tool.
If it works then you need to configure it properly for your plugin.

Just after the hardening tools you might have environment var issues, such as `PATH`.

For that, just use the config syntax `env.PATH /usr/bin:/opt/bin:...`

### Q: What are the minimum requirements of a node plugin?

Please see HowToWritePlugins for a tutorial on writing plugins.

### Q: Can I make the plugin run as another user/group than nobody/nogroup?

Yes, you can create a file in the plugin configuration directory (client-conf.d).
The file should contain the username and group to run the plugin as.
E.g., on linux, the exim_mailqueue-plugin need access to the exim mail spool (to count the messages in the queue).
It needs mail group permissions to do this, so the `exim_mailqueue.auth` contents look like:

    [exim_mailqueue]
            group mail
            
Similarly, you could use the user option to run the plugin as a user.
If more than one group is needed, or some of the groups only exist on certain hosts (and you want a common config file), the syntax supports this:

    [some_plugin]
            group mail,adm,group1,group2,(group3_that_might_not_exist)

### Q: Can I run munin at different time intervals than the default?

Munin runs at an interval of every five minutes `(*/5)` on debian systems by default.
Is it possible to change this interval to an arbitrary value?

Just edit `/etc/cron.d/munin`.

However, this won't change Munin's (or rather RRD's) granularity.
All RRD files are constructed to create 5 minutes averages, and no matter how often you update the RRD files the output won't be (much) different.
Changing this (default) behaviour has been proposed in Ticket #5.

### Q: How to monitor Windows XP boxes via SNMP plugins?

Please see How To Monitor Windows

### Q: Why do some plugins end with an underscore (`_`)?

Because they are so-called wildcard plugins, which means that the exact same plugin may be used in different contexts or with different resources. Running the plugin directly with the parameter suggest will (hopefully :-) output the possible uses for the plugin.

A good example is the `if_` plugin. The same plugin will be linked to the available interfaces on the system, e.g. `if_eth0` and `if_eth1`.

    $ /usr/share/munin/plugins/if_ suggest
    eth0
    eth1
    
### Q: Why are the graphs for plugin xyz blank?

Hard to say. Please refer to debugging munin plugins for a treatment on how to find out.
See also the next question:

### Q: Why are the graphs for the MySQL plugin blank?

This is due to a bug in a Perl library Munin uses which causes `$PATH` to be lost.
This again causes the plugin to not find the mysqladmin program which it needs to retrive the numbers the needed in the graphs.
The solution is to hardcode the path of the program.

First locate the mysqladmin program. On most systems, the command `which mysqladmin`, `type mysqladmin` or `locate mysqladmin` will help you.
When you find the path, enter that path in `/etc/munin/plugin-conf.d/munin-node`.

This is how it might look:

    darkstar:~# which mysqladmin
    /usr/bin/mysqladmin
    
Then, under the `[mysql*]` section identifier in `/etc/munin/plugin-conf.d/munin-node`, add the following line:

    env.mysqladmin /usr/bin/mysqladmin

### Q: Why does my users plugin report floating point numbers?

...I have a plugin that counts users. Even though all the readings from it are integers, the cur value in munin is showing a floating point number.

This is due to the fact that Munin takes a while to collect all the input numbers and therefore the collection of most numbers does not happen at the precise point in time that RRD wants. When that happens, RRD makes an interpolation between the two last data points. This leads to floating point numbers in the display.

NOTE: COUNTER and DERIVE values have to be integers, but the averages calculated based on them are floating point. GAUGE values are floating point.

NOTE: Starting from Munin 1.3.3 you can specify graph_printf. Please see the man page rrdgraph_graph for more information on how to use this option. Note that the scaling unit (%s) is supplied automatically by Munin based on the graph_scale setting from the plugin. The default printf format is %6.2lf (except if the base is 1024, then the format is %7.2lf).

See also Ticket #1023 for explanation of a related effect.

### Q: My plugin only reports integers, why is munin showing floating point?

See the question above.

### Q: munin-node-configure --shell shows no plugins?

Check your `$PATH`. If it contains any world-writable directories, including ".", then the configure won't work since -T (perl taint check) is on. Remove world-writable paths from `$PATH`.

### Q: My SNMP plugin doesn't graph anything

The most frequent reason for this is that munin.conf lists the SNMP unit's address instead of where the SNMP-reading plugin exists. `munin.conf` should include something like this:

    [SNMP_unit]
    address ip.where.SNMP-plugin.exists
    use_node_name no

### Q: I edited my plugin to have min/max values, but they are not taken into account

This is a bug. Please post about your problem on the munin-users list as we have not been able to reproduce the problem.

Somehow some rrd files does not get re-tuned properly when the min/max settings of the plugin are changed. You have to do it manually with :

    rrdtool tune ${RRD_FILE} --maximum 42:${MAXIMUM_VALUE}  --minimum 42:${MINIMUM_VALUE}
    
You can also read the next item, on having historical data corrected respectively to min/max.

### Q: I tuned the RRD to have min/max values, but they are not taken in account for historical data

You have to dump/restore the data, so that RRD "normalizes" it.

    (rrdtool dump ${RRD_FILE} | rrdtool restore --range-check - ${RRD_FILE}.new) && \
        mv ${RRD_FILE} ${RRD_FILE}.bak && \
        mv ${RRD_FILE}.new ${RRD_FILE}

### Q. Why do SNMP not return any data?

Many reasons for this, but if you are able to snmpwalk or snmpget from your SNMP enabled device, 
but it seems slow, the reson might be a timeout during session connection. Try to add this to munin-node.conf:

    [snmp_my.slow.host_plugin]
        env.timeout 20
        
Default timeout is 5 seconds, and not every SNMP plugin adheres this setting, but it might work.

## Other

### Q. How do i "su" to the munin users?

The munin account will usually have no password and also no shell.
Because of this, on most systems you have to use this command to su to the munin account:

    su - munin --shell=/bin/bash
    
If that alone does not work, change to the root user and then try changing to the munin user:

    user@box$ sudo su
    root@box# su - munin --shell=/bin/bash
    munin@box$

### Q. The graphs are not updating any more

You probably used `--force-root` with one of the munin programs.
You really shouldn't have done that.
Now fix the ownership of the .rrd files and of the .png and .html files so that the munin user can write to them again.

In munin 1.2.6 and 1.3.4 there will be a "check-munin" command that checks for correct owner of some files and directories.
It does not work well when graph-mode is cgi though.

You can also check your configuration, in munin.conf, if you put server's IP, replace it by 127.0.0.1. (example : instead of 88.191.XX.XX, put 127.0.0.1)

Another possibility is that the structure of the generated files changed from 1.3.x to 1.4.x. Munin might be updating but the files you are looking av are no longer being updated. A quick fix is to remove all files from the munin-html directory and run munin-update again.

    rm -rf /var/www/munin-html/*
    su -s /bin/bash munin
    /usr/bin/munin-cron

### Q. I have installed munin on ubuntu server 12.10 …

As it was asked many times on IRC :

I have installed munin on ubuntu server 12.10
but the graph didn't display correctly

I am using munin 2.0.2
The usual answer is to add a correct `ScriptAlias` directive that is missing in the ubuntu package.

    ScriptAlias /cgi-bin /usr/lib/cgi-bin

### Q. Is Munin the same as Nagios?

No. They are used for different things and the plugins work completely different.
For one Munin was designed to be plug and play. Nagios has to be configured in every detail.

Nagios is complimentary to Munin, and the Munin `contacts/munin-limits` system was originaly designed to report warning/critical conditions to Nagios.

### Q. I have graphs with gaps!

Reports of this has been seen now and then.
When it is accompanied by emails from munin-update about lock files it is due to some node
being slow at running its plugins so that munin-update does not complete in 5 minutes as it needs to.
The good thing is that all modern munins (1.2 series and later) check all nodes in parallel,
but if there is a node with a lot of (slow) plugins, e.g. SNMP plugins, it can sometimes take 5 minutes.

If there are no mails about lock files, some other issues have been identified:

* NTP syncronize the server
* Upgrade to a late version of munin 1.2. Apparently 1.2.3 (and earlier?) has some rarely seen timing issue not seen at all in later versions.
* You have perl Net::SSLeay modules installed but have not configured Munin to use SSL/TLS. In this case put tls disabled in your munin.conf on the server. TLS will be disabled by default, in all cases in 1.3.4 (and probably 1.2.6).
* Temporary DNS unavailability. To avoid this, either 1) run a DNS slave with a sufficiently high zone TTL on the Munin master, 2) maintain an /etc/hosts file, or 3) use only IP addresses in your munin.conf file.
* Temporary samba shares unavailability resulting in `df*` modules to timeout. To resolve add smbfs and cifs to df's ingnore list in df and df_inode mofules source code.

### Q. On one host there are no graphs at all!

Plesse see FAQ_no_graphs

### Q. How can I get vim to set the correct file type when editing plugins?

Add the following to your `~/.vim/scripts.vim` file

    " If we already have chosen a file type, skip the rest
    if did_filetype()
            finish
    endif

    " Munin plugins use @@MACRO@@ replacement, so we need to add these here
    if getline(1) =~ '^#!@@PERL@@'
            setfiletype perl
    elseif getline(1) =~ '^#!@@GOODSH@@'
            setfiletype sh
    elseif getline(1) =~ '^#!@@BASH@@'
            setfiletype sh
    elseif getline(1) =~ '^#!@@PYTHON@@'
            setfiletype python
    endif

### Q. I'm getting 'Call to accept timed out.' in my munin-update.log

If you're having a lot of munin-nodes it could be the munin-node times out during munin-update.
The global default is 5 seconds, try setting a higher timeout in munin-node.conf.

### Q. What does that SQL feature in munin 3.0 mean?

From munin 3.0 on, munin uses an SQL backend to store the meta data needed for processing. 
This results in a significant performance increase compared to plain text files or binary formats used before, and also opens a path for new features. 
The actual values provided by the nodes are still stored in RRD files and will so for any forseeable future. 
Note, munin 3.0 is not here yet, and the RC are called 2.999 until 3.0 arrives.
