# AWS region where resources will be deployed
variable "aws_region" {
  description = "AWS region to deploy resources"
  type        = string
  default     = "us-east-1"
}

# VPC ID where resources will be created
variable "vpc_id" {
  description = "VPC ID where resources will be created"
  type        = string
}

# AMI ID for EC2 instance
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

# AWS key pair name for EC2 instance
variable "key_name" {
  description = "The name of the AWS key pair to use for EC2 instances"
  type        = string
  default     = "jobprotalwebserver"
}

# Security group name
variable "security_group_name" {
  description = "Security group name"
  type        = string
  default     = "job-protal-sg"
}

# Security group description
variable "security_group_description" {
  description = "Description for the security group"
  type        = string
  default     = "Allow SSH and HTTP access"
}

# Inbound CIDR blocks for SSH access
variable "ssh_cidr" {
  description = "CIDR block allowed for SSH access"
  type        = string
  default     = "0.0.0.0/0"
}

# Inbound CIDR blocks for HTTP access
variable "http_cidr" {
  description = "CIDR block allowed for HTTP access"
  type        = string
  default     = "0.0.0.0/0"
}
