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

<details>
  <summary>

### **Halil Salih Orhan - Group 4**

  </summary>

## 1. Who am I?

- Name: Halil Salih Orhan
- Student ID: 2018400057
- Email: halilsalihorhan@gmail.com
- Personal wiki: [Halil Salih Orhan](https://github.com/bounswe/bounswe2022group4/wiki/Halil-Salih-Orhan)
- involved the project this semester as an Android Developer.
## 2. Responsibilities
- I have been working on the Android application of the project.
- As an newbee in the project, I should have learned the basics of the project and the structure of the project. And, create a personal wiki page for me.
- Because I am the most experienced Android developer in the team, at first, we decided to assign me initial tasks, as creating the project structure, setting up the project, and creating the initial UI.
- Due to some problems my teammates faced, I had to take over some of their tasks, as creating the login and sign up pages.
## 3. Contributions
In the demo, I have shown the following features:
- functional Login and Sign Up pages
- Navigation with bottom navigation bar
- Empty Home page
- Empty Profile page
- TimeLine page with a list of mock posts
- logout button

## 4. My Issues
### Management Related Issues
- I have created my personal wiki page. ([issue 232](https://github.com/bounswe/bounswe2022group4/issues/232) / [commit page](https://github.com/bounswe/bounswe2022group4/wiki/Halil-Salih-Orhan))
### Technical Issues
- I have created the project structure, set up the project, and created the initial UI. ( [issue 233](https://github.com/bounswe/bounswe2022group4/issues/233) /
[commit](https://github.com/bounswe/bounswe2022group4/commit/a4a274faa7c622f900529bf3172885468e79414d) )
- I have created functional the login and sign up pages. ([issue 272](https://github.com/bounswe/bounswe2022group4/issues/272) / [PR 273](https://github.com/bounswe/bounswe2022group4/pull/273))
- I have created a mock Suggestions page. ([issue 240](https://github.com/bounswe/bounswe2022group4/issues/240) / [commit](https://github.com/bounswe/bounswe2022group4/commit/7d3aee0e9ad9be2ebbf756b2c8e3e6ae1bb2b9b7))
### Issues I Reviewed
- [Issue 253](https://github.com/bounswe/bounswe2022group4/issues/253)

## 5. Pull Requests
- [heka-mobile-auth -> heka-mobile](https://github.com/bounswe/bounswe2022group4/pull/273)
- [heka-mobile -> master]


</details>

<details>
  <summary>

### **Oğuzhan TOK - Group 4**

  </summary>

## 1. Who am I?

- Name: Oğuzhan Tok
- Student ID: 2019400267
- Email: oguzhan.tok@boun.edu.tr
- Personal wiki: [Oğuzhan Tok](https://github.com/bounswe/bounswe2022group4/wiki/O%C4%9Fuzhan-Tok)
- I am working as a backend developer on the project.

## 2. Responsibilities
- I have been working on the backend API of the project.
- I took responsibility for the development of the Authentication API.
- I also took responsibility for the creation of the Postman Collection of the developed API.
- I played an active role in the planning and the distribution of the tasks within the team.

## 3. Contributions
- I have developed the following endpoints:
- /api/user/register
- /api/user/login
- /api/user/logout
- /api/user/home
- I have created the Postman Collection for the Authentication API in order Frontend and Android teams to make request easily. 

## 4. My Issues
### Code related significant issues:
-  Backend: Implement authentication API using JWT Tokens([issue 255](https://github.com/bounswe/bounswe2022group4/issues/255) /
[commit](https://github.com/bounswe/bounswe2022group4/commit/7ed4480d70f3bc10207c228af015be23ea42e4ed) )

### Management Related Issues 
- Backend: Create Postman collection for backend authentication API([issue 266](https://github.com/bounswe/bounswe2022group4/issues/266) 

### Issues and Pull Requests I Reviewed
- [heka-backend-token-time -> heka-backend](https://github.com/bounswe/bounswe2022group4/pull/294)
- [heka-backend-test -> heka-backend](https://github.com/bounswe/bounswe2022group4/pull/298)
- [heka-backend-swagger-ui -> heka-backend](https://github.com/bounswe/bounswe2022group4/pull/261)

## 5. Pull Requests
- [heka-backend -> master](https://github.com/bounswe/bounswe2022group4/pull/299)

</details>




<details>
  <summary>

###  **Yusuf Bayındır - Group 4**
    
</summary>

- Student ID: 2017400042
- Email: yusuf.bayindir@boun.edu.tr
- Personal Wiki: [Yusuf Bayındır](https://github.com/bounswe/bounswe2022group4/wiki/Yusuf-Bay%C4%B1nd%C4%B1r)
- Team: Backend Development Team
  
  ### **Responsibilities**
- I was responsible for integrating Swagger UI and implementing unit tests for registration and login functionalitites. 
- My other partial responsibilities were revisiting [Requirements](https://github.com/bounswe/bounswe2022group4/wiki/Requirements) & [Class Diagram](https://github.com/bounswe/bounswe2022group4/wiki/Class-Diagram), organizing Wiki, and notetaking for some meetings. 


### **Main contributions**
- Note taker. [CMPE451-General Meeting #1](https://github.com/bounswe/bounswe2022group4/wiki/Meeting-%231,-10.10.2022), [Backend Meeting #1](https://github.com/bounswe/bounswe2022group4/wiki/Backend-Team-Meeting-%231,-20.10.2022)
- Organizing Wiki. [Branch Management](https://github.com/bounswe/bounswe2022group4/wiki/Branch-Management)
- Backend development: [Swagger Integration](https://github.com/bounswe/bounswe2022group4/issues/254), [Unit Tests](https://github.com/bounswe/bounswe2022group4/issues/291)
- Revision on Requirements and Class Diagram. [Requirements](https://github.com/bounswe/bounswe2022group4/wiki/Requirements), [Class Diagram](https://github.com/bounswe/bounswe2022group4/wiki/Class-Diagram)


#### **Code Related Significant Issues**
* [Swagger integration](https://github.com/bounswe/bounswe2022group4/issues/254)
* [Unit tests for register and login functionalities](https://github.com/bounswe/bounswe2022group4/issues/291)


#### **Management Related Significant Issues**
* [Revision on requirements](https://github.com/bounswe/bounswe2022group4/issues/226)
* [Organizing Git workspace](https://github.com/bounswe/bounswe2022group4/issues/253)
* [Revision on Class Design](https://github.com/bounswe/bounswe2022group4/issues/302)


### **Pull Requests**
*  [Swagger Integration](https://github.com/bounswe/bounswe2022group4/pull/261)
*  [Enhancement to Swagger Integration](https://github.com/bounswe/bounswe2022group4/pull/283)
*  [Unit Tests for Register and Login Functionalities](https://github.com/bounswe/bounswe2022group4/pull/298)

</details>
