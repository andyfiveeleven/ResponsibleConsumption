// 'use strict';
//
// const request = require('superagent');
// const debug = require('debug')('medable:load');
// const Edible = require('../model/edible.js');
//
// module.exports = exports = {};
//
// exports.load = function(num) {
//   debug('loading api');
//   for(let i = num; i<= num+24; i++){
//     request.get(`https://www.cannabisreports.com/api/v1.0/edibles?page=${i}`)
//     .set('X-API-Key', 'CANNABIS_REPORTS_API_KEY')
//     .then( res => {
//       return res.body;
//     }).then( edible => {
//       for(let i = 0; i < edible.data.length; i++){
//         let edibleList = new Edible(edible.data[i]);
//         edibleList.save((err)=>{
//           if(err){
//             console.log(err);
//           }else{
//             console.log( `THIS IS ADDDING THE OBJECT ${i}: `, edible.data[i]);
//             console.log('This gives the page', edible.meta.pagination);
//           }
//         });
//       }
//     });
//   }
// };
