import { Injectable } from '@nestjs/common';
import { createReadStream, mkdirSync, writeFileSync } from 'fs';
import { join } from 'path';

@Injectable()
export class FileService {
  private readonly uploadPath = join(__dirname, '..', '..', 'uploads');
  constructor() {
    mkdirSync(this.uploadPath, { recursive: true });
  }

  saveFile(file: Express.Multer.File) {
    const fileName = Buffer.from(file.originalname, 'latin1').toString('utf-8');
    const filePath = join(this.uploadPath, fileName);
    writeFileSync(filePath, file.buffer);
    return { name: fileName, size: file.size };
  }

  getFileByName(fileName: string) {
    const filePath = join(this.uploadPath, fileName);
    return createReadStream(filePath);
  }
}
