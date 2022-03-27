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

resource "aws_s3_bucket" "first_bucket" {
  bucket = "tf-aws-acg-scottie-first-bucket"
  tags = {
    Name = "My First Bucket"
  }
}

resource "aws_s3_bucket_object" "object" {
  bucket = aws_s3_bucket.first_bucket.bucket 
  key    = "scottie.jpeg"
  source = "scottie.jpeg"
  storage_class = "STANDARD"
  etag = filemd5("scottie.jpeg")
}