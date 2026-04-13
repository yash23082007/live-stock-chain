import { S3Client, PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import crypto from 'crypto'

const s3 = new S3Client({
  region: process.env.AWS_REGION || 'af-south-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || 'dummy',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || 'dummy'
  }
})

export class UploadService {
  async uploadDocument(
    file: Buffer,
    mimeType: string,
    farmerId: string,
    docType: string
  ): Promise<string> {
    const key = `farmers/${farmerId}/${docType}/${crypto.randomUUID()}`
    
    await s3.send(new PutObjectCommand({
      Bucket: process.env.S3_BUCKET!,
      Key: key,
      Body: file,
      ContentType: mimeType,
      ServerSideEncryption: 'aws:kms',
      Metadata: { farmerId, docType }
    }))

    return key
  }

  async getSignedDownloadUrl(key: string): Promise<string> {
    return getSignedUrl(
      s3,
      new GetObjectCommand({ Bucket: process.env.S3_BUCKET!, Key: key }),
      { expiresIn: 3600 }
    )
  }
}
