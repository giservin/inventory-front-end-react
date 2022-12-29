pipeline {
    agent none
    triggers {
        githubPush()
    }
    environment {
        IMAGE_NAME = "giservintz/fe-inventory-react"
        IMAGE_TAG = "1.0.0-test"
        CONTAINER_NAME = "fe_react"
    }
    stages {
        stage("Build Image") {
            agent {
                docker {
                    image 'docker:dind'
                    args '-v /var/run/docker.sock:/var/run/docker.sock'
                }
            }
            steps {
                sh "docker build -t ${IMAGE_NAME}:${IMAGE_TAG} ."
                withCredentials([usernamePassword(
                    credentialsId: "docker_login", 
                    usernameVariable: "DOCKER_USERNAME",
                    passwordVariable: "DOCKER_PASSWORD")]) {
                        sh 'docker login -u $DOCKER_USERNAME -p $DOCKER_PASSWORD'
                        sh "docker push ${IMAGE_NAME}:${IMAGE_TAG}"
                    }
            }
        }
        stage("Deploy Container") {
            agent {
                node {
                    label "master"
                }
            }
            steps {
                sh "docker run -d -p 80:80 --name ${CONTAINER_NAME} ${IMAGE_NAME}:${IMAGE_TAG}"
            }
        }
    }
}