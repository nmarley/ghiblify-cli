export function validateEnvironment(): void {
    if (!process.env.FAL_KEY) {
        console.error('❌ Error: FAL_KEY environment variable is required');
        console.error('Please set FAL_KEY in your .env file');
        process.exit(1);
    }
}
