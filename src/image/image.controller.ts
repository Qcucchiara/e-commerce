import {
  Controller,
  UseInterceptors,
  UploadedFile,
  Post,
  Param,
  Get,
  Res,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { Response } from 'express';
import { join } from 'path';
import { existsSync, createReadStream } from 'fs';

@Controller('image')
export class ImageController {
  @Post('/src/upload/product')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: 'uploads/product',
        filename: (req, file, callback) => {
          const imageName = file.originalname.split('.');
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          callback(null, `${imageName[0]}-${uniqueSuffix}${ext}`);
        },
      }),
    }),
  )
  uploadProductImage(@UploadedFile() file: Express.Multer.File) {
    return file;
  }

  @Get('/view/:file/:filename')
  viewImage(
    @Param('file') file: string,
    @Param('filename') filename: string,
    @Res() res: Response,
  ) {
    const filePath = join(__dirname, `../../../src/uploads/${file}`, filename);
    if (existsSync(filePath)) {
      const fileStream = createReadStream(filePath);
      fileStream.pipe(res);
    } else {
      const fileStream = createReadStream(
        join(__dirname, `../../../src/uploads/default-product-image.png`),
      );
      fileStream.pipe(res);
      // res.status(404).json({ message: 'Image not found' });
    }
  }
}
