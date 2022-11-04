# **Group Review**

## Executive Summary

### *Description*
HEKA is a medical experience sharing platform where users share their ideas and experiences related to medical issues in a restricted social environment. 
It serves as native web and Android application.
### *Overall Status*
Team members went over the requirements and design diagrams of the application and planned the implementation phase. The team were divided into three groups forming backend, frontend, and mobile teams. The implementation phase was initiated no sooner than the formation of teams. The main objective was to get a fully-deployed application with registration, login, and logout functionalities up until Milestone 1. In addition, frontend and mobile team asked backend team to integrate Swagger IO to the application to get self-generated API documentation, which is believed to help not only frontend and mobile team members pursue their own development easily but also customers to visualize and test the existing APIs during the development phase. Due to some inconsistencies in the deployment pipeline of frontend application, the objective was partially fulfilled. After the demo, team members planned to to fix the deployment pipeline of frontend application as soon as possible and integrate it with the fully-deployed backend application.

### *API URL(s)*
- /api/user/register
- /api/user/login
- /api/user/logout
- /swagger/

### *Current Functionality of HEKA*
- Users could register, login to the application, and logout from the application via native Android application.



## List and status of deliverables.

|Deliverable|Status|Date Delivered| 
|-----|:--------:|:------:| 
|[Software Requirements Specification](https://github.com/bounswe/bounswe2022group4/wiki/Requirements)| Not Delivered |04/11/2022 |
|[Software Design (UML):Use-Case Diagram](https://github.com/bounswe/bounswe2022group4/wiki/Use-Case-Diagram)|Delivered|01/11/2022|
|[Software Design (UML):Class Diagram](https://github.com/bounswe/bounswe2022group4/wiki/Class-Diagram)|Delivered|01/11/2022|
|[Software Design (UML):Sequence Diagram](https://github.com/bounswe/bounswe2022group4/wiki/Sequence-Diagrams)|Delivered|01/11/2022|
|[Scenarios](https://github.com/bounswe/bounswe2022group4/wiki/User-Scenarios) and [Mockups](https://github.com/bounswe/bounswe2022group4/wiki/Mockups) | Delivered | 01/11/2022|
|Project Plan|Not Delivered|-|
|[Individual Contribution Reports](https://github.com/bounswe/bounswe2022group2/blob/master/deliverables/CMPE451_Customer_Presentation_Milestone_1/deliverables.md#Individual-Contributions-Report)|Delivered|01/11/2022|
|[Software](https://github.com/bounswe/bounswe2022group2) | Delivered | 01/11/2022| 
|Mobile Deliverables ([Manual](https://github.com/bounswe/bounswe2022group2/wiki/System-Manual),     [APK](https://github.com/bounswe/bounswe2022group2/wiki/Learnify-Mobile-APK))|Delivered |01/11/2022|
|Group Review (This Document) | Delivered | 04/11/2022|







## Evaluation of the status of deliverables and its impact on your project plan.









## Evaluation of tools and processes you have used to manage your team project.
- AWS ECR: We used this to store docker images of the backend and the database. It is easy to use.
- AWS EC2: It is one of the most popular cloud platforms. EC2 machines are easy to create and manage. Since it is very popular, it is easy to find sources about them.
- Github Actions: We used it to create a CI/CD pipeline for the backend. Since it is integrated to the github, CI/CD pipeline status looks great when a contributer commits to the predefined branches. 
- PostgreSQL: It is popular and easy to use. There are a lot of sources about its integration with Github.
- Postman
- ProjectLibre
- Android Studio
- Class Diagram çizdiğimiz tool



## The requirements addressed in this milestone.









## Overall description of responsibilities that are assigned to each member.










## A Summary of work performed by each team member (in tabular format)
Team Member  | Work Performed
------------- | -------------
İbrahim Melih Aktaş  | I created the most basic form of the backend with the Django. I created Dockerfile and docker-compose.yml for the Django backend and the postgreSQL database. I created an AWS account and create an appropriate user with the necessary permissions. I created an EC2 machine. I created a CI/CD  pipeline with the Github Actions which detects the commits on the heka-backend branch and builds the Docker image. Then that pipeline pushes that Docker image to a public repository on the AWS ECR and then it connects to the EC2 machine on the AWS by using SSH connection. Then it pulls the image from the AWS ECR and runs a container on that EC2 instance. 
Content Cell  | Content Cell
