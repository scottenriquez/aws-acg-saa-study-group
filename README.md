# A Cloud Guru AWS Solution Architect - Associate (SAA-CO2) IaC Examples

## Overview
This code implements demos and concepts from the [A Cloud Guru SAA-002](https://acloudguru.com/course/aws-certified-solutions-architect-associate-saa-c02) course using infrastructure as code. The top level folders correspond to chapters in the course (e.g., `04-iam-and-s3`). The subfolders correspond to videos (e.g., `04-s3-encryption`). The number prefix aims to keep the examples in order however, the A Cloud Guru content structure may change at any time. Each subfolder contains `/terraform` and `/cdk` folders with the IaC for the exercise in the corresponding formats.

## Required Software
- [Node.js/NPM](https://nodejs.org/en/download/)
- [AWS CLI with credentials configured](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html)
- [Terraform](https://learn.hashicorp.com/tutorials/terraform/install-cli)
- [CDK](https://docs.aws.amazon.com/cdk/v2/guide/getting_started.html)

## Running Terraform Examples
These examples were developed using Terraform `v1.1.7`. Navigate to the desired `/terraform` folder and run:
```shell
# initialize and install AWS provider
terraform init
# (optional) view the plan
terraform plan
# deploy
terraform apply
# clean up
terraform destroy
```

## Running CDK Examples
These examples were developed using CDK `2.17.0`. Navigate to the desired `/cdk` folder and run:
```shell
# install dependencies
npm i
# an AWS account only needs to be bootstrapped once
cdk bootstrap
# (optional) generate CloudFormation to ensure code compiles
cdk synth
# deploy
cdk deploy
# clean up
cdk destroy
```