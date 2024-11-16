import { Module } from '@nestjs/common';
import { OperationsController } from './operations.controller';
import { ImageService } from './image.service';
import { VideoService } from './video.service';
import { TextService } from './text.service';

@Module({
  controllers: [OperationsController],
  providers: [ImageService, VideoService, TextService]
})
export class OperationsModule {}
