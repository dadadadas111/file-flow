import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FileUploadModule } from './file-upload/file-upload.module';
import { FileTypeModule } from './file-type/file-type.module';
import { OperationsModule } from './operations/operations.module';
import { ResultModule } from './result/result.module';

@Module({
  imports: [FileUploadModule, FileTypeModule, OperationsModule, ResultModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
