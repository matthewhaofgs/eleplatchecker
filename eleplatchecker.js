// ==UserScript==
// @name         Elethor Recyclobot Checker
// @namespace    http://tampermonkey.net/
// @version      1.3
// @description  Checks the plat_purchased_today value and flashes the Character element if it's 0, with rate limiting
// @author       Your Name
// @match        https://elethor.com/*
// @grant        none
// @run-at       document-idle
// ==/UserScript==

(function() {
    'use strict';

    let platPurchasedToday = null;
    let lastChecked = 0;
    const RATE_LIMIT_INTERVAL = 5000; // 5 seconds

    const checkRecyclobot = async () => {
        try {
            const response = await fetch('https://elethor.com/game/companions/recyclobot', {
                method: 'GET',
                credentials: 'same-origin',
                headers: {
                    'X-Requested-With': 'XMLHttpRequest'
                }
            });
            const data = await response.json();
            platPurchasedToday = data.recyclobot.model.plat_purchased_today;

            // Log the value of plat_purchased_today to the console
            console.log('plat_purchased_today:', platPurchasedToday);

            // Check for the Character button and apply the flashing effect if needed
            checkCharacterButton();
        } catch (error) {
            console.error('Error checking Recyclobot:', error);
        }
    };

    const checkCharacterButton = () => {
        const now = Date.now();
        if (now - lastChecked < RATE_LIMIT_INTERVAL) {
            return; // Skip the check if the rate limit interval hasn't passed
        }
        lastChecked = now;

        const elements = document.querySelectorAll('a span.subtitle.is-6');
        for (let element of elements) {
            if (element.textContent.includes("Character")) {
                if (platPurchasedToday === 0) {
                    element.style.animation = 'flash 1s infinite';
                    console.log('Character button found and flashing red.');
                } else {
                    element.style.animation = '';
                    console.log('Character button found but no flashing needed.');
                }

                // Add the flash animation using keyframes
                const style = document.createElement('style');
                style.type = 'text/css';
                style.innerHTML = `@keyframes flash {
                    0% { background-color: red; }
                    50% { background-color: transparent; }
                    100% { background-color: red; }
                }`;
                document.getElementsByTagName('head')[0].appendChild(style);

                break;
            }
        }
    };

    const observePageChanges = () => {
        const observer = new MutationObserver(checkCharacterButton);
        observer.observe(document.body, { childList: true, subtree: true });
    };

    // Run the check when the page loads
    checkRecyclobot();

    // Set an interval to check every 10 minutes
    setInterval(checkRecyclobot, 10 * 60 * 1000);

    // Observe changes to the page to check for the Character button
    observePageChanges();
})();
