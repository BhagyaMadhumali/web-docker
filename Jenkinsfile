pipeline {
    agent any

    environment {
        // DockerHub credentials
        DOCKER_USER = credentials('dockerhub-creds')
        // AWS credentials
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
                withEnv(["PATH+TOOLS=/usr/bin"]) {
                    echo "🛠 Building Docker images..."
                    sh 'chmod +x ./scripts/build.sh'
                    sh './scripts/build.sh'
                }
            }
        }

        stage('Push Docker Images') {
            steps {
                withEnv(["PATH+TOOLS=/usr/bin"]) {
                    echo "📤 Pushing Docker images to DockerHub..."
                    sh 'chmod +x ./scripts/push.sh'
                    withCredentials([usernamePassword(credentialsId: 'dockerhub-creds', usernameVariable: 'DOCKER_USER_USR', passwordVariable: 'DOCKER_USER_PSW')]) {
                        sh './scripts/push.sh $DOCKER_USER_USR $DOCKER_USER_PSW'
                    }
                }
            }
        }

        stage('Terraform Init & Plan') {
            steps {
                dir('terraform') {
                    withEnv(["PATH+TOOLS=/usr/bin"]) {
                        echo "🔧 Initializing Terraform..."
                        sh '/usr/bin/terraform init'

                        echo "📄 Running Terraform plan..."
                        withCredentials([
                            string(credentialsId: 'aws-access-key', variable: 'AWS_KEY'),
                            string(credentialsId: 'aws-secret-key', variable: 'AWS_SECRET')
                        ]) {
                            sh "/usr/bin/terraform plan -out=tfplan -var 'aws_access_key=$AWS_KEY' -var 'aws_secret_key=$AWS_SECRET'"
                        }
                    }
                }
            }
        }

        stage('Terraform Apply') {
            steps {
                dir('terraform') {
                    withEnv(["PATH+TOOLS=/usr/bin"]) {
                        echo "🚀 Applying Terraform..."
                        sh '/usr/bin/terraform apply -auto-approve tfplan'
                    }
                }
            }
        }

        stage('Deploy to AWS') {
            steps {
                withEnv(["PATH+TOOLS=/usr/bin"]) {
                    sshagent(['ec2-ssh-key']) {
                        echo "🚀 Deploying Docker containers on server..."
                        sh 'chmod +x ./scripts/deploy.sh'
                        sh './scripts/deploy.sh'
                    }
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
