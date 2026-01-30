variable "aws_region" {
  description = "AWS region to deploy resources"
  type        = string
  default     = "us-east-1"
}

variable "ami_id" {
  description = "AMI ID for EC2 instance"
  type        = string
}

variable "instance_type" {
  description = "EC2 instance type"
  type        = string
  default     = "t2.micro"
}

variable "key_name" {
  description = "The name of the AWS key pair to use for EC2 instances"
  type        = string
}

variable "security_group_name" {
  description = "Security group name"
  type        = string
  default     = "job-protal-sg"
}

variable "vpc_id" {
  description = "The VPC ID where the security group will be created"
  type        = string
}
