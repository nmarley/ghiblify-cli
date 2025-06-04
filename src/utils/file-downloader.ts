import { existsSync, mkdirSync } from 'node:fs';
import { basename, dirname, extname } from 'node:path';

export async function downloadAndSaveResult(
    resultUrl: string,
    originalFilename: string,
): Promise<string> {
    try {
        const outputDir = './output';

        if (!existsSync(outputDir)) {
            mkdirSync(outputDir, { recursive: true });
        }

        const originalName = basename(
            originalFilename,
            extname(originalFilename),
        );
        const outputFilename = `${outputDir}/ghiblified_${originalName}.png`;

        console.log('💾 Downloading result...');

        const response = await fetch(resultUrl);
        if (!response.ok) {
            throw new Error(
                `Failed to download: ${response.status} ${response.statusText}`,
            );
        }

        const arrayBuffer = await response.arrayBuffer();
        await Bun.write(outputFilename, arrayBuffer);

        console.log(`💾 Saved: ${outputFilename}`);
        return outputFilename;
    } catch (error) {
        throw new Error(
            `Download failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
        );
    }
}
