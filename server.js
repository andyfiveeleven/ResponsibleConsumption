'use strict';

const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
const debug = require('debug')('credibleEdibles:server');

const errors = require('./lib/error-middleware.js');
const signup = require('./route/signup-route');
const signin = require('./route/signin-route');
const profile = require('./route/profile-route.js');
const expReview = require('./route/exp-review-route.js');

dotenv.load();

const app = express();
const PORT = process.env.PORT || 3000;
mongoose.connect(process.env.MONGODB_URI, { useMongoClient: true });

app.use(cors());
app.use(morgan('dev'));


app.use(profile);
app.use(signup);
app.use(signin);
app.use(expReview);
app.use(errors);

app.listen(PORT, () => debug(`app listening on: ${PORT}`));
