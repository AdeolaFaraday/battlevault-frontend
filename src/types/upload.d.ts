type TUploadedFile = {
    url: string;
    fileName: string;
}

type TUploadFileResponse = {
    statusCode: number;
    success: boolean;
    message: string;
    data?: TUploadedFile;
}

type TUploadFileVariables = {
    file: File | Blob | null;
    folder?: string;
}
