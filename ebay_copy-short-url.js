// ==UserScript==
// @name         eBay copy short url button
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  adds a copy short url button to ebay item page
// @author       Ariel Jannai
// @include      /ebay\.(com|de|co\.uk)\/itm/
// @run-at       document-end
// @grant        none
// ==/UserScript==
/* jshint -W097 */
'use strict';

// Your code here...
var copyLinkIcon = 'http://icons.iconarchive.com/icons/icons8/windows-8/32/Editing-Copy-Link-icon.png';
var copyButton = '<td><div class="copy-url"><a rel="nofollow" href="javascript:;" ' + 
				'class="scIcon copy-short-url" aria-label="Copy short url to clipboard" ' +
				'title="Copy short url to clipboard" target="_blank"></a></div></td>';

addGlobalStyle('.copy-short-url { background-image: url("' + copyLinkIcon + '"); width: 18px; height: 18px; float: left; background-size: contain;}');
addGlobalStyle('.copy-url { margin-right: 3px; }');

$('div.share table tbody tr').prepend(copyButton);


$('.copy-url')[0].addEventListener('click', function(event) {
	copyTextToClipboard(tryShortUrl(document.location.href));
});

function tryShortUrl(url) {
	var urlPattern = /ebay\.(com|de|co\.uk)\/itm/;

	if(urlPattern.test(url)) {
		var id = url.match(/\/(\d{12})(\?|$)/)[1];
		return 'http://www.' + urlPattern.exec(url)[0] + '/' + id;
	} else {
		return url;
	}
}

// https://somethingididnotknow.wordpress.com/2013/07/01/change-page-styles-with-greasemonkeytampermonkey/
function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

// http://stackoverflow.com/a/30810322/2350423
function copyTextToClipboard(text) {
  var textArea = document.createElement("textarea");

  //
  // *** This styling is an extra step which is likely not required. ***
  //
  // Why is it here? To ensure:
  // 1. the element is able to have focus and selection.
  // 2. if element was to flash render it has minimal visual impact.
  // 3. less flakyness with selection and copying which **might** occur if
  //    the textarea element is not visible.
  //
  // The likelihood is the element won't even render, not even a flash,
  // so some of these are just precautions. However in IE the element
  // is visible whilst the popup box asking the user for permission for
  // the web page to copy to the clipboard.
  //

  // Place in top-left corner of screen regardless of scroll position.
  textArea.style.position = 'fixed';
  textArea.style.top = 0;
  textArea.style.left = 0;

  // Ensure it has a small width and height. Setting to 1px / 1em
  // doesn't work as this gives a negative w/h on some browsers.
  textArea.style.width = '2em';
  textArea.style.height = '2em';

  // We don't need padding, reducing the size if it does flash render.
  textArea.style.padding = 0;

  // Clean up any borders.
  textArea.style.border = 'none';
  textArea.style.outline = 'none';
  textArea.style.boxShadow = 'none';

  // Avoid flash of white box if rendered for any reason.
  textArea.style.background = 'transparent';


  textArea.value = text;

  document.body.appendChild(textArea);

  textArea.select();

  try {
    var successful = document.execCommand('copy');
    var msg = successful ? 'successful' : 'unsuccessful';
    console.log('Copying text command was ' + msg + ': ' + text);
  } catch (err) {
    console.log('Oops, unable to copy');
  }

  document.body.removeChild(textArea);
}
