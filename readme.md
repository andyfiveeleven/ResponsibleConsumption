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

##### Signup
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

##### Signin
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

##### Edit Account
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

##### Delete Account
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
{ __v: 0,
 name: 'testName',
 ucpc: '0000',
 link: 'www.alink.com',
 qr: 'www.qr.com',
 barcode: 'www.barcode.com',
 url: 'www.url.com',
 image: 'www.image.com',
 type: 'testType',
 labTest: true,
 thc: '100mg',
 cbd: '3mg',
 cannabis: true,
 hashOil: false,
 _id: '599629b68639344252018258',
 comments: [],
 reviews: { count: 0, link: 'www.somelink.com' },
 strain: [],
 producer: { name: 'producerName', ucpc: '0000', link: 'www.prolink.com' } }
```

##### GET: /api/edible/:id
```
{ _id: '599629b7863934425201825e',
  name: 'testName',
  ucpc: '0000',
  link: 'www.alink.com',
  qr: 'www.qr.com',
  barcode: 'www.barcode.com',
  url: 'www.url.com',
  image: 'www.image.com',
  type: 'testType',
  labTest: true,
  thc: '100mg',
  cbd: '3mg',
  cannabis: true,
  hashOil: false,
  __v: 1,
  comments:
   [ { _id: '599629b7863934425201825f',
       edibleName: 'testName',
       title: 'testTitle',
       commentBody: 'it was good',
       effectRelaxed: 1,
       effectHappy: 1,
       effectEuphoric: 1,
       effectUplifted: 1,
       effectCreative: 1,
       medicalStress: 2,
       medicalDepression: 2,
       medicalPain: 2,
       medicalHeadaches: 2,
       medicalInsomnia: 2,
       negativeDryMouth: 3,
       negativeDryEyes: 3,
       negativeParanoid: 3,
       negativeDizzy: 3,
       negativeAnxious: 3,
       edibleID: '599629b7863934425201825e',
       __v: 0,
       datePosted: '2017-08-17T23:41:37.054Z' } ],
  reviews: { count: 0, link: 'www.somelink.com' },
  strain: [],
  producer: { name: 'producerName', ucpc: '0000', link: 'www.prolink.com' } }
```

##### POST: /api/comment
```
{ __v: 0,
  edibleName: 'testName',
  title: 'testTitle',
  commentBody: 'it was good',
  effectRelaxed: 1,
  effectHappy: 1,
  effectEuphoric: 1,
  effectUplifted: 1,
  effectCreative: 1,
  medicalStress: 2,
  medicalDepression: 2,
  medicalPain: 2,
  medicalHeadaches: 2,
  medicalInsomnia: 2,
  negativeDryMouth: 3,
  negativeDryEyes: 3,
  negativeParanoid: 3,
  negativeDizzy: 3,
  negativeAnxious: 3,
  edibleID: '59962a54437c23426b009ea4',
  _id: '59962a55437c23426b009ea6',
  datePosted: '2017-08-17T23:44:15.218Z' }
```

##### GET: /api/comment/:id
```
{ _id: '59962a56437c23426b009eab',
 edibleName: 'testName',
 title: 'testTitle',
 commentBody: 'it was good',
 effectRelaxed: 1,
 effectHappy: 1,
 effectEuphoric: 1,
 effectUplifted: 1,
 effectCreative: 1,
 medicalStress: 2,
 medicalDepression: 2,
 medicalPain: 2,
 medicalHeadaches: 2,
 medicalInsomnia: 2,
 negativeDryMouth: 3,
 negativeDryEyes: 3,
 negativeParanoid: 3,
 negativeDizzy: 3,
 negativeAnxious: 3,
 __v: 0,
 datePosted: '2017-08-17T23:44:15.218Z' }
 ```

##### PUT: /api/comment/:id
```
{ _id: '59962a57437c23426b009eb0',
 edibleName: 'newName',
 title: 'newTitle',
 commentBody: 'it was new',
 effectRelaxed: 2,
 effectHappy: 2,
 effectEuphoric: 1,
 effectUplifted: 1,
 effectCreative: 1,
 medicalStress: 2,
 medicalDepression: 2,
 medicalPain: 2,
 medicalHeadaches: 2,
 medicalInsomnia: 2,
 negativeDryMouth: 3,
 negativeDryEyes: 3,
 negativeParanoid: 3,
 negativeDizzy: 3,
 negativeAnxious: 3,
 __v: 0,
 datePosted: '2017-08-17T23:44:15.218Z' }
 ```

##### POST: /api/expReview
```
{ edibleThc: 100,
  __v: 0,
  edibleName: 'testName',
  lastMeal: 2,
  profileID: '599670004bd7c26e1b539cab',
  _id: '599670008db59d55caff5216',
  comments: [],
  reaction: 3,
  dayDescription: '',
  date: '2017-08-18T04:41:36.978Z',
  dosage: 2 }
```

##### GET: /api/expReview/:id
```
{ _id: '599670034bd7c26e1b539cb3',
  edibleName: 'testName',
  lastMeal: 2,
  profileID: '599670024bd7c26e1b539cb2',
  __v: 0,
  comments: [],
  reaction: 3,
  dayDescription: '',
  date: '2017-08-18T04:41:39.036Z',
  dosage: 0 }
```

##### PUT: /api/expReview/:id
```
{ _id: '599670044bd7c26e1b539cb6',
  edibleName: 'new edible',
  lastMeal: 5,
  profileID: '599670034bd7c26e1b539cb5',
  __v: 0,
  comments: [],
  reaction: 3,
  dayDescription: '',
  date: '2017-08-18T04:41:40.061Z',
  dosage: 0 }
```

##### DELETE: /api/expReview/:id
```
{}
```


##### POST: /api/profile
```
{ __v: 0,
  firstname: 'example',
  lastname: 'user',
  weight: 2,
  experience: 3,
  userID: '599671690af68c715b2389d7',
  _id: '599671698db59d55caff5225',
  productHistory: [ 'zootDrops', 'GoodShipSnickerdoodle' ] }
```

##### GET: /api/profile/:id
```
{ _id: '59971675794e69481b889db6',
 firstname: 'example',
 lastname: 'user',
 weight: 2,
 experience: 3,
 userID: '59971675794e69481b889db5',
 __v: 0,
 productHistory: [ 'zootDrops', 'GoodShipSnickerdoodle' ] }
 ```
