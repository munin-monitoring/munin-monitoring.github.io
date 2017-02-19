# munin-www
Munin's new website is built using Jekyll. Here are some side notes for contributors/curious:

## Local development environment
To install dependencies, please read [GitHub's documentation](https://help.github.com/articles/setting-up-your-github-pages-site-locally-with-jekyll/#requirements).

Once done, you'll be able to locally run this project using `bundle exec jekyll serve`. You can then open your favorite browser
& navigate to http://127.0.0.1:4000.

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
To avoid a lot of 404 errors due to external links pointing to legacy URLs, we have to setup some 301 redirect rules.
Since we're hosting this site on GitHub Pages, we cannot use a .htaccess file. See `redirect_from` directives in pages such as [`_pages/community.md`](/_pages/community.md).
