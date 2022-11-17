const PrismaImage = import("@prisma/client").image

interface RequestUploadedImage extends PrismaImage {
  url: String;
}

declare namespace Express {
  export interface Request {
    uploadedImage?: RequestUploadedImage;
  }
}
