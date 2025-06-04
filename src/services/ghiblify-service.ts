import { fal } from '@fal-ai/client';
import type { GhiblifyResult, ProcessingOptions } from '../types';

export async function processImage(
    imageUrl: string,
    options: ProcessingOptions = {},
): Promise<GhiblifyResult> {
    try {
        console.log('🔄 Processing with Ghiblify AI...');

        const result = await fal.subscribe('fal-ai/ghiblify', {
            input: {
                image_url: imageUrl,
                seed: options.seed,
                enable_safety_checker: options.enableSafetyChecker ?? true,
            },
            logs: true,
            onQueueUpdate: (update) => {
                if (update.status === 'IN_PROGRESS') {
                    for (const log of update.logs) {
                        const message = log.message;
                        console.log(`📝 [LOG] ${message}`);
                    }
                }
            },
        });

        console.log('✅ Ghiblification complete!');
        return result.data as GhiblifyResult;
    } catch (error) {
        throw new Error(
            `Ghiblify processing failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
        );
    }
}
