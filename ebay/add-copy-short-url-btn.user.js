// ==UserScript==
// @name         eBay copy short url button
// @namespace    https://github.com/arieljannai
// @version      0.1.4
// @description  Adds a copy short url button to ebay item page. Copies a nice link instead of a long one. The short url - http://www.ebay.com/itm/item_id
// @author       Ariel Jannai
// @include		 https://www.ebay.tld/itm/*
// @run-at       document-end
// @icon         https://cdn4.iconfinder.com/data/icons/flat-brand-logo-2/512/ebay-128.png
// @grant        none
// @license      MIT
// ==/UserScript==
/* jshint -W097 */
'use strict';

// http://www.iconarchive.com/show/windows-8-icons-by-icons8/Very-Basic-Link-icon.html
var copyLinkIcon = "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAACNElEQVR42qWVu0tcURDGZwUfKCI2KbQRVggq6Ga1MZouRhIhIOpfYGMhIpiNFmoSTRORRBaLNP4FJlgYNKiV66PR9QEqqCkstrIQTSI+wOSb3Bk5uXvW3bsO/OA+zv2+OXPmnOuj+4UfdIInoADEwDT4DH7zAN89xLvACMiSe9b6I9c/QBPYT9dgALxLkuAhCKRjoOKa9S54I1k3yLscmU3Iq4EpzrECnoOfxrOQlI4NIl4M3GVZtohzPAJRLVOqBrmgUK5rQCPotYhztIJJmUE0FYMMUAvKwA3YAusJxuaDVVAhBp+SGbSAUVDies4laAebLvFZUCf3l2x0l0E/GJJr7XGz13/JrGKG+GPj+24QTmQwIOIqdgYWQDZ4BjLlOe/gbSNzHc9tO6yZ2cS1W/gDbsVmcCzvq+U9r8UHMCOZ6/hbcZuBZq7BrfiCnI6pko91gR+AKaMsceJuA3dZdBNVgiV5fg3mZAGfknPAxZXFZsAH1xjZN1Ex2JOFtAUbDIL3tpcsyEfuDjmnoo/sOzQAJkDQyJjjCLwCXxOY/xP8SE5LcfDBVUv2HaoLzGuRIbPiTXVDd4RPFi0o923gi2Ucl4c75jtYk+9OwDklCR54IGXSDDcs4rqJrK2YzGAR1Mt9HzlHrVtcNxGPH0xVXA16yDlvOC4ku3lQCt6CcmO8J3E1yCPn0PLT/2eNeU1eyuI24HgIvknWboMr8BqEvYqbBiQz6QAvQRE4BREwTs7/Nq34C5e+h6/23oiCAAAAAElFTkSuQmCC')"

// http://icons.iconarchive.com/icons/yusuke-kamiyamane/fugue/16/edit-number-icon.png
var copyNumberIcon = "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAALZJREFUeNpi/P//PwMlgImBQkCxAQwgL4AwIyMjOtYG4jVQGoUP0wPC+FxgCsS/gPgqDj5BL3gC8R48fDBghMUCExPYLD0gbifk7X///nkTCoM0IN6Ii09MGPgD8Q48fJxeOExExOUBvXAenxfygXgfHj52LyAl6Qgg3opkI5wP04QMWJDYzEBJOyAtC8S3gVgKGiswvggQfwTi31jDAOg0ZiDFB8ScOPz+C2YAsisYBzw3AgQYAPe7bHJIc8toAAAAAElFTkSuQmCC')"

var copyLinkButton = '<div style="float:left"><a rel="nofollow" href="javascript:;" ' +
				'class="copy-url" aria-label="Copy short url to clipboard" ' +
				'title="Copy short url to clipboard" target="_blank"><span class="copy-short-url"/></a></div>';

var copyNumberButton = '<div style="float:left"><a rel="nofollow" href="javascript:;" ' +
				'class="copy-number" aria-label="Copy item number url to clipboard" ' +
				'title="Copy item number to clipboard" target="_blank"><span class="copy-item-number"/></a></div>';

function tryShortUrl(url) {
	var urlPattern = /ebay\.(com|de|co\.uk)\/itm/;

	if(urlPattern.test(url)) {
		var id = url.match(/\/(\d{12})(\?|$)/)[1];
		return 'http://www.' + urlPattern.exec(url)[0] + '/' + id;f
	} else {
		return url;
	}
}

function tryItemNumber(url) {
	var urlPattern = /ebay\.(com|de|co\.uk)\/itm/;

	if(urlPattern.test(url)) {
		var id = url.match(/\/(\d{12})(\?|$)/)[1];
		return id;f
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

// start

addGlobalStyle('.copy-short-url { background: ' + copyLinkIcon + '; width: 18px; height: 18px; float: left; background-size: contain;}');
addGlobalStyle('.copy-url { margin-right: 3px; }');

$('div.social-widget > div')[0].style.float = "right";
$('div.social-widget').prepend(copyLinkButton);

//$('.copy-url')[0].addEventListener('click', function(event) {
	//copyTextToClipboard(tryShortUrl(document.location.href));

addGlobalStyle('.copy-item-number { background: ' + copyNumberIcon + '; width: 18px; height: 18px; float: left; background-size: contain;}');
addGlobalStyle('.copy-number { margin-right: 3px; }');

$('div.social-widget > div')[0].style.float = "left";
$('div.social-widget').prepend(copyNumberButton);

$('.copy-number')[0].addEventListener('click', function(event) {
	copyTextToClipboard(tryItemNumber(document.location.href));


});
