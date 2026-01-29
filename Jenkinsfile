pipeline {
    agent any

    environment {
        // DockerHub credentials
        DOCKER_USER = credentials('dockerhub-creds')
        // AWS credentials
        AWS_KEY     = credentials('aws-access-key')
        AWS_SECRET  = credentials('aws-secret-key')
        // EC2 Key Pair for Terraform
        KEY_NAME    = credentials('ec2-key-name') // <-- Add this in Jenkins credentials
        // Ensure Jenkins finds Terraform
        PATH        = "/usr/bin:/usr/local/bin:$PATH"
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
                withEnv(["PATH+TOOLS=/usr/bin:/usr/local/bin"]) {
                    echo "🛠 Building Docker images..."
                    sh 'chmod +x ./scripts/build.sh'
                    sh './scripts/build.sh'
                }
            }
        }

        stage('Push Docker Images') {
            steps {
                withEnv(["PATH+TOOLS=/usr/bin:/usr/local/bin"]) {
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
                    echo "🔧 Initializing Terraform..."
                    sh 'terraform init -input=false'

                    echo "📄 Running Terraform plan..."
                    withEnv([
                        "AWS_KEY=${AWS_KEY}",
                        "AWS_SECRET=${AWS_SECRET}",
                        "KEY_NAME=${KEY_NAME}"
                    ]) {
                        sh """
                            terraform plan -input=false -out=tfplan \
                            -var 'aws_access_key=${AWS_KEY}' \
                            -var 'aws_secret_key=${AWS_SECRET}' \
                            -var 'key_name=${KEY_NAME}'
                        """
                    }
                }
            }
        }

        stage('Terraform Apply') {
            steps {
                dir('terraform') {
                    echo "🚀 Applying Terraform..."
                    withEnv([
                        "AWS_KEY=${AWS_KEY}",
                        "AWS_SECRET=${AWS_SECRET}",
                        "KEY_NAME=${KEY_NAME}"
                    ]) {
                        sh 'terraform apply -input=false -auto-approve tfplan'
                    }
                }
            }
        }

        stage('Deploy to AWS') {
            steps {
                withEnv(["PATH+TOOLS=/usr/bin:/usr/local/bin"]) {
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
