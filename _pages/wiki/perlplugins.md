---
layout: markdown-page
title:  "Perl plugins"
permalink: /wiki/PerlPlugins
---

## Using Munin::Plugin module

You shall put these lines before using Munin::Plugin functions :

```
  use lib $ENV{'MUNIN_LIBDIR'};
  use Munin::Plugin;
```

If your Munin installation predates the MUNIN\_\* environment variables
(introduced in 1.3.3) you can put this in your plugin configuration:

```
  [*]
      env.MUNIN_PLUGSTATE /var/lib/munin-node/plugin-state
      env.MUNIN_LIBDIR /usr/share/munin
```

The module exports these functions: clean\_fieldname,
set\_state\_name, save\_state, restore\_state, tail\_open, tail\_close.

## Avoid hacks

There are many perl plugins with constructs like the following to get environment values :

```
$var = $ENV{var} || somevalue;
```

This is wrong and may led to unexpected results.

The right way to write this is one of the following, depending on how you interpret environment values :

```
$var = exists $ENV{var}  ? $ENV{var} : somevalue;
$var = defined $ENV{var} ? $ENV{var} : somevalue;
```

To understand why, run the following script :

```
#! /usr/bin/perl -w
my %X = (a => 0, b => 2, c => "", d => undef);
foreach my $i (qw(a b c d e)) {
  my $y = $X{$i} || "ok";
  printf "%s  %s\n", $i, $y;
}
```

and you'll see that the only correct results are for **b** and **e**.

The reason is that `||` is a boolean operator over two boolean values and nor  $X{$i}  nor  "ok" are boolean values.
