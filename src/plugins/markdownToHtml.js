import xss from 'xss';
import showdown from "showdown";

const converter = new showdown.Converter()
converter.setOption('openLinksInNewWindow', true)
converter.setOption('headerLevelStart', 2)
converter.setOption('simplifiedAutoLink', true)
converter.setOption('strikethrough', true)
converter.setOption('tables', true)
converter.setOption('emoji', true)
converter.setOption('underline', true)

/**
 * Converts Markdown text to HTML.
 *
 * @param {string} text Markdown text that will be converted to HTML
 * @returns {string} HTML text
 */
export function $markdownToHtml(text) {
  return xss(converter.makeHtml(text.replaceAll('<html-blob>', '').replaceAll('</html-blob>', '').trim()))
}
