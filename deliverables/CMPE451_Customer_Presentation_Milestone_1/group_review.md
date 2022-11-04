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
- /swagger/

### *Current Functionality of HEKA*
- Users could register, login to the application, and logout from the application via native Android application.

---------

## List and status of deliverables.

|Deliverable|Status|Date Delivered| 
|-----|:--------:|:------:| 
|[Software Requirements Specification](https://github.com/bounswe/bounswe2022group4/wiki/Requirements)| Delivered |01/11/2022 |
|[Software Design (UML):Use-Case Diagram](https://github.com/bounswe/bounswe2022group4/wiki/Use-Case-Diagram)|Delivered|01/11/2022|
|[Software Design (UML):Class Diagram](https://github.com/bounswe/bounswe2022group4/wiki/Class-Diagram)|Delivered|01/11/2022|
|[Software Design (UML):Sequence Diagram](https://github.com/bounswe/bounswe2022group4/wiki/Sequence-Diagrams)|Delivered|01/11/2022|
|[Scenarios](https://github.com/bounswe/bounswe2022group4/wiki/User-Scenarios) and [Mockups](https://github.com/bounswe/bounswe2022group4/wiki/Mockups) | Delivered | 01/11/2022|
|[Project Plan](https://github.com/bounswe/bounswe2022group4/wiki/Project-Plan)|Delivered|01/11/2022|
|[Individual Contribution Reports](https://github.com/bounswe/bounswe2022group4/blob/master/deliverables/CMPE451_Customer_Presentation_Milestone_1/Customer_Milestone_1.md)|Delivered|01/11/2022|
|[Software Release](https://github.com/bounswe/bounswe2022group4/releases/tag/customer-presentation-1) | Delivered | 01/11/2022| 
|Mobile Deliverables [APK](https://github.com/bounswe/bounswe2022group4/releases/download/customer-presentation-1/heka-mobile.apk)|Delivered |01/11/2022|
|Group Review  | Not Delivered | 04/11/2022|


---------

## Evaluation of Deliverables






---------


## Evaluation of Tools and Processes
- AWS ECR: We used this to store docker images of the backend and the database. It is easy to use.
- AWS EC2: It is one of the most popular cloud platforms. EC2 machines are easy to create and manage. Since it is very popular, it is easy to find sources about them.
- Github Actions: We used it to create a CI/CD pipeline for the backend. Since it is integrated to the github, CI/CD pipeline status looks great when a contributer commits to the predefined branches. 
- PostgreSQL: It is popular and easy to use. There are a lot of sources about its integration with Github.
- Postman
- ProjectLibre
- Android Studio
- Class Diagram çizdiğimiz tool



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
Yusuf Bayındır | Integrating Swagger UI into the application. Implementing unit tests for registration and login functionalities. Revision on the requirements and the class diagram. Some other management related responsibilites.(notetaking, Wiki management, etc.) | Content Cell



----------------

## Summary of Work
Team Member  | Work Performed
------------- | -------------
İbrahim Melih Aktaş  | I created the boilerplate of the backend with the Django. I created Dockerfile and docker-compose.yml for the Django backend and the postgreSQL database. I created an AWS account and create an appropriate user with the necessary permissions. I created an EC2 machine. I created a CI/CD  pipeline with the Github Actions which detects the commits on the heka-backend branch and builds the Docker image. Then that pipeline pushes that Docker image to a public repository on the AWS ECR and then it connects to the EC2 machine on the AWS by using SSH connection. Then it pulls the image from the AWS ECR and runs a container on that EC2 instance. I increased the token expiration time in order to make testing easier. I reviewed the pull requests created by the other team members from the backend. 
Umut Deniz Şener  | Since i have some experience in React before, I have created the code base for the frontend team (Arranging folder and file formats, Implementing router mechanism, Installing libraries). Then i have implemented the navigation bar by using best practises of React and css. I also responsible for the home page. In the home page we need to render the posts written by the users. In order to do that i first created Post component that renders a single post. Then i have implemented PostBox component that renders multiple post with the data i have created. Then i implemented HomePage component with the PostBox component and implemented unit test cases for these components. I also create a backend connection base by using appropriate React libraries and implement postLogin and postRegister functions that enable easily making http request to the relevant rest apis. I also added css animations to the navigation bar and home page and helped to improve ui of the login and sign up pages. Lastly, I implemented a structure for lifting state up that allow us to store global states in React after i implement it I hide private components from unauthorized users.
