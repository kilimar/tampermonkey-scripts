// ==UserScript==
// @name         Link Avnei Pina To Sylabus
// @namespace    https://github.com/arieljannai
// @version      0.1
// @description  Adds hyperlinks to the course number in the avnei pina table, that will point to the course sylabus page.
// @author       Ariel Jannai
// @match        *://ap.huji.ac.il/apcourses
// @icon         http://ap.huji.ac.il/sites/all/themes/harp/favicon.ico
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    var courseNumbers = document.getElementsByClassName('views-field-field-course-number');

    for (var i = 1; i < courseNumbers.length; i++) {
        courseNumbers[i].innerHTML = "<a href=http://shnaton.huji.ac.il/index.php/NewSyl/" +
            courseNumbers[i].innerText + ">" + courseNumbers[i].innerHTML + "</a>";
    }

})();
