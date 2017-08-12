'use strict';

const express = require('express');
const debug = require('debug')('medable:server');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
// const cannabisReports = require('cannabis-reports');

const edibleRouter = require('./route/edible-route.js');
const errors = require('./lib/error-middleware.js');
const load = require('./load.js');

dotenv.load();


const app = express();
const PORT = process.env.PORT || 3000;
mongoose.connect(process.env.MONGODB_URI);

app.use(edibleRouter);
load.load();
app.use(errors);
// cannabisReports.Edible
// .all()
// .then(data => {
//   console.log(data);
// })
// .catch(err => console.log(err));
// let name = 'Kanha';

// function migrateFromApi(num){


// }
// for(let i = 0; i<res.body.data.length; i++){
//   if (res.body.data[i].name.includes(name)) {
//
//     console.log('BY NAME$&$&$&$&$&$&$&$&$&$&$&$&$&$&$$&', res.body.data[i]);
//   }
// }

app.listen(PORT, () => {
  debug(`server on ${PORT}`);
});
