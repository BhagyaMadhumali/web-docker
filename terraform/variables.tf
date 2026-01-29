# AWS region
variable "aws_region" {
  description = "AWS region to deploy resources"
  type        = string
  default     = "us-east-1"
}

# EC2 instance variables
variable "instance_type" {
  description = "EC2 instance type"
  type        = string
  default     = "t2.micro"
}

variable "key_name" {
  description = "EC2 key pair name (must exist in AWS)"
  type        = string
}

variable "ami_id" {
  description = "AMI ID for EC2"
  type        = string
  default     = "ami-0c94855ba95c71c99" # Ubuntu 22.04 LTS (us-east-1)
}

variable "security_group_name" {
  description = "Security group name"
  type        = string
  default     = "job-protal-sg"
}
