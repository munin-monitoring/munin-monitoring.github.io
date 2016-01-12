# munin-www
Munin's new website is built using Jekyll. Here are some side notes for contributors/curious:

## Pages: page.md vs pages/index.html
For real basic pages, we use a page.md file. It allows to write its content in Markdown.
For more complex pages - the download page for example, the content is directly written in HTML.

In both cases, we use the `permalink` option to set its public address:

	permalink: /download/

## Writing pages
Here are some rules to writing pages:

- Titles should go from `<h2>` to `<h6>`. The `<h1>` tag is reserved to page title and header logo.
- Do not start your page with `# My page title`. Page titles are already displayed by the `markdown-page` template.
