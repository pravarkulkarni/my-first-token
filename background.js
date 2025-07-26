// Background service worker for World Clock extension

chrome.runtime.onInstalled.addListener(() => {
    console.log('World Clock extension installed');
    
    // Set default timezone to user's local timezone
    const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    chrome.storage.sync.get(['currentTimezone'], (result) => {
        if (!result.currentTimezone) {
            chrome.storage.sync.set({
                currentTimezone: userTimezone,
                savedLocations: []
            });
        }
    });
});

// Optional: Update badge with current time (commented out to avoid clutter)
/*
function updateBadge() {
    chrome.storage.sync.get(['currentTimezone'], (result) => {
        if (result.currentTimezone) {
            const now = new Date();
            const timeFormatter = new Intl.DateTimeFormat('en-US', {
                timeZone: result.currentTimezone,
                hour: '2-digit',
                minute: '2-digit',
                hour12: false
            });
            const time = timeFormatter.format(now);
            chrome.action.setBadgeText({ text: time });
            chrome.action.setBadgeBackgroundColor({ color: '#667eea' });
        }
    });
}

// Update badge every minute
setInterval(updateBadge, 60000);
updateBadge();
*/

// Handle extension icon click
chrome.action.onClicked.addListener((tab) => {
    // This won't be called since we have a popup, but keeping for completeness
    console.log('Extension icon clicked');
});