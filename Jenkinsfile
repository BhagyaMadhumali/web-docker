pipeline {
    agent any

    environment {
        // Add terraform + docker to PATH properly
        PATH = "/usr/local/bin:/usr/bin:/bin"
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
                sh '''
                    chmod +x ./scripts/build.sh
                    ./scripts/build.sh
                '''
            }
        }

        stage('Push Docker Images') {
            steps {
                echo "📤 Pushing Docker images to DockerHub..."
                withCredentials([
                    usernamePassword(
                        credentialsId: 'dockerhub-creds',
                        usernameVariable: 'DOCKERHUB_USER',
                        passwordVariable: 'DOCKERHUB_PASS'
                    )
                ]) {
                    sh '''
                        chmod +x ./scripts/push.sh
                        ./scripts/push.sh "$DOCKERHUB_USER" "$DOCKERHUB_PASS"
                    '''
                }
            }
        }

        stage('Terraform Init & Plan') {
            steps {
                dir('terraform') {
                    echo "🔧 Terraform Init & Plan..."

                    withCredentials([
                        string(credentialsId: 'aws-access-key', variable: 'AWS_ACCESS_KEY_ID'),
                        string(credentialsId: 'aws-secret-key', variable: 'AWS_SECRET_ACCESS_KEY'),
                        string(credentialsId: 'ec2-key-name', variable: 'TF_KEY_NAME')
                    ]) {
                        sh '''
                            terraform --version
                            terraform init -input=false

                            terraform plan -input=false -out=tfplan \
                              -var "key_name=$TF_KEY_NAME"
                        '''
                    }
                }
            }
        }

        stage('Terraform Apply') {
            steps {
                dir('terraform') {
                    echo "🚀 Terraform Apply..."

                    withCredentials([
                        string(credentialsId: 'aws-access-key', variable: 'AWS_ACCESS_KEY_ID'),
                        string(credentialsId: 'aws-secret-key', variable: 'AWS_SECRET_ACCESS_KEY')
                    ]) {
                        sh '''
                            terraform apply -input=false -auto-approve tfplan
                        '''
                    }
                }
            }
        }

        stage('Deploy to AWS') {
            steps {
                echo "🚀 Deploying Docker containers on EC2..."

                sshagent(['ec2-ssh-key']) {
                    sh '''
                        chmod +x ./scripts/deploy.sh
                        ./scripts/deploy.sh
                    '''
                }
            }
        }
    }

    post {
        success {
            echo "✅ CI/CD pipeline completed successfully!"
        }
        failure {
            echo "❌ Pipeline failed. Check Jenkins console output."
        }
    }
}
