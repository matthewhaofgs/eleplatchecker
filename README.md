# Elethor Recyclobot Checker

## Overview

The Elethor Recyclobot Checker is a Tampermonkey script designed to monitor the `plat_purchased_today` value from the Recyclobot API on [Elethor](https://elethor.com). If the value is `0`, the script will make the "Character" button on the Elethor website flash red as an alert. The script runs automatically when you visit any page on Elethor and continues to check the value at regular intervals.

## Features

- **Automatic API Checks**: The script automatically checks the Recyclobot API when the page loads and every 10 minutes thereafter.
- **Visual Alert**: If `plat_purchased_today` equals `0`, the "Character" button flashes red to alert the user.
- **Rate Limiting**: The script includes a rate-limiting mechanism to avoid excessive checks and console logging due to frequent page updates.
- **Mutation Observer**: The script watches for changes to the webpage and checks the "Character" button whenever the page updates.

## Installation

### Prerequisites

- **Browser**: You need a browser that supports user scripts, such as Google Chrome or Firefox.
- **Tampermonkey**: Install the Tampermonkey extension in your browser.

### Steps

1. **Install Tampermonkey**:
   - [Tampermonkey for Chrome](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo)
   - [Tampermonkey for Firefox](https://addons.mozilla.org/en-US/firefox/addon/tampermonkey/)

2. **Install the Script**:
   - Click on the Tampermonkey icon in your browser and select `Create a new script...`.
   - Copy and paste the contents of `elethor-recyclobot-checker.user.js` into the editor.
   - Save the script.

3. **Visit Elethor**:
   - Navigate to any page on [Elethor](https://elethor.com).
   - The script will automatically start checking the Recyclobot API.

## Configuration

### Rate Limiting

The script checks the "Character" button on the page whenever there is a change. By default, it rate-limits these checks to once every 5 seconds. You can adjust this interval by modifying the `RATE_LIMIT_INTERVAL` variable in the script.

```javascript
const RATE_LIMIT_INTERVAL = 5000; // 5 seconds
