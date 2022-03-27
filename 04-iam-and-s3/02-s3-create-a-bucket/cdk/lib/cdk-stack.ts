import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as s3deployment from 'aws-cdk-lib/aws-s3-deployment';

export class CdkStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);
    const bucket = new s3.Bucket(this, 'MyFirstBucket', {
      bucketName: 'cdk-aws-acg-scottie-first-bucket'
    });
    const bucketDeployment = new s3deployment.BucketDeployment(this, 'UploadFile', {
      sources: [s3deployment.Source.asset('./files-to-upload-to-s3')],
      destinationBucket: bucket
    });
  }
}
