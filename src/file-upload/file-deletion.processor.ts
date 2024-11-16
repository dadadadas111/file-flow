import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bull';
import * as fs from 'fs';

@Processor('file-deletion')
export class FileDeletionProcessor {
  @Process('deleteFile')
  async handleFileDeletion(job: Job<{ filePath: string }>) {
    const { filePath } = job.data;
    try {
      // Attempt to delete the file
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error(`Failed to delete file: ${filePath}`, err);
        } else {
          console.log(`Successfully deleted file: ${filePath}`);
        }
      });
    } catch (error) {
      console.error(`Error processing file deletion job for: ${filePath}`, error);
    }
  }
}
