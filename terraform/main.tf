provider "aws" {
  region = var.aws_region  # make sure var.aws_region = "us-east-1"
}


#resource "aws_security_group" "web_sg" {
  name        = "job-protal-sg"
  description = "Allow SSH and HTTP access"

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
