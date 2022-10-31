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

