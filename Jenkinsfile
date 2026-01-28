pipeline {
    agent any

    environment {
        DOCKER_USER = credentials('dockerhub-creds')  // DockerHub username + password stored in Jenkins
        AWS_KEY     = credentials('aws-access-key')    // AWS access key
        AWS_SECRET  = credentials('aws-secret-key')    // AWS secret key
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
                // Correct way to use credentials in Groovy string interpolation
                sh "./scripts/push.sh ${DOCKER_USER_USR} ${DOCKER_USER_PSW}"
            }
        }

        stage('Deploy to AWS') {
            steps {
                sh 'chmod +x ./scripts/deploy.sh'
                sh './scripts/deploy.sh'
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
//jenkin