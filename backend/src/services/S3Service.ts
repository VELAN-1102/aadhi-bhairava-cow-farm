import AWS from 'aws-sdk';
import fs from 'fs';
import path from 'path';
import { logger } from '../utils/logger';

export class S3Service {
  private s3: AWS.S3 | null = null;
  private bucketName: string;
  private useLocalFallback: boolean = false;
  private localUploadDir: string;

  constructor() {
    this.bucketName = process.env.AWS_S3_BUCKET_NAME || 'cowfarm-assets';
    this.localUploadDir = path.join(process.cwd(), 'uploads');

    const useLocalStack = process.env.AWS_USE_LOCALSTACK === 'true';

    try {
      const s3Config: AWS.S3.ClientConfiguration = {
        region: process.env.AWS_REGION || 'us-east-1',
        accessKeyId: process.env.AWS_ACCESS_KEY_ID || 'test',
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || 'test',
      };

      if (useLocalStack) {
        s3Config.endpoint = process.env.AWS_ENDPOINT || 'http://localhost:4566';
        s3Config.s3ForcePathStyle = true;
      }

      this.s3 = new AWS.S3(s3Config);
      logger.info(`S3 client initialized. S3 endpoint: ${s3Config.endpoint || 'AWS Standard'}`);
    } catch (error) {
      logger.warn('Failed to initialize AWS S3 client. Falling back to local disk storage.', error);
      this.useLocalFallback = true;
    }

    // Ensure local uploads directory exists
    if (!fs.existsSync(this.localUploadDir)) {
      fs.mkdirSync(this.localUploadDir, { recursive: true });
    }
  }

  /**
   * Upload file to S3 or local directory
   */
  public async uploadFile(fileBuffer: Buffer, fileName: string, mimeType: string): Promise<string> {
    const key = `${Date.now()}-${fileName}`;

    if (this.useLocalFallback || !this.s3) {
      return this.uploadLocally(fileBuffer, key);
    }

    try {
      const params = {
        Bucket: this.bucketName,
        Key: key,
        Body: fileBuffer,
        ContentType: mimeType,
      };

      const result = await this.s3.upload(params).promise();
      logger.info(`File uploaded to S3 successfully: ${result.Location}`);
      return result.Location;
    } catch (error) {
      logger.error('S3 upload failed. Attempting local disk fallback.', error);
      return this.uploadLocally(fileBuffer, key);
    }
  }

  /**
   * Helper to write file to local disk
   */
  private uploadLocally(fileBuffer: Buffer, key: string): string {
    const filePath = path.join(this.localUploadDir, key);
    fs.writeFileSync(filePath, fileBuffer);
    logger.info(`File stored locally on disk: ${filePath}`);

    // Return a relative URL path that can be served by express
    return `/uploads/${key}`;
  }

  /**
   * Delete file from S3 or local disk
   */
  public async deleteFile(fileUrl: string): Promise<void> {
    if (fileUrl.startsWith('/uploads/')) {
      const fileName = fileUrl.replace('/uploads/', '');
      const filePath = path.join(this.localUploadDir, fileName);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
        logger.info(`Local file deleted: ${filePath}`);
      }
      return;
    }

    if (this.s3) {
      try {
        // Extract Key from URL
        const urlParts = fileUrl.split('/');
        const key = urlParts[urlParts.length - 1];

        await this.s3.deleteObject({
          Bucket: this.bucketName,
          Key: key,
        }).promise();

        logger.info(`File deleted from S3: ${key}`);
      } catch (error) {
        logger.error(`Failed to delete S3 file ${fileUrl}`, error);
      }
    }
  }
}

export default new S3Service();
