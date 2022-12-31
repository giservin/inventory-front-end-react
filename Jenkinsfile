@Library("belajar-jenkins-shared-library@main") _

k8sPipeline([
    type: "frontend",
    image_name: "giservintz/fe-inventory-react",
    image_tag: "1.0.5",
    doBuild: false,
    dockerCredentials: "docker_login",
    deployment: "frontend-react"
])