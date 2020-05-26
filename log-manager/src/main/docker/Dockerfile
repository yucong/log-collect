FROM openjdk:8u181-jdk-alpine
ENV  WORKPATH /app
WORKDIR $WORKPATH
ADD log-manager-1.0.1.jar log-manager.jar
VOLUME $WORKPATH
EXPOSE 8080
ENTRYPOINT ["java","-jar","log-manager.jar"]