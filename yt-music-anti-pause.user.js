// ==UserScript==
// @name         YouTube Music Anti-Pause
// @namespace    http://tampermonkey.net/
// @version      2.0
// @description  Automatically clicks the "Are you still listening?" prompt on YouTube Music.
// @author       Jenish Mangukiya
// @match        https://music.youtube.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=youtube.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    console.log('[AutoContinue] Script loaded');

    function clickYT() {
        const btn = document.querySelector('.ytp-keep-playing-button.ytp-button');
        if (btn) {
            console.log('[AutoContinue] Clicked YouTube continue');
            btn.click();
        }
    }

    function clickYTMusic() {
        document.querySelectorAll('ytmusic-you-there-renderer button').forEach(btn => {
            if (/yes/i.test(btn.innerText.trim())) {
                console.log('[AutoContinue] Clicked YT Music continue');
                btn.click();
            }
        });
    }

    function checkContinue() {
        clickYT();
        clickYTMusic();
    }

    const observer = new MutationObserver(checkContinue);
    observer.observe(document.body, {childList: true, subtree: true});

    setInterval(checkContinue, 3000);

    document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'hidden' || document.visibilityState === 'visible') {
            console.log('[AutoContinue] Visibility changed → ' + document.visibilityState);
            checkContinue();
        }
    });
})();
