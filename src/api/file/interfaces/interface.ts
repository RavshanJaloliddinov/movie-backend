export declare interface RemoveFileRequest {
    fileName: string;
}

export declare interface RemoveFileResponse {
    message: string;
}

export declare interface UploadFileRequest {
    file: Express.Multer.File;
    destination: string;
}

export declare interface UploadFileResponse {
    message: string;
    fileUrl: string;
}  