---
layout: post
title:  "We made it onto HackerNews!"
categories: munin website
---

It seems we made it onto [Hacker News](https://news.ycombinator.com/item?id=26873260) due to our new website. For a software that is has the right to vote in a majority of countries, it's quite an achievement.

As usualy, the comments are a mixed bag : some good, some bad, some ugly & some gems.

That said, usually I still take some advice from comments there are even huge evil rants have their roots in truth, as the old saying goes:

> Even a broken clock is right 2 times per day.

So, let me reply to some of the comments: 

### Page download size

I get that we can still shave down some bytes. As I'm really eager to run on limited hardware, I'd really be glad to do that. 
Unfortunatly :

* I'm not very good with web technologies, and therefore I'd need help.
* Also it wasn't very high on my list, since the efforts spend would not have significant results in 2021.
* But if there's a working PR, I'd be happy to merge it.

### Contributing to the website

Thanks to our new hosting mechanism, it is now very easy for anyone to contribute.
Simply [issue a PR](https://github.com/munin-monitoring/munin-monitoring.github.io/pulls) in our 
[website github repository](https://github.com/munin-monitoring/munin-monitoring.github.io) and you're done.

The website workflow is very simple, as it is the [Github Pages](https://docs.github.com/en/pages/setting-up-a-github-pages-site-with-jekyll) one, 
powered by [Jekyll](https://jekyllrb.com).

I'll update the website itself to make it clear, as indeed having to look into an obscure blog post isn't really welcoming.

### Performance of Munin

The current stable part of munin is the 2.0 branch, which is rather old. It went out in 2012.
I'm (very) slowing working on the upcoming 3.0 branch, which has the focus to be much more speedy.

My performance testing system for the master server is a venerable RaspberryPi 1B, and it handles correctly about 20 nodes.

It is already quite stable, but doesn't support all the things that 2.0 does. Mostly the limits & alerts aren't. 
