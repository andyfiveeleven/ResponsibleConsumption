# **Responsible Consumption**

[![Coverage Status](https://coveralls.io/repos/github/andyfiveeleven/ResponsibleConsumption/badge.svg?branch=staging)](https://coveralls.io/github/andyfiveeleven/ResponsibleConsumption?branch=staging)

##### This web app is designed to help people with their recreational use of cannabis. Far too often people with little experience don't know how much to consume which will often lead to bad experiences.

##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; This web app is designed to help people with their recreational use of cannabis. Far too often people with little experience don't know how much to consume which will often lead to bad experiences.
#
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Our algorithm allows users to enter their information, weight, experience with cannabis, food consumed, and their edible of choice, and receive a suggested dosage.
#
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  Cannabis edibles typically take 45 minutes to 2 hours to fully metabolize in the human body, take this into account when consuming. Do not 'double down' on dosage or consume any more cannabis until you are certain it has been fully metabolized to ensure a quality experience.
#
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; In no way is the suggested dose a medical diagnosis or prescription. This application is designed to give users a general idea of the dose they could use. Users should use caution when using cannabis in any form. Do not operate any motor vehicles or machinery under the influence of cannabis, no matter what the dosage.
#


## **Documentation:**
##### POST: /api/signup
```
http POST localhost:8000/api/signup username=Logan password=123 email=absherlogan@gmail.com

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
```
http -a Logan:123 GET localhost:8000/api/signin

HTTP/1.1 200 OK
Access-Control-Allow-Origin: *
Connection: keep-alive
Content-Length: 245
Content-Type: application/json; charset=utf-8
Date: Thu, 17 Aug 2017 22:15:04 GMT
ETag: W/"f5-EZNRR6R+b9Behha0xI/rAjsHyEQ"
X-Powered-By: Express

{
    "__v": 0,
    "_id": "599615638db59d55caff520a",
    "email": "absherlogan@gmail.com",
    "findHash": "9b72c292f4318c9c97be8d8424d00fa7f7dd5c4e124f6de23abd0a4407154e17",
    "password": "$2a$10$Hftm7UadaWQ2miD/7PriWuh6s.D/CNk70sRVRzxk/44GnDQzPVgLm",
    "username": "Logan"
}
```

##### GET: /api/allaccounts
```
http GET localhost:8000/api/allaccounts

HTTP/1.1 200 OK
Access-Control-Allow-Origin: *
Connection: keep-alive
Content-Length: 9
Content-Type: application/json; charset=utf-8
Date: Thu, 17 Aug 2017 22:17:02 GMT
ETag: W/"9-IBBuBskf9JKuApMtosp95zh4G2c"
X-Powered-By: Express

[
    "Logan"
]
```

##### PUT: /api/editaccount/:id
```
http -a Logan:123 PUT localhost:8000/api/editaccount/599615638db59d55caff520a username=New+User password=321 email=newemail@new.com

HTTP/1.1 200 OK
Access-Control-Allow-Origin: *
Connection: keep-alive
Content-Length: 186
Content-Type: application/json; charset=utf-8
Date: Thu, 17 Aug 2017 22:19:52 GMT
ETag: W/"ba-9ri7RfoSW5jkcDRqm/Lr1PQVyjw"
X-Powered-By: Express

{
    "__v": 0,
    "_id": "599615638db59d55caff520a",
    "email": "newemail@new.com",
    "findHash": "df188c767d758dc3a3f8d885418e3a4c332669d472519b727eb161d9b32f2dcf",
    "password": "321",
    "username": "New+User"
}
```

##### DELETE: /api/deleteaccount/:id
```
http -a New+User:321 DELETE localhost:8000/api/deleteaccount/599615638db59d55caff520a

HTTP/1.1 200 OK
Access-Control-Allow-Origin: *
Connection: keep-alive
Content-Length: 98
Content-Type: application/json; charset=utf-8
Date: Thu, 17 Aug 2017 22:21:29 GMT
ETag: W/"62-MsVeWBr4drF9yTUGL37gEhZOpK4"
X-Powered-By: Express

{
    "electionId": "7fffffff0000000000000003",
    "n": 1,
    "ok": 1,
    "opTime": {
        "t": 3,
        "ts": "6455372305865375745"
    }
}
```


##### POST: /api/edible
```
http POST localhost:8000/api/signup username=Logan password=123 email=absherlogan@gmail.com

```

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
