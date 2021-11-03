import { Module } from '@nestjs/common';
import { FilesController } from './files.controller';
import { FilesService } from './files.service';
import { MulterModule } from '@nestjs/platform-express';
import dayjs = require('dayjs');
import { diskStorage } from 'multer';
import * as nuid from 'nuid';
import * as path from 'path';
@Module({
  imports: [
    MulterModule.register({
      storage: diskStorage({
        destination: `./static/${dayjs().format('YYYY-MM-DD')}`,
        filename: (req, file, cb) => {
          // 自定义文件名
          const filename = `${nuid.next()}`;
          return cb(null, `${filename}-${file.originalname}`);
          // return cb(null, file.originalname);
        },
      }),
    }),
  ],
  controllers: [FilesController],
  providers: [FilesService],
})
export class FilesModule {}