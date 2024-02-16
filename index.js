const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// Directory paths
const inputDir = './input'; // Replace with your input directory path
const outputDir = './output'; // Replace with your output directory path
const desiredWidth = 300; // Desired width in pixels

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
}

// Read all files from the input directory
fs.readdir(inputDir, (err, files) => {
    if (err) throw err;

    // Filter SVG files
    const svgFiles = files.filter((file) => path.extname(file).toLowerCase() === '.svg');

    // Process each SVG file
    svgFiles.forEach((svgFile) => {
        const svgPath = path.join(inputDir, svgFile);
        const pngName = path.basename(svgFile, '.svg') + '.png';
        const pngPath = path.join(outputDir, pngName);
        const metadata = sharp(pngPath).metadata();

        if (metadata.width > metadata.height) {
            sharp(svgPath)
                .resize(desiredWidth)
                .toFile(pngPath, (err, info) => {
                    if (err) throw err;
                    console.log(`Resized and converted ${svgFile} to ${pngName}`);
                });
        } else {
            sharp(svgPath)
                .resize(null, desiredWidth)
                .toFile(pngPath, (err, info) => {
                    if (err) throw err;
                    console.log(`Resized and converted ${svgFile} to ${pngName}`);
                });
        }

        // Resize SVG to PNG
    });
});
