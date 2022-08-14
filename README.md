# Multi Task scheduler system

This web application which can be used to schedule, manage and monitor jobs efficiently. This application is built on latest tech stack to make use of the best aspects of design and security, thus making it an application with robust architecture.  

## Tech Stack
* React.js
* Spring Boot
* Docker
* Mysql
* Maven
* Mailing with mailtrap.io's API

# Prerequistites:
1. Install Node.js
2. Install python 3.x
3. Install Docker 
4. Install Java 11 and maven (mvm)

# To start client:
> cd multi-task-scheduler 
> npm i --legacy-peer-deps \
> npm start


# To start mysql server 
> cd multi-task-scheduler/server/src/db \
> docker compose up

# To start server:
> cd multi-task-scheduler/server
> mvn clean install \
> cd target \
> java -jar worker-1.jar


## Images 

![DashBoard](https://user-images.githubusercontent.com/43792122/184533468-37229254-c924-46c8-bded-38fb380ed16c.png)

![Schedule Job](https://user-images.githubusercontent.com/43792122/184533387-ff1ee57d-bfe9-45dd-b38e-0225ca9e43bc.png)

![Sample file Download](https://user-images.githubusercontent.com/43792122/184538528-b4c5e5a1-2bfd-4810-ab05-12e32fdf372e.png)

![Job List](https://user-images.githubusercontent.com/43792122/184533385-8174ed56-a68d-4cda-913b-8d39e099d2a7.png)

![Add Job Via User Input](https://user-images.githubusercontent.com/43792122/184533389-e3d56239-f778-4757-9325-baad2cffdf52.png)

![Task List](https://user-images.githubusercontent.com/43792122/184538406-38192be9-0f0b-4437-b862-ef6e8ac5669d.png)

![Task Filer by Time range](https://user-images.githubusercontent.com/43792122/184539349-5ab7e407-ac95-4c63-8f6c-e0f1887d387d.png)

![Alert config](https://user-images.githubusercontent.com/43792122/184533382-b01110b0-72f8-403c-ac27-faa462c6f4d4.png)

![Mail Alert](https://user-images.githubusercontent.com/43792122/184533729-9b897b02-cbf3-45b3-aa22-09594a4e920b.png)

