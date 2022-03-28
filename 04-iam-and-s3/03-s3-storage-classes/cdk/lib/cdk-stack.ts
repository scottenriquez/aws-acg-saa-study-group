import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as s3deployment from 'aws-cdk-lib/aws-s3-deployment';

export class CdkStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);
    // NOTE: I created separate buckets due to how the deployment mechanism works in CDK
    // Each BucketDeployment overwrites the last, so I just created one bucket per storage class
    // One bucket can have objects with multiple storage classes (see the Terraform version)
    const oneZoneIABucket = new s3.Bucket(this, 'OneZoneIABucket', {
      bucketName: 'cdk-aws-acg-scottie-bucket-one-zone-ia'
    });
    const standardIABucket = new s3.Bucket(this, 'StandardIABucket', {
      bucketName: 'cdk-aws-acg-scottie-bucket-standard-ia'
    });
    const glacierBucket = new s3.Bucket(this, 'GlacierBucket', {
      bucketName: 'cdk-aws-acg-scottie-bucket-glacier'
    });
    const glacierDeepArchiveBucket = new s3.Bucket(this, 'GlacierDeepArchiveBucket', {
      bucketName: 'cdk-aws-acg-scottie-bucket-glacier-deep-archive'
    });
    const intelligentTieringBucket = new s3.Bucket(this, 'IntelligentTieringBucket', {
      bucketName: 'cdk-aws-acg-scottie-bucket-intelligent-tiering'
    });
    const oneZoneIADeployment = new s3deployment.BucketDeployment(this, 'OneZoneIAFile', {
      sources: [s3deployment.Source.asset('./one-zone-ia-files')],
      destinationBucket: oneZoneIABucket,
      storageClass: s3deployment.StorageClass.ONEZONE_IA
    });
    const standardIADeployment = new s3deployment.BucketDeployment(this, 'StandardIAFile', {
      sources: [s3deployment.Source.asset('./ia-files')],
      destinationBucket: standardIABucket,
      storageClass: s3deployment.StorageClass.STANDARD_IA
    });
    const glacierDeployment = new s3deployment.BucketDeployment(this, 'GlacierFile', {
      sources: [s3deployment.Source.asset('./glacier-files')],
      destinationBucket: glacierBucket,
      storageClass: s3deployment.StorageClass.GLACIER
    });
    const glacierDeepArchiveDeployment = new s3deployment.BucketDeployment(this, 'GlacierDeepArchiveFile', {
      sources: [s3deployment.Source.asset('./glacier-deep-archive-files')],
      destinationBucket: glacierDeepArchiveBucket,
      storageClass: s3deployment.StorageClass.DEEP_ARCHIVE
    });
    const intelligentTieringDeployment = new s3deployment.BucketDeployment(this, 'IntelligentTieringFile', {
      sources: [s3deployment.Source.asset('./intelligent-tiering-files')],
      destinationBucket: intelligentTieringBucket,
      storageClass: s3deployment.StorageClass.INTELLIGENT_TIERING
    });
  }
}
