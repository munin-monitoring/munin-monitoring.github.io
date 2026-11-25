---
layout: markdown-page
title:  "Shell plugins"
permalink: /wiki/PluginShell
---

This page preaches good shell scripting in plugins. But we would *much* rather have **a** suboptimal plugin than **no** plugin at all.

Writing plugins in shell script is often an excellent choice. If you write it using the facilities available in a modern POSIX shell the script will be both quite efficient, easier to read than otherwise and completely portable among UNIXes.

A POSIX shell is a good deal more powerful on some systems (such as Solaris and others) than the regular /bin/sh is. The standard for the POSIX shell is described in the IEEE and Open Group *[Shell command language](http://www.opengroup.org/onlinepubs/000095399/utilities/xcu_chap02.html)* reference.

I would direct you to some nice language features in the POSIX shell language:

* printf is portable, echo -n is not
* Capturing program output: Use $(program) instead of `program` because me="$(basename "$0")" is completely sane and does exactly what you think it does. I've forgotten how to quote that using backticks.
* Using a subprocess (slow) for basename is superflous, it can actually be written me=${0##\*/}  which is executed completely by the shell, no sub-processes (fast).
* Arithmetic (integer only) can be done like this: TWO=$((1 + 1)).
* Default values: If you want a df plugin to warn at 80% full disk by default, but also let the user override the default: : ${WARNING:=80} . It sets WARNING to 80 unless it's already set. The colon (:) is mandatory. A more usual way of doing this is WARNING=${WARNING:-80}  but that's more verbose :-)
* Using awk to merely pick out positional parameters is most often not needed. The shell can do the job very well. The Linux (and others) df plugin used to have a loop like this:

```
df -P -l -x unknown  -x none| sed 1d | grep -v "//" | while read i; do
        name=`echo $i | sed 's/[\/.-]/_/g'| awk '{ print $1 ".value " }'`
        printf "%s " $name
        echo $i | awk '{ print $5 }' | cut -f1 -d%
done
```

With apologies to the original author, this is very very ugly. And on real (over)loaded systems it took forever to run. This is way better:

```
df -P -l -x unknown -x none 2>/dev/null | sed -e 1d -e '/\/\//d' -e 's/%//' |
    while read dev size used free pct fs; do
        echo "$dev.value $pct"
    done
```

As you see the job that awk was used for is done by the read command so all the awks are superflous. There are some other enhancements in this example. Sed is very versatile.

*[Most common bashisms](http://mywiki.wooledge.org/Bashism)*

## Correct field names

Starting from 1.3.3 you can use the support function (there is only one of them as of 1.3.3, more may appear) clean\_fieldname to sanitize a value you want to use as field name so that the name is legal according to Munin (or rather RRD). This is discussed in [Notes on field names](https://guide.munin-monitoring.org/en/latest/reference/plugin.html#notes-on-fieldnames).

## Shebang for POSIX shell scripts

When a shell plugin is committed to the SVN repository the filename is changed to end in .in and the shebang #! is changed to #!@@GOODSH@@@. During the installation of the plugins the @@ expressions are substituted with their actual values for the system (read Munin Install Procedure). From 1.3.3 this value is also available at runtime as $MUNIN\_GOODSH.

The install procedure also defines a @@BASH@@ alias $MUNIN\_BASH if your script requires specific bash features or constructs. Bear in mind that bash may not be available on all systems so please stick with POSIX features.
