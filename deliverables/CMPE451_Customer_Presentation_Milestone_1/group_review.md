# **Group4 Review of Milestone 1**

1. [Executive Summary](#executive-summary)
2. [List and status of deliverables](#list-and-status-of-deliverables)
3. [Evaluation of the status of deliverables and its impact on your project plan](#evaluation-of-deliverables)
4. [Evaluation of tools and processes you have used to manage your team project](#evaluation-of-tools-and-processes)
5. [The requirements addressed in this milestone](#requirements)
6. [Overall description of responsibilities that are assigned to each member](#responsibilities)
7. [A Summary of work performed by each team member (in tabular format)](#summary-of-work)

---------





## Executive Summary

### *Description*
HEKA is a medical experience sharing platform where users share their ideas and experiences related to medical issues in a restricted social environment. 
It serves as native web and Android application.
### *Overall Status*
Team members went over the requirements and design diagrams of the application and planned the implementation phase. The team were divided into three groups forming backend, frontend, and mobile teams. The implementation phase was initiated just after the formation of teams. The main objective was to get a fully-deployed application with registration, login, and logout functionalities up until Milestone 1. In addition, frontend and mobile team asked backend team to integrate Swagger IO to the application to get self-generated API documentation, which is believed to help not only frontend and mobile team members pursue their own development easily but also customers to visualize and test the existing APIs during the development phase. Due to some inconsistencies in the deployment pipeline of frontend application, the objective was partially fulfilled. After the demo, team members planned to to fix the deployment pipeline of frontend application as soon as possible and integrate it with the fully-deployed backend application.

### *API URL(s)*
- /api/user/register
- /api/user/login
- /api/user/logout
- /api/user/home
- /swagger

### *Current Functionality of HEKA*
- Users could register, login to the application, and logout from the application via native Android application.

---------

## List and status of deliverables of Milestone I

|Deliverable|Status change since Milestone I|Date Delivered| 
|-----|:--------:|:------:| 
|[Software Requirements Specification](https://github.com/bounswe/bounswe2022group4/wiki/Requirements)| Delivered |01/11/2022 |
|[Software Design (UML):Use-Case Diagram](https://github.com/bounswe/bounswe2022group4/wiki/Use-Case-Diagram)|Delivered|01/11/2022|
|[Software Design (UML):Class Diagram](https://github.com/bounswe/bounswe2022group4/wiki/Class-Diagram)|Delivered|01/11/2022|
|[Software Design (UML):Sequence Diagram](https://github.com/bounswe/bounswe2022group4/wiki/Sequence-Diagrams)|Delivered|01/11/2022|
|[Scenarios](https://github.com/bounswe/bounswe2022group4/wiki/User-Scenarios) and [Mockups](https://github.com/bounswe/bounswe2022group4/wiki/Mockups) | Delivered | 01/11/2022|
|[Project Plan](https://github.com/bounswe/bounswe2022group4/wiki/Project-Plan)|Delivered|04/11/2022|
|[Individual Contribution Reports](https://github.com/bounswe/bounswe2022group4/blob/master/deliverables/CMPE451_Customer_Presentation_Milestone_1/Customer_Milestone_1.md)|Delivered|01/11/2022|
|[Software Release](https://github.com/bounswe/bounswe2022group4/releases/tag/customer-presentation-1) | Delivered | 01/11/2022| 
|Mobile Deliverables [APK](https://github.com/bounswe/bounswe2022group4/releases/download/customer-presentation-1/heka-mobile.apk)|Delivered |01/11/2022|
|Group Review  | Not Delivered | 04/11/2022|


---------

## Evaluation of Deliverables

We remade the project plan according to the changes in the requirements and added new group members to the plan. Project plan includes main tasks of our project. Each task is assigned to one or more group member with an estimated completion time. The details of the future tasks are subject to change according to customer meetings. As we progress through the project, when new tasks show up we added them to the plan. Final form of our project plan is delivered.






---------


## Evaluation of Tools and Processes

#### **- Android Studio**

At the begginning our mobile team consisted of 3 people. And two of them know the android development with kotlin. So we decded to use kotlin and Android Studio to develop a Android app. Only one of us need to learn something about these stuffs. Android development with Kotlin has bunch of resource to learn. It is the most popular way of developing some android project. We prefeted to use official Google codelabs to learn how to develop with Kotlin. It have a huge community which google back,and people could find solution or way to implement what to do fast. In android, UI part of the project has divided from the logic part with an XML file. Which provide simplicity of project development project and easyfy the finding he code part which intended to change. Android development with Kotlin provide best performance compared to cross-platform frameworks. The down side of the Kotlin and Android studio is learning curve is slow. It is too effective but doing what you want could be real stress-ball sometimes.

#### **- Discord**
We used Discord as main communication tool. We hold all team meetings on Discord. We created different voice channel and text channel. Since we were divided into sub-teams ,as Front-end, Mobile and Backend, we created different voice and text channel. Therefore, we prevented possible confusion between sub-teams. We also created generel voice and text channel to provide a common communication between all sub-teams. We found to be practical since it is easy to use and free. The fact that all members were already familiar with it is why we choose Discord as our main communication tool. 

#### **- Github**
Github is a platform where all the work that we have done gets together. We keep ourselves up to date by following the wiki page. It gives the opportunity to trace project and individuals by using Github commit history. Github has been the most important tool during development process for us since it provide commen place for everthing we have done so far. We used branch feature of Github for seperating subteams from each other. Therefore, they had opportinit to work not affecting each other. This branch feature also help to track which functionalities were implemented. Thanks to Github, all team members have worked simultaneously. As a result, we found Github to be practical thanks to feature it proive about tracking and project management.

#### **- React**
Using React.js for web development came in extremely convenient because React is one of those cases where you get the hang of a single technology to easily reuse it across a range of platforms. React is not a framework. It is a library of Javascript.Its library approach allow React to evolve into such a remarkable tool. Since React's popularity is grown extremly, we found a lot of resources that are helpful for our project. The other advantage of React is simple to learn. It has very few concepts to learn. Thanks to virtual DOM, React improve its performance compared to JavaScript. We found React to be useful in terms of testing. It provides different test methodologies so it was a advantege for the testing phase of our project.

#### **- Python Django Rest Framework**
We used Django  framework to implement the backend of our project. We found Django to be useful since it provides many built-in function that make easy to implement the a lot of feature such as password hashing, customized module for database design  etc. It was very easy to connect our application to database using Django without any extra effort. The other advantage of using Django Framework was very easy to learn. There are wide range of resources such as tutorial videos, solutions of possible errors that regular programmer can encounter. Therefore, using Django for the backend development made faster to implement the backend of our project.


#### **- Docker**
We used to dockerize the frontend and backend to automate deployment since developming the project on everyone's local environments was not feasible. Dockerization files work well, but in the process of deployment an error occured about extensive amount cache. We are trying to solve that problem as soon as possible.

#### **- Visual Studio Code**
We used Visual Studio Code as our IDE for the development. Thanks to its extensions for wide range of programming languages, VSCode gave a oppotunity to implement our tasks easily. It give some error messages and possible corrections about in the case of wrong syntax. Therefore, we can focues on logic of implementation not syntax.





#### **- AWS**
* AWS ECR: We used this to store docker images of the backend and the database. It is easy to use.
* AWS EC2: It is one of the most popular cloud platforms. EC2 machines are easy to create and manage. Since it is very popular, it is easy to find sources about them.



#### **- Lucidchart**
Lucidchart is quite useful proprşetary platform that is used to allow users to collaborate on drawing and sharing charts and diagrams. One of the most significant advantages of Lucidchart is being easy to use. It is well fit tool if you are working a team to draw some diagrams aor charts simultaneously. It gives enough properties when you use your boun email address to log in.  



#### **- PostgreSQL**
It is popular and there are a lot of sources about its integration with Github. It is very easy to use with the official docker image downloaded from Docker Hub. PostgreSQL's community support and ease of use received positive feedback from the team.



#### **- Postman**
We used Postman while using the API which developed by our backend team.  Postman Collection which created by the backend team is really helpfull while using the API. Our Frontend and Android teams made HTTP request from Postman and understand the API.





---------


## Requirements

### Glossary

* **User:** *A person who uses or interacts with the application.*
* **Admin:** *A  user type that has special privileges to manage the system.*
* **Follow:** *Feature that user can use for tracking the discussion thread.*
* **Unfollow:** *Feature that user can use for untracking the discussion thread.*
* **Username:** *Identification used by the users to access application.*
* **Password:** *Secret word or phrase that must be used to access application.*
* **Homepage:** *The introductory page of the application.*
* **Post:** *Piece of writings with attachments under categories that are intended to share a medical experience or domain-specific knowledge.*
* **Comment:** *Tool of communication and discussion under a post.*
* **Patient:** *An individual under certain medical care.*
* **Disease:** *A pathological process, deviation from a biological norm.*
* **Illness:** *A feeling or an experience of unhealth which is entirely personal, interior to the person of the patient (No disease can be found.).*
* **Symptom:** *Any indication of disease perceived by the patient.*
* **Drug:** *Any substance, other than food, used in the prevention, diagnosis, alleviation, treatment, or cure of disease.*
* **Forum:** *A medium for sharing a medical experience or domain-specific knowledge via posts.*



### 1.Functional Requirements
<ul>

### 1.1 User Requirements




<ul>
<details>

<summary><strong>1.1.1 Authentication</strong></summary>



* **1.1.1.1 Sign Up** 
  * **1.1.1.1.1** *Users shall provide their first name and last name.*

  * **1.1.1.1.2** *Users shall provide a username and e-mail address that are unique in the system.*

  * **1.1.1.1.3** *Users shall be notified by a message "This username/e-mail address is already in use. Please enter a new username/e-mail address." if they enter a username or email address that is already in use .*

  * **1.1.1.1.4** *Users shall set a password that is longer than 8 characters and contains at least one upper case letter, one lower-case letter, and one number.* 


* **1.1.1.2. Sign In**

  * **1.1.1.2.1** *Users shall provide their e-mails and passwords for signing in.*

  * **1.1.1.2.2** *Users shall get a warning message which is " Your e-mail or password is wrong." if the provided e-mail or password is wrong.*
  * **1.1.1.2.3** *Users shall see the home page after signing in successfully.*

</details>

<details>
<summary><strong>1.1.2. User Interactions</strong></summary>

* **1.1.2.1 Forum**

  * **1.1.2.1.1** *Users shall be able to create posts.*
  * **1.1.2.1.2** *Users shall be able to comment under other users' post and comments.*
  * **1.1.2.1.3** *Users shall add a title while creating posts.*
  * **1.1.2.1.4** *Users shall add  a body text to their posts and comments.*
  * **1.1.2.1.5** *Users shall be able to read a post shared by another user.*
  * **1.1.2.1.6** *Users shall be able to edit their posts and comments.*
  * **1.1.2.1.7** *Users shall be able to delete their posts and comments.*
  * **1.1.2.1.8** *Admins shall be able to delete any post or comment if required.*
  * **1.1.2.1.9** *Users shall be able to see all posts.*
  * **1.1.2.1.10** *Users shall be able to follow users.*
  * **1.1.2.1.11** *Users shall be able to unfollow users.*


* **1.1.2.2 Profile Pages**

  * **1.1.2.2.1** *Users shall have a profile page.*
  * **1.1.2.2.2** *Users shall be able to log out from their profile pages.*
  * **1.1.2.2.3** *Users shall see other users' user type from their profile pages.*
  * **1.1.2.2.4** *Users shall see other users' avatars from their profile pages.*
  * **1.1.2.2.5** *Users shall see other users' past comments and post from their profile pages.*
  * **1.1.2.2.6** *Users shall have their usernames visible on their profile pages.*

</details>

</ul>
</ul>

<ul>

### 1.2 System Requirements

<ul>

<details>
<summary><strong>1.2.1. Forum</strong></summary>

* **1.2.5.10.** *The system shall display the top posts of the current category.*

</details>

<details>
<summary><strong>1.2.2. Admin Features</strong></summary>


</details>

</ul>

</ul>


### 2.Non-Functional Requirements

<ul>

<details>
<summary><strong>2.1 Reliability Requirements </strong></summary>

* **2.1.1.** *The system shall always run up to 2000 users.*
* **2.1.2.** *The system shall be portable for website and application.*
* **2.1.3.** *The system shall respond to any user no later than 4 seconds.*


</details>
<details>
<summary><strong>2.2 Availability Requirements </strong></summary>

* **2.2.1.** *The system language shall be English.*
* **2.2.2.** *The system shall be available as a native web application in browsers.*
* **2.2.3.** *The system shall be available as a native mobile application on Android platforms.*


</details>

<details>
<summary><strong>2.3 Security </strong></summary>

* **2.3.1.** *The system shall prevent various cyber-attacks by providing SSL certificates to its users (HTTPS).*
* **2.3.2.** *The system shall properly implement security configurations and perform any necessary hardening.*
* **2.3.3.** *The system shall ensure an ongoing plan for monitoring, triaging, and applying updates or configuration changes for the lifetime of the application.
* **2.3.4.** *The system shall use the HTTPS protocol to transfer encrypted data over the web.*

</details>


<details>
<summary><strong>2.4 Standards</strong></summary>

* **2.4.1.** *The annotations shall be compliant with the [W3C Web Annotation Data Model.](https://www.w3.org/TR/annotation-model/)*




</details>

<details>
<summary><strong>2.5. Legal Requirements </strong></summary>

* **2.5.1** *The system shall contain a comprehensive, clear, and accessible privacy policy.*
* **2.5.2.** *The system shall comply with the Law on the Protection of Personal Data No. 6698 (KVKK).*
* **2.5.3.** *The system shall comply with [GDPR](https://gdpr-info.eu/).*
* **2.5.4.** *Users shall accept the privacy policy suggested when registering.*




</details>

</ul>

------------------

## Responsibilities
Team Member  | Responsbilities
------------- | -------------
İbrahim Melih Aktaş  | My main responsibilites was the deployment. Creating Dockerfile and docker-compose.yml for the Django backend and the PostgreSQL database. Creating a CI/CD pipeline with Github Actions. Management of the AWS account and the products like ECR and EC2. 
Yusuf Bayındır | Integrating Swagger UI into the application. Implementing unit tests for registration and login functionalities. Revision on the requirements and the class diagram. Some other management related responsibilites.(notetaking, Wiki management, etc.) 
Umut Deniz Şener | Creating a code base for frontend team in order to start building our web application HEKA. Implementing a navigation bar that allows users navigating to another components. Implementing Post component. Implementing PostBox component which renders multiple posts. Implementing Home Page. Implementing unit test cases for Home Page. Implementing the backend connection base for the web application. Implementing functions that make requests to the backend easily. Improving UI of the sign in and sign up pages. Reviewing the pull requests and issues in frontend team. Providing support to other frontend team members while they encountered a problem. Making research on React Hooks, Saas, Css Text Animations, Responsive Css Design, React Libraries. Implementing a structure for Lifting State Up.
[Erdinç Günaydın](https://github.com/bounswe/bounswe2022group4/wiki/Erdinç-Günaydın) | i. Making research on Android development, libraries and development conventions on Android </br> ii. Getting knowledge on Kotlin.  </br> iii. Reviewing of the works which have done by other team members. </br> iv. Implementation of the profile pages both doctor and normal user. </br> v. Costumizing the theme of mobile app and providing the compatibility with front-end product. </br> vi. Set and costumize of communication channel. </br> vii. Documenting the meeting notes when needed.
Oğuzhan Tok |  Implementation of the Authentication API for the application. Creation of the Postman Collection for the Authentication API. Revision on the project plan. Some other responsibilites such as reviewing the pull requests.  
[Berat Damar](https://github.com/bounswe/bounswe2022group4/wiki/Berat-Damar)| i. Revision of requirements and making necessary changes.  </br> ii. Making research on Frontend development technologies. </br> iii. Learning HTML and CSS before starting to learn React.  </br> iv. Learning frontend development using React. </br> v. Designing and implementation of login page.  </br> vi. Implementing the backend connection between the sign up page and our REST API. </br> vii. Conducting a research about testing methodlogies in React and providing base structure for unit tests. </br> viii. Writing meeting notes for general team and fronend team. </br> iv. Reviewing the works done by the frontend team.  </br> v. Revision on Use Case Diagram
Elif Tokluoğlu |  Learning Django REST Framework. Implementing unit test for logout functionality. Creation of the Project Plan.

----------------

## Summary of Work
Member | Work Done So Far
------------- | -------------
İbrahim Melih Aktaş | I created the boilerplate of the backend with the Django. I created Dockerfile and docker-compose.yml for the Django backend and the postgreSQL database. I created an AWS account and create an appropriate user with the necessary permissions. I created an EC2 machine. I created a CI/CD  pipeline with the Github Actions which detects the commits on the heka-backend branch and builds the Docker image. Then that pipeline pushes that Docker image to a public repository on the AWS ECR and then it connects to the EC2 machine on the AWS by using SSH connection. Then it pulls the image from the AWS ECR and runs a container on that EC2 instance. I increased the token expiration time in order to make testing easier. I reviewed the pull requests created by the other team members from the backend. 



 Member | Work Done So Far
------------- | -------------
 Umut Deniz Şener | Since i have some experience in React before, I have created the code base for the frontend team (Arranging folder and file formats, Implementing router mechanism, Installing libraries). Then i have implemented the navigation bar by using best practises of React and css. I also responsible for the home page. In the home page we need to render the posts written by the users. In order to do that i first created Post component that renders a single post. Then i have implemented PostBox component that renders multiple post with the data i have created. Then i implemented HomePage component with the PostBox component and implemented unit test cases for these components. I also create a backend connection base by using appropriate React libraries and implement postLogin and postRegister functions that enable easily making http request to the relevant rest apis. I also added css animations to the navigation bar and home page and helped to improve ui of the login and sign up pages. Lastly, I implemented a structure for lifting state up that allow us to store global states in React after i implement it I hide private components from unauthorized users.



Member | Work Done So Far
------------- | -------------
Berat Damar | Firstly, I conduct a research to determine which technologies we use for frontend development. We decided to use React considering requirements of our project. Since I do not have any experience in frontend development, I conducted a research  for HTML, CSS and Reach. I watched tutorials about them and practiced them. After learning process, I started to design Sign In page of the application. After completing design proccess, I started to implement Sign In page and then I provided backend connection of Sign In page using API's provided by backend team. After implementation of Sign In page, I conducted a research about testing methodologies in React. According to the research, I created a testing base for frontend and then I wrote tests for Sign In page. I also reviewed a lot of pull requests. I took meeting notes for general and frontend meetings. Addition to implementation, I contributed to project design and management processes, I revised requirements, use case diagram, evaluation of tools and processes for Milestone 1. I also created a table about works done  by me. You can look at [here](https://github.com/bounswe/bounswe2022group4/wiki/Milestone-1:-Summary-of-Work--(Berat-Damar)) for table.


 
 Member | Work Done So Far
------------- | -------------
Oğuzhan Tok | Since i do not have any experience in Django Framework before, I studied the Django Framework for a while. After learning process, I started to implement authentication mechanism of the application. I have developed 4 endpoints which are /api/user/login, /api/user/logout, /api/user/register and /api/user/home. With the help of these endpoints, application can authenticate users. After the development of the authentication mechanism, I have created the Postman Collection for the Authentication API in order Frontend and Android teams to make request easily. I think this collection is really helpfull for the rest of the group. I also played an active role in the planning and the distribution of the tasks within the backend team. Finally I have revisioned the project plan and some changes have done according to new improvements.   





  Member | Work Done So Far
------------- | -------------
Miraç Batuhan Malazgirt| Since I did not have any experience with React before this project I had to start from the scratch. First I have finished an 10 hour React bootcamp video. After that using the best practices I have started to code the section of the project that is assigned to me. The assigned part was Profile Page. First I have designed the structure of the page. After that I have started researching to find best React library to use. I have decided to Reactstrap. I have begun to implement the components of the project. I have implemented Card, Modal components and also using row and col's from the library I have implemented the general structure design of the page. Lastly I have prepared realistic data for presentation that will be done in the lecture hours. After all of that I have created my pull request and closed the issues, I also made contributions to the deployment side of the project. * [Frontend: Create the Profile Page Section of the Project ( 1/4th of the frontend side )](https://github.com/bounswe/bounswe2022group4/issues/263)



  Member | Work Done So Far
---- | ---
Yusuf Bayındır | First, I went through a learning phase to acquire the minimum foundation to build a backend application using Django REST framework. I implemented parts that integrate Swagger UI into the applications and unit tests for registration and login functionalities. I was also responsible for some design related and management tasks such as notetaking, Wiki management, revision on Requirements & Class Diagram. All the related issues and pull requests are listed in **Individual Reports**. Lastly, I filled out *Executive Summary* section to reflect the current status of the application.


  Member | Work Done So Far
---- | ---
Elif Tokluoğlu | I didn't have any experience with building a backend application using Django REST Framework. I did some research on Django REST Framework and learned how to build a backend application with it. I wrote unit test for logout functionality. I prepared project plan. Finally I filled Status of Deliverables and Impact on Project Plan part of group review.


* Erdinç Günaydın

|Issue or Pull Request |Related Link|
|-----|:--------:|    
|Learning Mobile Development with Kotlin |[issue](https://github.com/bounswe/bounswe2022group4/issues/246)|
|Communication Channel Update|[issue](https://github.com/bounswe/bounswe2022group4/issues/229)|
|Revision on Recommendation Requirements|[issue](https://github.com/bounswe/bounswe2022group4/issues/228)|
|Revision of Sidebar|[issue](https://github.com/bounswe/bounswe2022group4/issues/244) |
|Mobile: Implementation of Profile Page|[issue](https://github.com/bounswe/bounswe2022group4/issues/259)|
|Filling of forgotten mobile team meeting notes I-II-III|[issue](https://github.com/bounswe/bounswe2022group4/issues/326)|
|Taking and documenting General Meeting Notes 5 | [issue](https://github.com/bounswe/bounswe2022group4/issues/327)|
|Arrange and filling of General Meeting Notes 2 and 3 | [issue](https://github.com/bounswe/bounswe2022group4/issues/245)|
|Mobile: Profile page implemented | [pull-request](https://github.com/bounswe/bounswe2022group4/pull/319)|



