const fs = require('fs');
const path = require('path')
const http = require('http')

const request = require('./request');
const response = require('./response');

function Minimal () {
  function listen(PORT=8080, cb) {
    return http.createServer((req,res)=>{
      request(req);
      response(res);
      fs.readFile(path.resolve(__dirname, '../public', 'index.html'), (err, data) => {
        if (err){
          return res.status(500).send("Error Occured")
        }
        return res.status(200).send(data);
      })
    }).listen(PORT, ()=>{
      if (cb){
        if (typeof cb === 'function'){
          return cb();
        } throw new Error('Listen callback needs to be a function')
      }
    })
  }
  return {listen};
}

module.exports = Minimal;