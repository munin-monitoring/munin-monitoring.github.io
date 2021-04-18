---
layout: markdown-page
title:  "Community"
permalink: /community/
redirect_from:
  - /wiki/Team
  - /wiki/Community
  - /wiki/MuninRelayBot
---

* TOC
{:toc .pull-right}

## Communication

### Internet Relay Chat
If you use IRC, please join #munin on the OFTC network:

- [irc://irc.oftc.net/#munin](irc://irc.oftc.net/#munin)
- [irc://irc6.oftc.net/#munin](irc://irc6.oftc.net/#munin)

#### Chat-Meetings
Usually these will be held on Tuesday evenings (starting at 19:30 UTC). Thanks to [​MeetBot](http://wiki.debian.org/MeetBot),
[​minutes of the meetings](http://meetbot.debian.net/munin/) are written automatically :-)

### Mailing lists
See in the [Munin Guide](http://munin.readthedocs.org/en/latest/preface/moreinfo.html#mailing-lists)

### Planet Munin
[Planet Munin](http://planet.munin-monitoring.org/) aggregates blog posts and other munin-related information available via RSS.

## Core team and supporters

- [Steve Schnepp (Developer, Project-Admin)](#steve-schnepp-developer-project-admin)
- [Stig Sandbeck Mathisen (Developer and Sysadmin)](#stig-sandbeck-mathisen-developer-and-sysadmin)
- [Holger Levsen (Developer)](#holger-levsen-developer)
- [Gabriele Pohl (Developer)](#gabriele-pohl-developer)
- [Quentin Stoeckel (Front-End Developer)](#quentin-stoeckel-front-end-developer)
- [Further portraits](#further-portraits)

### Steve Schnepp (Developer, Project-Admin)
![Steve Schnepp](/assets/img/community/steve-schnepp.png){: .pull-right}

> I discovered Munin in 2007, with version 1.2 as Nicolai Langfeldt (janl) was the maintainer. Cacti was my monitoring
tool at the time, but I fell in love with the ease of writing custom plugins in Munin.
>
> The fact that Munin was written in Perl was also an advantage as I was much more fluent in Perl than in PHP. It helped
also a lot, that it only uses text files rather than a full-fledged MySQL.
>
> But I quickly grew frustrated in the defaults views as they didn't offer any details, so I started to write a zooming
extension. It was first quite limited, only the IMG size was configurable. Then slowly I designed the "pinpoint" to be
able to have any start and stop epochs. I based my hack on a very rough version of CGI (remember, it was in the 1.2 days...).
After a while, the 1.4 came out, and it mostly changed everything I based my hack on.
>
> So, i rewrote the whole hack, and decided to release it. (i didn't want to be alone maintaining it) It was accepted as to
be merged in the 1.5 version. That was in the beginning of 2010.
>
> After a *long* time, Nicolai had to leave from his leadership and I did a *mostly* peaceful takeover.


### Stig Sandbeck Mathisen (Developer and Sysadmin)
![Stig Sandbeck Mathisen](/assets/img/community/stig-sandbeck-mathisen.jpg){: .pull-right}

> My first commit to the munin project was in 2007.
>
> Since then, development and maintenance for the ​[Munin Guide](https://munin.readthedocs.org/) and the plugin documentation
has become my major task. From time to time, I dig into the perl code of Munin, but not very often.
>
> I am also the sysadmin for the Munin project servers and take care of our Trac instance. In 2012 I migrated the project's
repository from subversion to git. Read more about me on my ​[homepage](http://fnord.no/)
>
> In addition, I'm on the [​Debian packaging team](http://packages.qa.debian.org/m/munin.html) for the munin packages.


### Holger Levsen (Developer)
![Holger Levsen](/assets/img/community/holger-levsen.jpg){: .pull-right}

> Apparently in 2008 I started co-maintaining munin in Debian with version 1.2.6-1. My biggest contribution to munin
itself was probably pushing Steve to get 2.0 released and in shape :-)
>
> Today I'm mostly active in [​maintaining](http://packages.qa.debian.org/m/munin.html) the Debian package in sid, monitoring
the [​BTS](http://bugs.debian.org/src:munin) and backporting fixes to stable and stable-backports.
>
> #### Call for Participation
> - please [​help co-maintaining munin in Debian](http://bugs.debian.org/cgi-bin/bugreport.cgi?bug=655889) - there are a lot
of bugs in the BTS, many of these bugs are also munin upstream bugs so helping here will benefit all munin users. For
the Debian jessie release in 2015 I'd like to see this number ​[go down](http://qa.debian.org/data/bts/graphs/m/munin.png) to 20 or 30.
> - munin.git clone with [​Debian branches and tags](http://anonscm.debian.org/gitweb/?p=collab-maint/munin.git)
>
> Other things worth tackling are probably splitting the plugin packages further until there is one plugin package for each
category as well as packaging of (some) plugins from munin-contrib.git. Help is welcome and needed here as well, these
things are not high on my agenda!


### Gabriele Pohl (Developer)
![Gabriele Pohl](/assets/img/community/gabriele-pohl.jpg){: .pull-right}

> Looking for a tool that draws hard disks ​[S.M.A.R.T.](http://en.wikipedia.org/wiki/S.M.A.R.T.) state and attribute values
over time and on enterprise scale level? I had this demand in August 2005 and came in
[​first contact to Munin](https://sourceforge.net/mailarchive/message.php?msg_id=4318405). The article I wrote in that year
about smartmontools and it's integration in Munin is still ​[online (German language)](http://www.linux-magazin.de/Ausgaben/2005/10/Na-wie-geht-s-uns-denn-heute).
>
> In 2007 I got a request of Open-Source-Press to write a book about Munin. With Michael Renner was found a second author
and we published our ​[Munin Book](http://www.opensourcepress.de/de/produkte/Munin/128/978-3-937514-48-2) in April 2008
in Munich, Germany. Together with some other active members from the munin-users mailing list, we then spun off the
[German speakers mailing list](https://lists.sourceforge.net/lists/listinfo/munin-users-de).
>
> So my focus is mainly on improving the docs and building a nice site for the community ~
>
> Whilst studying Munin's features, configuration (and all the rest ;) for the book I read the wiki docs (and the source
code also) and did clean up info / pages and clarify terms (in consultation with the Munin maintainers, at that time janl
and bjorn). I am still active as wiki worker here. Current task is to split up docs in the part, that should be moved
from wiki to [​Munin Guide](https://munin.readthedocs.org/) and building a structure for the rest further on residing here.


### Quentin Stoeckel (Front-End Developer)
![Quentin Stoeckel](/assets/img/community/quentin-stoeckel.jpg){: .pull-right}

> I first met munin while looking for an easy-to-use monitoring solution. I quickly felt the need to browse its graphs on
my Android device so learnt Android development with my first mobile application, [Munin for Android](https://github.com/chteuchteu/Munin-for-Android),
whose first version was released mid-2012.
>
> I continued developing and maintaining it over the years without contributing to Munin, until 2014 - one year after Steve
Schnepp reached to me to talk about Munin for Android. At first, I drew a few drafts for a hypothetical new UI for munin,
but then began to work on a complete overhaul of its web interface.
>
> My first contribution to Munin was made early-2015, and it took about 8 months to finish the first version of Munin 3.0 UI.

### Further portraits
*Coming soon*
