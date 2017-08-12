'use strict';

const request = require('superagent');
const debug = require('debug')('medable:load');

module.exports = exports = {};

exports.load = function(done) {
  debug('loading api');

  request.get('https://www.cannabisreports.com/api/v1.0/edibles')
  .set('X-API-Key', 'CANNABIS_REPORTS_API_KEY')
  .then( res => {
    // console.log(res.body.meta.pagination.links.next);
    console.log(res.body.data);

    return res.body;
  },done)
  .then( edible => {
    let edibles = [];
    for(let i in edible.data){
      let edibleName = [{
        name: edible.data[i].name,
        ucpc: edible.data[i].ucpc,
        link: edible.data[i].link,
        qr: edible.data[i].qr,
        barcode: edible.data[i].barcode,
        url: edible.data[i].url,
        image: edible.data[i].image,
        producer: edible.data[i].producer,
        type: edible.data[i].type,
        strain: edible.data[i].strain,
        labTest: edible.data[i].labtest,
        thc: edible.data[i].thc,
        cbd: edible.data[i].cbd,
        cannabis: edible.data[i].cannabis,
        hashOil: edible.data[i].hashOil,
        reviews: edible.data[i].reviews
      }];
      edibles.push(edibleName);
      Promise.all(edibles).then((edibles) => {
        console.log(edibles);
      });
    }
    return edibles;
  })
  .then((edible)=>{
    for(let i in edible){
      console.log('%%%%%%%%%%%%%%%%%%%%',edible[i][0]);
      request.post(`http://localhost:${process.env.PORT}/api/edible`)
      .send(edible[i][0])
      .end();
    }
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
