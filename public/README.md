# Favicon Generation Instructions

This directory contains SVG files that should be converted to the proper favicon formats. Follow these instructions to generate all necessary favicon files.

## Prerequisites

- Inkscape (for SVG to PNG conversion): https://inkscape.org/
- ImageMagick (for more advanced image processing): https://imagemagick.org/

## Files to Generate

From `generate-favicon.svg`, create the following files:
- favicon.ico (16x16, 32x32, 48x48)
- favicon-16x16.png
- favicon-32x32.png
- apple-touch-icon.png (180x180)
- android-chrome-192x192.png
- android-chrome-512x512.png
- mstile-150x150.png
- safari-pinned-tab.svg

From `og-image.svg`, create:
- og-image.jpg (1200x630)

## Using Inkscape for Conversion (Command Line)

```bash
# Generate PNG files at various sizes
inkscape -w 16 -h 16 generate-favicon.svg -o favicon-16x16.png
inkscape -w 32 -h 32 generate-favicon.svg -o favicon-32x32.png
inkscape -w 180 -h 180 generate-favicon.svg -o apple-touch-icon.png
inkscape -w 192 -h 192 generate-favicon.svg -o android-chrome-192x192.png
inkscape -w 512 -h 512 generate-favicon.svg -o android-chrome-512x512.png
inkscape -w 150 -h 150 generate-favicon.svg -o mstile-150x150.png

# Generate Safari pinned tab SVG (simplified outline)
inkscape --export-plain-svg safari-pinned-tab.svg generate-favicon.svg

# Generate favicon.ico (requires ImageMagick)
convert favicon-16x16.png favicon-32x32.png -colors 256 favicon.ico

# Generate og-image.jpg
inkscape -w 1200 -h 630 og-image.svg -o og-image.jpg
# Or with ImageMagick
# convert -density 96 og-image.svg og-image.jpg
```

## Alternative: Online Favicon Generators

If you don't have access to these tools, you can use online services:

1. Upload the SVG files to https://realfavicongenerator.net/ or https://favicon.io/
2. Download the generated package
3. Replace the files in this directory with the downloaded ones

Make sure to also update the site.webmanifest and browserconfig.xml files if necessary. 