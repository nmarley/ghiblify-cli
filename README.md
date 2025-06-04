# Ghiblify CLI

Transform your ordinary photos into enchanting Studio Ghibli style artwork using Fal.ai's Ghiblify API.

## Setup

1. Ensure you have your FAL API key set in your `.env` file:
   ```
   FAL_KEY=your_api_key_here
   ```

2. Install dependencies (already done):
   ```bash
   bun install
   ```

## Usage

```bash
bun index.ts <image-file>
```

### Examples

```bash
# Process a single image
bun index.ts photo.jpg

# Multiple files provided (only first will be processed)
bun index.ts image1.jpg image2.png image3.gif
```

## Supported Formats

- JPEG (.jpg, .jpeg)
- PNG (.png)
- WebP (.webp)
- GIF (.gif)
- BMP (.bmp)

## File Size Limit

Maximum file size: 50MB

## Output

Generated images are saved in the `./output/` directory with the naming pattern:
```
ghiblified_<original_filename>.png
```

## Architecture

The application follows a clean architecture with separation of concerns:

- `src/types.ts` - Type definitions
- `src/utils/` - Utility functions (validation, upload, download, CLI parsing)
- `src/services/` - API service layer
- `index.ts` - Main application orchestration

## Error Handling

The tool handles various error scenarios:
- Missing or invalid files
- Unsupported file formats
- File size limits
- Network issues
- API errors
- Missing environment variables

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
