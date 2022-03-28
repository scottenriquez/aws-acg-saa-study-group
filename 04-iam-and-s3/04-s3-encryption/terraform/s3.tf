terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 3.0"
    }
  }
}

provider "aws" {
  region = "us-east-1"
}

resource "aws_s3_bucket" "unencrypted_bucket" {
  bucket = "tf-aws-acg-scottie-unencrypted-bucket"
  tags = {
    Name = "Unencrypted Bucket"
  }
}

resource "aws_s3_bucket_object" "encrypted_object" {
  bucket = aws_s3_bucket.unencrypted_bucket.bucket 
  key    = "scottie.jpeg"
  source = "scottie.jpeg"
  storage_class = "STANDARD"
  etag = filemd5("scottie.jpeg")
  # SSE-S3 encryption 
  server_side_encryption = "AES256"
}

resource "aws_kms_key" "s3" {
  description             = "Used for default bucket encryption"
  deletion_window_in_days = 7
}

resource "aws_s3_bucket" "encrypted_bucket" {
  bucket = "tf-aws-acg-scottie-encrypted-bucket"
  tags = {
    Name = "Encrypted Bucket"
  }
}

resource "aws_s3_bucket_server_side_encryption_configuration" "encrypted_bucket" {
  bucket = aws_s3_bucket.encrypted_bucket.bucket
  rule {
    apply_server_side_encryption_by_default {
      kms_master_key_id = aws_kms_key.s3.arn
      # SSE-KMS encryption
      sse_algorithm     = "aws:kms"
    }
  }
}

resource "aws_s3_bucket_object" "default_encrypted_object" {
  bucket = aws_s3_bucket.encrypted_bucket.bucket 
  key    = "scottie.jpeg"
  source = "scottie.jpeg"
  storage_class = "STANDARD"
  etag = filemd5("scottie.jpeg")
}