FROM openjdk:11
WORKDIR /mts

ADD target/worker-1.jar worker.jar
ENTRYPOINT ["java","-Dspring.profiles.active=dev","-jar","worker.jar"]