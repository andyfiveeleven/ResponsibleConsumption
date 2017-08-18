# **Responsible Consumption**

##### This web app is designed to help people with their recreational use of cannabis. Far too often people with little experience don't know how much to consume which will often lead to bad experiences.

#### Our algorithm allows users to enter their information, weight, experience with cannabis, food consumed, and their edible of choice, and receive a suggested dosage.

#### Cannabis edibles typically take 45 minutes to 2 hours to fully metabolize in the human body, take this into account when consuming. Do not 'double down' on dosage or consume any more cannabis until you are certain it has been fully metabolized to ensure a quality experience.

#### In no way is the suggested dose a medical diagnosis or prescription. This application is designed to give users a general idea of the dose they could use. Users should use caution when using cannabis in any form. Do not operate any motor vehicles or machinery under the influence of cannabis, no matter what the dosage.

## **Documentation:**

##### Signup
##### POST: /api/signup
    should create new user obj

##### Signin
##### GET: /api/signin
    should fetch existing user

##### Edit Account
##### PUT: /api/editaccount/:id
    update an existing account

##### Delete Account
##### DELETE: /api/deleteaccount/:id
    removing an account


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
