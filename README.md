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
- Assets (images or other related files) must be put in `/assets/{page_name}/`

### Table of Content
To insert a TOC at the top of a page, just use the following snippet:

	* TOC
    {:toc .pull-right}

## 301 Redirects
To avoid a lot of 404 errors due to external links, we have to setup some 301 redirect rules. They are all set in the
`.htaccess` file at the root of this project.
