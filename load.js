'use strict';

const request = require('superagent');
const debug = require('debug')('medable:load');

module.exports = exports = {};

exports.load = function(done) {
  debug('loading api');

  request.get('https://www.cannabisreports.com/api/v1.0/edibles')
  .set('X-API-Key', 'CANNABIS_REPORTS_API_KEY')
  .then(res => {
    // console.log(res.body.meta.pagination.links.next);
    // console.log(res.body.data[0].ucpc);

    return res.body;
  },done)
  .then( edible => {
    // for(let i = 0; i < res.body.data.length; i++){
    let edibleName = {
      name: edible.data[0].name,
      cpc: edible.data[0].ucpc,
      link: edible.data[0].link,
      qr: edible.data[0].qr,
      barcode: edible.data[0].barcode,
      url: edible.data[0].url,
      image: edible.data[0].image,
      producer: edible.data[0].producer,
      type: edible.data[0].type,
      strain: edible.data[0].strain,
      labTest: edible.data[0].labtest,
      thc: edible.data[0].thc,
      cbd: edible.data[0].cbd,
      cannabis: edible.data[0].cannabis,
      hashOil: edible.data[0].hashOil,
      // reviews: edible.data[0].reviews
    };
    return edibleName;
  })
  .then((edible)=>{
    request.post(`http://localhost:${process.env.PORT}/api/edible`)
    .send(edible)
    .end();
  });

  // .send({ucpc: edibles.data[0].ucpc})
  // .send({link: edibles.data[0].link})
  // .send({qr: edibles.data[0].qr})
  // .send({barcode: edibles.data[0].barcode})
  // .send({url: edibles.data[0].url})
  // .send({image: edibles.data[0].image})
  // .send({producer: edibles.data[0].producer})
  // .send({type: edibles.data[0].type})
  // .send({strain: edibles.data[0].strain})
  // .send({labTest: edibles.data[0].labtest})
  // .send({thc: edibles.data[0].thc})
  // .send({cbd: edibles.data[0].cbd})
  // .send({cannabis: edibles.data[0].cannabis})
  // .send({hashOil: edibles.data[0].hashOil})
  // .send({reviews: edibles.data[0].reviews});
  return;

};



// }
// for(var i = 0; i <= 5; i++){

//   request.get(res.body.meta.pagination.links.next)
//   .set('X-API-Key', 'CANNABIS_REPORTS_API_KEY')
//   .end((err, res) => {
//     if(err) console.log(err.body);
//     console.log('$$$$$$$$$$$$$$$$%%%%%%%%%%%%%', res.body);
//   });
// }
