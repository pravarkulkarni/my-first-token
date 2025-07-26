#!/bin/bash

# Script to create PNG icons from SVG for Chrome extension
# Requires imagemagick or inkscape to be installed

echo "Creating Chrome extension icons from SVG..."

if command -v inkscape &> /dev/null; then
    echo "Using Inkscape to convert SVG to PNG..."
    inkscape icons/icon.svg -w 16 -h 16 -o icons/icon16.png
    inkscape icons/icon.svg -w 48 -h 48 -o icons/icon48.png
    inkscape icons/icon.svg -w 128 -h 128 -o icons/icon128.png
    echo "Icons created successfully using Inkscape!"
elif command -v convert &> /dev/null; then
    echo "Using ImageMagick to convert SVG to PNG..."
    convert -background transparent icons/icon.svg -resize 16x16 icons/icon16.png
    convert -background transparent icons/icon.svg -resize 48x48 icons/icon48.png
    convert -background transparent icons/icon.svg -resize 128x128 icons/icon128.png
    echo "Icons created successfully using ImageMagick!"
else
    echo "❌ Neither Inkscape nor ImageMagick found."
    echo "Please install one of them to convert SVG to PNG:"
    echo ""
    echo "Ubuntu/Debian:"
    echo "  sudo apt install inkscape"
    echo "  # or"
    echo "  sudo apt install imagemagick"
    echo ""
    echo "macOS:"
    echo "  brew install inkscape"
    echo "  # or"
    echo "  brew install imagemagick"
    echo ""
    echo "Alternatively, you can:"
    echo "1. Open icons/icon.svg in any graphics editor"
    echo "2. Export as PNG in sizes 16x16, 48x48, and 128x128"
    echo "3. Save as icon16.png, icon48.png, and icon128.png in the icons/ folder"
    echo ""
    echo "Or use an online SVG to PNG converter."
    exit 1
fi

echo ""
echo "✅ All icon files created:"
echo "  - icons/icon16.png (16x16)"
echo "  - icons/icon48.png (48x48)"  
echo "  - icons/icon128.png (128x128)"
echo ""
echo "Your Chrome extension is now ready to install!"