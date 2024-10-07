import {
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  StreamableFile,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileService } from './file.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('files')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post('upload')
  @HttpCode(200)
  @UseInterceptors(FileInterceptor('file'))
  upload(@UploadedFile() file: Express.Multer.File) {
    return this.fileService.saveFile(file);
  }

  @Get(':fileName')
  async download(@Param('fileName') fileName: string) {
    const fileStream = this.fileService.getFileByName(fileName);
    return new StreamableFile(fileStream);
  }
}
