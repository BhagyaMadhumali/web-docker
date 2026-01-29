variable "key_name" {
  description = "The name of the AWS key pair to use for EC2 instances"
  type        = string
}

variable "instance_type" {
  description = "EC2 instance type"
  type        = string
}

variable "ami_id" {
  description = "AMI ID for the EC2 instance"
  type        = string
}

variable "security_group_name" {
  description = "Name of the security group"
  type        = string
}
