pipeline {
    agent any

    environment {
        PROJECT_DIR = "//mnt/d/MyApp2"
        FRONTEND_IMAGE = "my-frontend-image"
        BACKEND_IMAGE = "my-backend-image"
        DOCKER_HUB_USER = "bhagya122"
        DOCKER_HUB_PASS = credentials('docker-hub-password') // Jenkins Credential ID
    }

    stages {
        stage('Checkout') {
            steps {
                echo "Pulling code from GitHub..."
                checkout scm
            }
        }

        stage('Build Docker Images') {
            steps {
                dir("${PROJECT_DIR}/frontend") {
                    echo "Building frontend Docker image..."
                    sh "docker build -t ${FRONTEND_IMAGE}:latest ."
                }

                dir("${PROJECT_DIR}/backend") {
                    echo "Building backend Docker image..."
                    sh "docker build -t ${BACKEND_IMAGE}:latest ."
                }
            }
        }

        stage('Push Docker Images') {
            steps {
                echo "Logging into Docker Hub..."
                sh "echo ${DOCKER_HUB_PASS} | docker login -u ${DOCKER_HUB_USER} --password-stdin"
                
                echo "Tagging frontend image..."
                sh "docker tag ${FRONTEND_IMAGE}:latest ${DOCKER_HUB_USER}/${FRONTEND_IMAGE}:latest"
                
                echo "Tagging backend image..."
                sh "docker tag ${BACKEND_IMAGE}:latest ${DOCKER_HUB_USER}/${BACKEND_IMAGE}:latest"
                
                echo "Pushing frontend image to Docker Hub..."
                sh "docker push ${DOCKER_HUB_USER}/${FRONTEND_IMAGE}:latest"
                
                echo "Pushing backend image to Docker Hub..."
                sh "docker push ${DOCKER_HUB_USER}/${BACKEND_IMAGE}:latest"
            }
        }

        stage('Run Containers') {
            steps {
                dir("${PROJECT_DIR}") {
                    echo "Starting containers using docker-compose..."
                    sh 'docker compose up -d'
                }
            }
        }

        stage('Check Running Containers') {
            steps {
                sh 'docker ps'
            }
        }
    }

    post {
        success {
            echo '✅ Deployment and push successful! Both frontend and backend images are on Docker Hub.'
        }
        failure {
            echo '❌ Deployment or push failed!'
        }
    }
}
