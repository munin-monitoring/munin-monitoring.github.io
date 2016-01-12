/**
 * Main JS file, included in all pages
 */
$(document).ready(function() {
	// Anchors
	var titles = $('.content').find('h2, h3, h4, h5, h6');

	// Create anchors for titles that hasn't one yet
	// (markdown pages titles already has)
	titles.not('[id]').not('.no-anchor').each(function() {
		// Convert title to slug and add it as id
		var slug = getSlug($(this).text());

		// Check if it is unique
		var i = 1;
		while (titles.filter('#'  + slug).length) {
			slug = getSlug($(this).text()) + '-' + i;
			i++;
		}

		$(this).attr('id', slug);
	});

	// Add anchor next to them
	titles.not('.no-anchor').each(function() {
		$('<a />')
			.addClass('anchor')
			.attr('href', '#' + $(this).attr('id'))
			.attr('title', 'Link to this section')
			.html('&para;')
			.appendTo($(this));
	});
});

function getSlug(text) {
	return text.toLowerCase().replace(/[^\w ]+/g,'').replace(/ +/g,'-');
}
