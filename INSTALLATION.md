# Installation Instructions - World Clock Chrome Extension

## Quick Start

Your Chrome extension is ready to install! Follow these steps:

### Step 1: Create Icon Files (Required)

The extension needs PNG icon files. You have a few options:

#### Option A: Use Online Converter (Easiest)
1. Go to any online SVG to PNG converter (e.g., convertio.co, cloudconvert.com)
2. Upload the `icons/icon.svg` file
3. Convert to PNG in these sizes:
   - 16x16 pixels → save as `icons/icon16.png`
   - 48x48 pixels → save as `icons/icon48.png`
   - 128x128 pixels → save as `icons/icon128.png`

#### Option B: Use Graphics Software
1. Open `icons/icon.svg` in GIMP, Photoshop, or any graphics editor
2. Export/Save as PNG in the three required sizes above

#### Option C: Install Tools and Use Script
```bash
# Ubuntu/Debian
sudo apt install imagemagick
# or
sudo apt install inkscape

# macOS
brew install imagemagick
# or  
brew install inkscape

# Then run:
./create-icons.sh
```

### Step 2: Install in Chrome

1. Open Google Chrome
2. Navigate to `chrome://extensions/`
3. Toggle "Developer mode" ON (top right corner)
4. Click "Load unpacked"
5. Select this extension folder
6. The World Clock extension will appear in your toolbar!

### Step 3: Start Using

1. Click the World Clock icon in your browser toolbar
2. Select a timezone from the dropdown
3. Save your favorite locations
4. Enjoy real-time world clock updates!

## Troubleshooting

**Extension won't load?**
- Make sure all PNG icon files are present in the `icons/` folder
- Check that Developer mode is enabled
- Try refreshing the extension in chrome://extensions/

**Icons not showing?**
- Verify PNG files are properly named (icon16.png, icon48.png, icon128.png)
- Make sure PNG files are not corrupted

**Time not updating?**
- Check if the selected timezone is valid
- Try selecting a different timezone
- Refresh the popup by closing and reopening it

## Files You Should Have

```
world-clock-extension/
├── manifest.json
├── popup.html
├── popup.css  
├── popup.js
├── background.js
├── icons/
│   ├── icon.svg         ✓ (provided)
│   ├── icon16.png       ⚠ (create this)
│   ├── icon48.png       ⚠ (create this)
│   └── icon128.png      ⚠ (create this)
├── create-icons.sh      ✓ (helper script)
├── README.md            ✓ (documentation)
└── INSTALLATION.md      ✓ (this file)
```

✅ **Ready to install once PNG icons are created!**