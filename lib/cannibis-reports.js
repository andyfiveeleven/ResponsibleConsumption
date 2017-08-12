'use strict';

const cannabisReports = require('cannabis-reports');
const request = require('superagent');
const canna = module.exports = {};


request.get('https://www.cannabisreports.com/api/v1.0/edibles/Sunderstorm')
.set('X-API-Key', 'CANNABIS_REPORTS_API_KEY')
.end((err, res) => {
  console.log(res.body);
});




// cannabisReports.Edible
// .all()
// .then(data => {
//   console.log(data);
// })
// .catch(err => console.log(err));
