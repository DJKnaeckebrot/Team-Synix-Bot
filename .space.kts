/**
* JetBrains Space Automation
* This Kotlin-script file lets you automate build activities
* For more info, see https://www.jetbrains.com/help/space/automation.html
*/

job("Build and push Docker") {
    docker {
        build {
            context = "docker"
            file = "./Dockerfile"
            labels["vendor"] = "mrdennis1212"
            args["HTTP_PROXY"] = "http://10.20.30.1:123"
        }

        push("dennis.registry.jetbrains.space/p/team-synix-bot/containers/synixbot:latest") {
            tags("latest")
        }
    }
}
