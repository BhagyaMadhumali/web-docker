provider "aws" {
  region = var.aws_region
}

# Create default VPC if no VPC ID provided
resource "aws_vpc" "default_vpc" {
  count                = var.vpc_id == "" ? 1 : 0
  cidr_block           = "10.0.0.0/16"
  enable_dns_hostnames = true

  tags = {
    Name = "job-protal-vpc"
  }
}

# Security Group
resource "aws_security_group" "web_sg" {
  name        = var.security_group_name
  description = "Allow SSH and HTTP access"
  vpc_id      = var.vpc_id != "" ? var.vpc_id : aws_vpc.default_vpc[0].id

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "job-protal-sg"
  }
}

# EC2 Instance
resource "aws_instance" "web_server" {
  ami                    = var.ami_id
  instance_type          = var.instance_type
  key_name               = var.key_name
  vpc_security_group_ids = [aws_security_group.web_sg.id]

  tags = {
    Name = "job-protal-webserver"
  }
}

# Outputs
output "instance_public_ip" {
  value = aws_instance.my_instance.public_ip
}

