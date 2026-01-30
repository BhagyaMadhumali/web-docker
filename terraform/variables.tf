# AWS region
variable "aws_region" {
  description = "AWS region to deploy resources"
  type        = string
  default     = "us-east-1"
}

# AMI ID
variable "ami_id" {
  description = "AMI ID for EC2 instance"
  type        = string
}

# EC2 instance type
variable "instance_type" {
  description = "EC2 instance type"
  type        = string
  default     = "t2.micro"
}

# Key pair
variable "key_name" {
  description = "The name of the AWS key pair to use for EC2 instances"
  type        = string
}

# Security Group
variable "security_group_name" {
  description = "Security group name"
  type        = string
  default     = "job-protal-sg"
}

# VPC ID (optional)
variable "vpc_id" {
  description = "The VPC ID where the security group will be created. Leave empty to create a new VPC."
  type        = string
  default     = ""
}
