import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';
import * as uuid from 'uuid';

@Injectable()
export class FilesService {
  async createFile(
    service: string,
    file: Express.Multer.File,
    grAlias = 'gr',
  ): Promise<string> {
    try {
      console.log(file);
      const fileName =
        `/${grAlias}/${service}/` +
        uuid.v4() +
        `.${file.originalname.split('.').pop()}`;
      let filePath = '';
      process.env.NODE_ENV === 'development'
        ? (filePath =
            'C:\\Users\\n7700-01-144\\Desktop\\gitea\\intranet\\server\\upload')
        : (filePath = '/home');
      if (!fs.existsSync(`${filePath}/gr/${service}`)) {
        fs.mkdirSync(`${filePath}/gr/${service}`, { recursive: true });
      }
      fs.writeFileSync(path.join(filePath, fileName), file.buffer);
      return fileName;
    } catch (e) {
      throw new HttpException(
        `Произошла ошибка при записи файла:${e}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
