import xss from 'xss';

/**
 * Converts Markdown text to HTML.
 *
 * @param {string} text Markdown text that will be converted to HTML
 * @returns {string} HTML text
 */
export function $markdownToHtml(text) {
    return xss(this.converter.makeHtml(text.replaceAll('<html-blob>', '').replaceAll('</html-blob>', '').trim()))
}
