# munin-www
Munin's new website is built using Jekyll. Here are some side notes for contributors/curious:

## Pages: page.md vs pages/index.html
For real basic pages, we use a page.md file. It allows to write its content in Markdown.
For more complex pages - the download page for example, the content is directly written in HTML.

In both cases, we use the `permalink` option to set its public address:

	permalink: /download/
