import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

@Injectable()
export class FileCleanupService {
  constructor(@InjectQueue('file-deletion') private readonly fileDeletionQueue: Queue) {}

  async scheduleFileDeletion(filePath: string, delay: number) {
    await this.fileDeletionQueue.add('deleteFile', { filePath }, { delay, removeOnComplete: true });
  }
}
