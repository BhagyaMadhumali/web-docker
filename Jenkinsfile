pipeline {
    agent any

    environment {
        DOCKER_USER = credentials('dockerhub-creds')
        AWS_KEY     = credentials('aws-access-key')
        AWS_SECRET  = credentials('aws-secret-key')

        AWS_REGION  = "us-east-1"
        ECS_CLUSTER = "my-ecs-cluster"
        ECS_SERVICE = "my-ecs-service"
    }

    stages {

        stage('Checkout Code') {
            steps {
                git branch: 'main', url: 'https://github.com/BhagyaMadhumali/web-docker.git'
            }
        }

        // ------------------ Terraform ------------------
        stage('Terraform Init') {
            steps {
                dir("terraform") {
                    sh """
                        export AWS_ACCESS_KEY_ID=$AWS_KEY
                        export AWS_SECRET_ACCESS_KEY=$AWS_SECRET
                        terraform init
                    """
                }
            }
        }

        stage('Terraform Validate') {
            steps {
                dir("terraform") {
                    sh """
                        terraform validate
                    """
                }
            }
        }

        stage('Terraform Plan') {
            steps {
                dir("terraform") {
                    sh """
                        export AWS_ACCESS_KEY_ID=$AWS_KEY
                        export AWS_SECRET_ACCESS_KEY=$AWS_SECRET
                        terraform plan -var="aws_region=$AWS_REGION"
                    """
                }
            }
        }

        stage('Terraform Apply') {
            steps {
                dir("terraform") {
                    sh """
                        export AWS_ACCESS_KEY_ID=$AWS_KEY
                        export AWS_SECRET_ACCESS_KEY=$AWS_SECRET
                        terraform apply -auto-approve -var="aws_region=$AWS_REGION"
                    """
                }
            }
        }

        // ------------------ Docker ------------------
        stage('Build Docker Images') {
            steps {
                dir("${WORKSPACE}") {
                    sh 'chmod +x ./scripts/build.sh'
                    sh './scripts/build.sh'
                }
            }
        }

        stage('Push Docker Images') {
            steps {
                dir("${WORKSPACE}") {
                    sh 'chmod +x ./scripts/push.sh'
                    sh "./scripts/push.sh $DOCKER_USER_USR $DOCKER_USER_PSW"
                }
            }
        }

        // ------------------ Deploy ------------------
        stage('Deploy to AWS') {
            steps {
                dir("${WORKSPACE}") {
                    sh 'chmod +x ./scripts/deploy.sh'
                    sh "./scripts/deploy.sh $AWS_KEY $AWS_SECRET $AWS_REGION $ECS_CLUSTER $ECS_SERVICE"
                }
            }
        }
    }

    post {
        success {
            echo "✅ CI/CD + Terraform pipeline completed successfully!"
        }
        failure {
            echo "❌ Pipeline failed. Check Jenkins console for details."
        }
    }
}
