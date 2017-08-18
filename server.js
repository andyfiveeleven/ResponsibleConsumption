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
const Player = require('player');


dotenv.load();

const app = express();
const PORT = process.env.PORT || 3000;
mongoose.connect(process.env.MONGODB_URI, { useMongoClient: true });

app.use(cors());
app.use(morgan('dev'));

var player = new Player('./assets/testing.mp3');

player.play();

app.use(profile);
app.use(authRoute);
app.use(expReview);
app.use(edibleRouter);
app.use(commentRouter);
app.use(errors);

app.listen(PORT, () => debug(`app listening on: ${PORT}`));
