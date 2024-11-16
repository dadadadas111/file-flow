export enum SupportedFileExtensions {
    JPEG = 'jpeg',
    JPG = 'jpg',
    PNG = 'png',
    GIF = 'gif',
    // Add more as needed
}

export enum ImageExtensions {
    JPEG = 'jpeg',
    JPG = 'jpg',
    PNG = 'png',
    WEBP = 'webp',
    AVIF = 'avif',
    TIFF = 'tiff',
    GIF = 'gif',
    // Add more as needed
}

export const FileOperationsMap = {
    [SupportedFileExtensions.JPEG]: ['resize', 'compress'],
    [SupportedFileExtensions.JPG]: ['resize', 'compress'],
    [SupportedFileExtensions.PNG]: ['resize', 'compress'],
    [SupportedFileExtensions.GIF]: ['resize'],
    // Extend as needed
};
