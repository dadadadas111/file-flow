import { Module } from '@nestjs/common';
import { OperationsController } from './operations.controller';
import { OperationsService } from './operations.service';
import { FileUploadModule } from 'src/file-upload/file-upload.module';

@Module({
  controllers: [OperationsController],
  providers: [OperationsService],
  imports: [FileUploadModule],
})
export class OperationsModule {}
