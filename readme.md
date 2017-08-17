# **Responsible Consumption**

##### This web app is designed to help people with their recreational use of cannabis. Far too often people with little experience don't know how much to consume which will often lead to bad experiences.

## **Documentation:**
##### POST: /api/signup
    request: http localhost:8000/api/signup username=Logan password=123 email=absherlogan@gmail.com
    ```
    HTTP/1.1 200 OK
    Access-Control-Allow-Origin: *
    Connection: keep-alive
    Content-Length: 167
    Content-Type: application/json; charset=utf-8
    Date: Thu, 17 Aug 2017 21:54:36 GMT
    ETag: W/"a7-PQ2L0lJgsT/VWrn+Yvg3GL9LMsA"
    X-Powered-By: Express

    {
    "__v": 0,
    "_id": "5996109c8db59d55caff5209",
    "email": "absherlogan@gmail.com",
    "password": "$2a$10$qAYT1INuGmRl4QCBhJRZ7OaEauwASegbrBBS8KpPWZhzhzlGFnfcC",
    "username": "Logan"
    }
     ```

##### GET: /api/signin
    should fetch existing user

##### PUT: /api/editaccount/:id
    update an existing account

##### DELETE: /api/deleteaccount/:id
    removing an account


##### POST: /api/edible
    adds an edible


##### POST: /api/expReview
    adds a user comment

##### GET: /api/expReview/:id
    loads an existing comment

##### PUT: /api/expReview/:id
    updates an existing comment

##### DELETE: /api/expReview/:id
    removes a comment


##### POST: /api/profile
    creates a profile

##### GET: /api/profile/:id
    loads a profile


## **Development Plan:**
### --MVP--
  * User, Product, and Store schemas that are all interlinked with each other
  * smart error handling with if statements, catch blocks, and error-middleware
  * testing coverage of around 90%
  * a signin route that GETs an existing user and a signup route that POST a new user
  * users are able to POST information about themselves and get a estimated safe dose level
  * users are able to search for products based on dosage, name, type, etc.

### --Stretch Goals--
  * allows user to POST reviews on products
  * allows user to update their account with a PUT request
  * updates estimated dosage level based on recent reviews

### --Scheduling--

#### **Thursday (Aug 10)**
###### planning, basic setup, research
  * talking and discussing the features of our app
  * making a server.js file
  * creating .gitignore .eslintrc .eslintignore files
  * npm init
  * npm i -D to add DevDependencies of chai, mocha, and superagent
  * npm i -S to add Dependencies of .....
  * creating a /test directory with basic user model testing
  * creating a /model directory and user.js file containing a user schema
  * creating a /lib directory with bearer-auth-middleware.js and error-middleware.js

#### **Friday (Aug 11)**
###### setting up more packages
  * made /test and basic testing files
  * set up travis and heroku
  * created /route plus signin and signup routes
  * fixed package.json to work with npm scripts

#### **Weekend (Aug 12 - 13)**
###### sleep

#### **Monday (Aug 14)**
###### creating and testing routes
  * creating a /exp-review-routes and testing them
  * creating a /profile-routes and testing them
  * creating a /edible-route and tests to go with them
  * creating a /fetch-user-route and more tests

#### **Tuesday (Aug 15)**
###### bug fixes
  * fixed github isses
  * fixed auth-route bugs
  * built out more auth-routes
  * built out more exp-review-routes
  * got coveralls working

#### **Wednesday (Aug 16)**
###### polishing
  * finished auth-routes

#### **Thursday (Aug 17)**
###### finishing and presentation practice
  * finished exp-review-routes

#### **Friday (Aug 18)**
###### last minute practice and bug fixes
  * things
