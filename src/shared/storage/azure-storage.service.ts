import { Injectable } from '@nestjs/common';
import { BlobServiceClient, BlockBlobClient } from '@azure/storage-blob';
import { createReadStream } from 'fs';
import { unlink } from 'fs/promises';
import * as sharp from 'sharp'; 
import { SuccessResponse } from '../dto/success-response.dto'; 
import { ErrorResponse } from '../dto/error-response.dto'; 

export interface UploadFileOptions {
  filePath: string;
  blobName: string;
  containerName: string;
  contentType?: string;
  maxWidth?: number;  
  maxHeight?: number; 
}

@Injectable()
export class AzureStorageService {
  private readonly blobServiceClient: BlobServiceClient;

  constructor() {
    const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING;
    this.blobServiceClient = BlobServiceClient.fromConnectionString(connectionString!);
  }

  async uploadFile(options: UploadFileOptions) {
    try {
      const containerClient = this.blobServiceClient.getContainerClient(options.containerName);

      const exists = await containerClient.exists();
      if (!exists) {
        await containerClient.create({ access: 'blob' });
      }

      let processedImagePath = options.filePath;
      if (options.maxWidth || options.maxHeight) {
        processedImagePath = await this.resizeImage(options);
      }

      const blobClient: BlockBlobClient = containerClient.getBlockBlobClient(options.blobName);
      const stream = createReadStream(processedImagePath);
      await blobClient.uploadStream(stream, undefined, undefined, {
        blobHTTPHeaders: {
          blobContentType: options.contentType || 'application/octet-stream',
        },
      });

      try {
        await unlink(options.filePath);
        console.log(`Successfully deleted the temp file: ${options.filePath}`);

        if (processedImagePath !== options.filePath) {
          await unlink(processedImagePath);
          console.log(`Successfully deleted the resized temp file: ${processedImagePath}`);
        }
      } catch (err) {
        console.warn(`Failed to delete temp file: ${options.filePath}`, err);
      }

      const response = new SuccessResponse(
        {
          url: blobClient.url,
          blobName: options.blobName,
          containerName: options.containerName,
        },
        'File uploaded successfully',
      );

      return response;

    } catch (error) {
      console.error('Failed to upload file:', error);

      const errorResponse = new ErrorResponse('Failed to upload file', [error.message], 500);
      return errorResponse;
    }
  }

  private async resizeImage(options: UploadFileOptions): Promise<string> {
    const outputFilePath = `resized-${Date.now()}-${options.blobName}`;
    const image = sharp(options.filePath);

    if (options.maxWidth || options.maxHeight) {
      await image.resize(options.maxWidth || null, options.maxHeight || null).toFile(outputFilePath);
    } else {
      await image.toFile(outputFilePath);
    }

    console.log(`Resized image saved to ${outputFilePath}`);
    return outputFilePath; 
  }
}
