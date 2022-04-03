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

resource "aws_s3_bucket" "versioned_bucket" {
  bucket = "tf-aws-acg-scottie-versioned-bucket"
  tags = {
    Name = "Versioned Bucket"
  }
}

resource "aws_s3_bucket_versioning" "versioned_bucket" {
  bucket = aws_s3_bucket.versioned_bucket.id
  versioning_configuration {
    status = "Enabled"
  }
}
