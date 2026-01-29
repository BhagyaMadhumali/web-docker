pipeline {
    agent any

    environment {
        // DockerHub credentials (Username + Password)
        DOCKER_USER = credentials('dockerhub-creds')
        // AWS credentials (Secret keys if needed)
        AWS_KEY     = credentials('aws-access-key')
        AWS_SECRET  = credentials('aws-secret-key')
    }

    stages {
        stage('Checkout Code') {
            steps {
                echo "🔄 Checking out code from GitHub..."
                git branch: 'main', url: 'https://github.com/BhagyaMadhumali/web-docker.git'
            }
        }

        stage('Build Docker Images') {
            steps {
                echo "🛠 Building Docker images..."
                sh 'chmod +x ./scripts/build.sh'
                sh './scripts/build.sh'
            }
        }

        stage('Push Docker Images') {
            steps {
                echo "📤 Pushing Docker images to DockerHub..."
                sh 'chmod +x ./scripts/push.sh'
                // Uses DockerHub credentials injected by Jenkins
                sh "./scripts/push.sh ${DOCKER_USER_USR} ${DOCKER_USER_PSW}"
            }
        }

        stage('Deploy to AWS') {
            steps {
                echo "🚀 Deploying to AWS server..."
                // Use the SSH key stored in Jenkins
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
s