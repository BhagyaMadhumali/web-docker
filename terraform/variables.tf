variable "aws_region" {
  description = "AWS region to deploy resources"
  type        = string
  default     = "ap-south-1"
}

variable "ami_id" {
  description = "AMI ID for EC2 instance in Mumbai"
  type        = string
  default     = "ami-019715e0d74f695be" # Amazon Linux 2 in ap-south-1
}

variable "instance_type" {
  description = "EC2 instance type"
  type        = string
  default     = "t2.micro"
}

variable "key_name" {
  description = "AWS key pair for EC2 instances"
  type        = string
}

variable "security_group_name" {
  description = "Security group name"
  type        = string
  default     = "job-protal-sg"
}

variable "vpc_id" {
  description = "VPC ID for the resources. Leave empty to create default VPC."
  type        = string
  default     = ""
}
