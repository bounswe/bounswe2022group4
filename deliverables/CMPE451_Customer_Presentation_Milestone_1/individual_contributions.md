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
    
###  **Umut Deniz Şener - Group 4**
    
</summary>
  
* Name: Umut Deniz Şener
* Student ID: 2018400225
* Personal Wiki: [Umut Deniz Şener](https://github.com/bounswe/bounswe2022group4/wiki/Umut-Deniz-%C5%9Eener)
* Team: Frontend Team
  
### **Responsibilities**
  * Creating a code base for frontend team in order to start building our web application HEKA.
  * Implementing a navigation bar that allows users navigating to another components.
  * Implementing Post component.
  * Implementing PostBox component which renders multiple posts.
  * Implementing Home Page.
  * Implementing unit test cases for Home Page.
  * Implementing the backend connection base for the web application.
  * Implementing functions that make requests to the backend easily.
  * Improving UI of the sign in and sign up pages.
  * Reviewing the pull requests and issues in frontend team.
  * Providing support to other frontend team members while they encountered a problem.
  * Making research on React Hooks, Saas, Css Text Animations, Responsive Css Design, React Libraries.
  * Implementing a structure for Lifting State Up.

### **Main contributions**

Since i have some experience in React before, I have created the code base for the frontend team (Arranging folder and file formats, Implementing router mechanism, Installing libraries). Then i have implemented the navigation bar by using best practises of React and css. I also responsible for the home page. In the home page we need to render the posts written by the users. In order to do that i first created Post component that renders a single post. Then i have implemented PostBox component that renders multiple post with the data i have created. Then i implemented HomePage component with the PostBox component and implemented unit test cases for these components. I also create a backend connection base by using appropriate React libraries and implement postLogin and postRegister functions that enable easily making http request to the relevant rest apis. I also added css animations to the navigation bar and home page and helped to improve ui of the login and sign up pages. Lastly, I implemented a structure for lifting state up that allow us to store global states in React after i implement it I hide private components from unauthorized users.


#### **Code Related Significant Issues**
* [Frontend: Create a Code Base for Frontend Team](https://github.com/bounswe/bounswe2022group4/issues/231)
* [Frontend: Create a Navigation Bar for Web Application](https://github.com/bounswe/bounswe2022group4/issues/236)
* [Frontend: Implement Post and PostBox Component Structure for Home Page](https://github.com/bounswe/bounswe2022group4/issues/257)
* [Frontend: Frontend: Render the Posts in the HomePage](https://github.com/bounswe/bounswe2022group4/issues/260)
* [Frontend: Creating A Base For Backend Connection](https://github.com/bounswe/bounswe2022group4/issues/270)
* [Frontend: UI Improvement For Login Page](https://github.com/bounswe/bounswe2022group4/issues/275)
* [Frontend: UI Improvement For Navigation Bar](https://github.com/bounswe/bounswe2022group4/issues/277)
* [Frontend: UI Improvement For Home Page](https://github.com/bounswe/bounswe2022group4/issues/287)
* [Frontend: Unit Test Cases For Home Page](https://github.com/bounswe/bounswe2022group4/issues/285)
* [Frontend: Lifting State Up Login Information](https://github.com/bounswe/bounswe2022group4/issues/300)

#### **Management Related Significant Issues**
* [Revision on Recommendation Requirements](https://github.com/bounswe/bounswe2022group4/issues/228)
* [Update Personal Wiki Page](https://github.com/bounswe/bounswe2022group4/issues/304)

### **Pull Requests**
*  [Creating A Base For Backend Connection](https://github.com/bounswe/bounswe2022group4/pull/271)
*  [UI Improvement For Login Page](https://github.com/bounswe/bounswe2022group4/pull/276)
*  [UI Improvement For Navigation Bar](https://github.com/bounswe/bounswe2022group4/pull/278)
*  [UI Improvement For Home Page](https://github.com/bounswe/bounswe2022group4/pull/289)
*  [Unit Test Cases For Home Page](https://github.com/bounswe/bounswe2022group4/pull/290)
*  [Store Login Info in Global State and Using In Navigation Bar](https://github.com/bounswe/bounswe2022group4/pull/301)

### **Additional Information**
Since i created the code base for the frontend team. I make my first commits directly to main frontend branch. So the issues that i first implemented could not seen in the pull request i put the relevant commit links below:
* [Commit: Create a Code Base for Frontend Team](https://github.com/bounswe/bounswe2022group4/commit/8942126cbe9f4a7ae4ae0f2a73a85660c6409abd)
* [Commit: Create a Navigation Bar for Web Application](https://github.com/bounswe/bounswe2022group4/commit/a3274bd38ceb60468a96f5c375d00289a07a60e1)
* [Commit 1: Implement Post and PostBox Component Structure for Home Page](https://github.com/bounswe/bounswe2022group4/commit/2cf41b10ba35f1cfcab88874c9deef135645ae98)
* [Commit 2: Implement Post and PostBox Component Structure for Home Page](https://github.com/bounswe/bounswe2022group4/commit/e980a415b8751fa4302df286923310d3c1a0420e)
* [Commit: Render the Posts in the HomePage](https://github.com/bounswe/bounswe2022group4/commit/dc4439ea02b40eceab1b492e84c0e4673dd237ce)

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





