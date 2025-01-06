import { Body, Controller, Delete, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { UploadService } from "./file.service";
import { UploadFileDto } from "./dto/upload-file.dto";
import { RemoveFileResponse, UploadFileResponse } from "./interfaces";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiBearerAuth, ApiConsumes, ApiOperation, ApiTags } from "@nestjs/swagger";
import { Protected } from "src/common/decorator";
import { Roles } from "../auth/roles/RolesDecorator";
import { UserRoles } from "src/common/database/Enums";
import { RemoveFileDto } from "./dto";


@ApiTags("Upload")
@Controller('uploads')
export class UploadController {
  constructor(private service: UploadService) {}

  @ApiBearerAuth()
  @Protected(true)
  @Roles([UserRoles.ADMIN])
  @ApiOperation({ summary: 'Yangi file yaratish' })
  @ApiConsumes("multipart/form-data")
  @Post('/add')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @Body() payload: UploadFileDto,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<UploadFileResponse> {
    return await this.service.uploadFile({ ...payload, file });
  }
  @ApiBearerAuth()
  @Protected(true)
  @Roles([UserRoles.ADMIN])
  @ApiOperation({ summary: 'mavjud faylni o\'chirish' })
  @Delete('/remove')
  async removeFile(
    @Body() payload: RemoveFileDto,
  ): Promise<RemoveFileResponse> {
    return this.service.removeFile(payload);
  }
}