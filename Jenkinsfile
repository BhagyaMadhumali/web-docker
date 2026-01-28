pipeline {
    agent any

    environment {
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

        // ---------------- Terraform ----------------
        stage('Terraform Init') {
            steps {
                withCredentials([
                    string(credentialsId: 'aws-access-key', variable: 'AWS_ACCESS_KEY_ID'),
                    string(credentialsId: 'aws-secret-key', variable: 'AWS_SECRET_ACCESS_KEY')
                ]) {
                    dir("terraform") {
                        sh '''
                            terraform init
                        '''
                    }
                }
            }
        }

        stage('Terraform Validate') {
            steps {
                dir("terraform") {
                    sh '''
                        terraform validate
                    '''
                }
            }
        }

        stage('Terraform Plan') {
            steps {
                withCredentials([
                    string(credentialsId: 'aws-access-key', variable: 'AWS_ACCESS_KEY_ID'),
                    string(credentialsId: 'aws-secret-key', variable: 'AWS_SECRET_ACCESS_KEY')
                ]) {
                    dir("terraform") {
                        sh """
                            terraform plan -var="aws_region=${AWS_REGION}"
                        """
                    }
                }
            }
        }

        stage('Terraform Apply') {
            steps {
                withCredentials([
                    string(credentialsId: 'aws-access-key', variable: 'AWS_ACCESS_KEY_ID'),
                    string(credentialsId: 'aws-secret-key', variable: 'AWS_SECRET_ACCESS_KEY')
                ]) {
                    dir("terraform") {
                        sh """
                            terraform apply -auto-approve -var="aws_region=${AWS_REGION}"
                        """
                    }
                }
            }
        }

        // ---------------- Docker ----------------
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

        // ---------------- Deploy ----------------
        stage('Deploy to AWS') {
            steps {
                withCredentials([
                    string(credentialsId: 'aws-access-key', variable: 'AWS_ACCESS_KEY_ID'),
                    string(credentialsId: 'aws-secret-key', variable: 'AWS_SECRET_ACCESS_KEY')
                ]) {
                    sh 'chmod +x ./scripts/deploy.sh'
                    sh "./scripts/deploy.sh ${AWS_REGION} ${ECS_CLUSTER} ${ECS_SERVICE}"
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
