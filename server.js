'use strict';

const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
const debug = require('debug')('credibleEdibles:server');

mongoose.Promise = require('bluebird');

const errors = require('./lib/error-middleware.js');
const authRoute = require('./route/auth-route.js');

const profile = require('./route/profile-route.js');
const expReview = require('./route/exp-review-route.js');
const edibleRouter = require('./route/edible-route.js');
const commentRouter = require('./route/comment-route.js');
const load = require('./lib/load');;


dotenv.load();

const app = express();
const PORT = process.env.PORT || 3000;
mongoose.connect(process.env.MONGODB_URI, { useMongoClient: true });

app.use(cors({
  origin: process.env.CORS_ORIGINS.split(' '),
  credentials: true,
}));
app.use(morgan('dev'));


app.use(profile);
app.use(authRoute);
app.use(expReview);
app.use(edibleRouter);
app.use(commentRouter);
// load.load(1);
app.use(errors);

app.listen(PORT, () => debug(`app listening on: ${PORT}`));
