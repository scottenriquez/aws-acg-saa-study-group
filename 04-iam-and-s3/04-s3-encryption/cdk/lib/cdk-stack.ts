import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as kms from 'aws-cdk-lib/aws-kms';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as s3deployment from 'aws-cdk-lib/aws-s3-deployment';

export class CdkStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);
    const unencryptedBucket = new s3.Bucket(this, 'UnencryptedBucket', {
      bucketName: 'cdk-aws-acg-scottie-unencrypted-bucket'
    });
    const unencrytpedBucketDeployment = new s3deployment.BucketDeployment(this, 'EncryptedObjectUnencryptedBucketDeployment', {
      sources: [s3deployment.Source.asset('./files-to-upload-to-s3')],
      destinationBucket: unencryptedBucket,
      // SSE-S3 encryption 
      serverSideEncryption: s3deployment.ServerSideEncryption.AES_256
    });
    const s3Key = new kms.Key(this, 'S3Key', {
      enableKeyRotation: true,
    });
    const encryptedBucket = new s3.Bucket(this, 'EncryptedBucket', {
      bucketName: 'cdk-aws-acg-scottie-encrypted-bucket',
      // SSE-KMS encryption
      encryptionKey: s3Key
    });
    const encrytpedBucketDeployment = new s3deployment.BucketDeployment(this, 'EncryptedBucketDeployment', {
      sources: [s3deployment.Source.asset('./files-to-upload-to-s3')],
      destinationBucket: encryptedBucket
    });
  }
}
