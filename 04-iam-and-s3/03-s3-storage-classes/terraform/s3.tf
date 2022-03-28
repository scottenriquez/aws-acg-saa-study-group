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

resource "aws_s3_bucket" "storage_class_bucket" {
  bucket = "tf-aws-acg-scottie-storage-class"
  tags = {
    Name = "Storage Classes"
  }
}

resource "aws_s3_bucket_object" "one_zone_ia" {
  bucket = aws_s3_bucket.storage_class_bucket.bucket 
  key    = "scottie-one-zone-ia.jpeg"
  source = "scottie-one-zone-ia.jpeg"
  storage_class = "ONEZONE_IA"
  etag = filemd5("scottie-one-zone-ia.jpeg")
}

resource "aws_s3_bucket_object" "standard_ia" {
  bucket = aws_s3_bucket.storage_class_bucket.bucket 
  key    = "scottie-ia.jpeg"
  source = "scottie-ia.jpeg"
  storage_class = "STANDARD_IA"
  etag = filemd5("scottie-ia.jpeg")
}

resource "aws_s3_bucket_object" "glacier" {
  bucket = aws_s3_bucket.storage_class_bucket.bucket 
  key    = "scottie-glacier.jpeg"
  source = "scottie-glacier.jpeg"
  storage_class = "GLACIER"
  etag = filemd5("scottie-glacier.jpeg")
}

resource "aws_s3_bucket_object" "glacier_deep_archive" {
  bucket = aws_s3_bucket.storage_class_bucket.bucket 
  key    = "scottie-glacier-deep-archive.jpeg"
  source = "scottie-glacier-deep-archive.jpeg"
  storage_class = "DEEP_ARCHIVE"
  etag = filemd5("scottie-glacier-deep-archive.jpeg")
}

resource "aws_s3_bucket_object" "intelligent_tiering" {
  bucket = aws_s3_bucket.storage_class_bucket.bucket 
  key    = "scottie-intelligent-tiering.jpeg"
  source = "scottie-intelligent-tiering.jpeg"
  storage_class = "INTELLIGENT_TIERING"
  etag = filemd5("scottie-intelligent-tiering.jpeg")
}