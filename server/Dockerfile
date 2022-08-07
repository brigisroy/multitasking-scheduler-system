FROM maven:3.6-jdk-11
WORKDIR /mts
COPY pom.xml .
RUN mvn clean install
#ADD target/worker-1.jar worker.jar
ENTRYPOINT ["java","-Dspring.profiles.active=prod","-jar","target/worker-1.jar"]