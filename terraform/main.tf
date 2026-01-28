terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region     = var.aws_region
  access_key = var.aws_access_key
  secret_key = var.aws_secret_key
}

resource "aws_ecs_cluster" "my_cluster" {
  name = var.ecs_cluster_name
}

output "ecs_cluster_name" {
  value = aws_ecs_cluster.my_cluster.name
}
