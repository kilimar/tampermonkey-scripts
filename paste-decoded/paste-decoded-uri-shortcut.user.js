// ==UserScript==
// @name         decodeURI & Paste text - Keyboard shortcut
// @namespace    https://github.com/arieljannai/tampermonkey-scripts
// @version      0.1
// @description  Calling decodeURI to get a nicer and readable URI (Ctrl + Shift + V)
// @author       Ariel Jannai
// @icon         https://pixabay.com/static/uploads/photo/2012/04/16/13/10/document-35941_960_720.png
// @grant        none
// ==/UserScript==
/* jshint -W097 */
'use strict';

var pressedKeysTracking = {};

document.addEventListener('keydown', function(e) {
  pressedKeysTracking[e.which] = true;
});

document.addEventListener('keyup', function(e) {
  delete pressedKeysTracking[e.which];
});

function handlePasteEvent(e) {
  if (pressedKeysTracking[17] && pressedKeysTracking[16] && pressedKeysTracking[86]) {
    e.preventDefault();
    document.execCommand("insertHTML", false, decodeURI(e.clipboardData.getData("Text")));
  }
};

Array.prototype.slice.call(document.querySelectorAll("div[contenteditable], input")).map(function(x){
  x.addEventListener("paste", handlePasteEvent);
  return x;
});