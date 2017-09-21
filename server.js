'use strict';

const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');

const bodyParser = require('body-parser');
const passport = require('passport');
const FacebookStrategy = require('passport-facebook');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const session = require('express-session');
const superagent = require('superagent');

const debug = require('debug')('credibleEdibles:server');

mongoose.Promise = require('bluebird');

const errors = require('./lib/error-middleware.js');
const authRoute = require('./route/auth-route.js');

const profile = require('./route/profile-route.js');
const expReview = require('./route/exp-review-route.js');
const edibleRouter = require('./route/edible-route.js');
const commentRouter = require('./route/comment-route.js');


dotenv.load();

const app = express();
const PORT = process.env.PORT || 3000;
mongoose.connect(process.env.MONGODB_URI, { useMongoClient: true });

app.use(cors());
app.use(morgan('dev'));

app.use(bodyParser.json());
app.use(session({
  secret: 'da illest developer',
  resave: true,
  saveUninitialized: true
}));

let gglCallback = function(accessToken, refreshToken, profile, done) {
  console.log(accessToken, refreshToken, profile);
  User.findOrCreate({ googleId: profile.id }, function (err, user) {
    return done(err, user);
  });
};

let gglOpts = {
  clientID: process.env.GOOGLE_APP_ID,
  clientSecret: process.env.GOOGLE_APP_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK_URL
};

passport.use(new GoogleStrategy(gglOpts, gglCallback));

app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/dashboard');
  });

let fbCallback = function(token, refToken, profile, cb){
  console.log('token', token);
  console.log('refToken', refToken);
  console.log('profile', profile);


};

let fbOpts = {
  clientID: process.env.FACEBOOK_APP_ID,
  clientSecret: process.env.FACEBOOK_APP_SECRET,
  callbackURL: process.env.FACEBOOK_CALLBACK_URL
};

passport.use(new FacebookStrategy(fbOpts, fbCallback));

app.get('/auth/facebook', passport.authenticate('facebook'));

app.get('/auth/facebook/callback', (req, res) => {
  res.send('goodjob');
});

app.use(profile);
app.use(authRoute);
app.use(expReview);
app.use(edibleRouter);
app.use(commentRouter);
// load.load(1);
app.use(errors);

app.listen(PORT, () => debug(`app listening on: ${PORT}`));
