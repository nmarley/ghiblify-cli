import { existsSync, statSync } from 'node:fs';
import type { FileValidationResult } from '../types';

const SUPPORTED_FORMATS = ['.jpg', '.jpeg', '.png', '.webp', '.gif', '.bmp'];
const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB

export async function validateFile(
    filename: string,
): Promise<FileValidationResult> {
    try {
        if (!existsSync(filename)) {
            return {
                isValid: false,
                error: `File not found: ${filename}`,
            };
        }

        const stats = statSync(filename);

        if (!stats.isFile()) {
            return {
                isValid: false,
                error: `Path is not a file: ${filename}`,
            };
        }

        if (stats.size > MAX_FILE_SIZE) {
            return {
                isValid: false,
                error: `File too large: ${(stats.size / 1024 / 1024).toFixed(1)}MB (max 50MB)`,
            };
        }

        const extension = filename
            .toLowerCase()
            .substring(filename.lastIndexOf('.'));
        if (!SUPPORTED_FORMATS.includes(extension)) {
            return {
                isValid: false,
                error: `Unsupported format: ${extension}. Supported: ${SUPPORTED_FORMATS.join(', ')}`,
            };
        }

        return {
            isValid: true,
            size: stats.size,
            type: extension,
        };
    } catch (error) {
        return {
            isValid: false,
            error: `Error validating file: ${error instanceof Error ? error.message : 'Unknown error'}`,
        };
    }
}
