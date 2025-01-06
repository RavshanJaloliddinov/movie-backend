import { Module } from "@nestjs/common";
import { UploadController } from "./file.controller";
import { UploadService } from "./file.service";
 
@Module({
    controllers: [UploadController],
    providers: [UploadService]
})
export class UploadModule {}