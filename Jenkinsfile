pipeline {
    agent any

    environment {
        DOCKER_USER = credentials('dockerhub-creds')
        AWS_KEY     = credentials('aws-access-key')
        AWS_SECRET  = credentials('aws-secret-key')
    }

    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'main', url: 'https://github.com/BhagyaMadhumali/web-docker.git'
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
                sh 'chmod +x ./scripts/push.sh'
                sh "./scripts/push.sh ${DOCKER_USER_USR} ${DOCKER_USER_PSW}"
            }
        }

        stage('Terraform Init & Plan') {
            steps {
                dir('terraform') {
                    echo "🔧 Initializing Terraform..."
                    sh "terraform init"
                    echo "📄 Running Terraform plan..."
                    sh "terraform plan -out=tfplan -var 'aws_access_key=${AWS_KEY}' -var 'aws_secret_key=${AWS_SECRET}'"
                }
            }
        }

        stage('Terraform Apply') {
            steps {
                dir('terraform') {
                    echo "🚀 Applying Terraform..."
                    sh "terraform apply -auto-approve tfplan"
                }
            }
        }

        stage('Deploy to AWS') {
            steps {
                sshagent(['ec2-ssh-key']) {
                    sh 'chmod +x ./scripts/deploy.sh'
                    sh './scripts/deploy.sh'
                }
            }
        }
    }

    post {
        success {
            echo "✅ CI/CD pipeline completed successfully!"
        }
        failure {
            echo "❌ Pipeline failed. Check Jenkins console for details."
        }
    }
}
