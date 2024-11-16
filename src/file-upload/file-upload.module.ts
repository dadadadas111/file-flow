import { Module } from '@nestjs/common';
import { FileUploadController } from './file-upload.controller';
import { FileUploadService } from './file-upload.service';
import { BullModule } from '@nestjs/bull';
import { FileCleanupService } from 'src/file-upload/file-cleanup.service';
import { FileDeletionProcessor } from 'src/file-upload/file-deletion.processor';

@Module({
  imports: [BullModule.registerQueue({
    name: 'file-deletion',
  })],
  controllers: [FileUploadController],
  providers: [FileUploadService, FileCleanupService, FileDeletionProcessor]
})
export class FileUploadModule { }
