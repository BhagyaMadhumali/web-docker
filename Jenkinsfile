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
                // Pull repo into Jenkins workspace
                git branch: 'main', url: 'https://github.com/BhagyaMadhumali/web-docker.git'
            }
        }

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

    stage('Deploy to AWS') {
    steps {
        dir("${WORKSPACE}") {
            sh 'chmod +x ./scripts/deploy.sh'
            sh "./scripts/deploy.sh $AWS_KEY $AWS_SECRET us-east-1 my-ecs-cluster my-ecs-service"
        }
    }
}

    }

    post {
        success {
            echo "CI/CD pipeline completed successfully!"
        }
        failure {
            echo "Pipeline failed. Check Jenkins console for details."
        }
    }
}