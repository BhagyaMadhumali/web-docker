pipeline {
    agent any

    environment {
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
                        string(credentialsId: 'aws-secret-key', variable: 'AWS_SECRET_ACCESS_KEY')
                    ]) {
                        sh '''
                            # Export Terraform variables
                            export TF_VAR_aws_region="us-east-1"
                            export TF_VAR_aws_access_key="$AWS_ACCESS_KEY_ID"
                            export TF_VAR_aws_secret_key="$AWS_SECRET_ACCESS_KEY"
                            export TF_VAR_key_name="jobprotalwebserver"
                            export TF_VAR_vpc_id="vpc-082722fbe85595cd4"  # <-- replace with your actual VPC ID

                            terraform --version
                            terraform init -input=false
                            terraform plan -input=false -out=tfplan
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
                            export TF_VAR_aws_region="us-east-1"
                            export TF_VAR_aws_access_key="$AWS_ACCESS_KEY_ID"
                            export TF_VAR_aws_secret_key="$AWS_SECRET_ACCESS_KEY"
                            export TF_VAR_key_name="jobprotalwebserver"
                            export TF_VAR_vpc_id="vpc-082722fbe85595cd4"  # <-- replace with your actual VPC ID

                            terraform apply -input=false -auto-approve tfplan
                        '''
                    }
                }
            }
        }

        stage('Deploy to AWS') {
            steps {
                sshagent(['EC2 Server SSH Key']) {
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
