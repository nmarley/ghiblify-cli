export function parseArguments(): string {
    const args = process.argv.slice(2);

    if (args.length === 0) {
        console.error('❌ Error: Please provide at least one image file');
        console.error('Usage: bun index.ts <image-file>');
        console.error('Example: bun index.ts photo.jpg');
        process.exit(1);
    }

    const filename = args[0]!;

    if (args.length > 1) {
        console.log(
            `ℹ️  Multiple files provided, processing only the first: ${filename}`,
        );
    }

    return filename;
}
