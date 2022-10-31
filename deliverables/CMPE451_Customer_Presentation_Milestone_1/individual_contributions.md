# **DELIVERABLES**
* [Software Requirements Specification](https://github.com/bounswe/bounswe2022group4/wiki/Requirements)
* [Software Design (UML)](https://github.com/bounswe/bounswe2022group4/wiki/Class-Diagram)
* [Scenarios](https://github.com/bounswe/bounswe2022group4/wiki/User-Scenarios) and [Mockups](https://github.com/bounswe/bounswe2022group4/wiki/Mockups)
* Project Plan
* Individual Contribution Reports
* Customer Milestone 1 Group Review

# **INDIVIDUAL REPORTS**

<details>
<summary>

### **İbrahim Melih Aktaş - Group 4**

</summary>
  
### **Responsibilities**
My main responsilibity was the deployment. Dockerizing backend and deploying it on the AWS EC2 machine. Creating a CI/CD pipeline with Github Actions. 


### **Main contributions**
* I created an AWS account and a user with necessary permissions(#251, #252). 
* I created Dockerfile and docker-compose.yml to dockerize our project's backend(#249). 
* I prepared a CI/CD pipeline using Github Actions(#250). It builds docker image and it pushes it to the AWS ECR. Then it connects to our EC2 machine, pulls new image and runs it on the [EC2 machine](http://3.75.133.58:8080/swagger). 
* I increased the token expiration time in order to make testing easier.


#### **Code Related Significant Issues**
* [Create a Github Actions Workflow for backend deployment](https://github.com/bounswe/bounswe2022group4/issues/250)
* [Create a new AWS account](https://github.com/bounswe/bounswe2022group4/issues/251)
* [Create a user for the AWS with the necessary permissions](https://github.com/bounswe/bounswe2022group4/issues/252)
* [Backend: Increase token expiration time](https://github.com/bounswe/bounswe2022group4/issues/293)

#### **Management Related Significant Issues**
* [Commit message format](https://github.com/bounswe/bounswe2022group4/issues/292)



### **Pull Requests**
*  [Heka backend deployment](https://github.com/bounswe/bounswe2022group4)
*  [Increase JWT token expiration time](https://github.com/bounswe/bounswe2022group4)


### **Additional Information**
.
</details>

