import { processImage } from './src/services/ghiblify-service';
import { parseArguments } from './src/utils/cli-parser';
import { validateEnvironment } from './src/utils/environment';
import { downloadAndSaveResult } from './src/utils/file-downloader';
import { uploadFile } from './src/utils/file-uploader';
import { validateFile } from './src/utils/file-validator';

async function main() {
    try {
        validateEnvironment();

        const filename = parseArguments();

        console.log(`🔄 Loading ${filename}...`);

        const validation = await validateFile(filename);
        if (!validation.isValid) {
            console.error(`❌ ${validation.error}`);
            process.exit(1);
        }

        const sizeInMB = (validation.size! / 1024 / 1024).toFixed(1);
        const fileType = validation.type?.toUpperCase().substring(1);
        console.log(`✅ File validated (${sizeInMB}MB ${fileType})`);

        const imageUrl = await uploadFile(filename);

        const result = await processImage(imageUrl);

        const outputPath = await downloadAndSaveResult(
            result.image.url,
            filename,
        );

        console.log('🎨 Your Studio Ghibli artwork is ready!');
        console.log(`📁 Output: ${outputPath}`);
        console.log(
            `📊 Dimensions: ${result.image.width}x${result.image.height}`,
        );
        console.log(
            `📦 Size: ${(result.image.file_size / 1024 / 1024).toFixed(1)}MB`,
        );
    } catch (error) {
        console.error(
            `❌ Error: ${error instanceof Error ? error.message : 'Unknown error'}`,
        );
        process.exit(1);
    }
}

main();
