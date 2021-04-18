---
layout: post
title:  "New Website is Live"
categories: munin website
---
Our new website has moved from Trac to [Github pages](https://docs.github.com/en/pages/setting-up-a-github-pages-site-with-jekyll), 
powered by [Jekyll](https://jekyllrb.com). 

Many wiki pages are removed, since they are totally obsolete, and are replaced by 

* [The Munin Guide](http://guide.munin-monitoring.org) for the documentation part of the wiki
* A direct link to [our repository in GitHub](https://github.com/munin-monitoring/munin) for the source part.

The remaining things are :
* the downloads
* the gallery
* the demo server

Those don't have a replacement yet, but as the gallery is already statically generated, it would fit itself for another github pages.
Updated by some github actions. The download parts is typically best handled by github also.

Remains the demo server. This is the most tricky part, but it makes sense to have it running inside a docker image,
as it would enable us to automatically test and verify the validity of that proposition.

The old, trac based site is still available for now at [old.munin-monitoring.org](http://old.munin-monitoring.org/).
