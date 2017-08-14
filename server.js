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
load.load(1);
app.use(errors);

app.listen(PORT, () => {
  debug(`server on ${PORT}`);
});
