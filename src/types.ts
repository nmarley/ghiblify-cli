export interface GhiblifyResult {
    image: {
        url: string;
        content_type: string;
        file_name: string;
        file_size: number;
        width: number;
        height: number;
    };
}

export interface ProcessingOptions {
    seed?: number;
    enableSafetyChecker?: boolean;
}

export interface FileValidationResult {
    isValid: boolean;
    error?: string;
    size?: number;
    type?: string;
}
