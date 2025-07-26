# World Clock Chrome Extension

A beautiful Chrome extension that displays the current time in configurable timezone locations around the world.

## Features

- 🌍 **Multiple Timezone Support**: Choose from popular timezones worldwide
- ⏰ **Real-time Updates**: Clock updates every second
- 💾 **Save Locations**: Save your favorite locations for quick access
- 🎨 **Beautiful UI**: Modern, gradient-based design with smooth animations
- ⚡ **Fast Performance**: Lightweight and responsive

## Installation

### From Source
1. Clone or download this repository
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" in the top right
4. Click "Load unpacked" and select the extension folder
5. The World Clock extension will appear in your extensions toolbar

### Creating Icons (Optional)
The extension references PNG icons that need to be created from the provided SVG:
1. Convert `icons/icon.svg` to PNG format in these sizes:
   - `icons/icon16.png` (16x16)
   - `icons/icon48.png` (48x48) 
   - `icons/icon128.png` (128x128)

You can use online SVG to PNG converters or tools like Inkscape.

## Usage

1. Click the World Clock extension icon in your browser toolbar
2. Select a timezone from the dropdown menu
3. The current time and date will be displayed for that location
4. Click "Save Location" to add it to your saved locations list
5. Click on any saved location to quickly switch to that timezone
6. Use the "×" button to remove saved locations

## Supported Timezones

The extension includes popular timezones from:
- **Americas**: New York, Los Angeles, Chicago, Toronto, São Paulo, etc.
- **Europe**: London, Paris, Berlin, Amsterdam, Rome, etc.
- **Asia**: Tokyo, Shanghai, Mumbai, Singapore, Dubai, etc.
- **Africa & Oceania**: Cairo, Lagos, Sydney, Auckland, etc.

## Technical Details

- **Manifest Version**: 3 (latest Chrome extension standard)
- **Permissions**: Storage (for saving preferences)
- **Storage**: Chrome Sync Storage (settings sync across devices)
- **Updates**: Real-time clock with 1-second intervals
- **Timezone Handling**: Uses JavaScript Intl.DateTimeFormat API

## Files Structure

```
world-clock-extension/
├── manifest.json          # Extension configuration
├── popup.html             # Main popup interface
├── popup.css              # Styling for the popup
├── popup.js               # Main functionality
├── background.js          # Background service worker
├── icons/
│   ├── icon.svg          # Source SVG icon
│   ├── icon16.png        # 16x16 icon (to be created)
│   ├── icon48.png        # 48x48 icon (to be created)
│   └── icon128.png       # 128x128 icon (to be created)
└── README.md             # This file
```

## Development

To modify the extension:
1. Make your changes to the source files
2. Go to `chrome://extensions/`
3. Click the refresh icon on the World Clock extension
4. Test your changes

## Browser Compatibility

- Chrome 88+ (Manifest V3 support)
- Chromium-based browsers (Edge, Brave, etc.)

## License

MIT License - see LICENSE file for details.
