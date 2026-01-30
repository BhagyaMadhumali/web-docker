provider "aws" {
  region = var.aws_region  # make sure var.aws_region = "us-east-1"
}


resource "aws_security_group" "web_sg" {
  name        = var.security_group_name
  description = "Allow SSH and HTTP access"
  vpc_id      = var.vpc_id  # You must provide the VPC ID

  dynamic "ingress" {
    for_each = [
      { from_port=22, to_port=22, protocol="tcp", cidr_blocks=["0.0.0.0/0"] },
      { from_port=80, to_port=80, protocol="tcp", cidr_blocks=["0.0.0.0/0"] }
    ]
    content {
      from_port   = ingress.value.from_port
      to_port     = ingress.value.to_port
      protocol    = ingress.value.protocol
      cidr_blocks = ingress.value.cidr_blocks
    }
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}


# EC2 instance
resource "aws_instance" "web_server" {
  ami                    = var.ami_id
  instance_type          = var.instance_type
  key_name               = var.key_name
vpc_security_group_ids = [aws_security_group.web_sg.id]

  tags = {
    Name = "job-protal-webserver"
  }
}
