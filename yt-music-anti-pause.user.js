// ==UserScript==
// @name         YouTube Music Anti-Pause
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Automatically clicks the "Are you still listening?" prompt on YouTube Music.
// @author       Jenish Mangukiya
// @match        https://music.youtube.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=youtube.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    setInterval(function() {
        const youThereRenderer = document.querySelector('ytmusic-you-there-renderer');
        const confirmButton = document.querySelector('ytmusic-you-there-renderer .yt-button-renderer') || 
                              document.querySelector('tp-yt-paper-dialog yt-button-renderer[dialog-confirm]');

        if (confirmButton && confirmButton.offsetParent !== null) { 
            confirmButton.click();
            console.log("Anti-Pause: Automatically clicked 'Continue listening'.");
            
            setTimeout(() => {
                const video = document.querySelector('video');
                const playButton = document.querySelector('#play-pause-button');
                if (video && video.paused && playButton) {
                    playButton.click();
                    console.log("Anti-Pause: Resumed playback.");
                }
            }, 500);
        }
    }, 5000); 
})();