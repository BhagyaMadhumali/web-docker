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

        stage('Terraform Init') {
            steps {
                withCredentials([
                    string(credentialsId: 'aws-access-key', variable: 'AWS_ACCESS_KEY_ID'),
                    string(credentialsId: 'aws-secret-key', variable: 'AWS_SECRET_ACCESS_KEY')
                ]) {
                    dir("terraform") {
                        sh '/usr/bin/terraform init'
                    }
                }
            }
        }

        stage('Terraform Validate') {
            steps {
                dir("terraform") {
                    sh '/usr/bin/terraform validate || true'
                }
            }
        }

        stage('Terraform Plan') {
            steps {
                dir("terraform") {
                    sh '/usr/bin/terraform plan -out=tfplan || true'
                }
            }
        }

        stage('Terraform Apply') {
            steps {
                dir("terraform") {
                    sh '/usr/bin/terraform apply -auto-approve tfplan || true'
                }
            }
        }

        stage('Build Docker Images') {
            steps {
                sh 'chmod +x ./scripts/build.sh'
                sh './scripts/build.sh'
            }
        }

        stage('Push Docker Images') {
            steps {
                withCredentials([
                    usernamePassword(credentialsId: 'dockerhub-creds',
                        usernameVariable: 'DOCKER_USERNAME',
                        passwordVariable: 'DOCKER_PASSWORD')
                ]) {
                    sh 'chmod +x ./scripts/push.sh'
                    sh "./scripts/push.sh ${DOCKER_USERNAME} ${DOCKER_PASSWORD}"
                }
            }
        }

        stage('Deploy to AWS') {
            steps {
                sh 'chmod +x ./scripts/deploy.sh'
                sh "./scripts/deploy.sh ${AWS_KEY} ${AWS_SECRET} ${AWS_REGION} ${ECS_CLUSTER} ${ECS_SERVICE}"
            }
        }
    }

    post {
        success {
            echo "✅ CI/CD pipeline completed successfully!"
        }
        failure {
            echo "❌ Pipeline failed. Check console for details."
        }
    }
}
