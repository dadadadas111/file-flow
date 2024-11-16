import { Module } from '@nestjs/common';
import { FileTypeService } from './file-type.service';

@Module({
  providers: [FileTypeService]
})
export class FileTypeModule {}
