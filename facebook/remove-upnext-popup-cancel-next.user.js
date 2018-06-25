// ==UserScript==
// @name         Remove Facebook Play Next Popup
// @description  Removes the annoying UP NEXT popup from Facebook videos and cancels the next video play automatically.
// @version      0.1.1
// @author       Ariel Jannai
// @namespace    https://github.com/arieljannai/tampermonkey-scripts
// @supportURL   https://github.com/arieljannai/tampermonkey-scripts/issues
// @updateURL    https://github.com/arieljannai/tampermonkey-scripts/raw/master/facebook/remove-upnext-popup-cancel-next.user.js
// @downloadURL  https://github.com/arieljannai/tampermonkey-scripts/raw/master/facebook/remove-upnext-popup-cancel-next.user.js
// @match        https://www.facebook.com/*/videos/*
// @require      https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js
// @grant        none
// @license      MIT
// ==/UserScript==

'use strict';

(function waitForUpNextToDisaply() {
    var selector = $("div:contains('UP NEXT')").eq(-8)
    if(selector.length === 1) {
        // remove the popup and cancel the play next
        selector.remove();
        console.log('popup removed!');
        return;
    }
    else {
        setTimeout(function() {
            waitForUpNextToDisaply();
        }, 500);
    }
})();