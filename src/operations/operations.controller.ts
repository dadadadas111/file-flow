import { Body, Controller, Post } from '@nestjs/common';
import * as path from 'path';
import * as sharp from 'sharp';
import * as fs from 'fs';
import { OperationsService } from 'src/operations/operations.service';
import { FileCleanupService } from 'src/file-upload/file-cleanup.service';

@Controller('operations')
export class OperationsController {
    constructor(private readonly fileOperationsService: OperationsService,
        private readonly fileCleanupService: FileCleanupService
    ) { }

    @Post('supported')
    getSupportedOperations(@Body('extension') extension: string) {
        const operations = this.fileOperationsService.getSupportedOperations(extension);
        const extensionType = this.fileOperationsService.getExtensionType(extension);
        return { extension, operations, extensionType };
    }

    @Post('process-image')
    async processImage(
        @Body('filePath') filePath: string,
        @Body('operation') operation: string,
        @Body('options') options: any
    ) {
        try {
            // Ensure filePath starts with 'uploads/'
            if (!filePath.startsWith('uploads/')) {
                throw new Error("Invalid file path. It must start with 'uploads/'");
            }

            const fileExtension = path.extname(filePath).toLowerCase();
            const fileName = path.basename(filePath, fileExtension);

            // Construct output file path in 'results/' directory
            const outputFilePath = `results/${fileName}${fileExtension}`;

            // Perform the requested operation using sharp
            let image = sharp(filePath);
            switch (operation) {
                case 'resize':
                    if (options.width && options.height) {
                        image = image.resize(parseInt(options.width), parseInt(options.height));
                    }
                    break;
                case 'compress':
                    image = image.jpeg({ quality: options.quality || 80 });
                    break;
                default:
                    throw new Error('Unsupported operation');
            }

            // Ensure 'results/' directory exists
            if (!fs.existsSync('results')) {
                fs.mkdirSync('results');
            }

            // Save the processed image to 'results/' directory
            await image.toFile(outputFilePath);

            await this.fileCleanupService.scheduleFileDeletion(outputFilePath, 30 * 60 * 1000); // 30 mins delay

            return {
                message: 'File processed successfully',
                result: `results/${path.basename(outputFilePath)}`,
            };
        } catch (error) {
            console.error('Error processing file:', error);
            return {
                message: 'Error processing file',
                error: error.message,
            };
        }
    }
}
