import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FileUploadModule } from './file-upload/file-upload.module';
import { FileTypeModule } from './file-type/file-type.module';
import { OperationsModule } from './operations/operations.module';
import { ResultModule } from './result/result.module';
import { BullModule } from '@nestjs/bull';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    FileUploadModule, 
    FileTypeModule, 
    OperationsModule, 
    ResultModule,
    BullModule.forRoot({
      redis: {
        host: (process.env.REDIS_CONNECTION as string).split(':')[0],
        port: parseInt((process.env.REDIS_CONNECTION as string).split(':')[1]),
        password: process.env.REDIS_PASSWORD,
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
