variable "aws_region" {}
variable "vpc_id" {}
variable "security_group_name" {
  default = "job-protal-sg"
}
variable "ami_id" {}
variable "instance_type" {
  default = "t2.micro"
}
variable "key_name" {}
