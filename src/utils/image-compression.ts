/**
 * Compresses an image file to ensure its size is below the specified max megabytes.
 * It uses the Canvas API to resize and adjust Image quality.
 * 
 * @param file The original image file
 * @param maxSizeMB The maximum size in megabytes (default: 1)
 * @param maxWidth The maximum width of the image (default: 1920)
 * @param maxHeight The maximum height of the image (default: 1080)
 * @returns A promise that resolves to the compressed File
 */
export const compressImage = async (
    file: File,
    maxSizeMB: number = 1,
    maxWidth: number = 1920,
    maxHeight: number = 1080
): Promise<File> => {
    // Return early if file is not an image
    if (!file.type.startsWith('image/')) {
        return file;
    }

    // Only process PNG, JPEG, WEBP. If SVG or GIF, returning original is safer.
    if (file.type === 'image/gif' || file.type === 'image/svg+xml') {
        return file;
    }

    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = (event) => {
            const img = new Image();
            img.src = event.target?.result as string;

            img.onload = () => {
                const canvas = document.createElement('canvas');
                let width = img.width;
                let height = img.height;

                // Adjust dimensions if they exceed the max width/height
                if (width > maxWidth || height > maxHeight) {
                    const ratio = Math.min(maxWidth / width, maxHeight / height);
                    width = width * ratio;
                    height = height * ratio;
                }

                canvas.width = Math.floor(width);
                canvas.height = Math.floor(height);

                const ctx = canvas.getContext('2d');
                if (!ctx) {
                    reject(new Error("Failed to get canvas context"));
                    return;
                }

                // Fill background with white in case of transparent PNG converting to JPEG
                if (file.type === 'image/png') {
                    ctx.fillStyle = "#FFFFFF";
                    ctx.fillRect(0, 0, canvas.width, canvas.height);
                }

                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

                // Default output format (converting PNGs to JPEG for better compression sizes usually)
                const outputType = (file.type === 'image/png' || file.type === 'image/webp') ? 'image/jpeg' : file.type;

                const getBlob = (quality: number): Promise<Blob | null> => {
                    return new Promise((resolveBlob) => {
                        canvas.toBlob(resolveBlob, outputType, quality);
                    });
                };

                const compress = async () => {
                    let quality = 0.9;
                    let compressedBlob = await getBlob(quality);
                    const maxSizeBytes = maxSizeMB * 1024 * 1024;

                    // Reduce quality until size is under limit or quality is very low
                    while (compressedBlob && compressedBlob.size > maxSizeBytes && quality > 0.1) {
                        quality -= 0.1;
                        compressedBlob = await getBlob(quality);
                    }

                    if (!compressedBlob) {
                        reject(new Error("Image compression failed"));
                        return;
                    }

                    // Create a new File from the blob. 
                    const fileName = file.name.replace(/\.[^/.]+$/, "") + ".jpg"; // Rename extension correctly
                    const compressedFile = new File([compressedBlob], file.type !== outputType ? fileName : file.name, {
                        type: outputType,
                        lastModified: Date.now(),
                    });

                    // If the compressed file is somehow larger (happens with small files), use original
                    if (compressedFile.size > file.size && file.size <= maxSizeBytes) {
                        resolve(file);
                    } else {
                        resolve(compressedFile);
                    }
                };

                compress().catch(reject);
            };

            img.onerror = (error) => reject(new Error(`Failed to load image for compression: ${error}`));
        };

        reader.onerror = (error) => reject(new Error(`Failed to read file: ${error}`));
    });
};
