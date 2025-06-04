import { fal } from '@fal-ai/client';

export async function uploadFile(filename: string): Promise<string> {
    try {
        const file = Bun.file(filename);

        if (!(await file.exists())) {
            throw new Error(`File not found: ${filename}`);
        }

        console.log(`🔄 Uploading ${filename} to Fal.ai storage...`);

        const url = await fal.storage.upload(file);

        console.log(`✅ Upload complete: ${url}`);
        return url;
    } catch (error) {
        throw new Error(
            `Upload failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
        );
    }
}
