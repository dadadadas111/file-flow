import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import * as fs from 'fs';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileCleanupService } from 'src/file-upload/file-cleanup.service';

@Controller('file-upload')
export class FileUploadController {
    constructor(private readonly fileCleanupService: FileCleanupService) { }

    @Post('upload')
    @UseInterceptors(FileInterceptor('file'))
    async uploadFile(@UploadedFile() file: Express.Multer.File) {
        try {
            if (!file) {
                throw new Error('No file uploaded');
            }
            const encodedName = encodeURI(file.originalname);
            const time = new Date().getTime();
            // write file to uploads folder
            fs.writeFileSync(`uploads/${time}-${encodedName}`, file.buffer);

            // Perform operations on the uploaded file
            const filePath = `uploads/${time}-${encodedName}`;

            // Schedule file deletion after a fixed delay
            await this.fileCleanupService.scheduleFileDeletion(filePath, 30 * 60 * 1000); // 30 mins delay

            // Return a response to the client
            return { message: 'File uploaded and scheduled for deletion', filePath };
        } catch (error) {
            return { message: 'Error processing file', error: error.message };
        }
    }
}
