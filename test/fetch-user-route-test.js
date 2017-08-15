'use strict';

const expect = require('chai').expect;
const request = require('superagent');

require('../server.js');
const url = `http://localhost:${process.env.PORT}`;
